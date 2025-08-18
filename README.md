<img height="50px" align="right" src="https://raw.githubusercontent.com/fchavonet/fchavonet/main/assets/images/logo-web.png" alt="Web logo">

# Pokédex

## 🔖 Table of contents

<details>
    <summary>
        CLICK TO ENLARGE 😇
    </summary>
    📄 <a href="#description">Description</a>
    <br>
    🎓 <a href="#objectives">Objectives</a>
    <br>
    🔨 <a href="#tech-stack">Tech stack</a>
    <br>
    📂 <a href="#files-description">Files description</a>
    <br>
    💻 <a href="#installation_and_how_to_use">Installation and how to use</a>
    <br>
    🔧 <a href="#whats-next">What's next?</a>
    <br>
    ♥️ <a href="#thanks">Thanks</a>
    <br>
    👷 <a href="#authors">Authors</a>
</details>

## 📄 <span id="description">Description</span>

This project is a responsive Pokédex web application built using React. It serves as a training exercise to deepen my understanding of React and API integration. The app is in French and uses two public APIs: [Tyradex](https://tyradex.vercel.app/) for Pokémon data in French and [PokeAPI](https://pokeapi.co/) for high-resolution images.
<br>
I started entirely from scratch, coding all components myself without importing pre-made ones, in order to truly practice and strengthen my React skills.

Features include:

- Region selection to load Pokémon by generation.
- Pokémon listing per selected region.
- Clickable Pokémon to view detailed information.
- Search functionality for quick lookup.

## 🎓 <span id="objectives">Objectives</span>

- Gain practical experience with React and component architecture.
- Work with asynchronous JavaScript: fetch(), async/await.
- Manage French-language API data (Tyradex) alongside image retrieval (PokeAPI).
- Build a responsive, user-friendly interface with reusable components.
- Encourage clean, maintainable code practices and state handling.

## 🔨 <span id="tech-stack">Tech stack</span>

<p align="left">
    <img src="https://img.shields.io/badge/HTML5-e34f26?logo=html5&logoColor=white&style=for-the-badge" alt="HTML5 badge">
    <img src="https://img.shields.io/badge/CSS3-1572b6?logo=css3&logoColor=white&style=for-the-badge" alt="CSS3 badge">
    <img src="https://img.shields.io/badge/JAVASCRIPT-f7df1e?logo=javascript&logoColor=black&style=for-the-badge" alt="JavaScript badge">
    <img src="https://img.shields.io/badge/REACT-61dafb?logo=react&logoColor=black&style=for-the-badge" alt="REACT badge">
    <img src="https://img.shields.io/badge/TAILWIND-06b6d4?logo=tailwindcss&logoColor=white&style=for-the-badge" alt="Tailwind badge">
    <img src="https://img.shields.io/badge/GIT-f05032?logo=git&logoColor=white&style=for-the-badge" alt="Git badge">
    <img src="https://img.shields.io/badge/GITHUB-181717?logo=github&logoColor=white&style=for-the-badge" alt="GitHub badge">
    <img src="https://img.shields.io/badge/MARKDOWN-000000?logo=markdown&logoColor=white&style=for-the-badge" alt="Markdown badge">
    <img src="https://img.shields.io/badge/VS CODE-007acc?logo=data:image/svg+xml;base64,PCFET0NUWVBFIHN2ZyBQVUJMSUMgIi0vL1czQy8vRFREIFNWRyAxLjEvL0VOIiAiaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkIj4KDTwhLS0gVXBsb2FkZWQgdG86IFNWRyBSZXBvLCB3d3cuc3ZncmVwby5jb20sIFRyYW5zZm9ybWVkIGJ5OiBTVkcgUmVwbyBNaXhlciBUb29scyAtLT4KPHN2ZyBmaWxsPSIjZmZmZmZmIiB3aWR0aD0iODAwcHgiIGhlaWdodD0iODAwcHgiIHZpZXdCb3g9Ii0wLjUgMCAyNCAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KDTxnIGlkPSJTVkdSZXBvX2JnQ2FycmllciIgc3Ryb2tlLXdpZHRoPSIwIi8+Cg08ZyBpZD0iU1ZHUmVwb190cmFjZXJDYXJyaWVyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KDTxnIGlkPSJTVkdSZXBvX2ljb25DYXJyaWVyIj4KDTxwYXRoIGQ9Im0xNy44NTggMjMuOTk4LTkuNzcxLTkuNDg0LTUuODY2IDQuNDY1LTIuMjIxLTEuMTE1di0xMS43MTlsMi4yMzQtMS4xMjEgNS44NyA0LjQ2OSA5Ljc0Ny05LjQ5MyA1LjU4NyAyLjIzOXYxOS41MzFsLTUuNTc5IDIuMjN6bS0uNTYzLTE2LjE4Ni01LjU3NyA0LjE3MyA1LjU4IDQuMjAyem0tMTQuNTA3IDEuNjg1djUuMDE2bDIuNzg3LTIuNTI1eiIvPgoNPC9nPgoNPC9zdmc+&logoColor=white&style=for-the-badge" alt="VS Code badge">
</p>

## 📂 <span id="files-description">Files description</span>

| **FILES**           | **DESCRIPTION**                                   |
| :-----------------: | ------------------------------------------------- |
| `public`            | Public assets.                                    |
| `src`               | React source code (components, utilities...).     |
| `index.html`        | Application's HTML entry point.                   |
| `vite.config.js`    | Vite configuration for development and building.  |
| `package.json`      | Dependencies and scripts configuration.           |
| `package-lock.json` | Exact dependency version lockfile.                |
| `eslint.config.js`  | Linter configuration to enforce code quality.     |
| `.gitignore`        | Specifies files and folders to be ignored by Git. |
| `README.md`         | The README file you are currently reading 😉.    |

## 💻 <span id="installation_and_how_to_use">Installation and how to use</span>

**Installation:**

1. Clone this repository:
    - Open your preferred Terminal.
    - Navigate to the directory where you want to clone the repository.
    - Run the following command:

```bash
git clone https://github.com/fchavonet/web-pokedex.git
```

2. Open the repository you've just cloned.

3. Install dependencies:

```bash
npm install
```

4. Run the Jest test suite to ensure everything works correctly:

```bash
npm run test
```

5. Start the development server:

```bash
npm run dev
```

**How to use:**

1. Select a region (generation) from the navigation bar on the top.
2. Browse the displayed list of Pokémon from that region in the sidebar.
3. Use the search bar to filter Pokémon by name.
4. Click on a Pokémon card to display its detailed information and images on the right panel.
5. Enjoy a fully responsive UI on mobile and desktop.

You can also test the web application online by clicking [here](https://fchavonet.github.io/web-pokedex/). 

<table>
    <tr>
        <th align="center" style="text-align: center;">Desktop view</th>
        <th align="center" style="text-align: center;">Mobile view</th>
    </tr>
    <tr valign="top">
        <td align="center">
            <img src="./public/screenshot-pokedex-desktop.webp" alt="Screenshots">
        </td>
        <td align="center">
            <img src="./public/screenshot-pokedex-mobile.webp" alt="Mobile Screenshot" width="100%">
        </td>
    </tr>
</table>

## 🔧 <span id="whats-next">What's next?</span>

- Integrate an additional API to display a new section with trading cards related to the selected Pokémon.
- Further split the application into smaller, reusable React components.
- Refactor and clean the codebase for better readability and maintainability.
- Enhance the user interface with a dark/light mode toggle for improved accessibility.
- Strengthen error handling by providing clear, user-friendly messages in case of network issues.

## ♥️ <span id="thanks">Thanks</span>

- Many thanks to the developers of [Tyradex](https://tyradex.vercel.app/) and [PokeAPI](https://pokeapi.co/) for making Pokémon data freely accessible in multiple formats.

## 👷 <span id="authors">Authors</span>

**Fabien CHAVONET**
- GitHub: [@fchavonet](https://github.com/fchavonet)
