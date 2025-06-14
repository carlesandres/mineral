# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Structure

Mineral is an offline Markdown notebook application with the following components:

- **mineral-app**: An Electron application that serves as the desktop wrapper
- **mineral-web**: A frontend web application whose build output is used by mineral-app
- **pdf-service**: A microservice for PDF generation using Playwright

## Common Commands

### mineral-app

```bash
# Installation
npm install

# Local development
npm start

# Create application artifacts
npm run make

# Create artifacts and upload to S3
npm run publish
```

## Build Process Details

The application build works as follows:

1. `npm run make` runs the following steps:
   - `premake`: Cleans old artifacts (`clean-artifacts`) and copies the mineral-web build output to the source directory (`create-source`)
   - `make`: Uses electron-forge to package the application

## Known Issues

### DEP0174 Warning

When running `npm run make`, you may see this warning:

```
(node:33293) [DEP0174] DeprecationWarning: Calling promisify on a function that returns a Promise is likely a mistake.
```

This is a warning from the Node.js runtime that occurs in the electron-forge dependency. It happens when `util.promisify()` is used on a function that already returns a Promise. This warning can be safely ignored as it comes from the electron-forge dependency and doesn't affect application functionality.

## Architecture Notes

- The application uses Electron to wrap a web-based UI
- Window state (position, size) is preserved between sessions using electron-settings
- External links are configured to open in the default browser, not in the Electron app
- The app supports zooming functionality with limits between 100% and 500%
- A PDF service is available for generating PDF files from markdown content