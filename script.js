function initializeWebsite() {

    // 1. SCROLL REVEAL ANIMATION
    function initScrollReveal() {
        const reveals = document.querySelectorAll('.reveal');

        const revealOnScroll = () => {
            const windowHeight = window.innerHeight;
            const elementVisible = 150;

            reveals.forEach((reveal) => {
                const elementTop = reveal.getBoundingClientRect().top;
                if (elementTop < windowHeight - elementVisible) {
                    reveal.classList.add('active');
                }
            });
        };

        window.addEventListener('scroll', revealOnScroll);
        // Trigger once on load
        revealOnScroll();
    }

    // 2. 3D TILT EFFECT
    function initTiltEffect() {
        const tiltCards = document.querySelectorAll('.tilt-card');

        tiltCards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                // Calculate rotation based on cursor position
                // Max tilt: 15 degrees
                const xCenter = rect.width / 2;
                const yCenter = rect.height / 2;
                
                // Rotate Y based on X axis (left/right tilt)
                const rotateY = ((x - xCenter) / xCenter) * 15;
                
                // Rotate X based on Y axis (up/down tilt - inverted)
                const rotateX = -((y - yCenter) / yCenter) * 15;

                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
            });

            card.addEventListener('mouseleave', () => {
                // Reset transform
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
            });
        });
    }

    // 3. UI SOUND EFFECTS (Web Audio API)
    function initSoundEffects() {
        // Create audio context but wait for interaction to resume it
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        const audioCtx = new AudioContext();

        // Simple beep generator
        const playTone = (freq = 600, type = 'sine', duration = 0.1) => {
            if (audioCtx.state === 'suspended') {
                audioCtx.resume();
            }
            
            const oscillator = audioCtx.createOscillator();
            const gainNode = audioCtx.createGain();

            oscillator.type = type;
            oscillator.frequency.setValueAtTime(freq, audioCtx.currentTime); // Frequency in Hz
            
            gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime); // Volume (0.1 is subtle)
            gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);

            oscillator.connect(gainNode);
            gainNode.connect(audioCtx.destination);

            oscillator.start();
            oscillator.stop(audioCtx.currentTime + duration);
        };

        // Hover Sounds (High pitch, short beep)
        const hoverElements = document.querySelectorAll('.sound-hover, a, button, .glassmorphic-card');
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                playTone(800, 'sine', 0.1); // Sci-fi high beep
            });
        });

        // Click Sounds (Low pitch, mechanical click)
        const clickElements = document.querySelectorAll('.sound-click, a, button');
        clickElements.forEach(el => {
            el.addEventListener('click', () => {
                playTone(400, 'square', 0.15); // Mechanical click
            });
        });
    }

    // 4. HACKING TYPING EFFECT
    function initHackingTyping() {
        const textElements = document.querySelectorAll('.typewriter-text');

        // Observer to start typing when element is in view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    // Only type if not already typed
                    if (!element.classList.contains('typed')) {
                        const textToType = element.getAttribute('data-text');
                        element.textContent = ''; // Clear initial text
                        element.classList.add('typed');
                        typeText(element, textToType);
                    }
                }
            });
        }, { threshold: 0.5 }); // Trigger when 50% visible

        textElements.forEach(el => {
            // Initially clear text to be safe
            el.textContent = ''; 
            observer.observe(el);
        });

        function typeText(element, text) {
            let index = 0;
            // Typing speed: randomized for realism
            function typeChar() {
                if (index < text.length) {
                    element.textContent += text.charAt(index);
                    index++;
                    setTimeout(typeChar, Math.random() * 30 + 10); // Random delay between 10ms and 40ms
                }
            }
            typeChar();
        }
    }


    /* ==========================================
       EXISTING FUNCTIONS (Kept for compatibility)
       ========================================== */

    function initMapEffect() { 
        const mapElement = document.getElementById('map'); 
        if (!mapElement) return; 

        const codeSnippets = [ 
            `function init() {\n  let x = 0;\n  x += 1;\n  return x;\n}`, 
            `console.log("Hello World");`, 
            `if (data === true) {\n  render(data);\n}`, 
            `for (let i = 0; i < 10; i++) {\n  console.log(i);\n}`, 
            `const map = new Map();\nmap.set('key', 'value');`, 
            `(() => {\n  const app = () => true;\n})();` 
        ];

        mapElement.innerHTML = ''; 
        const numberOfSnippets = 60; 

        for (let i = 0; i < numberOfSnippets; i++) { 
            const codeGlow = document.createElement('div'); 
            codeGlow.className = 'code-glow'; 
            codeGlow.style.left = `${Math.floor(Math.random() * 100)}%`; 
            codeGlow.style.top = `${Math.floor(Math.random() * 60)}%`; 
            codeGlow.innerText = codeSnippets[Math.floor(Math.random() * codeSnippets.length)]; 
            mapElement.appendChild(codeGlow); 
        }

        window.addEventListener('scroll', () => { 
            if (mapElement) { 
                mapElement.style.opacity = (window.scrollY > 100) ? '0' : '0.6'; 
            }
        });
    }

    function applyDecryptionEffect() { 
        const target = document.querySelector('h1.hero-name'); 
        if (!target) return; 

        const verifiedBadgeImg = target.querySelector('.verified-badge-img'); 
        const imgHTML = verifiedBadgeImg ? verifiedBadgeImg.outerHTML : ''; 
        if (verifiedBadgeImg) verifiedBadgeImg.remove(); 

        const originalText = target.innerText.trim(); 
        target.innerText = ''; 

        const scrambleChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"; 
        let interval = null; 
        let iteration = 0; 

        clearInterval(interval); 

        interval = setInterval(() => { 
            target.innerText = originalText.split("").map((letter, index) => { 
                if (index < iteration) return originalText[index]; 
                if (letter === ' ') return ' '; 
                return scrambleChars[Math.floor(Math.random() * scrambleChars.length)]; 
            }).join(""); 

            if (iteration >= originalText.length) { 
                clearInterval(interval); 
                target.innerText = originalText; 

                if (imgHTML) { 
                    target.innerHTML = originalText + ' ' + imgHTML; 
                    const newBadge = target.querySelector('.verified-badge-img'); 
                    if (newBadge) { 
                        setTimeout(() => { 
                            newBadge.classList.add('is-visible'); 
                        }, 200); 
                    }
                }
            }
            iteration += 1 / 2; 
        }, 60); 
    }

    function initializePixelEffect() { 
        class Pixel { 
            constructor(canvas, context, x, y, color, speed, delay) { 
                this.canvas = canvas; this.ctx = context; this.x = x; this.y = y; this.color = color; 
                this.speed = (Math.random() * 0.8 + 0.1) * speed; 
                this.size = 0; this.sizeStep = Math.random() * 0.4; this.minSize = 0.5; this.maxSizeInteger = 2; 
                this.maxSize = Math.random() * (this.maxSizeInteger - this.minSize) + this.minSize; 
                this.delay = delay; this.counter = 0; this.counterStep = Math.random() * 4 + (this.canvas.width + this.canvas.height) * 0.01; 
                this.isIdle = true; this.isReverse = false; this.isShimmering = false; 
            }
            draw() { 
                const centerOffset = this.maxSizeInteger * 0.5 - this.size * 0.5; 
                this.ctx.fillStyle = this.color; 
                this.ctx.fillRect(this.x + centerOffset, this.y + centerOffset, this.size, this.size); 
            }
            appear() { 
                this.isIdle = false; if (this.counter <= this.delay) { this.counter += this.counterStep; return; } 
                if (this.size >= this.maxSize) this.isShimmering = true; 
                this.isShimmering ? this.shimmer() : (this.size += this.sizeStep); 
                this.draw(); 
            }
            disappear() { 
                this.isShimmering = false; this.counter = 0; 
                if (this.size <= 0) { this.isIdle = true; this.size = 0; return; } 
                this.size -= 0.1; this.draw(); 
            }
            shimmer() { 
                if (this.size >= this.maxSize) this.isReverse = true; else if (this.size <= this.minSize) this.isReverse = false; 
                this.size += this.isReverse ? -this.speed : this.speed; 
            }
        }

        const container = document.querySelector('.profile-circle-container'); 
        const canvas = document.getElementById('pixel-effect-canvas'); 
        if (!container || !canvas) return; 

        const ctx = canvas.getContext('2d'); 
        const config = { gap: 6, speed: 0.08, colors: "#fecdd3,#fda4af,#e11d48" }; 
        let pixels = []; 
        let animationFrameId = null; 

        const initPixels = () => { 
            const rect = container.getBoundingClientRect(); 
            canvas.width = Math.floor(rect.width); canvas.height = Math.floor(rect.height); 
            const colorsArray = config.colors.split(","); 
            pixels = []; 
            for (let x = 0; x < canvas.width; x += config.gap) { 
                for (let y = 0; y < canvas.height; y += config.gap) { 
                    const color = colorsArray[Math.floor(Math.random() * colorsArray.length)]; 
                    const distance = Math.sqrt(Math.pow(x - canvas.width / 2, 2) + Math.pow(y - canvas.height / 2, 2)); 
                    pixels.push(new Pixel(canvas, ctx, x, y, color, config.speed, distance)); 
                }
            }
        };

        const animate = (action) => { 
            ctx.clearRect(0, 0, canvas.width, canvas.height); 
            let allIdle = true; 
            pixels.forEach(pixel => { pixel[action](); if (!pixel.isIdle) allIdle = false; }); 
            if (allIdle) { 
                cancelAnimationFrame(animationFrameId); animationFrameId = null; 
                if (action === 'disappear') ctx.clearRect(0, 0, canvas.width, canvas.height); 
            } else { 
                animationFrameId = requestAnimationFrame(() => animate(action)); 
            }
        };

        container.addEventListener('mouseenter', () => { cancelAnimationFrame(animationFrameId); initPixels(); animate('appear'); }); 
        container.addEventListener('mouseleave', () => { cancelAnimationFrame(animationFrameId); animate('disappear'); }); 
        new ResizeObserver(initPixels).observe(container); 
        initPixels(); 
    }

    function initInteractiveElements() { 
        const menuToggle = document.querySelector('.menu-toggle'); 
        const navLinks = document.querySelector('.nav-links'); 

        if (menuToggle && navLinks) { 
            menuToggle.addEventListener('click', () => { 
                menuToggle.classList.toggle('active'); 
                navLinks.classList.toggle('active'); 
            });
            navLinks.querySelectorAll('a').forEach(link => { 
                link.addEventListener('click', () => { 
                    menuToggle.classList.remove('active'); 
                    navLinks.classList.remove('active'); 
                });
            });
        }

        const navbar = document.querySelector('.navbar'); 
        if(navbar){ 
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
    }

    function initContactForm(){ 
        const contactForm = document.getElementById('contactForm'); 
        const toast = document.getElementById('toast'); 

        if(contactForm && toast){ 
            contactForm.addEventListener('submit', (e) => { 
                e.preventDefault(); 
                const toastMessage = toast.querySelector('.toast-message'); 
                if(toastMessage) toastMessage.textContent = 'Message sent successfully!'; 
                toast.classList.add('show'); 

                const progress = toast.querySelector('.toast-progress'); 
                if(progress) { 
                    progress.style.animation = 'none'; 
                    void progress.offsetWidth; 
                    progress.style.animation = 'toast-progress-anim 5s linear forwards'; 
                }
                setTimeout(() => { toast.classList.remove('show'); }, 5000); 
                contactForm.reset(); 
            });
        }
    }

    // New function for Dragon Cursor Effect
    // New function for Dragon Cursor Effect
    function initDragonCursorEffect() {
        if (window.innerWidth < 1024) return; 
        const screen = document.getElementById("screen"); 
        const dragonCursorSvg = document.getElementById("dragon-cursor-svg");
    // ... বাকি কোড যেমন আছে তেমনই থাকবে ...
        const xmlns = "http://www.w3.org/2000/svg"; 
        const xlinkns = "http://www.w3.org/1999/xlink"; 

        let mouseMoveTimer; // To track mouse movement
        const INACTIVITY_THRESHOLD = 500; // milliseconds before reverting to background

        // Function to activate the dragon cursor
        const activateDragon = () => {
            if (dragonCursorSvg) {
                dragonCursorSvg.classList.add('dragon-active');
            }
        };

        // Function to deactivate the dragon cursor
        const deactivateDragon = () => {
            if (dragonCursorSvg) {
                dragonCursorSvg.classList.remove('dragon-active');
            }
        };

        // Event listener for mouse movement
        window.addEventListener(
            "pointermove",
            (e) => {
                // Activate dragon on mouse move
                activateDragon();

                // Clear any existing timer
                clearTimeout(mouseMoveTimer);

                // Set a new timer to deactivate the dragon after inactivity
                mouseMoveTimer = setTimeout(deactivateDragon, INACTIVITY_THRESHOLD);

                pointer.x = e.clientX; 
                pointer.y = e.clientY; 
                rad = 0; 
            },
            false
        );

        const resize = () => {
            width = window.innerWidth; 
            height = window.innerHeight; 
        };

        let width, height; 
        window.addEventListener("resize", () => resize(), false); 
        resize(); 

        const prepend = (use, i) => {
            const elem = document.createElementNS(xmlns, "use"); 
            elems[i].use = elem; 
            elem.setAttributeNS(xlinkns, "xlink:href", "#" + use); 
            screen.prepend(elem); 
        };

        const N = 40; 

        const elems = []; 
        for (let i = 0; i < N; i++) elems[i] = { use: null, x: width / 2, y: 0 }; 
        const pointer = { x: width / 2, y: height / 2 }; 
        const radm = Math.min(pointer.x, pointer.y) - 20; 
        let frm = Math.random(); 
        let rad = 0; 

        for (let i = 1; i < N; i++) {
            if (i === 1) prepend("Cabeza", i); 
            else if (i === 8 || i === 14) prepend("Aletas", i); 
            else prepend("Espina", i); 
        }

        const run = () => {
            requestAnimationFrame(run); 
            let e = elems[0]; 
            const ax = (Math.cos(3 * frm) * rad * width) / height; 
            const ay = (Math.sin(4 * frm) * rad * height) / width; 
            e.x += (ax + pointer.x - e.x) / 10; 
            e.y += (ay + pointer.y - e.y) / 10; 
            for (let i = 1; i < N; i++) { 
                let e = elems[i]; 
                let ep = elems[i - 1]; 
                const a = Math.atan2(e.y - ep.y, e.x - ep.x); 
                e.x += (ep.x - e.x + (Math.cos(a) * (100 - i)) / 5) / 4; 
                e.y += (ep.y - e.y + (Math.sin(a) * (100 - i)) / 5) / 4; 
                const s = (162 + 4 * (1 - i)) / 50; 
                e.use.setAttributeNS(
                    null,
                    "transform",
                    `translate(${(ep.x + e.x) / 2},${(ep.y + e.y) / 2}) rotate(${
                        (180 / Math.PI) * a
                    }) translate(${0},${0}) scale(${s},${s})`
                );
            }
            if (rad < radm) rad++; 
            frm += 0.003; 
            if (rad > 60) { 
                pointer.x += (width / 2 - pointer.x) * 0.05; 
                pointer.y += (height / 2 - pointer.y) * 0.05; 
            }
        };

        run(); 
    }

    // Function to handle the preloader and then trigger decryption
    function initPreloader() {
        const preloader = document.getElementById('cyber-preloader');
        const textElement = document.getElementById('terminal-text');
        
        if (!preloader || !textElement) {
             // Fallback: If elements not found, just run the effect immediately
             applyDecryptionEffect();
             return;
        }

        const messages = [
            "ESTABLISHING CONNECTION...",
            "BYPASSING SECURITY...",
            "ACCESS GRANTED.",
            "WELCOME, USER."
        ];

        let step = 0;
        // Reduced interval time to 500ms (was 600ms) for faster text
        const intervalTime = 500;

        const updateText = setInterval(() => {
            if (step < messages.length) {
                textElement.style.opacity = '0.5';
                textElement.innerText = messages[step];
                setTimeout(() => textElement.style.opacity = '1', 50);
                step++;
            } else {
                clearInterval(updateText);
            }
        }, intervalTime);

        // Remove preloader after 2.2 seconds (was 2.5s) to make it snappier
        setTimeout(() => {
            preloader.classList.add('loaded'); // This hides the overlay
            
            // Reduced delay to 100ms (was 500ms) so animation starts AS screen fades
            setTimeout(() => {
                applyDecryptionEffect(); 
            }, 100);

        }, 2200); 
    }

    // Call the functions in order
    initMapEffect(); 
    initializePixelEffect(); 
    initInteractiveElements(); 
    initContactForm(); 
    initDragonCursorEffect(); 
    initPreloader(); 
    
    // NEW FUNCTIONS INITIALIZATION
    initScrollReveal();
    initTiltEffect();
    initSoundEffects();
    initHackingTyping();
}

window.addEventListener('load', initializeWebsite);

// ==================================================
    // 1. SMART AUTO REDIRECT SYSTEM
    // ==================================================
    
    // URL চেক করা (ইউজার কি Normal Mode বাটন চেপে এসেছে?)
    const urlParams = new URLSearchParams(window.location.search);
    const forceNormal = urlParams.get('view') === 'normal';
    
    // ডিভাইস চেক (ডেস্কটপ কিনা)
    const isDesktop = window.innerWidth > 1024;

    // লজিক: যদি ডেস্কটপ হয় AND ইউজার যদি Normal Mode বাটন না চেপে থাকে -> হ্যাকার ভিউতে পাঠাও
    if (isDesktop && !forceNormal) {
        window.location.href = "monitor.html";
    }


    // ==================================================
    // 2. TERMINAL BUTTON LOGIC (Mobile Restriction)
    // ==================================================
    
    document.getElementById('terminalBtn').addEventListener('click', function(e) {
        // যদি মোবাইল বা ছোট স্ক্রিন হয়
        if (window.innerWidth < 1024) {
            e.preventDefault(); // লিংকে যাওয়া আটকাবে
            
            // ওয়ার্নিং মেসেজ (System Alert Style)
            alert("⚠️ SYSTEM WARNING: \n\nTerminal Mode requires high processing power and a larger display.\n\nPlease switch to a Desktop PC or turn on 'Desktop Site' mode to access the Neural Network.");
        }
        // আর যদি ডেস্কটপ হয়, তাহলে সোজা monitor.html এ চলে যাবে (ডিফল্ট href কাজ করবে)
    });
