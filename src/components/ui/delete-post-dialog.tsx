import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./alert-dialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { OptionsButton } from "./options-button";
import { buttonVariants } from "./button";

export default function DeletePostDialog({ postId }: { postId: string }) {
  const queryClient = useQueryClient();
  const del = useMutation({
    mutationKey: ["delete"],
    mutationFn: async () => {
      const deleted = await axios.delete(
        `${import.meta.env.VITE_APP_API_URL}/posts/delete/${postId}`,
        { withCredentials: true },
      );
      return deleted.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <OptionsButton variant="destructive">Delete</OptionsButton>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you absolutely sure you want to delete this post?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            post.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className={buttonVariants({ variant: "destructive" })}
            onClick={() => del.mutate()}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
