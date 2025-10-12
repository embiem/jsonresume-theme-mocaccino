# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a JSON Resume theme called "mocaccino" - a fork of the macchiato theme based on the Caffeine theme. It renders resume data from JSON Resume format into styled HTML using Handlebars templates.

## Development Commands

```bash
# Run tests
npm test

# Lint code
npm run lint

# Format code with prettier
npm run pretty

# Run all checks (used in pre-publish)
npm run prepublishOnly
```

## Architecture

### Core Structure
- `index.js` - Main entry point with `render()` function that compiles Handlebars templates
- `src/resume.hbs` - Main HTML template with two-column layout
- `src/style.css` - CSS styles for the theme
- `src/partials/` - Handlebars partial templates for each resume section
- `resume.json` - Sample resume data following JSON Resume schema

### Template System
The theme uses Handlebars with handlebars-wax for template compilation:
- Main template (`resume.hbs`) includes partials for different resume sections
- Left column: about, skills, languages, interests
- Right column: summary, work, projects, education, volunteer, awards, publications, references
- Each section is a separate partial in `src/partials/`

### Custom Handlebars Helpers (in index.js:6-15)
- `removeProtocol` - Strips protocol from URLs
- `concat` - Joins strings
- `formatAddress` - Formats address components
- `formatDate` - Formats dates as MM/YYYY using moment.js
- `lowercase` - Converts strings to lowercase
- `eq` - Equality comparison

### Key Features
- Tags/keywords support for work experience and skills (displayed as styled chips)
- Font Awesome icons integration
- Responsive design optimized for both web and PDF export
- Supports all JSON Resume schema sections

### Testing
Uses Jest with puppeteer for visual regression testing. Test snapshots are in `src/__tests__/__image_snapshots__/`.

### Theme Usage
This theme is designed to be published as an npm package and used with resume-cli:
```bash
resume export resume.html --theme mocaccino
```