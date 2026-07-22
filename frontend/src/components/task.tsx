import { useState } from "react";
import type { FormEvent } from "react";

function AddTask() {
  const [title, setTitle] = useState("");
  const [projectId, setProjectId] = useState("");
  const [status, setStatus] = useState("todo");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // console.log("Access Token:", localStorage.getItem("token"));
    const token = localStorage.getItem("token");

    console.log("TOKEN:", token);

    const response = await fetch(
      "http://127.0.0.1:8000/api/new/tasks/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          title,
          projects: projectId,
          status,
        }),
      }
    );

    const data = await response.json();
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Task Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        type="number"
        placeholder="Project ID"
        value={projectId}
        onChange={(e) => setProjectId(e.target.value)}
      />

      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <option value="todo">Todo</option>
        <option value="progress">Progress</option>
        <option value="done">Done</option>
      </select>

      <button type="submit">
        Add Task
      </button>
    </form>
  );
}

export default AddTask;