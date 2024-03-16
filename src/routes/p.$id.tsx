import {
  Link,
  Outlet,
  createFileRoute,
  redirect,
} from "@tanstack/react-router";
import axios from "axios";
import ImageCarousel from "~/components/ui/image-carousel";
import { getRelativeTime } from "~/lib/utils";
import { PiggramPost } from "~/types/posts";

export const Route = createFileRoute("/p/$id")({
  loader: async ({ params: { id } }): Promise<PiggramPost> =>
    await axios
      .get(`${import.meta.env.VITE_APP_API_URL}/posts/${id}`)
      .then((r) => r.data)
      .catch(() => {
        throw redirect({
          to: "/",
        });
      }),
  component: SinglePost,
});

function SinglePost() {
  const post = Route.useLoaderData();
  const name =
    post.poster.firstName +
    (post.poster.lastName && ` ${post.poster.lastName}`);

  return (
    <>
      <div className="flex h-full w-full flex-col items-center justify-center">
        <div className="flex w-[500px] flex-col space-y-1 xl:w-[700px]">
          <div className="flex pb-1">
            <Link to="/" className="flex items-center space-x-2">
              <img src={post.poster.picture} className="size-8 rounded-full" />

              <p className="font-semibold">{name + " • "}</p>

              <p>{getRelativeTime(new Date(post.createdAt))}</p>
            </Link>
            <div className="flex flex-grow flex-row-reverse items-center">
              menu
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
      </div>
      <Outlet />
    </>
  );
}
