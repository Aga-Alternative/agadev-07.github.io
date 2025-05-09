import { replaceTheme } from './utils/theme.js';
import { setLanguage } from './utils/translate.js';

export function loadEvents(){
  document.querySelector('button#theme-button').addEventListener('click', replaceTheme);
  document.querySelector('select#language-select').addEventListener('change', setLanguage)
}
