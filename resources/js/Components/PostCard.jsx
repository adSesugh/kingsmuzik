import React from 'react';
import moment from 'moment';
import PostAudioPlayer from './PostAudioPlayer';
import VideoCanvas from './VideoCanvas'
import { Link } from '@inertiajs/inertia-react';

const PostCard = ({ post }) => {
    return (
        <div className='flex flex-col justify-center h-76 bg-white'>
            <div className='h-full'>
                <div className='flex h-[70%]'>
                    {post.audioUrl ? (
                        <PostAudioPlayer track={post} />
                    ): post.videoUrl ? (
                        <div className='h-full'>
                            <VideoCanvas 
                                video={post.videoUrl} 
                                image={post.coverImg} 
                                playing={false} 
                            />
                        </div>
                    ): (
                        <img src={post.coverImg} />
                    )}
                </div>
                <Link href={route('posts.show', post.slug)} className='flex flex-col shadow-2xl h-[20%] p-2 py-1'>
                    <p className='text-xs font-bold uppercase lines-2 py-2 h-[50%]'>{post.title}</p>
                    <div className='flex flex-row justify-between items-center h-[50%]'>
                        <div className='text-xs font-semibold text-white bg-slate-400 px-3 rounded'>{post.views ?? 0}</div>
                        <div className='text-xs font-semibold text-white bg-slate-500 px-3 rounded'>{post.purchases ?? 0}</div>
                        <div className='text-[10px] italic font-semibold text-white bg-slate-600 px-2 rounded'>{moment(post.created_at).format('LL')}</div>
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default PostCard