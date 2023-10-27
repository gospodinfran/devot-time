import { SetStateAction, useEffect, useState } from 'react';
import { Task } from './types';
import {
  collection,
  getDocs,
  limit,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import { db } from '../../lib/firebase';
import useLocalStorage from '@/customHooks/useLocalStorage';

export default function TaskComponent({
  task,
  setTasks,
  resetCounts,
}: {
  task: Task;
  setTasks: React.Dispatch<SetStateAction<Task[]>>;
  resetCounts: boolean;
}) {
  const [user] = useLocalStorage();
  const [description, setDescription] = useState(task.description ?? '');
  const [isEditing, setIsEditing] = useState(false);
  const [count, setCount] = useState<number>(
    task.isRunning
      ? task.accumulatedTime + (Date.now() - task.lastResumed)
      : task.accumulatedTime
  );

  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    if (task.isRunning) {
      intervalId = setInterval(() => {
        setCount((prev) => prev + 500);
      }, 500);
    }
    return () => clearInterval(intervalId);
  }, [task.isRunning]);

  useEffect(() => {
    if (resetCounts) setCount(0);
  }, [resetCounts]);

  async function handleDatabaseStartPause() {
    // always inverse isRunning
    // if starting a stopwatch set lastResumed to Date.now()
    // if we stop a timer, update accumulatedTime

    try {
      const usersRef = collection(db, 'users');
      const q = query(usersRef, where('username', '==', user), limit(1));
      const qSnap = await getDocs(q);
      if (!qSnap.empty) {
        const userDoc = qSnap.docs[0];
        if (userDoc.exists()) {
          const tasksArray = userDoc.data().tasks;

          const updatedTasks = tasksArray.map((t: Task) => {
            if (t.startTime === task.startTime) {
              const currentTime = Date.now();
              if (task.isRunning) {
                // stopping the timer now
                return {
                  ...t,
                  isRunning: false,
                  accumulatedTime:
                    t.accumulatedTime + (currentTime - t.lastResumed),
                };
              } else {
                // we are starting the stopwatch
                return {
                  ...t,
                  isRunning: true,
                  lastResumed: currentTime,
                };
              }
            } else {
              return t;
            }
          });
          setTasks(updatedTasks);
          await updateDoc(userDoc.ref, { tasks: updatedTasks });
        }
      }
    } catch (error) {
      console.log(`Failed to fetch user\'s tasks. Error: ${error}`);
    }
  }

  function handleShowTime(milliseconds: number) {
    const hours = Math.floor(milliseconds / 3600000);
    const minutes = Math.floor((milliseconds % 3600000) / 60000);
    const seconds = Math.floor((milliseconds % 60000) / 1000);
    return `${hours}:${minutes < 10 ? '0' : ''}${minutes}:${
      seconds < 10 ? '0' : ''
    }${seconds}`;
  }

  async function handleStop() {
    try {
      const usersRef = collection(db, 'users');
      const q = query(usersRef, where('username', '==', user), limit(1));
      const qSnap = await getDocs(q);
      if (!qSnap.empty && qSnap.docs[0].exists()) {
        const tasksArray = qSnap.docs[0].data().tasks;
        const updatedTasks = tasksArray.map((t: Task) => {
          const timeNow = Date.now();
          if (t.startTime === task.startTime) {
            return {
              ...t,
              isRunning: false,
              startTime: timeNow,
              accumulatedTime: 0,
              lastResumed: timeNow,
            };
          } else {
            return t;
          }
        });

        await updateDoc(qSnap.docs[0].ref, { tasks: updatedTasks });
        setTasks(updatedTasks);
        setCount(0);
      }
    } catch (error) {
      console.log('Failed to stop task stopwatch. Error:', error);
    }
  }

  async function handleSaveDescription() {
    try {
      const usersRef = collection(db, 'users');
      const q = query(usersRef, where('username', '==', user), limit(1));
      const qSnap = await getDocs(q);
      if (!qSnap.empty && qSnap.docs[0].exists()) {
        const tasksArray = qSnap.docs[0].data().tasks;
        const updatedTasks = tasksArray.map((t: Task) => {
          if (t.startTime === task.startTime) {
            return { ...t, description };
          }
          return t;
        });

        await updateDoc(qSnap.docs[0].ref, { tasks: updatedTasks });
        setTasks(updatedTasks);
        setIsEditing(false);
      }
    } catch (error) {
      console.log('Failed to update task description. Error:', error);
    }
  }

  function handleEditDescription() {}

  async function handleDeleteTask() {
    try {
      const usersRef = collection(db, 'users');
      const q = query(usersRef, where('username', '==', user), limit(1));
      const qSnap = await getDocs(q);
      if (!qSnap.empty && qSnap.docs[0].exists()) {
        const tasksArray = qSnap.docs[0].data().tasks;
        const updatedTasks = tasksArray.filter(
          (t: Task) => t.startTime !== task.startTime
        );

        await updateDoc(qSnap.docs[0].ref, { tasks: updatedTasks });
        setTasks(updatedTasks);
      }
    } catch (error) {
      console.log('Failed to delete task. Error:', error);
    }
  }

  return (
    <div key={task.startTime} className="flex">
      <div className="w-1/5 flex items-center pl-4 border border-gray-100 h-14">
        {handleShowTime(count)}
      </div>
      <div className="w-3/5 flex items-center pl-4 border border-gray-100 h-14">
        {isEditing ? (
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            onBlur={handleSaveDescription}
            autoFocus
          />
        ) : (
          description
        )}
      </div>
      <div className="w-1/5 flex items-center justify-evenly border border-gray-100 h-14 text-xl">
        <button onClick={handleDatabaseStartPause}>
          {task.isRunning ? (
            <span className="pi pi-pause text-orange-500" />
          ) : (
            <span className="pi pi-play text-orange-500" />
          )}
        </button>
        <button onClick={handleStop}>
          <span className="pi pi-stop-circle" />
        </button>
        <button onClick={() => setIsEditing(true)}>
          <span className="pi pi-pencil" />
        </button>
        <button onClick={handleDeleteTask}>
          <span className="pi pi-trash" />
        </button>
      </div>
    </div>
  );
}
