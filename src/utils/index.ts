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
