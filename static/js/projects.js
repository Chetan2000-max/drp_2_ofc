// fetch('http://127.0.0.1:8000/api/projects/')
// .then(request => request.json())
// .then(data => console.log(data))
// .catch(error => error(error))


const API_URL = "http://127.0.0.1:8000/api/projects/";

// 👉 paste your JWT token here
const TOKEN = localStorage.getItem("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzc3NTI5ODc0LCJpYXQiOjE3Nzc1Mjk1NzQsImp0aSI6IjFlZTFlN2ZlNThmYzRmZTNhYWFjMThlMGUwYTE5MjVkIiwidXNlcl9pZCI6IjIifQ.8fWKGzDISjgA-AndBmqgssWzL8XyEbn3Q1PU67bwwH0");  
// OR manually:
// const TOKEN = "your_access_token_here";


async function loadProjects() {
    try {
        let res = await fetch(API_URL, {
            headers: {
                "Authorization": "Bearer " + TOKEN
            }
        });

        let data = await res.json();
        let table = document.getElementById("projectTable");
        table.innerHTML = "";

        data.forEach((project, index) => {
            let row = `
                <tr>
                    <td>${index + 1}</td>
                    <td>${project.owner}</td>
                    <td>${project.name}</td>
                    <td>${project.createdAt}</td>
                </tr>
            `;
            table.innerHTML += row;
        });

    } catch (error) {
        console.log("Error loading projects:", error);
    }
}


// 🔹 Create Project
async function createProject() {
    let name = document.getElementById("projectName").value;

    if (!name) {
        alert("Enter project name");
        return;
    }

    try {
        let res = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + TOKEN
            },
            body: JSON.stringify({
                name: name
            })
        });

        let data = await res.json();
        console.log(data);

        document.getElementById("projectName").value = "";
        loadProjects();

    } catch (error) {
        console.log("Error creating project:", error);
    }
}


// Load data when page opens
loadProjects();