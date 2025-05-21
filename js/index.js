import { setInterface } from './interface.js';
import { loadEvents } from './interactions.js';
import { useTheme } from './utils/theme.js';
import { useTranslate } from './utils/translate.js';

document.addEventListener('DOMContentLoaded', () => {
	useTheme();
	setInterface();

	loadEvents();
	useTranslate();
});