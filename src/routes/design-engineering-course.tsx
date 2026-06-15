import { createFileRoute } from '@tanstack/react-router'

import { getProjectById } from '@/data/portfolio'
import { ProjectPage } from '@/components/portfolio/ProjectPage'

const project = getProjectById('design-engineering-course')

export const Route = createFileRoute('/design-engineering-course')({
  head: () => ({
    meta: [
      {
        title: `${project.title} | Alina Skalkina`,
      },
    ],
  }),
  component: DesignEngineeringCoursePage,
})

function DesignEngineeringCoursePage() {
  return <ProjectPage project={project} />
}
