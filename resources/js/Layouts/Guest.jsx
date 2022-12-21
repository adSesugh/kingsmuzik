import React from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link, usePage } from '@inertiajs/inertia-react';
import { FaHome } from 'react-icons/fa';
import Footer from '@/Components/Footer';

export default function Guest({ children }) {
    const { props } = usePage()
    return (
        <div className="flex-1 h-full">
            <div className='h-16 border-b bg-gradient-to-tr from-pink-600 to-violet-600 w-full px-4'>
                <div className='flex justify-between items-center'>
                    <Link href="/">
                        <ApplicationLogo className="w-14 h-14 fill-current text-white" />
                    </Link>
                    <div className='flex'>
                        <Link href={route('login')} className="font-serif text-white w-20 text-sm text-center px-2 py-1">
                            <span>About us</span>
                        </Link>
                        {props.auth.user ? (
                            <Link href={route('dashboard')} className="text-sm text-gray-700">
                                Account
                            </Link>
                        ) : (
                            <div className='flex bg-violet-700 divide-x-2 justify-center'>
                                <Link href={route('login')} className="font-serif text-white w-16 text-sm text-center px-2 py-1">
                                    <span>Log in</span>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className='h-12 bg-gradient-to-tr from-pink-600 to-violet-600 w-full'>
                <div className='flex flex-row justify-between items-center h-full overflow-x-scroll'>
                    <div className='flex items-center justify-center w-[5%] font-serif text-white'>
                        <Link href='/'>
                            <FaHome size={32} />
                        </Link>
                    </div>
                    <div className='w-[70%] h-full'>
                        {props.categories.length !== 0 && (
                            <div className='flex h-full'>
                                {props.categories.map((category, index) => (
                                    <Link href={route('category', category.slug)} key={index} className='flex h-full justify-center items-center w-24 border border-gray-50'>
                                        <h4 className='font-serif text-white'>{category.name}</h4>
                                    </Link>
                                ))}
                            </div>
                        )}
                        
                    </div>
                    <div className='w-[25%] px-2'>
                        <div className=''>
                            <input className='w-full rounded-md' />
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full">
                {children}
                <div className='bg-gray-600 divide-y-2 py-2 mt-2'>
                    <Footer />
                </div>
            </div>
        </div>
    );
}
