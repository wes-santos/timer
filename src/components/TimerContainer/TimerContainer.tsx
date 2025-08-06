import TimerButton from "../TimerButton";
import TimerClock from "../TimerClock";
import styles from "./TimerContainer.module.css";
import tempo from "../../assets/tempo.mp3";

import Play from "../../assets/play.svg?react";
import Pause from "../../assets/pause.svg?react";
import Restart from "../../assets/restart.svg?react";
import React, { useEffect, useState } from "react";

enum ButtonOptions {
    Start = "Start",
    Stop = "Stop",
    Restart = "Restart",
}

let interval: number | undefined;

const TimerContainer = () => {
    const [minutes, setMinutes] = useState<number>(25);
    const [seconds, setSeconds] = useState<number>(0);
    const [startTimer, setStartTimer] = useState<boolean>(false);

    useEffect(() => {
        if (startTimer) {
            const oneSecondInMiliseconds = 1 * 1000;
            interval = setInterval(() => {
                if (seconds > 0) {
                    setSeconds((prev) => prev - 1);
                    return;
                }

                if (seconds === 0 && minutes > 0) {
                    setSeconds(59);
                    setMinutes((prev) => prev - 1);
                    return;
                }
            }, oneSecondInMiliseconds);
        }

        if (seconds === 0 && minutes === 0 && startTimer) {
            const audio = new Audio(tempo);
            audio.play();
        }

        return () => clearInterval(interval);
    }, [seconds, minutes, startTimer]);

    const handleChange = (
        event: React.ChangeEvent<HTMLInputElement>,
        setFunction: React.Dispatch<React.SetStateAction<number>>
    ) => {
        setFunction(parseInt(event.target.value));
    };

    const handleTimerStop = () => {
        if (interval) {
            clearInterval(interval);
        }
        setStartTimer(false);
    };

    const handleTimerRestart = () => {
        handleTimerStop();
        setMinutes(25);
        setSeconds(0);
    };

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        const { name } = event.currentTarget;

        switch (name) {
            case ButtonOptions.Start:
                setStartTimer(true);
                break;
            case ButtonOptions.Stop:
                handleTimerStop();
                break;
            case ButtonOptions.Restart:
                handleTimerRestart();
                break;
            default:
                console.log("Button option not recognized.");
                break;
        }
    };

    return (
        <div className={styles.timerContainer}>
            <TimerClock
                minutes={minutes}
                setMinutes={setMinutes}
                seconds={seconds}
                setSeconds={setSeconds}
                handleFunction={handleChange}
            />
            <div className={styles.timerButtonsContainer}>
                <TimerButton
                    icon={Play}
                    text={ButtonOptions.Start}
                    onClick={handleClick}
                />
                <TimerButton
                    icon={Pause}
                    text={ButtonOptions.Stop}
                    onClick={handleClick}
                />
                <TimerButton
                    icon={Restart}
                    text={ButtonOptions.Restart}
                    onClick={handleClick}
                />
            </div>
        </div>
    );
};

export default TimerContainer;
