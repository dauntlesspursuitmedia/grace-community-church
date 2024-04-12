import { useCallback, useEffect, useState } from 'react'

// define a typescript definition for grecaptcha enterprise ready and enterprise.execute
// https://developers.google.com/recaptcha/docs/enterprise/verify
// https://developers.google.com/recaptcha/docs/enterprise/clientapi#execute
declare global {
  interface Window {
    grecaptcha: {
        ready: (cb: () => void) => void
        execute: (
          siteKey: string,
          options: { action: string },
        ) => Promise<string>
      
    }
  }
}

export type useRecaptchaParams = {
  siteKey?: string
  action?: string
}

/**
 * useGoogleRecaptcha is a hook that loads the google recaptcha script into the head tag
 * this hook provides a set of utilities for binding a recaptcha token to a user action
 * if the siteKey is not provided these functions are considered noop
 */
export function useGoogleRecaptcha(params: useRecaptchaParams) {
  const [ready, setReady] = useState(false)

  // load the google recaptcha script into the head tag
  // if the siteKey is not provided, the recaptcha will not be loaded but
  // will be marked as ready
  useEffect(() => {
    // do nothing if the siteKey is not provided
    if (!params.siteKey) {
      setReady(true)
      return
    }

    // inject the google recaptcha script into the head tag in a useEffect hook
    const scriptURL = new URL('https://www.google.com/recaptcha/api.js')
    scriptURL.searchParams.set('render', params.siteKey || '')

    const script = document.createElement('script')
    script.src = scriptURL.toString()
    script.async = true
    script.defer = true
    script.onload = () => {
      console.debug('recaptcha loaded')
      window.grecaptcha.ready(() => {
        setReady(true)
      })
    }

    document.head.appendChild(script)

    return () => {
      setReady(false)
      console.debug('recaptcha unloaded')
      document.head.removeChild(script)
    }
  }, [params.siteKey])

  // generate a recaptcha token when a user action is executed
  // return an empty string if the siteKey is not provided
  const execute = useCallback(async () => {
    if (!params.siteKey) {
      return ''
    }

    if (!ready) {
      throw new Error('recaptcha was not loaded properly')
    }

    return await window.grecaptcha.execute(params.siteKey || '', {
      action: params.action || '',
    })
  }, [params.siteKey, params.action, ready])

  return { ready, execute }
}