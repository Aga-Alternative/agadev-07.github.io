import es from '/json/lang/es.json' with {type:"json"};
import en from '/json/lang/en.json' with {type:"json"};
import pt from '/json/lang/pt.json' with {type:"json"};

export const translations = {es,en,pt};

export function useTranslate() {
	const language = getLanguage();
	document.querySelectorAll('[lang-key]').forEach(e => {
		const preLang = e.hasAttribute('lang') ? e.getAttribute('lang') : language;
		const lang = preLang in translations ? preLang : 'en';
		e.textContent = translations[lang]?.[e.getAttribute('lang-key')];
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
