import { useState} from 'react';
import { useCookies } from 'react-cookie';

import NoGrid from './components/NoGrid/NoGrid';
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
