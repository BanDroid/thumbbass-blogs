import { cache } from "react";
import connectDB from "@/app/api/connect";
import Blog, { TBlog } from "@/models/blog.model";
import slugify from "slugify";
import { join } from "path";
import { imgbox } from "imgbox-js";
import * as base64Img from "base64-img";

/* @desc		Get all blogs
 * @route		GET /api/blogs
 * @access	Public
 */
export const getBlogs = cache(
  async (
    search: string,
    { page = 1, limit = 12, sortBy = "createdAt", order = "asc" }
  ) => {
    await connectDB();
    const offset = (page - 1) * limit;
    const sort: {
      sortBy: string;
      order: number;
    } = {
      sortBy: sortBy,
      order: order === "asc" ? 1 : order === "desc" ? -1 : 1,
    };
    const query: any = {};
    query[sort.sortBy] = sort.order;

    const totalPages = Math.ceil((await Blog.countDocuments().exec()) / limit);

    const result: {
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
    } = { data: [], totalPages };
    if (page * limit < totalPages) {
      result.next = {
        page: page + 1,
        limit: limit,
      };
    }
    if (offset > 0) {
      result.previous = {
        page: page - 1,
        limit: limit,
      };
    }

    const blogs = await Blog.find({
      $or: [
        { title: { $regex: new RegExp(search, "i") } },
        { slug: { $regex: new RegExp(search, "i") } },
        { description: { $regex: new RegExp(search, "i") } },
        { categories: { $regex: new RegExp(search, "i") } },
        { author: { $regex: new RegExp(search, "i") } },
      ],
    })
      .skip(offset)
      .limit(limit)
      .sort(query)
      .exec();

    if (blogs.length === 0) {
      return;
    }
    result.data = blogs.map((blog) => ({ id: blog.id, ...blog.toObject() }));
    return result;
  }
);

/* @desc		Post a blog
 * @route		POST /api/blogs
 * @access	Private
 */
export const postBlog = async (requestBody: Partial<TBlog>) => {
  await connectDB();
  const {
    title,
    thumbnail: base64Str,
    author,
    description,
    readme_uri,
    categories,
  } = requestBody;
  try {
    if (!title) throw new Error("Title is required!");
    const slug = slugify(title?.toLowerCase());

    const imgFilePath = base64Img.imgSync(
      base64Str,
      join(__dirname, "../..", "public", "thumbnails"),
      slug
    );
    const res = await imgbox(imgFilePath);
    if (!res.ok) throw new Error("Failed uploading thumbnail");
    const imgData = res.data[0];

    let blog = await Blog.create({
      title,
      slug,
      description,
      thumbnail: imgData.original_url,
      readme_uri,
      categories,
      author,
    });
    if (!blog) {
      throw new Error("Blog cannot be posted because some props are missing.");
    }
    blog = await blog.save();
    return blog;
  } catch (error) {
    throw error;
  }
};

/* @desc		Get single blog
 * @route		GET /api/blogs/:slug
 * @access	Public
 */
export const getBlog = cache(
  async ({ slug, updateView }: { slug: string; updateView?: boolean }) => {
    await connectDB();
    let blog;
    if (updateView) {
      blog = await Blog.findOneAndUpdate(
        { slug: slug },
        { $inc: { views: 1 } },
        { new: true, timestamps: false }
      ).exec();
    } else {
      blog = await Blog.findOne({ slug });
    }
    if (!blog) {
      return;
    }
    return { id: blog.id, ...blog.toObject() };
  }
);

/* @desc		Update single blog
 * @route		PUT /api/blogs/:id
 * @access	Private
 */
export const updateBlog = async (request: Request) => {
  await connectDB();
};

/* @desc		Delete single blog
 * @route		DELETE /api/blogs/:id
 * @access	Private
 */
export const deleteBlog = async (request: Request) => {
  await connectDB();
};
