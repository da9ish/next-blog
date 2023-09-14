import Link from "next/link";
import React from "react";

import Chip from "../Chip";
import { Category, Post } from "../../interfaces";

type Props = {
  post: Post;
  categories: Category[];
};

const BlogCard = ({ post, categories = [] }: Props) => (
  <Link
    href="/[slug]"
    as={`/${post.slug}`}
    className="block h-full rounded shadow hover:shadow-lg transition duration-300 ease-in-out overflow-hidden"
  >
    <div className="flex flex-col h-full">
      <div className="w-full">
        <img
          src={post.imageUrl}
          alt={post.title}
          className="w-full h-48 object-cover"
        />
      </div>
      <div className="w-full px-6 py-4 flex flex-col gap-2">
        <h3 className="text-xl font-semibold">{post.title}</h3>
        <div className="flex items-center gap-2">
          {post.categories.map((categoryId) => (
            <Chip
              key={categoryId}
              text={categories.find((cat) => cat.id === categoryId)?.name}
            />
          ))}
        </div>
        <p className="text-gray-700">{post.excerpt}</p>
      </div>
    </div>
  </Link>
);

export default BlogCard;
