import { ScrollArea } from "~/components/ui/scroll-area";
import { PiggramPost } from "~/types/posts";
import SinglePost from "./ui/single-post";

export default function HomeFeed({ posts }: { posts: PiggramPost[] }) {
  return (
    <div className="left-0 z-0 flex w-full flex-grow items-center justify-center xl:absolute">
      <ScrollArea className="h-[calc(100vh-106px)] w-full md:h-screen">
        <div className="flex h-full w-full flex-col items-center space-y-4 pt-4">
          {posts.map((p, i) => (
            <SinglePost key={i} post={p} />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
