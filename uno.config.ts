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
    wrapper: "w-full max-w-[1152px] m-auto",
    "bg-main":
      "bg-[url(https://upload.wikimedia.org/wikipedia/commons/d/dc/Young_cats.jpg)]",
  },
  theme: {
    colors: {
      primary: "#2ca4ab",
      dark: "#1f2125",
      grey: "#666666", 
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
