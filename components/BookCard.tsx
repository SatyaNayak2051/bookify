import { BookCardProps } from "@/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const BookCard: React.FC<BookCardProps> = ({
  book: { _id, coverURL, title, author, slug },
}) => {
  return (
    <Link href={`/books/${slug}`} className="library-hero-card">
      <article className="book-card">
        <figure className="book-card-figure">
          <div className="book-card-cover-wrapper">
            <Image
              src={coverURL}
              alt={title}
              width={133}
              height={200}
              className="book-card-cover"
            />
          </div>
          <figcaption className="book-card-meta">
            <h3 className="book-card-title">{title}</h3>
            <p className="book-card-author">{author}</p>
          </figcaption>
        </figure>
      </article>

      {/* <h3 className="library-hero-book-title">{title}</h3>
      <p className="library-hero-book-author">{author}</p> */}
    </Link>
  );
};

export default BookCard;
