import React from 'react'
import { DefaultPlayer as Video } from 'react-html5video';
import 'react-html5video/dist/styles.css';

const VideoCanvas = ({ video, image, playing }) => {
    return (
        <div className='h-5/6 w-full'>
            <Video
                loop={false}
                muted={false}
                autoPlay={playing}
                poster={image}
                controls={['PlayPause', 'Seek', 'Time', 'Volume', 'Fullscreen']}
                onCanPlayThrough={() => {
                    // Do stuff
                }}
            >
                <source src={video} type="video/mp4" />
            </Video>
        </div>
    )
}

export default VideoCanvas