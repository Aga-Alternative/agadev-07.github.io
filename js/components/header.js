import { AUTHOR } from '../data.js';
import { replaceTheme } from '../utils/theme.js';
import { setLanguage, translations } from '../utils/translate.js';

export default class AgaHeader extends HTMLElement {
  constructor() {
    super();

    const $info = document.createElement('div');
    const $logo = document.createElement('svg');
    $logo.setAttribute('src', 'logo.svg')
    $info.appendChild($logo)

    const $author = document.createElement('h1');
    $author.textContent = AUTHOR;
    $info.appendChild($author);
    this.appendChild($info);

    const $nav = document.createElement('nav');
    const $ul = document.createElement('ul');
    const Interface = {
      nav: [
        ['/', 'home'],
        //	['/about', 'about'],
        //	['/contact', 'contact'],
        ['/projects', 'projects'],
      ],
    };
    for (const [link, translate] of Interface.nav) {
      const $li = document.createElement('li');
      const $a = document.createElement('a');

      $a.href = link;
      $a.setAttribute('data-lang-key', translate)
      
      $li.appendChild($a);
      $ul.appendChild($li);
    };
    $nav.appendChild($ul);
    this.appendChild($nav);

    const $div = document.createElement('div')

    const $languageSelector = document.createElement('select');
    $languageSelector.id = "language-select";
    $languageSelector.setAttribute("data-lang-key", "language_selector");
    $languageSelector.setAttribute("data-lang-type", "aria-label")
    const $navigator = document.createElement('option');
    $navigator.setAttribute('value', '');
    $navigator.setAttribute('data-lang-key', '_navigator_');
    $languageSelector.appendChild($navigator);

    for (const lang of Object.keys(translations)) {
      const $lang = document.createElement('option');
      $lang.setAttribute('value', lang);
      $lang.setAttribute('data-lang', lang);
      $lang.setAttribute('data-lang-key', '_name_');
      $languageSelector?.appendChild($lang)
    }
    $languageSelector.addEventListener("change", setLanguage);  
    $div.appendChild($languageSelector);
    const $themeButton = document.createElement('button');
    $themeButton.setAttribute("data-lang-key", "theme_button");
    $themeButton.setAttribute("data-lang-type", "aria-label")
    const $svg = document.createElement('svg');
    $svg.setAttribute('src', 'svg/themes.svg');
    $themeButton.appendChild($svg);
    $themeButton.addEventListener('click', () => {
      $themeButton.setAttribute('disabled', '');
      document.documentElement.className = 'animate';
      setTimeout(() => $themeButton.removeAttribute('disabled'), 1000);
      replaceTheme();
    });
    $div.appendChild($themeButton)
    this.appendChild($div)
  }
}
customElements.define('aga-header', AgaHeader)
