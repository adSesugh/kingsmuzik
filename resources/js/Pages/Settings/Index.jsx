import Authenticated from '@/Layouts/Authenticated'
import { usePage } from '@inertiajs/inertia-react'
import React from 'react'

const Index = () => {
    const { props } = usePage()

    return (
        <Authenticated
            auth={props.auth}
        >
            <div>Settings</div>
        </Authenticated>
    )
}

export default Index