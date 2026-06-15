import { createFileRoute } from '@tanstack/react-router'

import { getProjectById } from '@/data/portfolio'
import { ProjectPage } from '@/components/portfolio/ProjectPage'

const project = getProjectById('huawei')

export const Route = createFileRoute('/huawei')({
  head: () => ({
    meta: [
      {
        title: `${project.title} | Alina Skalkina`,
      },
    ],
  }),
  component: HuaweiPage,
})

function HuaweiPage() {
  return <ProjectPage project={project} />
}
