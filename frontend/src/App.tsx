import { useEffect, useState } from "react";

const API_URL = "http://127.0.0.1:8000/api/new/projects/";

// ✅ Define Project type
type Project = {
  id: number;
  name: string;
  owner?: string;
  createdAt?: string;
};

function App() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzc3NzE2NTIyLCJpYXQiOjE3Nzc3MTYyMjIsImp0aSI6IjIyZjM4M2ViMjA1OTQ2YTg4NmQ2Y2RlMTNkYThlNjRhIiwidXNlcl9pZCI6IjIifQ.nP48wRsqd0y5mdJf4wgeOpU3-msqT3F2OUGJOXIDP64");
  const username = localStorage.getItem("username");

  // 🔹 Load Projects
  const loadProjects = async () => {
    setLoading(true);

    try {
      const res = await fetch(API_URL, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      const data: Project[] = await res.json();
      setProjects(data);
    } catch (error) {
      console.log(error);
      setMessage("Error loading data ❌");
    }

    setLoading(false);
  };

  useEffect(() => {
    loadProjects();
  }, []);

  // 🔹 Create Project
  const createProject = async () => {
    if (!name) return alert("Enter project name");

    const res = await fetch(API_URL, {
      method: "POST",
      headers: {   
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({ name }),
    });

    if (res.ok) {
      setName("");
      setMessage("Project added ✅");
      loadProjects();
    } else {
      setMessage("Error ❌");
    }
  };

  // 🔹 Delete Project
  const deleteProject = async (id: number) => {
    if (!confirm("Delete?")) return;

    const res = await fetch(`${API_URL}${id}/`, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    if (res.ok) {
      setMessage("Deleted ✅");
      loadProjects();
    }
  };

  // 🔹 Update Project
  const updateProject = async (id: number, newName: string) => {
    const res = await fetch(`${API_URL}${id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({ name: newName }),
    });

    if (res.ok) {
      setMessage("Updated ✅");
    }
  };

  // 🔹 Logout
  const logout = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Dashboard</h2>

      {/* ✅ 1. Frontend Improvement */}
      <div>
        Welcome, <b>{username}</b>
        <button onClick={logout} style={{ marginLeft: 10 }}>
          Logout
        </button>
      </div>

      {/* ✅ 3. UX Message */}
      <p>{message}</p>

      {/* Create */}
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Project name"
      />
      <button onClick={createProject}>Add</button>

      {/* Loading */}
      {loading && <p>Loading...</p>}

      {/* Table */}
      <table border={1} width="100%" style={{ marginTop: 20 }}>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {projects.map((p, i) => (
            <tr key={p.id}>
              <td>{i + 1}</td>

              {/* ✅ 2. Update */}
              <td>
                <input
                  defaultValue={p.name}
                  onBlur={(e) =>
                    updateProject(p.id, e.target.value)
                  }
                />
              </td>

              {/* ✅ 2. Delete */}
              <td>
                <button onClick={() => deleteProject(p.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;