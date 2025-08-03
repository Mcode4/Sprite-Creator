import { useState, createContext } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

export const sizeContext = createContext();

import NoGrid from './components/NoGrid/NoGrid';
import Grid from './components/Grid/Grid';
import Sidebar from './components/Sidebar/SIdebar';

function App() {
  const [height, setHeight] = useState(null);
  const [width, setWidth] = useState(null);

  return (
    <>
      <sizeContext.Provider value={{ height, width, setHeight, setWidth }}>
        <div className="home-page">
          {height && width ? (
            <>
              <Grid height={height} width={width} />
              <Sidebar />
            </>
          ) : (
            <NoGrid />
          )}
        </div>
      </sizeContext.Provider>
    </>
  )
}

export default App
