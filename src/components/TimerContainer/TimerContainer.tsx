import TimerButton from "../TimerButton";
import TimerClock from "../TimerClock";
import styles from "./TimerContainer.module.css";
import ButtonOptions from "../../utils/ButtonOptions";

import Play from "../../assets/play.svg?react";
import Pause from "../../assets/pause.svg?react";
import Restart from "../../assets/restart.svg?react";
import React from "react";
import YoutubeVideoBackground from "../YoutubeVideoBackground";

interface TimerContainerProps {
    startTimer: boolean;
    minutes: number;
    seconds: number;
    setMinutes: React.Dispatch<React.SetStateAction<number>>;
    setSeconds: React.Dispatch<React.SetStateAction<number>>;
    handleChangeFunction(
        event: React.ChangeEvent<HTMLInputElement>,
        setFunction: React.Dispatch<React.SetStateAction<number>>
    ): void;
    handleClickFunction(event: React.MouseEvent<HTMLButtonElement>): void;
}

const TimerContainer: React.FC<TimerContainerProps> = ({
    startTimer,
    minutes,
    seconds,
    setMinutes,
    setSeconds,
    handleChangeFunction,
    handleClickFunction,
}) => {
    return (
        <>
            <YoutubeVideoBackground
                startVideo={startTimer}
                pauseVideo={!startTimer}
                videoId="jfKfPfyJRdk"
            />
            <div className={styles.timerContainer}>
                <TimerClock
                    minutes={minutes}
                    setMinutes={setMinutes}
                    seconds={seconds}
                    setSeconds={setSeconds}
                    handleFunction={handleChangeFunction}
                />
                <div className={styles.timerButtonsContainer}>
                    <TimerButton
                        icon={Play}
                        text={ButtonOptions.Start}
                        onClick={handleClickFunction}
                    />
                    <TimerButton
                        icon={Pause}
                        text={ButtonOptions.Stop}
                        onClick={handleClickFunction}
                    />
                    <TimerButton
                        icon={Restart}
                        text={ButtonOptions.Restart}
                        onClick={handleClickFunction}
                    />
                </div>
            </div>
        </>
    );
};

export default TimerContainer;
