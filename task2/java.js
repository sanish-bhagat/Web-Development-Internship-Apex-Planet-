document.getElementById("contactForm").addEventListener("submit", function(e) {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if(!username || !password || !email) {
        alert("Please Fill the Required Fields!");
        return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailPattern.test(email)) {
        alert("Please Enter a valid e-mail Adress!")
        return;
    }

    alert("Form Submitted Successfully!");
    this.reset();
});

let todos = JSON.parse(localStorage.getItem("todos")) || [];

function renderTools() {
    const list = document.getElementById("todoList");
    list.innerHTML = "";
    todos.forEach((todo, index) => {
        const li = document.createElement("li");
        li.innerHTML = `
            ${todo}
            <button class="delete-btn" onclick="deleteTask(${index})">X</button>
        `;
        list.appendChild(li);
    });
}

function addTask() {
    const input = document.getElementById("todoInput");
    const value = input.value.trim();
    if(value) {
        todos.push(value);
        localStorage.setItem("todos", JSON.stringify(todos));
        input.value = "";
        renderTools();
    }
}

function deleteTask(index) {
    todos.splice(index, 1);
    localStorage.setItem("todos", JSON.stringify(todos));
    renderTools();
}

renderTools();