import './components/index.js';
import { setInterface } from './interface.js';
import { useTheme } from './utils/theme.js';
import { useTranslate } from './utils/translate.js';
import { loadSVGs } from './utils/svg_loader.js';

document.addEventListener('DOMContentLoaded', () => {
  loadSVGs();
  useTheme();
  setInterface();

  useTranslate();
});
