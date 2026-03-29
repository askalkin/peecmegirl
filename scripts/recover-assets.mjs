import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'

const siteOrigin = 'https://alinaskalkina.com'
const outputRoot = path.resolve('public/recovered')

const assetPaths = [
  '/Alina-Skalkina-CV-Digital-Designer.pdf',
  '/computer.png',
  '/comfort-map-video.mp4',
  '/air-video.mp4',
  '/lunie.mp4',
  '/problematic.mp4',
  '/graphic-design.mov',
  '/comfort-map/mobile-1.png',
  '/comfort-map/mobile-2.png',
  '/comfort-map/mobile-3.png',
  '/comfort-map/mobile-4.png',
  '/comfort-map/desktop-1.png',
  '/comfort-map/desktop-2.png',
  '/lun-misto-air/jpg/map-1.jpg',
  '/lun-misto-air/jpg/map-2.jpg',
  '/lun-misto-air/jpg/map-3.jpg',
  '/lun-misto-air/jpg/map-4.jpg',
  '/lun-misto-air/jpg/map-5.jpg',
  '/lun-misto-air/jpg/air-1.jpg',
  '/lun-misto-air/jpg/air-2.jpg',
  '/lun-misto-air/jpg/air-3.jpg',
  '/lun-misto-air/jpg/air-4.jpg',
  '/lun-misto-air/jpg/air-5.jpg',
  '/lun-misto-air/jpg/watch.jpg',
  '/lun-misto-air/jpg/widget-watches-2.jpg',
  '/lun-misto-air/jpg/widget-chrome.jpg',
  '/lun-misto-air/logos/iq-air.png',
  '/lun-misto-air/logos/World-air-quality-index.png',
  '/lun-misto-air/logos/Ministry-of-ecology.png',
  '/lun-misto-air/logos/Plume-labs.png',
  '/lun-misto-air/logos/Air-care.png',
  '/visual-design/1.mp4',
  '/visual-design/2.mp4',
  '/visual-design/3.mp4',
  '/visual-design/4.png',
  '/visual-design/5.png',
  '/visual-design/6.png',
  '/lunie/1.png',
  '/lunie/2.png',
  '/lunie/3.png',
  '/lunie/4.png',
  '/lunie/5.png',
  '/lunie/6.png',
  '/lunie/mobile-1.png',
  '/lunie/mobile-2.png',
  '/lunie/mobile-3.png',
  '/lunie/mobile-4.png',
  '/lunie/mobile-5.png',
  '/graphic-design/A-2.jpg',
  '/graphic-design/I-2.jpg',
  '/graphic-design/L-0.jpg',
  '/graphic-design/B-1.jpg',
  '/graphic-design/abstract.png',
  '/graphic-design/D-1.jpg',
  '/graphic-design/G-2.jpg',
  '/graphic-design/K-1.jpg',
  '/graphic-design/Lun-5.jpg',
  '/graphic-design/house2.gif',
  '/graphic-design/Lun-4.jpg',
  '/graphic-design/spilka-2.png',
  '/graphic-design/lun-data-visual.png',
  '/graphic-design/Lun-redesign.jpg',
]

async function downloadAsset(assetPath) {
  const url = new URL(assetPath, siteOrigin)
  const outputPath = path.join(outputRoot, assetPath.replace(/^\/+/, ''))

  await mkdir(path.dirname(outputPath), { recursive: true })

  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`Failed to download ${url}: ${response.status}`)
  }

  const arrayBuffer = await response.arrayBuffer()
  await writeFile(outputPath, Buffer.from(arrayBuffer))
  console.log(`saved ${assetPath}`)
}

await mkdir(outputRoot, { recursive: true })

for (const assetPath of assetPaths) {
  await downloadAsset(assetPath)
}
