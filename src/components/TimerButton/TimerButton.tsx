import React from 'react';
import styles from './TimerButton.module.css';

type SvgComponentType = React.FunctionComponent<React.SVGProps<SVGSVGElement>>;

interface TimerButtonProps {
    icon: SvgComponentType,
    onClick(event: React.MouseEvent<HTMLButtonElement>): void,
    text: string,
};

const TimerButton: React.FC<TimerButtonProps> = ({ icon: Icon, text, onClick }) => {
    return (
        <button
            name={text}
            className={styles.button}
            onClick={onClick}
        >
            <Icon />
            {text}
        </button>
    );
};

export default TimerButton;