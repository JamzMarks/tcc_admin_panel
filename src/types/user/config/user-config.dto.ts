export enum Theme {
  LIGHT = "LIGHT",
  DARK = "DARK",
}

export enum Language {
  PTBR = "PTBR",
  EN = "EN",
  ES = "ES",
}

export type UserConfigDto = {
  id: string;
  userId: string;
  language: Language;
  theme: Theme;
}

export type UpdateUserConfigDto = {
  userId: string;
  language?: Language;
  theme?: Theme;
}