# Observability, Monitoring, Logging, and Reporting

## Application Monitoring

Deploying your application successfully doesn't always guarantee it's functioning correctly, especially in complex setups with a backend. Errors can arise from many sources: backend server failures, problematic builds that prevent the app from loading, or external API issues (for example, a weather data endpoint that is rate-limited or down).

### Common error categories to monitor

- **Deployment errors** — Is the application loading? A blank page or failure to load can indicate file deployment issues or client-side script errors.
- **API dependency failures** — External APIs can fail, be blocked, hit rate limits, or return unexpected responses.
- **Performance degradation** — Slow load times degrade user experience and may indicate the need for optimization.

### Setting clear goals before you instrument

Monitoring without defined success criteria produces noise. Before adding dashboards, answer:

- What does success look like for this service? (e.g., 99% adjusted customer experience score, 100 monthly active users)
- What metrics reflect that? (error rates, load times, user engagement events)
- Who are the stakeholders and what questions do they need the dashboard to answer?

### What to measure

Beyond server-level metrics (CPU, memory, disk), focus on user-facing indicators:

- **Web Vitals** (Largest Contentful Paint, Cumulative Layout Shift, Interaction to Next Paint) — measure what users actually experience.
- **Error rates** — HTTP 4xx and 5xx rates, JavaScript exceptions.
- **Engagement events** — search interactions, map zoom, account creation, subscription sign-ups.
- **Custom metrics** — actions specific to your application (e.g., "weather forecast viewed").

### Error budgets

Set a practical error budget: a threshold of acceptable errors that allows for innovation without compromising user experience. Configure alerts at meaningful thresholds rather than alerting on every minor error. Alert fatigue is real.

### Dashboard design principles

- Use white space to group related data.
- Include both quantitative data (numbers) and qualitative signals (outstanding customer issues).
- Avoid decorative elements that distract from the key message.
- Make critical data stand out (larger text, visual distinction).
- Keep chart styles consistent so comparisons are easy.
- Include error budget metrics: surplus, deficit, burn-down rate.

---

## CI/CD Observability and Telemetry

CI/CD pipelines themselves can be observed as a system. Slow pipelines, flaky tests, and high failure rates are signals worth tracking.

**Key resources:**

- [GUAC](https://docs.guac.sh/) — Graph for Understanding Artifact Composition; enables automated dependency graph analysis. Works best with automated (not manual) dependency management.
- [run-with-telemetry](https://github.com/krzko/run-with-telemetry) — GitHub Action `run` wrapper with OpenTelemetry instrumentation.
- [otel-export-trace-action](https://github.com/inception-health/otel-export-trace-action) — Export GitHub Actions traces to an OpenTelemetry collector.
- [Elastic CI/CD Observability Guide](https://www.elastic.co/guide/en/observability/current/ci-cd-observability.html) — Practical reference for ingesting pipeline telemetry into Elastic Stack.

**Talks and presentations:**

- [Embracing Observability in Jenkins with OpenTelemetry](https://www.youtube.com/watch?v=3XzVOxvNpGM) (DevOpsWorld 2021) — covers the plugin approach for Jenkins.
- [Making CI/CD Pipelines Speak in Tongues with OpenTelemetry](https://www.youtube.com/watch?v=1jDLNNe_TEM) (cdCon 2022) — cross-platform perspective.
- [FOSDEM 2022 – OpenTelemetry and CI/CD](https://archive.fosdem.org/2022/schedule/event/opentelemetry_and_ci_cd/) — foundational talk.
- [Strategic Sampling: Architectural Approaches to Efficient Telemetry](https://ftp2.osuosl.org/pub/fosdem/2024/ua2220/fosdem-2024-3445-strategic-sampling-architectural-approaches-to-efficient-telemetry.mp4) (FOSDEM 2024).
- [What is CI/CD Observability and How to Bring It to Pipelines](https://ftp2.osuosl.org/pub/fosdem/2024/ua2220/fosdem-2024-3262-what-is-ci-cd-observability-and-how-to-bring-observability-to-ci-cd-pipelines-.mp4) (FOSDEM 2024).
- [Squash the Flakes: Minimizing Flaky Test Impact](https://ftp2.osuosl.org/pub/fosdem/2024/ud2208/fosdem-2024-1805-squash-the-flakes-how-to-minimize-the-impact-of-flaky-tests.mp4) (FOSDEM 2024).

---

## What Gets Logged in CI/CD Workflows

Understanding what real-world pipelines log helps you design your own logging strategy. Based on analysis of Google's open-source GitHub Actions workflows, these are the most common data types captured in logs:

1. **Tool and dependency versions** — `cmake --version`, `bazel version`, `go version`; implicit in `setup-node`, `setup-java` etc.
2. **Commit SHAs and hashes** — `${{ github.sha }}`, `git rev-parse HEAD`, `hashFiles(...)` for cache keys.
3. **Configuration and flags** — build types (Release/Debug), compiler flags, CMake presets, tool arguments.
4. **File paths** — `$GITHUB_PATH` additions, artifact upload/download paths, lists of changed files.
5. **Test results** — pass/fail status, verbose output, JUnit XML paths, coverage upload status, flaky test re-run counts.
6. **Static analysis findings** — file:line:message from ESLint, golangci-lint, Ruff, mypy; SARIF upload status.
7. **Dependency information** — packages installed, cache hit/miss status, outdated dependency lists.
8. **Deployment and release details** — target tags, asset upload status, registry publishing status, SLSA provenance logs.
9. **System environment info** — `ccache --show-stats`, `docker info`, processor count.
10. **Git operation details** — changed file lists, merge-base hashes, commit counts.

---

## Code Coverage and Reporting

Coverage measures how much of your code is exercised by tests. It is a useful signal but must be interpreted carefully — see the "Test Coverage Paradox" for why 100% coverage does not equal high confidence.

**Popular coverage integrations** (based on real workflow data):

- [Coveralls](https://docs.coveralls.io/api-introduction) — simple coverage badge and history.
- [CodeClimate](https://docs.codeclimate.com/docs/finding-your-test-coverage-token) — combines coverage with maintainability metrics.
- [SonarCloud](https://docs.sonarcloud.io/advanced-setup/ci-based-analysis/github-actions-for-sonarcloud/) — code quality, security hotspots, and coverage in one platform.
- [Codecov](https://docs.codecov.com/docs) — coverage diffs on PRs, flag-based coverage.

---

## Setting up SonarCloud with GitHub Actions

### Step 1: Generate a SonarCloud token

1. Log in to SonarCloud → **My Account** → **Security**.
2. Generate a new token and copy it.

### Step 2: Store the token as a GitHub secret

Repository **Settings** → **Secrets and variables** → **Actions** → **New repository secret** → name it `SONAR_TOKEN`.

### Step 3: Define SonarCloud project properties

Add these to your project's configuration file (`sonar-project.properties`, `pom.xml`, `build.gradle`, etc.):

```
sonar.projectKey=your-project-key
sonar.organization=your-organization-key
sonar.host.url=https://sonarcloud.io
```

### Step 4: Add a workflow

**Single project:**

```yaml
name: SonarCloud Analysis
on:
  push:
    branches: [main]
  pull_request:
    types: [opened, synchronize, reopened]

jobs:
  sonarcloud:
    name: SonarCloud Scan
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0
      - name: SonarCloud Scan
        uses: SonarSource/sonarcloud-github-action@master
        env:
          SONAR_TOKEN: ${{ secrets.SONAR_TOKEN }}
```

**Monorepo (multiple projects):**

```yaml
name: SonarCloud Monorepo Analysis
on:
  push:
    branches: [main]
  pull_request:
    types: [opened, synchronize, reopened]

jobs:
  sonarcloudProject1:
    name: Project 1 Scan
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0
      - name: SonarCloud Scan
        uses: SonarSource/sonarcloud-github-action@master
        env:
          SONAR_TOKEN: ${{ secrets.SONAR_TOKEN }}
        with:
          projectBaseDir: project1/

  sonarcloudProject2:
    name: Project 2 Scan
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0
      - name: SonarCloud Scan
        uses: SonarSource/sonarcloud-github-action@master
        env:
          SONAR_TOKEN: ${{ secrets.SONAR_TOKEN }}
        with:
          projectBaseDir: project2/
```

### Step 5: Commit, push, and view results

Push the workflow file to trigger your first analysis. Results appear in your SonarCloud project dashboard: code smells, bugs, security vulnerabilities, and coverage.

**Notes:**

- For reusable workflows, use `secrets: inherit` to pass `SONAR_TOKEN` securely.
- For C/C++ projects, use the same action — it automatically installs the build wrapper.
- Refer to the [SonarCloud documentation](https://docs.sonarcloud.io/) for language-specific configuration.
