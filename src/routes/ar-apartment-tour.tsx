import { createFileRoute } from '@tanstack/react-router'

import { getProjectById } from '@/data/portfolio'
import { ProjectPage } from '@/components/portfolio/ProjectPage'

const project = getProjectById('ar-apartment-tour')

export const Route = createFileRoute('/ar-apartment-tour')({
  head: () => ({
    meta: [
      {
        title: `${project.title} | Alina Skalkina`,
      },
    ],
  }),
  component: ArApartmentTourPage,
})

function ArApartmentTourPage() {
  return <ProjectPage project={project} />
}
