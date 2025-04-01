## **Setting up Static Analysis in GitHub Actions for a React App** {#setting-up-static-analysis-in-github-actions-for-a-react-app .unnumbered}

Here\'s a guide to setting up static analysis actions in your React app\'s GitHub Actions workflow:

**1. Define Your Workflow:**

name: Static Analysis

on:

push:

branches:

\- main

pull_request:

branches:

\- main

jobs:

static-analysis:

runs-on: ubuntu-latest

steps:

\- name: Checkout code

uses: actions/checkout@v3

\- name: Setup Node.js

uses: actions/setup-node@v3

with:

node-version: \'18\' \# Use your desired Node version

\- name: Install dependencies

run: npm install

\# Static analysis steps below

**2. Choose Your Tools:**

**ESLint:** Catches code style and potential errors:\

- name: Run ESLint

uses: actions/eslint-action@v3

with:

files: \'src/\*\*/\*.js\'

eslint-path: \'./node_modules/eslint\' \# Adapt if ESLint is installed globally

-

**Prettier:** Enforces consistent code formatting:\

- name: Run Prettier

uses: actions/prettier@v3

with:

files: \'src/\*\*/\*.js\'

-

**Stylelint:** Analyzes CSS and SCSS for style errors and inconsistencies:\

- name: Run Stylelint

uses: stylelint/actions/lint@v2

with:

configFile: \'.stylelintrc.json\' \# Adjust config file path if necessary

files: \'src/\*\*/\*.{css,scss}\'

-

**SonarQube:** Detects bugs, code smells, and security vulnerabilities:\

- name: SonarQube Scan

uses: sonarsource/sonarqube-scan-action@master

env:

SONAR_TOKEN: \${{ secrets.SONAR_TOKEN }} \# Store your SonarQube token securely

with:

projectBaseDir: \'.\'

\# Configure SonarQube project settings as needed

-

**3. Customize Configuration:**

- Create configuration files (.eslintrc.json, .prettierrc.json, .stylelintrc.json, sonar-project.properties) for each tool in your project root.

- Use eslint-config-react-app for a good starting point for React-specific ESLint rules.

**4. Fail on Errors (Optional):**

Configure actions to fail the workflow if issues are found. This enforces code quality. For example:\

- name: Run ESLint

uses: actions/eslint-action@v3

with:

files: \'src/\*\*/\*.js\'

eslint-path: \'./node_modules/eslint\'

failOnError: true
