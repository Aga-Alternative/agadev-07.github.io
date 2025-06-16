import { replaceTheme } from './utils/theme.js';
import { setLanguage } from './utils/translate.js';

export function loadEvents() {
	const $ThemeButton = document.querySelector('button#theme-button');
	$ThemeButton.addEventListener('click', () => {
		$ThemeButton.setAttribute('disabled', '');
		replaceTheme();
		setTimeout(() => $ThemeButton.removeAttribute('disabled'), 1000);
		document.documentElement.className = 'animate'
	});
	document.querySelector('select#language-select').addEventListener('change', setLanguage);
}
