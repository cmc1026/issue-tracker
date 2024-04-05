// navbar is only on the 
'use client'
import Link from 'next/link'
import React from 'react'
import { IoBugSharp } from "react-icons/io5";
import { usePathname } from 'next/navigation';
import classNames from 'classnames';

const NavBar = () => {
    // create an array item for each item on our navbar
    const links = [
        { label: 'Dashboard', href: '/' },
        { label: 'Issues', href: '/issues' }
    ]
    
    const currentPath = usePathname();

    return (
    <nav className='flex space-x-6 border-b mb-5 px-5 h-14 items-center'>
        <Link href="/"><IoBugSharp /></Link>
        <ul className='flex space-x-6'>
            {links.map(link =>
            <Link
                key={link.href}
                className={classNames({
                    'text-zinc-900': link.href === currentPath,
                    'text-amber-800': link.href !== currentPath,
                    'hover:text-red-600 transition-colors': true
                })}
                href={link.href}>{link.label}
            </Link>)}

        </ul>
    </nav>

  )
}

export default NavBar