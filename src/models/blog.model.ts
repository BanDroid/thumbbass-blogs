import mongoose, { Schema, InferSchemaType, model, Model } from "mongoose";

const BlogSchema = new Schema(
  {
    thumbnail: {
      type: String,
      required: [true, "Thumbnail is required for each post"],
    },
    title: {
      type: String,
      unique: true,
      required: [true, "Title is required"],
    },
    slug: {
      type: String,
      unique: true,
      required: [true, "Slug must be unique"],
    },
    description: {
      type: String,
      required: false,
    },
    categories: {
      type: [String],
      required: false,
    },
    readme_uri: {
      type: String,
      default: "",
      required: true,
    },
    author: {
      type: String,
      required: [true, "Author is required to be identified"],
    },
    views: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export type TBlog = InferSchemaType<typeof BlogSchema>;

const Blog: Model<TBlog> = mongoose.models.Blog || model("Blog", BlogSchema);

export default Blog;
