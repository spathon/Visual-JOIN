# Visual JOIN
Understand how joins work by interacting and see it visually

[joins.spathon.com](https://joins.spathon.com)


## Develop
* `git clone git@github.com:spathon/Visual-JOIN.git`
* `cd Visual-JOIN`
* `npm install`
* `npm run dev`



## Adding a new language

To add a new language (example: `pt`):

1. Create a file under `src/i18n/locales/` (see `pt.ts` as an example).
2. Implement all required keys from the `Translations` type.
3. Add a case in `loadLocale` inside `context.tsx` for lazy loading:

```ts
case 'pt':
  return (await import('./locales/pt')).default
```

4. Allow the locale in `getSavedLocale()` inside `context.tsx` (add it to the supported locale list).

5. Add the locale to the `Locale` type and the `LOCALES` object in `types.ts`:

```ts
export type Locale = 'en' | 'es' | 'fr' | 'de' | 'sv' | 'pt'

export const LOCALES = {
  ...
  pt: 'Português',
}
```

Each locale is lazy-loaded automatically.

For a complete reference implementation, see the commit that introduced the `pt` locale:

https://github.com/spathon/Visual-JOIN/commit/7d6ffdcdfbd95215f47b09d6b04070e837b09226