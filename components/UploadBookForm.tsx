"use client";

import React, { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FileUp, Image, X, Radio } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  Form,
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
  FormField,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import LoadingOverlay from "@/components/LoadingOverlay";
import { UploadBookFormValues } from "@/types";
import { uploadBookSchema } from "@/lib/zod";

// Voice data
const MALE_VOICES = [
  { id: "dave", name: "Dave", description: "Warm & engaging tone" },
  { id: "daniel", name: "Daniel", description: "Clear & professional" },
  { id: "chris", name: "Chris", description: "Smooth & expressive" },
];

const FEMALE_VOICES = [
  { id: "rachel", name: "Rachel", description: "Friendly & approachable" },
  { id: "sarah", name: "Sarah", description: "Confident & articulate" },
];

// Validation schema

interface UploadBookFormProps {
  onSubmit?: (data: UploadBookFormValues) => Promise<void>;
}

const UploadBookForm: React.FC<UploadBookFormProps> = ({ onSubmit }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPdfFile, setSelectedPdfFile] = useState<File | null>(null);
  const [selectedCoverImage, setSelectedCoverImage] = useState<File | null>(
    null,
  );

  const form = useForm<UploadBookFormValues>({
    resolver: zodResolver(uploadBookSchema),
    defaultValues: {
      title: "",
      authorName: "",
      voiceId: "",
    },
  });

  const handleSubmit = async (data: UploadBookFormValues) => {
    setIsLoading(true);
    try {
      if (onSubmit) {
        await onSubmit(data);
      }
      // Default behavior: log the data
      console.log("Form submitted:", data);
    } catch (error) {
      console.error("Form submission error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePdfDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      const files = e.dataTransfer.files;
      if (files.length > 0) {
        const file = files[0];
        if (file.type === "application/pdf") {
          setSelectedPdfFile(file);
          form.setValue("pdfFile", file);
        }
      }
    },
    [form],
  );

  const handleCoverDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      const files = e.dataTransfer.files;
      if (files.length > 0) {
        const file = files[0];
        if (file.type.startsWith("image/")) {
          setSelectedCoverImage(file);
          form.setValue("coverImage", file);
        }
      }
    },
    [form],
  );

  const handlePdfSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      setSelectedPdfFile(file);
      form.setValue("pdfFile", file);
    }
  };

  const handleCoverSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      setSelectedCoverImage(file);
      form.setValue("coverImage", file);
    }
  };

  const removePdfFile = () => {
    setSelectedPdfFile(null);
    form.setValue("pdfFile", undefined as any);
  };

  const removeCoverImage = () => {
    setSelectedCoverImage(null);
    form.setValue("coverImage", undefined);
  };

  return (
    <>
      <LoadingOverlay isVisible={isLoading} message="Processing your book..." />

      <div className="new-book-wrapper min-h-screen bg-gradient-to-b from-[#f8f4e9] via-[#fff6e5] to-[#f8f4e9] px-4 py-12">
        <div className="mx-auto max-w-2xl">
          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="mb-2 font-serif text-4xl font-bold text-[#212a3b]">
              Add Your Book
            </h1>
            <p className="text-[#3d485e]">
              Share your literary work with the world
            </p>
          </div>

          {/* Form */}
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-8 rounded-xl bg-white p-8 shadow-soft-lg"
            >
              {/* PDF File Upload */}
              <FormField
                control={form.control}
                name="pdfFile"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="form-label text-[#212a3b]">
                      Book PDF
                    </FormLabel>
                    <FormControl>
                      <div
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={handlePdfDrop}
                        className="upload-dropzone relative rounded-lg border-2 border-dashed border-[#212a3b]/30 bg-[#fff6e5]/50 px-6 py-12 text-center transition-all hover:border-[#212a3b]/60 hover:bg-[#fff6e5]"
                      >
                        <input
                          type="file"
                          accept="application/pdf"
                          onChange={handlePdfSelect}
                          className="absolute inset-0 size-full cursor-pointer opacity-0"
                        />

                        {!selectedPdfFile ? (
                          <div className="flex flex-col items-center gap-3">
                            <FileUp className="size-10 text-[#663820]" />
                            <div>
                              <p className="font-medium text-[#212a3b]">
                                Click to upload PDF
                              </p>
                              <p className="text-sm text-[#3d485e]">
                                or drag and drop
                              </p>
                            </div>
                            <p className="text-xs text-[#3d485e]">
                              PDF file (max 50MB)
                            </p>
                          </div>
                        ) : (
                          <div className="flex items-center justify-between px-3 py-2">
                            <div className="flex items-center gap-3">
                              <FileUp className="size-5 text-[#663820]" />
                              <span className="text-sm font-medium text-[#212a3b]">
                                {selectedPdfFile.name}
                              </span>
                            </div>
                            <button
                              type="button"
                              onClick={removePdfFile}
                              className="rounded-md p-1 hover:bg-[#f3e4c7]"
                            >
                              <X className="size-4 text-[#212a3b]" />
                            </button>
                          </div>
                        )}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Cover Image Upload */}
              <FormField
                control={form.control}
                name="coverImage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="form-label text-[#212a3b]">
                      Cover Image
                    </FormLabel>
                    <FormControl>
                      <div
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={handleCoverDrop}
                        className="upload-dropzone relative rounded-lg border-2 border-dashed border-[#212a3b]/30 bg-[#fff6e5]/50 px-6 py-12 text-center transition-all hover:border-[#212a3b]/60 hover:bg-[#fff6e5]"
                      >
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleCoverSelect}
                          className="absolute inset-0 size-full cursor-pointer opacity-0"
                        />

                        {!selectedCoverImage ? (
                          <div className="flex flex-col items-center gap-3">
                            <Image className="size-10 text-[#663820]" />
                            <div>
                              <p className="font-medium text-[#212a3b]">
                                Click to upload cover image
                              </p>
                              <p className="text-sm text-[#3d485e]">
                                or drag and drop
                              </p>
                            </div>
                            <p className="text-xs text-[#3d485e]">
                              Leave empty to auto-generate from PDF
                            </p>
                          </div>
                        ) : (
                          <div className="flex items-center justify-between px-3 py-2">
                            <div className="flex items-center gap-3">
                              <Image className="size-5 text-[#663820]" />
                              <span className="text-sm font-medium text-[#212a3b]">
                                {selectedCoverImage.name}
                              </span>
                            </div>
                            <button
                              type="button"
                              onClick={removeCoverImage}
                              className="rounded-md p-1 hover:bg-[#f3e4c7]"
                            >
                              <X className="size-4 text-[#212a3b]" />
                            </button>
                          </div>
                        )}
                      </div>
                    </FormControl>
                    <FormDescription className="text-[#3d485e]">
                      Optional - we'll auto-generate one if not provided
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Title Input */}
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="form-label text-[#212a3b]">
                      Title
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="ex: Rich Dad Poor Dad"
                        className="form-input rounded-md border border-[#212a3b]/20 bg-white px-4 py-2 text-[#212a3b] placeholder:text-[#3d485e]/50 focus:border-[#663820] focus:ring-1 focus:ring-[#663820]/20"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Author Input */}
              <FormField
                control={form.control}
                name="authorName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="form-label text-[#212a3b]">
                      Author Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="ex: Robert Kiyosaki"
                        className="form-input rounded-md border border-[#212a3b]/20 bg-white px-4 py-2 text-[#212a3b] placeholder:text-[#3d485e]/50 focus:border-[#663820] focus:ring-1 focus:ring-[#663820]/20"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Voice Selector */}
              <FormField
                control={form.control}
                name="voiceId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="form-label text-[#212a3b]">
                      Choose Assistant Voice
                    </FormLabel>
                    <FormControl>
                      <div className="space-y-6">
                        {/* Male Voices */}
                        <div>
                          <h3 className="mb-3 text-sm font-semibold text-[#212a3b]">
                            Male Voices
                          </h3>
                          <div className="grid gap-3 sm:grid-cols-3">
                            {MALE_VOICES.map((voice) => (
                              <label
                                key={voice.id}
                                className={cn(
                                  "voice-selector-option relative flex cursor-pointer items-start gap-3 rounded-lg border-2 border-[#212a3b]/20 p-4 transition-all hover:border-[#663820]/50",
                                  field.value === voice.id &&
                                    "voice-selector-option-selected border-[#663820] bg-[#fff6e5]",
                                )}
                              >
                                <input
                                  type="radio"
                                  name="voiceId"
                                  value={voice.id}
                                  checked={field.value === voice.id}
                                  onChange={(e) =>
                                    field.onChange(e.target.value)
                                  }
                                  className="mt-1"
                                />
                                <div className="flex-1">
                                  <p className="font-medium text-[#212a3b]">
                                    {voice.name}
                                  </p>
                                  <p className="text-xs text-[#3d485e]">
                                    {voice.description}
                                  </p>
                                </div>
                              </label>
                            ))}
                          </div>
                        </div>

                        {/* Female Voices */}
                        <div>
                          <h3 className="mb-3 text-sm font-semibold text-[#212a3b]">
                            Female Voices
                          </h3>
                          <div className="grid gap-3 sm:grid-cols-2">
                            {FEMALE_VOICES.map((voice) => (
                              <label
                                key={voice.id}
                                className={cn(
                                  "voice-selector-option relative flex cursor-pointer items-start gap-3 rounded-lg border-2 border-[#212a3b]/20 p-4 transition-all hover:border-[#663820]/50",
                                  field.value === voice.id &&
                                    "voice-selector-option-selected border-[#663820] bg-[#fff6e5]",
                                )}
                              >
                                <input
                                  type="radio"
                                  name="voiceId"
                                  value={voice.id}
                                  checked={field.value === voice.id}
                                  onChange={(e) =>
                                    field.onChange(e.target.value)
                                  }
                                  className="mt-1"
                                />
                                <div className="flex-1">
                                  <p className="font-medium text-[#212a3b]">
                                    {voice.name}
                                  </p>
                                  <p className="text-xs text-[#3d485e]">
                                    {voice.description}
                                  </p>
                                </div>
                              </label>
                            ))}
                          </div>
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="form-btn w-full rounded-lg bg-[#663820] px-6 py-3 font-serif text-white transition-all hover:bg-[#663820]/90 disabled:opacity-50"
              >
                {isLoading ? "Processing..." : "Begin Synthesis"}
              </button>
            </form>
          </Form>
        </div>
      </div>
    </>
  );
};

export default UploadBookForm;
