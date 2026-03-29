import { createFileRoute } from '@tanstack/react-router'

import { getProjectById } from '@/data/portfolio'
import { ProjectPage } from '@/components/portfolio/ProjectPage'

const project = getProjectById('comfort-map')

export const Route = createFileRoute('/comfort-map')({
  head: () => ({
    meta: [
      {
        title: `${project.title} | Alina Skalkina`,
      },
    ],
  }),
  component: ComfortMapPage,
})

function ComfortMapPage() {
  return <ProjectPage project={project} />
}
