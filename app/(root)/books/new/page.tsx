import UploadBookForm from "@/components/UploadBookForm";
import React from "react";

const AddNewBookPage = () => {
  return (
    <main className="wrapper container">
      <div className="mx-auto max-w-180 space-y-10">
        <section className="flex flex-col gap-5">
          <h1 className="page-title-xl">Add a New Book</h1>
          <p className="subtitle">
            Upload a PDF to generate your interactive interview
          </p>
        </section>
        <UploadBookForm />
      </div>
    </main>
  );
};

export default AddNewBookPage;
