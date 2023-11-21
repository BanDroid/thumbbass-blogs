import Image from "next/image";
import { TBlog } from "@/models/blog.model";
import SvgIcons from "@/utils/icons";
import { formatDistanceToNow, lightFormat } from "date-fns";
import Link from "next/link";

interface ArticleCardProps {
  blog: TBlog;
}
export default function ArticleCard({ blog }: ArticleCardProps) {
  const cardBodyPadding = "px-4";
  return (
    <Link
      title={blog.title}
      href={`/blogs/${blog.slug}#header`}
      as={`/blogs/${blog.slug}`}
      scroll={false}
      className="h-full block hover:bg-base-200 md-ripples ripples-dark cursor-pointer"
    >
      <Image
        src={blog.thumbnail as string}
        width={200}
        height={120}
        loading="lazy"
        alt="thumbnail.jpg"
        className="!w-full object-cover object-center md:rounded-md"
      />

      <div className="flex flex-row items-center justify-between gap-4 py-2">
        <div className={`${cardBodyPadding} flex items-center gap-2`}>
          <SvgIcons name="clock" className="!w-4 !h-4" />
          <span className="opacity-50 text-xs">
            {formatDistanceToNow(new Date(blog.createdAt), {
              addSuffix: true,
            })}
          </span>
        </div>
        <div className={`${cardBodyPadding} flex items-center gap-2`}>
          <SvgIcons name="calendar" className="!w-4 !h-4" />
          <span className="opacity-50 text-xs">
            {lightFormat(new Date(blog.createdAt), "dd/MM/yyyy")}
          </span>
        </div>
      </div>

      <h4 className={`${cardBodyPadding} font-semibold`}>{blog.title}</h4>
      <p className={`${cardBodyPadding} text-sm my-1 opacity-80`}>
        {blog.description}
      </p>
      <div className={`${cardBodyPadding} pb-4`}>
        {blog.categories?.map((tag) => (
          <span
            key={tag}
            className="badge badge-ghost badge-xs mr-1 opacity-60"
          >
            {tag}
          </span>
        ))}
      </div>
    </Link>
  );
}
