import React from 'react';
import PINLock from "./PINLock"

function LockScreen({children}) {
  const [unlocked, setUnlocked] = React.useState(false);

  const unlock = () => setUnlocked(true)
  const lock = () => setUnlocked(false)

  if (unlocked) {
    return (
      <div>
        {children}
        <br/>
        <button onClick={lock}>Reset</button>
      </div>
    )
  } else {
    return <PINLock onUnlock={unlock}/>
  }
}

export default LockScreen

