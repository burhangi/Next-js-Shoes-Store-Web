// components/home/InstagramFeed.tsx - Using next/image with config
import Image from 'next/image'

export const InstagramFeed = () => {
  const posts = [
    { id: 1, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff', likes: 120 },
    // ... more posts
  ]

  return (
    <div>
      {posts.map((post) => (
        <div key={post.id}>
          <Image
            src={post.image}
            alt="Instagram post"
            width={300}
            height={300}
            className="rounded-lg"
          />
        </div>
      ))}
    </div>
  )
}