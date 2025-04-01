## **Practical Examples of cd in CI/CD** {#practical-examples-of-cd-in-cicd .unnumbered}

Here are concrete examples showcasing the various usages of cd within a GitHub Actions context:

**1. Going Back a Directory:**

- name: Move to Parent Directory

run: cd ..

This navigates to the parent directory of the current working directory.

**2. Conditional Directory Change:**

- name: Enter Optional Directory

run: cd optional-directory && true

This attempts to change to optional-directory. The && true ensures the step succeeds even if the directory doesn\'t exist, preventing workflow failures.

**3. Going Back Two Directories:**

- name: Move Two Levels Up

run: cd ../../

This navigates two levels up in the directory hierarchy.

**4. Home Directory (Workspace):**

- name: Access Workspace Directory

run: \|

cd \~/

\# Perform operations within the workspace

This moves to the workspace directory, represented by \~, which is the default directory for your workflow.

**5. \"Working-directory\" for Specificity:**

- name: Build Project

working-directory: ./project-folder

run: \|

npm install

npm run build

This uses the working-directory option to specify a different starting directory for this step, enhancing clarity and control.It\'s important because CD only applies to this step and it gets reset.For all the subsequent steps. Also, this is important when you are using scripts in different languages. So using the working directory means that you can use an action for example. And thought well, just change that you\'re not able to run a script plus an action at the same time. So in this way working directory is a little bit more agnostic.

**Complete Example:**

name: CI/CD Pipeline

on:

push:

branches:

- main

jobs:

build:

runs-on: ubuntu-latest

steps:

- uses: actions/checkout@v3

- name: Navigate to Project

working-directory: ./my-project

run: \|

echo \"Current directory: \$(pwd)\"

cd src

echo \"Building in directory: \$(pwd)\"

\# \... build commands \...

This example shows how cd and working-directory can be used to navigate directories and control the context for different steps in your workflow, promoting organization and clarity in your CI/CD processes.
