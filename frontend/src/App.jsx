import { useState} from 'react';
import { useCookies } from 'react-cookie';

import NoGrid from './components/Grid/NoGrid';
// import Grid from './components/Workspace/Grid/Grid';
// import Sidebar from './components/Workspace/Sidebar/SIdebar';
import WorkSpace from './components/Workspace/WorkSpace';

function App() {
  const [cookies] = useCookies(['grid']);
  console.log(cookies)

  return (
    <>
      <div className="home-page">
        {cookies.grid ? (
          <>
            <WorkSpace />
          </>
        ) : (
          <NoGrid />
        )}
      </div>
    </>
  )
}

export default App
