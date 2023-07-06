// uno.config.ts
import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetMini,
  presetUno,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup,
} from "unocss";

export default defineConfig({
  rules: [],
  shortcuts: {
    'wrapper': "w-full max-w-[1152px] m-auto px-5",
    'btn-flat': "p-0 bg-transparent",
    'btn-primary': "bg-primary py-1 px-2 text-white",
    'btn-transparent': "bg-transparent py-1 px-2 border border-grey"
  },
  theme: {
    colors: {
      primary: "#2ca4ab",
      dark: "#1f2125",
      darkSecondary: "#343a40",
      grey: "#666666", 
      light: "#f4f5f6",
      greyLight: "#ebeef0"
    },
  },
  presets: [
    presetMini({
      dark: "class",
    }),
    presetUno(),
    presetAttributify(),
    presetIcons(),
    presetTypography(),
    presetWebFonts({
      fonts: {
        // these will extend the default theme
        sansSerif: ["Inter", "Inter:400,700", 'sans'],
        sans: ["Amiri Quran", "Amiri Quran:400,700", 'sans-serif'],
      },
    }),
  ],
  transformers: [transformerDirectives(), transformerVariantGroup()],
});
