import { createFileRoute } from "@tanstack/react-router";
import { Toaster } from "~/components/ui/toaster";
import UploadForm from "~/components/upload/upload-form";
import useImages from "~/hooks/useImages";

export const Route = createFileRoute("/upload")({
  loader: () => {
    useImages().setImages([]);
  },
  component: Upload,
});

function Upload() {
  return (
    <div className="flex h-full items-center justify-center">
      <UploadForm />
      <Toaster />
    </div>
  );
}
