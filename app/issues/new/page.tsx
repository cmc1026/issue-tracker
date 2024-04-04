'use client';

import { Button, Callout, TextField, Text } from '@radix-ui/themes';
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
import Spinner from '@/app/Components/spinner';



type IssueForm = z.infer<typeof issueSchema>;


const NewIssuePage = () => {
    const { register, control, handleSubmit, formState: { errors } } = useForm<IssueForm>({
        resolver: zodResolver(issueSchema)

    });
    const router = useRouter();
    const [ error, setError ] = useState('');
    

    return (
        <div className='max-w-xl'>
            { errors.title && (<Callout.Root color="red" className='mb-5'>
                    <Callout.Text>{error}</Callout.Text>
                </Callout.Root>
            )}
            <form 
                className='space-y-3' 
                onSubmit={handleSubmit(async (data) => {
                    try {
                        await axios.post('/api/issues', data);
                        router.push('/issues');
                    } catch (error) {
                        setError('An unexspected error occurred');
                        
                    }
                
                })}>
                
                <TextField.Root>
                    <TextField.Input placeholder='Title' {...register('title')} />
                </TextField.Root>
                    <ErrorMessage>
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
                
                <Button>Submit New Issue <Spinner />
                </Button>
            </form>
        </div>
    )
}

export default NewIssuePage