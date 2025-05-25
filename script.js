//=============BG-MAP=================
const codeSnippets = [
    `function init() {\n  let x = 0;\n  x += 1;\n  return x;\n}`,
    `console.log("Hello World");`,
    `if (data === true) {\n  render(data);\n}`,
    `for (let i = 0; i < 10; i++) {\n  console.log(i);\n}`,
    `const map = new Map();\nmap.set('key', 'value');`,
    `(() => {\n  const app = () => true;\n})();`
  ];
  
  const mapElement = document.getElementById("map");
  
  if (mapElement) {
    mapElement.innerHTML = "";
    const coords = Array.from({ length: 60 }, () => [
      Math.floor(Math.random() * 100),
      Math.floor(Math.random() * 45)
    ]);
    coords.forEach(([x, y]) => {
      const code = document.createElement("div");
      code.classList.add("code-glow");
      code.style.left = `${x}%`;
      code.style.top = `${y}%`;
      code.innerText = codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
      mapElement.appendChild(code);
    });
    window.addEventListener("scroll", () => {
      if (mapElement) {
        mapElement.style.opacity = window.scrollY > 100 ? "0" : "0.6";
      }
    });
  }
  
// ============= CUSTOM CURSOR =============
if (!('ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0)) {
    document.body.style.cursor = 'none'; 
    const cursor = document.querySelector('.cursor');
    const cursorTrailContainer = document.getElementById('cursor-trail-container');
    if (cursor && cursorTrailContainer) {
        const trailCount = 10;
        const trailPositions = [];
        const trailElements = [];
        for (let i = 0; i < trailCount; i++) {
            const trail = document.createElement('div');
            trail.className = 'cursor-trail';
            trail.style.width = `${12 - i}px`;
            trail.style.height = `${12 - i}px`;
            trail.style.opacity = `${1 - i * 0.1}`;
            cursorTrailContainer.appendChild(trail);
            trailPositions.push({ x: 0, y: 0 });
            trailElements.push(trail);
        }
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = `${e.clientX}px`;
            cursor.style.top = `${e.clientY}px`;
            trailPositions.unshift({ x: e.clientX, y: e.clientY });
            if (trailPositions.length > trailCount) {
                trailPositions.pop();
            }
            trailElements.forEach((trail, index) => {
                if (trailPositions[index]) {
                    trail.style.left = `${trailPositions[index].x}px`;
                    trail.style.top = `${trailPositions[index].y}px`;
                }
            });
        });
        document.addEventListener('mouseout', () => {
            cursor.style.opacity = '0';
            trailElements.forEach(trail => {
                trail.style.opacity = '0';
            });
        });
        document.addEventListener('mouseover', () => {
            cursor.style.opacity = '1';
            trailElements.forEach((trail, index) => {
                trail.style.opacity = `${1 - index * 0.1}`;
            });
        });
    }
} else {
    document.body.style.cursor = 'auto';
    const cursorElement = document.querySelector('.cursor');
    const trailContainer = document.getElementById('cursor-trail-container');
    if (cursorElement) cursorElement.style.display = 'none';
    if (trailContainer) trailContainer.style.display = 'none';
}

// ============= BACKGROUND EFFECTS (Digital Rain, Neon Grid) =============
const digitalRainCanvas = document.getElementById('digital-rain-canvas');
let digitalRainCtx;
if (digitalRainCanvas) digitalRainCtx = digitalRainCanvas.getContext('2d');

function initDigitalRain() {
    if (!digitalRainCtx) return;
    digitalRainCanvas.width = window.innerWidth;
    digitalRainCanvas.height = window.innerHeight;
}
function drawDigitalRain() {
    if (!digitalRainCtx || digitalRainCanvas.classList.contains('hidden')) return;
    // Implement actual Digital Rain drawing logic here
    // requestAnimationFrame(drawDigitalRain); 
}

const neonGridCanvas = document.getElementById('neon-grid-canvas');
let neonGridCtx;
if (neonGridCanvas) neonGridCtx = neonGridCanvas.getContext('2d');

function initNeonGrid() {
    if(!neonGridCtx) return;
    neonGridCanvas.width = window.innerWidth;
    neonGridCanvas.height = window.innerHeight;
}
function drawNeonGrid() {
    if(!neonGridCtx || neonGridCanvas.classList.contains('hidden')) return;
    // Implement actual Neon Grid drawing logic here
    // requestAnimationFrame(drawNeonGrid); 
}

const effects = {
    'digital-rain': { canvas: digitalRainCanvas, init: initDigitalRain, draw: drawDigitalRain },
    'neon-grid': { canvas: neonGridCanvas, init: initNeonGrid, draw: drawNeonGrid },
};

let activeEffectName = 'digital-rain'; 

function setActiveEffect(effectName) {
    Object.values(effects).forEach(effect => {
        if (effect.canvas) effect.canvas.classList.add('hidden');
    });
    
    if (effects[effectName] && effects[effectName].canvas) {
        activeEffectName = effectName;
        effects[effectName].canvas.classList.remove('hidden');
        if (typeof effects[effectName].init === 'function') effects[effectName].init();
        if (typeof effects[effectName].draw === 'function') effects[effectName].draw(); 
    }
}

// ============= MOBILE MENU TOGGLE =============
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });
    });
}

// ============= CONTACT FORM SUBMISSION =============
const contactForm = document.getElementById('contactForm');
const toast = document.getElementById('toast');

if (contactForm && toast) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // const formData = { // You can use this if you implement actual form submission
        //     name: document.getElementById('name').value,
        //     email: document.getElementById('email').value,
        //     subject: document.getElementById('subject').value,
        //     message: document.getElementById('message').value
        // };
        showToast('Message sent successfully!');
        contactForm.reset();
    });
}

function showToast(message) {
    if (!toast) return;
    const toastMessageElement = toast.querySelector('.toast-message');
    if (toastMessageElement) toastMessageElement.textContent = message;
    toast.classList.add('show');
    const progressElement = toast.querySelector('.toast-progress');
    if (progressElement) {
        progressElement.style.animation = 'none';
        progressElement.offsetHeight; 
        progressElement.style.animation = null; 
    }
    setTimeout(() => {
        toast.classList.remove('show');
    }, 5000);
}

// ============= INITIALIZATION =============
function initPage() {
    if (digitalRainCanvas) {
        setActiveEffect('digital-rain');
    } else if (neonGridCanvas) {
        setActiveEffect('neon-grid');
    }
    
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.style.padding = '0.5rem 0';
                navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.5)';
            } else {
                navbar.style.padding = '1rem 0';
                navbar.style.boxShadow = 'none';
            }
        });
    }
    
    window.addEventListener('resize', () => {
        if (effects[activeEffectName] && typeof effects[activeEffectName].init === 'function' && effects[activeEffectName].canvas) {
             if (!effects[activeEffectName].canvas.classList.contains('hidden')) {
                effects[activeEffectName].init();
                effects[activeEffectName].draw(); 
             }
        }
    });
}

window.addEventListener('load', initPage);