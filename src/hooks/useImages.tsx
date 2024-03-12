import { useEffect } from "react";
import { create } from "zustand";
import { useToast } from "~/components/ui/use-toast";
import { ImageSchema } from "~/lib/image-validation";

export default function useImages(showFailTost: boolean = true) {
  const { images, setPreviews, setImages, previews } = useImagesStore();
  const { toast } = useToast();

  useEffect(() => {
    const newPreviews = new Array<string>();

    images.forEach((f) => {
      newPreviews.push(URL.createObjectURL(f));
    });
    setPreviews([...newPreviews]);
  }, [images]);

  function parseAndSetImages(images: File[]) {
    images = images.slice(0, 9).filter((f) => {
      const parse = ImageSchema.safeParse({ image: f });
      if (parse.success) return true;

      if (showFailTost) {
        toast({
          title: `Failed to upload ${f.name}`,
          description: parse.error.issues[0].message,
        });
      }

      return false;
    });
    setImages(images);
  }

  return {
    images,
    setImages: parseAndSetImages,
    removeImage: (i: number) =>
      setImages([...images.slice(0, i), ...images.slice(i + 1)]),
    moveImageToEnd: (i: number) =>
      setImages([...images.slice(0, i), ...images.slice(i + 1), images[i]]),
    previews,
    setPreviews,
  };
}

const useImagesStore = create<ImagesState>((set) => ({
  images: [],
  previews: [],
  setImages: (f: File[]) => set(() => ({ images: f })),
  setPreviews: (s: string[]) => set(() => ({ previews: s })),
}));

interface ImagesState {
  images: File[];
  previews: string[];
  setImages: (f: File[]) => void;
  setPreviews: (s: string[]) => void;
}
