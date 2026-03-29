# Budgeting and Cost Management: Quick Tips

GitHub Actions charges for compute time (minutes) and storage (artifacts, packages). These tips help keep both under control without sacrificing developer experience.

## Workflow Duration and Timeouts

- Monitor how long your workflows take. Duration typically grows with the codebase — that's expected — but sudden increases indicate a problem.
- Lower the default 6-hour timeout to match your actual workflow duration plus a reasonable buffer (e.g., if your workflow usually takes 20 minutes, set a timeout of 40–60 minutes). This prevents runaway jobs from burning minutes silently.
- Use [Meercode](https://meercode.io/) (free tier available) or GitHub's own workflow analytics to visualize duration trends over time.

## Concurrency Control

- Limit concurrent builds per pull request to one. Auto-cancel older runs when a new commit is pushed:

```yaml
concurrency:
  group: ${{ github.workflow }}-${{ github.ref }}
  cancel-in-progress: true
```

- For deployment workflows, set `cancel-in-progress: false` instead — you don't want two deploys racing each other. Use a dedicated deployment environment with required reviewers to gate concurrent runs.

## Branch and Trigger Selection

- Avoid running CI on branches that have no open pull request (except `main`/`master`). Use path filters and branch filters to limit unnecessary triggers.
- Don't trigger expensive workflows on changes to documentation-only files:

```yaml
on:
  push:
    paths-ignore:
      - '**.md'
      - 'docs/**'
```

## Caching

- Cache dependencies (npm modules, pip packages, Gradle caches, etc.) to avoid re-downloading them on every run. A well-placed cache step can cut minutes off each run.
- Be aware: stale caches can introduce subtle bugs. Use `hashFiles()` on your lock file as the cache key so the cache busts when dependencies change.
- Don't over-cache. Caching build output is often not worth the complexity unless your build is genuinely slow.

## Artifact Storage

- Compress artifacts before uploading. The `actions/upload-artifact` action compresses by default, but be explicit about what you include.
- Set retention periods intentionally:
  - PR/dev builds: 1–3 days
  - Release artifacts: 30–90 days (or per compliance requirements)
- Exclude files from artifacts that are not needed for deployment or debugging (e.g., intermediate object files, test fixtures).

## Test and Analysis Efficiency

- **Fast fail first:** Run the quickest-failing tests first. If unit tests take 30 seconds and integration tests take 10 minutes, run unit tests in a separate early job.
- **Selective testing:** For monorepos, use path filters or tools like `nx affected` to run only tests relevant to changed code.
- **Static analysis:** Only run static analysis tools (ESLint, SonarCloud, CodeQL) if someone is actively looking at and acting on the results. Unused tooling costs minutes per run and adds maintenance burden.

## Dependabot Cost Considerations

- Dependabot PRs trigger CI just like developer PRs. If Dependabot is very active, it can multiply your CI minutes.
- Limit open Dependabot PRs with `open-pull-requests-limit` in `dependabot.yml`:

```yaml
version: 2
updates:
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "weekly"
    open-pull-requests-limit: 5
```

- Use grouped updates to batch multiple dependency bumps into a single PR where appropriate.
