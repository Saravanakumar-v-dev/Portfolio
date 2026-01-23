import React from "react";
import { motion } from "framer-motion";

export default function PostPreview({ post }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="card cursor-pointer"
    >
      <h3 className="text-xl font-semibold">{post.title}</h3>

      <p className="text-sm mt-2 text-gray-700 dark:text-gray-300">
        {post.excerpt}
      </p>

      <div className="text-xs mt-3 flex gap-4 text-gray-500">
        <span>{post.date}</span>
        <span>{post.readTime} min read</span>
      </div>

      <a
        href={`/blog/${post.slug}`}
        className="inline-block mt-4 text-indigo-600 dark:text-indigo-400 underline"
      >
        Read More
      </a>
    </motion.div>
  );
}
