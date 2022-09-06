import React, { useEffect, useState } from 'react';
import Authenticated from '@/Layouts/Authenticated';
import { Head } from '@inertiajs/inertia-react';
import StatsCard from '@/Components/StatsCard';
import Comment from '@/Components/Comment';
import Trending from '@/Components/Trending';
import { FaPodcast } from 'react-icons/fa'

const comments = [
    {
        message: 'Blah blah blah There are no current feed! There are no current feed! There are no current feed! There are no current feed! ',
        sender: 'Abi Gbue',
        sentAt: '2022-07-23',
        post: 'Beans is cool'
    },
    {
        message: 'blah blah blah blah',
        sender: 'Abi Gam',
        sentAt: '2022-07-24',
        post: 'Bread and beans is cool'
    },
    {
        message: 'blah blah blah blah',
        sender: 'Abi Gam',
        sentAt: '2022-07-24',
        post: 'Bread and beans is cool'
    },
    {
        message: 'blah blah blah blah',
        sender: 'Abi Gam',
        sentAt: '2022-07-24',
        post: 'Bread and beans is cool'
    },
    {
        message: 'blah blah blah blah',
        sender: 'Abi Gam',
        sentAt: '2022-07-24',
        post: 'Bread and beans is cool'
    },
    {
        message: 'blah blah blah blah',
        sender: 'Abi Gam',
        sentAt: '2022-07-24',
        post: 'Bread and beans is cool'
    },
    {
        message: 'blah blah blah blah',
        sender: 'Abi Gam',
        sentAt: '2022-07-24',
        post: 'Bread and beans is cool'
    },
    {
        message: 'blah blah blah blah',
        sender: 'Abi Gam',
        sentAt: '2022-07-24',
        post: 'Bread and beans is cool'
    },
    {
        message: 'blah blah blah blah',
        sender: 'Abi Gam',
        sentAt: '2022-07-24',
        post: 'Bread and beans is cool'
    },
    {
        message: 'blah blah blah blah',
        sender: 'Abi Gam',
        sentAt: '2022-07-24',
        post: 'Bread and beans is cool'
    },
    {
        message: 'blah blah blah blah',
        sender: 'Abi Gam',
        sentAt: '2022-07-24',
        post: 'Bread and beans is cool'
    },
];

export default function Dashboard(props) {
    const [trendings, setTrendings] = useState([]);
    const [trend, setTrend] = useState();
    const [stats, setStats] = useState(props?.stats);

    useEffect(() => {
        if(props.trendings){
            setTrendings(props.trendings);
            setTrend(props.trendings[0]);
        }
    }, []);

    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
        >
            <Head title="Dashboard" />

            <div className='h-full sm:overflow-hidden overflow-y-scroll'>
                <div className='flex sm:flex-row flex-col justify-between mt-1 divide-x-2 h-full'>
                    <div className='sm:w-1/3 w-full border sm:my-0 mb-2'>
                        <div className='flex h-full px-2 justify-center items-center overflow-hidden'>
                            <div className='grid w-full sm:grid-cols-2 grid-cols-1 divide-x-2 divide-y-8 overflow-y-scroll'>
                                <StatsCard type="Total Income" value={`${'\u20a6'+ Intl.NumberFormat().format(stats.income)}`} />
                                <StatsCard type="Purchases" value={stats.purchases} />
                                <StatsCard type="Posts" value={stats.posts} />
                                <StatsCard type="Total Views" value={stats.views} />
                                <StatsCard type="Registered members" value={stats.members} />
                            </div>
                        </div>
                    </div>
                    <div className='sm:w-1/3 w-full sm:px-0 px-2'>
                        <div className='flex flex-col h-full justify-between w-full'>
                            <div className='sm:h-[8%] h-[8%] bg-white border-b-2'>
                                <div className='flex h-full items-center px-2'>
                                    <h1>Comment Feeds</h1>
                                </div>
                            </div>
                            <div className='h-[92%]'>
                                <Comment feeds={stats.comments} />
                            </div>
                        </div>
                    </div>
                    <div className='sm:w-1/3 w-full sm:px-0 px-2 mr-2'>
                        <div className='flex flex-col justify-between h-full w-full'>
                            <div className='h-[8%] bg-slate-200'>
                                <div className='flex h-full items-center'>
                                    <h1 className='px-1'>Top 12 Trending Posts</h1>
                                </div>
                            </div>
                            <div className='h-[92%]'>
                                {trendings.length === 0 && (
                                    <div className='flex flex-col h-full justify-center items-center'>
                                        <FaPodcast size={40} />
                                        <span className='italic'>There are no trending post this time</span>
                                    </div>
                                )}
                                {trendings.length !== 0 && (
                                    <div className='h-full pb-4'>
                                        <Trending trending={trend} trendings={trendings} />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}