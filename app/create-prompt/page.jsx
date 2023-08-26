"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Form from "@components/Form";

function CreatePrompt() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [post, setPost] = useState({ prompt: "", tag: "" });
  const { data: session } = useSession();
  const router = useRouter();

  async function handleCreatePrompt(e) {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/prompt/new", {
        method: "POST",
        body: JSON.stringify({
          prompt: post.prompt,
          userId: session?.user.id,
          tag: post.tag,
        }),
      });
      if (res.ok) router.push("/");
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div>
      <Form
        type="Create"
        handleSubmit={handleCreatePrompt}
        post={post}
        setPost={setPost}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}

export default CreatePrompt;
