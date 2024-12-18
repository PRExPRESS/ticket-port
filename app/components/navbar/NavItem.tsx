import Link from 'next/link'
import React from 'react'

interface Props {
    text: string,
    href: string
}
const NavItem = ({text, href}: Props) => {
  return (
    <Link href={href} className="text-[16px] font-bold text-text-light dark:text-text-dark hover:text-hoverEffects-gold dark:hover:text-hoverEffects-gold font-roboto">{text}</Link>
  )
}

export default NavItem
