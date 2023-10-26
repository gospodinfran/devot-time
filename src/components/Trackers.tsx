import 'primeicons/primeicons.css';
import StopwatchMapper from './StopwatchMapper';

export default function Trackers() {
  const randomDate = new Date().toLocaleDateString();
  return (
    <div className="mt-40 h-full w-full flex justify-center">
      <div className="">
        <h1>
          <span className="pi pi-calendar" />
          Today
          {randomDate}
        </h1>
        <div>
          <button>Start new times</button>
          <button>Stop all</button>
        </div>
        <StopwatchMapper />
      </div>
    </div>
  );
}
