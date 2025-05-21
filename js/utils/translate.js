import es from '/json/lang/es.json' with {type:"json"};
import en from '/json/lang/en.json' with {type:"json"};
import pt from '/json/lang/pt.json' with {type:"json"};

export const translations = {es,en,pt};


export function getTranslation(lang, key) {
	if(key in translations[lang]) return translations[lang][key];
		for (const lang of navigator.languages) {
		let language = lang.split('-')[0];
		if (language in translations) if(key in translations[language]) return translations[language][key];
	}
	if(key in translations.en) return translations.en[key];
	return key;
}

export function useTranslate() {
	const language = getLanguage();
	document.documentElement.setAttribute("lang", language);
	if(localStorage.getItem('lang'))
	document.querySelector('select#language-select').value = language;
	document.querySelectorAll('[data-lang-key]').forEach(e => {
		const preLang = e.hasAttribute('data-lang') ? e.getAttribute('data-lang') : language;
		const lang = preLang in translations ? preLang : 'en';
		let value = getTranslation(lang, e.getAttribute('data-lang-key'));
		if (e.hasAttribute('data-lang-args')) {
			const args = e.getAttribute('data-lang-args').split(',');
			value = value.replace(/%s/g, () => args.shift());
		}
		if (e.hasAttribute('data-lang-type')){
			let type = e.getAttribute('data-lang-type');
			e.setAttribute(type, value);
		}else e.textContent = value;
	});
}
export function getLanguage() {
	let storageLang = localStorage.getItem('lang');
	if (storageLang in translations) return storageLang;
	let language = navigator.language.split('-')[0];
	if (language in translations) return language;
	for (const lang of navigator.languages) {
		let language = lang.split('-')[0];
		if (language in translations) return language;
	}
	return 'en';
}
export function setLanguage() {
	const lang = document.querySelector('select#language-select').value;
	if(!lang) localStorage.removeItem('lang')
	if (lang in translations) localStorage.setItem('lang', lang);
	useTranslate();
}
