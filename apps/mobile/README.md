# Recetas Rápidas - MVP (Expo + TS)

## Ejecutar

```bash
npm install
npm run android # o npm run web
```

Usa Expo Go en tu dispositivo para escanear el QR.

## Estructura clave

- `src/data/*.json`: catálogo base/premium y listas.
- `src/domain/suggest.ts`: motor de sugerencias local.
- `src/store/useAppStore.ts`: estado global con persistencia.
- `src/hooks/useRecipeSuggestor.ts`: hook memoizado.
- `src/app/(tabs)/*`: pantallas.

## Añadir recetas al JSON

1. Edita `src/data/recipes.base.json` (gratis) o `src/data/recipes.premium.json` (premium).
2. Sigue el tipo `Recipe`:

```ts
{
  "id": "string-unica",
  "title": "Nombre",
  "ingredients": [{ "name": "arroz", "qty": "opcional" }],
  "steps": ["Paso 1", "Paso 2"],
  "tags": ["rápida", "barata"],
  "timeMinutes": 12,
  "servings": 2,
  "substitutions": [{ "from": "crema", "to": "yogur" }]
}
```

Mantén 4–6 pasos cortos, tags simples y tiempo realista.

## Tests

```bash
npm test
```

## TODO futuro

- Integrar i18n en UI.
- Ads reales (AdMob) detrás de `AdsProvider`.
- Packs remotos y generación con IA.
