// Function to toggle accordion sections
function toggleAccordion(header) {
    const content = header.nextElementSibling;
    content.style.display = content.style.display === "block" ? "none" : "block";
    const arrow = header.querySelector(".arrow");
    arrow.textContent = arrow.textContent === "▼" ? "▲" : "▼";
}

// Attach click event listeners to all accordion headers
document.querySelectorAll(".accordion-header").forEach(header => {
    header.addEventListener("click", () => toggleAccordion(header));
});

