export type Data = {
  code: number;
  status: string;
};

export type Edition = {
  identifier: string;
  language: string;
  name: string;
  englishName: string;
  type: string;
};

export type Surah = {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  revelationType: string;
};
