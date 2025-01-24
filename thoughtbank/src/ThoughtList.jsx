import { useState, useEffect } from "react";
import ThoughtInput from "./ThoughtInput";

const ThoughtList = () => {
  const [thoughts, setThoughts] = useState(() => {
    // Load initial thoughts from local storage if available
    const storedThoughts = localStorage.getItem("thoughts");

    return storedThoughts ? JSON.parse(storedThoughts) : [];
  });

  useEffect(() => {
    // Save the thoughts to local storage whenever they change
    localStorage.setItem("thoughts", JSON.stringify(thoughts));

    
  }, [thoughts]);

  const addThought = (newThought) => {
    setThoughts((prevThoughts) => [...prevThoughts, newThought]);
  };

  const removeThought = (index) => {
    setThoughts((prevThoughts) =>
      prevThoughts.filter((_, i) => i !== index)
    );
  };

  return (
    <div>
      <ThoughtInput onAddEntry={addThought} />
      <ul>
        {thoughts.map((thought, index) => (
          <li key={index}>
            <h3>{thought.title}</h3>
            <p>{thought.content}</p>
            <small>{thought.date}</small>
            <button onClick={() => removeThought(index)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ThoughtList;
