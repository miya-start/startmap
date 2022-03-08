import type { LoaderFunction } from 'remix'
import { Link, Outlet, useLoaderData } from 'remix'

import { db } from '~/utils/db.server'

type LoarderData = {
  posts: Array<{ id: string; title: string }>
}

export const loader: LoaderFunction = async () => {
  const posts = await db.post.findMany()
  return { posts }
}

export default function TopRoute() {
  const data = useLoaderData<LoarderData>()

  return (
    <>
      <h1 data-test="greeting">Welcome to Top</h1>
      <ul>
        {data.posts.map(({ id, title }) => (
          <li key={id}>
            <Link to={`/posts/${id}`}>{title}</Link>
          </li>
        ))}
      </ul>
    </>
  )
}
