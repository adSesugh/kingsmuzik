import Authenticated from '@/Layouts/Authenticated';
import { usePage } from '@inertiajs/inertia-react'
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { FaTwitter } from 'react-icons/fa';
import AudioPlayer from '@/Components/AudioPlayer';
import { Parser } from 'html-to-react';

const Show = () => {
    const { props } = usePage();
    const [total, setTotal] = useState(0);

    useEffect(() => {
        // if(props?.post.purchases){
        //     let sum = 0;
        //     props?.post.purchases.forEach(el => {
        //         sum += Number(el.amount);
        //     })

        //     setTotal(sum);
        // }
    }, [total])

    return (
        <Authenticated
            auth={props.auth}
        >
            <div className='flex flex-col sm:flex-row justify-between p-1 h-full overflow-y-scroll sm:overflow-y-hidden md:overflow-y-hidden'>
                <div className='sm:w-2/5 bg-gray-50 shadow-2xl'>
                    <div className='flex flex-col w-full items-center my-3 px-2'>
                        <div className='flex flex-col w-full bg-gray-100/75 p-2'>
                            <p className='text-sm uppercase'>{props.post.title}</p>
                            <div className='flex space-x-3 mt-2'>
                                <div className='flex bg-purple-600 px-4 rounded-md text-white items-center justify-center'>
                                    <span className='text-sm'>{props.post.views} views</span>
                                </div>
                                <div className='flex bg-gray-600 px-4 rounded-md text-white items-center justify-center'>
                                    <span className='text-sm'>{props.post.purchases} purchases</span>
                                </div>
                            </div>
                        </div>
                        <table className='table table-auto w-full mt-5'>
                            <tbody>
                                <tr>
                                    <td>
                                        <span className='text-xs'>Status</span>
                                    </td>
                                    <td>
                                        {props.post.status === 1 ? (
                                            <span className='text-xs px-3 bg-green-700 text-white rounded-md py-1'>PUBLISHED</span>
                                        ): props.post.status === 0 ? (
                                            <span className='text-xs px-3 bg-gray-700 text-white rounded-md py-1'>DRAFT</span>
                                        ): (
                                            <span className='text-xs px-3 bg-gray-300 text-white rounded-md py-1'>ARCHIVED</span>
                                        )}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <span className='text-xs'>Category</span>
                                    </td>
                                    <td>
                                        <div className='flex flex-row'>
                                            <div>
                                                <span className='text-md'>{props.post.category.name}</span>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan={2}>
                                        <img src={props.post.coverImg} className='flex w-full h-60' />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className='sm:w-3/5 bg-gray-50 shadow-2xl'>
                    {/* <audio controls>
                        <source src={props.post.media[0].original_url} type='audio/mpeg' />
                    </audio> */}
                    {props.post.audioUrl !== null || props.post.videoUrl !== null && (
                        <div className='flex flex-row justify-between items-center h-20 space-x-1'>
                            {props.post.audioUrl !== null && (
                                <div className={props.post.videoUrl !== null ? 'w-1/2': 'w-full'}>
                                    <img src={props.post.coverImg} />
                                </div>
                            )}
                            {props.post.videoUrl !== null && (
                                <div className={props.post.audioUrl !== null ? 'w-1/2' : 'w-full'}>
                                    <img src={props.post.videoUrl} />
                                </div>
                            )}
                        </div>
                    )}
                    <div className='flex flex-col h-full justify-center w-full my-3 p-3'>
                        {/* <p dangerouslySetInnerHTML={{ __html: props.post.content }}> */}
                        <p>
                            {Parser().parse(props.post.content)}
                        </p>
                    </div>
                </div>
                <div className='sm:w-2/5 pl-1'>
                    <div className='h-full'>
                        <div className='flex flex-col justify-between h-[18%] bg-white space-x-2'>
                            <div className='h-2/3 shadow-2xl border-b-2 px-2'>
                                <div className='flex h-full justify-center items-center'>
                                    <span className='text-xs font-bold'>Total Sales: &nbsp;</span> <span className='text-lg font-bold'>{'\u20a6'}{Intl.NumberFormat().format(total)}</span>
                                </div>
                            </div>
                            <div className='flex items-center h-1/3 shadow-2xl px-2'>
                                <h2 className='font-semibold'>Post Comments</h2>
                            </div>
                        </div>
                        <div className='w-full pb-10 h-[82%] overflow-y-scroll'>
                            {props.post?.comments.length === 0 ? (
                                <div className='flex h-full items-center justify-center'>
                                    <div className='flex flex-col items-center justify-center'>
                                        <FaTwitter size={40} />
                                        <span className='italic'>There are no current feed!</span>
                                    </div>
                                </div>
                            ): (
                                <>
                                    {props.post?.comments.map((feed, index) => (
                                        <div key={index} className='h-28 rounded-tl-[30px] rounded-br-[30px] bg-white shadow-xl my-1'>
                                            <div className='flex flex-col justify-between h-full w-full px-2'>
                                                <div className='overflow-hidden'>
                                                    <span className='text-sm leading-4 px-2 italic'>{feed.message}</span>
                                                </div>
                                                <div className='flex flex-row justify-between'>
                                                    <span className='text-[10px] uppercase'>By - {feed.name}</span>
                                                    <span className='text-[10px] text-slate-700 px-2'>{moment(feed.createdAt).format('LL')}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Authenticated>
    )
}

export default Show
