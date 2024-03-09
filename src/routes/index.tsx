import { createFileRoute } from "@tanstack/react-router";
import HomeFeed from "~/components/home-feed";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <>
      <HomeFeed />
    </>
  );
}
