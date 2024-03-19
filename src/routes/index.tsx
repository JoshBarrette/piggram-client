import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import axios from "axios";
import HomeFeed from "~/components/home-feed";
import { PiggramPost } from "~/types/posts";

export const Route = createFileRoute("/")({
  // loader: async (opts) => {
  //   const context: { queryClient: QueryClient } = opts.context as {
  //     queryClient: QueryClient;
  //   };
  // },
  component: Index,
});

function Index() {
  const { data } = useQuery({
    queryKey: ["posts"],
    queryFn: async (): Promise<PiggramPost[]> =>
      await axios
        .get(`${import.meta.env.VITE_APP_API_URL}/posts/all`)
        .then((r) => r.data)
        .catch(() => []),
  });

  return (
    <>
      <HomeFeed posts={data} />
    </>
  );
}
