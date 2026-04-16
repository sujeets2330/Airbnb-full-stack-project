// filters icon -----------------------------------
const filters = document.querySelectorAll(".filter");
const currentPath = window.location.pathname;

// Function to apply styles based on the selected filter
function applyStyles(selectedFilter) {
    // Remove 'selected' class from all filters
    filters.forEach((f) => f.classList.remove("selectedFilter"));
    
    // If on main listings page, select "ALL" filter
    if (currentPath === "/listings") {
        const allFilter = document.querySelector(".ALL");
        if (allFilter) allFilter.classList.add("selectedFilter");
        return;
    }
    
    // Add 'selected' class to the clicked filter
    const selectedElement = document.querySelector("." + selectedFilter);
    if (selectedElement) {
        selectedElement.classList.add("selectedFilter");
    }
}

// Add click event listener to each filter
filters.forEach((filter) => {
    filter.addEventListener("click", function (e) {
        // Get the filter class (second class)
        const element = this.classList[1];
        if (!element) return;
        
        // Store the selected filter in sessionStorage (better than localStorage)
        sessionStorage.setItem("selectedFilter", element);
        
        // Apply styles immediately
        applyStyles(element);
    });
});

// On page load, check if a filter was previously selected
const storedFilter = sessionStorage.getItem("selectedFilter");
if (storedFilter && currentPath !== "/listings") {
    applyStyles(storedFilter);
} else if (currentPath === "/listings") {
    applyStyles("ALL");
}

// filters slide button - ENHANCED VERSION
let filtersBox = document.querySelector("#filters");
let buttonSlide = document.querySelectorAll("#slideButton");

if (filtersBox && buttonSlide.length) {
    // Function to update button visibility
    const updateButtonsVisibility = () => {
        if (!filtersBox) return;
        
        const scrollLeft = filtersBox.scrollLeft;
        const maxScroll = filtersBox.scrollWidth - filtersBox.clientWidth;
        
        // Left button visibility
        if (buttonSlide[0]) {
            buttonSlide[0].style.display = scrollLeft <= 10 ? "none" : "flex";
        }
        
        // Right button visibility
        if (buttonSlide[1]) {
            buttonSlide[1].style.display = maxScroll - scrollLeft <= 10 ? "none" : "flex";
        }
    };
    
    // Smooth scroll with animation
    buttonSlide.forEach((button) => {
        button.addEventListener("click", (e) => {
            e.preventDefault();
            const direction = button.className === "left_img_button" ? -1 : 1;
            const scrollAmount = filtersBox.clientWidth - 100;
            filtersBox.scrollBy({ 
                left: direction * scrollAmount, 
                behavior: "smooth" 
            });
        });
    });
    
    // Update buttons on scroll
    filtersBox.addEventListener("scroll", updateButtonsVisibility);
    
    // Update buttons on window resize
    window.addEventListener("resize", () => {
        setTimeout(updateButtonsVisibility, 100);
    });
    
    // Initial button visibility
    setTimeout(updateButtonsVisibility, 100);
}

// Optional: Keyboard navigation for filters
document.addEventListener("keydown", (e) => {
    if (filtersBox && (e.key === "ArrowLeft" || e.key === "ArrowRight")) {
        const scrollAmount = filtersBox.clientWidth - 100;
        filtersBox.scrollBy({
            left: e.key === "ArrowLeft" ? -scrollAmount : scrollAmount,
            behavior: "smooth"
        });
    }
});