import { createFileRoute } from "@tanstack/react-router";
import { ScrollArea } from "~/components/ui/scroll-area";
import { Toaster } from "~/components/ui/toaster";
import UploadForm from "~/components/upload/upload-form";
import { isAuthed } from "~/lib/utils";

export const Route = createFileRoute("/upload")({
  beforeLoad: () => isAuthed(),
  component: Upload,
});

function Upload() {
  return (
    <div className="flex h-full items-center justify-center">
      <ScrollArea>
        <div>
          <UploadForm />
          <Toaster />
        </div>
      </ScrollArea>
    </div>
  );
}
