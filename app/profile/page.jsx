"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Profile from "@components/Profile";

function ProfilePage() {
  const { data: session } = useSession();
  const router = useRouter();

  const [posts, setPosts] = useState([]);

  function handleEdit(post) {
    console.log(post);
    router.push(`/update-prompt?id=${post._id}`);
  }
  async function handleDelete(post) {
    const isConfirmed = confirm("Are you sure you want to delete this prompt?");

    if (isConfirmed) {
      try {
        await fetch(`api/prompt/${post._id.toString()}`, { method: "DELETE" });
        const filteredPosts = posts.filter((p) => p._id !== post._id);
      } catch (error) {
        console.log(error);
      }
    }
  }

  useEffect(function () {
    async function fetchPrompts() {
      const res = await fetch(`/api/users/${session?.user.id}/posts`);
      const data = await res.json();
      setPosts(data);
    }
    if (session?.user.id) fetchPrompts();
  }, []);

  return (
    <Profile
      name="My"
      desc="Welcome to your personalized profile page"
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
}

export default ProfilePage;
