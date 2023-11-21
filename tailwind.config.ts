import type { Config } from "tailwindcss";
import { daisyUiSelectedThemes, myTheme } from "./src/config/themes";

const themes: any = {};

for (const [name, config] of Object.entries(
  require("daisyui/src/theming/themes")
)) {
  const themeName = name.split("=")[1].replace("]", "");
  if (daisyUiSelectedThemes.map((i) => i.name).includes(themeName)) {
    themes[themeName] = {
      ...(config as any),
      ...myTheme,
    };
  }
}
const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  // daisyUI config (optional - here are the default values)
  daisyui: {
    themes: [themes],
    darkTheme: "business", // name of one of the included themes for dark mode
    base: true, // applies background color and foreground color for root element by default
    styled: true, // include daisyUI colors and design decisions for all components
    utils: true, // adds responsive and modifier utility classes
    rtl: false, // rotate style direction from left-to-right to right-to-left. You also need to add dir="rtl" to your html tag and install `tailwindcss-flip` plugin for Tailwind CSS.
    prefix: "", // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
    logs: false, // Shows info about daisyUI version and used config in the console when building your CSS
  },
};
export default config;
