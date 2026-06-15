import { createFileRoute } from '@tanstack/react-router'

import { getProjectById } from '@/data/portfolio'
import { ProjectPage } from '@/components/portfolio/ProjectPage'

const project = getProjectById('alty-assets')

export const Route = createFileRoute('/alty-assets')({
  head: () => ({
    meta: [
      {
        title: `${project.title} | Alina Skalkina`,
      },
    ],
  }),
  component: AltyAssetsPage,
})

function AltyAssetsPage() {
  return <ProjectPage project={project} />
}
