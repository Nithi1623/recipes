// Selecting popup overlay, popup box, and add button
var po = document.querySelector('.popup-overlay');
var pb = document.querySelector('.popup-box');
var pbx = document.querySelector('.add-button');

// Selecting session, add-recipe, recipe-name, author, recipe-dis
var ses = document.querySelector(".session");
var adrec = document.getElementById("add-recipe");
var recnam = document.getElementById("recipe-name");
var auth = document.getElementById("author");
var recdis = document.getElementById("recipe-dis");

// Track the currently edited recipe (if any)
var editingRecipe = null;

// Open the popup when clicking the "Add" button
pbx.addEventListener('click', function () {
    po.style.display = "block";
    pb.style.display = "block";

    // Clear fields
    recnam.value = "";
    auth.value = "";
    recdis.value = "";

    // Reset the button text and function
    adrec.innerText = "Add";
    editingRecipe = null;

    // Ensure event listener is set correctly
    resetAddButton();
});

// Close popup when clicking "Close"
var cr = document.getElementById('close-recipe');
cr.addEventListener("click", function (event) {
    event.preventDefault();
    po.style.display = "none";
    pb.style.display = "none";
});

// Function to reset the "Add" button event
function resetAddButton() {
    adrec.onclick = function (event) {
        event.preventDefault();
        if (editingRecipe) {
            updateRecipe(); // If modifying, update the recipe
        } else {
            addRecipe(); // If adding a new one, add it
        }
    };
}

// Function to add a new recipe
function addRecipe() {
    var div = document.createElement("div");
    div.setAttribute("class", "recipe-ses");
    div.innerHTML = `<h2>${recnam.value}</h2>
        <h3>${auth.value}</h3>
        <ol>${recdis.value.split("\n").map(item => `<li>${item}</li>`).join("")}</ol>
        <button onclick="modifyRecipe(event)">Modify</button>
        <button onclick="delcon(event)">Delete</button>`;

    ses.append(div);

    // Close popup after adding
    po.style.display = "none";
    pb.style.display = "none";
}

// Function to delete a recipe
function delcon(event) {
    let confirmDelete = confirm("Are you sure you want to delete the recipe?");
    if (confirmDelete) {
        event.target.parentElement.remove();
    }
}

// Function to modify an existing recipe
function modifyRecipe(event) {
    editingRecipe = event.target.parentElement;

    // Pre-fill the fields with existing values
    recnam.value = editingRecipe.querySelector("h2").innerText;
    auth.value = editingRecipe.querySelector("h3").innerText;
    recdis.value = Array.from(editingRecipe.querySelectorAll("ol li"))
        .map(li => li.innerText)
        .join("\n");

    // Open popup
    po.style.display = "block";
    pb.style.display = "block";

    // Change button text to "Save Changes"
    adrec.innerText = "Save Changes";

    // Ensure event listener is set correctly
    resetAddButton();
}

// Function to update the existing recipe
function updateRecipe() {
    if (editingRecipe) {
        editingRecipe.querySelector("h2").innerText = recnam.value;
        editingRecipe.querySelector("h3").innerText = auth.value;
        editingRecipe.querySelector("ol").innerHTML = recdis.value
            .split("\n")
            .map(item => `<li>${item}</li>`)
            .join("");

        // Close popup
        po.style.display = "none";
        pb.style.display = "none";

        // Reset button to "Add" mode
        editingRecipe = null;
        adrec.innerText = "Add";
        resetAddButton();
    }
}

