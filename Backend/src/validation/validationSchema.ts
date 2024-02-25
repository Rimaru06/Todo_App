import zod from 'zod';

export const userSchema = zod.object({
    email : zod.string().email(),
    firstName : zod.string(),
    lastName : zod.string(),
    password : zod.string().min(4)
})

export const SiginSchema = zod.object({
  email: zod.string().email(),
  password: zod.string().min(4),
});

export const todoSchema = zod.object({
    userId : zod.number(),
    title : zod.string(),
    description : zod.string()
})