import Breadcrumbs from "@/components/Breadcrumbs";
import { TBlog } from "@/models/blog.model";
import SvgIcons from "@/utils/icons";
import { formatDistanceToNow, lightFormat } from "date-fns";
import Link from "next/link";
import { ReactNode } from "react";
import Image from "next/image";

interface HeaderDetailsProps {
  blog: TBlog;
}
export default function HeaderDetails({ blog }: HeaderDetailsProps) {
  const breadcrumbsNode: ReactNode[] = [
    <Link href="/" key="/">
      /
    </Link>,
    <Link href="/blogs" key="/blogs">
      blogs
    </Link>,
    blog.slug,
  ];
  return (
    <div id="header">
      <Breadcrumbs className="w-full px-4 py-2" nodeList={breadcrumbsNode} />
      {/* currently (13.4.13) caused Application error: client-side exception.
        update: automatic refresh if error occured.
      */}
      <div
        style={{
          backgroundImage: `url('${blog.thumbnail}')`,
        }}
        className="w-full bg-no-repeat bg-cover bg-center md:rounded-md oveflow-hidden relative before:absolute before:top-0 before:w-full before:h-full before:bg-black/30 before:backdrop-blur-xl before:md:rounded-md"
      >
        <div className="w-full max-w-lg h-auto mx-auto aspect-video object-center relative">
          <Image
            src={blog.thumbnail as string}
            fill
            loading="lazy"
            alt="thumbnail.jpg"
            className="object-cover object-center"
          />
        </div>
      </div>
      <h1 className="text-2xl w-full px-4 py-2">{blog.title}</h1>
      <p className="text-sm opacity-80 px-4 pt-2">By {blog.author}</p>

      {blog.categories && blog.categories.length > 0 && (
        <div className="px-4 pb-2">
          {blog.categories.map((tag) => (
            <span
              key={tag}
              className="badge badge-ghost badge-xs mr-1 opacity-60"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      <div className="flex flex-row items-center justify-between gap-4 p-4 py-2">
        <div className="flex items-center gap-2">
          <SvgIcons name="clock" className="!w-4 !h-4" />
          <span className="opacity-50 text-xs">
            {formatDistanceToNow(new Date(blog.createdAt), {
              addSuffix: true,
            })}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <SvgIcons name="calendar" className="!w-4 !h-4" />
          <span className="opacity-50 text-xs">
            {lightFormat(new Date(blog.createdAt), "dd/MM/yyyy")}
          </span>
        </div>
      </div>

      <div className="divider"></div>
    </div>
  );
}
