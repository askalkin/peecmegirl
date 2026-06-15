import { createFileRoute } from '@tanstack/react-router'

import { getProjectById } from '@/data/portfolio'
import { ProjectPage } from '@/components/portfolio/ProjectPage'

const project = getProjectById('lun-hr-brand')

export const Route = createFileRoute('/lun-hr-brand')({
  head: () => ({
    meta: [
      {
        title: `${project.title} | Alina Skalkina`,
      },
    ],
  }),
  component: LunHrBrandPage,
})

function LunHrBrandPage() {
  return <ProjectPage project={project} />
}
