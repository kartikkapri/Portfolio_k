// 3D Models for Skills Section
class Skills3D {
    constructor() {
        this.models = {};
        this.init();
    }

    init() {
        // Wait for DOM to load
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.createModels());
        } else {
            this.createModels();
        }
    }

    createModels() {
        // Programming Cube
        this.createProgrammingCube();
        
        // Analytics Robot
        this.createAnalyticsRobot();
        
        // Business Chart
        this.createBusinessChart();
        
        // Web Laptop
        this.createWebLaptop();
        
        // Cloud Model
        this.createCloudModel();
        
        // Soft Skills Handshake
        this.createHandshakeModel();
    }

    createProgrammingCube() {
        const container = document.getElementById('programming-3d');
        if (!container) return;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        
        renderer.setSize(120, 120);
        renderer.setClearColor(0x000000, 0);
        container.innerHTML = '';
        container.appendChild(renderer.domElement);

        // Create cube with different colored faces
        const geometry = new THREE.BoxGeometry(1.5, 1.5, 1.5);
        const materials = [
            new THREE.MeshBasicMaterial({ color: 0x3b82f6 }), // Blue
            new THREE.MeshBasicMaterial({ color: 0x8b5cf6 }), // Purple
            new THREE.MeshBasicMaterial({ color: 0x06b6d4 }), // Cyan
            new THREE.MeshBasicMaterial({ color: 0x10b981 }), // Green
            new THREE.MeshBasicMaterial({ color: 0xf59e0b }), // Orange
            new THREE.MeshBasicMaterial({ color: 0xef4444 })  // Red
        ];

        const cube = new THREE.Mesh(geometry, materials);
        scene.add(cube);

        camera.position.z = 3;

        // Animation
        const animate = () => {
            requestAnimationFrame(animate);
            cube.rotation.x += 0.01;
            cube.rotation.y += 0.01;
            renderer.render(scene, camera);
        };
        animate();

        this.models.programming = { scene, camera, renderer, mesh: cube };
    }

    createAnalyticsRobot() {
        const container = document.getElementById('analytics-3d');
        if (!container) return;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        
        renderer.setSize(120, 120);
        renderer.setClearColor(0x000000, 0);
        container.innerHTML = '';
        container.appendChild(renderer.domElement);

        // Create simple robot
        const robotGroup = new THREE.Group();

        // Head
        const headGeometry = new THREE.BoxGeometry(0.8, 0.8, 0.8);
        const headMaterial = new THREE.MeshBasicMaterial({ color: 0x10b981 });
        const head = new THREE.Mesh(headGeometry, headMaterial);
        head.position.y = 0.5;
        robotGroup.add(head);

        // Eyes
        const eyeGeometry = new THREE.SphereGeometry(0.1, 8, 8);
        const eyeMaterial = new THREE.MeshBasicMaterial({ color: 0x3b82f6 });
        
        const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
        leftEye.position.set(-0.2, 0.6, 0.4);
        robotGroup.add(leftEye);
        
        const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
        rightEye.position.set(0.2, 0.6, 0.4);
        robotGroup.add(rightEye);

        // Body
        const bodyGeometry = new THREE.CylinderGeometry(0.5, 0.5, 1, 8);
        const bodyMaterial = new THREE.MeshBasicMaterial({ color: 0x06b6d4 });
        const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
        body.position.y = -0.3;
        robotGroup.add(body);

        scene.add(robotGroup);
        camera.position.z = 3;

        // Animation
        const animate = () => {
            requestAnimationFrame(animate);
            robotGroup.rotation.y += 0.02;
            head.rotation.x = Math.sin(Date.now() * 0.003) * 0.2;
            renderer.render(scene, camera);
        };
        animate();

        this.models.analytics = { scene, camera, renderer, mesh: robotGroup };
    }

    createBusinessChart() {
        const container = document.getElementById('business-3d');
        if (!container) return;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        
        renderer.setSize(120, 120);
        renderer.setClearColor(0x000000, 0);
        container.innerHTML = '';
        container.appendChild(renderer.domElement);

        const chartGroup = new THREE.Group();
        const bars = [];

        // Create animated bars
        const barData = [0.5, 1.2, 0.8, 1.5, 1.0];
        const colors = [0xf59e0b, 0xef4444, 0x10b981, 0x3b82f6, 0x8b5cf6];

        barData.forEach((height, index) => {
            const barGeometry = new THREE.BoxGeometry(0.3, height, 0.3);
            const barMaterial = new THREE.MeshBasicMaterial({ color: colors[index] });
            const bar = new THREE.Mesh(barGeometry, barMaterial);
            
            bar.position.x = (index - 2) * 0.5;
            bar.position.y = height / 2;
            
            chartGroup.add(bar);
            bars.push({ mesh: bar, originalHeight: height });
        });

        scene.add(chartGroup);
        camera.position.set(2, 1, 3);
        camera.lookAt(0, 0, 0);

        // Animation
        const animate = () => {
            requestAnimationFrame(animate);
            chartGroup.rotation.y += 0.01;
            
            // Animate bar heights
            bars.forEach((barObj, index) => {
                const time = Date.now() * 0.002;
                const newHeight = barObj.originalHeight + Math.sin(time + index) * 0.2;
                barObj.mesh.scale.y = Math.max(0.1, newHeight / barObj.originalHeight);
            });
            
            renderer.render(scene, camera);
        };
        animate();

        this.models.business = { scene, camera, renderer, mesh: chartGroup };
    }

    createWebLaptop() {
        const container = document.getElementById('web-3d');
        if (!container) return;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        
        renderer.setSize(120, 120);
        renderer.setClearColor(0x000000, 0);
        container.innerHTML = '';
        container.appendChild(renderer.domElement);

        const laptopGroup = new THREE.Group();

        // Laptop base
        const baseGeometry = new THREE.BoxGeometry(2, 0.1, 1.5);
        const baseMaterial = new THREE.MeshBasicMaterial({ color: 0x374151 });
        const base = new THREE.Mesh(baseGeometry, baseMaterial);
        laptopGroup.add(base);

        // Screen
        const screenGeometry = new THREE.BoxGeometry(1.8, 1.2, 0.05);
        const screenMaterial = new THREE.MeshBasicMaterial({ color: 0x1f2937 });
        const screen = new THREE.Mesh(screenGeometry, screenMaterial);
        screen.position.set(0, 0.6, -0.7);
        screen.rotation.x = -0.2;
        laptopGroup.add(screen);

        // Screen content (glowing)
        const contentGeometry = new THREE.PlaneGeometry(1.6, 1);
        const contentMaterial = new THREE.MeshBasicMaterial({ 
            color: 0x3b82f6, 
            transparent: true, 
            opacity: 0.8 
        });
        const content = new THREE.Mesh(contentGeometry, contentMaterial);
        content.position.set(0, 0.6, -0.67);
        content.rotation.x = -0.2;
        laptopGroup.add(content);

        scene.add(laptopGroup);
        camera.position.set(2, 1, 3);
        camera.lookAt(0, 0, 0);

        // Animation
        const animate = () => {
            requestAnimationFrame(animate);
            laptopGroup.rotation.y += 0.01;
            
            // Pulsing screen effect
            const time = Date.now() * 0.003;
            content.material.opacity = 0.6 + Math.sin(time) * 0.2;
            
            renderer.render(scene, camera);
        };
        animate();

        this.models.web = { scene, camera, renderer, mesh: laptopGroup };
    }

    createCloudModel() {
        const container = document.getElementById('cloud-3d');
        if (!container) return;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        
        renderer.setSize(120, 120);
        renderer.setClearColor(0x000000, 0);
        container.innerHTML = '';
        container.appendChild(renderer.domElement);

        const cloudGroup = new THREE.Group();

        // Create cloud from spheres
        const cloudSpheres = [];
        for (let i = 0; i < 8; i++) {
            const sphereGeometry = new THREE.SphereGeometry(0.3 + Math.random() * 0.2, 8, 8);
            const sphereMaterial = new THREE.MeshBasicMaterial({ 
                color: 0x60a5fa, 
                transparent: true, 
                opacity: 0.8 
            });
            const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
            
            sphere.position.set(
                (Math.random() - 0.5) * 2,
                (Math.random() - 0.5) * 0.8,
                (Math.random() - 0.5) * 0.8
            );
            
            cloudGroup.add(sphere);
            cloudSpheres.push(sphere);
        }

        // Data connection lines
        const points = [];
        for (let i = 0; i < 20; i++) {
            points.push(new THREE.Vector3(
                (Math.random() - 0.5) * 4,
                (Math.random() - 0.5) * 2,
                (Math.random() - 0.5) * 2
            ));
        }
        
        const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
        const lineMaterial = new THREE.LineBasicMaterial({ 
            color: 0x10b981, 
            transparent: true, 
            opacity: 0.6 
        });
        const line = new THREE.Line(lineGeometry, lineMaterial);
        cloudGroup.add(line);

        scene.add(cloudGroup);
        camera.position.z = 4;

        // Animation
        const animate = () => {
            requestAnimationFrame(animate);
            cloudGroup.rotation.y += 0.01;
            
            // Float cloud spheres
            cloudSpheres.forEach((sphere, index) => {
                const time = Date.now() * 0.001;
                sphere.position.y += Math.sin(time + index) * 0.002;
            });
            
            renderer.render(scene, camera);
        };
        animate();

        this.models.cloud = { scene, camera, renderer, mesh: cloudGroup };
    }

    createHandshakeModel() {
        const container = document.getElementById('soft-3d');
        if (!container) return;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        
        renderer.setSize(120, 120);
        renderer.setClearColor(0x000000, 0);
        container.innerHTML = '';
        container.appendChild(renderer.domElement);

        const handshakeGroup = new THREE.Group();

        // Left hand
        const hand1Geometry = new THREE.CylinderGeometry(0.15, 0.15, 1, 8);
        const hand1Material = new THREE.MeshBasicMaterial({ color: 0xf59e0b });
        const hand1 = new THREE.Mesh(hand1Geometry, hand1Material);
        hand1.position.set(-0.5, 0, 0);
        hand1.rotation.z = Math.PI / 4;
        handshakeGroup.add(hand1);

        // Right hand
        const hand2Geometry = new THREE.CylinderGeometry(0.15, 0.15, 1, 8);
        const hand2Material = new THREE.MeshBasicMaterial({ color: 0x8b5cf6 });
        const hand2 = new THREE.Mesh(hand2Geometry, hand2Material);
        hand2.position.set(0.5, 0, 0);
        hand2.rotation.z = -Math.PI / 4;
        handshakeGroup.add(hand2);

        // Connection point
        const connectionGeometry = new THREE.SphereGeometry(0.2, 8, 8);
        const connectionMaterial = new THREE.MeshBasicMaterial({ 
            color: 0x10b981, 
            transparent: true, 
            opacity: 0.8 
        });
        const connection = new THREE.Mesh(connectionGeometry, connectionMaterial);
        handshakeGroup.add(connection);

        // Sparkle effects
        const sparkles = [];
        for (let i = 0; i < 6; i++) {
            const sparkleGeometry = new THREE.SphereGeometry(0.05, 4, 4);
            const sparkleMaterial = new THREE.MeshBasicMaterial({ 
                color: 0xfbbf24,
                transparent: true,
                opacity: 0.8
            });
            const sparkle = new THREE.Mesh(sparkleGeometry, sparkleMaterial);
            
            sparkle.position.set(
                (Math.random() - 0.5) * 2,
                (Math.random() - 0.5) * 2,
                (Math.random() - 0.5) * 2
            );
            
            handshakeGroup.add(sparkle);
            sparkles.push(sparkle);
        }

        scene.add(handshakeGroup);
        camera.position.z = 3;

        // Animation
        const animate = () => {
            requestAnimationFrame(animate);
            handshakeGroup.rotation.y += 0.02;
            
            // Animate connection glow
            const time = Date.now() * 0.005;
            connection.scale.setScalar(1 + Math.sin(time) * 0.2);
            
            // Animate sparkles
            sparkles.forEach((sparkle, index) => {
                sparkle.rotation.x += 0.02;
                sparkle.rotation.y += 0.02;
                sparkle.material.opacity = 0.5 + Math.sin(time + index) * 0.3;
            });
            
            renderer.render(scene, camera);
        };
        animate();

        this.models.soft = { scene, camera, renderer, mesh: handshakeGroup };
    }
}

// Initialize 3D models when page loads
const skills3D = new Skills3D();