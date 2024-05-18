import { v4 as uuidv4 } from 'uuid';
import 'primeicons/primeicons.css';
import StopwatchMapper from './StopwatchMapper';
import { SetStateAction, useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {
  collection,
  getDocs,
  limit,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { Task, TrackersProps, User } from '@/app/types';

export default function Trackers({
  date,
  onDateChange,
  user,
  tasks,
  setTasks,
}: TrackersProps) {
  const [resetCounts, setResetCounts] = useState(false);
  const [activeStopwatch, setActiveStopwatch] = useState(false);

  useEffect(() => {
    fetchUserTasks();
  }, [user]);

  useEffect(() => {
    if (resetCounts) {
      setResetCounts(false);
    }
  }, [resetCounts]);

  async function fetchUserTasks() {
    try {
      const usersRef = collection(db, 'users');
      const q = query(usersRef, where('username', '==', user), limit(1));
      const qSnap = await getDocs(q);
      const userDoc = qSnap.docs[0].data() as User;
      setTasks(userDoc.tasks);
      setActiveStopwatch(userDoc.activeStopwatch);
    } catch (error) {
      console.log(`Failed to fetch user\'s tasks. Error: ${error}`);
    }
  }

  async function handleCreateTimer() {
    // time in seconds
    const timeNow = Date.now();
    const newTask: Task = {
      id: uuidv4(),
      description: 'Add a description',
      isRunning: false,
      startTime: timeNow,
      accumulatedTime: 0,
      lastResumed: timeNow,
    };

    try {
      const usersRef = collection(db, 'users');
      const q = query(usersRef, where('username', '==', user), limit(1));
      const qSnap = await getDocs(q);
      const userDoc = qSnap.docs[0];

      if (userDoc) {
        const updatedTasks = [...tasks, newTask];
        await updateDoc(userDoc.ref, { tasks: updatedTasks });
        setTasks(updatedTasks);
      }
    } catch (error) {
      console.log(`Failed to create a new timer. Error: ${error}`);
    }
  }

  async function handleStopAll() {
    try {
      const usersRef = collection(db, 'users');
      const q = query(usersRef, where('username', '==', user), limit(1));
      const qSnap = await getDocs(q);
      if (!qSnap.empty && qSnap.docs[0].exists()) {
        const tasksArray = qSnap.docs[0].data().tasks;
        const updatedTasks = tasksArray.map((t: Task, index: number) => {
          return {
            ...t,
            isRunning: false,
            startTime: Date.now() + index,
            accumulatedTime: 0,
            lastResumed: Date.now() + index,
          };
        });

        setResetCounts(true);
        setActiveStopwatch(false);
        setTasks(updatedTasks);
        await updateDoc(qSnap.docs[0].ref, { tasks: updatedTasks });
      }
    } catch (error) {
      console.log('Failed to stop task stopwatch. Error:', error);
    }
  }

  return (
    <div className="mt-40 h-full flex justify-center">
      <div className="w-2/3">
        <h1 className="text-2xl mb-28">
          <span className="pi pi-calendar mr-3" />
          <DatePicker
            selected={date}
            onChange={(date: Date) => onDateChange(date)}
            dateFormat="d MMMM, yyyy"
          />
        </h1>
        <div className="flex justify-end gap-4 text-white text-sm mb-12">
          <button
            onClick={handleCreateTimer}
            className="bg-orange-600 px-3 py-2 rounded"
          >
            <span className="pi pi-stopwatch mr-2" />
            Start new timer
          </button>
          <button
            onClick={handleStopAll}
            className="bg-violet-950 px-3 py-2 rounded"
          >
            <span className="pi pi-stop-circle mr-2" />
            Stop all
          </button>
        </div>
        <StopwatchMapper
          tasks={tasks}
          setTasks={setTasks}
          resetCounts={resetCounts}
          activeStopwatch={activeStopwatch}
          setActiveStopwatch={setActiveStopwatch}
        />
      </div>
    </div>
  );
}
