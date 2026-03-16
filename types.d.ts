import { uploadBookSchema } from "./lib/zod";

export interface BookCardProps {
  book: {
    _id: string;
    coverURL: string;
    title: string;
    author: string;
    slug: string;
  };
}

export type UploadBookFormValues = z.infer<typeof uploadBookSchema>;
