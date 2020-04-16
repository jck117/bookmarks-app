import React from 'react';
/* 
The Link component will use a browser feature and 
some JavaScript to "pretend" to do a complete page load.
This will prevent a new network request being made when we navigate,
and a complete page load won't happen whenever we click on a link.
*/
import { Link } from 'react-router-dom';

export default function Nav(props) {
  return (
    <nav className='Nav'>
      <Link to={'/'}>
        Bookmark List
      </Link>
      {' '}
      <Link to={'/add-bookmark'}>
        Add Bookmark
      </Link>
    </nav>
  );
}



