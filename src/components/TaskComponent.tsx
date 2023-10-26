import { SetStateAction, useEffect, useState } from 'react';
import { Task } from './types';
import { collection, getDocs, limit, query, where } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import useLocalStorage from '@/customHooks/useLocalStorage';

export default function TaskComponent({
  task,
  setTasks,
}: {
  task: Task;
  setTasks: React.Dispatch<SetStateAction<Task[]>>;
}) {
  const [user] = useLocalStorage();
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

  {
    /*async function handleDatabaseStartPause() {
    // always inverse isRunning
    // if starting a stopwatch set lastResumed to Date.now()
    // if we stop a timer, update accumulatedTime

    try {
      const usersRef = collection(db, 'users');
      const q = query(usersRef, where('username', '==', user), limit(1));
      const qSnap = await getDocs(q);
      const tasksArray = qSnap.docs[0].data().tasks;

      const updatedTasks = tasksArray.map((t: Task) => {
        if (t.startTime === task.startTime) {
          const currentTime = Date.now();
          if (task.isRunning) {
            // we are stopping it now
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
    } catch (error) {
      console.log(`Failed to fetch user\'s tasks. Error: ${error}`);
    }
  }*/
  }

  function handleStartPause() {
    setTasks((prevTasks) => {
      return prevTasks.map((t) => {
        if (t.startTime === task.startTime) {
          return {
            ...t,
            isRunning: !t.isRunning,
            lastResumed: !t.isRunning ? Date.now() : t.lastResumed,
          };
        }
        return t;
      });
    });
  }

  function handleShowTime(milliseconds: number) {
    const hours = Math.floor(milliseconds / 3600000);
    const minutes = Math.floor((milliseconds % 3600000) / 60000);
    const seconds = Math.floor((milliseconds % 60000) / 1000);
    return `${hours}:${minutes < 10 ? '0' : ''}${minutes}:${
      seconds < 10 ? '0' : ''
    }${seconds}`;
  }

  function handleStop() {}

  function handleEditDescription() {}

  function handleDeleteTask() {}

  return (
    <div key={task.startTime} className="flex">
      <div className="w-1/5 flex items-center pl-4 border border-gray-100 h-14">
        {handleShowTime(count)}
      </div>
      <div className="w-3/5 flex items-center pl-4 border border-gray-100 h-14">
        Task 123 Lorem ipsum dolor sit amet, consectetur adipisicing elit.
      </div>
      <div className="w-1/5 flex items-center justify-evenly pl-4 border border-gray-100 h-14 text-xl">
        <button onClick={handleStartPause}>
          <span className="pi pi-pause" />
        </button>
        <button onClick={handleStop}>
          <span className="pi pi-stop-circle" />
        </button>
        <button onClick={handleEditDescription}>
          <span className="pi pi-pencil" />
        </button>
        <button onClick={handleDeleteTask}>
          <span className="pi pi-trash" />
        </button>
      </div>
    </div>
  );
}
