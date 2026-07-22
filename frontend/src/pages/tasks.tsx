import { useState, useEffect } from "react";
import API from "../api/axios";
import "./tasks.css";

type Project = {
  id: number;
  name: string;
};

type Task = {
  id: number;
  title: string;
  status: string;
  projects?: { name: string };
};

function Tasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [title, setTitle] = useState("");
  const [project, setProject] = useState("");
  const [status, setStatus] = useState("todo");

  const getTasks = async () => {
    const res = await API.get("/new/tasks/");
    setTasks(res.data as Task[]);
  };

  const getProjects = async () => {
    const res = await API.get("/new/projects/");
    setProjects(res.data as Project[]);
  };

  const addTask = async () => {
    if (!title.trim() || !project) {
      alert("Please enter a task title and select a project.");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must be logged in to add a task.");
      return;
    }

    try {
      const res = await API.post( 
        "/new/tasks/",
        {
          title,
          projects: Number(project),
          status,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("success", res.data);
      await getTasks();
    } catch (error: any) {
      console.error("addTask error", error.response?.data || error.message || error);
      alert(
        `Failed to add task: ${JSON.stringify(error.response?.data || error.message)}`
      );
    }


  };

  useEffect(() => {
    const loadData = async () => {
      await getTasks();
      await getProjects();
    };

    void loadData();
  }, []);

  return (
    <div className="tasks-page">
      <div className="tasks-card">
        <h2>Tasks</h2>

      <div className="tasks-form">
        <input
          placeholder="Task"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

      <select
        value={project}
        onChange={(e) => setProject(e.target.value)}
      >
        <option>
          Select Project
        </option>

        {projects.map((p: Project) => (
          <option key={p.id} value={p.id}>
            {p.name}
          </option>
        ))}
      </select>

      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="todo">Todo</option>
        <option value="progress">In process</option>
        <option value="done">Done</option>
      </select>

      <button onClick={addTask}>Add Task</button>
      </div>

      <div className="task-list">
        {tasks.map((t: Task) => (
          <div key={t.id} className="task-item">
            <div>
              <strong>{t.title}</strong>
              <span>{t.projects?.name || "No project"}</span>
            </div>
            <span className={`task-status ${String(t.status).toLowerCase()}`}>
              {String(t.status).charAt(0).toUpperCase() + String(t.status).slice(1)}
            </span>
          </div>
        ))}
      </div>
    </div>
  </div>
  );
}

export default Tasks;