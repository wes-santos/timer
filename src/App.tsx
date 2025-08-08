import { useEffect, useState } from "react";
import tempo from "./assets/tempo.mp3";
import TimerContainer from "./components/TimerContainer";
import ButtonOptions from "./utils/ButtonOptions";

let interval: number | undefined;

function App() {
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

            setStartTimer(false);
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
        <>
            <TimerContainer
                startTimer={startTimer}
                minutes={minutes}
                seconds={seconds}
                setMinutes={setMinutes}
                setSeconds={setSeconds}
                handleChangeFunction={handleChange}
                handleClickFunction={handleClick}
            />
        </>
    );
}

export default App;
