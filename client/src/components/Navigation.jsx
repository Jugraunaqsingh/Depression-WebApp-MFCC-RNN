// import { HamburgerIcon, Icon } from '@chakra-ui/icons'
// import React from 'react'
// import {FaGithub} from "react-icons/fa";
// import {FaExternalLinkAlt} from "react-icons/fa"
// const Navigation = () => {
//   return (
//     <nav className=' flex  w-full text border-b border-solid border-white/10 text-gray-500 font-bold font-Roboto'>
//         <div className=' flex items-center  basis-1/3 px-12 py-8 gap-4 border-l border-white/10'>
//         <a href='#'>
//         <HamburgerIcon color='red.500'/>
//         </a>
//         </div>
//         <div className='flex justify-center items-center  basis-1/3 px-12 py-8 gap-12 border-l border-white/10'>
//         <a>About</a>
//         <a>Work</a>
//         </div>
//         <div className=' flex justify-center items-center  grow px-12 py-8 gap-4 border-l border-white/10'>
//         <a><Icon as={FaGithub}  /></a>
        
//         </div>
//         <div className= ' flex items-center justify-center  grow px-12 py-8  border-l border-white/10'>
//         <a>Get in Touch</a>
//         </div>
//     </nav>
//   )
// }

// export default Navigation

import { HamburgerIcon, Icon } from '@chakra-ui/icons'
import React from 'react'
import { Link } from 'react-router-dom'
import { FaGithub } from "react-icons/fa"
import { FaExternalLinkAlt } from "react-icons/fa"

const Navigation = () => {
  return (
    <nav className='flex w-full text border-b border-solid border-white/10 text-gray-500 font-bold font-Roboto bg-[#d7dee0]'>
      <div className='flex items-center w-1/4 px-6 py-8 gap-4 border-l border-white/10'>
        <Link to="/">
          <HamburgerIcon color='red.500' />
        </Link>
      </div>
      <div className='flex justify-center items-center w-1/2 px-6 py-8 gap-8 border-l border-white/10'>
        <Link to="/" className="hover:text-white transition-colors">Home</Link>
        <Link to="/depression-test" className="hover:text-white transition-colors">Depression Test</Link>
        <Link to="/about" className="hover:text-white transition-colors">About</Link>
      </div>
      <div className='flex justify-end items-center w-1/4 px-6 py-8 gap-4 border-l border-white/10'>
        <a href="https://github.com/your-repo" target="_blank" rel="noopener noreferrer">
          <Icon as={FaGithub} className="hover:text-white transition-colors" />
        </a>
        <Link to="/contact" className="hover:text-white transition-colors">Get in Touch</Link>
      </div>
    </nav>
  )
}

export default Navigation
