import React from "react";
import PromptCard from "./PromptCard";

export type post = {
  _id: string;
  creator: {
    _id: string;
    image: string;
    email: string;
    username: string;
  };
  prompt: string;
  tag: string;
};
export const PromptCardList = ({
  data,
  handleTagClick,
}: {
  data: never[];
  handleTagClick: () => void;
}) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post: post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};
