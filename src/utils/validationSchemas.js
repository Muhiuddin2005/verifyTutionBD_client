import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Please enter a valid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" })
});

export const registerSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long" })
    .max(50, { message: "Name cannot exceed 50 characters" }),
  role: z
    .enum(["student", "tutor"], { errorMap: () => ({ message: "Please select a role" }) }),
  phone: z
    .string()
    .min(10, { message: "Phone number must be at least 10 characters" })
    .regex(/^\+?[0-9\s-]{10,15}$/, { message: "Please enter a valid phone number" }),
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Please enter a valid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" })
    .regex(/^(?=.*[A-Za-z])(?=.*\d)/, { message: "Password must contain at least one letter and one number" })
});

export const contactSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long" }),
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Please enter a valid email address" }),
  subject: z
    .string()
    .min(3, { message: "Subject must be at least 3 characters long" }),
  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters long" })
});

export const tuitionSchema = z.object({
  title: z
    .string()
    .min(5, { message: "Title must be at least 5 characters long" })
    .max(100, { message: "Title cannot exceed 100 characters" }),
  subject: z
    .string()
    .min(2, { message: "Subject must be at least 2 characters long" }),
  classLevel: z
    .string()
    .min(1, { message: "Please select a class level" }),
  location: z
    .string()
    .min(2, { message: "Location must be at least 2 characters long" }),
  budget: z
    .union([z.string(), z.number()])
    .transform((val) => Number(val))
    .refine((val) => !isNaN(val) && val > 0, { message: "Budget must be a positive number" }),
  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters long" })
});

export const profileSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long" }),
  phone: z
    .string()
    .min(10, { message: "Phone number must be at least 10 characters" })
    .regex(/^\+?[0-9\s-]{10,15}$/, { message: "Please enter a valid phone number" })
});
