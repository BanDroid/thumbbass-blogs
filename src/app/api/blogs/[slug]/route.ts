import { NextResponse } from "next/server";
import connectDB from "@/app/api/connect";
import { getBlog } from "@/controllers/blog.controller";

interface Props {
  params: {
    slug: string;
  };
}
export async function GET(request: Request, { params }: Props) {
  await connectDB();
  const slug = params.slug;
  const blog = await getBlog({ slug });
  if (!blog) {
    return NextResponse.json(
      { message: "Cannot find blog with slug: " + slug },
      { status: 404 }
    );
  }
  return NextResponse.json(blog, { status: 200 });
}
