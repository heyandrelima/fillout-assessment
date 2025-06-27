"use client";
import { usePages } from "@/hooks/usePages";
import { useParams, useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const params = useParams();
  const { getPageById } = usePages();
  const page = getPageById?.(params.slug as string);

  if (!page) {
    router.push("/");
    return null;
  }

  return (
    <div className="p-10 font-[family-name:var(--font-inter)] tracking-[-0.015em]">
      <h1 className="text-2xl font-bold">Current page: {page?.title}</h1>
    </div>
  );
}
