import { ChangeEvent, useRef, useState } from "react";
import { Button } from "./button";
import { Input } from "./input";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import useUser from "~/hooks/useUser";

export default function CommentInput({ postId }: { postId: string }) {
  const { user, isSignedIn } = useUser();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [showButton, setShowButton] = useState(false);
  const { mutate, isPending } = useMutation({
    mutationKey: ["comment"],
    mutationFn: async () => {
      if (!inputRef.current || !user) {
        return;
      }

      return await axios
        .post(
          `${import.meta.env.VITE_APP_API_URL}/comments/new`,
          {
            content: inputRef.current.value,
            commenter: user.userId,
            post: postId,
          },
          {
            withCredentials: true,
          },
        )
        .then((data) => {
          console.log(data);
          return data;
        })
        .catch((e) => console.log(e));
    },
    onSuccess: () => {
      if (!inputRef.current) {
        return;
      }
      inputRef.current.value = "";
      setShowButton(false);
    },
  });

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setShowButton(e.target.value.length > 0);
  }

  return (
    <form
      className="relative flex items-center"
      onSubmit={(e) => {
        e.preventDefault();
        mutate();
      }}
    >
      <Input
        placeholder="Add a comment"
        className="pr-14"
        onChange={handleChange}
        disabled={isPending}
        ref={inputRef}
      />

      {showButton && (
        <Button
          variant="ghost"
          className="absolute right-2 h-6 px-2"
          disabled={isPending || !isSignedIn}
          type="submit"
        >
          Post
        </Button>
      )}
    </form>
  );
}
