
const API_URL = "http://127.0.0.1:8000/api/projects/";

// 👉 paste your JWT token here
const TOKEN = localStorage.getItem("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzc3NzE2NTIyLCJpYXQiOjE3Nzc3MTYyMjIsImp0aSI6IjIyZjM4M2ViMjA1OTQ2YTg4NmQ2Y2RlMTNkYThlNjRhIiwidXNlcl9pZCI6IjIifQ.nP48wRsqd0y5mdJf4wgeOpU3-msqT3F2OUGJOXIDP64");  
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
// async function createProject() {
//     let name = document.getElementById("projectName").value;

//     if (!name) {
//         alert("Enter project name");
//         return;
//     }

//     try {
//         let res = await fetch(API_URL, {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//                 "Authorization": "Bearer " + TOKEN
//             },
//             body: JSON.stringify({
//                 name: name
//             })
//         });

//         let data = await res.json();
//         console.log(data);

//         document.getElementById("projectName").value = "";
//         loadProjects();

//     } catch (error) {
//         console.log("Error creating project:", error);
//     }
// }


async function createProject() {
    let nameInput = document.getElementById("projectName");
    let name = nameInput.value;

    if (!name) {
        alert("Enter project name");
        return;
    }

    // Always fetch the latest token from localStorage
    const currentToken = localStorage.getItem("access_token") || TOKEN; 

    try {
        let res = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${currentToken}` // Use dynamic token
            },
            body: JSON.stringify({ name: name })
        });

        if (res.ok) {
            nameInput.value = ""; // Clear input on success
            loadProjects();       // Reload the table
        } else {
            let errorData = await res.json();
            console.error("Server Error:", errorData);
            alert("Failed to add project: " + JSON.stringify(errorData));
        }
    } catch (error) {
        console.error("Network Error:", error);
        console.log("JS Loaded");
    }
}


// Load data when page opens
loadProjects();