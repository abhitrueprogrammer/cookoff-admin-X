"use client";

import {
  getTime,
  GetTimeResponse,
  setTime,
  SetTimeParams,
  startRound,
  updateTime,
  UpdateTimeParams,
} from "@/api/timer";
import { useEffect, useState } from "react";
import { FaPlay, FaPlus, FaStopCircle } from "react-icons/fa";

function Timer() {
  const [selectedRound, setSelectedRound] = useState("1");
  const [isRunning, setIsRunning] = useState(false);
  const [isStarting, setIsStarting] = useState(false);
  const [timerData, setTimerData] = useState<GetTimeResponse | null>(null);
  const [remainingSeconds, setRemainingSeconds] = useState(0);
  const [duration, setDuration] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [addTimeValue, setAddTimeValue] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  async function fetchTimer() {
    const data = await getTime();
    if (data) {
      setTimerData(data);
      const now = new Date(data.server_time).getTime();
      const end = new Date(data.round_end_time).getTime();
      const diff = Math.max(0, Math.floor((end - now) / 1000));
      setRemainingSeconds(diff);
    }
  }

  useEffect(() => {
    let tick: NodeJS.Timer;
    if (isRunning) {
      tick = setInterval(() => {
        setRemainingSeconds((prev) => Math.max(0, prev - 1));
      }, 1000);
    }
    return () => clearInterval(tick);
  }, [isRunning]);

  useEffect(() => {
    let sync: NodeJS.Timer;
    if (isRunning) {
      void fetchTimer();
      sync = setInterval(() => {
        void fetchTimer();
      }, 120_000);
    }
    return () => clearInterval(sync);
  }, [isRunning]);

  const getDurationInSeconds = (d: typeof duration) =>
    d.hours * 3600 + d.minutes * 60 + d.seconds;

  async function handleSetTime() {
    const seconds = getDurationInSeconds(duration);
    const payload: SetTimeParams = {
      round: selectedRound,
      time: seconds.toString(),
    };
    await setTime(payload);
    void fetchTimer();
  }

  async function handleStartRound() {
    setIsStarting(true);
    await startRound();
    setIsRunning(true);
    setIsStarting(false);
    void fetchTimer();
  }

  async function handleAddTime() {
    const seconds =
      addTimeValue.hours * 3600 +
      addTimeValue.minutes * 60 +
      addTimeValue.seconds;
    const payload: UpdateTimeParams = { duration: seconds };
    await updateTime(payload);
    void fetchTimer();
    setAddTimeValue({ hours: 0, minutes: 0, seconds: 0 });
  }

  function formatTime(sec: number) {
    const h = Math.floor(sec / 3600)
      .toString()
      .padStart(2, "0");
    const m = Math.floor((sec % 3600) / 60)
      .toString()
      .padStart(2, "0");
    const s = (sec % 60).toString().padStart(2, "0");
    return `${h}:${m}:${s}`;
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 text-white">
      <h1 className="mb-8 text-3xl font-bold">Timer</h1>

      <div className="flex w-full max-w-lg flex-col items-center gap-6 rounded-xl bg-gray-800 p-8">
        <div className="flex w-full items-center gap-3">
          <select
            className="w-28 rounded-lg bg-gray-700 p-2 text-white"
            value={selectedRound}
            onChange={(e) => setSelectedRound(e.target.value)}
          >
            <option value="1">Round 1</option>
            <option value="2">Round 2</option>
            <option value="3">Round 3</option>
          </select>

          <div className="flex items-center gap-1">
            <input
              type="number"
              min={0}
              placeholder="HH"
              className="w-16 rounded-lg bg-gray-700 p-2 text-center font-mono text-white"
              value={duration.hours}
              onChange={(e) =>
                setDuration({ ...duration, hours: Number(e.target.value) })
              }
            />
            <span>:</span>
            <input
              type="number"
              min={0}
              placeholder="MM"
              className="w-16 rounded-lg bg-gray-700 p-2 text-center font-mono text-white"
              value={duration.minutes}
              onChange={(e) =>
                setDuration({ ...duration, minutes: Number(e.target.value) })
              }
            />
            <span>:</span>
            <input
              type="number"
              min={0}
              placeholder="SS"
              className="w-16 rounded-lg bg-gray-700 p-2 text-center font-mono text-white"
              value={duration.seconds}
              onChange={(e) =>
                setDuration({ ...duration, seconds: Number(e.target.value) })
              }
            />
          </div>

          <button
            className="ml-2 whitespace-nowrap rounded-lg bg-blue-600 px-4 py-1 text-center text-white transition hover:bg-blue-500"
            onClick={handleSetTime}
          >
            Set Time
          </button>
        </div>

        <div className="flex w-full items-center justify-between gap-4">
          <div className="font-mono text-4xl">
            {formatTime(remainingSeconds)}
          </div>
          <button
            disabled={isStarting}
            className={`rounded-lg px-4 py-2 transition ${
              isStarting
                ? "cursor-not-allowed border-gray-500 bg-gray-500"
                : isRunning
                  ? "border-red-600 bg-red-600 hover:bg-red-500"
                  : "border-green-500 bg-green-500 hover:bg-green-400"
            }`}
            onClick={handleStartRound}
          >
            {isStarting ? (
              "Starting..."
            ) : isRunning ? (
              <FaStopCircle size={20} />
            ) : (
              <FaPlay size={20} />
            )}
          </button>
        </div>

        <div className="flex w-full items-center justify-center gap-2">
          <input
            type="number"
            min={0}
            placeholder="HH"
            className="w-16 rounded-lg bg-gray-700 p-2 text-center font-mono text-white"
            value={addTimeValue.hours}
            onChange={(e) =>
              setAddTimeValue({
                ...addTimeValue,
                hours: Number(e.target.value),
              })
            }
          />
          <span>:</span>
          <input
            type="number"
            min={0}
            placeholder="MM"
            className="w-16 rounded-lg bg-gray-700 p-2 text-center font-mono text-white"
            value={addTimeValue.minutes}
            onChange={(e) =>
              setAddTimeValue({
                ...addTimeValue,
                minutes: Number(e.target.value),
              })
            }
          />
          <span>:</span>
          <input
            type="number"
            min={0}
            placeholder="SS"
            className="w-16 rounded-lg bg-gray-700 p-2 text-center font-mono text-white"
            value={addTimeValue.seconds}
            onChange={(e) =>
              setAddTimeValue({
                ...addTimeValue,
                seconds: Number(e.target.value),
              })
            }
          />
          <button
            className="flex items-center justify-center rounded-lg bg-gray-700 p-3 hover:bg-gray-600"
            onClick={handleAddTime}
          >
            <FaPlus />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Timer;
