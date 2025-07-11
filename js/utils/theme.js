export function useTheme() {
  let theme = localStorage.getItem('theme');

  if (theme !== 'dark') theme = 'light';

  localStorage.setItem('theme', theme);
  document.documentElement.setAttribute('data-theme', theme);
}

export function replaceTheme() {
  let theme = localStorage.getItem('theme');
  document.documentElement.removeAttribute('data-theme');

  theme = theme === 'dark' ? 'light' : 'dark';
  localStorage.setItem('theme', theme);

  useTheme();
}
