import { createFileRoute } from '@tanstack/react-router'

import { getProjectById } from '@/data/portfolio'
import { ProjectPage } from '@/components/portfolio/ProjectPage'

const project = getProjectById('alty-website')

export const Route = createFileRoute('/alty-website')({
  head: () => ({
    meta: [
      {
        title: `${project.title} | Alina Skalkina`,
      },
    ],
  }),
  component: AltyWebsitePage,
})

function AltyWebsitePage() {
  return <ProjectPage project={project} />
}
