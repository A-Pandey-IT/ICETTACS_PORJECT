// Search Overlay - Simple Dynamic Version
document.addEventListener("DOMContentLoaded", () => {
    
    const searchBtn = document.getElementById("searchBtn");
    const searchRoot = document.getElementById("search-root");
    const body = document.body;
    
    let searchOverlay = null;
    let closeBtn = null;
    let searchField = null;
    let searchInsideBtn = null;

    // Load the overlay HTML
    fetch('pages/search-overlay.html')
        .then(response => response.text())
        .then(html => {
            if (searchRoot) {
                searchRoot.innerHTML = html;
                
                // Get elements
                searchOverlay = document.getElementById("fullSearch");
                closeBtn = document.getElementById("arrowBtn");
                searchField = document.getElementById("searchField");
                searchInsideBtn = document.getElementById("insideSearchBtn");
                
                // Setup close functionality
                if (closeBtn) {
                    closeBtn.addEventListener("click", () => {
                        searchOverlay?.classList.remove("active");
                        body.style.overflow = "";
                    });
                }
                
                // Click outside to close
                if (searchOverlay) {
                    searchOverlay.addEventListener("click", (e) => {
                        if (e.target === searchOverlay) {
                            searchOverlay.classList.remove("active");
                            body.style.overflow = "";
                        }
                    });
                }
                
                // Search functionality
                const doSearch = () => {
                    const term = searchField?.value.trim();
                    if (term) {
                        alert(`Searching: ${term}`);
                        searchOverlay?.classList.remove("active");
                        body.style.overflow = "";
                        searchField.value = "";
                    } else {
                        alert("Enter a search term");
                    }
                };
                
                if (searchInsideBtn) {
                    searchInsideBtn.addEventListener("click", doSearch);
                }
                
                if (searchField) {
                    searchField.addEventListener("keypress", (e) => {
                        if (e.key === "Enter") doSearch();
                    });
                }
            }
        })
        .catch(error => console.error("Error:", error));

    // Open overlay
    searchBtn?.addEventListener("click", () => {
        if (searchOverlay) {
            searchOverlay.classList.add("active");
            body.style.overflow = "hidden";
            setTimeout(() => searchField?.focus(), 100);
        }
    });

    // ESC key
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && searchOverlay?.classList.contains("active")) {
            searchOverlay.classList.remove("active");
            body.style.overflow = "";
        }
    });
});