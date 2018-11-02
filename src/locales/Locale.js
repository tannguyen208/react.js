class Locale {
  constructor(language) {
    this.strings = language;
    this.subscriptions = [];
  }

  setLanguage(language) {
    this.strings = language;
    this.subscriptions.forEach(cb => cb());
  }

  subscribe(cb) {
    this.subscriptions.push(cb);
  }
}

export default Locale;
