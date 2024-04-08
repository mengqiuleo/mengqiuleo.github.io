import { useEffect, useState } from 'react'

import NavBar from './NavBar'

const Layout = ({ children }) => {
  const [mode, setMode] = useState('light');

  useEffect(() => {
    if (localStorage.getItem('mode')) {
      setMode(localStorage.getItem('mode'))
    }
  }, [])

  return (
    <div className='layout' color-mode={mode}>
      <main>
        <NavBar setMode={setMode} mode={mode} />
        {children}
      </main>
    </div>
  );
};

export default Layout
