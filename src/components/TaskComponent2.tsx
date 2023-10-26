import { useEffect, useState } from 'react';
import { Task } from './types';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';

export default function TaskComponent({
  task,
  key,
}: {
  task: Task;
  key: number;
}) {
  const [time, setTime] = useState(task.accumulatedTime);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (task.isRunning) {
      interval = setInterval(() => {
        const currentTime = Math.floor(Date.now() / 1000);
        const elapsedTime = currentTime - Math.floor(task.startTime / 1000);
        setTime(task.accumulatedTime + elapsedTime);
      }, 1000);
    } else {
      setTime(task.accumulatedTime);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [task.isRunning, task.startTime, task.accumulatedTime]);

  async function handleStopStopwatch {
    const currentTime = Math.floor(Date.now() / 1000);
    const elapsedTime = currentTime - Math.floor(task.startTime / 1000);
    await updateDoc(doc(db, `users/${task.id}/stopwatches/${task.id}`), {
      isRunning: false,
      accumulatedTime: task.accumulatedTime + elapsedTime,
    });
  };

  return (
    <div key={key} className="flex">
      <div className="w-1/5 flex items-center pl-4 border border-gray-100 h-14">
        01:23:33
      </div>
      <div className="w-3/5 flex items-center pl-4 border border-gray-100 h-14">
        Task 123 Lorem ipsum dolor sit amet, consectetur adipisicing elit.
      </div>
      <div className="w-1/5 flex items-center justify-evenly pl-4 border border-gray-100 h-14 text-xl">
        <button>
          <span className="pi pi-pause" />
        </button>
        <button>
          <span className="pi pi-stop-circle" />
        </button>
        <button>
          <span className="pi pi-pencil" />
        </button>
        <button>
          <span className="pi pi-trash" />
        </button>
      </div>
    </div>
  );
}
