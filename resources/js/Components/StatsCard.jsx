import React from 'react'

const StatsCard = ({ type, value}) => {
    return (
        <div className='h-28 sm:w-48 rounded-xl bg-white'>
            <div className='flex flex-col h-full justify-between'>
                <div className='h-[70%] p-2'>
                    <div className='flex h-full justify-center items-center'>
                        <span className='font-bold'>{value}</span>
                    </div>
                </div>
                <div className='h-[30%] p-2'>
                    <div className='flex h-full items-center'>
                        <span className='text-md font-normal'>{type}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StatsCard