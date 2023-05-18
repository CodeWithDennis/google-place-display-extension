const regex = /ChIJ\S*/g;
const elements = document.querySelectorAll('[data-pid^="ChIJ"]');
let place = null;

for (let i = 0; i < elements.length; i++) {
    const element = elements[i];
    const pid = element.getAttribute('data-pid');

    if (regex.test(pid)) {
        place = pid;
        break;
    }
}
// Find the first element with the ID "kp-wp-tab-overview"
let firstElement = document.querySelector("#kp-wp-tab-overview");

// Create a new <div> element
let newDiv = document.createElement("div");

// Set the margin CSS property of the <div> element
newDiv.style.padding = "9px";
newDiv.style.background = "rgb(253, 246, 246)";
newDiv.style.color = "#222222";
newDiv.style.textAlign = "center";
newDiv.style.borderBottom = "1px solid #dadce0";

// Create a new <button> element
let copyButton = document.createElement("button");

// Set the content and style of the <button> element
copyButton.innerHTML = place;
copyButton.style.cursor = "pointer";
copyButton.classList.add("ab_button"); // Add the 'ab_button' class

// Add a click event listener to the copy button
copyButton.addEventListener("click", function () {
    copyToClipboard(place);
    copyButton.innerHTML = "Copied!"; // Update button text to "Copied"
    copyButton.disabled = true; // Disable the button temporarily

    // Reset button text and enable after 2 seconds
    setTimeout(function () {
        copyButton.innerHTML = place;
        copyButton.disabled = false;
    }, 2000);
});

// Append the copy button to the <div> element
newDiv.appendChild(copyButton);

// Prepend the new <div> element to the found element
firstElement.prepend(newDiv);

// Function to copy the Place ID to the clipboard
function copyToClipboard(text) {
    const input = document.createElement("input");
    input.style.position = "fixed";
    input.style.opacity = 0;
    input.value = text;
    document.body.appendChild(input);
    input.select();
    document.execCommand("copy");
    document.body.removeChild(input);
}

if (place) {
    chrome.runtime.sendMessage({place: '1'});
}
