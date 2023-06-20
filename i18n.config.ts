export default defineI18nConfig(() => ({
  legacy: false,
  locale: 'en',
  messages: {
    en: {
      caption: 'Read, listen, and learn The Noble Quran',
      searchPlaceholder: 'What do you want to read?',
      ayahs: 'ayahs',
      length: 'Length',
      revelation: 'Revelation'
    },
    ru: {
      caption: 'Читай, слушай и изучай Священный Коран',
      searchPlaceholder: 'Что вы хотите прочитать?',
      ayahs: 'аятов',
      length: 'Длина',
      revelation: 'Происхождение'
    }
  }
}))