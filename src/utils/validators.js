const { z } = require('zod')

const postTaskSchema = z.object({
    title: z.string({ required_error: 'Title is required' }),
    description: z.string({ required_error: 'Description is required' }),
    priority: z.enum(['Low', 'Medium', 'High'], { required_error: 'Priority is required' }),
    dueDate: z.string({ required_error: 'DueDate is required' }).regex(/^\d{4}-\d{1,2}-\d{1,2}$/, { message: 'Invalid date format' }),
    assignee: z.string({ required_error: 'Assignee is required' })
})

const postCommentSchema = z.object({
    text: z.string({ required_error: 'Comment text is required' })
})

const getTasksSchema = z.object({
    status: z.enum(['Todo', 'In Progress', 'Done']).optional(),
    priority: z.enum(['Low', 'Medium', 'High']).optional()
})

const putTaskSchema = z.object({
    status: z.enum(['Todo', 'In Progress', 'Done'], { required_error: 'Status is required' }),
    priority: z.enum(['Low', 'Medium', 'High'], { required_error: 'Priority is required' }),
    assignee: z.string({ required_error: 'Assignee is required' })
}).partial().refine((data) => Object.keys(data).length !== 0, { message: 'At least one field is required for task update' })

const searchTasksSchema = z.object({
    key: z.string({ required_error: 'Search key field is required' }).min(1)
})

const loginSchema = z.object({
    name: z.string().min(6),
    password: z.string().min(8)
})

module.exports = {
    postTaskSchema,
    postCommentSchema,
    getTasksSchema,
    putTaskSchema,
    loginSchema,
    searchTasksSchema
}