import es from '../../locales/es.json' with {type: 'json'};
import en from '../../locales/en.json' with {type: 'json'};
import pt from '../../locales/pt.json' with {type: 'json'};
import ko from '../../locales/ko.json' with {type: 'json'};

export const translations = { es, en, pt, ko };


export function getTranslation(lang, key) {
  if (key in translations[lang]) return translations[lang][key];
  for (const lang of navigator.languages) {
    let language = lang.split('-')[0];
    if (translations[language]?.[key]) return translations[language][key];
  }
  return translations.en[key] ?? key;
}

export function useTranslate() {
  const language = getLanguage();
  const $html = document.documentElement;

  const originalLang = $html.getAttribute('lang');

  if (originalLang === language) return;
  $html.setAttribute('lang', language);

  if (localStorage.getItem('lang'))
    document.querySelector('select#language-select').value = language;

  for (const $el of document.querySelectorAll('[data-lang-key]')) {
    const preLang = $el.hasAttribute('data-lang') ? $el.getAttribute('data-lang') : language;
    const lang = preLang in translations ? preLang : 'en';
    let value = getTranslation(lang, $el.getAttribute('data-lang-key'));
    if ($el.hasAttribute('data-lang-args')) {
      const args = $el.getAttribute('data-lang-args').split(',');
      value = value.replace('%s', args.shift());
    }
    if ($el.hasAttribute('data-lang-args-and-list')) {
      const args = $el.getAttribute('data-lang-args-and-list').split(',');
      const comma = getTranslation(lang, 'comma');
      const and = getTranslation(lang, 'and');
      if (args.length > 1) {
        const last = args.pop();
        let result = args[0];
        for (let i = 1; i < args.length; i++) {
          result = comma.replace('%s', result).replace('%s', args[i]);
        }
        result = and.replace('%s', result).replace('%s', last);
        value = value.replace('%s', result);
      } else value = value.replace('%s', args.shift());
    }
    if ($el.hasAttribute('data-lang-type')) {
      let type = $el.getAttribute('data-lang-type');
      $el.setAttribute(type, value);
    } else $el.textContent = value;
  }
}
export function getLanguage() {
  const saved = localStorage.getItem('lang');
  if (saved && saved in translations) return saved;

  const detected = navigator.languages
    .map(l => l.split('-')[0])
    .find(l => l in translations);

  return detected || 'en';
}
export function setLanguage() {
  const lang = document.querySelector('select#language-select').value;
  if (!lang) localStorage.removeItem('lang');
  if (lang in translations) localStorage.setItem('lang', lang);
  useTranslate();
}
