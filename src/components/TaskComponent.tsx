import { SetStateAction, useEffect, useState } from 'react';
import { Task } from './types';

export default function TaskComponent({
  task,
  setTasks,
}: {
  task: Task;
  setTasks: React.Dispatch<SetStateAction<Task[]>>;
}) {
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
