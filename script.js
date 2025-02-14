document.addEventListener("DOMContentLoaded", () => {
    const hearts = document.querySelectorAll(".heart");
    const typewriterText = document.getElementById("typewriter-text");
    const loveLetter = document.querySelector(".love-letter");
    const letterClick = document.getElementById("letter-click");
    const letterContent = document.getElementById("letter-content");
    let clickedHearts = new Set();
    let typingTimeout;
    
    // Hide the love letter initially with transition effect
    loveLetter.style.opacity = "0";
    loveLetter.style.transition = "opacity 1s ease-in-out";
    loveLetter.style.display = "none";

    // Add background music (only plays on interaction)
    const audio = new Audio("music.mp3"); // Make sure to add the music file in the same directory
    audio.loop = true;
    audio.volume = 0.5; // Set initial volume
    let isPlaying = false;

    // Play music on first heart click
    function playMusic() {
        if (!isPlaying) {
            audio.play().then(() => {
                isPlaying = true;
            }).catch(error => console.log("Audio play failed:", error));
        }
    }

    hearts.forEach(heart => {
        heart.style.transition = "transform 0.2s ease, filter 0.3s ease"; // Smooth click effect
        heart.style.filter = "grayscale(100%)"; // Start as greyed out
        
        heart.addEventListener("click", () => {
            playMusic(); // Start music on first interaction
            
            const text = heart.getAttribute("data-text");
            typewriterText.innerHTML = "";
            clearTimeout(typingTimeout); // Clear previous typing effect

            let index = 0;
            let speed = window.innerWidth < 768 ? 30 : 60; // Faster typing on mobile

            function type() {
                if (index < text.length) {
                    typewriterText.innerHTML = text.substring(0, index + 1);
                    index++;
                    typingTimeout = setTimeout(type, speed);
                }
            }

            type();

            // Mark this heart as clicked
            clickedHearts.add(heart);

            // Change heart back to normal color
            heart.style.filter = "grayscale(0%)";

            // Add subtle scaling effect on click
            heart.style.transform = "scale(1.1)";
            setTimeout(() => heart.style.transform = "scale(1)", 200);

            // Check if all hearts are clicked
            if (clickedHearts.size === hearts.length) {
                loveLetter.style.display = "block";
                setTimeout(() => loveLetter.style.opacity = "1", 100); // Smooth fade-in
            }
        });
    });
    // Hide letter content initially
    letterContent.style.display = "none";
    letterContent.style.width = `${window.innerWidth}px`; // Fit screen width
    letterContent.style.height = `${window.innerHeight}px`; // Fit screen height
    letterContent.style.justifyContent = "center";
    letterContent.style.alignItems = "center";

    letterClick.addEventListener("click", () => {
        letterContent.style.display = "flex"; // Show in full-screen mode
    });

    // Clicking anywhere outside the letter image hides the content
    letterContent.addEventListener("click", (e) => {
        if (e.target === letterContent) {
            letterContent.style.display = "none";
        }
    });

    // Adjust size on window resize
    window.addEventListener("resize", () => {
        letterContent.style.width = `${window.innerWidth}px`;
        letterContent.style.height = `${window.innerHeight}px`;
    });
});
