import { NextResponse } from "next/server";
import { isAuthorized } from "@/utils/simpleAuthorization";
import connectDB from "../connect";

export async function POST(request: Request) {
  await connectDB();
  if (!isAuthorized(request.headers.get("key")))
    return NextResponse.json({ success: false }, { status: 401 });
  return NextResponse.json({ success: true }, { status: 200 });
}
