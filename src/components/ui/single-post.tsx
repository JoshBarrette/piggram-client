import { Link } from "@tanstack/react-router";
import { getRelativeTime } from "~/lib/utils";
import { PiggramPost } from "~/types/posts";
import ImageCarousel from "./image-carousel";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./dialog";
import { Button } from "./button";
import { MoreVerticalIcon } from "lucide-react";
import { Close as CloseButton } from "@radix-ui/react-dialog";
import { buttonVariants } from "./button";
import useUser from "~/hooks/useUser";
import { OptionsButton } from "./options-button";
import DeletePostDialog from "./delete-post-dialog";

export default function SinglePost({ post }: { post: PiggramPost }) {
  const name: string =
    post.poster.firstName +
    (post.poster.lastName && ` ${post.poster.lastName}`);

  return (
    <div className="flex w-[500px] flex-col space-y-1">
      <div className="flex pb-1">
        <Link to="/" className="flex items-center space-x-2">
          <Avatar className="size-8">
            <AvatarImage src={post.poster.picture} alt={name} />
            <AvatarFallback>PFP</AvatarFallback>
          </Avatar>

          <p className="font-semibold">{name + " • "}</p>

          <p>{getRelativeTime(new Date(post.createdAt))}</p>
        </Link>
        <div className="flex flex-grow flex-row-reverse items-center">
          <PostOptions posterId={post.poster._id} postId={post._id} />
        </div>
      </div>

      <ImageCarousel imageUrls={post.imageUrls} />

      <div className="flex w-full">
        {post.likes} {post.likes === 1 ? "like" : "likes"}
      </div>

      <div className="flex w-full space-x-2">
        <Link to="/" className="whitespace-nowrap font-semibold">
          {name}
        </Link>
        <p className="truncate overflow-ellipsis">{post.caption}</p>
      </div>

      <p>
        {post.comments === 0
          ? "No comments"
          : `View all ${post.comments} comment${post.comments !== 1 && "s"}}`}
      </p>
    </div>
  );
}

function PostOptions({
  posterId,
  postId,
}: {
  posterId: string;
  postId: string;
}) {
  const { user } = useUser();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className="size-8 rounded-full p-0">
          <MoreVerticalIcon />
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[420px]">
        <DialogHeader>
          <DialogTitle className="text-xl">Options</DialogTitle>
        </DialogHeader>
        <div className="flex w-full flex-col">
          <OptionsButton>test button</OptionsButton>
          <OptionsButton>test button</OptionsButton>
          <OptionsButton>test button</OptionsButton>

          {user?.userId === posterId && <DeletePostDialog postId={postId} />}

          <CloseButton
            className={buttonVariants({
              className:
                "h-auto rounded-none text-xl font-semibold shadow-none last:rounded-b-md",
            })}
          >
            Cancel
          </CloseButton>
        </div>
      </DialogContent>
    </Dialog>
  );
}
