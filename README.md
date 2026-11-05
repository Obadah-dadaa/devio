# Devio — Software Company Website

Static website for **Devio** (web apps, custom software, UI/UX design). Plain HTML, CSS and JavaScript, no build step.

## Structure

```
index.html          → page content (hero, services, process, work, about, contact)
css/style.css       → all styles; colour and spacing tokens are at the top (one accent: --accent)
js/main.js          → interactions + the PROJECTS LIST (edit it to add your projects)
assets/icons/       → project icon set (source: favicon.svg)
site.webmanifest    → icon manifest
images/             → put project screenshots here
CLAUDE.md, .claude/ → rules, permissions and design skills for Claude Code
```

## Add a project

Open `js/main.js` and add an object to the `projects` array:

```js
{
  title: "My New App",
  category: "web",            // web | design | software
  description: "Short description.",
  tags: ["Laravel", "React"],
  image: "images/my-app.jpg", // or "" for no image
  link: "https://...",        // or "" to hide the link
},
```

## Motion and interaction

Every effect says something: the hero enters once, sections settle in as you reach them, the process
lines draw in order, one indicator marks the current section and the selected filter, cards and rows
answer hover, the header steps aside while you read and returns when you scroll up, and the form shakes
the fields that need fixing. All motion uses `transform`/`opacity` and switches off under
`prefers-reduced-motion`. Without JavaScript all content is still visible.

## Contact form

There is no backend yet. After validation the form opens the visitor's email app with the message
filled in, addressed to `hello@devio.com`. Replace `sendMessage()` in `js/main.js` with a POST to the
Laravel API when it exists.

## Run locally

Open `index.html` in a browser, or serve the folder (`python -m http.server`).

## Roadmap

- Move the frontend to React
- Laravel backend for the contact form and a projects admin panel
