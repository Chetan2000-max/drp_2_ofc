import { useEffect, useState } from "react";
import API from "../api/axios";
import "./projects.css";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [name, setName] = useState("");

  const getProjects = async () => {
    try {
      const token = localStorage.getItem("token");
      console.debug("getProjects token present:", Boolean(token));
      const res = await API.get("/new/projects/");
      setProjects(res.data);
    } catch (error) {
      console.error("getProjects error", error);
    }
  };

  const addProject = async () => {
    if (!name.trim()) return;

    try {
      const token = localStorage.getItem("token");
      console.debug("addProject token present:", Boolean(token));
      await API.post("/new/projects/", {
        name,
      });
      setName("");
      getProjects();
    } catch (error) {
      console.error("addProject error", error);
      alert("Failed to add project. Please login again and try.");
    }
  };

  useEffect(() => {
    getProjects();
  }, []);

  return (
    <div className="project-container">
      <div className="project-card">
        <h2>📁 Projects</h2>

        <div className="project-input-group">
          <input
            type="text"
            placeholder="Enter Project Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <button onClick={addProject}>
            Add Project
          </button>
        </div>

        <div className="project-list">
          {projects.map((p: any) => (
            <div
              key={p.id}
              className="project-item"
            >
              {p.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Projects;