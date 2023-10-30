import { StopwatchMapperProps } from '@/app/types';
import TaskComponent from './TaskComponent';

export default function StopwatchMapper({
  tasks,
  setTasks,
  resetCounts,
  activeStopwatch,
  setActiveStopwatch,
}: StopwatchMapperProps) {
  return (
    <div>
      {tasks && tasks.length > 0 ? (
        <div>
          <div className="w-full h-16 rounded-t-lg flex items-center bg-slate-50 font-medium">
            <div className="w-1/5 pl-6">Time logged</div>
            <div className="w-3/5 pl-6">Description</div>
            <div className="w-1/5 pl-6">Actions</div>
          </div>
          <div>
            {tasks.map((task) => (
              <TaskComponent
                key={task.id}
                task={task}
                setTasks={setTasks}
                resetCounts={resetCounts}
                activeStopwatch={activeStopwatch}
                setActiveStopwatch={setActiveStopwatch}
              />
            ))}
          </div>
        </div>
      ) : (
        <h1>You currently have no tasks.</h1>
      )}
    </div>
  );
}
