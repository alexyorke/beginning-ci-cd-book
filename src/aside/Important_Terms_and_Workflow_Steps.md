### Important terms

- Build pipelines (or just pipelines) are simply scripts that developers maintain to perform useful work, such as building your application, generating build artifacts, or deploying your application. It is called a pipeline because the way it is structured encourages a one-way dataflow, and a set of goals that are or are not achieved.

- They are central to CI/CD, and developers will be maintaining them constantly, and updating them. Therefore, it's very important that you know the right terminology for them, how they work, and how to create them. If, for example, the deployment pipeline fails, then it must be fixed quickly, because this is usually the only route to production. Therefore, it is important to know what they are, how to create them, and how to debug them quickly and effectively.

#### Disambiguation of terms between CI providers

- This book is somewhat focused on GitHub Actions, but tries to provide a provider-agnostic view. Some of the terms might be a bit different depending on your CI/CD provider. Here is a table that helps clarify.

- ***

  **Definition** **Generic Term** **Jenkins** **GitHub Actions** **GitLab CI/CD** **CircleCI**

  ***

Build Step: A build step is a single task or command within a CI/CD pipeline. It's a specific action to be executed, such as compiling code, running tests, or deploying software. Build Step Build Step Job Job Job

Environment: In software development, an environment refers to a setup where software runs. This can include factors like the operating system, available software and tools, system variables, and network access. Different environments (like development, testing, and production) mimic different stages of the software lifecycle. Environment Node Runner Runner Executor

Workflow: A workflow is a sequence of tasks that process a set of data. In CI/CD, a workflow is a set of rules for defining the build process, typically comprising multiple jobs or build steps. Workflow Pipeline Workflow Pipeline Workflow

Trigger: In CI/CD, a trigger is an event that initiates the execution of a workflow or pipeline. Common triggers include code commits, pull requests, scheduled times, or manual intervention. Trigger Build Trigger Event Trigger Trigger

Secrets: Secrets are sensitive data, such as passwords, tokens, or keys, essential for the operation of applications and the security of resources. In CI/CD pipelines, secrets are used to access resources without exposing them in the code or workflow definitions. Secrets Credentials Secrets Variables Environment Variables

Container: A container is a lightweight, executable package that includes everything needed to run a piece of software, including the code, runtime, system tools, libraries, and settings. Containers are isolated from each other and the host system, ensuring consistency across different environments. Container Agent/Docker Agent Container Docker Executor Docker

Configuration: Configuration in software development refers to the settings and parameters that define how software or hardware operates. In the context of CI/CD, configuration files (like YAML files in GitHub Actions) specify the parameters and settings of the build process. Configuration Jenkinsfile .github/workflows/* .gitlab-ci.yml .circleci/config.yml

Artifacts: Artifacts are files or data that are produced as a result of a build step or job in a CI/CD pipeline. These can include compiled code, binaries, libraries, containers, and documentation. Artifacts Build Artifacts Artifacts Artifacts Artifacts

Cache: In CI/CD, caching refers to the practice of storing a part of the build process, like dependencies or compiled code, so that it can be reused in subsequent runs, improving build speed and efficiency. Cache Workspace Cache Cache Cache

Parallelism: Parallelism in CI/CD is the execution of multiple build steps or jobs simultaneously. It is used to speed up the build process by dividing the workload across multiple runners or agents. Parallelism Parallel Builds Matrix Builds Parallel Matrix Parallel Jobs

Build Status: Build status is an indicator of whether a build or integration process in a CI/CD pipeline succeeded or failed. It provides immediate feedback on the health and success of a change or a set of changes made in the repository. Build Status Build Status Check Pipeline Status Build Status

---

- Some testing environments might have different terms. These might be called "Development Environment", Dev, QA, Staging, UAT, PPE, Testing, Experimental, or Beta. These terms may have different connotations, depending on which environments you are using, and for which purpose.

### What steps should my workflow have? {#what-steps-should-my-workflow-have .unnumbered}

+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| The steps can be grouped by major themes such as Release Management, Build Process, Docker and Container Management, Version Control, Testing, Caching, Environment and Setup, and Miscellaneous Tools. Each sub-theme under these major themes is based on the actions that the steps are implied to perform. |
| |
| Each major theme will be annotated with its summed frequency and ordered according to the sum. Sub-themes will be described along with speculative actions they might be performing. |
| |
| ### Release Management (Total: 5308) |
| |
| Total frequency calculated by summing all frequencies in this theme. |
| |
| - Release Creation and Publication (Total: 3417) |
| |
| - Creating GitHub releases, identifying upload URLs, and handling release drafts. |
| |
| - Tag Management (Total: 936) |
| |
| - Handling version tags, extracting tag information, and managing release versions. |
| |
| - Version Bumping and Semantic Versioning (Total: 572) |
| |
| - Managing version increments and providing semantic versioning guidance. |
| |
| - Changelog and Release Notes (Total: 383) |
| |
| - Generating and organizing changelog entries, and managing release notes. |
| |
| ### Build Process (Total: 1462) |
| |
| Total frequency calculated by summing all frequencies in this theme. |
| |
| - Compilation and Assembly (Total: 455) |
| |
| - Compiling code and managing compilation status. |
| |
| - Build Utilities (Total: 373) |
| |
| - Handling various build utilities and helpers. |
| |
| - Continuous Integration (Total: 634) |
| |
| - Managing CI processes, organizing build artifacts, and preparing environments. |
| |
| ### Docker and Container Management (Total: 1321) |
| |
| Total frequency calculated by summing all frequencies in this theme. |
| |
| - Docker Image Handling (Total: 879) |
| |
| - Building, tagging, naming, and pushing docker images. |
| |
| - Container and Platform Configuration (Total: 292) |
| |
| - Setting up container and platform specifics such as platforms and labels. |
| |
| - Miscellaneous Docker Related (Total: 150) |
| |
| - Other Docker-related tasks and cache management. |
| |
| ### Version Control (Total: 2048) |
| |
| Total frequency calculated by summing all frequencies in this theme. |
| |
| - Version and Release Information (Total: 1064) |
| |
| - Retrieving and setting version data, including semantic versioning. |
| |
| - Branch Management (Total: 577) |
| |
| - Extracting and managing branch information. |
| |
| - Commit and Repository Info (Total: 407) |
| |
| - Checking repository states, managing commit data. |
| |
| ### Testing (Total: 267) |
| |
| Total frequency calculated by summing all frequencies in this theme. |
| |
| - Test Execution and Reporting (Total: 267) |
| |
| - Executing tests and outputting results or statuses. |
| |
| ### Caching (Total: 953) |
| |
| Total frequency calculated by summing all frequencies in this theme. |
| |
| - General Caching (Total: 520) |
| |
| - Managing cache entries and directory paths. |
| |
| - Specialized Caching (Total: 433) |
| |
| - Caching specific tools or environments such as Node modules or Composer. |
| |
| ### Environment and Setup (Total: 1323) |
| |
| Total frequency calculated by summing all frequencies in this theme. |
| |
| - Environment Configuration (Total: 851) |
| |
| - Populating environment variables, managing configurations. |
| |
| - Project and System Setup (Total: 472) |
| |
| - Preparing the build environment, checking system states. |
| |
| ### Miscellaneous Tools (Total: 405) |
| |
| Total frequency calculated by summing all frequencies in this theme. |
| |
| - Utility Tools (Total: 405) |
| |
| - Varied utilities such as timestamp retrieval, setup of tools like GPG, or workflow operation utilities. |
| |
| Please note that this is an approximation based on the step names. Actual actions performed by these steps would depend on the specific configurations and logic within the GitHub Actions definitions. |
| |
| ===================================================================================================== |
| |
| For the **Version and Release Information** sub-theme, we can further break it down into: |
| |
| - **Version Extraction and Parsing (Total: 839)** |
| |
| - Operations that focus on extracting version strings, parsing, or converting version notation. |
| |
| - **Version Management (Total: 237)** |
| |
| - Actions associated with incrementing a version, checking version alignment, or managing version-related metadata. |
| |
| - **Release Versioning (Total: 65)** |
| |
| - Handling the versioning related to the releases specifically. |
| |
| For the **Build Process** sub-theme, we can further categorize into: |
| |
| - **Code Compilation (Total: 455)** |
| |
| - The process that involves taking source code and converting it into an executable binary, library, or another output type. |
| |
| - **Artifact Assembly (Total: 50)** |
| |
| - Steps involved in assembling, packaging, or preparing build artifacts for deployment or distribution. |
| |
| - **Build Assistance (Total: 227)** |
| |
| - This includes setting arguments for the build, handling build numbers, or other secondary operations that support the main build process. |
| |
| - **Build Environment Preparation (Total: 730)** |
| |
| - These steps encompass preparing the build environment, setting up necessary dependencies or tools, configuring platforms, etc. |
| |
| These categorizations are estimated based on the names of the steps and the frequencies at which they occur. They indicate the granularity of actions taken within Version and Release Information management and the Build Process, which would typically be configured within a GitHub Actions workflow for CI/CD pipelines. |
|================================================================================================================================================================================================================================================================================================================================+
|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+


