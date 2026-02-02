// Get button elements
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const response = document.getElementById('response');

// Track how many times "No" is clicked
let noClickCount = 0;

// Messages for when "No" is clicked (gets more desperate each time!)
const noMessages = [
    "Na pewno? 🥺",
    "Naprawdę? ",
    "Ej",
    "🙏",
    "Zepsułaś'Nie', spróbuj 'Tak'! 😉"
];

// Handle "Yes" button click
yesBtn.addEventListener('click', function() {
    // Hide buttons
    document.querySelector('.buttons').style.display = 'none';
    
    // Show success message
    response.classList.remove('hidden');
    response.classList.add('success');
    response.innerHTML = `
        <h2>Hell yeah! 🎉💕</h2>
        <p>Kocham Cię ❤️</p>
        <p style="margin-top: 15px; font-size: 0.9em;">Kocham Cię bardzo! 💖</p>
    `;
    
    // Create heart explosion effect
    createHeartExplosion();
    
    // Change background
    document.body.style.background = 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 50%, #ffecd2 100%)';
});

// Handle "No" button click
noBtn.addEventListener('click', function() {
    if (noClickCount < noMessages.length) {
        // Show message
        response.classList.remove('hidden');
        response.classList.remove('success');
        response.style.background = '#fff3cd';
        response.style.color = '#856404';
        response.innerHTML = `<p>${noMessages[noClickCount]}</p>`;
        
        // Make "Yes" button bigger and "No" button smaller
        const yesCurrentSize = parseFloat(window.getComputedStyle(yesBtn).fontSize);
        yesBtn.style.fontSize = (yesCurrentSize * 1.1) + 'px';
        
        const noCurrentSize = parseFloat(window.getComputedStyle(noBtn).fontSize);
        noBtn.style.fontSize = (noCurrentSize * 0.9) + 'px';
        
        // Move the No button to a random position (optional fun feature)
        if (noClickCount >= 2) {
            const btnContainer = document.querySelector('.buttons');
            const containerRect = btnContainer.getBoundingClientRect();
            
            noBtn.style.position = 'absolute';
            noBtn.style.left = Math.random() * (containerRect.width - 100) + 'px';
            noBtn.style.top = Math.random() * 50 + 'px';
        }
        
        noClickCount++;
    } else {
        // After all messages, force a "Yes"!
        response.innerHTML = `<p>Dobra, mi się nie odmawia 😏</p>`;
        setTimeout(() => {
            yesBtn.click();
        }, 1500);
    }
});

// Create heart explosion effect
function createHeartExplosion() {
    const colors = ['❤️', '💕', '💖', '💗', '💝', '💘'];
    
    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.innerHTML = colors[Math.floor(Math.random() * colors.length)];
            heart.style.position = 'fixed';
            heart.style.left = '50%';
            heart.style.top = '50%';
            heart.style.fontSize = Math.random() * 30 + 20 + 'px';
            heart.style.pointerEvents = 'none';
            heart.style.zIndex = '9999';
            
            document.body.appendChild(heart);
            
            // Animate the heart
            const angle = Math.random() * Math.PI * 2;
            const velocity = Math.random() * 200 + 100;
            const tx = Math.cos(angle) * velocity;
            const ty = Math.sin(angle) * velocity;
            
            heart.animate([
                { 
                    transform: 'translate(-50%, -50%) scale(0)',
                    opacity: 1 
                },
                { 
                    transform: `translate(calc(-50% + ${tx}px), calc(-50% + ${ty}px)) scale(1)`,
                    opacity: 0 
                }
            ], {
                duration: 2000,
                easing: 'cubic-bezier(0, .9, .57, 1)'
            });
            
            // Remove heart after animation
            setTimeout(() => heart.remove(), 2000);
        }, i * 50);
    }
}