import React from 'react';

export default function Button({ type = 'submit', className = '', processing, children, IconName }) {
    return (
        <button
            type={type}
            className={
                `inline-flex items-center px-4 space-x-4 py-2 bg-gray-900 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest active:bg-gray-900 transition ease-in-out duration-150 ${
                    processing && 'opacity-25'
                } ` + className
            }
            disabled={processing}
        >
            {IconName && <IconName size={12} />} &nbsp; {children}
        </button>
    );
}
