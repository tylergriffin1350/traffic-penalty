import type { Metadata } from "next";
import { metadata as serverMetadata } from "@/metadata/global-metadata";
import ClientRootLayout from "@/layouts";


export const metadata: Metadata = serverMetadata;

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ClientRootLayout>{children}</ClientRootLayout>
    </>
  );
}
