import { ScrollArea } from "~/components/ui/scroll-area";
import { PiggramPost } from "~/types/posts";
import SinglePost from "./ui/single-post";
import { Separator } from "./ui/separator";

export default function HomeFeed({ posts }: { posts?: PiggramPost[] }) {
  return (
    <div className="left-0 z-0 flex w-full flex-grow items-center justify-center xl:absolute">
      <ScrollArea className="h-[calc(100vh-106px)] w-full md:h-screen">
        <div className="flex h-full w-full flex-col items-center space-y-4 py-4">
          {posts && posts.length > 0 ? (
            posts.map((post, i) => (
              <div key={i}>
                <SinglePost post={post} />
                {i !== posts.length - 1 && (
                  <Separator className="mt-4 w-[500px]" />
                )}
              </div>
            ))
          ) : (
            <p>No posts...</p>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
