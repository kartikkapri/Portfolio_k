// Advanced Cinematic Effects System
class CinematicEffects {
    constructor() {
        this.konamiCode = [];
        this.konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];
        this.init();
    }

    init() {
        this.setupContactGlobe();
    }



    setupContactGlobe() {
        setTimeout(() => {
            const contactSection = document.getElementById('contact');
            if (!contactSection) return;

            const globeContainer = document.createElement('div');
            globeContainer.className = 'contact-globe-container';
            globeContainer.id = 'contact-globe';
            
            const container = contactSection.querySelector('.contact-content');
            if (container) {
                container.appendChild(globeContainer);
            }

            setTimeout(() => {
                try {
                    if (typeof THREE !== 'undefined') {
                        this.createContactGlobe();
                    } else {
                        this.createSimpleGlobe();
                    }
                } catch (error) {
                    this.createSimpleGlobe();
                }
            }, 100);
        }, 200);
    }

    createContactGlobe() {
        const container = document.getElementById('contact-globe');
        if (!container) return;

        container.innerHTML = '';

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ 
            alpha: true, 
            antialias: false,
            powerPreference: "high-performance"
        });
        
        const size = Math.min(200, window.innerWidth * 0.3);
        renderer.setSize(size, size);
        renderer.setClearColor(0x000000, 0);
        container.appendChild(renderer.domElement);

        const globeGeometry = new THREE.SphereGeometry(1, 16, 16);
        const globeMaterial = new THREE.MeshBasicMaterial({
            color: 0x00bfff,
            wireframe: true,
            transparent: true,
            opacity: 0.6
        });
        
        const globe = new THREE.Mesh(globeGeometry, globeMaterial);
        scene.add(globe);

        camera.position.z = 3;

        const animate = () => {
            requestAnimationFrame(animate);
            globe.rotation.y += 0.003;
            renderer.render(scene, camera);
        };
        
        animate();
    }
    
    createSimpleGlobe() {
        const container = document.getElementById('contact-globe');
        if (!container) return;
        
        container.innerHTML = `
            <div class="simple-globe">
                <div class="globe-sphere"></div>
            </div>
        `;
    }
}



document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        const cinematicEffects = new CinematicEffects();
        window.cinematicEffects = cinematicEffects;
    }, 500);
});