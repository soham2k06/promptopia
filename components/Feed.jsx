"use client";

import { useEffect, useState } from "react";
import PromptCard from "./PromptCard";

function PromptCardList({ data: prompts, handleTagClick }) {
  return (
    <div className="mt-16 prompt_layout">
      {prompts.map((prompts) => (
        <PromptCard
          key={prompts._id}
          data={prompts}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
}

function Feed() {
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState([]);

  function handleSearchChange(e) {
    e.preventDefault;
  }

  useEffect(function () {
    async function fetchPrompts() {
      const res = await fetch("/api/prompt");
      const data = await res.json();
      setPosts(data);
    }
    fetchPrompts();
  }, []);
  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>
      <PromptCardList data={posts} handleTagClick={() => {}} />
    </section>
  );
}

export default Feed;
