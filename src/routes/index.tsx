import { createFileRoute } from "@tanstack/react-router";
import axios from "axios";
import HomeFeed from "~/components/home-feed";
import { PiggramPost } from "~/types/posts";

export const Route = createFileRoute("/")({
  loader: async (): Promise<PiggramPost[]> =>
    await axios
      .get(`${import.meta.env.VITE_APP_API_URL}/posts/all`)
      .then((r) => r.data)
      .catch(() => []),
  component: Index,
});

function Index() {
  const posts = Route.useLoaderData();

  return (
    <>
      <HomeFeed posts={posts} />
    </>
  );
}
