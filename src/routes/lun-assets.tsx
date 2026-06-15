import { createFileRoute } from '@tanstack/react-router'

import { getProjectById } from '@/data/portfolio'
import { ProjectPage } from '@/components/portfolio/ProjectPage'

const project = getProjectById('lun-assets')

export const Route = createFileRoute('/lun-assets')({
  head: () => ({
    meta: [
      {
        title: `${project.title} | Alina Skalkina`,
      },
    ],
  }),
  component: LunAssetsPage,
})

function LunAssetsPage() {
  return <ProjectPage project={project} />
}
