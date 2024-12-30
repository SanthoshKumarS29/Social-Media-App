import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div>
        <div className='px-8 py-6 text-black border-2 flex items-center justify-between'>
            <div className='text-xl font-bold'>
              <h1>Upload your Post</h1>
            </div>
            <ul className='flex flext-start gap-5 text-lg '>
                <Link to='/'>Home</Link>
                <Link to='/Createpost'>Create Post</Link>
            </ul>
        </div>
    </div>
  )
}

export default Navbar