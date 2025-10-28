import React from 'react'
import Link from 'next/link'

function page() {
  return (
    <div>
      <ul>
        <Link href={"/"}><li>Home</li></Link>
        <Link href={"/about"}><li>About</li></Link>
        <Link href={"/contact"}><li>Contact</li></Link>
      </ul>
    </div>
  )
}

export default page