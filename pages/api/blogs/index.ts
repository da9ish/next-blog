import { NextApiRequest, NextApiResponse } from "next";

import data from "../../../data/posts.json";
import { PostResponse } from "../../../interfaces";

const handler = (req: NextApiRequest, res: NextApiResponse<PostResponse>) => {
  try {
    const { search = "", category = null, page = 1, perPage = 10 } = req.query;

    // Validate data
    if (!Array.isArray(data.posts) || !Array.isArray(data.categories)) {
      throw new Error("Cannot find post or category data");
    }

    let filteredPosts = [...data.posts];

    // Implement search by title
    if (search) {
      filteredPosts = filteredPosts.filter((post) =>
        post.title.toLowerCase().includes(String(search).toLowerCase())
      );
    }

    // Implement filter by category
    if (category) {
      filteredPosts = filteredPosts.filter((post) =>
        post.categories.includes(Number(category))
      );
    }

    // Implement pagination
    const totalCount = filteredPosts.length;
    const startIndex = (Number(page) - 1) * Number(perPage);
    const endIndex = startIndex + Number(perPage);
    const paginatedPosts = filteredPosts.slice(startIndex, endIndex);

    res.status(200).json({
      posts: paginatedPosts,
      categories: data.categories,
      pagination: {
        page: Number(page),
        perPage: Number(perPage),
        total: totalCount,
        totalPages: Math.ceil(totalCount / Number(perPage)),
      },
    });
  } catch (err: any) {
    res.status(500).json({ statusCode: 500, message: err.message });
  }
};

export default handler;
