import BookCard from "@/components/BookCard";
import HeroSection from "@/components/HeroSection";
import { ModeToggle } from "@/components/mode-toggle";
import { sampleBooks } from "@/lib/constant";
import Image from "next/image";
import React from "react";

function Home() {
  return (
    <>
      <main className="wrapper container">
        <HeroSection />
        <div className="library-books-grid">
          {sampleBooks.map((book) => (
            <BookCard book={book} key={book._id} />
          ))}
        </div>
      </main>
      <footer className="mt-2 flex justify-between items-center">
        <ModeToggle />
        <p className="font-bold">&copy; 2023 Bookify. All rights reserved.</p>
      </footer>
    </>
  );
}

export default Home;
