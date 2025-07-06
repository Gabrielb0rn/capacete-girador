import { Canvas } from '@react-three/fiber'
import { OrbitControls, useGLTF } from '@react-three/drei'
import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ContactShadows } from '@react-three/drei'

<ContactShadows
  position={[0, -1.5, 0]}
  opacity={0.5}
  scale={10}
  blur={2.5}
/>

function Model() {
  const ref = useRef()
  const { scene } = useGLTF('/veritas.glb')

  useEffect(() => {
    if (ref.current) {
      ref.current.traverse((child) => {
        if (child.isMesh) {
          child.material = new MeshStandardMaterial({ color: '#d4af37', metalness: 0.5, roughness: 0.3 })
        }
      })

      gsap.to(ref.current.rotation, {
        y: Math.PI * 2,
        duration: 5,
        repeat: -1,
        ease: 'power1.inOut',
      })
    }
  }, [])

  return <primitive object={scene} ref={ref} scale={0.05} position={[0, -1, 0]} />
}

export default function App() {
  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      background: '#111',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      margin: 0,
      padding: 0,
      overflow: 'hidden'
    }}>
      <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', margin: '0 0 10px 0', color: 'white' }}>O Capacete Girador</h1>
      <p style={{ color: '#aaa', margin: '0 0 30px 0' }}>
        Experimente girar e explorar em 3D
      </p>

      <div style={{
        width: '80vmin',
        height: '80vmin',
        borderRadius: '10px',
        overflow: 'hidden',
        border: '1px solid #333',
        background: '#000',
      }}>
        <Canvas camera={{ position: [0, 2, 10], fov: 45 }}>

          <ambientLight intensity={0.5} />
          <directionalLight position={[2, 2, 5]} intensity={1.2} />
          <Environment preset="sunset" />
          <Model />
          <OrbitControls
            enableZoom={true}
            enablePan={false}
            minDistance={3}
            maxDistance={8}
            minPolarAngle={Math.PI / 4}
            maxPolarAngle={Math.PI * 3/4}
          />
        </Canvas>
      </div>
    </div>
  )
}