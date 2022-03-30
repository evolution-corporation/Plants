import * as RNLocalize from 'react-native-localize';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StorageKey, Language, LoadingStatus } from '~constant'

interface LanguagePage {
  code: Language,
  name: string,
  libray: object 
}

type languageCode = Language.ru

class I18n {
  public languages: Array<LanguagePage> = []
  public language?: Language
  public loadingStatus: LoadingStatus = LoadingStatus.NOT_LOADING
  
  constructor(languageLibrays: Array<LanguagePage>, defaultLanguage?: Language) {
    this.loadingStatus = LoadingStatus.LOADING
    this.languages = languageLibrays
    if (defaultLanguage) {
      this.language = defaultLanguage
      LoadingStatus.READY
    } else {

    }
  }

  public setLanguage(language: Language): void {
    this.language = language
  }

  protected async getAsycnStorgeLanguage(): Promise<Language | null> {
    const memoryLanguage: string | null = await AsyncStorage.getItem(StorageKey.LANGUAGE)
    if (memoryLanguage) {
      const language: languageCode = memoryLanguage as languageCode
      return Language[language]
    }
    return null
  }

}