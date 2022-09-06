import { Link } from '@inertiajs/inertia-react'
import React, { useState } from 'react'
import AudioPlayer from './AudioPlayer'
import VideoCanvas from './VideoCanvas'

//'http://127.0.0.1:3000/resources/js/assets/media/mov_bbb.mp4'
//'http://127.0.0.1:3000/resources/js/assets/media/leanonme.mp3'

const Trending = ({ trending, trendings }) => {
    const [playing, setPlaying] = useState(trending);

    return (
        <div className='flex flex-col justify-between h-full w-full mx-1 space-y-1 divide-x-2'>
            <div className='h-[45%]'>
                {playing?.audioUrl && playing.videoUrl !== undefined ? (
                    <AudioPlayer track={playing} />
                ): playing?.videoUrl || playing.audioUrl ? (
                    <div className=''>
                        <VideoCanvas 
                            video={playing.videoUrl}
                        />
                    </div>
                ): (
                    <img src={playing?.coverImg} className={'h-full w-full'} />
                )}
            </div>
            <div className='h-[55%]'>
                {trendings.length !== 0 && (
                    <div className='flex h-full w-full overflow-y-scroll'>
                        <div className={'grid grid-cols-3 w-full divide-y-2 divide-x-2'}>
                            {trendings.map((trend, index) => (
                                <div key={trend.id} 
                                    className={`${trend.id === playing.id ? 'cursor-wait ' : 'cursor-pointer '} 'h-24 select-auto`} 
                                    onClick={() => setPlaying(trend)}
                                >
                                    <img src={trend.coverImg} className='w-full h-full' />
                                </div>
                            ))} 
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Trending