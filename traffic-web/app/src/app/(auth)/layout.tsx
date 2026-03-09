import type { Metadata } from "next";
import { metadata as GlobalMetaData } from "@/metadata/global-metadata";
import AuthLayout from "@/layouts/auth";

export const metadata: Metadata = GlobalMetaData;

export default function AuthenticationLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <AuthLayout>{children}</AuthLayout>
  );
}