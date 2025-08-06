import type React from "react";
import styles from "./TimerClock.module.css";

interface TimeClockProps {
    minutes: number;
    setMinutes: React.Dispatch<React.SetStateAction<number>>;
    seconds: number;
    setSeconds: React.Dispatch<React.SetStateAction<number>>;
    handleFunction(
        event: React.ChangeEvent<HTMLInputElement>,
        setFunction: React.Dispatch<React.SetStateAction<number>>
    ): void;
}

const TimerClock: React.FC<TimeClockProps> = ({
    minutes,
    setMinutes,
    seconds,
    setSeconds,
    handleFunction,
}) => {
    const formatNumericValue = (value: number) => {
        return String(value).padStart(2, "0");
    };

    return (
        <>
            <div className={styles.time}>
                <input
                    type="text"
                    name="minutes"
                    title="minutes"
                    max="60"
                    min="0"
                    value={formatNumericValue(minutes)}
                    onChange={(event) => handleFunction(event, setMinutes)}
                />
                <span>:</span>
                <input
                    type="text"
                    name="seconds"
                    title="seconds"
                    max="60"
                    min="0"
                    value={formatNumericValue(seconds)}
                    onChange={(event) => handleFunction(event, setSeconds)}
                />
            </div>
        </>
    );
};

export default TimerClock;
