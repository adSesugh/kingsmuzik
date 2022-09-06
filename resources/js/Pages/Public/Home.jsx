import Input from '@/Components/Input'
import Guest from '@/Layouts/Guest'
import { Head, Link, usePage } from '@inertiajs/inertia-react'
import React, { useEffect, useState } from 'react'
import moment from 'moment'

const Home = () => {
    const { props } = usePage()

    const [selectedIndex, setSelectedIndex] = useState(0)
    const [current, setCurrent] = useState(props.trendings[selectedIndex]);
    const [trendings, setTrendings] = useState(props.trendings);
    const [comments, setComments] = useState({})
    const [isPlaying, setIsPlaying] = useState(true);
    const [nextIndex, setNextIndex] = useState(1)

    useEffect(() => {
        setTimeout(() => {
            if(isPlaying){
                const next = nextIndex + 1

                if(next > props.trendings.length ){
                    setSelectedIndex(0)
                    setNextIndex(1)
                    setCurrent(props.trendings[0])
                }
                else {
                    setCurrent(props.trendings[nextIndex])
                    setComments(props.trendings[nextIndex].comments) 
                    setSelectedIndex(next - 1)
                    setNextIndex(next);
                }     
            }
        }, 10000);
    }, [current, selectedIndex, nextIndex])

    const changeIndex = (selected) => {
        setCurrent(selected)
        setComments(selected.comments)
        setIsPlaying(false)
    }

    console.log(current)

    return (
        <Guest>
            <Head title='Home' />
            <div className='h-full'>
                <div className='sm:h-96 h-44 border-b'>
                    <div className='flex h-full w-full sm:justify-between'>
                        <div className='sm:w-2/3 w-full h-full bg-gray-800'>
                            <div className='flex w-full h-full justify-between'>
                                <div className='w-1/3 bg-slate-300 sm:block hidden'>
                                    {Object.keys(comments).length !== 0 && (
                                        <div className='h-[8%] px-2 bg-white items-center'>
                                            <h3 className='font-serif'>Feeds</h3>
                                        </div>
                                    )}
                                    <div className={`${ Object.keys(comments).length !== 0 ? 'h-[92%]' : 'h-full' } overflow-hidden`}>
                                        {Object.keys(comments).length !== 0 ? (
                                            <div className='h-full overflow-y-scroll'>
                                                {comments.map((comment, index) => (
                                                    <div key={index} className='h-28 rounded-tl-[30px] rounded-br-[30px] bg-white shadow-xl my-1'>
                                                        <div className='flex flex-col justify-between h-full w-full px-2'>
                                                            <div className='overflow-hidden'>
                                                                <span className='text-xs leading-4 px-2 italic'>{comment.message}</span>
                                                            </div>
                                                            <div className='flex flex-row justify-between'>
                                                                <span className='text-[10px] uppercase'>{comment.sender}</span>
                                                                <span className='text-[10px] px-2'>{moment(comment.createdAt).format('LL')}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        ): (
                                            <div className='flex h-full justify-center items-center'>
                                                <span className='italic text-xs'>No Feed yet</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className='sm:w-2/3 w-full animate-wiggle'>
                                    <img src={current?.coverImg} alt="" className='h-full w-full animate-pulse' />
                                </div>
                            </div>
                        </div>
                        <div className='sm:w-1/3 sm:block hidden h-full bg-slate-300'>
                            <div className='w-full h-full'>
                                <div className='flex h-[8%] items-center px-2 w-full bg-gradient-to-tr from-blue-600 to-purple-600'>
                                    <h3 className='text-white'>Trending</h3>
                                </div>
                                <div className='flex h-[92%] overflow-hidden w-full pl-1'>
                                    {trendings?.length !== 0 && (
                                        <div className='h-full overflow-y-scroll space-y-[1px] w-full'>
                                            {trendings?.map((trending, index) => (
                                                <div key={index} className={`${index === selectedIndex && 'bg-gradient-to-tr from-gray-400 to-purple-500 '} h-[20%] bg-gray-400 cursor-pointer select-none`} onClick={() => {
                                                    changeIndex(trending)
                                                    setSelectedIndex(index)
                                                }}>
                                                    <div className='flex w-full h-full justify-between'>
                                                        <div className='w-[20%] h-full'>
                                                            <img src={trending.coverImg} className='w-full h-full' />
                                                        </div>
                                                        <div className='flex flex-col w-[80%] px-1 h-full justify-center'>
                                                            <h5 className='font-serif text-md capitalize'>{trending.title}</h5>
                                                            <div className='flex flex-row justify-between mt-1'>
                                                                <div><span className='text-xs text-gray-800'>{trending.views} views</span></div>
                                                                <div><span className='text-xs text-gray-800'>{trending.comments.length} comments</span></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex sm:flex-col mx-1'>
                    <div className='grid sm:grid-cols-5 grid-cols-1 sm:space-x-1 sm:space-y-1 w-full items-center justify-center'>
                        {props.posts.data.map((post, index) => (
                            <div key={index} className='flex flex-col h-80 justify-between' data-aos={index%2 === 0 ? 'fade-up' : 'fade-down'}>
                                <Link href={route('detail', post.slug)} className='flex flex-col h-full'>
                                    <div className='relative h-full inline-block w-full'>
                                        <img src={post.coverImg} className='flex h-full w-full hover:animate-bounce rounded-xl' />
                                        <div className='flex flex-col absolute bottom-0 bg-gray-400/60 rounded-xl px-2 py-1 w-full'>
                                            <div className='flex justify-between items-center border-b'>
                                                <span className='text-white px-6 bg-black/50 font-serif rounded-xl text-xs'>{post.category.name}</span>
                                                <span className='flex bg-red-600 text-white rounded-full h-6 w-6 items-center justify-center text-[12px] font-serif'>{post.views}</span>
                                            </div>
                                            <span className='text-black py-1 font-semibold font-serif text-xs'>{post.title}</span>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Guest>
    )
}

export default Home