// Speakers Page - Coming Soon Modal
document.addEventListener("DOMContentLoaded", () => {
    
    // Get DOM elements
    const overlay = document.getElementById("comingSoonOverlay");
    const closeBtn = document.getElementById("closeBtn");
    const modalCloseBtn = document.getElementById("closeModalBtn");
    const notifyForm = document.getElementById("notifyForm");
    
    // Modal automatically shows (no need to open, it's already visible)
    // Add animation class for entrance
    if (overlay) {
        overlay.style.animation = "fadeIn 0.5s ease";
    }
    
    // Function to close modal and redirect or close
    const closeModal = () => {
        if (overlay) {
            overlay.style.animation = "fadeOut 0.3s ease";
            setTimeout(() => {
                // Option 1: Redirect back to home
                window.location.href = "../index.html";
                
                // Option 2: Just close the modal (if you want to stay on page)
                // overlay.style.display = "none";
            }, 300);
        }
    };
    
    // Close button click
    if (closeBtn) {
        closeBtn.addEventListener("click", closeModal);
    }
    
    if (modalCloseBtn) {
        modalCloseBtn.addEventListener("click", closeModal);
    }
    
    // Close on Escape key
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            closeModal();
        }
    });
    
    // Close when clicking outside modal content
    if (overlay) {
        overlay.addEventListener("click", (e) => {
            if (e.target === overlay || e.target.classList.contains("overlay-backdrop")) {
                closeModal();
            }
        });
    }
    
    // Handle notification form submission
    if (notifyForm) {
        notifyForm.addEventListener("submit", (e) => {
            e.preventDefault();
            
            const emailInput = notifyForm.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (!email) {
                showMessage(notifyForm, "Please enter your email address", "error");
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showMessage(notifyForm, "Please enter a valid email address", "error");
                return;
            }
            
            // Simulate saving to database
            console.log("Email saved for notification:", email);
            
            // Show success message
            showMessage(notifyForm, "Thank you! We'll notify you when speakers are announced.", "success");
            
            // Clear input
            emailInput.value = "";
            
            // You can also send this to your backend
            // fetch('/api/notify-speakers', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify({ email: email })
            // });
        });
    }
    
    // Helper function to show messages
    function showMessage(form, message, type) {
        // Remove existing message
        const existingMsg = form.parentNode.querySelector(".success-message, .error-message");
        if (existingMsg) {
            existingMsg.remove();
        }
        
        // Create message element
        const msgDiv = document.createElement("div");
        msgDiv.className = type === "success" ? "success-message" : "error-message";
        
        const icon = type === "success" ? '<i class="fas fa-check-circle"></i>' : '<i class="fas fa-exclamation-circle"></i>';
        msgDiv.innerHTML = `${icon} ${message}`;
        
        // Style error message
        if (type === "error") {
            msgDiv.style.background = "#f8d7da";
            msgDiv.style.color = "#721c24";
        }
        
        // Insert after form
        form.parentNode.appendChild(msgDiv);
        
        // Auto remove after 3 seconds
        setTimeout(() => {
            msgDiv.remove();
        }, 3000);
    }
});

// Add CSS animations to document head
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
    
    @keyframes fadeOut {
        from {
            opacity: 1;
        }
        to {
            opacity: 0;
        }
    }
    
    .error-message {
        background: #f8d7da;
        color: #721c24;
        padding: 10px;
        border-radius: 8px;
        margin-top: 10px;
        font-size: 0.85rem;
        display: flex;
        align-items: center;
        gap: 8px;
        justify-content: center;
    }
    
    .error-message i {
        color: #dc3545;
        font-size: 1rem;
    }
`;
document.head.appendChild(style);