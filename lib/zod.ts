import * as z from "zod";

export const uploadBookSchema = z.object({
  pdfFile: z
    .instanceof(File)
    .refine((file) => file.size <= 52428800, "PDF file must be max 50MB"),
  coverImage: z.instanceof(File).optional(),
  title: z.string().min(1, "Title is required"),
  authorName: z.string().min(1, "Author name is required"),
  voiceId: z.string().min(1, "Please select a voice"),
});
