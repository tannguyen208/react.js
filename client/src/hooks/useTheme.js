import {useCallback, useState} from 'react'
import {useBetween} from 'use-between'
import {produce} from 'immer'
import * as storage from 'src/utils/storage'

const storageKey = 'theme'
const useSharedTheme = () => {
  const [state, setState] = useState({
    theme: null,
    themes: [],
    themeLoaded: false,
  })

  const changeTheme = (themeId) => {
    if (state.theme && state.theme.id === themeId) return

    storage.set(storageKey, themeId)
    setState(
      produce(state, (draft) => {
        draft.theme = state.themes.find((theme) => theme.id === themeId)
      })
    )
  }

  const fetchThemes = useCallback(() => {
    const get = async () => {
      const localTheme = storage.get(storageKey, null)
      // @ts-ignore
      // FIXME: Change to get themes from API or ignore if config on local
      const {default: response} = await import('src/assets/themes.json')
      const selectedTheme =
        response.themes.find((theme) => theme.id === localTheme) ||
        response.themes[0]

      storage.set(storageKey, selectedTheme.id)

      setState(
        produce(state, (draft) => {
          draft.themes = response.themes
          draft.theme = selectedTheme
          draft.themeLoaded = true
        })
      )
    }

    get()
  }, [])

  return {...state, changeTheme, fetchThemes}
}

export const useTheme = () => useBetween(useSharedTheme)
