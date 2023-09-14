import { NextApiRequest, NextApiResponse } from "next";

import data from "../../../data/posts.json";

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { slug } = req.query;

    // Validate data
    if (!Array.isArray(data.posts)) {
      throw new Error("Cannot find post data");
    }

    const post = data.posts.find((post) => post.slug === slug);

    if (!post) {
      throw new Error(`Cannot find post with slug ${slug}`);
    }

    res.status(200).json({
      post,
      categories: data.categories,
    });
  } catch (err: any) {
    res.status(500).json({ statusCode: 500, message: err.message });
  }
};

export default handler;
