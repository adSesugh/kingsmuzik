import { usePage } from '@inertiajs/inertia-react'
import React from 'react'

const Edit = () => {
    const { props } = usePage();

    return (
        <Authenticated
            auth={props.auth}
        >
            <div>Edit</div>
        </Authenticated>
    )
}

export default Edit