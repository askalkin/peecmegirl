import {
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from 'react'
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Minus,
  Plus,
} from 'lucide-react'

import { cn } from '@/lib/utils'

const clamp = (value: number, min: number, max: number) =>
  Math.max(min, Math.min(max, value))

type InputKey = 'forward' | 'strafe' | 'zoom'

// A furniture-free apartment you can walk through: drag (or use the on-screen
// arrows) to look/move, scroll or +/- to zoom. three.js is loaded lazily so the
// rest of the site keeps working even before the dependency is installed.
export function ApartmentScene({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const input = useRef({ forward: 0, strafe: 0, zoom: 0 })
  const [hint, setHint] = useState(true)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let cancelled = false
    let cleanup = () => {}

    ;(async () => {
      try {
        const THREE = await import('three')
        if (cancelled || !container) return

        const width = container.clientWidth
        const height = container.clientHeight

        const scene = new THREE.Scene()
        scene.background = new THREE.Color('#e8eef2')

        const camera = new THREE.PerspectiveCamera(72, width / height, 0.1, 100)
        camera.rotation.order = 'YXZ'
        camera.position.set(0, 1.6, 2)

        const renderer = new THREE.WebGLRenderer({ antialias: true })
        renderer.setSize(width, height)
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        renderer.domElement.style.cursor = 'grab'
        renderer.domElement.style.touchAction = 'none'
        container.appendChild(renderer.domElement)

        scene.add(new THREE.AmbientLight(0xffffff, 0.95))
        scene.add(new THREE.HemisphereLight(0xffffff, 0xf0f0f0, 0.6))
        const sun = new THREE.DirectionalLight(0xffffff, 0.5)
        sun.position.set(6, 12, 8)
        scene.add(sun)

        const loader = new THREE.TextureLoader()

        const wallMat = new THREE.MeshStandardMaterial({
          color: '#ffffff',
          roughness: 1,
          side: THREE.DoubleSide,
        })
        const doorMat = new THREE.MeshStandardMaterial({
          color: '#f1eadf',
          roughness: 0.9,
          side: THREE.DoubleSide,
        })
        const woodMat = new THREE.MeshStandardMaterial({
          color: '#c8a06a',
          roughness: 0.85,
          side: THREE.DoubleSide,
        })
        loader.load(
          '/textures/wood-floor.webp',
          (tex) => {
            tex.wrapS = THREE.RepeatWrapping
            tex.wrapT = THREE.RepeatWrapping
            tex.repeat.set(4, 3)
            tex.colorSpace = THREE.SRGBColorSpace
            woodMat.map = tex
            woodMat.color.set('#ffffff')
            woodMat.needsUpdate = true
          },
          undefined,
          () => {}
        )

        const viewMaterial = (src: string, fallback: string) => {
          const mat = new THREE.MeshBasicMaterial({
            color: fallback,
            side: THREE.DoubleSide,
          })
          loader.load(
            src,
            (tex) => {
              tex.colorSpace = THREE.SRGBColorSpace
              mat.map = tex
              mat.color.set('#ffffff')
              mat.needsUpdate = true
            },
            undefined,
            () => {}
          )
          return mat
        }

        const W = 9
        const D = 6
        const H = 2.7
        const t = 0.15

        const floor = new THREE.Mesh(new THREE.PlaneGeometry(W, D), woodMat)
        floor.rotation.x = -Math.PI / 2
        scene.add(floor)

        const addBox = (
          cx: number,
          cz: number,
          w: number,
          d: number,
          h = H,
          cy = h / 2,
          mat = wallMat
        ) => {
          const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat)
          mesh.position.set(cx, cy, cz)
          scene.add(mesh)
        }

        addBox(0, -D / 2, W, t)
        addBox(0, D / 2, W, t)
        for (const side of [-1, 1]) {
          const x = (side * W) / 2
          addBox(x, 0, t, D, 1.0, 0.5)
          addBox(x, 0, t, D, 0.7, 2.35)
          addBox(x, -2.5, t, 1.0, 1.0, 1.5)
          addBox(x, 2.5, t, 1.0, 1.0, 1.5)
        }
        addBox(0.7, -2.1, t, 1.8)
        addBox(0.7, 2.1, t, 1.8)
        addBox(1.15, -1.2, 0.9, t, 2.0, 1.0, doorMat)

        const addView = (
          x: number,
          rotY: number,
          mat: import('three').Material
        ) => {
          const plane = new THREE.Mesh(new THREE.PlaneGeometry(D, 3.4), mat)
          plane.position.set(x, 1.5, 0)
          plane.rotation.y = rotY
          scene.add(plane)
        }
        addView(
          -W / 2 - 0.25,
          Math.PI / 2,
          viewMaterial('/textures/view-kyiv.webp', '#cdd9e3')
        )
        addView(
          W / 2 + 0.25,
          -Math.PI / 2,
          viewMaterial('/textures/view-berlin.webp', '#d9d2c7')
        )

        // Drag to look — cursor stays free.
        let yaw = 0
        let pitch = 0
        let dragging = false
        let lastX = 0
        let lastY = 0
        const el = renderer.domElement
        const onDown = (event: PointerEvent) => {
          dragging = true
          lastX = event.clientX
          lastY = event.clientY
          el.style.cursor = 'grabbing'
          setHint(false)
        }
        const onMove = (event: PointerEvent) => {
          if (!dragging) return
          yaw -= (event.clientX - lastX) * 0.0035
          pitch -= (event.clientY - lastY) * 0.0035
          pitch = clamp(pitch, -1.2, 1.2)
          lastX = event.clientX
          lastY = event.clientY
          camera.rotation.set(pitch, yaw, 0)
        }
        const onUp = () => {
          dragging = false
          el.style.cursor = 'grab'
        }
        const onWheel = (event: WheelEvent) => {
          event.preventDefault()
          camera.fov = clamp(camera.fov + event.deltaY * 0.03, 35, 90)
          camera.updateProjectionMatrix()
        }
        el.addEventListener('pointerdown', onDown)
        window.addEventListener('pointermove', onMove)
        window.addEventListener('pointerup', onUp)
        el.addEventListener('wheel', onWheel, { passive: false })

        const keys: Record<string, boolean> = {}
        const onKeyDown = (event: KeyboardEvent) => {
          keys[event.code] = true
        }
        const onKeyUp = (event: KeyboardEvent) => {
          keys[event.code] = false
        }
        document.addEventListener('keydown', onKeyDown)
        document.addEventListener('keyup', onKeyUp)

        const up = new THREE.Vector3(0, 1, 0)
        const forwardVec = new THREE.Vector3()
        const rightVec = new THREE.Vector3()
        const clock = new THREE.Clock()
        const limitX = W / 2 - 0.4
        const limitZ = D / 2 - 0.4
        let raf = 0
        const animate = () => {
          const delta = clock.getDelta()
          const speed = 3.2 * delta
          const fwd = clamp(
            (keys.KeyW || keys.ArrowUp ? 1 : 0) -
              (keys.KeyS || keys.ArrowDown ? 1 : 0) +
              input.current.forward,
            -1,
            1
          )
          const strafe = clamp(
            (keys.KeyD || keys.ArrowRight ? 1 : 0) -
              (keys.KeyA || keys.ArrowLeft ? 1 : 0) +
              input.current.strafe,
            -1,
            1
          )
          if (fwd || strafe) {
            camera.getWorldDirection(forwardVec)
            forwardVec.y = 0
            forwardVec.normalize()
            rightVec.crossVectors(forwardVec, up).normalize()
            camera.position.addScaledVector(forwardVec, fwd * speed)
            camera.position.addScaledVector(rightVec, strafe * speed)
            camera.position.x = clamp(camera.position.x, -limitX, limitX)
            camera.position.z = clamp(camera.position.z, -limitZ, limitZ)
            camera.position.y = 1.6
          }
          if (input.current.zoom) {
            camera.fov = clamp(camera.fov + input.current.zoom * 0.9, 35, 90)
            camera.updateProjectionMatrix()
          }
          renderer.render(scene, camera)
          raf = requestAnimationFrame(animate)
        }
        animate()

        const onResize = () => {
          if (!container) return
          const w = container.clientWidth
          const h = container.clientHeight
          camera.aspect = w / h
          camera.updateProjectionMatrix()
          renderer.setSize(w, h)
        }
        window.addEventListener('resize', onResize)

        cleanup = () => {
          cancelAnimationFrame(raf)
          window.removeEventListener('resize', onResize)
          window.removeEventListener('pointermove', onMove)
          window.removeEventListener('pointerup', onUp)
          el.removeEventListener('pointerdown', onDown)
          el.removeEventListener('wheel', onWheel)
          document.removeEventListener('keydown', onKeyDown)
          document.removeEventListener('keyup', onKeyUp)
          renderer.dispose()
          el.remove()
        }
      } catch (error) {
        console.warn('Apartment scene unavailable:', error)
        if (!cancelled) setFailed(true)
      }
    })()

    return () => {
      cancelled = true
      cleanup()
    }
  }, [])

  const hold = (key: InputKey, value: number) => ({
    onPointerDown: (event: ReactPointerEvent<HTMLButtonElement>) => {
      event.preventDefault()
      input.current[key] = value
      setHint(false)
    },
    onPointerUp: () => {
      input.current[key] = 0
    },
    onPointerLeave: () => {
      input.current[key] = 0
    },
    onPointerCancel: () => {
      input.current[key] = 0
    },
  })

  const buttonClass =
    'flex size-11 touch-none items-center justify-center rounded-full border border-border bg-background/70 text-foreground backdrop-blur-md transition-colors hover:bg-background/90'

  return (
    <div className={cn('relative overflow-hidden bg-[#e8eef2]', className)}>
      <div ref={containerRef} className="h-full w-full" />

      {failed ? (
        <div className="absolute inset-0 flex items-center justify-center px-6 text-center text-sm text-muted-foreground">
          3D tour unavailable — run “npm install” to enable it.
        </div>
      ) : (
        <>
          {hint ? (
            <span className="pointer-events-none absolute left-1/2 top-5 -translate-x-1/2 rounded-full border border-border bg-background/70 px-5 py-2.5 text-sm font-medium text-foreground backdrop-blur-md">
              drag to look · arrows to move · +/− to zoom
            </span>
          ) : null}

          {/* Movement d-pad. */}
          <div className="absolute bottom-5 left-5 grid grid-cols-3 gap-1.5">
            <span />
            <button type="button" aria-label="Move forward" className={buttonClass} {...hold('forward', 1)}>
              <ChevronUp className="size-5" />
            </button>
            <span />
            <button type="button" aria-label="Move left" className={buttonClass} {...hold('strafe', -1)}>
              <ChevronLeft className="size-5" />
            </button>
            <span />
            <button type="button" aria-label="Move right" className={buttonClass} {...hold('strafe', 1)}>
              <ChevronRight className="size-5" />
            </button>
            <span />
            <button type="button" aria-label="Move back" className={buttonClass} {...hold('forward', -1)}>
              <ChevronDown className="size-5" />
            </button>
            <span />
          </div>

          {/* Zoom. */}
          <div className="absolute bottom-5 right-5 flex flex-col gap-1.5">
            <button type="button" aria-label="Zoom in" className={buttonClass} {...hold('zoom', -1)}>
              <Plus className="size-5" />
            </button>
            <button type="button" aria-label="Zoom out" className={buttonClass} {...hold('zoom', 1)}>
              <Minus className="size-5" />
            </button>
          </div>
        </>
      )}
    </div>
  )
}
