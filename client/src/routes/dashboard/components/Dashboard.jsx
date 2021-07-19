import React, {useEffect, useState, useCallback} from 'react'
import {useAuth} from 'src/hooks/useAuth'
import {useRouter} from 'src/hooks/useRouter'
import {useScript, STATUS as useScriptStatus} from 'src/hooks/useScript'
import {routePaths} from 'src/routes/paths'
import {isGuard} from 'src/utils/isGuard'
import Scrollbar from 'src/components/scrollbar'
import Button from 'src/components/button'
import Todo from 'src/models/todo.model'
import Input from 'src/components/input'
import RouteLeavingGuard from 'src/components/routeLeavingGuard'
import TodoApi from 'src/api/todo.api'

const cdns = {
  jQuery: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js',
  jQueryUI:
    'https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js',
  jQueryCSS:
    'https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.css',
}

function Dashboard() {
  const auth = useAuth()
  const router = useRouter()
  const [todos, setTodos] = useState([])
  const [textSearch, setTextSearch] = useState('')
  const deepScrips = [
    useScript(cdns.jQuery),
    useScript(cdns.jQueryUI),
    useScript(cdns.jQueryCSS),
  ]
  const deepScripsLoaded = isGuard(
    ...deepScrips.reduce(
      (acc, cur) => [...acc, cur === useScriptStatus.READY],
      []
    )
  )

  useEffect(() => {
    if (!deepScripsLoaded) return

    async function handler(event) {
      // do something with event
    }

    handler()
  }, [deepScripsLoaded])

  useEffect(() => {
    const fetchTodo = async () => {
      const {data} = await TodoApi.getAll()
      setTodos(data.todos.map((todo) => new Todo(todo)))
    }

    fetchTodo()

    setTimeout(() => {
      setTodos((prev) => [...prev])
    }, 5000)
  }, [])

  const onSignOut = useCallback(() => {
    auth.signOut()
  }, [])

  const onGoPublic = useCallback(() => {
    router.push(routePaths.public.path)
  }, [])

  const onGoPrivate = useCallback(() => {
    router.push(routePaths.private.path)
  }, [])

  return (
    <div className="p-12 px-24 flex flex-col justify-start items-start">
      <div className="mb-5">
        <h1>Dashboard</h1>
      </div>

      <RouteLeavingGuard
        when={textSearch.length > 0}
        navigate={router.history.push}
        shouldBlockNavigation={(location) => true}
      />
      <Choose>
        <When condition={textSearch.length > 0}>Editing?</When>
        <Otherwise>Nope</Otherwise>
      </Choose>
      <Input
        value={textSearch}
        onChange={(e) => setTextSearch(e.target.value)}
      />

      <br />

      <div className="flex flex-row items-center justify-center">
        <Button onClick={onGoPublic} className="mr-1">
          Public
        </Button>
        <Button onClick={onGoPrivate}>Private</Button>
      </div>
      <Button onClick={onSignOut} className="my-1">
        Remove Token
      </Button>

      <div className="p-2 bg-gray-100 rounded-xl">
        <h3 className="text-lg font-bold">Todos</h3>
        <div className="flex-1">
          <Scrollbar style={{height: 300}}>
            {todos.map((todo) => (
              <div
                key={todo.id}
                className="p-1 mt-1 bg-white rounded cursor-pointer flex"
              >
                <div className="w-10 flex items-center justify-center">
                  <Choose>
                    <When condition={todo.done}>🔳</When>
                    <Otherwise>🔲</Otherwise>
                  </Choose>
                </div>
                <div className="flex-1">
                  <h3>{todo.title}</h3>
                  <div>{todo.description}</div>
                </div>
              </div>
            ))}
          </Scrollbar>
        </div>
      </div>
    </div>
  )
}

export default React.memo(Dashboard)
