import { create } from "zustand";

export default function useFiles() {
  return {
    ...useFilesStore(),
  };
}

const useFilesStore = create<FilesState>((set) => ({
  files: [],
  previews: [],
  setFiles: (f: File[]) => set(() => ({ files: f })),
  setPreviews: (s: string[]) => set(() => ({ previews: s })),
}));

interface FilesState {
  files: File[];
  previews: string[];
  setFiles: (f: File[]) => void;
  setPreviews: (s: string[]) => void;
}
