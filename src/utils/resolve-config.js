import defaultTheme from "tailwindcss/defaultTheme";

// tailwindcss 4 dropped resolveConfig, but the breakpoint hooks here and in @sliit-foss/bashaway-ui still call it for theme.screens
export default (config) => ({
  theme: {
    screens: { ...(config.theme?.screens ?? defaultTheme.screens), ...config.theme?.extend?.screens }
  }
});
