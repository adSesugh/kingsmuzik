import { Link } from '@inertiajs/inertia-react'
import moment from 'moment'
import React from 'react'
import { FaTwitter } from 'react-icons/fa'

const Comment = ({ feeds }) => {
    
    return (
        <div className='h-full overflow-y-scroll pb-2 bg-white'>
            {feeds?.length === 0 ? (
                <div className='flex h-full items-center justify-center'>
                    <div className='flex flex-col items-center justify-center'>
                        <FaTwitter size={40} />
                        <span className='italic'>There are no current feed!</span>
                    </div>
                </div>
            ): (
                <>
                    {feeds?.data.map((feed, index) => (
                        <div key={index} className='h-28 rounded-tl-[30px] rounded-br-[30px] bg-white shadow-xl my-1'>
                            <div className='flex flex-col justify-between h-full w-full px-2'>
                                <div className='overflow-hidden'>
                                    <span className='text-sm leading-4 px-2 italic'>{feed.message}</span>
                                    <p className='text-xs'>
                                        Post:- &nbsp;
                                        <Link className='uppercase text-[8px] font-semibold'>
                                            <span className='text-[10px] font-bold'>{feed.post}</span>
                                        </Link>
                                    </p>
                                </div>
                                <div className='flex flex-row justify-between'>
                                    <span className='text-[10px] uppercase'>{feed.sender}</span>
                                    <span className='text-xs px-2'>{moment(feed.createdAt).format('LL')}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </>
            )}
        </div>
    )
}

export default Comment