// SGPA → Percentage (CU)
function convertSGPA() {
  let sgpa = parseFloat(document.getElementById("sgpa").value);

  if (isNaN(sgpa)) {
    alert("Enter valid SGPA");
    return;
  }

  let percentage = sgpa * 10;
  document.getElementById("percentage").value = percentage.toFixed(2);
}

function resetSGPA() {
  document.getElementById("sgpa").value = "";
  document.getElementById("percentage").value = "";
}


// 🔥 ADD SUBJECT (with numbering)
function addSubject() {
  let container = document.getElementById("subjectsContainer");

  let count = container.children.length + 1;

  let div = document.createElement("div");
  div.classList.add("subjectRow");

  div.innerHTML = `
    <label>Subject ${count} Marks:</label>
    <input type="number" class="subjectMarks" placeholder="Enter marks">
    <button onclick="removeSubject(this)">❌</button>
  `;

  container.appendChild(div);
}


// ❌ REMOVE SUBJECT + re-number
function removeSubject(btn) {
  btn.parentElement.remove();
  updateLabels();
}


// 🔄 UPDATE LABEL NUMBERS
function updateLabels() {
  let rows = document.querySelectorAll("#subjectsContainer .subjectRow");

  rows.forEach((row, index) => {
    let label = row.querySelector("label");
    label.innerText = `Subject ${index + 1} Marks:`;
  });
}


// YEARLY CALCULATION (CU)
function calculateYear() {
  let sgpa = parseFloat(document.getElementById("yearSGPA").value);

  if (isNaN(sgpa)) {
    alert("Enter valid SGPA");
    return;
  }

  let subjects = document.querySelectorAll(".subjectMarks");

  let totalMarks = 0;

  subjects.forEach(input => {
    let val = Number(input.value);
    if (!isNaN(val) && val > 0) {
      totalMarks += val;
    }
  });

  if (totalMarks === 0) {
    alert("Enter at least one subject");
    return;
  }

  let percentage = sgpa * 10;
  let obtainedMarks = (percentage / 100) * totalMarks;

  document.getElementById("totalMarks").innerText = totalMarks;
  document.getElementById("obtainedMarks").innerText = obtainedMarks.toFixed(2);
  document.getElementById("overallPercent").innerText = percentage.toFixed(2);
}


// RESET
function resetYear() {
  document.getElementById("yearSGPA").value = "";
  document.getElementById("subjectsContainer").innerHTML = "";

  document.getElementById("totalMarks").innerText = "";
  document.getElementById("obtainedMarks").innerText = "";
  document.getElementById("overallPercent").innerText = "";

  addSubject(); // keep at least one input
}


// DARK MODE
function toggleDarkMode() {
  document.body.classList.toggle("dark");

  let isDark = document.body.classList.contains("dark");
  localStorage.setItem("theme", isDark);

  document.getElementById("themeBtn").innerText =
    isDark ? "☀️ Light Mode" : "🌙 Dark Mode";
}

window.onload = function () {
  if (localStorage.getItem("theme") === "true") {
    document.body.classList.add("dark");
    document.getElementById("themeBtn").innerText = "☀️ Light Mode";
  }

  addSubject(); // start with 1 subject
};
