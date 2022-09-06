import VideoCanvas from '@/Components/VideoCanvas';
import Guest from '@/Layouts/Guest'
import { Head, Link, usePage } from '@inertiajs/inertia-react'
import React, { Fragment, useState } from 'react'
import { Parser } from 'html-to-react';
import moment from 'moment';

const SinglePost = () => {
    const { props } = usePage();
    const [selectedIndex, setSelectedIndex] = useState(0)

    console.log(props.auth)
   
    return (
        <Guest>
            <Head title={props.title} />
            <div className='h-full bg-gray-200'>
                <div className='flex sm:flex-row flex-col h-full'>
                    <div className='flex-col sm:w-4/6 w-full h-full px-1 mx-6'>
                        <div className='flex h-10 bg-white shadow-2xl my-2 justify-between items-center px-2'>
                            <p className='text-md font-serif font-semibold'>{props.post.title}</p>
                            <span className='text-xs py-1 px-2 text-white bg-gray-500 rounded-md text-center'>{props.post.views} views</span>
                        </div>
                        <div className=''>
                            {props?.audioUrl && props.videoUrl !== undefined ? (
                                <AudioPlayer track={props.post.audioUrl} />
                            ): props.post?.videoUrl || props.post.audioUrl ? (
                                <div className=''>
                                    <VideoCanvas 
                                        video={props.post.videoUrl}
                                    />
                                </div>
                            ): (
                                <div className='h-[450px]'>
                                    <img src={props.post?.coverImg} className={'h-full w-full'} />
                                </div>
                            )}
                        </div>
                        <div>
                            <p className='font-serif'>{Parser().parse(props.post.content)}</p>
                        </div>
                        <div className='mt-8 bg-white mx-6 px-10 py-4'>
                            <div className='flex items-center h-8 bg-white px-2 py-6 shadow-2xl'>Add Comments</div>
                            <form>
                                {props.auth.user === null && (
                                    <Fragment>
                                        <div className='mt-3'>
                                            <input type={'text'} placeholder='Your Name' className='w-full rounded-md' />
                                        </div>
                                        <div className='mt-3'>
                                            <input type={'email'} placeholder='Email Address' className='w-full rounded-md' />
                                        </div>
                                    </Fragment>
                                )}
                                <div className='mt-3'>
                                    <textarea placeholder='Message' rows={6} maxLength={150} className='w-full rounded-md' />
                                </div>
                                <div className='mt-3'> 
                                    <button type='submit' className='bg-gradient-to-tr from-purple-400 to-blue-400 text-white py-1 px-10'>Submit</button>
                                </div>
                            </form>
                        </div>
                        {props.post?.comments.length !== 0 && (
                            <div className='py-2 mx-6'>
                                <div className='flex items-center h-8 bg-white px-2 py-6 shadow-2xl'>Comments</div>
                                <div className='h-full overflow-y-scroll space-y-[1px] w-full'>
                                    {props.post.comments.map((comment, index) => (
                                        <div key={index} className={`bg-white`}>
                                            <div className='flex w-full h-full my-2'>
                                                <div className='flex flex-col justify-between h-full w-full px-2'>
                                                    <div className='overflow-hidden'>
                                                        <span className='text-xs leading-4 px-2 italic'>{comment.message}</span>
                                                    </div>
                                                    <div className='flex flex-row justify-between py-2'>
                                                        <span className='text-[10px] uppercase font-serif font-semibold text-gray-600'>by:- {comment.name}</span>
                                                        <span className='text-[10px] px-2'>{moment(comment.createdAt).format('LL')}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                    <div className='sm:w-2/6 sm:visible sm:block hidden h-full overflow-y-scroll'>
                        <div className='flex flex-col justify-between h-full'>
                            <div className='w-full pr-1 py-2'>
                                <div className='flex items-center h-8 bg-white px-2 py-1 shadow-2xl'>Recent posts</div>
                                {props.recents && (
                                    <div className='h-full overflow-y-scroll space-y-[1px] w-full'>
                                        {props.recents?.map((post, index) => (
                                            <Link href={route('detail', post.slug)} key={index} className='h-[20%]'>
                                                <div className='flex flex-row w-full h-full justify-between bg-gradient-to-br from-slate-400 to-purple-400 divide-y-2'>
                                                    <div className='w-[20%]'>
                                                        <img src={post.coverImg} className='w-full h-full' />
                                                    </div>
                                                    <div className='flex flex-col w-[80%] px-1 h-full justify-center'>
                                                        <h5 className='font-serif text-md capitalize'>{post.title}</h5>
                                                        <div className='flex flex-row justify-between mt-1'>
                                                            <div><span className='text-xs text-gray-800'>{post.views} views</span></div>
                                                            <div><span className='text-xs text-gray-800'>{post.comments.length} comments</span></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                )}
                                {!props.recents && (
                                    <div>No record</div>
                                )}
                            </div>
                            <div className='h-1/2'>
                                <div>
                                    <div className='flex items-center h-8 bg-white px-2'>Recent purchases</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Guest>
    )
}

export default SinglePost