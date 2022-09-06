import React from 'react'
import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link, usePage } from '@inertiajs/inertia-react';
import { useState } from 'react';
import { FaPodcast } from 'react-icons/fa'
import { useEffect } from 'react';
import VideoCanvas from '@/Components/VideoCanvas';
import { DefaultPlayer as Video } from 'react-html5video';
import 'react-html5video/dist/styles.css';

const AuthLayout = ({ children, type }) => {
    const { props } = usePage();
    const [trending, setTrending] = useState(props.trending);

    return (
        <div className='flex sm:flex-row h-screen justify-between bg-gradient-to-tr from-fuchsia-500 to-violet-500'>
            <div className='flex flex-col sm:w-1/2 w-full h-full sm:px-12 px-8 justify-center items-center bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-tr-[130px] rounded-bl-[130px] shadow-2xl'>
                <div className="flex flex-col w-full sm:max-w-md sm:px-10 py-4 px-4 bg-white shadow-md overflow-hidden rounded-tl-[30px] rounded-br-[30px] sm:mx-16 mx-4">
                    {children}
                    <div className='flex justify-center items-center w-full py-3 text-gray-500 hover:text-red-300 italic'>
                        {type === 'login' ? (
                            <Link href={route('register')}>
                                <h6 className='font-serif'>Do not have account? click here...</h6>
                            </Link>
                        ): type === 'register' ? (
                            <Link href={route('login')}>
                                <h6 className='font-serif'>Already registered? click here...</h6>
                            </Link>
                        ): (
                            <></>
                        )}
                    </div>
                </div>
                <div className='flex absolute top-5 left-5 motion-safe:animate-bounce'>
                    <Link href="/">
                        <ApplicationLogo className="w-20 h-20 fill-current text-gray-500" />
                    </Link>
                </div>
            </div>
            <div className='sm:w-1/2 w-full sm:visible sm:block hidden bg-gradient-to-r from-fuchsia-500 to-violet-500 shadow-inner rounded-bl-[130px]'>
                <div className='h-full'>
                    <div className='flex flex-col h-[15%] py-4 w-full justify-center items-center'>
                        <span className='text-2xl text-center text-white font-serif'>Welcome to KingsMuzik</span>
                        <div className='animate-pulse'>
                            <h6 className='italic text-gray-100 font-serif'>...a home of music and relaxation!</h6>
                        </div>
                    </div>
                    <div className='h-[3%] px-8'>
                        <h6 className='border-b italic text-gray-200 font-serif'>Trending Video</h6>
                    </div>
                    <div className='px-8 py-6 h-[80%]'>
                        
                        <div className='h-full rounded-3xl shadow-2xl overflow-hidden'>
                            <div className='flex justify-center items-center h-full'>
                                {Object.keys(trending).length === 0 && (
                                    <div className='flex flex-col justify-center items-center text-white'>
                                        <FaPodcast size={40} className='text-white' />
                                        <span className='italic'>There are no trending post this time</span>
                                    </div>
                                )}
                                {Object.keys(trending).length !== 0 && (
                                    <>
                                        {trending.videoUrl ? (
                                            <Video
                                                loop={false}
                                                muted={false}
                                                autoPlay={true}
                                                poster={trending.coverImg}
                                                controls={['PlayPause', 'Seek', 'Time', 'Volume', 'Fullscreen']}
                                                onCanPlayThrough={() => {
                                                    // Do stuff
                                                }}
                                            >
                                                <source src={trending.videoUrl} type="video/mp4" />
                                            </Video>
                                            // <video
                                            //     loop
                                            //     controls
                                            //     autoPlay
                                            //     poster={trending.coverImg}
                                            //     className="w-full h-full"
                                            // >
                                            //     <source className='h-full w-full' src={trending.videoUrl} type="video/mp4" />
                                            // </video>
                                        ): (
                                            <img src={trending.coverImg} className={'h-full w-full rounded-2xl'} />
                                        )}
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AuthLayout