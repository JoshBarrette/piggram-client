import { useMutation } from "@tanstack/react-query";
import { ChangeEvent, FormEvent, useRef } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import useFiles from "~/hooks/useFiles";
import PreviewGrid from "./preview-grid";

export default function UploadForm() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { files, setFiles, setPreviews } = useFiles();
  const mutation = useMutation({
    mutationFn: async (body: FormData) => {
      const res = await fetch(`${import.meta.env.VITE_APP_API_URL}/posts/new`, {
        method: "POST",
        body,
        credentials: "include",
      }).then(async (res) => await res.json());

      console.log(res);

      return { valid: true };
    },
  });

  function handleFormSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!files) return;

    const formData = new FormData();
    files.forEach((currentFile, i) => {
      formData.append(`picture-${i}`, currentFile);
    });

    mutation.mutate(formData);
  }

  function handleFilesChange(e: ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return;
    const newPreviews = new Array<string>();

    let newFiles: File[] = Array.from(e.target.files);
    newFiles = newFiles.slice(0, 9);
    newFiles.forEach((f) => {
      let reader = new FileReader();
      reader.readAsDataURL(f);
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          newPreviews.push(reader.result);
          setPreviews([...newPreviews]); // this needs to be here :(
        }
      };
    });

    setFiles(newFiles);
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
          className={`mx-auto h-12 px-6 text-xl font-semibold ${files.length === 0 && "invisible"}`}
          type="submit"
          disabled={files.length === 0}
        >
          Post
        </Button>
      </form>
    </div>
  );
}
