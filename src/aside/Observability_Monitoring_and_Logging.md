# Observability, Monitoring, Logging, and Reporting

## Deployment, Release, and Monitoring

**Chapter 7: Deployment, Release, and Monitoring**

[Content moved from the draft: definitions (deploy/deliver/release); blue/green and canary strategies; feature flags with JSON example and modularity; release management (branching, artifacts, versioning, changelog, GitHub Releases); monitoring and observability; rollbacks with workflow example.]

---

## Application Monitoring

### Application monitoring {#application-monitoring .unnumbered}

Deploying your application successfully doesn't always guarantee it's functioning as expected, especially in complex setups with a backend. For instance, refreshing the browser could reset the application since it doesn't maintain state server-side. Errors can also arise from other areas like backend server failures that require restarts, problematic builds that prevent the app from displaying content, or external API issues like the weather data endpoint failing.

![](./images/image88.png)

2. **Identifying Potential Errors**:

- **Deployment Errors**: Check if the application is loading correctly. A blank page or a failure to load could indicate issues with file deployment or script errors within the application.

- **API Dependencies**: If your application relies on external APIs (like a weather API), these can fail, be blocked, reach rate limits, or return unexpected responses.

- **Performance Issues**: Slow load times can degrade user experience, indicating the need for performance optimization.

![](./images/image40.png)

---

## CI/CD Observability and Telemetry

[[GUAC Docs | GUAC]{.underline}](https://docs.guac.sh/) and the need to do automated dependency management (manual dependencies are harder to scan)

[[krzko/run-with-telemetry: GitHub Action `run` action with OpenTelemetry instrumentation]{.underline}](https://github.com/krzko/run-with-telemetry)

[[inception-health/otel-export-trace-action (github.com)]{.underline}](https://github.com/inception-health/otel-export-trace-action)

- [[Improve your software delivery with CI/CD observability and OpenTelemetry]{.underline}](https://www.elastic.co/virtual-events/ci-cd-observability-and-opentelemetry)

- [[DevOpsWorld 2021 - Embracing Observability in Jenkins with OpenTelemetry]{.underline}](https://www.youtube.com/watch?v=3XzVOxvNpGM)

- [[DevOpsWorld 2021 - Who Observes the Watchers? An Observability Journey]{.underline}](https://www.cloudbees.com/videos/who-observes-the-watchers-an-observability-journey?wvideo=wv11m4uazu)

- [[Embracing Observability in CI/CD with OpenTelemetry]{.underline}](https://www.slideshare.net/cyrille.leclerc/embracing-observability-in-cicd-with-opentelemetry)

- [[FOSDEM 2022 - OpenTelemetry and CI/CD]{.underline}](https://archive.fosdem.org/2022/schedule/event/opentelemetry_and_ci_cd/)

- [[cdCon Austin 2022 - Making your CI/CD Pipelines Speaking in Tongues with OpenTelemetry]{.underline}](https://www.youtube.com/watch?v=1jDLNNe_TEM)

- [[Observability Guide - Elastic Stack 8.7]{.underline}](https://www.elastic.co/guide/en/observability/current/ci-cd-observability.html)

+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| [[ftp2.osuosl.org/pub/fosdem/2024/ua2220/fosdem-2024-3445-strategic-sampling-architectural-approaches-to-efficient-telemetry.mp4]{.underline}](https://ftp2.osuosl.org/pub/fosdem/2024/ua2220/fosdem-2024-3445-strategic-sampling-architectural-approaches-to-efficient-telemetry.mp4) |
| |
| ![](./images/image49.png) |
| |
| ![](./images/image53.png) |
+========================================================================================================================================================================================================================================================================================+
+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

[[ftp2.osuosl.org/pub/fosdem/2024/ua2220/fosdem-2024-3262-what-is-ci-cd-observability-and-how-to-bring-observability-to-ci-cd-pipelines-.mp4]{.underline}](https://ftp2.osuosl.org/pub/fosdem/2024/ua2220/fosdem-2024-3262-what-is-ci-cd-observability-and-how-to-bring-observability-to-ci-cd-pipelines-.mp4)

[[ftp2.osuosl.org/pub/fosdem/2024/ud2208/fosdem-2024-1805-squash-the-flakes-how-to-minimize-the-impact-of-flaky-tests.mp4]{.underline}](https://ftp2.osuosl.org/pub/fosdem/2024/ud2208/fosdem-2024-1805-squash-the-flakes-how-to-minimize-the-impact-of-flaky-tests.mp4)

[[ftp2.osuosl.org/pub/fosdem/2024/k1105/fosdem-2024-3353-reproducible-builds-the-first-ten-years.mp4]{.underline}](https://ftp2.osuosl.org/pub/fosdem/2024/k1105/fosdem-2024-3353-reproducible-builds-the-first-ten-years.mp4)

[[ftp2.osuosl.org/pub/fosdem/2024/k4401/fosdem-2024-3230-getting-lulled-into-a-false-sense-of-security-by-sbom-and-vex.mp4]{.underline}](https://ftp2.osuosl.org/pub/fosdem/2024/k4401/fosdem-2024-3230-getting-lulled-into-a-false-sense-of-security-by-sbom-and-vex.mp4)

[[ftp2.osuosl.org/pub/fosdem/2024/ub2252a/fosdem-2024-3398-modern-build-systems-for-containers.mp4]{.underline}](https://ftp2.osuosl.org/pub/fosdem/2024/ub2252a/fosdem-2024-3398-modern-build-systems-for-containers.mp4)

[[ftp2.osuosl.org/pub/fosdem/2024/ub5230/fosdem-2024-1909-broom-not-included-curling-the-modern-way.mp4]{.underline}](https://ftp2.osuosl.org/pub/fosdem/2024/ub5230/fosdem-2024-1909-broom-not-included-curling-the-modern-way.mp4)

---

## Frequent Logging Data Types

## Frequent logging data types in Google GitHub Actions workflows

Okay, let's break down the *specific kinds* of information frequently logged in the `run` steps of these workflows, going beyond just the actions performed:

1.  **Versions:**
    *   **Tool Versions:** Explicit checks like `cmake --version`, `bazel version`, `bazelisk --version`, `clang --version`, `go version`, `magika --version`, `clang-format --version`. Implicitly logged when tools like `setup-java`, `setup-python`, `setup-go`, `rustup`, `actions/setup-node` run or during installation (`apt install`, `pip install`, etc.).
    *   **Dependency Versions:** Logged during installation steps (`pip install`, `npm install`, `apt install`, `cargo build`/`update`, `mvn dependency:go-offline`, `conan install`). Checks like `cargo outdated` explicitly log version differences. Specific versions are often pinned in `uses:` lines (e.g., `actions/checkout@v4`, `golangci/golangci-lint-action@v6.5.2`).
    *   **OS/Platform Versions:** Implicit in the `runs-on:` directive (e.g., `ubuntu-22.04`, `macos-14`). Android API levels (`matrix.api-level`) are logged.
    *   **Language Standard Versions:** Explicitly set C++ standards (`-std=c++17`, `-std=c++20`).
    *   **Build/Release Versions:** Calculated from Git tags (`${GITHUB_REF#refs/tags/v}`, `${REF:10}`) or commit SHAs (`${GITHUB_SHA}`) and often logged via `echo` or used in artifact names/paths. Tools like `goreleaser` log the version being released.

2.  **Hashes:**
    *   **Commit SHAs:** Frequently logged for checkout actions, determining base refs (`${{ github.event.pull_request.base.sha }}`, `git merge-base`), identifying the commit being built/tested (`${{ github.sha }}`, `${{ github.event.pull_request.head.sha }}`), generating build versions, or reporting status (`statuses/${{ github.sha }}`). Explicitly logged with `git rev-parse HEAD` or `git describe`.
    *   **File Hashes:** Used in cache keys (`hashFiles(...)`).
    *   **Checksums:** Logged by Gradle Wrapper validation (`wrapper-validation-action`). GoReleaser generates checksum files, which are then often logged (e.g., base64 encoded). SLSA verification steps involve checksums.
    *   **Container Image Digests:** Logged by GoReleaser and used in SLSA provenance generation/verification for images.

3.  **Configuration & Flags:**
    *   **Build Types:** `Release`, `Debug`, `RelWithDebInfo` (often via `matrix.build_type` or `CMAKE_BUILD_TYPE`).
    *   **Compiler/Build Flags:** `CMAKE_CXX_FLAGS`, `CXXFLAGS`, `-march=`, `-fsanitize=`, `-DBUILD_SHARED_LIBS=ON/OFF`, `-DDRACO_TRANSCODER_SUPPORTED=ON/OFF`, `-DSNAPPY_REQUIRE_AVX=...`, CMake presets (`--preset`).
    *   **Tool Arguments:** Arguments passed to scripts (`./script.sh arg`), linters (`golangci-lint-action` args), tests (`pytest -n auto`), build tools (`bazel build --config=...`), `osv-scanner` args (`scan-args`), `cibuildwheel` env vars (`CIBW_...`).
    *   **Environment Variables:** Explicitly set via `echo "VAR=value" >> $GITHUB_ENV` or logged via `env:` blocks in steps.
    *   **Targets/Architectures:** `TARGET: ${{ matrix.targets[0] }}`, `matrix.arch`, `--config=android_arm64`, `--platform=...`.

4.  **File Paths & Names:**
    *   Paths added to `$GITHUB_PATH`.
    *   Paths specified in `actions/cache` or `actions/upload-artifact`.
    *   Output directories (`out/dist`, `build`, `wheelhouse`).
    *   Specific config files being used (`.github/labeler.yml`, `debian/control`).
    *   Lists of changed files (`git diff --name-only`).
    *   Artifact names (often including versions/platforms).
    *   Source/test directories targeted by commands (`./src`, `./test`, `po/*.po`).

5.  **Test Results & Diagnostics:**
    *   Pass/Fail status of individual tests and suites.
    *   Verbose test output (e.g., `test_output=errors`, `CTEST_OUTPUT_ON_FAILURE=1`).
    *   Specific test names being run or filtered (`--gtest_filter=...`, `-E IntegrationTest`).
    *   Code coverage upload status (Codecov, Coveralls).
    *   JUnit XML report paths/generation (`make junit-regtest`).
    *   Flaky test run counts (`--runs_per_test 50`).
    *   `flutter doctor -v` output (detailed environment info).
    *   Emulator configuration (API level, target, arch).

6.  **Linter/Formatter/Static Analysis Results:**
    *   Specific findings (file:line:message) from tools like `clang-format`, `clang-tidy`, `golangci-lint`, `ruff`, `black`, `flake8`, `isort`, `mypy`, `pytype`, `pylint`, `gosec`.
    *   Diffs generated by formatters (`clang-format.diff`, `go mod tidy -diff`).
    *   SARIF file generation/upload status (CodeQL, OSV Scanner, Gosec).
    *   License header check results (list of files missing headers).
    *   API compatibility diffs (`japicmp:cmp`).
    *   Security scan results (OSV Scanner, CodeQL, Gosec, Coverity).
    *   Scorecard results.

7.  **Dependency Information:**
    *   Packages being installed/updated (`apt install <pkg>`, `pip install <pkg>`).
    *   Cache hit/miss status and keys (`actions/cache`).
    *   Outdated dependency lists (`cargo outdated`).
    *   `go mod tidy -diff` output.

8.  **Deployment & Release Information:**
    *   Target tags/branches (`${{ github.ref_name }}`).
    *   Asset upload status and names (`actions/upload-release-asset`, GoReleaser logs).
    *   Publishing status to registries (PyPI, NPM, GHCR, Sonatype, CocoaPods).
    *   SLSA provenance generation/verification logs.
    *   Sigstore signing logs.
    *   Release note paths (`docs/release-notes/...`).

9.  **System & Environment Information:**
    *   Cache statistics (`ccache --show-stats`).
    *   Docker system info (`docker info`, `docker buildx ls`).
    *   Basic system info like processor count (`getconf _NPROCESSORS_CONF`).

10. **Git Operations Details:**
    *   Changed file lists (`git diff --name-only`).
    *   Merge base commit hashes.
    *   Commit counts (`git rev-list --count`).
    *   Cherry-pick status and target commits.

In essence, while high-level actions are performed, the logs are rich with specific details about versions, hashes, configurations, file paths, test outcomes, static analysis findings, and deployment statuses.

---

## Reporting, Code Coverage and SonarCloud

### Reporting, code coverage, etc. {#reporting-code-coverage-etc .unnumbered}

- How do I process code coverage reports? Should I bother with them? How do I compile and aggregate test reports?
- Coverage is the measure of how much the code is covered by tests, usually unit tests. You have to make sure that you understand the limitations and benefits of coverage; otherwise, it stops being a useful metric. For more information, see the Test Coverage Paradox.

These are popular integrations based on actual workflow data (aggregated):

- https://docs.coveralls.io/api-introduction  
- https://docs.codeclimate.com/docs/finding-your-test-coverage-token  
- https://docs.sonarcloud.io/advanced-setup/ci-based-analysis/github-actions-for-sonarcloud/  
- https://docs.codecov.com/docs

So, you should consider how to integrate these tools into your pipeline—understanding what they do and how the results work, etc.

---

## **Setting up SonarCloud with GitHub Actions: A Step-by-Step Guide** {#setting-up-sonarcloud-with-github-actions-a-step-by-step-guide .unnumbered}

This guide walks you through integrating SonarCloud code analysis into your GitHub Actions workflow, enabling automated code quality checks with every push or pull request.

**Step 1: Generate a SonarCloud Token**

1. Log in to your SonarCloud account.
2. Navigate to “My Account” > “Security”.
3. Generate a new token.
4. Copy the token value; you’ll need it for the next step.

**Step 2: Store the Token as a GitHub Secret**

1. Go to your GitHub repository.
2. Click “Settings” > “Secrets” > “Actions”.
3. Click “New repository secret”.
4. Name the secret SONAR_TOKEN.
5. Paste the SonarCloud token you copied in Step 1 into the “Value” field.
6. Save the secret.

**Step 3: Define SonarCloud Properties (Project-Specific)**  
You’ll need to specify these properties for SonarCloud to identify your project. The location of these properties varies depending on your project type.

- **Java (Maven):** pom.xml
- **Java (Gradle):** build.gradle
- **.NET:** Within the SonarScanner command line arguments
- **Other:** Create a sonar-project.properties file in your repository’s root

Inside these files, set the following:

```
sonar.projectKey=your-project-key
sonar.organization=your-organization-key
sonar.host.url=https://sonarcloud.io
```

Replace `your-project-key` and `your-organization-key` with your actual values from SonarCloud.

**Step 4: Create the GitHub Actions Workflow File**

1. Create a file named `.github/workflows/build.yml` in your repository’s root.

Choose the Workflow Configuration based on your project type:

### a) Single Project Workflow

```yaml
name: SonarCloud Analysis

on:
  push:
    branches:
      - main
  pull_request:
    types: [opened, synchronize, reopened]

jobs:
  sonarcloud:
    name: SonarCloud Scan
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
        with:
          fetch-depth: 0

      - name: SonarCloud Scan
        uses: SonarSource/sonarcloud-github-action@master
        env:
          SONAR_TOKEN: ${{ secrets.SONAR_TOKEN }}
```

### b) Monorepo Workflow (Multiple Projects)

```yaml
name: SonarCloud Monorepo Analysis

on:
  push:
    branches:
      - main
  # Add path filters if needed (e.g., - 'project1/**')
  pull_request:
    types: [opened, synchronize, reopened]

jobs:
  sonarcloudScan1:
    name: Project 1 Scan
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
        with:
          fetch-depth: 0

      - name: SonarCloud Scan
        uses: SonarSource/sonarcloud-github-action@master
        env:
          SONAR_TOKEN: ${{ secrets.SONAR_TOKEN }}
        with:
          projectBaseDir: project1/ # Path to project 1

  sonarcloudScan2:
    name: Project 2 Scan
    runs-on: ubuntu-latest
    steps:
      # ... (Similar to sonarcloudScan1, but with projectBaseDir: project2/)
```

### c) C/C++ Project Workflow

This workflow simplifies the process by automatically installing necessary tools:

```yaml
name: SonarCloud C/C++ Analysis

on:
  # ... (Trigger events same as above)

jobs:
  sonarcloud:
    name: SonarCloud Scan
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
        with:
          fetch-depth: 0

      - name: SonarCloud Scan
        uses: SonarSource/sonarcloud-github-action@master
        env:
          SONAR_TOKEN: ${{ secrets.SONAR_TOKEN }}
```

**Step 5: Commit and Push Your Changes**  
Commit your updated project configuration files and the `.github/workflows/build.yml` file to your repository. This will trigger your first SonarCloud analysis.

**Step 6: View the Analysis Report**

1. Go to your SonarCloud project dashboard.
2. You’ll see the results of your code analysis, including code smells, bugs, security vulnerabilities, and code coverage.

**Important Notes**

- **Reusable Workflows**: For reusable workflows, use the `secret: inherit` feature to pass the SONAR_TOKEN securely.
- **Detailed Configuration**: For advanced configuration options, refer to the official SonarCloud documentation and the `sonar-project.properties` file.
- **Language-Specific Setup**: For languages not explicitly mentioned, check the SonarCloud documentation for specific setup instructions.


