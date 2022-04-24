import React from 'react';
import { Box, Home } from 'react-feather';
import { Link } from 'react-router-dom';

export const Header = () => {

  return (
      <nav>
          <div className="SiteName">
              <Box color={"white"}/>
              <h1>Boxy Blogs</h1>
          </div>
         <Link to={'/'}><Home color="white" /></Link>
      </nav>
  )
}