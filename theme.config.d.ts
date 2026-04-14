export const themeColors: {
  primary:    { light: string; dark: string };
  background: { light: string; dark: string };
  surface:    { light: string; dark: string };
  foreground: { light: string; dark: string };
  muted:      { light: string; dark: string };
  border:     { light: string; dark: string };
  success:    { light: string; dark: string };
  warning:    { light: string; dark: string };
  error:      { light: string; dark: string };
  night:      { light: string; dark: string };
  petal:      { light: string; dark: string };
  petalDeep:  { light: string; dark: string };
  leaf:       { light: string; dark: string };
  leafDark:   { light: string; dark: string };
  tdah:       { light: string; dark: string };
  tdahLight:  { light: string; dark: string };
  dopamine:   { light: string; dark: string };
  bark:       { light: string; dark: string };
  pistil:     { light: string; dark: string };
};

declare const themeConfig: {
  themeColors: typeof themeColors;
};

export default themeConfig;
