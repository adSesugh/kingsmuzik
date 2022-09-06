import React from 'react'
import { BiPause, BiPlay } from 'react-icons/bi'
import { BsPause, BsPlay, BsPlayBtn, BsSkipBackwardFill, BsSkipForwardFill } from 'react-icons/bs'
import { FaFastBackward, FaStepBackward } from 'react-icons/fa'
import { GrFastForward } from 'react-icons/gr'

const AudioControl = ({ isPlaying, onPlayPauseClick }) => {
    return (
        <div className=''>
            <div className='flex flex-row items-center justify-center'>
                <div className='p-3 bg-slate-100 bg-opacity-30 shadow-inner border border-slate-50 rounded-full'>
                    {!isPlaying ? (
                        <BsPlay onClick={() => onPlayPauseClick(true)} size={28} className='text-slate-50' />
                    ): (
                        <BsPause onClick={() => onPlayPauseClick(false)} size={28} className='text-slate-50' />
                    )}
                </div>
            </div>
        </div>
    )
}

export default AudioControl