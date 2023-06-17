// uno.config.ts
import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetMini,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup,
} from "unocss";

export default defineConfig({
  shortcuts: {
    'wrapper': 'w-full max-w-[1152px] m-auto'
  },
  theme: {
    colors: {
      'dark': '#1f2125'
    },
  }, 
  presets: [
    presetMini({
      dark: 'class'
    }),
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
