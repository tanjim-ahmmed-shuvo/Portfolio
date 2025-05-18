//=============BG-MAP=================
const codeSnippets = [
    `function init() {\n  let x = 0;\n  x += 1;\n  return x;\n}`,
    `console.log("Hello World");`,
    `if (data === true) {\n  render(data);\n}`,
    `for (let i = 0; i < 10; i++) {\n  console.log(i);\n}`,
    `const map = new Map();\nmap.set('key', 'value');`,
    `(() => {\n  const app = () => true;\n})();`
  ];
  
  const map = document.getElementById("map");
  
  // ✅ Clear existing content (if needed during refresh or re-render)
  map.innerHTML = "";
  
  // ✅ Adjusted coordinates for better spread & randomness
  const coords = Array.from({ length: 60 }, () => [
    Math.floor(Math.random() * 100),  // x
    Math.floor(Math.random() * 45)    // y
  ]);
  
  coords.forEach(([x, y]) => {
    const code = document.createElement("div");
    code.classList.add("code-glow");
    code.style.left = `${x}%`;  // Use % for responsiveness
    code.style.top = `${y}%`;   // Use % to fit inside banner
    code.innerText = codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
    map.appendChild(code);
  });
  
  // ✅ Optional: Smooth fade out on scroll
  window.addEventListener("scroll", () => {
    map.style.opacity = window.scrollY > 100 ? "0" : "0.6";
  });
  

// ============= CUSTOM CURSOR =============
const cursor = document.querySelector('.cursor');
const cursorTrailContainer = document.getElementById('cursor-trail-container');
const trailCount = 10;
const trailPositions = [];

// Create cursor trail elements
for (let i = 0; i < trailCount; i++) {
    const trail = document.createElement('div');
    trail.className = 'cursor-trail';
    trail.style.width = `${12 - i}px`;
    trail.style.height = `${12 - i}px`;
    trail.style.opacity = `${1 - i * 0.1}`;
    cursorTrailContainer.appendChild(trail);
    trailPositions.push({ x: 0, y: 0 });
}

const trailElements = document.querySelectorAll('.cursor-trail');

// Update cursor and trail positions
document.addEventListener('mousemove', (e) => {
    // Update main cursor
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;
    
    // Update trail positions array
    trailPositions.unshift({ x: e.clientX, y: e.clientY });
    trailPositions.pop();
    
    // Update trail elements
    trailElements.forEach((trail, index) => {
        if (trailPositions[index]) {
            trail.style.left = `${trailPositions[index].x}px`;
            trail.style.top = `${trailPositions[index].y}px`;
        }
    });
});

// Hide cursor when leaving window
document.addEventListener('mouseout', () => {
    cursor.style.opacity = '0';
    trailElements.forEach(trail => {
        trail.style.opacity = '0';
    });
});

// Show cursor when entering window
document.addEventListener('mouseover', () => {
    cursor.style.opacity = '1';
    trailElements.forEach((trail, index) => {
        trail.style.opacity = `${1 - index * 0.1}`;
    });
});



// ============= CIRCUIT PATTERN EFFECT =============
const circuitCanvas = document.getElementById('circuit-pattern');
const circuitCtx = circuitCanvas.getContext('2d');
let circuitTime = 0;
const circuits = [];

class CircuitNode {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

class CircuitConnection {
    constructor(start, end) {
        this.start = start;
        this.end = end;
        this.progress = Math.random(); // Random initial progress
        this.speed = 0.0005 + Math.random() * 0.001; // Speed of drawing
        this.width = 1 + Math.random() * 2; // Line thickness
        this.color = this.getRandomColor();
        this.direction = Math.random() > 0.5 ? 1 : -1; // Random direction
        this.pulsePosition = Math.random(); // Position of pulse on the line
        this.pulseSpeed = 0.001 + Math.random() * 0.003; // Speed of pulse
    }
    
    getRandomColor() {
        const colors = [
            '#FF1493', // Neon pink
            '#00FFFF', // Cyan
            '#39FF14', // Neon green
            '#BB00FF', // Purple
            '#FE53BB'  // Hot pink
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }
    
    update() {
        // Update circuit progress
        this.progress += this.speed * this.direction;
        
        // Reverse direction when reaching end
        if (this.progress >= 1 || this.progress <= 0) {
            this.direction *= -1;
        }
        
        // Update pulse position
        this.pulsePosition += this.pulseSpeed;
        if (this.pulsePosition > 1) {
            this.pulsePosition = 0;
        }
        
        // Occasionally change color or speed
        if (Math.random() < 0.0005) {
            if (Math.random() > 0.5) {
                this.speed = 0.0005 + Math.random() * 0.001;
            } else {
                this.color = this.getRandomColor();
            }
        }
    }
    
    draw(ctx) {
        const dx = this.end.x - this.start.x;
        const dy = this.end.y - this.start.y;
        
        // Draw circuit path
        ctx.beginPath();
        ctx.lineWidth = this.width;
        const baseAlpha = 0.4 + Math.sin(circuitTime * 0.01) * 0.1;
        ctx.strokeStyle = this.color.replace(')', `, ${baseAlpha})`).replace('rgb', 'rgba');
        
        // Add glow effect
        ctx.shadowColor = this.color;
        ctx.shadowBlur = 5;
        
        // Draw the line from start to current progress point
        ctx.moveTo(this.start.x, this.start.y);
        ctx.lineTo(
            this.start.x + dx * this.progress,
            this.start.y + dy * this.progress
        );
        ctx.stroke();
        
        // Draw pulse traveling along the circuit
        ctx.beginPath();
        ctx.arc(
            this.start.x + dx * this.pulsePosition,
            this.start.y + dy * this.pulsePosition,
            this.width * 2,
            0,
            Math.PI * 2
        );
        
        // Pulse glow
        ctx.fillStyle = this.color;
        ctx.shadowColor = this.color;
        ctx.shadowBlur = 15;
        ctx.fill();
        
        // Draw connection nodes
        ctx.beginPath();
        ctx.arc(this.start.x, this.start.y, 3, 0, Math.PI * 2);
        ctx.arc(this.end.x, this.end.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
        ctx.shadowColor = '#FFFFFF';
        ctx.shadowBlur = 5;
        ctx.fill();
        
        // Reset shadow
        ctx.shadowBlur = 0;
    }
}

function initCircuitPattern() {
    circuitCanvas.width = window.innerWidth;
    circuitCanvas.height = window.innerHeight;
    
    // Clear existing circuits
    circuits.length = 0;
    
    // Create nodes
    const nodeCount = 30;
    const nodes = [];
    
    for (let i = 0; i < nodeCount; i++) {
        nodes.push(new CircuitNode(
            Math.random() * circuitCanvas.width,
            Math.random() * circuitCanvas.height
        ));
    }
    
    // Connect nodes to form circuits
    nodes.forEach((node, i) => {
        // Calculate distances to other nodes
        const distances = nodes.map((other, j) => {
            if (i === j) return { index: j, distance: Infinity };
            
            const dx = node.x - other.x;
            const dy = node.y - other.y;
            
            return {
                index: j,
                distance: Math.sqrt(dx * dx + dy * dy)
            };
        }).sort((a, b) => a.distance - b.distance);
        
        // Connect to closest 1-3 nodes
        const connections = 1 + Math.floor(Math.random() * 3);
        for (let c = 0; c < connections && c < distances.length - 1; c++) {
            const targetIndex = distances[c].index;
            const target = nodes[targetIndex];
            
            // Only add if connection doesn't exist already
            const alreadyExists = circuits.some(
                circuit => 
                    (circuit.start.x === node.x && circuit.start.y === node.y && 
                     circuit.end.x === target.x && circuit.end.y === target.y) ||
                    (circuit.start.x === target.x && circuit.start.y === target.y && 
                     circuit.end.x === node.x && circuit.end.y === node.y)
            );
            
            if (!alreadyExists) {
                circuits.push(new CircuitConnection(node, target));
            }
        }
    });
}

function drawCircuitPattern() {
    // Clear canvas with subtle fade effect
    circuitCtx.fillStyle = 'rgba(10, 10, 10, 0.2)';
    circuitCtx.fillRect(0, 0, circuitCanvas.width, circuitCanvas.height);
    
    // Update and draw circuits
    circuits.forEach(circuit => {
        circuit.update();
        circuit.draw(circuitCtx);
    });
    
    // Update time
    circuitTime++;
    
    // Continue animation if this effect is active
    if (!circuitCanvas.classList.contains('hidden')) {
        requestAnimationFrame(drawCircuitPattern);
    }
}

// ============= BACKGROUND EFFECTS SWITCHER =============
const effectButtons = document.querySelectorAll('.effect-btn');
const effects = {
    'digital-rain': {
        canvas: digitalRainCanvas,
        init: initDigitalRain,
        draw: drawDigitalRain
    },
    'neon-grid': {
        canvas: neonGridCanvas,
        init: initNeonGrid,
        draw: drawNeonGrid
    },
    'circuit-pattern': {
        canvas: circuitCanvas,
        init: initCircuitPattern,
        draw: drawCircuitPattern
    }
};

// Auto-rotate effects
let activeEffect = 'digital-rain';
const AUTO_ROTATE_INTERVAL = 30000; // 30 seconds

function setActiveEffect(effectName) {
    // Hide all canvases
    Object.values(effects).forEach(effect => {
        effect.canvas.classList.add('hidden');
    });
    
    // Update active button styles
    effectButtons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.effect === effectName) {
            btn.classList.add('active');
        }
    });
    
    // Show and initialize selected effect
    activeEffect = effectName;
    effects[effectName].canvas.classList.remove('hidden');
    effects[effectName].init();
    effects[effectName].draw();
}

// Set up effect button listeners
effectButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        setActiveEffect(btn.dataset.effect);
    });
});

// Auto-rotate effects
setInterval(() => {
    let nextEffect;
    
    switch(activeEffect) {
        case 'digital-rain': nextEffect = 'neon-grid'; break;
        case 'neon-grid': nextEffect = 'circuit-pattern'; break;
        case 'circuit-pattern': nextEffect = 'digital-rain'; break;
        default: nextEffect = 'digital-rain';
    }
    
    setActiveEffect(nextEffect);
}, AUTO_ROTATE_INTERVAL);

// ============= MOBILE MENU TOGGLE =============
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// ============= GLITCH TEXT EFFECT =============
const glitchTexts = document.querySelectorAll('.glitch-text');

glitchTexts.forEach(text => {
    const content = text.textContent;
    text.setAttribute('data-text', content);
});

// ============= CONTACT FORM SUBMISSION =============
const contactForm = document.getElementById('contactForm');
const toast = document.getElementById('toast');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        };
        
        // In a real application, you would send this data to a server
        console.log('Form submitted:', formData);
        
        // Show success message
        showToast('Message sent successfully!');
        
        // Reset form
        contactForm.reset();
    });
}

function showToast(message) {
    // Set message
    document.querySelector('.toast-message').textContent = message;
    
    // Show toast
    toast.classList.add('show');
    
    // Hide toast after 5 seconds
    setTimeout(() => {
        toast.classList.remove('show');
    }, 5000);
}

// ============= INITIALIZATION =============
function init() {
    // Initialize default effect
    setActiveEffect('digital-rain');
    
    // Add scroll event for navbar
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.padding = '0.5rem 0';
            navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.5)';
        } else {
            navbar.style.padding = '1rem 0';
            navbar.style.boxShadow = 'none';
        }
    });
    
    // Handle window resize
    window.addEventListener('resize', () => {
        Object.values(effects).forEach(effect => {
            effect.init();
        });
    });
}

// Initialize on page load
window.addEventListener('load', init);