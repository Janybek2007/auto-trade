import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_guest-layout/policy')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_guest-layout/policy"!</div>
}
