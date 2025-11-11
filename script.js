const userImg = document.getElementById("user-img");
const userName = document.getElementById("user-name");
const additionalInfo = document.getElementById("additional-info");
const getUserBtn = document.getElementById("getUser");
const infoButtons = document.querySelectorAll("button[data-attr]");


let currentUser = null;

async function fetchUser() {
  try {
    const response = await fetch("https://randomuser.me/api/");
    const data = await response.json();
    const user = data.results[0];

    // Store in global variable
    currentUser = {
      name: `${user.name.first} ${user.name.last}`,
      image: user.picture.large,
      age: user.dob.age,
      email: user.email,
      phone: user.phone,
    };

    // Display name and image
    displayUser();
  } catch (error) {
    console.error("Error fetching user:", error);
  }
}


// Function to display user's basic info
function displayUser() {
  userImg.src = currentUser.image;
  userName.textContent = currentUser.name;
  additionalInfo.textContent = ""; // clear previous info
}

// Add event listener for info buttons
infoButtons.forEach(button => {
  button.addEventListener("click", () => {
    const attr = button.getAttribute("data-attr");
    additionalInfo.textContent = currentUser[attr];
  });
});

// Get new user button
getUserBtn.addEventListener("click", fetchUser);

// Initial load
fetchUser();
