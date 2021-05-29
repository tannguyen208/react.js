import React from 'react'
import { useRouter } from 'src/hooks/useRouter'

function Public() {
  const router = useRouter()

  const onGoBack = React.useCallback(() => {
    router.history.goBack()
  }, [])

  return (
    <div className="err-container text-center">
      <div className="err">
        <h1>Public</h1>
        <div onClick={onGoBack}>Go Back</div>
      </div>
    </div>
  )
}

export default React.memo(Public)
