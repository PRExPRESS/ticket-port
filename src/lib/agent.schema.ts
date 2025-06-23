import z from "@openai/zod";

const accessResultSchema = z.object({
  allowed: z.boolean(),
  role: z.enum(["admin", "customer", "organizer"]),
  details: z.string(),
});

const operationSchema = z.object({ message: z.string(), data: z.any() });
const formatSchema = z.object({ message: z.string(), component: z.string(), content: z.string() });

export { accessResultSchema, operationSchema, formatSchema };