// --- Toggle Sections ---
function toggleSection(element) {
    const all = document.querySelectorAll(".section-button");
    all.forEach(s => {
        if (s !== element) s.classList.remove("expanded");
    });
    element.classList.toggle("expanded");
}

// --- Copy Email Function ---
function copyEmail(event) {
    event.preventDefault();
    const email = "hassanswessi13@gmail.com";
    navigator.clipboard.writeText(email).then(() => {
        alert("Email copié : " + email);
    }).catch(() => {
        const input = document.createElement("input");
        input.value = email;
        document.body.appendChild(input);
        input.select();
        document.execCommand("copy");
        document.body.removeChild(input);
        alert("Email copié : " + email);
    });
}

// --- Particle System Animation ---
class ParticleSystem {
    constructor() {
        this.canvas = document.getElementById("particleCanvas");
        this.ctx = this.canvas.getContext("2d");
        this.particles = [];
        this.mouse = { x: -999, y: -999 };
        this.maxParticles = 120;
        this.init();
    }

    init() {
        this.resizeCanvas();
        this.createParticles();
        this.bindEvents();
        this.animate();
    }

    resizeCanvas() {
        this.canvas.width = innerWidth;
        this.canvas.height = innerHeight;
    }

    createParticles() {
        for (let i = 0; i < this.maxParticles; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5),
                vy: (Math.random() - 0.5),
                radius: Math.random() * 2 + 1,
                opacity: Math.random() * 0.5 + 0.2,
                baseRadius: Math.random() * 2 + 1
            });
        }
    }

    bindEvents() {
        addEventListener("resize", () => this.resizeCanvas());
        document.addEventListener("mousemove", e => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
        });
        document.addEventListener("mouseleave", () => {
            this.mouse.x = -999;
            this.mouse.y = -999;
        });
    }

    updateParticles() {
        this.particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;
            if (p.x < 0 || p.x > this.canvas.width) p.vx *= -1;
            if (p.y < 0 || p.y > this.canvas.height) p.vy *= -1;
            let dx = this.mouse.x - p.x;
            let dy = this.mouse.y - p.y;
            let dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 120) {
                let force = (120 - dist) / 120;
                p.x -= dx * force * 0.03;
                p.y -= dy * force * 0.03;
                p.radius = p.baseRadius * (1 + force);
                p.opacity = Math.min(1, p.opacity + force * 0.2);
            } else {
                p.radius = p.baseRadius;
                p.opacity = Math.max(0.2, p.opacity - 0.02);
            }
        });
    }

    drawParticles() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.particles.forEach(p => {
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(0,150,255,${p.opacity})`;
            this.ctx.fill();
        });
        this.particles.forEach((a, i) => {
            for (let b of this.particles.slice(i + 1)) {
                let dx = a.x - b.x;
                let dy = a.y - b.y;
                let dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 140) {
                    this.ctx.beginPath();
                    this.ctx.strokeStyle = `rgba(0,150,255,${(140 - dist) / 140 * 0.2})`;
                    this.ctx.moveTo(a.x, a.y);
                    this.ctx.lineTo(b.x, b.y);
                    this.ctx.lineWidth = 0.5;
                    this.ctx.stroke();
                }
            }
        });
    }

    animate() {
        this.updateParticles();
        this.drawParticles();
        requestAnimationFrame(() => this.animate());
    }
}

// --- Initialize ---
document.addEventListener("DOMContentLoaded", () => {
    new ParticleSystem();
    initLogoBackground();
});

// --- Logo Background Animation ---
function initLogoBackground() {
    const logos = [
        'document/linux.png',
        'document/proxmox.png',
        'document/python.png',
        'document/server.png',
        'document/routeur logo (2).png'
    ];

    const container = document.querySelector('.logo-background');
    const logoCount = 12;

    for (let i = 0; i < logoCount; i++) {
        const logo = document.createElement('img');
        const randomLogo = logos[Math.floor(Math.random() * logos.length)];
        logo.src = randomLogo;
        logo.alt = 'logo';
        logo.className = 'logo-item';
        logo.style.width = (40 + Math.random() * 60) + 'px';
        logo.style.height = 'auto';
        logo.style.left = Math.random() * 100 + '%';
        logo.style.top = Math.random() * 100 + '%';
        logo.style.animationDelay = (Math.random() * 10) + 's';
        logo.style.animationDuration = (15 + Math.random() * 15) + 's';
        container.appendChild(logo);
    }
}
