// Selectors
const entrieInput = document.querySelector(".entrie-input");
const entrieButton = document.querySelector(".entrie-button");
const entrieList = document.querySelector(".entries-list");
const entrieTimeSection = document.querySelector(".entries-date");

// Event Listeners
document.addEventListener("DOMContentLoaded", getEntries);
entrieButton.addEventListener("click", addNewEntrie);
entrieList.addEventListener("click", deleteEntries);

// Functions
function addNewEntrie(event) {
  // Prevent form from submitting
  event.preventDefault();
  // New entrie DIV
  const newEntrieDiv = document.createElement("div");
  newEntrieDiv.classList.add("entrie");
  // Create LI
  const newEntrie = document.createElement("li");
  newEntrie.innerText = entrieInput.value;
  newEntrie.classList.add("entrie-item");
  newEntrieDiv.appendChild(newEntrie);
  // Add entries to local storage
  saveLocalEntries(entrieInput.value);
  // Delete button
  const deleteButton = document.createElement("button");
  deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
  deleteButton.classList.add("delete-btn");
  newEntrieDiv.appendChild(deleteButton);
  // Append to entrie list
  entrieList.appendChild(newEntrieDiv);
  // Clear text area value
  entrieInput.value = "";
}

// Delete entries
function deleteEntries(event) {
  const item = event.target;
  // Delete entrie
  if (item.classList[0] === "delete-btn") {
    const entrieItem = item.parentElement;
    removeLocalEntries(item);
    entrieItem.remove();
  }
}
// SAVE TO LOCAL STORAGE
function saveLocalEntries(entrie) {
  // Check or i already have thing in local storage
  let entries;
  if (localStorage.getItem("entries") === null) {
    entries = [];
  } else {
    entries = JSON.parse(localStorage.getItem("entries"));
  }
  entries.push(entrie);
  localStorage.setItem("entries", JSON.stringify(entries));
}

function getEntries() {
  // Check or i already have thing in local storage
  let entries;
  if (localStorage.getItem("entries") === null) {
    entries = [];
  } else {
    entries = JSON.parse(localStorage.getItem("entries"));
  }
  entries.forEach(function (entrie) {
    const newEntrieDiv = document.createElement("div");
    newEntrieDiv.classList.add("entrie");
    // Create LI
    const newEntrie = document.createElement("li");
    newEntrie.innerText = entrie;
    newEntrie.classList.add("entrie-item");
    newEntrieDiv.appendChild(newEntrie);
    // Delete button
    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
    deleteButton.classList.add("delete-btn");
    newEntrieDiv.appendChild(deleteButton);
    // Append to entrie list
    entrieList.appendChild(newEntrieDiv);
  });
}

function removeLocalEntries(entrie) {
  let entries;
  if (localStorage.getItem("entries") === null) {
    entries = [];
  } else {
    entries = JSON.parse(localStorage.getItem("entries"));
  }
  console.log(entrie);
  const entrieIndex = entrie.children[0].innerText;
  entries.splice(entries.indexOf(entrieIndex), 1);
  localStorage.setItem("entries", JSON.stringify(entries));
}
