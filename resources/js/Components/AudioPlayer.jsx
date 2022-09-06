import React, { useState, useEffect, useRef } from 'react'
import AudioControl from './AudioControl'

const AudioPlayer = ({ track }) => {
    const [isPlaying, setIsPlaying] = useState(false)
    const [duration, setDuration] = useState(0);
    const { title, coverImg, audioUrl } = track;
    const audioRef = useRef(new Audio(audioUrl));
    const intervalRef = useRef();

    useEffect(() => {
        if(isPlaying){
            audioRef.current.play();
            setInterval(() => {
                setDuration(audioRef?.current.currentTime);
            }, 1000);
        } else {
            audioRef.current.pause()
        }

        return () => {
            audioRef.current.pause();
            clearInterval(intervalRef.current)
        }

    }, [isPlaying]);

    return (
        <div className='h-full w-full'>
            <div className='relative inline-block h-[230px] w-full'>
                <img src={coverImg} className='h-full w-full relative' />
                <div className='flex items-center absolute top-2 left-2'>
                    <img 
                        src={coverImg}
                        alt={title}
                        className='rounded-full h-28 w-28 shadow-2xl border-2 border-gray-50' 
                    />
                    <h2 className='text-xs italic px-2 uppercase'>{title}</h2>
                </div>
                <div className='flex flex-col absolute top-40 right-2 left-2 h-16 rounded-2xl bg-opacity-90'>
                    <AudioControl 
                        isPlaying={duration === audioRef.current.duration ? false : isPlaying}
                        onPlayPauseClick={setIsPlaying}
                    />
                </div>
            </div>
        </div>
    )
}

export default AudioPlayer