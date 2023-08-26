"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

import Form from "@components/Form";

function UpdatePrompt() {
  const { data: session } = useSession();
    const router = useRouter();
  const searchParams = useSearchParams();
  const promptId = searchParams.get("id");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [post, setPost] = useState({ prompt: "", tag: "" });

  useEffect(
    function () {
      async function getPromptDetails() {
        const res = await fetch(`api/prompt/${promptId}`);
        const data = await res.json();

        setPost({
          prompt: data.prompt,
          tag: data.tag,
        });
      }
      if (promptId) getPromptDetails();
    },
    [promptId]
  );

  async function handleUpdatePrompt(e) {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch(`/api/prompt/${promptId}`, {
        method: "PATCH",
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
        type="Update"
        handleSubmit={handleUpdatePrompt}
        post={post}
        setPost={setPost}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}

export default UpdatePrompt;
