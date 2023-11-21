import Image from "next/image";
import { formatDistanceToNow } from "date-fns";
import { getBlog, getBlogs } from "@/controllers/blog.controller";
import { TBlog } from "@/models/blog.model";
import * as featured from "@/assets/data/featured.json";
import SvgIcons from "@/utils/icons";
import Link from "next/link";

export default function Hero() {
  return (
    <div className="grid grid-cols-12 w-full p-4 lg:px-0 gap-6">
      <FeaturedPost />
      <Popular />
    </div>
  );
}

async function FeaturedPost() {
  const { slug } = featured;
  if (!slug) return <></>;
  const featuredBlog = await getBlog({ slug });
  return (
    <div className="col-span-12 lg:col-span-8 w-full bg-base-100 rounded-lg shadow overflow-hidden cursor-pointer md-ripples ripples-dark">
      {!featuredBlog ? (
        <div className="alert alert-error">
          <SvgIcons name="info" className="!w-6 !h-6" />
          <span>No post is featured from the admin.</span>
        </div>
      ) : (
        <Link
          href={`/blogs/${slug}#header`}
          as={`/blogs/${slug}`}
          scroll={false}
          className="block"
        >
          <Image
            src={featuredBlog.thumbnail as string}
            width={1000}
            height={600}
            loading="lazy"
            alt="thumbnail.jpg"
            className="!w-full object-cover object-center"
          />
          <h4 className="text-xl md:text-3xl font-semibold pt-2 px-4">
            {featuredBlog.title}
          </h4>
          <p className="text-sm px-4 my-1 opacity-80">
            {featuredBlog.description}
          </p>
          <div className="px-4 pb-4">
            {featuredBlog.categories?.map((tag) => (
              <span
                key={tag}
                className="badge badge-ghost badge-xs mr-1 opacity-60"
              >
                {tag}
              </span>
            ))}
          </div>
        </Link>
      )}
    </div>
  );
}

async function Popular() {
  const result = await getBlogs("", {
    limit: 3,
    sortBy: "views",
    order: "desc",
  });
  return (
    <section className="col-span-12 lg:col-span-4">
      <h2 className="pb-2 mb-2 border-b-2 border-base-200">
        <SvgIcons name="star" className="!w-6 !h-6 float-left mr-2" />
        Popular
      </h2>
      {!result || result?.data.length < 1 ? (
        <div className="alert alert-error">
          <SvgIcons name="info" className="!w-6 !h-6" />
          <span>No popular post could be shown.</span>
        </div>
      ) : (
        <ul>
          {result?.data.map((blog: TBlog, index: number) => (
            <li key={blog.slug}>
              <Link
                href={`/blogs/${blog.slug}#header`}
                as={`/blogs/${blog.slug}`}
                scroll={false}
                className={`pb-2 mb-2 block
                ${
                  index !== result?.data.length - 1
                    ? "border-b-[1px] border-base-200"
                    : ""
                }
              cursor-pointer active:opacity-70 md:hover:opacity-70`}
              >
                <h4 className="text-lg font-semibold">{blog.title}</h4>
                <p className="text-sm my-1">{blog.description}</p>
                <span className="opacity-50 text-xs block">
                  {formatDistanceToNow(new Date(blog.createdAt), {
                    addSuffix: true,
                  })}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
