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
    wrapper: "w-full max-w-[1152px] m-auto px-5",
  },
  theme: {
    colors: {
      primary: "#2ca4ab",
      dark: "#1f2125",
      darkSecondary: "#343a40",
      grey: "#666666", 
      light: "#f4f5f6"
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
        sansSerif: ["Inter", "Inter:400,700"],
        sans: ["Noto Naskh Arabic", "Noto Naskh Arabic:400,700"],
      },
    }),
  ],
  transformers: [transformerDirectives(), transformerVariantGroup()],
});
