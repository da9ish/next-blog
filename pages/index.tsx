import axios from "axios";
import { useEffect, useState } from "react";

import BlogCard from "../components/blog/BlogCard";
import Layout from "../components/Layout";
import { Post } from "../interfaces";

type Props = {
  initialPosts: Post[];
  initialCategories: any[];
  initialPagination: any;
};

export async function getServerSideProps() {
  const res = await axios.get("http://localhost:3000/api/blogs");
  return {
    props: {
      initialPosts: res.data.posts,
      initialCategories: res.data.categories,
      initialPagination: res.data.pagination,
    },
  };
}

const Blogs = ({
  initialPosts,
  initialCategories,
  initialPagination,
}: Props) => {
  const [posts, setPosts] = useState(initialPosts);
  const [pagination, setPagination] = useState(initialPagination);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get(
        `http://localhost:3000/api/blogs?page=1&search=${search}&category=${category}`
      );
      setPosts(res.data.posts);
      setPagination(res.data.pagination);
    };

    fetchPosts();
  }, [search, category]);

  const handlePageChange = async (page: number) => {
    const res = await axios.get(
      `http://localhost:3000/api/blogs?page=${page}&search=${search}&category=${category}`
    );
    setPosts(res.data.posts);
    setPagination(res.data.pagination);

    // Scroll back to the top of the page
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  console.log(pagination);

  return (
    <Layout title="Blogs">
      <div className="flex flex-col gap-4">
        <div className="w-full border-b-2 border-slate-100">
          <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4 p-2">
            <h1 className="text-2xl md:text-3xl font-bold text-center md:text-left">
              Blogs
            </h1>
            <div className="flex gap-2 w-full md:w-auto">
              <input
                type="text"
                placeholder="Search..."
                className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-slate-200 w-full md:w-auto"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <select
                onChange={(e) => setCategory(e.target.value)}
                className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-slate-200 w-full md:w-auto"
              >
                <option value="">All Categories</option>
                {initialCategories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="container mx-auto w-full p-2">
          {posts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {posts.map((item) => (
                <div
                  key={item.id}
                  className="transform hover:translate-y-1 transition duration-300 ease-in-out"
                >
                  <BlogCard post={item} categories={initialCategories} />
                </div>
              ))}
            </div>
          ) : (
            <div className="flex justify-center items-center h-64">
              <span className="text-xl text-gray-400">No posts found.</span>
            </div>
          )}
        </div>
        {pagination && pagination.totalPages > 0 && (
          <div className="container mx-auto w-full flex justify-center items-center gap-4">
            <button
              disabled={pagination.page <= 1}
              onClick={() => handlePageChange(pagination.page - 1)}
              className="py-2 px-4 border rounded disabled:cursor-not-allowed disabled:opacity-50"
            >
              Prev
            </button>
            <span>
              Page {pagination.page} of {pagination.totalPages}
            </span>

            <button
              disabled={pagination.page >= pagination.totalPages}
              onClick={() => handlePageChange(pagination.page + 1)}
              className="py-2 px-4 border rounded disabled:cursor-not-allowed disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Blogs;
