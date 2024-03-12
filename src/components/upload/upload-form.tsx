import { useMutation } from "@tanstack/react-query";
import { ChangeEvent, FormEvent, useRef } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import useImages from "~/hooks/useImages";
import PreviewGrid from "./preview-grid";
import axios from "axios";

export default function UploadForm() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { images, setImages } = useImages();

  const mutation = useMutation({
    mutationFn: async (body: FormData) => {
      const res = await axios
        .post(`${import.meta.env.VITE_APP_API_URL}/posts/new`, body, {
          withCredentials: true,
        })
        .then((r) => r.data);

      console.log(res);

      return { valid: true };
    },
  });

  function handleFormSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!images) return;

    const formData = new FormData();
    images.forEach((currentFile, i) => {
      formData.append(`image-${i}`, currentFile);
    });

    mutation.mutate(formData);
  }

  function handleFilesChange(e: ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return;

    setImages([...e.target.files]);
  }

  return (
    <div className="flex flex-col">
      <Button
        className={`mx-auto h-16 px-8 text-xl font-semibold`}
        onClick={() => {
          fileInputRef.current?.click();
        }}
      >
        Select Pictures to Post
      </Button>

      <form onSubmit={handleFormSubmit} className="flex flex-col space-y-4">
        <Input
          type="file"
          onChange={handleFilesChange}
          ref={fileInputRef}
          className="hidden"
          multiple
        />

        <PreviewGrid />

        <Button
          className={`mx-auto h-12 px-6 text-xl font-semibold ${images.length === 0 && "invisible"}`}
          type="submit"
          disabled={images.length === 0}
        >
          Post
        </Button>
      </form>
    </div>
  );
}
