import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./dialog";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { Button, buttonVariants } from "./button";
import { Close as CloseButton } from "@radix-ui/react-dialog";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { PiggramComment } from "~/types/comments";
import { Link } from "@tanstack/react-router";
import { getFullName, getRelativeTime } from "~/lib/utils";
import { MoreVerticalIcon } from "lucide-react";
import { OptionsButton } from "./options-button";
import useUser from "~/hooks/useUser";
import DeletePostDialog from "./delete-post-dialog";

export default function CommentsDialog({
  commentsCount,
  postID,
}: {
  commentsCount: number;
  postID: string;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="block h-6 py-0 pl-0 text-left"
          disabled={commentsCount === 0}
          variant="link"
        >
          {commentsCount === 0
            ? "No comments"
            : `View all ${commentsCount} comment${commentsCount !== 1 ? "s" : ""}`}
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl">Comments</DialogTitle>
        </DialogHeader>
        <div className="flex w-full flex-col">
          <ScrollArea className="h-[550px] w-[450px]">
            <CommentsList postID={postID} />
          </ScrollArea>

          <CloseButton
            className={buttonVariants({
              className: "h-auto text-xl font-semibold",
            })}
          >
            Close
          </CloseButton>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function CommentsList({ postID }: { postID: string }) {
  const { data, isFetching } = useQuery({
    queryKey: [`post-${postID}`],
    queryFn: async (): Promise<PiggramComment[]> => {
      return await axios
        .get(`${import.meta.env.VITE_APP_API_URL}/comments/${postID}`)
        .then((r) => r.data)
        .catch(() => []);
    },
  });

  if (data && !isFetching && data.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col space-y-2">
      {data?.map((c, i) => <CommentSegment comment={c} key={i} />)}
    </div>
  );
}

function CommentSegment({ comment }: { comment: PiggramComment }) {
  return (
    <div className="flex flex-col">
      <div className="flex">
        <Link
          to={"/profile/" + comment.commenter._id}
          className="flex items-center space-x-2"
        >
          <Avatar className="size-6">
            <AvatarImage
              src={comment.commenter.picture}
              alt={comment.commenter.firstName}
            />
            <AvatarFallback>PFP</AvatarFallback>
          </Avatar>

          <p className="font-semibold">
            {getFullName(
              comment.commenter.firstName,
              comment.commenter.lastName,
            )}
          </p>
          <p>{getRelativeTime(new Date(comment.createdAt))}</p>
        </Link>

        <div className="flex flex-grow flex-row-reverse items-center">
          <CommentOptions
            commentID={comment._id}
            commenterID={comment.commenter._id}
            postID={comment.post}
          />
        </div>
      </div>

      <p className="ml-8 whitespace-normal break-words">{comment.content}</p>
    </div>
  );
}

function CommentOptions({
  commenterID,
  commentID,
  postID,
}: {
  commenterID: string;
  commentID: string;
  postID: string;
}) {
  const { user } = useUser();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className="size-6 rounded-full p-1">
          <MoreVerticalIcon />
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[420px]">
        <DialogHeader>
          <DialogTitle className="text-xl">Options</DialogTitle>
        </DialogHeader>
        <div className="flex w-full flex-col">
          <OptionsButton
            onClick={() =>
              navigator.clipboard.writeText(
                `${import.meta.env.VITE_APP_BASE_URL}/profile/${commenterID}`,
              )
            }
          >
            Copy link to commenter
          </OptionsButton>

          {user?.userId === commenterID && (
            <DeletePostDialog
              id={commentID}
              type="comment"
              invalidateID={postID}
            />
          )}

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
