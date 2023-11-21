import Container from "@/components/Container";
import HeaderDetails from "./HeaderDetails";
import { getBlog } from "@/controllers/blog.controller";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Suspense, cache } from "react";
import { getUrlFromBaseUrl } from "@/utils/url";

interface PageProps {
  params: {
    slug: string;
  };
}

const getPost = cache(async (slug: string, updateView?: boolean) => {
  try {
    const blog = await getBlog({ slug, updateView });
    if (!blog) return { blog: null };
    return { blog };
  } catch (e) {
    return {
      blog: null,
    };
  }
});

export async function generateMetadata({
  params: { slug },
}: PageProps): Promise<Metadata> {
  const { blog } = await getPost(slug, false);
  if (!blog) {
    return {
      title: "404 Not Found",
      description: "Cannot found post you're looking for.",
    };
  }
  return {
    title: blog.title,
    description: blog.description,
    openGraph: {
      images: [
        {
          url: blog.thumbnail as string,
        },
      ],
    },
  };
}

export default async function Page({ params: { slug } }: PageProps) {
  const { blog } = await getPost(slug, true);
  if (!blog) notFound();
  const res = await fetch(blog.readme_uri as string, {
    next: { revalidate: 0 },
  });
  const bodyStr = await res.text();
  return (
    <>
      <Container>
        <HeaderDetails blog={blog} />
        {blog.description && (
          <blockquote className="px-4 pb-4 opacity-80 text-center italic">
            {blog.description}
          </blockquote>
        )}
        {/* <Suspense fallback={<></>}> */}
        <MarkdownRenderer markdownString={bodyStr} />
        {/* </Suspense> */}
      </Container>
    </>
  );
}
