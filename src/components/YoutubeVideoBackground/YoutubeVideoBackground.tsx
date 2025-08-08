import React, { useEffect, useRef, useState } from "react";
import YouTube, { type YouTubeEvent, type YouTubePlayer } from "react-youtube";
import styles from "./YoutubeVideoBackground.module.css";

interface YoutubeVideoBackgroundProps {
    videoId: string;
    startVideo: boolean;
    pauseVideo: boolean;
}

const YoutubeVideoBackground: React.FC<YoutubeVideoBackgroundProps> = ({
    videoId,
    startVideo,
    pauseVideo,
}) => {
    const playerRef = useRef<YouTubePlayer | null>(null);
    const [isMuted, setIsMuted] = useState<boolean>(true);

    useEffect(() => {
        playerRef.current?.setVolume(2.5);
    }, [isMuted]);

    useEffect(() => {
        if (startVideo) {
            handlePlay();
            playerRef.current?.unMute();
            setIsMuted(false);
        }

        if (pauseVideo) {
            handlePause();
        }
    }, [startVideo, pauseVideo]);

    const onReady = (event: YouTubeEvent) => {
        playerRef.current = event.target;
        playerRef.current.playVideo();
    };

    const handlePlay = () => {
        playerRef.current?.playVideo();
    };

    const handlePause = () => {
        playerRef.current?.pauseVideo();
    };

    const handleVolumeUp = () => {
        const currentVolume = playerRef.current?.getVolume();
        if (currentVolume !== undefined) {
            playerRef.current?.setVolume(currentVolume + 2.5);
        }
    };

    const handleVolumeDown = () => {
        const currentVolume = playerRef.current?.getVolume();
        if (currentVolume !== undefined) {
            playerRef.current?.setVolume(currentVolume - 2.5);
        }
    };

    const handleMute = () => {
        if (isMuted) {
            playerRef.current?.unMute();
            setIsMuted(false);
            return;
        }

        playerRef.current?.mute();
        setIsMuted(true);
    };

    const opts = {
        playerVars: {
            autoplay: 1,
            controls: 0,
            mute: 1,
            loop: 1,
            playlist: videoId,
            showinfo: 0,
            rel: 0,
            iv_load_policy: 3,
        },
    };

    return (
        <>
            <div className={styles.videoBackgroundContainer}>
                <YouTube videoId={videoId} opts={opts} onReady={onReady} />
            </div>
            <div className={styles.controls}>
                <button onClick={handlePlay}>Play</button>
                <button onClick={handlePause}>Pause</button>
                <button onClick={handleVolumeUp}>Volume +</button>
                <button onClick={handleVolumeDown}>Volume -</button>
                <button onClick={handleMute}>Mute</button>
            </div>
        </>
    );
};

export default YoutubeVideoBackground;
