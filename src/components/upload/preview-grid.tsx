import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";
import useFiles from "~/hooks/useFiles";

export default function PreviewGrid() {
  const { files, setFiles, previews, setPreviews } = useFiles();
  const [emptyArr, setEmptyArr] = useState<number[]>(new Array().fill(0));

  function removePicture(i: number) {
    setFiles([...files.slice(0, i), ...files.slice(i + 1)]);
    setPreviews([...previews.slice(0, i), ...previews.slice(i + 1)]);
  }

  useEffect(() => {
    setEmptyArr(new Array(9 - files.length).fill(0));
  }, [files]);

  return (
    <div className="flex">
      <div className={`grid grid-cols-3 gap-2`}>
        {previews.map((pre, i) => (
          <Card
            key={i}
            className="group relative flex size-48 items-center justify-center overflow-hidden"
          >
            <Button
              className="absolute right-2 top-2 z-20 size-8 rounded-full"
              variant="secondary"
              onClick={() => removePicture(i)}
              type="button"
            >
              <X className="absolute left-[3px] top-[2px] size-7" />
            </Button>
            <img
              src={pre}
              className="min-w-full transition-all group-hover:scale-110"
            />
          </Card>
        ))}

        {emptyArr.map((_, i) => (
          <Card
            key={i}
            className="group relative flex size-48 items-center justify-center overflow-hidden"
          />
        ))}
      </div>
    </div>
  );
}
