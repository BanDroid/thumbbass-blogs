import Container from "@/components/Container";
import Grid from "@/components/Grid";
import { TBlog } from "@/models/blog.model";
import SvgIcons from "@/utils/icons";
import { getBlogs } from "@/controllers/blog.controller";
import Hero from "./Hero";
import ArticleCard from "@/components/ArticleCard";
import Link from "next/link";

interface PageProps {
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}
export default function Page(pageProps: PageProps) {
  return (
    <>
      <Container>
        <Hero />
      </Container>
      <Container>
        <RecentPostSection {...pageProps} />
        <div className="flex items-center justify-center pb-2">
          <Link
            href="/blogs"
            className="px-4 py-2 underline hover:text-primary"
          >
            see more recent post
          </Link>
        </div>
      </Container>
    </>
  );
}

async function RecentPostSection({ searchParams }: PageProps) {
  const page = parseInt(searchParams?.page as string) || 1;
  const order = (searchParams?.order as string) || "desc";
  const result = await getBlogs("", { page, order });
  return (
    <div className="py-4 md:px-4">
      {!result ? (
        <div className="alert alert-error rounded-none md:rounded-md">
          <SvgIcons name="info" className="!w-6 !h-6" />
          <span>Cannot find what you are looking for.</span>
        </div>
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
