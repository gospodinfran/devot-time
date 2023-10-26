import { useEffect, useState } from 'react';
import { Task } from './types';

export default function TaskComponent({
  task,
  key,
}: {
  task: Task;
  key: number;
}) {
  const [time, setTime] = useState(task.accumulatedTime);

  useEffect(() => {}, []);

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
