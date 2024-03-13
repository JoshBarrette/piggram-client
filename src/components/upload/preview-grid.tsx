import { X, PlusSquare } from "lucide-react";
import { ChangeEvent, useEffect, useRef, useState, DragEvent } from "react";
import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";
import useImages from "~/hooks/useImages";

export default function PreviewGrid({ isPending }: { isPending: boolean }) {
  const { images, previews } = useImages();
  const [emptyArr, setEmptyArr] = useState<number[]>(new Array().fill(0));

  useEffect(() => {
    setEmptyArr(new Array(9 - images.length).fill(0));
  }, [images]);

  return (
    <div className="flex">
      <div className={`grid grid-cols-3 gap-2`}>
        {previews.map((pre, i) => (
          <PreviewCard preview={pre} index={i} isPending={isPending} key={i} />
        ))}

        {emptyArr.map((_, i) => (
          <EmptyCard isPending={isPending} key={i} />
        ))}
      </div>
    </div>
  );
}

function PreviewCard({
  preview,
  index,
  isPending,
}: {
  preview: string;
  index: number;
  isPending: boolean;
}) {
  const { images, setImages, removeImage } = useImages();

  function handleOnDrag(e: DragEvent) {
    e.dataTransfer.setData("swap_index", index + "");
  }

  function handleDragDrop(e: DragEvent<HTMLDivElement>) {
    const fromIndex = parseInt(e.dataTransfer.getData("swap_index"));
    const temp = images[fromIndex];
    images[fromIndex] = images[index];
    images[index] = temp;
    setImages([...images]);
  }

  return (
    <Card
      className="group relative flex size-40 items-center justify-center overflow-hidden"
      draggable
      onDragStart={handleOnDrag}
      onDrop={handleDragDrop}
      onDragOver={(e) => e.preventDefault()}
    >
      <Button
        className="absolute right-2 top-2 z-20 size-8 rounded-full"
        variant="secondary"
        onClick={() => removeImage(index)}
        type="button"
        disabled={isPending}
      >
        <X className="absolute left-[3px] top-[2px] size-7" />
      </Button>
      <img
        src={preview}
        className="w-full transition-all group-hover:scale-110"
      />
    </Card>
  );
}

function EmptyCard({ isPending }: { isPending: boolean }) {
  const { images, setImages, moveImageToEnd } = useImages();
  const inputRef = useRef<HTMLInputElement | null>(null);

  function handleFilesChange(e: ChangeEvent<HTMLInputElement>) {
    if (!e.target.files || images.length >= 9) return;
    const newImages = [...e.target.files].splice(0, 9 - images.length);
    setImages([...images, ...newImages]);
  }

  function handleDragDrop(e: DragEvent<HTMLButtonElement>) {
    const fromIndex = parseInt(e.dataTransfer.getData("swap_index"));
    moveImageToEnd(fromIndex);
  }

  return (
    <>
      <input
        type="file"
        multiple
        hidden
        ref={inputRef}
        onChange={handleFilesChange}
      />
      <button
        className="rounded-xl"
        type="button"
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDragDrop}
        disabled={isPending}
      >
        <Card className="group relative flex size-40 items-center justify-center overflow-hidden">
          <PlusSquare className="size-10 text-neutral-500 transition-all group-hover:size-12" />
        </Card>
      </button>
    </>
  );
}
