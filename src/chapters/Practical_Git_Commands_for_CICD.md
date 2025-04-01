## **Practical Git Commands for CI/CD** {#practical-git-commands-for-cicd .unnumbered}

Here are practical examples of common git commands used in CI/CD pipelines, specifically within a GitHub Actions context:

**1. Cloning a Repository:**

- name: Checkout Code

uses: actions/checkout@v3

with:

repository: your-org/your-repo

ref: your-branch

This step uses the official actions/checkout action to clone the specified repository and branch.Do you want to do this? For example if you want to do some commits that have to be on the pipeline? For example there might be some bots, for example linting bots or chore bots that.Add version numbers are kind of things like that and you want to differentiate it between a actual user and some like clean up.Our utility.To make it clear for your commit history.

**2. Setting up User Information:**

- name: Configure Git User

run: \|

git config user.name \"GitHub Actions Bot\"

git config user.email \"actions@github.com\"

These commands set the user name and email for git commits made during the workflow.

**3. Adding a File:**

- name: Add Updated File

run: git add path/to/your/file.txt

This adds the specified file to the staging area, preparing it for the commit.You may want to do this in your GitHub Actions because there are some situations where you need to add certain configuration files or.Things when you do the build and this one could be done via the pipeline.

**4. Committing Changes:**

- name: Commit Changes

run: git commit -m \"Automated update: \[Description of changes\]\"

This commits the staged changes with a descriptive commit message.

**5. Pushing to Branch (e.g., for a PR):**

- name: Push Changes

run: git push origin your-branch

This pushes the committed changes back to the specified branch on the origin remote (usually GitHub).

**6. Creating and Pushing Tags:**

- name: Create Tag

run: git tag -a v1.2.3 -m \"Release v1.2.3\"

- name: Push Tag

run: git push origin v1.2.3

These commands create an annotated tag with a message and then push it to the origin remote.This is primarily used for when you want to create releases in a.Single branch workflows that be like trunk based development. So for example you can have a pipeline that is release pipeline and then when you run this on the main branch for example then it would tag the commit and then push that tag to the main branch for example.

**Complete Example in GitHub Actions:**

name: Update and Tag

on:

push:

branches:

- main

jobs:

update-and-tag:

runs-on: ubuntu-latest

steps:

- name: Checkout Code

uses: actions/checkout@v3

- name: Configure Git User

run: \|

git config user.name \"GitHub Actions Bot\"

git config user.email \"actions@github.com\"

\# \... Your CI/CD steps to modify files \...

- name: Add Updated File

run: git add path/to/your/file.txt

- name: Commit Changes

run: git commit -m \"Automated update: \[Description of changes\]\"

- name: Push Changes

run: git push origin main

- name: Create Tag

run: git tag -a v1.2.3 -m \"Release v1.2.3\"

- name: Push Tag

run: git push origin v1.2.3

This example demonstrates a typical workflow where the code is checked out, modifications are made, changes are committed and pushed back to the main branch, and finally, a new tag is created and pushed to the repository. Remember to adapt these commands to your specific CI/CD needs and repository structure.
