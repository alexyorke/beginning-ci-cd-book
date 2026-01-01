# Workflow Design and Control Flow

## Designing Workflows with GitHub Actions

Content consolidated from `Designing_Workflows_with_GitHub_Actions.md` and `Workflow_Design_Getting_Started_and_Gitignore.md` (intro to GHA, triggers, jobs/steps, actions vs run, environments/secrets overview, getting started, .gitignore guidance).

### Preserved content excerpts (from `Designing_Workflows_with_GitHub_Actions.md`, `Workflow_Design_Getting_Started_and_Gitignore.md`)

#### What is a GitHub Actions workflow?

- A workflow is a YAML file in `.github/workflows/` describing triggers (`on:`), jobs, and steps.
- Runners are ephemeral by default; each workflow run starts from a clean machine image.
- Jobs can run in parallel; use `needs:` to create dependencies.

#### Minimal “build” workflow skeleton

```yaml
name: CI
on:
  pull_request:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: echo "build commands here"
```

#### `.gitignore` principle

- Do not commit generated artifacts (build outputs, caches, logs, secrets).
- Prefer committing source, configs, and lockfiles; regenerate outputs in CI.

---

## Control Flow in GitHub Actions

Consolidated detailed control flow guidance from `Control_Flow_in_GitHub_Actions.md` and chapter-style overview from `Controlling_Workflow_Execution.md`.

Includes: default success(), failure(), cancelled(), always(), needs, continue-on-error, synchronization patterns, conditional expressions, examples and anti-patterns.

### Preserved content excerpts (from `Control_Flow_in_GitHub_Actions.md`, `Controlling_Workflow_Execution.md`)

- Every step has an implicit `if: success()` unless you override it.
- Use these common status functions:
  - `success()`, `failure()`, `cancelled()`, `always()`
- Use `continue-on-error: true` when a step can fail without poisoning the job.
- Use `needs:` to express job dependencies and enable DAG-style workflows.

```yaml
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - name: Run tests
        run: npm test
        continue-on-error: true

      - name: Always upload logs
        if: always()
        run: echo "upload logs here"
```


