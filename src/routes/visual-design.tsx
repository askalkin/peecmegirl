import { createFileRoute } from '@tanstack/react-router'

import { getProjectById } from '@/data/portfolio'
import { ProjectPage } from '@/components/portfolio/ProjectPage'

const project = getProjectById('visual-design')

export const Route = createFileRoute('/visual-design')({
  head: () => ({
    meta: [
      {
        title: `${project.title} | Alina Skalkina`,
      },
    ],
  }),
  component: VisualDesignPage,
})

function VisualDesignPage() {
  return <ProjectPage project={project} />
}
