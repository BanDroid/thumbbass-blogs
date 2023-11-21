import Container from "@/components/Container";
import Grid from "@/components/Grid";
import NotFound from "./not-found";
import { TBlog } from "@/models/blog.model";
import { getBlogs } from "@/controllers/blog.controller";
import ArticleCard from "@/components/ArticleCard";
import Link from "next/link";
import Pagination from "@/components/Pagination";
import { ReactNode } from "react";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Metadata } from "next";

interface PageProps {
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}

export function generateMetadata({
  params,
  searchParams,
}: PageProps): Metadata {
  const search = (searchParams?.search as string) || "";
  if (!search) return {};
  return {
    title: `Searching for ${search}`,
  };
}

export default async function Page({ params, searchParams }: PageProps) {
  const search = (searchParams?.search as string) || "";
  const page = parseInt(searchParams?.page as string) || 1;
  const order = (searchParams?.order as string) || "desc";
  const result = await getBlogs(search, { page, order });
  const totalPages = result?.totalPages || 0;

  const breadcrumbsNode: ReactNode[] = [
    <Link href="/" key="/">
      /
    </Link>,
    "blogs" + (search ? `: search for ${search}` : ""),
  ];
  return (
    <>
      <Container>
        <Breadcrumbs className="w-full px-4 pt-2" nodeList={breadcrumbsNode} />
        <RecentPostSection result={result} />
        {result && (
          <Pagination
            paginateData={{
              totalPage: totalPages,
              currentPage: page,
              pathnameContext: `/blogs?search=${search}&`,
            }}
          />
        )}
      </Container>
    </>
  );
}

interface RecentPostSectionProps {
  result?: {
    data: TBlog[];
    next?: {
      page: number;
      limit: number;
    };
    previous?: {
      page: number;
      limit: number;
    };
    totalPages: number;
  };
}
function RecentPostSection({ result }: RecentPostSectionProps) {
  return (
    <div className="py-4 md:px-4">
      {!result ? (
        <NotFound />
      ) : (
        <Grid
          data={result.data}
          className="grid-cols-1 md:grid-cols-3 2xl:grid-cols-4 gap-4"
          render={(blog: TBlog) => <ArticleCard blog={blog} />}
        />
      )}
    </div>
  );
}
