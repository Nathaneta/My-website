import { useEffect, useState } from 'react'
import { api } from '../utils/api'

export default function Blog() {
  const [posts, setPosts] = useState([])
  useEffect(() => {
    api.get('/blog').then(({ data }) => setPosts(data.posts || []))
  }, [])

  return (
    <div className="px-6 py-10 lg:px-10">
      <h2 className="text-3xl font-bold">Blog & Resources</h2>
      <div className="mt-6 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((p) => (
          <article key={p.id} className="rounded-xl bg-white/5 p-4 border border-white/10">
            <h3 className="font-semibold">{p.title}</h3>
            <p className="text-sm text-neutral-300 mt-2 line-clamp-3">{p.excerpt}</p>
          </article>
        ))}
      </div>
    </div>
  )
}

