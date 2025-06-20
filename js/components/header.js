import { AUTHOR } from '../data.js';
import { replaceTheme } from '../utils/theme.js';
import { translations } from '../utils/translate.js';

export default class AgaHeader extends HTMLElement {
  constructor() {
    super();

    const $author = document.createElement('h1');
    $author.textContent = AUTHOR;
    this.appendChild($author);

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
      const $h2 = document.createElement('h2');

      $li.appendChild($a);
      $a.appendChild($h2);
      $a.href = link;
      $h2.setAttribute('data-lang-key', translate)

      $ul.appendChild($li);
    };
    $nav.appendChild($ul);
    this.appendChild($nav);

    const $div = document.createElement('div')

    const $languageSelector = document.createElement('select');
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
    $div.appendChild($languageSelector);
    const $themeButton = document.createElement('button');
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
