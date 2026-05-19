// Countdown Timer for ICCETACS 2026
(function() {
    // Wait for DOM to be ready
    function initCountdown() {
        // Get elements
        const daysElement = document.getElementById('days');
        const hoursElement = document.getElementById('hours');
        const minutesElement = document.getElementById('minutes');
        const secondsElement = document.getElementById('seconds');
        
        // Check if elements exist
        if (!daysElement || !hoursElement || !minutesElement || !secondsElement) {
            console.log('Countdown elements not found, retrying...');
            setTimeout(initCountdown, 500);
            return;
        }
        
        console.log('Countdown timer initialized');
        
        // Set conference date: July 9, 2026 at 9:00 AM IST
        const conferenceDate = new Date(2026, 6, 9, 9, 0, 0); // Month is 0-indexed (6 = July)
        
        function updateCountdown() {
            const now = new Date();
            const distance = conferenceDate - now;
            
            if (distance < 0) {
                daysElement.textContent = '00';
                hoursElement.textContent = '00';
                minutesElement.textContent = '00';
                secondsElement.textContent = '00';
                return;
            }
            
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            
            daysElement.textContent = String(days).padStart(2, '0');
            hoursElement.textContent = String(hours).padStart(2, '0');
            minutesElement.textContent = String(minutes).padStart(2, '0');
            secondsElement.textContent = String(seconds).padStart(2, '0');
        }
        
        // Update immediately
        updateCountdown();
        
        // Update every second
        setInterval(updateCountdown, 1000);
    }
    
    // Start when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initCountdown);
    } else {
        initCountdown();
    }
})();