// Bhramastra Hero Animation System
class BhramastraHero {
    constructor() {
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.orb = null;
        this.particles = [];
        this.energyWaves = [];
        this.mouse = { x: 0, y: 0 };
        this.init();
    }

    init() {
        this.createCosmicBackground();
        this.createBhramastraOrb();
        this.setupMouseInteraction();
        this.animate();
    }

    createCosmicBackground() {
        const container = document.getElementById('cosmic-bg');
        
        // Create stars
        for (let i = 0; i < 200; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            star.style.left = Math.random() * 100 + '%';
            star.style.top = Math.random() * 100 + '%';
            star.style.width = Math.random() * 3 + 1 + 'px';
            star.style.height = star.style.width;
            star.style.animationDelay = Math.random() * 2 + 's';
            container.appendChild(star);
        }
    }

    createBhramastraOrb() {
        const container = document.getElementById('bhramastra-orb');
        
        // Three.js setup
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        
        this.renderer.setSize(400, 400);
        this.renderer.setClearColor(0x000000, 0);
        container.appendChild(this.renderer.domElement);

        // Main Bhramastra Orb
        this.createMainOrb();
        
        // Orbiting Particles
        this.createOrbitingParticles();
        
        // Energy Waves (HTML/CSS based)
        this.createEnergyWaves();
        
        this.camera.position.z = 5;
    }

    createMainOrb() {
        const orbGroup = new THREE.Group();

        // Core orb with fire gradient effect
        const coreGeometry = new THREE.SphereGeometry(1, 32, 32);
        
        // Create fire gradient material
        const coreTexture = this.createFireTexture();
        const coreMaterial = new THREE.MeshBasicMaterial({
            map: coreTexture,
            transparent: true,
            opacity: 0.9
        });
        
        const core = new THREE.Mesh(coreGeometry, coreMaterial);
        orbGroup.add(core);

        // Outer energy shell
        const shellGeometry = new THREE.SphereGeometry(1.3, 32, 32);
        const shellMaterial = new THREE.MeshBasicMaterial({
            color: 0x00bfff,
            transparent: true,
            opacity: 0.3,
            wireframe: true
        });
        const shell = new THREE.Mesh(shellGeometry, shellMaterial);
        orbGroup.add(shell);

        // Inner glow
        const glowGeometry = new THREE.SphereGeometry(0.7, 16, 16);
        const glowMaterial = new THREE.MeshBasicMaterial({
            color: 0xff6b35,
            transparent: true,
            opacity: 0.6
        });
        const glow = new THREE.Mesh(glowGeometry, glowMaterial);
        orbGroup.add(glow);

        // Energy rings
        for (let i = 0; i < 3; i++) {
            const ringGeometry = new THREE.RingGeometry(1.5 + i * 0.3, 1.7 + i * 0.3, 32);
            const ringMaterial = new THREE.MeshBasicMaterial({
                color: i % 2 === 0 ? 0xff6b35 : 0x00bfff,
                transparent: true,
                opacity: 0.4,
                side: THREE.DoubleSide
            });
            const ring = new THREE.Mesh(ringGeometry, ringMaterial);
            ring.rotation.x = Math.random() * Math.PI;
            ring.rotation.y = Math.random() * Math.PI;
            orbGroup.add(ring);
        }

        this.scene.add(orbGroup);
        this.orb = orbGroup;
    }

    createFireTexture() {
        const canvas = document.createElement('canvas');
        canvas.width = 256;
        canvas.height = 256;
        const ctx = canvas.getContext('2d');

        // Create fire gradient
        const gradient = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
        gradient.addColorStop(0, '#ffcc02');
        gradient.addColorStop(0.3, '#f7931e');
        gradient.addColorStop(0.6, '#ff6b35');
        gradient.addColorStop(1, '#8b0000');

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 256, 256);

        const texture = new THREE.CanvasTexture(canvas);
        return texture;
    }

    createOrbitingParticles() {
        const particleCount = 50;
        
        for (let i = 0; i < particleCount; i++) {
            const particleGeometry = new THREE.SphereGeometry(0.02, 8, 8);
            const particleMaterial = new THREE.MeshBasicMaterial({
                color: i % 3 === 0 ? 0xff6b35 : i % 3 === 1 ? 0x00bfff : 0xffd700,
                transparent: true,
                opacity: 0.8
            });
            const particle = new THREE.Mesh(particleGeometry, particleMaterial);
            
            // Set initial orbital position
            const radius = 2 + Math.random() * 2;
            const angle = (i / particleCount) * Math.PI * 2;
            const height = (Math.random() - 0.5) * 2;
            
            particle.position.set(
                Math.cos(angle) * radius,
                height,
                Math.sin(angle) * radius
            );
            
            this.scene.add(particle);
            this.particles.push({
                mesh: particle,
                angle: angle,
                radius: radius,
                speed: 0.01 + Math.random() * 0.02,
                height: height,
                originalRadius: radius
            });
        }
    }

    createEnergyWaves() {
        const container = document.getElementById('bhramastra-orb');
        
        setInterval(() => {
            const wave = document.createElement('div');
            wave.className = 'energy-wave';
            wave.style.width = '20px';
            wave.style.height = '20px';
            wave.style.left = '50%';
            wave.style.top = '50%';
            wave.style.transform = 'translate(-50%, -50%)';
            
            container.appendChild(wave);
            
            // Remove wave after animation
            setTimeout(() => {
                if (wave.parentNode) {
                    wave.parentNode.removeChild(wave);
                }
            }, 3000);
        }, 2000);
    }

    setupMouseInteraction() {
        document.addEventListener('mousemove', (event) => {
            this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        });
    }

    animate() {
        requestAnimationFrame(() => this.animate());
        
        const time = Date.now() * 0.001;
        
        if (this.orb) {
            // Rotate main orb
            this.orb.rotation.y += 0.01;
            this.orb.rotation.x += 0.005;
            
            // Pulsing effect
            const pulse = 1 + Math.sin(time * 2) * 0.1;
            this.orb.scale.setScalar(pulse);
            
            // Mouse interaction - slight tilt
            this.orb.rotation.z = this.mouse.x * 0.1;
            this.orb.rotation.x = this.mouse.y * 0.1;
        }
        
        // Animate orbiting particles
        this.particles.forEach((particleObj, index) => {
            particleObj.angle += particleObj.speed;
            
            // Mouse influence on particle orbits
            const mouseInfluence = 0.3;
            const influencedRadius = particleObj.originalRadius + 
                (this.mouse.x * mouseInfluence) + 
                Math.sin(time + index) * 0.2;
            
            particleObj.mesh.position.x = Math.cos(particleObj.angle) * influencedRadius;
            particleObj.mesh.position.z = Math.sin(particleObj.angle) * influencedRadius;
            particleObj.mesh.position.y = particleObj.height + Math.sin(time * 2 + index) * 0.1;
            
            // Particle glow effect
            particleObj.mesh.material.opacity = 0.6 + Math.sin(time * 3 + index) * 0.2;
        });
        
        this.renderer.render(this.scene, this.camera);
    }

    // Handle window resize
    handleResize() {
        const container = document.getElementById('bhramastra-orb');
        const size = Math.min(window.innerWidth * 0.4, 400);
        
        this.renderer.setSize(size, size);
        container.style.width = size + 'px';
        container.style.height = size + 'px';
    }
}

// Initialize Bhramastra Hero Animation
document.addEventListener('DOMContentLoaded', function() {
    const bhramastraHero = new BhramastraHero();
    
    // Handle window resize
    window.addEventListener('resize', () => {
        bhramastraHero.handleResize();
    });
    
    // Enhanced typing animation for hero
    const heroTypingText = document.getElementById('typing-text');
    const heroNames = ['Kartik Kapri'];
    let heroNameIndex = 0;
    let heroCharIndex = 0;
    let heroIsDeleting = false;
    
    function heroTypeWriter() {
        const currentName = heroNames[heroNameIndex];
        
        if (heroIsDeleting) {
            heroTypingText.textContent = currentName.substring(0, heroCharIndex - 1);
            heroCharIndex--;
        } else {
            heroTypingText.textContent = currentName.substring(0, heroCharIndex + 1);
            heroCharIndex++;
        }
        
        let typeSpeed = heroIsDeleting ? 100 : 150;
        
        if (!heroIsDeleting && heroCharIndex === currentName.length) {
            typeSpeed = 3000; // Longer pause at full name
            heroIsDeleting = true;
        } else if (heroIsDeleting && heroCharIndex === 0) {
            heroIsDeleting = false;
            heroNameIndex = (heroNameIndex + 1) % heroNames.length;
            typeSpeed = 500;
        }
        
        setTimeout(heroTypeWriter, typeSpeed);
    }
    
    // Start enhanced typing animation
    setTimeout(heroTypeWriter, 1000);
});