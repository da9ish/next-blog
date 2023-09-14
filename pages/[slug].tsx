import Link from "next/link";
import React from "react";

import Chip from "../components/Chip";
import Layout from "../components/Layout";
import { Category, Post } from "../interfaces";

type Props = {
  post: Post;
  categories: Category[];
};

const Blog: React.FC<Props> = ({ post, categories = [] }) => {
  return (
    <Layout title={post.title}>
      <div className="w-full h-96">
        <img
          src={post.imageUrl}
          alt={post.title}
          className="w-full h-full object-cover"
        />

        <div className="container mx-auto">
          <div className="w-full md:w-3/4 lg:w-1/2 mx-auto">
            <div className="flex flex-col my-8">
              <Link href="/" className="text-slate-500 hover:underline">
                Blogs /
              </Link>
              <h1 className="text-4xl font-bold">{post.title}</h1>
            </div>
            <div className="flex items-center gap-2 mb-8">
              {post.categories.map((categoryId) => (
                <Chip
                  key={categoryId}
                  text={categories.find((cat) => cat.id === categoryId)?.name}
                />
              ))}
            </div>
            <div
              className="prose"
              dangerouslySetInnerHTML={{ __html: post.excerpt }}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export async function getStaticPaths() {
  const res = await fetch("http://localhost:3000/api/blogs?perPage=100");
  const { posts } = await res.json();

  const paths = posts.map((post: Post) => ({
    params: { slug: post.slug },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }: { params: { slug: string } }) {
  const res = await fetch(`http://localhost:3000/api/blogs/${params.slug}`);
  const data = await res.json();

  return {
    props: {
      post: data.post,
      categories: data.categories,
    },
  };
}

export default Blog;
