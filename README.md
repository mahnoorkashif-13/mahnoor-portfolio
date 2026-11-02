# Mahnoor Kashif: Marketing Portfolio

A static copy of the Canva website "Marketing Portfolio Website". It needs no build step.

## Run it locally

From this folder, run `npx serve` and open the address it prints.

## Deploy to Vercel

1. Push this folder to a GitHub repository.
2. In Vercel, choose **Add New > Project** and import the repository.
3. Leave the framework preset as **Other** with no build command, then click **Deploy**.

To deploy without GitHub, run `npx vercel` from this folder instead.

## Files

- `index.html`: all 10 sections, in page order.
- `css/styles.css`: fonts and shared styles.
- `js/scale.js`: scales the 1366px design to fit the browser width.
- `assets/img`: images, named by section.
- `assets/video`: Campus Career screen recordings.
- `assets/fonts`: self-hosted Fredoka One, ABeeZee, Kalam and DM Sans.

## Known differences from Canva

- Text set in Canva-only fonts is drawn as vector shapes, so it can't be selected as text. This covers the name, "PORTFOLIO", the card titles, two section headings and the mockup labels.
