import { useCallback, useState } from 'react'
import { useBetween } from 'use-between'
import { produce } from 'immer'
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
    const __func = async () => {
      const localTheme = storage.get(storageKey, null)
      const { default: response } = await import('src/assets/themes.json')
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

    __func()
  }, [])

  return { ...state, changeTheme, fetchThemes }
}

export const useTheme = () => useBetween(useSharedTheme)
