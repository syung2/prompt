"use client";
import Form from "@/components/Form";
import { useRouter, useSearchParams } from "next/navigation";
import React, { Suspense, useEffect, useState } from "react";

const UpdatePrompt = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const promptId = searchParams.get("id");

  // const { data: session } = useSession();
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  });
  const updatePrompt = async () => {
    event?.preventDefault();
    setSubmitting(true);
    if (!promptId) return alert("prompt id not found");

    try {
      const response = await fetch("/api/prompt/" + promptId, {
        method: "PATCH",
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
        }),
      });
      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getPromptDetails = async () => {
      const response = await fetch("/api/prompt/" + promptId);
      const data = await response.json();
      setPost({
        prompt: data.prompt,
        tag: data.tag,
      });
    };
    if (promptId) getPromptDetails();
  }, [promptId]);
  return (
    <Form
      type="Edit"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={() => updatePrompt()}
    />
  );
};

const EditPrompt = () => {
  return (
    <Suspense>
      <UpdatePrompt />
    </Suspense>
  );
};

export default EditPrompt;
