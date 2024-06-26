'use client';

import { Button, Callout, TextField, Text, colorProp } from '@radix-ui/themes';
import SimpleMDE from "react-simplemde-editor";
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import 'easymde/dist/easymde.min.css';
import { useRouter } from 'next/navigation';  //This works the app router
import { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { issueSchema } from '@/app/ValidationSchema';
import { z } from 'zod';
import ErrorMessage from '@/app/Components/ErrorMessage';
import Spinner from '../../Components/Spinner';


type IssueForm = z.infer<typeof issueSchema>;

const NewIssuePage = () => {
    const { register, control, handleSubmit, formState: { errors } } = useForm<IssueForm>({
        resolver: zodResolver(issueSchema)

    });
    const router = useRouter();
    const [ error, setError ] = useState('');
    const [ isSubmitting, setSubmitting] = useState(false);
    const onSubmit = handleSubmit(async (data) => {
        try {
            setSubmitting(true);
            await axios.post('/api/issues', data);
            router.push('/issues');
        } catch (error) {
            setSubmitting(false);
            setError('An unexspected error occurred'); 
        }
        });

    return (
        <div className='max-w-xl'>
            { errors.title && (<Callout.Root color='red' className='mb-5'>
                    <Callout.Text>{errors.title?.message}</Callout.Text>
                </Callout.Root>
                 ) }

            <form className='space-y-3' 
                onSubmit={onSubmit}>
                
                <TextField.Root >
                    <TextField.Input placeholder='Title' {...register('title')} />
                </TextField.Root>

                <ErrorMessage >
                    {errors.title?.message}
                </ErrorMessage>
                
                <Controller
                    name="description"
                    control={control}
                    render={( { field }) => <SimpleMDE placeholder='Description' {...field} />}
                />
                
                <ErrorMessage>
                    {errors.description?.message}
                </ErrorMessage>
                
                <Button disable={isSubmitting}>Submit New Issue { isSubmitting && <Spinner />}
                </Button>
            </form>
        </div>
    )
}

export default NewIssuePage