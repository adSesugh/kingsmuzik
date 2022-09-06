import Authenticated from '@/Layouts/Authenticated'
import { Head, Link, usePage } from '@inertiajs/inertia-react'
import React from 'react'

const Show = () => {
    const { props } = usePage()
    console.log(props.category);
    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
        >
            <Head title={props.category.name} />
            <div className='flex sm:flex-row flex-col justify-between'>
                <div className='sm:w-1/3'>
                    {props.category.name}
                </div>
                <div className='sm:w-2/3 bg-gray-300'>
                    <div className='grid sm:grid-cols-3 grid-cols-1 w-full divide-x-2'>
                        {props.category.posts.map((post, index) => (
                            <Link key={index} href={route('posts.show', post.slug)}>
                                <div className='w-full'>
                                    <img src={post.coverImg} />
                                    <div className='-mt-30 bg-white shadow-2xl'>
                                        <h1 className='text-lg font-bold'>{post.title}</h1>
                                    </div>
                                    <p className='truncate-200'>{post.content}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </Authenticated>
    )
}

export default Show
