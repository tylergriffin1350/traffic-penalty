"use client";
import SignUp from "@/page/sign-up";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-svh w-full items-center justify-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-brand"></div>
        </div>
      }
    >
      <PageContent />
    </Suspense>
  );
}

function PageContent() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <SignUp />
      </div>
    </div>
  );
}
