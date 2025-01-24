import { useState, useEffect } from "react";

const ThoughtInput = ({ onAddEntry }) => {
  // Retrieve saved title and content from localStorage, or default to empty
  const [title, setTitle] = useState(localStorage.getItem('title') || '');
  const [content, setContent] = useState(localStorage.getItem('content') || '');

  // Update localStorage whenever the title or content changes
  useEffect(() => {
    localStorage.setItem('title', title);
    localStorage.setItem('content', content);
  }, [title, content]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newEntry = {
      title: title,
      content: content,
      date: new Date().toLocaleString(),
    };
    onAddEntry(newEntry);
    setTitle('');
    setContent('');
    // Clear localStorage once the entry is added
    localStorage.removeItem('title');
    localStorage.removeItem('content');
  };

  return (
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
  );
};

export default ThoughtInput;
