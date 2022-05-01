class I18n {
	static activeLocale = 'en';
	static translations = {};

	static setLocale(locale) {
		this.activeLocale = locale;
		console.log(this.activeLocale);
	}

	static t(tag) {
		console.log('Active: ' + this.activeLocale);
		return this.translations[this.activeLocale][tag];
	}
}

export default I18n;
