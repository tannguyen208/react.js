import React, {useState} from 'react'
import Splash from './splash'

function App(props) {
  const {children} = props
  const [done, setDone] = useState(false) // one-off

  return (
    <Choose>
      <When condition={done}>{children}</When>
      <Otherwise>
        <Splash setDone={setDone} />
      </Otherwise>
    </Choose>
  )
}

export default React.memo(App)
