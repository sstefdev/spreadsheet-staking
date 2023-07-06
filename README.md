# Staking Rewards Frontend ![accounting-app-logo](./public/favicon-32x32.png)

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Directory Structure](#directory-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Building For Production](#building-for-production)
  - [Additional Commands](#additional-commands)
- [Docker](#docker)

## Introduction

The Staking Rewards Frontend is a web-based application that allows users to create and manage spreadsheets. It provides functionality similar to popular spreadsheet software, such as creating cells, entering formulas, and performing calculations.

## Features

- Create, edit, and delete cells in a grid-based spreadsheet.
- Support for mathematical calculations using formulas.
- Automatic recalculation of dependent cells when a value changes.
- Save and load spreadsheet data.
- Auto-save functionality to persist changes periodically.
- Error handling for invalid formulas and circular dependencies.

## Technologies Used

- [React](https://react.dev/learn): A JavaScript library for building user interfaces.
- [Vite](https://vitejs.dev/guide/) A build tool that provides faster and leaner development experience
- [TypeScript](https://www.typescriptlang.org/docs/handbook/declaration-files/templates/module-d-ts.html): A typed superset of JavaScript that compiles to plain JavaScript.
- [Math.js](https://mathjs.org/): A library for mathematical calculations and expressions.
- [Axios](https://axios-http.com/docs/intro): A promise-based HTTP client for making API requests.
- [React Router](https://reactrouter.com/en/main): A library for routing and navigation in React applications.
- [Tailwind CSS](https://tailwindcss.com/docs/installation): A utility-first CSS framework for rapid UI development.

## Directory Structure

Here is an overview of the project's directory structure:

- src/ # Source code directory
  - assets/ # Project assets
  - components/ # Reusable components
  - containers/ # Application pages
  - libs/ # Library functions
  - styles/ # Project styling files
  - utils/ # Utility functions
  - App.tsx # Main component
  - main.tsx # Main entry point
- public/ # Static assets
- package.json # Project configuration
- README.md # Project documentation

## Getting Started

Follow the instructions below to get a local copy of the project up and running on your machine.

### Prerequisites

- [Node.js](https://nodejs.org/en/docs): Install Node.js from the official website.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/sstefdev/staking-rewards-task
   ```

2. Navigate to the project directory:

   ```bash
   cd <project_directory>
   ```

3. Install project dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open your web browser and access the application at http://localhost:3000.

## Usage

- Upon opening the application, you will see a grid-based spreadsheet interface.
- Click on any cell to edit its value. You can enter numbers, text, or formulas starting with the "=" sign.
- Formulas can include mathematical operations, cell references, and functions provided by the application.
- Changes are automatically saved periodically.
- The application will recalculate dependent cells whenever a referenced cell changes.
- Errors will be displayed if there are circular dependencies or invalid formulas.

## Building for Production

- To create a production-ready build of your application, run the following command:

  ```bash
  npm run build
  ```

  This command builds your application and generates optimized production assets in the dist directory.

- You can preview the production build locally by running:

  ```bash
  npm run preview
  ```

  This command starts a server to serve the production build, allowing you to test and verify the build locally before deployment.

### Additional Commands

- Linting: Run ESLint to analyze and enforce code quality:

  ```bash
  npm run lint
  ```

- Formatting: Run Prettier to format your code according to the defined rules:

  ```bash
  npm run prettier
  ```

## Docker

This repository includes a Dockerfile that can be used to containerize the application for deployment. The Dockerfile sets up the build environment, installs the application dependencies, builds the application, and creates a lightweight production image using serve to serve the static files.

To use the Dockerfile, follow these steps:

1.  Build the Docker image by running the following command in the terminal:

    ```bash
    docker build -t staking-rewards-task .
    ```

2.  Once the image is built, you can run a container from it using the following command:

    ```bash
    docker run -d -p 3000:3000 staking-rewards-task
    ```

The application will be accessible at http://localhost:3000 within your Docker environment.

Note: Ensure that you have Docker installed and running on your machine before running the above commands.
