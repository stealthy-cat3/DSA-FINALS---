import { useState, useEffect } from "react";

const App = () => {
  return (
    <div className="container" style={styles.container}>
      <h1 style={styles.title}>My Digital Thoughts</h1>
      <ThoughtInput />
    </div>
  );
};

export default App;

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
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          required
          style={styles.input}
        />
        <textarea
          name="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your thoughts..."
          required
          style={styles.textarea}
        />
        <button type="submit" style={styles.button}>
          Add Thought
        </button>
      </form>

      <div style={{ marginTop: "20px" }}>
        {thoughts.map((thought, index) => (

          <div key={index} style={styles.thoughtCard}>
            <div>
              <h3 style={styles.thoughtTitle}>{thought.title}</h3>
              <p style={styles.thoughtContent}>{thought.content}</p>
              <small style={styles.thoughtDate}>{thought.date}</small>
              <br></br>
              <br></br>
              <button
                onClick={() => handleRemoveThought(index)}
                style={styles.removeButton}
              >
                Remove Thought
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Styles for the dark futuristic neon theme
const styles = {
  container: {
    backgroundColor: "#121212",
    color: "#E0E0E0",
    fontFamily: "Arial, sans-serif",
    minHeight: "100vh",
    padding: "20px",
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  title: {
    fontSize: "3em",
    fontWeight: "bold",
    color: "#00FFFF",
    textShadow: "0 0 20px #00FFFF, 0 0 40px #00FFFF",
    marginBottom: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    width: "100%",
    maxWidth: "500px",
  },
  input: {
    padding: "10px",
    borderRadius: "5px",
    border: "none",
    outline: "none",
    backgroundColor: "#1F1F1F",
    color: "#E0E0E0",
    boxShadow: "0 0 10px #00FFFF",
    minWidth: "500px",

  },
  textarea: {
    padding: "10px",
    borderRadius: "5px",
    border: "none",
    outline: "none",
    backgroundColor: "#1F1F1F",
    color: "#E0E0E0",
    height: "100px",
    boxShadow: "0 0 10px #00FFFF",
  },
  button: {
    padding: "10px",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer",
    backgroundColor: "#00FFFF",
    color: "#121212",
    fontWeight: "bold",
    textTransform: "uppercase",
    boxShadow: "0 0 20px #00FFFF",
    transition: "all 0.3s ease",
  },
  thoughtCard: {
    backgroundColor: "#1F1F1F",
    borderRadius: "10px",
    padding: "15px",
    boxShadow: "0 0 10px #00FFFF",
    marginTop: "35px",
  },
  thoughtTitle: {
    color: "#00FFFF",
    fontSize: "1.2em",
    marginBottom: "10px",
  },
  thoughtContent: {
    color: "#E0E0E0",
    marginBottom: "10px",
  },
  thoughtDate: {
    color: "#888888",
    fontSize: "0.8em",
  },
  removeButton: {
    padding: "5px 10px",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer",
    backgroundColor: "#FF007F",
    color: "#121212",
    fontWeight: "bold",
    textTransform: "uppercase",
    boxShadow: "0 0 15px #FF007F",
    transition: "all 0.3s ease",
  },
};
