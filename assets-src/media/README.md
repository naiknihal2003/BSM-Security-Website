Drop master images into the folder that matches what they show —
`photos/`, `services/`, `people/` or `clients/` — then run `npm run media`.

Filenames carry through: `services/head-office.jpg` here becomes
`/media/services/head-office.webp` on the site, which is what you write in
`lib/media/photos.ts`.
