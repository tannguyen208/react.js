import {useState} from 'react'
import * as cookieUtil from 'src/utils/cookie'

export function useCookie(key, initialValue) {
  const [cookie, setCookie] = useState(() => {
    return cookieUtil.get(key, initialValue)
  })

  const updateCookie = (value, options) => {
    setCookie(value)
    cookieUtil.set(key, value, options)
  }

  return [cookie, updateCookie]
}
