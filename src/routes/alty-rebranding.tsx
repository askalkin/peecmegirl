import { createFileRoute } from '@tanstack/react-router'

import { getProjectById } from '@/data/portfolio'
import { ProjectPage } from '@/components/portfolio/ProjectPage'

const project = getProjectById('alty-rebranding')

export const Route = createFileRoute('/alty-rebranding')({
  head: () => ({
    meta: [
      {
        title: `${project.title} | Alina Skalkina`,
      },
    ],
  }),
  component: AltyRebrandingPage,
})

function AltyRebrandingPage() {
  return <ProjectPage project={project} />
}
