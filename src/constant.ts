export enum LoadingStatus {
  NOT_LOADING,
  LOADING,
  READY
}

export enum StorageKey {
  LANGUAGE = '@Language',
  IS_FIRST_LOADING = '@IsFirstLoading'
}

export enum Language {
  ru = 'ru',
}

export enum AuthStatus {
    NOT_DEFINITELY = 'notDefinitely',
    AUTHORIZED = 'authorized',
    NO_AUTHORIZED = 'noAuthorized',
}

export enum FirstLoading {
  NOT_DEFINITELY,
  TRUE,
  FALSE
}