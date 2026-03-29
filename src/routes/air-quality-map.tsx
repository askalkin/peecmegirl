import { createFileRoute } from '@tanstack/react-router'

import { getProjectById } from '@/data/portfolio'
import { ProjectPage } from '@/components/portfolio/ProjectPage'

const project = getProjectById('air-quality-map')

export const Route = createFileRoute('/air-quality-map')({
  head: () => ({
    meta: [
      {
        title: `${project.title} | Alina Skalkina`,
      },
    ],
  }),
  component: AirQualityMapPage,
})

function AirQualityMapPage() {
  return <ProjectPage project={project} />
}
