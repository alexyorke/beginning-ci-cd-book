### Workflow design {#workflow-design .unnumbered}

- Error propagation and separation of responsibilities will dictate how you should make your workflows, and when it makes sense to separate them out into different workflows.

- Creating a workflow. Understand what its goals are. What is it trying to do? Is it trying to deploy to production? Is it trying to build some code? Is it trying to build the documentation?

- If there are two things which are not related at all, then it makes sense to have them in different workflows. For example, if such and such fails (e.g., another workflow), does this workflow care?

- For example, if I'm building an application on multiple architectures, and one of them fails to build. Should I fail all of the other builds, i.e., are they useless unless all builds complete? What is the goal?

- The workflow sort of wants you to do things in a certain way. For example, data flow is a single direction, and errors propagate forward. Try to avoid pushing things into the future and making a mess. It's like a stream, or a river. If you try to go backwards, it makes it very difficult to do things.

- Parallelization is useful as well.Especially useful in multiple jobs that don't depend on each other. For example building for multiple architectures or building the documentation.In some situations you may have a static analysis scanner that can also run parallel.

GitHub Actions is a CI/CD platform that automates software development tasks within GitHub repositories. It uses "workflow files," which are YAML-based instructions that define the steps of a CI/CD pipeline, similar to a project manager for your build scripts.

These workflows are triggered by specific events in your repository, like pushing code or creating a pull request. When triggered, they run on virtual build servers provided by GitHub, executing tasks such as building, testing, and deploying your application. These servers are ephemeral -- they're created for each workflow run and deleted afterward, ensuring a clean and consistent environment.

Workflows are organized into "jobs," each containing multiple "steps." Each step represents a discrete action, like running a script or using a pre-built action from the GitHub Marketplace.

Benefits of this structured approach:

- **C** Named steps improve readability and make it easier to track progress, debug issues, and set up notifications.

- **S** Steps run in isolated environments, protecting sensitive information like secrets and environment variables.

- **E** GitHub Actions provides features for parallelization, triggering, resource management, and secret management, simplifying complex tasks.

- **S** The workflow syntax promotes consistency across projects and teams, facilitating collaboration and knowledge sharing.

### Getting started {#getting-started .unnumbered}

- Set up PR notifications (or make sure that others know how to send PR links to others to get them to approve). Make sure that the PR is blocked unless one person reviews it. If there is only one person on the team, then remove this check. If there are conflicting vacation schedules, then this might cause fewer people in the team to be available to review and approve code. Code reviews usually take place during or after the build server has completed. Code reviews are designed to catch higher-level issues that automated tools cannot detect.

#### Setting Up Developer Identity

- Each developer should have an identity, that is, some sort of way to identify them when contributing to the repository. This normally requires creating an account for each developer, or, depending on your CI software, might be able to be linked to another identity provider. Instructions vary. The developer's identity must be set up prior to cloning the repo, otherwise, developers would not be able to clone it. This normally requires setting up SSH Keys with your CI/CD provider. Your provider will have more instructions on how to set this up.

- It is important that each developer has their own identity, because one has to be able to track their changes. This is useful for example for security purposes, and having the ability to know who to ask if more information is required on a change. It ensures only those authorized and authenticated can contribute.

#### Get a repository (or multiple, if there are multiple projects)

- This will eventually contain everything that your application needs to run. All developers must be able to access this repository. This means that the server (in this case the Git server) has to be accessible to all of the developers. If you are already working from a repository, then you can skip this step. Usually, CI/CD software will host it for you automatically, and you don't have to manage or host it, all you have to do is go through a wizard on a webpage to set one up for your project.

- Second, you will need to store all of your application code in the repository. Usually, this includes application-specific dependency specifications but does not usually include the actual dependencies themselves. It also includes application source code, configuration files, database migrations, documentation, tests, resources, localizations, etc. (everything that your application needs to run.) If your code is hosted somewhere else, then it will have to be copied to this repository and then pushed to the main branch.

- If you already have a repository, then you'll have to import it into the provider.

### Creating a .gitignore {#creating-a-.gitignore .unnumbered}

---

A .gitignore file is a special file used by Git, the version control system, to determine which files and directories should be excluded (or ignored) from version control. This means that the specified files and directories will not be tracked by Git, even if they exist in your working directory.

---

---

The .gitignore file goes in the root of your repository, and is shared by all developers.

Not _all_ build artifacts are necessary to run the application, and some files are necessary but shouldn't be part of VCS because they should be injected through the environment at runtime (e.g., credentials and sensitive data.) For example, when building an application, it might produce build artifacts such as its executable or final build artifacts. These are necessary to run the application, but shouldn't be committed to version control because they are published as part of the build process. If they were part of version control, then it would be difficult to know how they were generated--were they generated on the build server, or someone's development machine? It would also make working with the repository very, very slow, as Git and other VCSes are not designed to work with large binary files. It would also take up a lot of disk space, too.

---

**Type of File/Folder** **Commonly Stored in VCS** **Not Commonly Stored in VCS**

---

Source Code Files ✓

Documentation ✓

Configuration Files ✓

Build Scripts ✓

Unit Test Files ✓

Images & Other Media (if essential to the project) ✓

Dependency Files (e.g., package.json, requirements.txt) ✓

Large Binary Files (e.g., videos, large images) ✓

Generated Files (e.g., compiled binaries) ✓

Temporary Files ✓

User-specific Configuration ✓

Credentials & Sensitive Data ✓

Log Files ✓

---

- There are some general principles on whether to version control something or not.

  - Is it reproducible and what is the effort for reproducing it? If I run the same command(s) on the same set of file(s) later on, will I get the same output/same changed state? How is it generated, is it generated via a script?

  - How large are the files? Are they significantly larger than the files in the repo? Does it generate many thousands of files at once? Many tools are not designed to work with thousands or tens of thousands of changed files at once.

  - Are these file(s) not meant to be shared among developers? For example, do developers gain a benefit by having these files version controlled? Should they be shared?

  - Are these changes not feasible to be reviewed during code review? For example, thousands of changed files, or a binary blob could be anything. Does a criteria exist to review it or are the changes overwhelming where it is not possible to efficiently do so?

  - Answering yes to all questions means that it is likely that the file(s) should not be version controlled and vice-versa.

- In this example, let's go through the node_modules folder.

  - Is it reproducible? Yes, through package-lock.json.

  - How large are the files? The node_module folder can be very large, up to 600MB. This is usually much larger than the source code in the repo.

  - Are the files not meant to be shared among developers? The node_modules folder is specific to an OS and package-lock.json file. Each developer has their own node_modules folder.

- In this example, let's go through a common counter-example: source-code.

  - Is it reproducible? In theory, yes but it is highly unlikely to be 100% reproducible and takes a lot of effort to reproduce. There are many ways to solve a problem, similar to writing a book. Even small variations can change program behavior.

  - The files are likely to be of similar size.

  - The files are meant to be shared among developers, as other developers will be working on the source code.

  - The number of files is likely to be able to be modified by the programmer by working on a smaller feature. Thus, they should be able to be reviewed during code review.

- Link to gitignore templates: [[GitHub - github/gitignore: A collection of useful .gitignore templates]{.underline}](https://github.com/github/gitignore)


