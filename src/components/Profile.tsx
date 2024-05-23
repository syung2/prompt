import React from "react";
import PromptCard from "./PromptCard";
import { post } from "./PromptCardList";

const Profile = ({
  name,
  desc,
  data,
  handleEdit,
  handleDelete,
}: {
  name: string;
  desc: string;
  data: never[];
  handleEdit: (post: post) => void;
  handleDelete: (post: post) => void;
}) => {
  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{name} Profile</span>
      </h1>
      <p className="desc">{desc}</p>
      <div className="mt-10 prompt_layout">
        {data.map((post: post) => (
          <PromptCard
            key={post._id}
            post={post}
            handleEdit={() => {
              handleEdit && handleEdit(post);
            }}
            handleDelete={() => {
              handleDelete && handleDelete(post);
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default Profile;
