// SGPA → Percentage
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


// 🎯 Grade Prediction (CU)
function predictGradeCU() {
  let sgpa = parseFloat(document.getElementById("gradeSGPA").value);

  if (isNaN(sgpa)) {
    alert("Enter valid SGPA");
    return;
  }

  let grade = "";
  let remark = "";

  if (sgpa >= 9) { grade = "A++"; remark = "Outstanding"; }
  else if (sgpa >= 8) { grade = "A+"; remark = "Excellent"; }
  else if (sgpa >= 7) { grade = "A"; remark = "Very Good"; }
  else if (sgpa >= 6) { grade = "B+"; remark = "Good"; }
  else if (sgpa >= 5) { grade = "B"; remark = "Average"; }
  else if (sgpa >= 4) { grade = "C+"; remark = "Fair"; }
  else if (sgpa >= 3) { grade = "C"; remark = "Satisfactory"; }
  else { grade = "F"; remark = "Fail"; }

  document.getElementById("cuGrade").innerText = grade;
  document.getElementById("cuRemark").innerText = remark;
}


// ➕ Add Subject
function addSubject(containerId) {
  let container = document.getElementById(containerId);
  let count = container.children.length + 1;

  let div = document.createElement("div");
  div.classList.add("subjectRow");

  div.innerHTML = `
    <label>Subject ${count} Marks:</label>
    <input type="number" class="subjectMarks" placeholder="Enter marks">
    <button onclick="removeSubject(this, '${containerId}')">❌</button>
  `;

  container.appendChild(div);
}


// ❌ Remove Subject
function removeSubject(btn, containerId) {
  btn.parentElement.remove();
  updateLabels(containerId);
}


// 🔄 Update Labels
function updateLabels(containerId) {
  let rows = document.querySelectorAll(`#${containerId} .subjectRow`);

  rows.forEach((row, index) => {
    row.querySelector("label").innerText =
      `Subject ${index + 1} Marks:`;
  });
}


// 📊 Yearly Calculation
function calculateYear() {
  let oddSGPA = parseFloat(document.getElementById("oddSGPA").value);
  let evenSGPA = parseFloat(document.getElementById("evenSGPA").value);

  if (isNaN(oddSGPA) || isNaN(evenSGPA)) {
    alert("Enter both SGPA values");
    return;
  }

  let oddSubjects = document.querySelectorAll("#oddContainer .subjectMarks");
  let evenSubjects = document.querySelectorAll("#evenContainer .subjectMarks");

  let oddTotal = 0;
  let evenTotal = 0;

  oddSubjects.forEach(input => {
    let val = Number(input.value);
    if (!isNaN(val) && val > 0) oddTotal += val;
  });

  evenSubjects.forEach(input => {
    let val = Number(input.value);
    if (!isNaN(val) && val > 0) evenTotal += val;
  });

  if (oddTotal === 0 || evenTotal === 0) {
    alert("Enter subject marks for both semesters");
    return;
  }

  let oddPercent = oddSGPA * 10;
  let evenPercent = evenSGPA * 10;

  let oddObtained = (oddPercent / 100) * oddTotal;
  let evenObtained = (evenPercent / 100) * evenTotal;

  let totalMarks = oddTotal + evenTotal;
  let obtainedMarks = oddObtained + evenObtained;

  let overallPercent = (obtainedMarks / totalMarks) * 100;

  document.getElementById("totalMarks").innerText = totalMarks;
  document.getElementById("obtainedMarks").innerText = obtainedMarks.toFixed(2);
  document.getElementById("overallPercent").innerText = overallPercent.toFixed(2);
}


// 🔄 Reset
function resetYear() {
  document.getElementById("oddSGPA").value = "";
  document.getElementById("evenSGPA").value = "";

  document.getElementById("oddContainer").innerHTML = "";
  document.getElementById("evenContainer").innerHTML = "";

  document.getElementById("totalMarks").innerText = "";
  document.getElementById("obtainedMarks").innerText = "";
  document.getElementById("overallPercent").innerText = "";

  addSubject("oddContainer");
  addSubject("evenContainer");
}


// 🌙 Dark Mode
function toggleDarkMode() {
  document.body.classList.toggle("dark");

  let isDark = document.body.classList.contains("dark");
  localStorage.setItem("theme", isDark);

  document.getElementById("themeBtn").innerText =
    isDark ? "☀️ Light Mode" : "🌙 Dark Mode";
}


// 🔄 Load
window.onload = function () {
  if (localStorage.getItem("theme") === "true") {
    document.body.classList.add("dark");
    document.getElementById("themeBtn").innerText = "☀️ Light Mode";
  }

  addSubject("oddContainer");
  addSubject("evenContainer");
};
