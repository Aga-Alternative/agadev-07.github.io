export function UseTranslate(translate, ...args) {
    args.forEach((arg) => {
      translate = translate.replace('%s', arg)
    })
    
    return translate
}

export function useTheme() {
  let theme = localStorage.getItem('theme')

  if(theme !== 'dark') theme = 'light'

  localStorage.setItem('theme', theme)
  document.body.classList.add(theme)
}

export function replaceTheme(){
  let theme = localStorage.getItem('theme')
  document.body.classList.remove(theme)

  theme = theme === 'dark' ? 'light' : 'dark'
  localStorage.setItem('theme', theme)

  useTheme()
}