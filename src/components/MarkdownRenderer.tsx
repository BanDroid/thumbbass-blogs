"use client";
import MarkdownPreview from "@uiw/react-markdown-preview";
import { openSans } from "@/config/fonts";

export default function MarkdownRenderer({
  markdownString,
}: {
  markdownString: string | undefined;
}) {
  return (
    <MarkdownPreview
      className={`${openSans.className} !w-full min-w-0 !max-w-[100vw] p-4 markdown`}
      source={markdownString}
      wrapperElement={{ "data-color-mode": "light" }}
      disableCopy={false}
      components={{}}
    />
  );
}
