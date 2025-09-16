// Portfolio 3D Animation System
class Portfolio3D {
    constructor() {
        this.scenes = {};
        this.isDarkTheme = true;
        this.init();
        
        // Make globally accessible for theme updates
        window.portfolio3D = this;
    }
    
    updateTheme(isDark) {
        this.isDarkTheme = isDark;
        // Update 3D model colors based on theme
        this.updateModelColors();
    }
    
    getThemeColors() {
        if (this.isDarkTheme) {
            return {
                primary: 0x00ffff,
                secondary: 0xff6b6b,
                tertiary: 0x4ecdc4,
                accent: 0xffd700,
                glow: 0x00ffff
            };
        } else {
            return {
                primary: 0x3498db,
                secondary: 0xe74c3c,
                tertiary: 0x2ecc71,
                accent: 0xf39c12,
                glow: 0x3498db
            };
        }
    }
    
    updateModelColors() {
        // This method will update existing 3D models with new theme colors
        // Implementation depends on how models are structured
    }

    init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.createAll3DScenes());
        } else {
            this.createAll3DScenes();
        }
    }

    createAll3DScenes() {
        // Initialize GSAP ScrollTrigger
        gsap.registerPlugin(ScrollTrigger);
        
        // Create all 3D scenes
        this.createHeroHologram();
        this.createSkills3D();
        this.createExperienceDesk();
        this.createProjectsCarousel();
        this.createEducationBook();
        this.createCertificationsMedal();
        this.createContactEnvelope();
        
        // Setup scroll animations
        this.setupScrollAnimations();
    }

    // 1. Hero Hologram Avatar
    createHeroHologram() {
        const container = document.getElementById('hero-3d');
        if (!container) return;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        
        renderer.setSize(300, 300);
        renderer.setClearColor(0x000000, 0);
        container.appendChild(renderer.domElement);

        const colors = this.getThemeColors();
        
        // Create holographic sphere
        const geometry = new THREE.SphereGeometry(1, 32, 32);
        const material = new THREE.MeshBasicMaterial({
            color: colors.primary,
            transparent: true,
            opacity: 0.6,
            wireframe: true
        });
        const sphere = new THREE.Mesh(geometry, material);
        scene.add(sphere);

        // Add inner glow
        const innerGeometry = new THREE.SphereGeometry(0.8, 16, 16);
        const innerMaterial = new THREE.MeshBasicMaterial({
            color: colors.glow,
            transparent: true,
            opacity: 0.3
        });
        const innerSphere = new THREE.Mesh(innerGeometry, innerMaterial);
        scene.add(innerSphere);

        // Add particles
        const particles = new THREE.Group();
        for (let i = 0; i < 50; i++) {
            const particleGeometry = new THREE.SphereGeometry(0.02, 4, 4);
            const particleMaterial = new THREE.MeshBasicMaterial({
                color: colors.primary,
                transparent: true,
                opacity: 0.8
            });
            const particle = new THREE.Mesh(particleGeometry, particleMaterial);
            
            particle.position.set(
                (Math.random() - 0.5) * 4,
                (Math.random() - 0.5) * 4,
                (Math.random() - 0.5) * 4
            );
            
            particles.add(particle);
        }
        scene.add(particles);

        camera.position.z = 3;

        // Animation
        const animate = () => {
            requestAnimationFrame(animate);
            
            sphere.rotation.y += 0.01;
            innerSphere.rotation.x += 0.005;
            particles.rotation.y += 0.005;
            
            // Pulsing effect
            const time = Date.now() * 0.003;
            sphere.scale.setScalar(1 + Math.sin(time) * 0.1);
            
            renderer.render(scene, camera);
        };
        animate();

        this.scenes.hero = { scene, camera, renderer };
    }

    // 2. Skills 3D Objects
    createSkills3D() {
        // Programming Cube
        this.createProgrammingCube();
        this.createAnalyticsRobot();
        this.createBusinessChart();
        this.createWebLaptop();
        this.createCloudModel();
        this.createSoftSkillsHandshake();
    }

    createProgrammingCube() {
        const container = document.getElementById('programming-3d');
        if (!container) return;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        
        renderer.setSize(120, 120);
        container.innerHTML = '';
        container.appendChild(renderer.domElement);

        const colors = this.getThemeColors();
        
        // Neon cube
        const geometry = new THREE.BoxGeometry(1.5, 1.5, 1.5);
        const edges = new THREE.EdgesGeometry(geometry);
        const lineMaterial = new THREE.LineBasicMaterial({ 
            color: colors.tertiary,
            linewidth: 3
        });
        const cube = new THREE.LineSegments(edges, lineMaterial);
        scene.add(cube);

        // Add glowing core
        const coreGeometry = new THREE.BoxGeometry(0.8, 0.8, 0.8);
        const coreMaterial = new THREE.MeshBasicMaterial({
            color: colors.tertiary,
            transparent: true,
            opacity: 0.3
        });
        const core = new THREE.Mesh(coreGeometry, coreMaterial);
        scene.add(core);

        camera.position.z = 3;

        const animate = () => {
            requestAnimationFrame(animate);
            cube.rotation.x += 0.02;
            cube.rotation.y += 0.02;
            core.rotation.x -= 0.01;
            core.rotation.y -= 0.01;
            renderer.render(scene, camera);
        };
        animate();
    }

    createAnalyticsRobot() {
        const container = document.getElementById('analytics-3d');
        if (!container) return;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        
        renderer.setSize(120, 120);
        container.innerHTML = '';
        container.appendChild(renderer.domElement);

        const robotGroup = new THREE.Group();

        // Robot head with circuits
        const headGeometry = new THREE.SphereGeometry(0.6, 16, 16);
        const headMaterial = new THREE.MeshBasicMaterial({
            color: 0x00ffff,
            transparent: true,
            opacity: 0.7,
            wireframe: true
        });
        const head = new THREE.Mesh(headGeometry, headMaterial);
        robotGroup.add(head);

        // Glowing eyes
        const eyeGeometry = new THREE.SphereGeometry(0.1, 8, 8);
        const eyeMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
        
        const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
        leftEye.position.set(-0.2, 0.1, 0.5);
        robotGroup.add(leftEye);
        
        const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
        rightEye.position.set(0.2, 0.1, 0.5);
        robotGroup.add(rightEye);

        // Circuit lines
        for (let i = 0; i < 5; i++) {
            const points = [];
            for (let j = 0; j < 10; j++) {
                points.push(new THREE.Vector3(
                    (Math.random() - 0.5) * 2,
                    (Math.random() - 0.5) * 2,
                    (Math.random() - 0.5) * 2
                ));
            }
            const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
            const lineMaterial = new THREE.LineBasicMaterial({ 
                color: 0x00ff00,
                transparent: true,
                opacity: 0.6
            });
            const line = new THREE.Line(lineGeometry, lineMaterial);
            robotGroup.add(line);
        }

        scene.add(robotGroup);
        camera.position.z = 2;

        const animate = () => {
            requestAnimationFrame(animate);
            robotGroup.rotation.y += 0.02;
            
            // Blinking eyes
            const time = Date.now() * 0.01;
            leftEye.scale.y = Math.abs(Math.sin(time)) * 0.5 + 0.5;
            rightEye.scale.y = Math.abs(Math.sin(time)) * 0.5 + 0.5;
            
            renderer.render(scene, camera);
        };
        animate();
    }

    createBusinessChart() {
        const container = document.getElementById('business-3d');
        if (!container) return;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        
        renderer.setSize(120, 120);
        container.innerHTML = '';
        container.appendChild(renderer.domElement);

        const chartGroup = new THREE.Group();
        const bars = [];

        // Animated 3D bars
        const barData = [0.5, 1.2, 0.8, 1.5, 1.0];
        const colors = [0xff6b6b, 0x4ecdc4, 0x45b7d1, 0xf9ca24, 0x6c5ce7];

        barData.forEach((height, index) => {
            const barGeometry = new THREE.BoxGeometry(0.2, height, 0.2);
            const barMaterial = new THREE.MeshBasicMaterial({ 
                color: colors[index],
                transparent: true,
                opacity: 0.8
            });
            const bar = new THREE.Mesh(barGeometry, barMaterial);
            
            bar.position.x = (index - 2) * 0.4;
            bar.position.y = height / 2;
            
            chartGroup.add(bar);
            bars.push({ mesh: bar, originalHeight: height });
        });

        scene.add(chartGroup);
        camera.position.set(2, 1, 2);
        camera.lookAt(0, 0, 0);

        const animate = () => {
            requestAnimationFrame(animate);
            chartGroup.rotation.y += 0.01;
            
            // Animate bar heights
            bars.forEach((barObj, index) => {
                const time = Date.now() * 0.002;
                const newHeight = barObj.originalHeight + Math.sin(time + index) * 0.3;
                barObj.mesh.scale.y = Math.max(0.1, newHeight / barObj.originalHeight);
            });
            
            renderer.render(scene, camera);
        };
        animate();
    }

    createWebLaptop() {
        const container = document.getElementById('web-3d');
        if (!container) return;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        
        renderer.setSize(120, 120);
        container.innerHTML = '';
        container.appendChild(renderer.domElement);

        const laptopGroup = new THREE.Group();

        // Laptop base
        const baseGeometry = new THREE.BoxGeometry(1.6, 0.1, 1.2);
        const baseMaterial = new THREE.MeshBasicMaterial({ color: 0x2c3e50 });
        const base = new THREE.Mesh(baseGeometry, baseMaterial);
        laptopGroup.add(base);

        // Screen
        const screenGeometry = new THREE.BoxGeometry(1.5, 1, 0.05);
        const screenMaterial = new THREE.MeshBasicMaterial({ color: 0x34495e });
        const screen = new THREE.Mesh(screenGeometry, screenMaterial);
        screen.position.set(0, 0.5, -0.6);
        screen.rotation.x = -0.2;
        laptopGroup.add(screen);

        // Glowing screen content
        const contentGeometry = new THREE.PlaneGeometry(1.3, 0.8);
        const contentMaterial = new THREE.MeshBasicMaterial({ 
            color: 0x3498db,
            transparent: true,
            opacity: 0.8
        });
        const content = new THREE.Mesh(contentGeometry, contentMaterial);
        content.position.set(0, 0.5, -0.57);
        content.rotation.x = -0.2;
        laptopGroup.add(content);

        scene.add(laptopGroup);
        camera.position.set(1.5, 1, 2);
        camera.lookAt(0, 0, 0);

        const animate = () => {
            requestAnimationFrame(animate);
            laptopGroup.rotation.y += 0.01;
            
            // Pulsing screen
            const time = Date.now() * 0.003;
            content.material.opacity = 0.6 + Math.sin(time) * 0.2;
            
            renderer.render(scene, camera);
        };
        animate();
    }

    createCloudModel() {
        const container = document.getElementById('cloud-3d');
        if (!container) return;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        
        renderer.setSize(120, 120);
        container.innerHTML = '';
        container.appendChild(renderer.domElement);

        const cloudGroup = new THREE.Group();

        // Cloud spheres
        const cloudSpheres = [];
        for (let i = 0; i < 6; i++) {
            const sphereGeometry = new THREE.SphereGeometry(0.3 + Math.random() * 0.2, 8, 8);
            const sphereMaterial = new THREE.MeshBasicMaterial({ 
                color: 0x87ceeb,
                transparent: true,
                opacity: 0.7
            });
            const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
            
            sphere.position.set(
                (Math.random() - 0.5) * 1.5,
                (Math.random() - 0.5) * 0.5,
                (Math.random() - 0.5) * 0.5
            );
            
            cloudGroup.add(sphere);
            cloudSpheres.push(sphere);
        }

        // Orbiting data nodes
        const nodes = [];
        for (let i = 0; i < 8; i++) {
            const nodeGeometry = new THREE.SphereGeometry(0.05, 6, 6);
            const nodeMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
            const node = new THREE.Mesh(nodeGeometry, nodeMaterial);
            
            const angle = (i / 8) * Math.PI * 2;
            node.position.set(
                Math.cos(angle) * 1.5,
                Math.sin(angle * 0.5) * 0.3,
                Math.sin(angle) * 1.5
            );
            
            cloudGroup.add(node);
            nodes.push({ mesh: node, angle: angle });
        }

        scene.add(cloudGroup);
        camera.position.z = 3;

        const animate = () => {
            requestAnimationFrame(animate);
            cloudGroup.rotation.y += 0.005;
            
            // Float cloud spheres
            cloudSpheres.forEach((sphere, index) => {
                const time = Date.now() * 0.001;
                sphere.position.y += Math.sin(time + index) * 0.002;
            });
            
            // Orbit data nodes
            nodes.forEach((nodeObj, index) => {
                const time = Date.now() * 0.002;
                const angle = nodeObj.angle + time;
                nodeObj.mesh.position.x = Math.cos(angle) * 1.5;
                nodeObj.mesh.position.z = Math.sin(angle) * 1.5;
            });
            
            renderer.render(scene, camera);
        };
        animate();
    }

    createSoftSkillsHandshake() {
        const container = document.getElementById('soft-3d');
        if (!container) return;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        
        renderer.setSize(120, 120);
        container.innerHTML = '';
        container.appendChild(renderer.domElement);

        const handshakeGroup = new THREE.Group();

        // Two hands
        const hand1Geometry = new THREE.CylinderGeometry(0.15, 0.15, 0.8, 8);
        const hand1Material = new THREE.MeshBasicMaterial({ color: 0xf39c12 });
        const hand1 = new THREE.Mesh(hand1Geometry, hand1Material);
        hand1.position.set(-0.4, 0, 0);
        hand1.rotation.z = Math.PI / 4;
        handshakeGroup.add(hand1);

        const hand2Geometry = new THREE.CylinderGeometry(0.15, 0.15, 0.8, 8);
        const hand2Material = new THREE.MeshBasicMaterial({ color: 0x9b59b6 });
        const hand2 = new THREE.Mesh(hand2Geometry, hand2Material);
        hand2.position.set(0.4, 0, 0);
        hand2.rotation.z = -Math.PI / 4;
        handshakeGroup.add(hand2);

        // Connection glow
        const connectionGeometry = new THREE.SphereGeometry(0.2, 8, 8);
        const connectionMaterial = new THREE.MeshBasicMaterial({ 
            color: 0x2ecc71,
            transparent: true,
            opacity: 0.8
        });
        const connection = new THREE.Mesh(connectionGeometry, connectionMaterial);
        handshakeGroup.add(connection);

        scene.add(handshakeGroup);
        camera.position.z = 2;

        const animate = () => {
            requestAnimationFrame(animate);
            handshakeGroup.rotation.y += 0.02;
            
            // Pulsing connection
            const time = Date.now() * 0.005;
            connection.scale.setScalar(1 + Math.sin(time) * 0.3);
            
            renderer.render(scene, camera);
        };
        animate();
    }

    // 3. Experience Holographic Timeline
    createExperienceDesk() {
        const container = document.getElementById('experience-3d');
        if (!container) return;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, 200/150, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        
        renderer.setSize(200, 150);
        container.appendChild(renderer.domElement);

        const timelineGroup = new THREE.Group();

        // Holographic timeline base
        const baseGeometry = new THREE.CylinderGeometry(1.2, 1.2, 0.05, 32);
        const baseMaterial = new THREE.MeshBasicMaterial({ 
            color: 0x00ffff,
            transparent: true,
            opacity: 0.3
        });
        const base = new THREE.Mesh(baseGeometry, baseMaterial);
        timelineGroup.add(base);

        // Floating timeline nodes
        const timelineNodes = [];
        const nodePositions = [
            { x: -0.8, y: 0.3, z: 0, color: 0xff6b6b, label: 'Start' },
            { x: 0, y: 0.6, z: 0, color: 0x4ecdc4, label: 'Intern' },
            { x: 0.8, y: 0.9, z: 0, color: 0xffe66d, label: 'Future' }
        ];

        nodePositions.forEach((pos, index) => {
            // Main node
            const nodeGeometry = new THREE.SphereGeometry(0.15, 16, 16);
            const nodeMaterial = new THREE.MeshBasicMaterial({ 
                color: pos.color,
                transparent: true,
                opacity: 0.8
            });
            const node = new THREE.Mesh(nodeGeometry, nodeMaterial);
            node.position.set(pos.x, pos.y, pos.z);
            timelineGroup.add(node);

            // Glowing ring around node
            const ringGeometry = new THREE.RingGeometry(0.2, 0.25, 16);
            const ringMaterial = new THREE.MeshBasicMaterial({ 
                color: pos.color,
                transparent: true,
                opacity: 0.4
            });
            const ring = new THREE.Mesh(ringGeometry, ringMaterial);
            ring.position.copy(node.position);
            ring.rotation.x = -Math.PI / 2;
            timelineGroup.add(ring);

            // Data streams
            const streamParticles = [];
            for (let i = 0; i < 8; i++) {
                const particleGeometry = new THREE.SphereGeometry(0.02, 6, 6);
                const particleMaterial = new THREE.MeshBasicMaterial({ 
                    color: pos.color,
                    transparent: true,
                    opacity: 0.7
                });
                const particle = new THREE.Mesh(particleGeometry, particleMaterial);
                
                const angle = (i / 8) * Math.PI * 2;
                particle.position.set(
                    pos.x + Math.cos(angle) * 0.4,
                    pos.y,
                    pos.z + Math.sin(angle) * 0.4
                );
                
                timelineGroup.add(particle);
                streamParticles.push({ mesh: particle, angle: angle, basePos: pos });
            }

            timelineNodes.push({ 
                node: node, 
                ring: ring, 
                particles: streamParticles,
                baseY: pos.y
            });
        });

        // Connecting energy beams
        for (let i = 0; i < nodePositions.length - 1; i++) {
            const start = nodePositions[i];
            const end = nodePositions[i + 1];
            
            const points = [];
            for (let j = 0; j <= 20; j++) {
                const t = j / 20;
                const x = start.x + (end.x - start.x) * t;
                const y = start.y + (end.y - start.y) * t + Math.sin(t * Math.PI) * 0.2;
                const z = start.z + (end.z - start.z) * t;
                points.push(new THREE.Vector3(x, y, z));
            }
            
            const beamGeometry = new THREE.BufferGeometry().setFromPoints(points);
            const beamMaterial = new THREE.LineBasicMaterial({ 
                color: 0x00ffff,
                transparent: true,
                opacity: 0.6
            });
            const beam = new THREE.Line(beamGeometry, beamMaterial);
            timelineGroup.add(beam);
        }

        scene.add(timelineGroup);
        camera.position.set(2, 1.5, 2);
        camera.lookAt(0, 0.5, 0);

        const animate = () => {
            requestAnimationFrame(animate);
            
            const time = Date.now() * 0.002;
            
            // Rotate entire timeline
            timelineGroup.rotation.y += 0.005;
            
            // Animate nodes
            timelineNodes.forEach((nodeObj, index) => {
                // Floating motion
                nodeObj.node.position.y = nodeObj.baseY + Math.sin(time + index) * 0.1;
                nodeObj.ring.position.y = nodeObj.node.position.y;
                
                // Pulsing rings
                nodeObj.ring.scale.setScalar(1 + Math.sin(time * 2 + index) * 0.2);
                
                // Orbiting particles
                nodeObj.particles.forEach((particleObj, pIndex) => {
                    const orbitTime = time + pIndex * 0.2;
                    const radius = 0.4 + Math.sin(orbitTime) * 0.1;
                    const angle = particleObj.angle + orbitTime;
                    
                    particleObj.mesh.position.x = particleObj.basePos.x + Math.cos(angle) * radius;
                    particleObj.mesh.position.y = nodeObj.node.position.y + Math.sin(orbitTime * 2) * 0.1;
                    particleObj.mesh.position.z = particleObj.basePos.z + Math.sin(angle) * radius;
                });
            });
            
            renderer.render(scene, camera);
        };
        animate();
    }

    // 4. Projects Carousel
    createProjectsCarousel() {
        const container = document.getElementById('projects-3d');
        if (!container) return;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, 250/200, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        
        renderer.setSize(250, 200);
        container.appendChild(renderer.domElement);

        const carouselGroup = new THREE.Group();
        const projectCards = [];

        // Create 3 project cards
        for (let i = 0; i < 3; i++) {
            const cardGeometry = new THREE.BoxGeometry(0.8, 1, 0.05);
            const cardMaterial = new THREE.MeshBasicMaterial({ 
                color: [0x3498db, 0xe74c3c, 0x2ecc71][i],
                transparent: true,
                opacity: 0.8
            });
            const card = new THREE.Mesh(cardGeometry, cardMaterial);
            
            const angle = (i / 3) * Math.PI * 2;
            card.position.set(
                Math.cos(angle) * 1.5,
                0,
                Math.sin(angle) * 1.5
            );
            card.rotation.y = -angle;
            
            carouselGroup.add(card);
            projectCards.push(card);
        }

        // Showcase stand
        const standGeometry = new THREE.CylinderGeometry(0.5, 0.7, 0.2, 8);
        const standMaterial = new THREE.MeshBasicMaterial({ 
            color: 0xf39c12,
            transparent: true,
            opacity: 0.6
        });
        const stand = new THREE.Mesh(standGeometry, standMaterial);
        stand.position.y = -0.7;
        carouselGroup.add(stand);

        scene.add(carouselGroup);
        camera.position.set(0, 1, 3);
        camera.lookAt(0, 0, 0);

        let selectedProject = 0;

        const animate = () => {
            requestAnimationFrame(animate);
            
            carouselGroup.rotation.y += 0.01;
            
            // Highlight selected project
            projectCards.forEach((card, index) => {
                if (index === selectedProject) {
                    card.scale.setScalar(1.2);
                    card.material.opacity = 1;
                } else {
                    card.scale.setScalar(1);
                    card.material.opacity = 0.6;
                }
            });
            
            renderer.render(scene, camera);
        };
        animate();

        // Project selection on hover
        document.querySelectorAll('.project-card').forEach((card, index) => {
            card.addEventListener('mouseenter', () => {
                selectedProject = index;
            });
        });
    }

    // 5. Education DNA Helix
    createEducationBook() {
        const container = document.getElementById('education-3d');
        if (!container) return;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        
        renderer.setSize(180, 180);
        container.appendChild(renderer.domElement);

        const educationGroup = new THREE.Group();

        // DNA Helix structure representing knowledge growth
        const helixPoints1 = [];
        const helixPoints2 = [];
        const knowledgeNodes = [];
        
        for (let i = 0; i <= 100; i++) {
            const t = i / 100;
            const y = t * 3 - 1.5;
            const angle1 = t * Math.PI * 8;
            const angle2 = angle1 + Math.PI;
            const radius = 0.5;
            
            // First helix strand
            helixPoints1.push(new THREE.Vector3(
                Math.cos(angle1) * radius,
                y,
                Math.sin(angle1) * radius
            ));
            
            // Second helix strand
            helixPoints2.push(new THREE.Vector3(
                Math.cos(angle2) * radius,
                y,
                Math.sin(angle2) * radius
            ));
            
            // Knowledge nodes (connecting bars)
            if (i % 10 === 0) {
                const nodeGeometry = new THREE.SphereGeometry(0.05, 8, 8);
                const nodeMaterial = new THREE.MeshBasicMaterial({ 
                    color: [0xff6b6b, 0x4ecdc4, 0xffe66d, 0xa8e6cf][Math.floor(i/25)],
                    transparent: true,
                    opacity: 0.8
                });
                const node = new THREE.Mesh(nodeGeometry, nodeMaterial);
                node.position.set(
                    Math.cos(angle1) * radius,
                    y,
                    Math.sin(angle1) * radius
                );
                educationGroup.add(node);
                knowledgeNodes.push(node);
                
                // Connecting line between strands
                const lineGeometry = new THREE.BufferGeometry().setFromPoints([
                    new THREE.Vector3(
                        Math.cos(angle1) * radius,
                        y,
                        Math.sin(angle1) * radius
                    ),
                    new THREE.Vector3(
                        Math.cos(angle2) * radius,
                        y,
                        Math.sin(angle2) * radius
                    )
                ]);
                const lineMaterial = new THREE.LineBasicMaterial({ 
                    color: 0x00ffff,
                    transparent: true,
                    opacity: 0.6
                });
                const line = new THREE.Line(lineGeometry, lineMaterial);
                educationGroup.add(line);
            }
        }
        
        // Create helix strands
        const helix1Geometry = new THREE.BufferGeometry().setFromPoints(helixPoints1);
        const helix1Material = new THREE.LineBasicMaterial({ 
            color: 0x3498db,
            linewidth: 3
        });
        const helix1 = new THREE.Line(helix1Geometry, helix1Material);
        educationGroup.add(helix1);
        
        const helix2Geometry = new THREE.BufferGeometry().setFromPoints(helixPoints2);
        const helix2Material = new THREE.LineBasicMaterial({ 
            color: 0xe74c3c,
            linewidth: 3
        });
        const helix2 = new THREE.Line(helix2Geometry, helix2Material);
        educationGroup.add(helix2);

        // Floating brain neurons
        const neurons = [];
        for (let i = 0; i < 20; i++) {
            const neuronGeometry = new THREE.SphereGeometry(0.03, 6, 6);
            const neuronMaterial = new THREE.MeshBasicMaterial({ 
                color: 0xffd700,
                transparent: true,
                opacity: 0.8
            });
            const neuron = new THREE.Mesh(neuronGeometry, neuronMaterial);
            
            neuron.position.set(
                (Math.random() - 0.5) * 3,
                (Math.random() - 0.5) * 3,
                (Math.random() - 0.5) * 3
            );
            
            educationGroup.add(neuron);
            neurons.push({
                mesh: neuron,
                velocity: new THREE.Vector3(
                    (Math.random() - 0.5) * 0.02,
                    (Math.random() - 0.5) * 0.02,
                    (Math.random() - 0.5) * 0.02
                )
            });
        }

        // Holographic graduation cap at top
        const capGeometry = new THREE.ConeGeometry(0.4, 0.2, 6);
        const capMaterial = new THREE.MeshBasicMaterial({ 
            color: 0x9b59b6,
            transparent: true,
            opacity: 0.7,
            wireframe: true
        });
        const cap = new THREE.Mesh(capGeometry, capMaterial);
        cap.position.y = 2;
        educationGroup.add(cap);

        scene.add(educationGroup);
        camera.position.set(2, 1, 2);
        camera.lookAt(0, 0, 0);

        const animate = () => {
            requestAnimationFrame(animate);
            
            const time = Date.now() * 0.001;
            
            // Rotate DNA helix
            educationGroup.rotation.y += 0.01;
            
            // Pulsing knowledge nodes
            knowledgeNodes.forEach((node, index) => {
                const pulse = 1 + Math.sin(time * 3 + index * 0.5) * 0.3;
                node.scale.setScalar(pulse);
            });
            
            // Floating neurons with connections
            neurons.forEach((neuronObj, index) => {
                neuronObj.mesh.position.add(neuronObj.velocity);
                
                // Bounce off boundaries
                if (Math.abs(neuronObj.mesh.position.x) > 1.5) neuronObj.velocity.x *= -1;
                if (Math.abs(neuronObj.mesh.position.y) > 1.5) neuronObj.velocity.y *= -1;
                if (Math.abs(neuronObj.mesh.position.z) > 1.5) neuronObj.velocity.z *= -1;
                
                // Glowing effect
                neuronObj.mesh.material.opacity = 0.5 + Math.sin(time * 2 + index) * 0.3;
            });
            
            // Floating graduation cap
            cap.position.y = 2 + Math.sin(time) * 0.2;
            cap.rotation.y += 0.02;
            
            renderer.render(scene, camera);
        };
        animate();
    }

    // 6. Certifications Crystal Constellation
    createCertificationsMedal() {
        const container = document.getElementById('certifications-3d');
        if (!container) return;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, 200/150, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        
        renderer.setSize(200, 150);
        container.appendChild(renderer.domElement);

        const constellationGroup = new THREE.Group();

        // Central achievement crystal
        const crystalGeometry = new THREE.OctahedronGeometry(0.5);
        const crystalMaterial = new THREE.MeshBasicMaterial({ 
            color: 0x9b59b6,
            transparent: true,
            opacity: 0.8,
            wireframe: true
        });
        const crystal = new THREE.Mesh(crystalGeometry, crystalMaterial);
        constellationGroup.add(crystal);

        // Inner glowing core
        const coreGeometry = new THREE.SphereGeometry(0.2, 16, 16);
        const coreMaterial = new THREE.MeshBasicMaterial({ 
            color: 0xffd700,
            transparent: true,
            opacity: 0.6
        });
        const core = new THREE.Mesh(coreGeometry, coreMaterial);
        constellationGroup.add(core);

        // Orbiting certification badges
        const badges = [];
        const badgeColors = [0x3498db, 0xe74c3c, 0x2ecc71, 0xf39c12];
        const badgeNames = ['AWS', 'Python', 'Analytics', 'AI'];
        
        badgeColors.forEach((color, index) => {
            // Badge crystal
            const badgeGeometry = new THREE.TetrahedronGeometry(0.15);
            const badgeMaterial = new THREE.MeshBasicMaterial({ 
                color: color,
                transparent: true,
                opacity: 0.8
            });
            const badge = new THREE.Mesh(badgeGeometry, badgeMaterial);
            
            const angle = (index / badgeColors.length) * Math.PI * 2;
            const radius = 1.2;
            badge.position.set(
                Math.cos(angle) * radius,
                Math.sin(angle * 0.5) * 0.3,
                Math.sin(angle) * radius
            );
            
            constellationGroup.add(badge);
            
            // Energy trail
            const trailParticles = [];
            for (let i = 0; i < 8; i++) {
                const particleGeometry = new THREE.SphereGeometry(0.02, 6, 6);
                const particleMaterial = new THREE.MeshBasicMaterial({ 
                    color: color,
                    transparent: true,
                    opacity: 0.6 - i * 0.07
                });
                const particle = new THREE.Mesh(particleGeometry, particleMaterial);
                constellationGroup.add(particle);
                trailParticles.push(particle);
            }
            
            badges.push({ 
                mesh: badge, 
                angle: angle, 
                color: color,
                trail: trailParticles,
                radius: radius
            });
        });

        // Connecting energy beams
        const connections = [];
        for (let i = 0; i < badges.length; i++) {
            const points = [
                new THREE.Vector3(0, 0, 0), // Center
                badges[i].mesh.position.clone()
            ];
            
            const connectionGeometry = new THREE.BufferGeometry().setFromPoints(points);
            const connectionMaterial = new THREE.LineBasicMaterial({ 
                color: badges[i].color,
                transparent: true,
                opacity: 0.4
            });
            const connection = new THREE.Line(connectionGeometry, connectionMaterial);
            constellationGroup.add(connection);
            connections.push({ line: connection, badge: badges[i] });
        }

        // Achievement aura
        const auraGeometry = new THREE.RingGeometry(1.5, 2, 32);
        const auraMaterial = new THREE.MeshBasicMaterial({ 
            color: 0xffd700,
            transparent: true,
            opacity: 0.2
        });
        const aura = new THREE.Mesh(auraGeometry, auraMaterial);
        aura.rotation.x = -Math.PI / 2;
        constellationGroup.add(aura);

        // Success sparkles
        const sparkles = [];
        for (let i = 0; i < 25; i++) {
            const sparkleGeometry = new THREE.SphereGeometry(0.01, 4, 4);
            const sparkleMaterial = new THREE.MeshBasicMaterial({ 
                color: 0xffffff,
                transparent: true,
                opacity: Math.random() * 0.8 + 0.2
            });
            const sparkle = new THREE.Mesh(sparkleGeometry, sparkleMaterial);
            
            sparkle.position.set(
                (Math.random() - 0.5) * 4,
                (Math.random() - 0.5) * 2,
                (Math.random() - 0.5) * 4
            );
            
            constellationGroup.add(sparkle);
            sparkles.push(sparkle);
        }

        scene.add(constellationGroup);
        camera.position.set(2, 1.5, 2);
        camera.lookAt(0, 0, 0);

        const animate = () => {
            requestAnimationFrame(animate);
            
            const time = Date.now() * 0.001;
            
            // Rotate constellation
            constellationGroup.rotation.y += 0.005;
            
            // Pulsing central crystal
            crystal.rotation.x += 0.02;
            crystal.rotation.y += 0.01;
            const crystalScale = 1 + Math.sin(time * 2) * 0.2;
            crystal.scale.setScalar(crystalScale);
            
            // Glowing core
            core.scale.setScalar(1 + Math.sin(time * 3) * 0.3);
            
            // Orbiting badges with trails
            badges.forEach((badgeObj, index) => {
                const orbitTime = time * 0.5 + index * Math.PI / 2;
                const newAngle = badgeObj.angle + orbitTime;
                const verticalOffset = Math.sin(orbitTime * 2) * 0.2;
                
                badgeObj.mesh.position.set(
                    Math.cos(newAngle) * badgeObj.radius,
                    verticalOffset,
                    Math.sin(newAngle) * badgeObj.radius
                );
                
                badgeObj.mesh.rotation.x += 0.03;
                badgeObj.mesh.rotation.y += 0.02;
                
                // Update trail
                badgeObj.trail.forEach((particle, pIndex) => {
                    const trailAngle = newAngle - (pIndex + 1) * 0.1;
                    particle.position.set(
                        Math.cos(trailAngle) * badgeObj.radius,
                        verticalOffset,
                        Math.sin(trailAngle) * badgeObj.radius
                    );
                });
            });
            
            // Update connection lines
            connections.forEach(conn => {
                const points = [
                    new THREE.Vector3(0, 0, 0),
                    conn.badge.mesh.position.clone()
                ];
                conn.line.geometry.setFromPoints(points);
            });
            
            // Rotating aura
            aura.rotation.z += 0.01;
            aura.material.opacity = 0.1 + Math.sin(time) * 0.1;
            
            // Twinkling sparkles
            sparkles.forEach((sparkle, index) => {
                sparkle.material.opacity = Math.sin(time * 3 + index) * 0.5 + 0.3;
                sparkle.rotation.x += 0.02;
                sparkle.rotation.y += 0.02;
            });
            
            renderer.render(scene, camera);
        };
        animate();
    }

    // 7. Contact Envelope
    createContactEnvelope() {
        const container = document.getElementById('contact-3d');
        if (!container) return;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, 250/200, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        
        renderer.setSize(250, 200);
        container.appendChild(renderer.domElement);

        const envelopeGroup = new THREE.Group();

        // Envelope base
        const baseGeometry = new THREE.BoxGeometry(1.6, 1, 0.05);
        const baseMaterial = new THREE.MeshBasicMaterial({ color: 0xecf0f1 });
        const base = new THREE.Mesh(baseGeometry, baseMaterial);
        envelopeGroup.add(base);

        // Envelope flap
        const flapGeometry = new THREE.BoxGeometry(1.6, 0.8, 0.05);
        const flapMaterial = new THREE.MeshBasicMaterial({ color: 0xbdc3c7 });
        const flap = new THREE.Mesh(flapGeometry, flapMaterial);
        flap.position.y = 0.4;
        flap.rotation.x = -Math.PI / 6;
        envelopeGroup.add(flap);

        // Social media icons orbiting
        const socialIcons = [];
        const iconColors = [0x3498db, 0xe74c3c, 0x2ecc71, 0xf39c12];
        
        for (let i = 0; i < 4; i++) {
            const iconGeometry = new THREE.SphereGeometry(0.1, 8, 8);
            const iconMaterial = new THREE.MeshBasicMaterial({ color: iconColors[i] });
            const icon = new THREE.Mesh(iconGeometry, iconMaterial);
            
            const angle = (i / 4) * Math.PI * 2;
            icon.position.set(
                Math.cos(angle) * 1.5,
                Math.sin(angle * 0.5) * 0.3,
                Math.sin(angle) * 1.5
            );
            
            envelopeGroup.add(icon);
            socialIcons.push({ mesh: icon, angle: angle });
        }

        scene.add(envelopeGroup);
        camera.position.set(2, 1, 2);
        camera.lookAt(0, 0, 0);

        const animate = () => {
            requestAnimationFrame(animate);
            
            // Floating envelope
            const time = Date.now() * 0.002;
            envelopeGroup.position.y = Math.sin(time) * 0.1;
            
            // Flap animation
            flap.rotation.x = -Math.PI / 6 + Math.sin(time * 2) * 0.1;
            
            // Orbiting social icons
            socialIcons.forEach((iconObj, index) => {
                const orbitTime = Date.now() * 0.001;
                const angle = iconObj.angle + orbitTime;
                iconObj.mesh.position.x = Math.cos(angle) * 1.5;
                iconObj.mesh.position.z = Math.sin(angle) * 1.5;
                iconObj.mesh.rotation.y += 0.05;
            });
            
            renderer.render(scene, camera);
        };
        animate();
    }

    // Setup scroll animations
    setupScrollAnimations() {
        // Animate sections on scroll
        gsap.utils.toArray('.section').forEach((section, index) => {
            gsap.fromTo(section, 
                { opacity: 0, y: 100 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: section,
                        start: "top 80%",
                        end: "bottom 20%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        });

        // Animate skill cards
        gsap.utils.toArray('.skill-card').forEach((card, index) => {
            gsap.fromTo(card,
                { opacity: 0, scale: 0.8, rotationY: -90 },
                {
                    opacity: 1,
                    scale: 1,
                    rotationY: 0,
                    duration: 0.8,
                    delay: index * 0.1,
                    ease: "back.out(1.7)",
                    scrollTrigger: {
                        trigger: card,
                        start: "top 85%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        });

        // Animate project cards
        gsap.utils.toArray('.project-card').forEach((card, index) => {
            gsap.fromTo(card,
                { opacity: 0, x: index % 2 === 0 ? -100 : 100 },
                {
                    opacity: 1,
                    x: 0,
                    duration: 0.8,
                    delay: index * 0.2,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: card,
                        start: "top 85%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        });
    }
}

// Initialize the 3D portfolio
const portfolio3D = new Portfolio3D();