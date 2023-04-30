import React, { useEffect } from 'react';
import * as THREE from 'three';

function Error404() {
    useEffect(() => {
        let container = document.getElementById('container');
        let renderer = new THREE.WebGLRenderer({ antialias: true });
        let camera = new THREE.PerspectiveCamera(80, 1, 0.1, 10000);
        let scene = new THREE.Scene();
        scene.add(camera);
        renderer.setSize(300, 300);
        container.appendChild(renderer.domElement);

        // Camera
        camera.position.z = 200;

        // Material
        let pinkMat = new THREE.MeshPhongMaterial({
            color: new THREE.Color('rgb(226,35,213)'),
            emissive: new THREE.Color('rgb(0,0,0)'),
            specular: new THREE.Color('rgb(255,155,255)'),
            shininess: 100,
            shading: THREE.FlatShading,
            transparent: 1,
            opacity: 1,
        });

        let L1 = new THREE.PointLight(0xffffff, 1);
        L1.position.z = 100;
        L1.position.y = 100;
        L1.position.x = 100;
        scene.add(L1);

        let L2 = new THREE.PointLight(0xffffff, 0.8);
        L2.position.z = 200;
        L2.position.y = 400;
        L2.position.x = -100;
        scene.add(L2);

        // IcoSphere -> THREE.IcosahedronGeometry(80, 1) 1-4
        let Ico = new THREE.Mesh(new THREE.IcosahedronGeometry(75, 1), pinkMat);
        Ico.rotation.z = 0.5;
        scene.add(Ico);

        function update() {
            Ico.rotation.x += 2 / 100;
            Ico.rotation.y += 2 / 100;
        }

        // Render
        function render() {
            requestAnimationFrame(render);
            renderer.render(scene, camera);
            update();
        }

        render();
    }, []);

    return (
        <div
            style={{
                background: '#f5f5f5',
                fontFamily: "'Roboto', sans-serif",
                textAlign: 'center',
                padding: '100px 0',
                color: '#333',
                fontSize: '14px',
                lineHeight: '1.5',
                position: 'relative',
                height: '100vh',
            }}
        >
            <div
                className="mega"
                style={{
                    lineHeight: '1.65em',
                    fontWeight: 'bold',
                    fontSize: '11em',
                    color: 'black',
                    fontFamily: "'Roboto', sans-serif",
                    width: '300px',
                    height: '300px',
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    marginLeft: '-150px',
                    marginTop: '-150px',
                }}
            >
                4
                <span className="boom" style={{ color: '#f5f5f5' }}>
          0
        </span>
                4
                <span id="container" style={{ position: 'absolute', top: 0 }}></span>
            </div>
            <div
                className="mini"
                style={{
                    fontSize: '1em',
                    color: '#000',
                    lineHeight: '9em',
                    textIndent: '2.5em',
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                }}
            >
                Page Not Found.
            </div>
        </div>
    );
}

export default Error404;