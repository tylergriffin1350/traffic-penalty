import Unauthorized from "@/page/unauthorized";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Unauthorized",
  description: "You are not authorized to access this page.",
};

export default function UnauthorizedPage() {
  return (
    <>
      <Unauthorized />
    </>
  );
}
