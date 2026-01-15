let totalTasks = 0;
let completedTasks = 0;

/* Send Message */
function sendMessage() {
  document.getElementById("successMsg").innerText =
    "✔ Message sent successfully!";
}

/* Learning Checklist */
function addTask() {
  const input = document.getElementById("taskInput");
  const text = input.value.trim();
  if (!text) return;

  totalTasks++;

  const li = document.createElement("li");
  li.className = "task-item";

  li.innerHTML = `
    <div class="task-left">
      <input type="checkbox">
      <span>${text}</span>
    </div>
    <span class="remove-task">✖</span>
  `;

  const checkbox = li.querySelector("input");
  const removeBtn = li.querySelector(".remove-task");

  checkbox.addEventListener("change", () => {
    if (checkbox.checked) {
      li.classList.add("done");
      completedTasks++;
    } else {
      li.classList.remove("done");
      completedTasks--;
    }
    updateProgress();
  });

  removeBtn.addEventListener("click", () => {
    if (li.classList.contains("done")) completedTasks--;
    totalTasks--;
    li.remove();
    updateProgress();
  });

  document.getElementById("taskList").appendChild(li);
  input.value = "";
  updateProgress();
}

function updateProgress() {
  document.getElementById("progress").innerText =
    `${completedTasks}/${totalTasks} DONE`;
}

/* Inspiration Gallery */
function uploadImages(event) {
  const gallery = document.getElementById("gallery");

  for (let file of event.target.files) {
    const reader = new FileReader();

    reader.onload = (e) => {
      const div = document.createElement("div");
      div.className = "gallery-item";

      div.innerHTML = `
        <img src="${e.target.result}">
        <button class="gallery-remove">×</button>
      `;

      div.querySelector(".gallery-remove").addEventListener("click", () => {
        div.remove();
      });

      gallery.prepend(div);
    };

    reader.readAsDataURL(file);
  }
}
