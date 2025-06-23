import { z } from "zod";

export const createEventSchema = z.object({
  organizerId: z.string().min(1, "Organizer ID is required"),
  title: z.string().min(1, "Title is required"),
  banner: z.any(), // File validation can be handled in the form
  image: z.any(),
  location: z.string().min(1, "Location is required"),
  category: z.string().min(1, "Category is required"),
  description: z.string().min(1, "Description is required"),
  date: z.string().min(1, "Date is required"),
  time: z.string().min(1, "Time is required"),
}); 