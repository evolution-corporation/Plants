import * as Localization from 'expo-localization';
import i18n from 'i18n-js';
import asyncStorage from '../asyncStorge.js'
import ru from './ru';

i18n.translations = { ru };
i18n.setListner = (callback) => {i18n.onChangeLanguage = callback}

i18n.setLanguage = async (language) => {
  if (!language) {
    language = await asyncStorage.getLanguage()
  }
  if (!language || language === 'system') {
    const userUsingLocalization = Localization.locales;
    const appUsingLocalization = Object.keys(i18n.translations);
    console.log(userUsingLocalization)
    for (let languageUsingUser of userUsingLocalization) {
      if (appUsingLocalization.includes(languageUsingUser)) {
        language === languageUsingUser;
        break
      }
    }
  } 
  i18n.locale = language ?? Object.keys(i18n.translations)[0]
  await asyncStorage.setLanguage(i18n.locale)
  if (i18n.onChangeLanguage) i18n.onChangeLanguage(i18n.locale)
  return i18n.locale
}

i18n.fallbacks = true;
i18n.pluralization = undefined;
i18n.pluralization['ru'] = count => ([
  count === 0 ? 'zero' :
    count % 10 === 1 && count % 100 !== 11
      ? 'one'
      : [2, 3, 4].indexOf(count % 10) >= 0 &&
      [12, 13, 14].indexOf(count % 100) < 0
        ? 'few'
        : count % 10 === 0 ||
        [5, 6, 7, 8, 9].indexOf(count % 10) >= 0 ||
        [11, 12, 13, 14].indexOf(count % 100) >= 0
          ? 'many'
          : 'other'
]);

export default i18n;
