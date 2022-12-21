import Input from '@/Components/Input';
import Label from '@/Components/Label';
import Authenticated from '@/Layouts/Authenticated'
import { Link, useForm, usePage } from '@inertiajs/inertia-react'
import Select from 'react-select'
import React, { useState } from 'react';
import Button from '@/Components/Button';
import { FaArrowLeft, FaRegSave } from 'react-icons/fa';
import { RichTextEditor } from '@mantine/rte';
import ValidationErrors from '@/Components/ValidationErrors';

const initialValue = '<p>Your initial <b>html value</b> or an empty string to init editor without value</p>';

const Create = () => {
    const { props } = usePage();
    const [fileType, setFileType] = useState();
    const [value, onChange] = useState(initialValue);
    const [catValue, setCatValue] = useState();
    const { data, setData, post, processing, progress, errors, reset } = useForm({
        title: undefined,
        category_id: undefined,
        status: 0,
        coverImg: undefined,
        content: undefined
    })

    const handleImageUpload = (file) => new Promise((resolve, reject) => {
        const formData = new FormData();
        formData.append('image', file);

        fetch('https://api.imgbb.com/1/upload?key=api_key', {
            method: 'POST',
            body: formData,
        })
        .then((response) => response.json())
        .then((result) => resolve(result.data.url))
        .catch(() => reject(new Error('Upload failed')));
    });

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.value);
    };

    const onSubmit = (e) => {
        e.preventDefault();

        post(route('posts.store'));

        reset();
    }

    return (
        <Authenticated
            auth={props.auth}
        >
            <ValidationErrors errors={errors} />
            <div className='p-1 h-full sm:overflow-y-hidden md:overflow-y-hidden'>
                <form onSubmit={onSubmit} className='flex flex-col sm:flex-row justify-between p-1 h-full overflow-y-scroll sm:overflow-y-hidden md:overflow-y-hidden'>
                    <div className='w-full sm:w-2/5 bg-gray-50 shadow-2xl'>
                        <div className='flex flex-col h-full w-full items-center my-3 overflow-y-scroll'>
                            <div className='w-4/5 pb-2'>
                                <Label value={'Title'} />
                                <Input
                                    name='title'
                                    className='mt-1 block w-full'
                                    value={data.title}
                                    handleChange={onHandleChange}
                                />
                            </div>
                            <div className='w-4/5 py-2'>
                                <Label value={'Category'} />
                                <Select
                                    value={catValue}
                                    options={props.categories}
                                    onChange={(e) => {
                                        setData({...data, ['category_id']: e.value})
                                        setCatValue(e)
                                        setFileType(e.label)
                                    }}
                                />
                            </div>
                            <div className='w-4/5 py-1'>
                                <Label value={'Status'} />
                                <div className='border-2 border-gray-100 p-2'>
                                    <div className='flex flex-row space-x-4'>
                                        <div className='relative inline-block justify-center'>
                                            <input
                                                name='status'
                                                type='radio'
                                                onChange={(e) => {
                                                    setData({...data, ['status']: 0})
                                                }}
                                                checked={data.status === 0 ? true : false}
                                            /> <span className='text-xs'>DRAFT</span>
                                        </div>
                                        <div className='relative inline-block justify-center'>
                                            <input
                                                name='status'
                                                type='radio'
                                                onChange={(e) => {
                                                    setData({...data, ['status']: 1})
                                                }}
                                                checked={data.status === 1 ? true : false}
                                            /> <span className='text-xs'>PUBLISH</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='w-4/5 py-1 my-1 h-24 border-2 border-dashed'>
                                <div className='w-full h-full flex flex-col items-center justify-center'>
                                    <Label value={'Post Cover'} />
                                    <input
                                        name='coverImg'
                                        type="file"
                                        //value={data.video}
                                        onChange={e => setData('coverImg', e.target.files[0])}
                                        className='w-full'
                                    />
                                    <div>
                                        {progress && (
                                            <progress value={progress.percentage} max="100">
                                                {progress.percentage}%
                                            </progress>
                                        )}
                                    </div>
                                </div>
                            </div>
                            {fileType && fileType === 'Music' ? (
                                <div className='w-4/5 py-1'>
                                    <Label value={'Audio File'} />
                                    <div className='flex items-center justify-center h-24 border-2 border-dashed'>
                                        <input
                                            name='audio'
                                            type="file"
                                            onChange={e => setData('audioUrl', e.target.files[0])}
                                            className='w-full '
                                        />
                                    </div>
                                    {progress && (
                                        <progress value={progress.percentage} max="100">
                                            {progress.percentage}%
                                        </progress>
                                    )}
                                </div>
                            ): fileType === 'Video' ? (
                                <div className='w-4/5 py-2'>
                                    <Label value={'Video File'} />
                                    <input
                                        name='video'
                                        type="file"
                                        onChange={e => setData('videoUrl', e.target.files[0])}
                                        className='w-full h-24 border-2 border-dashed'
                                    />
                                    {progress && (
                                        <progress value={progress.percentage} max="100">
                                            {progress.percentage}%
                                        </progress>
                                    )}
                                </div>
                            ) : (
                                <>
                                    <div className='w-4/5 py-1 my-1 h-24 border-2 border-dashed'>
                                        <div className='w-full h-full flex flex-col items-center justify-center'>
                                            <Label value={'Audio File'} />
                                            <input
                                                name='audio'
                                                type="file"
                                                onChange={e => setData('audioUrl', e.target.files[0])}
                                                className='w-full'
                                            />
                                            <div>
                                                {progress && (
                                                    <progress value={progress.percentage} max="100">
                                                        {progress.percentage}%
                                                    </progress>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div className='w-4/5 py-1 my-1 h-24 border-2 border-dashed'>
                                        <div className='w-full h-full flex flex-col items-center justify-center'>
                                            <Label value={'Video File'} />
                                            <input
                                                name='video'
                                                type="file"
                                                //value={data.video}
                                                onChange={e => setData('videoUrl', e.target.files[0])}
                                                className='w-full'
                                            />
                                            <div>
                                                {progress && (
                                                    <progress value={progress.percentage} max="100">
                                                        {progress.percentage}%
                                                    </progress>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                    <div className='w-full sm:w-3/5 bg-gray-50 shadow-2xl'>
                        <div className='flex flex-col w-full my-3'>
                            <div className='flex w-full justify-center items-center'>
                                <div className='w-11/12 h-72 pb-2'>
                                    <RichTextEditor
                                        value={value}
                                        onChange={(e) => {
                                            setData({...data, ['content']: e})
                                        }}
                                        className='h-full'
                                    />
                                </div>
                            </div>
                            <div className='py-6 text-right pr-6 space-x-2'>
                                <Link href={route('posts.index')}>
                                    <Button IconName={FaArrowLeft} >Go back</Button>
                                </Link>
                                <Button IconName={FaRegSave}>Save Post</Button>
                            </div>
                        </div>
                    </div>
                    <div className='w-full sm:w-2/5 pl-1'>
                        <div className='bg-white shadow-2xl py-2 border-b-2 px-2'>Recent 10 Posts</div>
                        <div className='w-full pb-10 h-full overflow-y-scroll'>
                            {props.posts.map((post, index) => (
                                <div className='flex justify-between border-b w-full' key={index}>
                                    <div className='w-[25%]'>
                                        <img src={post.coverImg} className='h-20 w-20' />
                                    </div>
                                    <div className='flex flex-col w-[83%] py-1 justify-center'>
                                        <h4 className='font-semibold text-ellipsis'>{post.title}</h4>
                                        <span className='w-20 text-center rounded-xl text-xs text-white italic bg-slate-700'>{post.category.name}</span>
                                        <p className='text-sm truncate'>{post.content}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </form>
            </div>
        </Authenticated>
    )
}

export default Create
