import { Timestamp } from 'firebase/firestore';
import { SetStateAction } from 'react';

export interface Task {
  description: string;
  startTime: number;
  accumulatedTime: number;
  isRunning: boolean;
}

export interface User {
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
}
