import './components/index.js';
import { setInterface } from './interface.js';
import { useTheme } from './utils/theme.js';
import { useTranslate } from './utils/translate.js';

document.addEventListener('DOMContentLoaded', () => {
  useTheme();
  setInterface();
  useTranslate();
});
