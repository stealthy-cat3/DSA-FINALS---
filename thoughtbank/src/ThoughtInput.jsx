const ThoughtInput = ({ onAddEntry }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const newEntry = {
      title: e.target.title.value,
      content: e.target.content.value,
      date: new Date().toLocaleString(),
    };
    onAddEntry(newEntry);
    e.target.reset();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="title" placeholder="Title" required />
      <textarea name="content" placeholder="Write your thoughts..." required />
      <button type="submit">Add Thought</button>
    </form>
  );
};

export default ThoughtInput;
