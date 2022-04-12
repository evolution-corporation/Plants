import * as RNLocalize from 'react-native-localize';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StorageKey, Language, LoadingStatus } from '~constant';
import RU from './ru.json';

interface LanguagePage {
	code: Language;
	name: string;
	libray: object;
}

interface TranslateOption {
	count?: number;
	paste?: string;
}

type languageCode = Language.ru;

class I18nCustom {
	public languages: Array<LanguagePage> = [];
	public language?: Language;
	public loadingStatus: LoadingStatus = LoadingStatus.NOT_LOADING;
	public region: string;
	protected libray?: { [index: string]: string | { [index: number]: string } };
	protected defaultLanguage: Language;
	protected subscribe: { (status: Language | null): void } = (status) => {
		console.log(status);
	};

	constructor(languageLibrays: Array<LanguagePage>, defaultLanguage?: Language) {
		this.loadingStatus = LoadingStatus.LOADING;
		this.languages = languageLibrays;
		this.defaultLanguage = defaultLanguage ?? (languageLibrays[0].code as languageCode);
		this.optionLanguage();
		this.region = RNLocalize.getLocales()[0].countryCode;
	}

	public setLanguage(language: Language): void {
		this.language = language;
		const languageOptions: LanguagePage =
			this.languages[this.languages.findIndex((item) => item.code == this.language)];
		this.libray = languageOptions.libray as { [index: string]: string };
		this.subscribe(this.language);
	}

	protected async getAsycnStorageLanguage(): Promise<Language | null> {
		const memoryLanguage: string | null = await AsyncStorage.getItem(StorageKey.LANGUAGE);
		if (memoryLanguage) {
			const language: languageCode = memoryLanguage as languageCode;
			return Language[language];
		}
		return null;
	}

	protected getSystemLanguage(): Language | null {
		const systemLanguagesCode: Array<string> = RNLocalize.getLocales().map((language) => language.languageCode);
		for (let systemLanguageCode of systemLanguagesCode) {
			if (this.languages.map((appLanguage) => appLanguage.code).includes(systemLanguageCode as languageCode)) {
				return systemLanguageCode as languageCode;
			}
		}
		return null;
	}

	protected async optionLanguage(): Promise<void> {
		const asyncStorageLanguage: Language | null = await this.getAsycnStorageLanguage();
		const systemLanguageCode: Language | null = this.getSystemLanguage();
		if (asyncStorageLanguage) {
			this.language = asyncStorageLanguage;
		} else if (systemLanguageCode) {
			this.language = systemLanguageCode;
		} else {
			this.language = this.defaultLanguage;
		}
		const languageOptions: LanguagePage =
			this.languages[this.languages.findIndex((item) => item.code == this.language)];
		this.libray = languageOptions.libray as { [index: string]: string };
		this.loadingStatus = LoadingStatus.READY;
		this.subscribe(this.language);
	}

	public t(textId: string, translateOption?: TranslateOption): string {
		if (this.libray == undefined) throw new Error('Not Libray');
		let text: string = '';
		let textRow: string | { [index: number]: string } | undefined = this.libray[textId];
		if (textRow == undefined) return '--missing translate--';
		// console.log(textRow)
		if (typeof textRow == 'string') {
			return textRow;
		}
		return 'q';
	}

	public setSubscribe(callBack: { (status: Language | null): void }) {
		this.subscribe = callBack;
		callBack(this.language ?? null);
	}
}

export default new I18nCustom([{ code: Language.ru, libray: RU, name: 'Русский' }]);
