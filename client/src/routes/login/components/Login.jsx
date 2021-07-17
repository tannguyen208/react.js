import React, {useState, useCallback} from 'react'
import {useAuth} from 'src/hooks/useAuth'
import {useRouter} from 'src/hooks/useRouter'
import {routePaths} from 'src/routes/paths'
import {delay} from 'src/utils/delay'

function Login() {
  const auth = useAuth()
  const router = useRouter()
  const [signing, setSigning] = useState(false)

  const onSignIn = useCallback(() => {
    const signIn = async () => {
      setSigning(true)

      // request login
      if (await auth.signIn()) {
        await delay(1000)
        router.location.state
          ? router.replace(router.location)
          : router.replace(routePaths.dashboard.path)

        return
      }

      // login failure
      setSigning(false)
    }

    signIn()
  }, [])

  return (
    <div className="text-center">
      <div className="mb-5">
        <h1>Login</h1>
      </div>

      <div className="err-body">
        <Choose>
          <When condition={signing}>Signing ...</When>
          <Otherwise>
            <div
              className="px-2 mx-10 border-gray-200 border-2 rounded cursor-pointer"
              onClick={onSignIn}
              aria-hidden
            >
              Dashboard Page
            </div>
          </Otherwise>
        </Choose>
      </div>
    </div>
  )
}

export default React.memo(Login)
