// Mobile Navigation - Simple & Clean
document.addEventListener("DOMContentLoaded", () => {
    
    const menuBtn = document.getElementById("menuBtn");
    const closeBtn = document.getElementById("closeMenuBtn");
    const mobileNav = document.querySelector(".mobile-nav");
    const mobileMenu = document.querySelector(".mobile-nav-menu");
    const body = document.body;

    // Open
    menuBtn?.addEventListener("click", () => {
        mobileNav?.classList.add("active");
        mobileMenu?.classList.add("active");
        body.style.overflow = "hidden";
    });

    // Close function
    const closeNav = () => {
        mobileNav?.classList.remove("active");
        mobileMenu?.classList.remove("active");
        body.style.overflow = "";
    };

    // Close on cross button
    closeBtn?.addEventListener("click", closeNav);

    // Close on outside click
    mobileNav?.addEventListener("click", (e) => {
        if (e.target === mobileNav) closeNav();
    });

    // Close on resize above 1024px
    window.addEventListener("resize", () => {
        if (window.innerWidth > 1024) closeNav();
    });

    // Close on ESC key
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && mobileNav?.classList.contains("active")) closeNav();
    });
});