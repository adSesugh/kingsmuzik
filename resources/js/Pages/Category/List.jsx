import Button from '@/Components/Button';
import Input from '@/Components/Input';
import Label from '@/Components/Label';
import ValidationErrors from '@/Components/ValidationErrors';
import Authenticated from '@/Layouts/Authenticated';
import { Head, Link, useForm, usePage } from '@inertiajs/inertia-react'
import React, { useEffect, useState } from 'react'
import Form from './Form';

const List = () => {
    const { props } = usePage();
    const [categories, setCategories] = useState(props?.categories.data);
    const [category, setCategory] = useState({});

    useEffect(() => {
        if(props){
            setCategories(props.categories.data);
            setCategory(props.category)
        }
    }, []);

    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
        >
            <Head title='Category' />

            <div className="py-12 w-full">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm">
                        <div className='flex flex-col-reverse sm:flex-row justify-between divide-x-2'>
                            <div className='sm:w-2/3 shadow-2xl overflow-scroll'>
                                <table className='table table-auto w-full'>
                                    <thead>
                                        <tr>
                                            <th>s/N</th>
                                            <td>Category</td>
                                            <th>Added by</th>
                                            <td>Posts</td>
                                            <td className='text-right'>Actions</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {categories.length > 0 ? (
                                            <>
                                                {categories.map((category, index) => (
                                                    <tr key={category.id}>
                                                        <td>{index+1}</td>
                                                        <td>{category.name}</td>
                                                        <td>{category.user}</td>
                                                        <td>{category.postCount}</td>
                                                        <td className='space-x-2 place-items-end text-right'>
                                                            <Link
                                                                href={route('categories.edit', category.slug)}
                                                                className='px-2 py-1 text-white bg-yellow-600'
                                                            >
                                                                <span className='text-xs'>Edit</span>
                                                            </Link>
                                                            <span>|</span>
                                                            <Link
                                                                href={route('categories.show', category.slug)}
                                                                className='px-2 py-1 text-white bg-gray-600'
                                                            >
                                                                <span className='text-xs'>View Details</span>
                                                            </Link>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </>
                                        ): (
                                            <tr className='w-full items-center'>
                                                <td colSpan={5}>Not Record Found</td>
                                            </tr>
                                        )}

                                    </tbody>
                                </table>
                            </div>
                            <div className='sm:w-1/3 shadow-2xl'>
                                <div className='px-2 py-2'>
                                    <div className='border-b pb-2'>
                                        <h1 className='text-sm font-bold'>Create Category</h1>
                                    </div>
                                    <div className='mx-4 pt-4 h-full py-8'>
                                        {props.status && <div className="mb-4 font-medium text-sm text-green-600">{props.status}</div>}
                                        <Form category={category} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Authenticated>
    )
}

export default List
