document.addEventListener("DOMContentLoaded", () => {
    const hearts = document.querySelectorAll(".heart");
    const typewriterText = document.getElementById("typewriter-text");

    hearts.forEach(heart => {
        heart.addEventListener("click", () => {
            const text = heart.getAttribute("data-text");
            typewriterText.innerHTML = ""; // Clear text before new typing starts
            typewriterText.style.width = "auto"; // Ensure it's not stuck at 0

            let index = 0;
            function type() {
                if (index < text.length) {
                    typewriterText.innerHTML += text.charAt(index);
                    index++;
                    setTimeout(type, 100); // Typing speed
                }
            }

            type();
        });
    });
});
