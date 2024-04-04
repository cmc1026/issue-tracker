import { z } from 'zod';

export const issueSchema = z.object({
    description: z.string().min(1, 'Description is required'),
    title: z.string().min(1, 'Title is required').max(255),
    
});
