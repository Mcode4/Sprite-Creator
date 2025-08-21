import { useState} from 'react';
import { useCookies } from 'react-cookie';

import NoGrid from './components/Grid/NoGrid';
import Grid from './components/Grid/Grid';
import Sidebar from './components/Sidebar/Sidebar';

function App() {
  const [cookies] = useCookies(['grid']);
  console.log(cookies)

  return (
    <>
      <div className="home-page">
        {cookies.grid ? (
          <>
            <Grid />
            <Sidebar />
          </>
        ) : (
          <NoGrid />
        )}
      </div>
    </>
  )
}

export default App
