import { LocationQueryRaw } from 'vue-router'

export const changePrimeTheme = (targetTheme: string): void => {
  const links = document.querySelectorAll('link[data-prime-theme]')
  Array.from(links).forEach((link) => {
    const name = link.getAttribute('data-prime-theme')
    if (name === targetTheme) {
      link.removeAttribute('disabled')
    } else {
      link.setAttribute('disabled', '')
    }
  })
}

export const appendPath = (path: string, pathToAppend: string): string =>
  pathToAppend ? path + (path.endsWith('/') ? '' : '/') + pathToAppend : path

export const omitUrlSearchParams = (
  params: LocationQueryRaw
): LocationQueryRaw => {
  return Object.fromEntries(
    Object.entries(params).filter(([, val]) => val !== undefined)
  )
}
