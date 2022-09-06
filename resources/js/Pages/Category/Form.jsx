import Button from '@/Components/Button'
import Input from '@/Components/Input'
import Label from '@/Components/Label'
import ValidationErrors from '@/Components/ValidationErrors'
import { useForm, usePage } from '@inertiajs/inertia-react'
import React, { useEffect } from 'react'
import { FaPlus } from 'react-icons/fa';

const Form = ({ category }) => {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
    });

    useEffect(() => {
        reset('name');
    }, [category]);

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();

        post(route('categories.store'));

        reset('name');
    };

    return (
        <div>
            <ValidationErrors errors={errors} />
            <form onSubmit={submit}>
                <div>
                    <Label forInput="name" value="Name" />

                    <Input
                        type="text"
                        name="name"
                        value={category !== undefined && Object.keys(category).length !== 0 ? category.name : data.name}
                        className="mt-1 block w-full"
                        isFocused={true}
                        handleChange={onHandleChange}
                    />
                </div>
                <div className="flex items-center justify-end mt-4">
                    <Button className="ml-4" processing={processing} IconName={FaPlus}>
                        Add Category
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default Form
