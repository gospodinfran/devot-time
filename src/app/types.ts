import { Timestamp } from 'firebase/firestore';
import { SetStateAction } from 'react';

// if not running, use accumulatedTime
// if is running, use accumulatedTime + lastResumed and updated it client-side every second
export interface Task {
  id: string;
  description: string;
  isRunning: boolean;
  startTime: number;
  accumulatedTime: number;
  lastResumed: number;
}

export interface User {
  activeStopwatch: boolean;
  username: string;
  password: string;
  tasks: Task[];
}
export interface TrackersProps {
  date: Date;
  onDateChange: React.Dispatch<SetStateAction<Date>>;
  user: string;
  tasks: Task[];
  setTasks: React.Dispatch<SetStateAction<Task[]>>;
}

export interface StopwatchMapperProps {
  tasks: Task[];
  setTasks: React.Dispatch<SetStateAction<Task[]>>;
  resetCounts: boolean;
  activeStopwatch: boolean;
  setActiveStopwatch: React.Dispatch<SetStateAction<boolean>>;
}
