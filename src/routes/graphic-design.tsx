import { createFileRoute } from '@tanstack/react-router'

import { getProjectById } from '@/data/portfolio'
import { ProjectPage } from '@/components/portfolio/ProjectPage'

const project = getProjectById('graphic-design')

export const Route = createFileRoute('/graphic-design')({
  head: () => ({
    meta: [
      {
        title: `${project.title} | Alina Skalkina`,
      },
    ],
  }),
  component: GraphicDesignPage,
})

function GraphicDesignPage() {
  return <ProjectPage project={project} />
}
