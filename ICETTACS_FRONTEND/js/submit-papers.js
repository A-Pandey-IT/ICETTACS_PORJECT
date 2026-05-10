// Submit Paper Page JavaScript
document.addEventListener("DOMContentLoaded", () => {
    
    // Get DOM elements
    const form = document.getElementById("submissionForm");
    const fileInput = document.getElementById("manuscript");
    const browseBtn = document.getElementById("browseBtn");
    const fileUploadArea = document.getElementById("fileUploadArea");
    const fileInfo = document.getElementById("fileInfo");
    const modal = document.getElementById("successModal");
    const modalCloseBtn = document.getElementById("modalCloseBtn");
    const paperIdDisplay = document.getElementById("paperIdDisplay");
    const resetBtn = form?.querySelector('button[type="reset"]');
    
    // File upload handling
    if (browseBtn) {
        browseBtn.addEventListener("click", () => {
            fileInput?.click();
        });
    }
    
    if (fileUploadArea) {
        fileUploadArea.addEventListener("click", (e) => {
            if (e.target !== browseBtn) {
                fileInput?.click();
            }
        });
        
        // Drag and drop
        fileUploadArea.addEventListener("dragover", (e) => {
            e.preventDefault();
            fileUploadArea.style.borderColor = "#0d6efd";
            fileUploadArea.style.background = "#f0f7ff";
        });
        
        fileUploadArea.addEventListener("dragleave", (e) => {
            e.preventDefault();
            fileUploadArea.style.borderColor = "#dee2e6";
            fileUploadArea.style.background = "#f8f9fa";
        });
        
        fileUploadArea.addEventListener("drop", (e) => {
            e.preventDefault();
            fileUploadArea.style.borderColor = "#dee2e6";
            fileUploadArea.style.background = "#f8f9fa";
            
            const files = e.dataTransfer.files;
            if (files.length > 0) {
                fileInput.files = files;
                handleFileSelect(files[0]);
            }
        });
    }
    
    if (fileInput) {
        fileInput.addEventListener("change", (e) => {
            if (e.target.files.length > 0) {
                handleFileSelect(e.target.files[0]);
            }
        });
    }
    
    function handleFileSelect(file) {
        // Validate file type
        if (file.type !== "application/pdf") {
            alert("Please upload a PDF file only.");
            fileInput.value = "";
            fileInfo.classList.remove("show");
            return;
        }
        
        // Validate file size (10MB max)
        if (file.size > 10 * 1024 * 1024) {
            alert("File size must be less than 10MB.");
            fileInput.value = "";
            fileInfo.classList.remove("show");
            return;
        }
        
        // Show file info
        if (fileInfo) {
            fileInfo.innerHTML = `<i class="fas fa-file-pdf"></i> ${file.name} (${(file.size / 1024 / 1024).toFixed(2)} MB)`;
            fileInfo.classList.add("show");
        }
    }
    
    // Form validation
    function validateForm() {
        const requiredFields = form.querySelectorAll("[required]");
        let isValid = true;
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                field.style.borderColor = "#dc3545";
                isValid = false;
            } else {
                field.style.borderColor = "#dee2e6";
            }
        });
        
        // Validate email
        const email = document.getElementById("email");
        if (email && email.value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email.value)) {
                alert("Please enter a valid email address");
                isValid = false;
            }
        }
        
        // Validate file upload
        if (fileInput && !fileInput.files.length) {
            alert("Please upload your manuscript file");
            isValid = false;
        }
        
        return isValid;
    }
    
    // Generate random Paper ID
    function generatePaperId() {
        const year = "2026";
        const random = Math.floor(Math.random() * 10000).toString().padStart(4, "0");
        return `ICETTACS-${year}-${random}`;
    }
    
    // Form submission
    if (form) {
        form.addEventListener("submit", async (e) => {
            e.preventDefault();
            
            if (!validateForm()) {
                alert("Please fill all required fields correctly.");
                return;
            }
            
            // Show loading state
            const submitBtn = document.getElementById("submitBtn");
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
            submitBtn.disabled = true;
            
            // Simulate API call (replace with actual submission)
            setTimeout(() => {
                // Generate Paper ID
                const paperId = generatePaperId();
                
                // Collect form data for console (for debugging)
                const formData = new FormData(form);
                console.log("Submission Data:");
                for (let [key, value] of formData.entries()) {
                    console.log(`${key}: ${value}`);
                }
                
                // Show success modal
                if (paperIdDisplay) {
                    paperIdDisplay.textContent = paperId;
                }
                if (modal) {
                    modal.classList.add("show");
                }
                
                // Reset form
                form.reset();
                if (fileInfo) {
                    fileInfo.classList.remove("show");
                }
                
                // Reset button
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                
                // You can also send data to server here
                // sendToServer(formData);
                
            }, 1500);
        });
        
        // Real-time validation clear on input
        const inputs = form.querySelectorAll("input, select, textarea");
        inputs.forEach(input => {
            input.addEventListener("input", () => {
                if (input.value.trim()) {
                    input.style.borderColor = "#dee2e6";
                }
            });
        });
    }
    
    // Reset form handler
    if (resetBtn) {
        resetBtn.addEventListener("click", () => {
            setTimeout(() => {
                if (fileInfo) {
                    fileInfo.classList.remove("show");
                }
            }, 100);
        });
    }
    
    // Modal close
    if (modalCloseBtn) {
        modalCloseBtn.addEventListener("click", () => {
            modal.classList.remove("show");
        });
    }
    
    // Close modal when clicking outside
    if (modal) {
        modal.addEventListener("click", (e) => {
            if (e.target === modal) {
                modal.classList.remove("show");
            }
        });
    }
    
    // Terms and conditions link
    const termsLink = document.getElementById("termsLink");
    if (termsLink) {
        termsLink.addEventListener("click", (e) => {
            e.preventDefault();
            showTermsModal();
        });
    }
    
    function showTermsModal() {
        alert("Terms and Conditions:\n\n1. The paper must be original and unpublished.\n2. All authors must approve the submission.\n3. The conference has the right to reject non-compliant papers.\n4. At least one author must register for the conference.\n5. The paper will be checked for plagiarism.");
    }
    
    // Character counter for abstract
    const abstractField = document.getElementById("abstract");
    if (abstractField) {
        const counter = document.createElement("small");
        counter.style.textAlign = "right";
        counter.style.display = "block";
        counter.style.marginTop = "0.25rem";
        abstractField.parentNode.appendChild(counter);
        
        function updateCounter() {
            const length = abstractField.value.length;
            counter.textContent = `${length}/250 words (approx)`;
            if (length > 1500) {
                counter.style.color = "#dc3545";
            } else {
                counter.style.color = "#6c757d";
            }
        }
        
        abstractField.addEventListener("input", updateCounter);
        updateCounter();
    }
});