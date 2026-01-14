(function() {

    const urlParams = new URLSearchParams(window.location.search);
    const forceNormal = urlParams.get('view') === 'normal';

    const isDesktop = window.innerWidth > 1024;

    if (isDesktop && window.self === window.top && !forceNormal) {
        window.location.href = "monitor.html";
    }
})();

function initializeWebsite() {

    function initTerminalButton() {
        const termBtn = document.getElementById('terminalBtn');
        const modal = document.getElementById('mobile-warning-modal');
        const closeModalBtn = document.getElementById('close-modal-btn');

        if (closeModalBtn && modal) {
            closeModalBtn.addEventListener('click', () => {
                modal.classList.remove('active');
            });

            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.classList.remove('active');
                }
            });
        }

        if(termBtn) {

            if (window.self !== window.top) {
                termBtn.style.display = 'none'; 
            }

            termBtn.addEventListener('click', function(e) {

                if (window.innerWidth < 1024) {
                    e.preventDefault(); 

                    if (modal) {
                        modal.classList.add('active');

                        try {
                            const AudioContext = window.AudioContext || window.webkitAudioContext;
                            const audioCtx = new AudioContext();
                            const osc = audioCtx.createOscillator();
                            const gain = audioCtx.createGain();
                            osc.type = 'sawtooth'; 

                            osc.frequency.value = 150; 

                            gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
                            gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.5);
                            osc.connect(gain);
                            gain.connect(audioCtx.destination);
                            osc.start();
                            osc.stop(audioCtx.currentTime + 0.5);
                        } catch(err) {

                        }
                    } else {

                        alert("⚠️ ACCESS DENIED: Desktop Required.");
                    }
                }
            });
        }
    }

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
        revealOnScroll();
    }

    function initTiltEffect() {
        const tiltCards = document.querySelectorAll('.tilt-card');

        tiltCards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const xCenter = rect.width / 2;
                const yCenter = rect.height / 2;
                const rotateY = ((x - xCenter) / xCenter) * 15;
                const rotateX = -((y - yCenter) / yCenter) * 15;

                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
            });
        });
    }

    function initSoundEffects() {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        const audioCtx = new AudioContext();

        const playTone = (freq = 600, type = 'sine', duration = 0.1) => {
            if (audioCtx.state === 'suspended') audioCtx.resume();
            const oscillator = audioCtx.createOscillator();
            const gainNode = audioCtx.createGain();
            oscillator.type = type;
            oscillator.frequency.setValueAtTime(freq, audioCtx.currentTime);
            gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
            oscillator.connect(gainNode);
            gainNode.connect(audioCtx.destination);
            oscillator.start();
            oscillator.stop(audioCtx.currentTime + duration);
        };

        document.querySelectorAll('.sound-hover, a, button, .glassmorphic-card').forEach(el => {
            el.addEventListener('mouseenter', () => playTone(800, 'sine', 0.1));
        });

        document.querySelectorAll('.sound-click, a, button').forEach(el => {
            el.addEventListener('click', () => playTone(400, 'square', 0.15));
        });
    }

    function initHackingTyping() {
        const textElements = document.querySelectorAll('.typewriter-text');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    if (!element.classList.contains('typed')) {
                        const textToType = element.getAttribute('data-text');
                        element.textContent = '';
                        element.classList.add('typed');
                        typeText(element, textToType);
                    }
                }
            });
        }, { threshold: 0.5 });

        textElements.forEach(el => {
            el.textContent = ''; 
            observer.observe(el);
        });

        function typeText(element, text) {
            let index = 0;
            function typeChar() {
                if (index < text.length) {
                    element.textContent += text.charAt(index);
                    index++;
                    setTimeout(typeChar, Math.random() * 30 + 10);
                }
            }
            typeChar();
        }
    }

    function initMapEffect() { 
        const mapElement = document.getElementById('map'); 
        if (!mapElement) return; 
        const codeSnippets = [`function init() {}`, `console.log("System Ready");`, `if (secure) {}`, `for (i=0; i<99; i++)`, `const data = new Map();`];
        mapElement.innerHTML = ''; 
        for (let i = 0; i < 60; i++) { 
            const codeGlow = document.createElement('div'); 
            codeGlow.className = 'code-glow'; 
            codeGlow.style.left = `${Math.floor(Math.random() * 100)}%`; 
            codeGlow.style.top = `${Math.floor(Math.random() * 60)}%`; 
            codeGlow.innerText = codeSnippets[Math.floor(Math.random() * codeSnippets.length)]; 
            mapElement.appendChild(codeGlow); 
        }
        window.addEventListener('scroll', () => { 
            if (mapElement) mapElement.style.opacity = (window.scrollY > 100) ? '0' : '0.6'; 
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
                    setTimeout(() => target.querySelector('.verified-badge-img')?.classList.add('is-visible'), 200); 
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
            menuToggle.addEventListener('click', () => { menuToggle.classList.toggle('active'); navLinks.classList.toggle('active'); });
            navLinks.querySelectorAll('a').forEach(link => { link.addEventListener('click', () => { menuToggle.classList.remove('active'); navLinks.classList.remove('active'); }); });
        }
        const navbar = document.querySelector('.navbar'); 
        if(navbar){ 
            window.addEventListener('scroll', () => { 
                if (window.scrollY > 50) { navbar.style.padding = '0.5rem 0'; navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.5)'; } 
                else { navbar.style.padding = '1rem 0'; navbar.style.boxShadow = 'none'; }
            });
        }
    }

    function initContactForm(){ 
        const contactForm = document.getElementById('contactForm'); 
        const toast = document.getElementById('toast'); 
        if(contactForm && toast){ 
            contactForm.addEventListener('submit', (e) => { 
                e.preventDefault(); 
                toast.querySelector('.toast-message').textContent = 'Message sent successfully!'; 
                toast.classList.add('show'); 
                const progress = toast.querySelector('.toast-progress'); 
                if(progress) { progress.style.animation = 'none'; void progress.offsetWidth; progress.style.animation = 'toast-progress-anim 5s linear forwards'; }
                setTimeout(() => { toast.classList.remove('show'); }, 5000); 
                contactForm.reset(); 
            });
        }
    }

    function initDragonCursorEffect() {
        if (window.innerWidth < 1024) return; 
        const screen = document.getElementById("screen"); 
        const dragonCursorSvg = document.getElementById("dragon-cursor-svg");
        const xmlns = "http://www.w3.org/2000/svg"; 
        const xlinkns = "http://www.w3.org/1999/xlink"; 
        let mouseMoveTimer; 
        const activateDragon = () => { if (dragonCursorSvg) dragonCursorSvg.classList.add('dragon-active'); };
        const deactivateDragon = () => { if (dragonCursorSvg) dragonCursorSvg.classList.remove('dragon-active'); };

        window.addEventListener("pointermove", (e) => {
            activateDragon();
            clearTimeout(mouseMoveTimer);
            mouseMoveTimer = setTimeout(deactivateDragon, 500);
            pointer.x = e.clientX; pointer.y = e.clientY; rad = 0; 
        }, false);

        let width = window.innerWidth, height = window.innerHeight; 
        window.addEventListener("resize", () => { width = window.innerWidth; height = window.innerHeight; }, false); 

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
        let frm = Math.random(); let rad = 0; 

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
                let e = elems[i]; let ep = elems[i - 1]; 
                const a = Math.atan2(e.y - ep.y, e.x - ep.x); 
                e.x += (ep.x - e.x + (Math.cos(a) * (100 - i)) / 5) / 4; 
                e.y += (ep.y - e.y + (Math.sin(a) * (100 - i)) / 5) / 4; 
                const s = (162 + 4 * (1 - i)) / 50; 
                e.use.setAttributeNS(null, "transform", `translate(${(ep.x + e.x) / 2},${(ep.y + e.y) / 2}) rotate(${(180 / Math.PI) * a}) translate(0,0) scale(${s},${s})`);
            }
            if (rad < (Math.min(pointer.x, pointer.y) - 20)) rad++; 
            frm += 0.003; 
            if (rad > 60) { pointer.x += (width / 2 - pointer.x) * 0.05; pointer.y += (height / 2 - pointer.y) * 0.05; }
        };
        run(); 
    }

    function initPreloader() {
        const preloader = document.getElementById('cyber-preloader');
        const textElement = document.getElementById('terminal-text');
        if (!preloader || !textElement) { applyDecryptionEffect(); return; }
        const messages = ["ESTABLISHING CONNECTION...", "BYPASSING SECURITY...", "ACCESS GRANTED.", "WELCOME, USER."];
        let step = 0;
        const updateText = setInterval(() => {
            if (step < messages.length) {
                textElement.style.opacity = '0.5';
                textElement.innerText = messages[step];
                setTimeout(() => textElement.style.opacity = '1', 50);
                step++;
            } else { clearInterval(updateText); }
        }, 500);

        setTimeout(() => {
            preloader.classList.add('loaded'); 
            setTimeout(() => { applyDecryptionEffect(); }, 100);
        }, 2200); 
    }

    initMapEffect(); initializePixelEffect(); initInteractiveElements(); initContactForm(); initDragonCursorEffect(); initPreloader(); 
    initScrollReveal(); initTiltEffect(); initSoundEffects(); initHackingTyping(); 
    initTerminalButton(); 

}

window.addEventListener('load', initializeWebsite);
