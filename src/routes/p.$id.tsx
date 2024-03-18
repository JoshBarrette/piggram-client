import { Outlet, createFileRoute, redirect } from "@tanstack/react-router";
import axios from "axios";
import SinglePost from "~/components/ui/single-post";
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
  component: SinglePostPage,
});

function SinglePostPage() {
  const post = Route.useLoaderData();

  return (
    <>
      <div className="flex h-full w-full flex-col items-center justify-center">
        <SinglePost post={post} />
      </div>
      <Outlet />
    </>
  );
}
