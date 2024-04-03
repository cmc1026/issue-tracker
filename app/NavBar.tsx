// navbar is only on the 
import Link from 'next/link'
import React from 'react'
import { IoBugSharp } from "react-icons/io5";

const NavBar = () => {
    // create an array item for each item on our navbar
    const links = [
        { label: 'Dashboard', href: '/' },
        { label: 'Issues', href: '/issues' }
    ]
  
    return (
    <nav className='flex space-x-6 border-b mb-5 px-5 h-14 items-center'>
        <Link href="/"><IoBugSharp /></Link>
        <ul className='flex space-x-6'>
            {links.map(link =>
            <Link
                key={link.href}
                className='text-stone-300 hover:text-stone-600 transition-colors'
                href={link.href}>{link.label}
            </Link>)}

        </ul>
    </nav>

  )
}

export default NavBar