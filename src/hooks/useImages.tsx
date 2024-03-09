import { create } from "zustand";

export default function useImages() {
  return {
    ...useImagesStore(),
  };
}

const useImagesStore = create<ImagesState>((set) => ({
  images: [],
  previews: [],
  setFiles: (f: File[]) => set(() => ({ images: f })),
  setPreviews: (s: string[]) => set(() => ({ previews: s })),
}));

interface ImagesState {
  images: File[];
  previews: string[];
  setFiles: (f: File[]) => void;
  setPreviews: (s: string[]) => void;
}
