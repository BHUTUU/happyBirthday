// Create confetti particles
function createConfetti() {
    const colors = ['#ff69b4', '#87CEEB', '#98FB98', '#DDA0DD', '#FFD700'];
    const confettiCount = 100;
    const confettiContainer = document.querySelector('.confetti');

    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'absolute';
        confetti.style.width = Math.random() * 10 + 5 + 'px';
        confetti.style.height = Math.random() * 10 + 5 + 'px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.top = -20 + 'px';
        confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
        confetti.style.opacity = Math.random();
        confetti.style.animation = `fall ${Math.random() * 3 + 2}s linear infinite`;
        
        confettiContainer.appendChild(confetti);
    }
}

// Add falling animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fall {
        0% { transform: translateY(-20px) rotate(0deg); }
        100% { transform: translateY(100vh) rotate(360deg); }
    }
`;
document.head.appendChild(style);

// Initialize confetti
createConfetti();

// Add interactive hover effects
document.querySelector('.birthday-card').addEventListener('mousemove', (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const angleX = (y - centerY) / 30;
    const angleY = (centerX - x) / 30;
    
    card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg)`;
});

document.querySelector('.birthday-card').addEventListener('mouseleave', (e) => {
    e.currentTarget.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
});

// Add click effect on the cake
document.querySelector('.cake').addEventListener('click', () => {
    const flame = document.querySelector('.flame');
    flame.style.animation = 'none';
    setTimeout(() => {
        flame.style.animation = 'flicker 1s ease-in-out infinite';
    }, 50);
    
    // Create additional confetti burst
    createConfetti();
}); 