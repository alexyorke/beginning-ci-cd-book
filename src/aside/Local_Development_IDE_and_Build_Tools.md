# Local Development, IDE Processes, and Build Tools

## Local Dev Environment and Codespaces

Consolidated from `Local_Dev_Environment_and_Codespaces.md` and `Preparing_the_Development_Environment.md` covering dev containers, Codespaces, Docker Compose, and practical steps.

### Preserved content excerpts (from `Local_Dev_Environment_and_Codespaces.md`, `Preparing_the_Development_Environment.md`)

#### Goal: make local builds reproducible before automating CI

- Before you automate anything, ensure the project can be built and tested from the command line on a clean machine.
- Prefer a consistent, reproducible environment:
 - **Dev Containers** (`.devcontainer/devcontainer.json`) for VS Code
 - **GitHub Codespaces** for cloud-hosted dev environments
 - **Docker Compose** for multi-service local stacks

#### Why containers help

- Reduce “works on my machine” issues by standardizing dependencies and tooling.
- Speed up onboarding: contributors can start with fewer manual steps.

---

## IDE Build Processes

Consolidated from `IDE_Build_Processes.md` with guidance for VS, IntelliJ, Eclipse, Xcode; reading logs and commands.

### Preserved content excerpts (from `IDE_Build_Processes.md`)

- IDEs often wrap build tools; when debugging CI failures, it’s useful to identify the underlying commands (e.g., `msbuild`, `mvn`, `gradle`, `xcodebuild`).
- Use IDE “verbose” build output to see the real command line and build order.

Examples:

- **Visual Studio**: increase MSBuild verbosity (Tools → Options → Projects and Solutions → Build and Run).
- **IntelliJ / Eclipse**: prefer using Maven/Gradle tasks and observe the terminal output.
- **Xcode**: inspect build logs in Report Navigator to see compilation order and commands.

---

## Selecting Build Tools

Consolidated from `Selecting_Build_Tools.md` with tips, anti-patterns, project type heuristics, and versioning.

### Preserved content excerpts (from `Selecting_Build_Tools.md`)

- Favor standard, portable build tools over ad-hoc scripts.
- Avoid IDE-coupled builds and absolute paths in build logic (CI runners use different paths).
- Pin toolchain and dependency versions where practical to support reproducibility.
- Use quick heuristics to identify the project ecosystem:
 - `package.json` → Node.js
 - `pom.xml` → Maven
 - `build.gradle` → Gradle
 - `requirements.txt` / `pyproject.toml` → Python

---

## Adapting Local Commands for CI

Consolidated from `Adapting_Local_Commands_for_CI.md` with command mapping tables for various ecosystems.

### Preserved content excerpts (from `Adapting_Local_Commands_for_CI.md`)

| Language | Local development | CI environment | Why |
|---|---|---|---|
| JavaScript (Node.js) | `npm install` / `yarn install` | `npm ci` / `yarn install --frozen-lockfile` | Ensures reproducible installs by honoring lockfiles. |
| Python | `pip install -r requirements.txt` | `pip install -r requirements.txt` | Keep dependency resolution explicit and repeatable. |
| Ruby | `bundle install` | `bundle install --deployment` | Locks dependencies to `Gemfile.lock`. |
| Java (Maven) | `mvn install` | `mvn -B package --file pom.xml` | Batch mode for CI; focus on packaging. |
| Java (Gradle) | `gradle build` | `gradle build` | Same command; split tests into separate jobs if needed. |
| Rust | `cargo build` | `cargo build --locked` | Uses exact versions in `Cargo.lock`. |
| PHP (Composer) | `composer install` | `composer install --no-interaction --prefer-dist` | Non-interactive, faster installs for CI. |


