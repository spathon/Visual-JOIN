# Visual JOIN
Understand how joins work by interacting and see it visually

[joins.spathon.com](https://joins.spathon.com)


## Develop
* `git clone git@github.com:spathon/Visual-JOIN.git`
* `cd Visual-JOIN`
* `npm install`
* `npm run dev`



## Adding a new language

To add a new language:

1. Create a file under `src/i18n/locales/` (see `pt.ts` as an example).

2. Implement all required keys from the `Translations` type.

3. Register the locale in `src/i18n/types.ts`:

```ts
export const SUPPORTED_LOCALES = ['en', 'es', 'fr', 'de', 'sv', 'pt'] as const

export const LOCALES = {
  ...
  pt: 'Português',
}