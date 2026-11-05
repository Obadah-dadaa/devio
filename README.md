# Devio — Software Company Website

Static website for **Devio** (web apps, programming, UI/UX design). Plain HTML, CSS and JavaScript — no build step.

## Structure

```
index.html      → page content (sections: hero, services, process, projects, about, contact)
css/style.css   → all styles; brand colors are the variables at the top
js/main.js      → interactivity + the PROJECTS LIST (edit it to add your projects)
images/         → put project screenshots here
```

## Add a project

Open `js/main.js` and add an object to the `projects` array:

```js
{
  title: "My New App",
  category: "web",            // web | design | software
  description: "Short description.",
  tags: ["Laravel", "React"],
  image: "images/my-app.jpg", // or "" for a colored card
  color: ["#6366f1", "#06b6d4"],
  link: "https://...",        // or "" to hide the button
},
```

## Run locally

Open `index.html` in a browser, or serve the folder (e.g. `python -m http.server`).

## Roadmap

- Move the frontend to React
- Laravel backend for the contact form and a projects admin panel
