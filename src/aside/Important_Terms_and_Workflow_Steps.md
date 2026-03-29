# Important Terms and Workflow Steps

## Key Terms

Build pipelines (or just pipelines) are scripts that developers maintain to perform useful work — building the application, generating artifacts, or deploying it. The "pipeline" metaphor captures a one-way dataflow through a set of goals that either pass or fail.

Pipelines are central to CI/CD, and developers update them constantly. If the deployment pipeline fails, it must be fixed quickly because it is typically the only automated route to production. Knowing the terminology, the structure, and how to debug a pipeline quickly is therefore essential.

## Provider Terminology Reference

The same concepts go by different names depending on which CI/CD platform you use. The table below maps the most common terms.

| Concept | Generic Term | Jenkins | GitHub Actions | GitLab CI/CD | CircleCI |
|---------|-------------|---------|----------------|--------------|----------|
| A single task or command within a pipeline | Build Step | Build Step | Step | Job | Step |
| The runtime context (OS, tools, env vars) | Environment | Node | Runner | Runner | Executor |
| An ordered set of jobs | Workflow | Pipeline | Workflow | Pipeline | Workflow |
| An event that starts a pipeline run | Trigger | Build Trigger | Event | Trigger | Trigger |
| Sensitive data (passwords, tokens, keys) | Secrets | Credentials | Secrets | Variables | Environment Variables |
| A lightweight executable package | Container | Agent / Docker Agent | Container | Docker | Docker Executor |
| The file(s) that define the pipeline | Configuration | Jenkinsfile | `.github/workflows/*.yml` | `.gitlab-ci.yml` | `.circleci/config.yml` |
| Files produced by a build step | Artifacts | Build Artifacts | Artifacts | Artifacts | Artifacts |
| Stored dependencies or compiled output | Cache | Workspace | Cache | Cache | Cache |
| Running multiple jobs at the same time | Parallelism | Parallel Builds | Matrix Builds | Parallel / Matrix | Parallel Jobs |
| Whether a build passed or failed | Build Status | Build Status | Check | Pipeline Status | Build Status |

> **Environment naming note:** Testing environments also vary by organization. You may encounter "Development", "Dev", "QA", "Staging", "UAT", "PPE", "Testing", "Experimental", or "Beta". These terms carry different connotations depending on the team and deployment process.

## What Steps Should a Workflow Have?

Based on analysis of real-world GitHub Actions workflows, step names cluster into these major themes. The frequency counts give a sense of how commonly each type of step appears across open-source repositories.

### Release Management (most common)

- **Release creation and publication** — creating GitHub Releases, identifying upload URLs, handling drafts
- **Tag management** — extracting or creating version tags
- **Version bumping and semantic versioning** — incrementing version numbers
- **Changelog and release notes** — generating changelog entries

### Version Control

- Retrieving version data and setting it in the environment
- Extracting and managing branch information
- Checking repository state, managing commit metadata

### Build Process

- Compilation and assembly
- General build utilities
- Preparing the build environment (setting up tools, dependencies, platform specifics)

### Docker and Container Management

- Building, tagging, and pushing Docker images
- Container/platform configuration (multi-arch targets, labels)
- Docker cache management

### Environment and Setup

- Populating environment variables and configuration
- Preparing the build environment, checking system state

### Caching

- Managing cache entries and directory paths
- Specialized caching for Node modules, Composer, Gradle, etc.

### Testing

- Executing test suites and outputting results or statuses

### Miscellaneous Tools

- Timestamp retrieval, GPG setup, workflow utility steps

> **Takeaway:** If you are designing a new workflow, start with the most common patterns: checkout → environment setup → dependency installation → build → test. Add caching around the dependency install step. Add release/publish steps only in workflows triggered by tags or releases, not every PR.
