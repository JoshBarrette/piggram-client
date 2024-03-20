import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import axios from "axios";
import { ScrollArea } from "~/components/ui/scroll-area";
import { Separator } from "~/components/ui/separator";
import SinglePost from "~/components/ui/single-post";
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
  const { data, isFetching } = useQuery({
    queryKey: ["posts"],
    queryFn: async (): Promise<PiggramPost[]> =>
      await axios
        .get(`${import.meta.env.VITE_APP_API_URL}/posts/all`)
        .then((r) => r.data)
        .catch(() => []),
  });

  return (
    <div className="left-0 z-0 flex w-full flex-grow items-center justify-center xl:absolute">
      <ScrollArea className="h-[calc(100vh-106px)] w-full md:h-screen">
        <div className="flex h-full w-full flex-col items-center space-y-4 py-4">
          {data && data.length > 0 ? (
            data.map((post, i) => (
              <div key={i}>
                <SinglePost post={post} />
                {i !== data.length - 1 && (
                  <Separator className="mt-4 w-[500px]" />
                )}
              </div>
            ))
          ) : isFetching ? (
            <p>Loading...</p>
          ) : (
            <p>No posts...</p>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
