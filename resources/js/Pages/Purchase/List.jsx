import Authenticated from '@/Layouts/Authenticated'
import { usePage } from '@inertiajs/inertia-react'
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { MdPayments } from 'react-icons/md';
import { BsRecord } from 'react-icons/bs';

const List = () => {
    const { props } = usePage();
    const [showing, setShowing] = useState();

    useEffect(() => {
        if(props?.posts.length > 0){
            setShowing(props.posts[0]);
        }
    }, [])

    const onSelect = (id) => {
        const post = props.posts.find(x => x.id === id);
        setShowing(post);
    }

    const totalSales = (id) => {
        const post = props.posts.find(x => x.id === id);
        let sum=0;
        post.purchases.forEach(purchase => {
            sum += Number(purchase.amount);
        });

        return sum;
    }

    return (
        <Authenticated
            auth={props.auth}
        >
            <div className='h-full w-full overflow-y-scroll'>
                <div className='flex sm:flex-row flex-col sm:h-full justify-between overflow-hidden'>
                    <div className='sm:w-1/3 w-full bg-slate-300 overflow-y-scroll px-2'>
                        {props.posts.length !== 0 && (
                            <>
                                {props.posts.map((post, index) => (
                                    <div key={index} onClick={() => onSelect(post.id)} className='flex h-20 w-full overflow-hidden shadow-2xl my-2 rounded-tl-[30px] rounded-br-[30px] cursor-pointer select'>
                                        <div className='flex w-full justify-between items-center'>
                                            <div className='h-20 w-[20%] overflow-hidden'>
                                                <img src={post.coverImg} className='h-full rounded-lg' />
                                            </div>
                                            <div className='h-20 w-[80%] bg-white'>
                                                <div className='flex flex-col h-full items-center px-2'>
                                                    <div className='flex flex-col h-full justify-between items-center'>
                                                        <p>{post.title}</p>
                                                        <span className='text-lg font-bold text-right w-full'><span className='text-xs font-bold'>Total Sales:</span> {'\u20a6'}{Intl.NumberFormat().format(totalSales(post.id))}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </>
                        )}
                        {props.posts.length === 0 && (
                            <div className='flex flex-col h-full justify-center items-center'>
                                <MdPayments size={60} />
                                <span>There is no purchase yet!</span>
                            </div>
                        )}
                    </div>
                    <div className='sm:w-2/3 w-full overflow-y-scroll pl-1'>
                        {showing?.purchases.length > 0 && (
                            <div className='grid sm:grid-cols-4 space-x-2 space-y-2 px-2'>
                                {showing.purchases.map((purchase, index) => (
                                    <div key={index} className='h-32 bg-white shadow-2xl rounded-lg mt-2'>
                                        <div className='flex flex-col justify-between h-full p-2'>
                                            <span className='w-full text-left'>@{purchase.user.username}</span>
                                            <div className='w-full text-center'>
                                                <span className='w-full text-center text-xl font-bold'>{'\u20a6'}{ Intl.NumberFormat().format(purchase.amount) }</span>
                                            </div>
                                            <span className='w-full text-left text-xs italic text-slate-500'>{moment(purchase.created_at).format('LL')}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                        {showing?.purchases.length === 0 && (
                            <div className='flex flex-col h-full justify-center items-center'>
                                <BsRecord size={60} />
                                <span>Purchases not found!</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Authenticated>
    )
}

export default List
