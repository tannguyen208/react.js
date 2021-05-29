import React from 'react'
import { Link } from 'react-router-dom'
import { useRouter } from 'src/hooks/useRouter'
import { routePaths } from 'src/routes/paths'

function Private(props) {
  const router = useRouter()

  const onGoBack = React.useCallback(() => {
    router.history.goBack()
  }, [])

  return (
    <div className="err-container text-center">
      <div className="err">
        <h1>Private Page</h1>
        <div onClick={onGoBack}>Go Back</div>
        <div className="grid grid-cols-3 gap-4">
          <Link to={routePaths.privateView.path}>View</Link>
          <Link to={routePaths.privateCreate.path}>Create</Link>
          <Link to={routePaths.privateUpdate.path}>Update</Link>
        </div>
      </div>
      <div className="m-12 pbg-green-200 rounded-lg">{props.children}</div>
    </div>
  )
}

export default React.memo(Private)
