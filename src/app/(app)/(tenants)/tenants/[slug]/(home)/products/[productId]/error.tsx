"use client";

import { TriangleAlertIcon } from "lucide-react";

const ErrorPage = () => {
  return (
    <div className="px-4 lg:px-12 py-10">
      <div className="flex flex-col items-center justify-center w-full p-8 bg-white border border-black border-dashed rounded-lg gap-y-4">
        <TriangleAlertIcon />
        <p className="text-base font-medium">Something went wrong</p>
      </div>
    </div>
  );
};

export default ErrorPage;
