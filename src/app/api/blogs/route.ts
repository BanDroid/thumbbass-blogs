import { NextResponse } from "next/server";
import connectDB from "@/app/api/connect";
import { getBlogs, postBlog } from "@/controllers/blog.controller";
import { isAuthorized } from "@/utils/simpleAuthorization";

export async function GET(request: Request) {
  await connectDB();
  const { searchParams: req } = new URL(request.url);
  const result = await getBlogs(
    req.get("search") as string,
    Object.fromEntries(req.entries())
  );
  if (!result)
    return NextResponse.json(
      { message: "Cannot find post you are looking for" },
      { status: 404 }
    );
  return NextResponse.json(result, { status: 200 });
}

export async function POST(request: Request) {
  await connectDB();
  if (!isAuthorized(request.headers.get("key")))
    return NextResponse.json({ messsage: "Unauthorized" }, { status: 401 });
  const body = await request.json();
  try {
    const blog = await postBlog(body);
    return NextResponse.json(blog, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 400 });
  }
}
