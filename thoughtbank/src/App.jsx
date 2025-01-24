import { useState } from "react";
import ThoughtInput from "./ThoughtInput"; // Ensure this matches your component name and file name

const App = () => {
  const [entries, setEntries] = useState([]);

  const addEntry = (newEntry) => {
    setEntries([newEntry, ...entries]); // Add new entry to the top of the list
  };

  return (
    <div className="container">
      <h1>My Digital Thoughts</h1>
      <ThoughtInput onAddEntry={addEntry} />

      <div>
        {entries.length === 0 ? (
          <p>No thoughts yet. Start sharing yours!</p>
        ) : (
          entries.map((entry, index) => (
            <div key={index} className="entry">
              <h3>{entry.title}</h3>
              <small>{entry.date}</small>
              <p>{entry.content}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default App;
