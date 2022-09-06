import Button from '@/Components/Button';
import Authenticated from '@/Layouts/Authenticated';
import { Head, Link, usePage } from '@inertiajs/inertia-react'
import { FaPlus } from 'react-icons/fa';
import React from 'react'
import Input from '@/Components/Input';
import PostCard from '@/Components/PostCard';

const List = () => {
    const { props } = usePage();

    return (
        <Authenticated
            auth={props.auth}
            header={<div className='flex flex-row justify-between items-center h-8'>
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">Post List</h2>
                <div>
                    <Input placeholder={'Search posts...'} className={'w-96 h-9'} />
                </div>
                <Link
                    href={route('posts.create')}
                    className='inline-flex bg-black text-white items-center px-4 py-1 rounded-md'
                >
                    <FaPlus size={12} />&nbsp; <span className='uppercase text-xs'>Add Post</span>
                </Link>
            </div>}
        >
            <Head title='Posts' />
            <div className='bg-gray-200 px-1 overflow-y-scroll h-full'>
                <div className='grid sm:grid-cols-6 grid-cols-1'>
                    {props.posts.map((post, index) => (
                        <div key={index} className='p-1 rounded-md overflow-hidden'>
                            <PostCard post={post}  />
                        </div>
                    ))}
                </div>
            </div>
        </Authenticated>
    )
}

export default List
