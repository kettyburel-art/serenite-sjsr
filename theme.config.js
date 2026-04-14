/** @type {const} */
const themeColors = {
  // Brand colors — Sérénité Anti-SJSR & TDAH
  primary:    { light: '#c45c78', dark: '#e07898' },   // blossom rose
  background: { light: '#faf6f3', dark: '#1e1218' },   // crème chaud / nuit prune
  surface:    { light: '#ffffff', dark: '#2a1a24' },   // carte blanche / prune doux
  foreground: { light: '#3a2820', dark: '#f0e8e4' },   // texte brun chaud
  muted:      { light: '#9b7060', dark: '#a08070' },   // texte secondaire écorce
  border:     { light: '#ede0d8', dark: '#4a3040' },   // bordures douces
  success:    { light: '#5a8a5a', dark: '#7aab72' },   // vert feuille
  warning:    { light: '#d4a843', dark: '#e8c060' },   // or pistil
  error:      { light: '#c45c78', dark: '#e07898' },   // rose erreur
  // Custom semantic tokens
  night:      { light: '#3a2030', dark: '#1a0e18' },   // header prune profond
  petal:      { light: '#f2c4ce', dark: '#c49098' },   // rose pétale
  petalDeep:  { light: '#e8899a', dark: '#c06070' },   // rose profond
  leaf:       { light: '#a8c89a', dark: '#7a9870' },   // vert clair
  leafDark:   { light: '#5a8a5a', dark: '#4a7a4a' },   // vert foncé
  tdah:       { light: '#7c5cbf', dark: '#9a7cd8' },   // violet TDAH
  tdahLight:  { light: '#ede8f8', dark: '#2a2040' },   // fond violet clair
  dopamine:   { light: '#e07840', dark: '#f09060' },   // orange dopamine
  bark:       { light: '#6b4c3b', dark: '#9b7060' },   // écorce
  pistil:     { light: '#d4a843', dark: '#e8c060' },   // or pistil
};

module.exports = { themeColors };
