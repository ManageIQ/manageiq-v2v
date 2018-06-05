import { addLocaleData } from 'react-intl';

// hard wired to english for now
import en from 'react-intl/locale-data/en';
import fr from 'react-intl/locale-data/fr';
import es from 'react-intl/locale-data/es';
import ja from 'react-intl/locale-data/ja';
import zh_CN from 'react-intl/locale-data/zh';
import pt_BR from 'react-intl/locale-data/pt';

class I18n {
  constructor(locale, timezone) {
    zh_CN[0].locale = 'zh_CN';
    pt_BR[0].locale = 'pt_BR';
    this.fallbackIntl = !global.Intl;

    [this.locale] = locale.split('-');
    this.timezone = this.fallbackIntl ? 'UTC' : timezone;

    // this.loaded = false;
    // this.ready = this.init();

    // hard wired for now
    addLocaleData([...en, ...fr, ...es, ...ja, ...zh_CN, ...pt_BR]);
    this.loaded = true;
  }

  // todo: gather react-intl locale-data from the server asynchronously
  // async init() {
  //   await this.fetchIntl();
  //   addLocaleData(await import(`react-intl/locale-data/${this.locale}`));
  //   this.loaded = true;
  // }

  // async fetchIntl() {
  //   if (this.fallbackIntl) {
  //     global.Intl = await import('intl');
  //     await import(`intl/locale-data/jsonp/${this.locale}`);
  //   }
  // }
}

const [htmlElemnt] = document.getElementsByTagName('html');
const langAttr = htmlElemnt.getAttribute('lang') || 'en';
const timezoneAttr = htmlElemnt.getAttribute('data-timezone') || 'UTC';

const i18n = new I18n(langAttr, timezoneAttr);

export default i18n;
