import { useState, useEffect } from "react";

const ThoughtInput = () => {
  const [title, setTitle] = useState(localStorage.getItem("title") || "");
  const [content, setContent] = useState(localStorage.getItem("content") || "");
  const [thoughts, setThoughts] = useState(
    JSON.parse(localStorage.getItem("thoughts")) || []
  );

  // Sync title and content with local storage
  useEffect(() => {
    localStorage.setItem("title", title);
    localStorage.setItem("content", content);
  }, [title, content]);

  // Sync thoughts with local storage
  useEffect(() => {
    localStorage.setItem("thoughts", JSON.stringify(thoughts));
  }, [thoughts]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newThought = {
      title,
      content,
      date: new Date().toLocaleString(),
    };
    setThoughts((prevThoughts) => [...prevThoughts, newThought]);
    setTitle("");
    setContent("");
    localStorage.removeItem("title");
    localStorage.removeItem("content");
  };

  const handleRemoveThought = (index) => {
    setThoughts((prevThoughts) =>
      prevThoughts.filter((_, i) => i !== index)
    );
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          required
        />
        <textarea
          name="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your thoughts..."
          required
        />
        <button type="submit">Add Thought</button>
      </form>

      <div style={{ marginTop: "20px" }}>
        {thoughts.map((thought, index) => (
          <div
            key={index}
            style={{
              marginBottom: "10px",
              border: "1px solid #ddd",
              padding: "10px",
              borderRadius: "5px",
            }}
          >
            <h3>{thought.title}</h3>
            <p>{thought.content}</p>
            <small>{thought.date}</small>
            <button
              onClick={() => handleRemoveThought(index)}
              style={{
                marginTop: "10px",
                padding: "5px 10px",
                fontSize: "0.7em",
                transform: "scale(0.7)",
                transformOrigin: "center",
              }}
            >
              Remove Thought
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ThoughtInput;
