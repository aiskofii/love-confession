document.addEventListener("DOMContentLoaded", () => {
    const hearts = document.querySelectorAll(".heart");
    const typewriterText = document.getElementById("typewriter-text");

    hearts.forEach(heart => {
        heart.addEventListener("click", () => {
            const text = heart.getAttribute("data-text");
            typewriterText.innerHTML = ""; 

            let index = 0;
            let speed = window.innerWidth < 768 ? 50 : 100; // Faster typing on mobile

            function type() {
                if (index < text.length) {
                    typewriterText.innerHTML += text.charAt(index);
                    index++;
                    setTimeout(type, speed);
                }
            }

            type();
        });
    });
});
