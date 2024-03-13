import { createFileRoute } from "@tanstack/react-router";
import { Toaster } from "~/components/ui/toaster";
import UploadForm from "~/components/upload/upload-form";

export const Route = createFileRoute("/upload")({
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
