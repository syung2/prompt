"use client";
import React, { useEffect, useState } from "react";
import Profile from "@/components/Profile";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { post } from "@/components/PromptCardList";
const Page = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [posts, setPosts] = useState([]);

  const handleEdit = (post: post) => {
    router.push(`/update-prompt?id=${post._id}`);
  };
  const handleDelete = async (post: post) => {
    const hasConfirmed = confirm(
      "Are you sure you wnat to delete this prompt?"
    );

    if (hasConfirmed) {
      try {
        await fetch("/api/prompt/" + post._id.toString(), {
          method: "DELETE",
        });
        const filteredPosts = posts.filter(
          (p: { _id: string }) => p._id !== post._id
        );
        setPosts(filteredPosts);
      } catch (error) {}
    }
  };

  useEffect(() => {
    const fetchProps = async () => {
      const response = await fetch("/api/users/" + session?.user.id + "/posts");
      const data = await response.json();
      setPosts(data);
    };
    console.log(session);
    if (session?.user.id) fetchProps();
  }, [session?.user.id]);

  return (
    <Profile
      name="My"
      desc="Welcome to your personalized profile page"
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default Page;
