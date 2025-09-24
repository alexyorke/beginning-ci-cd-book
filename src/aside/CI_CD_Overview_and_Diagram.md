### ![](./images/image3.png) {#section-15 .unnumbered}

Here's a description of what's going on in the diagram.

- After tasks are broken down, then they can be worked on by the developers. Once completed, they create a Pull Request (PR). This automatically triggers a Continuous Integration (CI) pipeline that includes building, testing, and linting the PR. Your CI/CD provider should have detailed instructions on how to get the pipeline set up for the first time, and can automatically run it when developers create PRs. The pipeline, maintained by developers, must succeed before the PR is merged. This is a critical part of CI/CD, because the pipeline builds and runs the automated tests, which allow developers to gain confidence in their changes, and ensures that the work meets a quality threshold prior to merging (and thus becoming available for other developers to work on the changes, and for them to be available to the customers.)

- If it is not successful, then developers have to fix their changes before they are merged--this also includes code review. A successful pipeline run results in build artifacts being published to an artifact repository. However, at this stage, the artifacts remain unused in the repository and are not yet accessible to customers. Therefore, we need to have a way to release these to production.

- In the past, releasing software meant that changes were available to customers immediately, or via a death-march rollout that was difficult to undo. This mimicked the real world closely, which meant that it was easy to understand the process. For example, say I am writing a newspaper. If I hit print, and distribute all of the newspapers to everyone, and there is a typo, then it's going to be costly to fix. I can't easily pull the newspapers back into my office and change them.

- This is a very scary prospect, and so code was withheld until it was thoroughly tested. This makes sense: It was difficult to quickly deploy a new version of your application with the fix and tooling was not as mature as it was today.

- Deployments are managed via a "deployment pipeline" similar to the build pipeline but tailored for deployment. The specific deployment steps and commands vary based on the cloud provider, but all require the build artifacts and relevant credentials to access production environments. Deployments utilize infrastructure as code, using predefined templates to dictate resource provisioning and application setup, ensuring configurations are standardized and rebuilt from scratch to avoid nonstandard "snowflake" machines.

- When we do CD, we can deliver code that sometimes is still a work in progress. Normally, this would be of great concern: the feature isn't done yet, so customers would be negatively impacted because the feature would be buggy or wouldn't work. However, we can safely hide it behind a feature flag. This means that customers are not impacted by the work that is in progress. The application looks the same, and functions the same. Instead of it being integrated on a develop branch internally, it is in production, but just inactive.

- There are many strategies for deploying the new changes. One way is to put the new change behind a feature flag, which means that it is only enabled once the feature flag is turned on. This approach is useful if you're developing a small-to-large sized feature, and need multiple PRs to create it. If it's a very small change, then it's not as useful to put behind a feature flag, as the overhead is likely too high. Additionally, any changes, even if they are behind a feature flag, have a risk to production. For example, upgrading dependencies.

- Therefore, we need a way to make sure that we can gradually incorporate changes to production without interrupting existing users. There are two main strategies we can use to do this. One is called blue-green deployments: Maintain two production environments (blue for the current version and green for the new version) to achieve zero-downtime deployments. Another is called incremental deployments, or canary deployments: Release updates to a subset of users initially, gradually increasing the reach, allowing early feedback and risk mitigation.

- Blue-green deployments are useful when there are major changes, or if customer traffic cannot be served by two different nodes running different versions of the application. Think large infrastructure upgrades, database refactorings, etc. Most changes can be serviced via incremental deployments, where old copies of the application are destroyed, and newer copies are deployed in its place. This allows for a gradual introduction of new changes to production, and traffic is drained from the nodes before they go into service.

- Note that the act of moving changes to production does not necessarily mean that they are "released." Deploying, Delivering, and Releasing take on different definitions. This requires a very different way of thinking about how you approach releasing changes to customers, and is a very large paradigm shift.

- Over time, as we work on the feature, it might become ready for customers. In this case, we can gradually enable the feature flag to make it available to customers.

- To mitigate risk, we adopt a two-pronged approach. First, we slowly enable the feature flag. This means that the feature is not available to all customers yet. Second, we write monitors for our feature (much like the canary in the coal mine.)

- This stage ends once the application is available to the customer. This means that there are some post-deployment checks that occur, however, they are short in nature and only represent a snapshot of time.

- After (and during release), the application is closely monitored using continuous monitoring. This ensures that if the application goes down, that the deployment is quickly rolled back.

Performance Monitoring and Telemetry

- Data Collection: Collect and analyze telemetry from builds to monitor performance and other key metrics such as build ID, correlation ID, tool usage, repository names, and the status of builds.

- Maintenance Strategies

- Agent Lifespan: Limit the operational duration of self-hosted agents, preferably to less than seven days, to facilitate regular updates.

- Linting: Extend linting to cover a wide array of potential issues beyond simple syntax errors, including concurrency and dependency issues.

Here are the common steps that normally exist within workflow files (that contain build-related commands).

- Trigger: Automatically runs the build pipeline given an event, such as on a pull quest or on a merge to a branch. This is important because otherwise the pipeline would not run.

- Checkout and Dependencies: The build server downloads your repository and installs dependencies from trusted sources.

- Compilation: Translates code into an executable format, ensuring syntactic correctness. This depends on your programming language--for example, Python is an interpreted language and may not have a "build" step.

- Linting/Static Analysis (Optional): Enhances code readability and maintainability, potentially catching bugs early.

- Automated tests execute predefined checks to verify functionality and provide rapid feedback to developers. Developers are responsible for writing these tests. There are multiple levels of automated tests, including:

  - Unit tests: These tests verify individual functions or components.

  - Integration tests: These tests check the interaction between two or more components.

  - End-to-end tests: These tests, often UI-based, validate the entire workflow from start to finish, ensuring high-level functionality.

- Artifact Publishing: Stores build outputs in a secure repository for deployment, ensuring consistency and readiness. Artifacts are not stored within the same repository as your code. Instead it is stored in the artifact repository where versions of the artifacts are immutable.

- Deployment: Artifacts are selected from the repository and deployed to the desired environment, potentially including additional tests or packaging.

This book will primarily focus on GitHub Actions for demonstrating CI/CD practices. However, it's important to recognize that other popular CI/CD platforms like GitLab, CircleCI, and Jenkins also play significant roles in the industry. Each of these platforms uses slightly different terminology for similar concepts and processes. To aid in understanding and to facilitate the application of these concepts across different CI/CD tools, I will provide a comparative table. This table will map out the equivalent terms used across these various platforms.

---

**Generic Term** **Definition** **Jenkins** **GitHub Actions** **GitLab CI/CD** **CircleCI**

---

Build Step A single task or command that is part of the build process. Build Step Job Job Job

Environment The computing environment where the build and tests run, often defined by the OS, programming language, and tools. Node Runner Runner Executor

Workflow The sequence of steps or jobs that define the continuous integration process. Pipeline Workflow Pipeline Workflow

Trigger The event or condition that initiates the CI/CD process. Build Trigger Event Trigger Trigger

Secrets Sensitive data used during the build process that must be kept secure, such as passwords or API keys. Credentials Secrets Variables Environment Variables

Container An isolated environment where applications can run in a predictable way, independent of the host system. Agent/Docker Agent Container Docker Executor Docker

Configuration The file or set of files that define how the CI/CD process should operate. Jenkinsfile .github/workflows/* .gitlab-ci.yml .circleci/config.yml

Artifacts The files that are generated as a result of the build process, often including the compiled code. Build Artifacts Artifacts Artifacts Artifacts

Cache Temporary storage used to speed up subsequent builds by reusing data from previous build steps. Workspace Cache Cache Cache

Parallelism The ability to run build steps or jobs simultaneously to decrease build times. Parallel Builds Matrix Builds Parallel Matrix Parallel Jobs

Build Status The outcome of the CI/CD process, often indicating success, failure, or in-progress status. Build Status Check Pipeline Status Build Status

---

[[samples/framework/libraries/migrate-library at main · dotnet/samples (github.com)]{.underline}](https://github.com/dotnet/samples/tree/main/framework/libraries/migrate-library/) basically but this has some more info on the names of the folders and what they do.

Sure, here's a more concise version:

### **C# Project Layout:**

### **Deployment:**

- **`/bin`**: Compiled binaries.

- **`/bin/Debug`**: Debug build.

**- **`/bin/Release`**: Release build for deployment.**

For deployment, use `/bin/Release` or the appropriate build configuration. It is highly recommended that you **create a publish profile** and use that instead, however, and then wherever the publish path publishes to, then publish those artifacts.

----------------------------------------------------------------

Python applications can be packaged in different ways. If you want for other people to consume it then the instructions are pretty straightforward and standardized. If you want to publish it to a server, it depends. ChatGPT says this is a common project layout but I can't really verify it, it doesn't look like there are standard Python project layouts.

Python applications don't have as strict a structure as something like a C# solution, but there are certain conventional project layouts that developers commonly follow. Here's a concise overview of a typical Python project structure:

### **Python Project Layout:**

**- **`/src`**: Main source code (optional, but can make things tidy).**

**- **`your_package_name`**: Main package folder with `.py` files.**

**- **`/data`**: Data files (e.g., datasets, configurations).**

### **Deployment:**

- Deploy source code and install dependencies from `requirements.txt` using a package manager like `pip`.

- Virtual environments (`/venv` or `/env`) should never be deployed. Instead, use the `requirements.txt` on the deployment server or target environment to recreate the necessary dependencies.

Note: Depending on the nature of the Python application (web app, CLI tool, library, etc.), the actual project structure can vary. Always consider the requirements and nature of your specific project.

----------------------------------------------------------------

Warning: this depends a lot lot lot on which type of JavaScript/TypeScript project you are creating. Normally, however, the dist folder is what you should be publishing. This ecosystem is very complex and changes rapidly.

Sure, here's a concise overview of a common JavaScript or TypeScript project structure, especially for web projects or Node.js applications:

### **JavaScript/TypeScript Project Layout:**

**- **`/dist`** or **`/build`**: Compiled/transpiled code (e.g., from TypeScript to JavaScript). This directory is typically what you'd deploy for a web app.**

### **Deployment:**

- **For web applications: Deploy the `/dist` or `/build` directory contents.**

**- For Node.js apps: Depending on the build process, you might deploy the transpiled output in `/dist` or the raw `/src` if not using a transpiler.**

- Always exclude `node_modules` from source control. Instead, rely on `package.json` and `package-lock.json` (or `yarn.lock`) to recreate dependencies during deployment.

Remember that JavaScript and TypeScript projects can vary significantly based on the frameworks and tools being used (e.g., Angular, React, Vue, Express, etc.), so the above is a general guide and might not fit all scenarios. Always adapt based on the specific project's needs.

----------------------------------------------------------------

[[Maven -- Introduction to the Standard Directory Layout (apache.org)]{.underline}](https://maven.apache.org/guides/introduction/introduction-to-the-standard-directory-layout.html)

[[Organizing Gradle Projects]{.underline}](https://docs.gradle.org/current/userguide/organizing_gradle_projects.html)

Certainly! Java projects, especially when using build tools like Maven or Gradle, have a conventional directory structure. Here's a concise overview:

### **Java Project Layout:**

**- **`/target`** or **`/build`**: Compiled bytecode, JARs, WARs, etc. (the output of the build process). This is where the build artifacts that should be deployed are usually found.**

### **Deployment:**

- For standalone applications: JARs from the `/target` or `/build` directory.

- For web applications: WARs or EARs (found in the same build directories).

Always remember to exclude the `/target` or `/build` directories from version control since these contain compiled bytecode and other artifacts. Instead, rely on the build tool (Maven, Gradle) to produce these during the CI/CD process.

As always, these guidelines can be adapted based on the specifics of the project, framework, or tooling in use.

- When deploying your site, multiple deployments over time are likely, making it crucial to track your artifacts and the version of the application deployed across various environments such as integration, pre-production, and production.

- There are two main version control strategies: feature branches and tagging. Feature branches are suitable for maintaining legacy versions or parallel development streams, allowing for continued development and independent deployment of different versions, such as a V1 or V2 branch. On the other hand, tagging provides a simpler, linear history ideal for evergreen applications like many web apps, where only the latest version is actively supported.

- Artifact management is vital for ensuring consistency and traceability. Artifacts generated by the CI/CD pipeline are immutable, meaning each version corresponds to a specific build of the application, preventing confusion and aiding in troubleshooting production issues. It's essential to retain artifacts for a reasonable duration, typically 1-2 years, to diagnose past issues and to set expiration dates based on auditing, security, and storage considerations. Artifacts should be stored in private repositories when necessary for security and control, acting as a single source of truth.

- Different deployment strategies, such as release trains, offer scheduled releases, such as bi-weekly. This method involves automated tests and deployments to pre-production environments for QA testing. It's important to involve QA early in the development process to prevent them from becoming a bottleneck, allowing for ongoing development and frequent, incremental deployments. This approach aids in catching bugs early and avoids halting development for extensive QA periods.

- Version management also involves deciding on versioning strategies, like semantic versioning, and ensuring application manifests are automatically updated with each release to reflect the new version numbers. When publishing artifacts, especially libraries, attaching metadata is crucial for downstream applications to identify and use the correct versions. These artifacts should be immutable in the repository and accessible based on set permissions.

- Finally, generating changelogs automatically and understanding changes between releases can be streamlined by tools and practices that track version differences and integrate this information directly into the release process, supporting efficient management and communication of updates.


