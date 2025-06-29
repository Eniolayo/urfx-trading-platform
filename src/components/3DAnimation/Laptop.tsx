import { JSX, useRef, useEffect } from "react";
import * as THREE from "three";
import { useGLTF, useVideoTexture } from "@react-three/drei";
import { Group } from "three";
import { useFrame, useThree } from "@react-three/fiber";

function Laptop(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF("/glb/laptop.glb");
  const screen = useRef<Group>(null!);

  const groupRef = useRef<Group>(null!);
  const { camera } = useThree();

  // video texture
  const texture = useVideoTexture("/assets/laptop.mp4", {
    muted: true,
    loop: true,
    autoplay: true,
  });

  // Set flipY property directly on the texture
  useEffect(() => {
    if (texture) {
      texture.flipY = false;
    }
  }, [texture]);

  // Camera animation path points
  const isMobile = window.innerWidth <= 768;
  const z = isMobile ? 4.5 : 3;
  const finalZ = isMobile ? 4.3 : 1.5; // Adjusted for mobile

  const cameraPositions = [
    { x: 0, y: 8, z: 3 }, // Top view
    { x: 0, y: 6, z }, // Back view
    { x: 0, y: 4, z }, // Front view
    { x: 0, y: 3.4, z: finalZ }, // Zoomed into screen view
  ];

  useFrame(() => {
    const scrollTop = document.documentElement.scrollTop;
    let scrollProgress = 0;
    // Dynamically calculate the scroll range based on window width
    // console.log(scrollTop);
    // Define breakpoints
    const sm = 640; // Small screens
    const md = 768; // Medium screens

    // Set startScroll and endScroll based on window width
    let startScroll = 4800;
    let endScroll = 5300;

    if (window.innerWidth <= sm) {
      startScroll = 8800; // Example values for small screens
      endScroll = 9400;
    } else if (window.innerWidth <= md) {
      startScroll = 7600; // Example values for medium screens
      endScroll = 8100;
    } else {
      startScroll = 4800; // Example values for large screens
      endScroll = 5300;
    }

    // console.log("comparedTop", laptopAnimationDiv, comparedTop);
    if (scrollTop > startScroll && scrollTop < endScroll) {
      scrollProgress = (scrollTop - startScroll) / (endScroll - startScroll);
    } else if (scrollTop >= endScroll) {
      scrollProgress = 1;
    }
    // const viewportHeight = window.innerHeight; // Get the viewport height dynamically
    // const startScroll = 5 * viewportHeight; // Adjust start range (e.g., 6x viewport height)
    // const endScroll = 5.7 * viewportHeight; // Adjust end range (e.g., 6.625x viewport height)
    // console.log("ViewportHeight: ", viewportHeight);

    // const scrollTop = document.documentElement.scrollTop;
    // let scrollProgress = 0;

    // if (scrollTop > startScroll && scrollTop < endScroll) {
    //   scrollProgress = (scrollTop - startScroll) / (endScroll - startScroll);
    // } else if (scrollTop >= endScroll) {
    //   scrollProgress = 1;
    // }

    // Animate laptop screen
    const rotationValue = Math.PI - scrollProgress * (Math.PI / 2);
    screen.current.rotation.x = rotationValue;

    const groupRotation = Math.PI - scrollProgress * Math.PI;
    groupRef.current.rotation.y = groupRotation;

    // Animate camera position based on scroll with 4 steps
    let cameraPosition;
    if (scrollProgress < 0.33) {
      // First third of scroll (0-0.33 -> 0-1)
      const normalizedProgress = scrollProgress * 3;
      cameraPosition = {
        x:
          cameraPositions[0].x +
          normalizedProgress * (cameraPositions[1].x - cameraPositions[0].x),
        y:
          cameraPositions[0].y +
          normalizedProgress * (cameraPositions[1].y - cameraPositions[0].y),
        z:
          cameraPositions[0].z +
          normalizedProgress * (cameraPositions[1].z - cameraPositions[0].z),
      };
    } else if (scrollProgress < 0.66) {
      // Second third of scroll (0.33-0.66 -> 0-1)
      const normalizedProgress = (scrollProgress - 0.33) * 3;
      cameraPosition = {
        x:
          cameraPositions[1].x +
          normalizedProgress * (cameraPositions[2].x - cameraPositions[1].x),
        y:
          cameraPositions[1].y +
          normalizedProgress * (cameraPositions[2].y - cameraPositions[1].y),
        z:
          cameraPositions[1].z +
          normalizedProgress * (cameraPositions[2].z - cameraPositions[1].z),
      };
    } else {
      // Final third of scroll (0.66-1 -> 0-1)
      const normalizedProgress = (scrollProgress - 0.66) * 3;
      cameraPosition = {
        x:
          cameraPositions[2].x +
          normalizedProgress * (cameraPositions[3].x - cameraPositions[2].x),
        y:
          cameraPositions[2].y +
          normalizedProgress * (cameraPositions[3].y - cameraPositions[2].y),
        z:
          cameraPositions[2].z +
          normalizedProgress * (cameraPositions[3].z - cameraPositions[2].z),
      };
    }

    // Update camera position
    camera.position.set(cameraPosition.x, cameraPosition.y, cameraPosition.z);

    // Always look at the laptop
    camera.lookAt(0, 3.4, 0);
  });

  return (
    <group {...props} dispose={null} ref={groupRef}>
      <group name="Scene">
        <group
          name="screenflip"
          position={[-0.044, 3.439, -0.543]}
          rotation={[0.014, 0, 0]}
          scale={0.198}
        >
          <group
            name="screen"
            position={[-0.028, 0.033, 0.061]}
            // rotation={[3.129, 0, 0]}
            rotation={[Math.PI / 4, 0, 0]}
            ref={screen}
          >
            <mesh
              name="Cube008"
              castShadow
              receiveShadow
              // @ts-exprect-error
              geometry={(nodes.Cube008 as THREE.Mesh).geometry}
              material={materials.aluminium}
            />
            <mesh
              name="Cube008_1"
              castShadow
              receiveShadow
              // @ts-exprect-error
              geometry={(nodes.Cube008_1 as THREE.Mesh).geometry}
              material={materials["matte.001"]}
            />

            {/* Display */}
            <mesh
              name="Cube008_2"
              castShadow
              receiveShadow
              // @ts-exprect-error
              geometry={(nodes.Cube008_2 as THREE.Mesh).geometry}
            >
              <meshStandardMaterial
                attach="material"
                color="#fff"
                emissiveIntensity={0.5}
                roughness={0.2}
                metalness={0.1}
                map={texture}
              />
            </mesh>

            <mesh
              name="Cube008_3"
              castShadow
              receiveShadow
              // @ts-ignore
              geometry={nodes.Cube008_3.geometry}
              material={materials.Empty}
              position={[0, 0, 0.02]}
            />
          </group>
        </group>
        <mesh
          name="keyboard"
          castShadow
          receiveShadow
          // @ts-ignore
          geometry={nodes.keyboard.geometry}
          material={materials.keys}
          position={[0.31, 3.446, 0.058]}
          scale={0.198}
        />
        <group name="base" position={[-0.045, 3.426, 0.047]} scale={0.198}>
          <mesh
            name="Cube002"
            castShadow
            receiveShadow
            // @ts-ignore
            geometry={nodes.Cube002.geometry}
            material={materials.aluminium}
          />
          <mesh
            name="Cube002_1"
            castShadow
            receiveShadow
            // @ts-ignore
            geometry={nodes.Cube002_1.geometry}
            material={materials.trackpad}
          />
        </group>
        {/* <mesh
          name='touchbar'
          castShadow
          receiveShadow
          // @ts-ignore
          geometry={nodes.touchbar.geometry}
          material={materials.touchbar}
          position={[-0.044, 3.441, -0.387]}
          scale={0.198}
        /> */}
      </group>
    </group>
  );
}

useGLTF.preload("/glb/laptop.glb");

export default Laptop;
