import { Metadata } from "next";
import NotFoundPage from "@/page/not-found";

export const metadata: Metadata = {
  title: "Page Not Found",
  description:
    "The page you were looking for appears to have been moved, deleted or does not exist.",
};

export default function NotFound() {
  return <NotFoundPage />;
}
