import { createFileRoute } from '@tanstack/react-router'

import { getProjectById } from '@/data/portfolio'
import { ProjectPage } from '@/components/portfolio/ProjectPage'

const project = getProjectById('my-playground')

export const Route = createFileRoute('/my-playground')({
  head: () => ({
    meta: [
      {
        title: `${project.title} | Alina Skalkina`,
      },
    ],
  }),
  component: MyPlaygroundPage,
})

function MyPlaygroundPage() {
  return <ProjectPage project={project} />
}
