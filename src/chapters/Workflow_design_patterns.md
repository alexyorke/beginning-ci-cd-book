## Workflow Design Patterns

### 1. Readable Shell Scripts

* Avoid **long, unreadable command lines** with heavy escaping. Instead:

 * Use **here-docs** for multi-line literals:

 ```bash
```bash
 cat << EOF
```
 Line 1
 Line 2
 Line 3
 EOF
 ```
 * Break long commands with `\` so each step is clear:

 ```bash
```bash
 find . -type f -name "*.txt" -exec wc -l {} + \
```
 | awk '$1 >= 100' \
 | sort -nr \
 | head -n 5 \
 | awk '{print "File: " $2 " - Line Count: " $1}'
 ```
* Multi-line formatting improves **readability** for pipelines.
* Use **functions** in bash scripts for organization.
* Add **error checking** so you know which command failed.
* Use semicolons (`;`) when chaining commands on one line.

---

### 2. Matrix Builds in CI/CD

* **Matrix builds** let you run the same job across multiple environments (OS, language versions).
* **`if` conditions** restrict steps/jobs to certain environments.

#### Issues with combining matrix + `if`

1. **Redundancy**: You may spin up jobs that immediately skip steps, wasting CI resources.
2. **Complexity**: Too many conditionals make workflows hard to follow.

#### When it’s acceptable

* Most steps are common, with only a few OS-specific conditions.
* Conditional logic is **minimal** and doesn’t bloat the workflow.

#### Best practices

* Use **separate jobs or workflows** if environments differ significantly.
* Keep matrix builds for **similar jobs** across environments.
* Optimize for **clarity and maintainability**—complex workflows become fragile.

#### Conclusion

Combining matrix builds with `if` statements isn’t inherently wrong, but it often introduces unnecessary complexity and inefficiency. Default to **simple, targeted workflows** unless the overlap is strong enough to justify a combined approach.

---

## Designing Workflows with GitHub Actions

A workflow is a YAML file in `.github/workflows/` describing triggers (`on:`), jobs, and steps. Runners are ephemeral by default; each workflow run starts from a clean machine image. Jobs can run in parallel; use `needs:` to create dependencies.

### Minimal CI workflow skeleton

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

### `.gitignore` principle

Do not commit generated artifacts (build outputs, caches, logs, secrets). Prefer committing source, configs, and lockfiles; regenerate outputs in CI.

---

## Control Flow in GitHub Actions

Every step has an implicit `if: success()` unless you override it. Use these status functions:

- `success()`, `failure()`, `cancelled()`, `always()`

Use `continue-on-error: true` when a step can fail without poisoning the job. Use `needs:` to express job dependencies and enable DAG-style workflows.

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

---

## File Path Globs by Category

Path filters in `on: push: paths:` and `on: pull_request: paths:` use glob patterns. The following table shows common patterns grouped by theme.

| Category | Example Globs |
|----------|--------------|
| Documentation | `**.md`, `**/*.md`, `docs/**`, `README*`, `CHANGELOG.md`, `CONTRIBUTING.md`, `LICENSE.md` |
| Project Configuration | `.gitignore`, `.editorconfig`, `.github/**`, `.vscode/**`, `package.json`, `Dockerfile`, `docker-compose.yml`, `Makefile`, `requirements.txt` |
| License and Legal | `LICENSE`, `LICENCE`, `LICENSE.txt`, `**/LICENSE` |
| CI/CD | `.github/workflows/**`, `.github/dependabot.yml`, `.github/CODEOWNERS`, `.circleci/**`, `.gitlab-ci.yml` |

### Testing Branch Glob Patterns Locally

GitHub Actions uses the `minimatch` library under the hood to evaluate branch filters (the `branches:` key in your `on:` trigger). The following Node.js script replicates the exact options the runner uses, giving you a fast local feedback loop before you push.

```javascript
const { minimatch } = require('minimatch');

function testPatterns(items, pattern, options) {
  const matches = [];
  const nonMatches = [];
  items.forEach(item => {
    if (minimatch(item, pattern, options)) {
      matches.push(item);
    } else {
      nonMatches.push(item);
    }
  });
  return { matches, nonMatches };
}

const itemsToTest = ['RELEASE/a', 'release/b', 'hotfix/a', 'feature/c'];
const pattern = 'release/**';

// These options match what the GitHub Actions runner passes to minimatch
const minimatchOptions = { dot: false, nobrace: true, nocase: false, nocomment: true, noext: true };

const result = testPatterns(itemsToTest, pattern, minimatchOptions);
console.log('Matching items:', result.matches);
console.log('Non-matching items:', result.nonMatches);
```

Run with `node test-globs.js` after `npm install minimatch`. Branch pattern matching is case-sensitive by default (`nocase: false`), so `RELEASE/a` will not match `release/**`.
