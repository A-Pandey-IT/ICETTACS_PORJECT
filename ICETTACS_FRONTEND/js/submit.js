// Login Overlay - Simplified Version
document.addEventListener("DOMContentLoaded", () => {
    
    const loginOverlay = document.getElementById("loginOverlay");
    const closeBtn = document.getElementById("loginCloseBtn");
    const closeBackdrop = document.getElementById("loginClose");
    const loginForm = document.getElementById("loginForm");
    const body = document.body;

    // Auto-open on peer-review page
    if (window.location.pathname.includes('peer-review.html')) {
        setTimeout(() => {
            if (loginOverlay) {
                loginOverlay.style.opacity = "1";
                loginOverlay.style.visibility = "visible";
                body.style.overflow = "hidden";
            }
        }, 500);
    }

    // Close function
    const closeOverlay = () => {
        if (loginOverlay) {
            loginOverlay.style.opacity = "0";
            loginOverlay.style.visibility = "hidden";
            body.style.overflow = "";
            if (loginForm) loginForm.reset();
        }
    };

    // Close on X button
    if (closeBtn) closeBtn.addEventListener("click", closeOverlay);
    
    // Close on backdrop click
    if (closeBackdrop) closeBackdrop.addEventListener("click", closeOverlay);
    
    // Close on ESC
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && loginOverlay?.style.visibility === "visible") {
            closeOverlay();
        }
    });

    // Handle login
    if (loginForm) {
        loginForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const email = loginForm.querySelector('input[type="email"]').value;
            const password = loginForm.querySelector('input[type="password"]').value;
            
            if (!email || !password) {
                alert("Please enter email and password");
                return;
            }
            
            console.log("Login:", { email, password });
            alert("Login successful! Redirecting to submission portal...");
            closeOverlay();
            
            // Redirect to CMT (uncomment in production)
            // window.location.href = "https://cmt3.research.microsoft.com/";
        });
    }
});