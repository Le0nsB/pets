// Function to toggle accordion sections
function toggleAccordion(header) {
    const content = header.nextElementSibling;
    content.style.display = content.style.display === "block" ? "none" : "block";
    const arrow = header.querySelector(".arrow");
    arrow.textContent = arrow.textContent === "▼" ? "▲" : "▼";
}

// Ensure the accordion toggling works after the document is fully loaded
document.addEventListener("DOMContentLoaded", function() {
    // Attach click event listeners to all accordion headers
    document.querySelectorAll(".accordion-header").forEach(header => {
        header.addEventListener("click", function() {
            toggleAccordion(header);
        });
    });
});

function toggleDarkMode() {
    // Toggle the 'dark-mode' class on the body
    document.body.classList.toggle('dark-mode');

    // Optionally, change the button icon when toggling
    const button = document.getElementById('dark-mode-toggle');
    if (document.body.classList.contains('dark-mode')) {
        button.innerHTML = '🌞'; // Change to sun icon when in dark mode
    } else {
        button.innerHTML = '🌙'; // Change to moon icon when in light mode
    }
}
