# Communication, Outputs, and Environments

## Outputs and Job Communication

Consolidated from `GitHub_Actions_Outputs_and_Job_Communication.md` with practical examples and patterns for step outputs, job outputs, artifacts.

### Preserved content excerpts (from `GitHub_Actions_Outputs_and_Job_Communication.md`)

#### Step outputs (`$GITHUB_OUTPUT`)

Use step outputs to pass small pieces of data (strings) to later steps in the *same job*.

```yaml
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - id: version
        run: echo "VERSION=1.2.3" >> "$GITHUB_OUTPUT"

      - name: Use version
        run: echo "Version is $VERSION"
        env:
          VERSION: ${{ steps.version.outputs.VERSION }}
```

#### Job outputs (`jobs.<job>.outputs`)

Use job outputs to pass data between jobs (requires `needs:` so the producer runs first).

```yaml
jobs:
  job1:
    runs-on: ubuntu-latest
    outputs:
      release_url: ${{ steps.create.outputs.url }}
    steps:
      - id: create
        run: echo "url=https://example.com/release/123" >> "$GITHUB_OUTPUT"

  job2:
    runs-on: ubuntu-latest
    needs: job1
    steps:
      - run: echo "Release URL is ${{ needs.job1.outputs.release_url }}"
```

#### Artifacts (files between jobs)

If you need to share *files* (not small strings), upload/download artifacts between jobs.

---

## Environments and Environment Variables

Consolidated from `Environments_and_Variables.md` covering scopes, contexts, GITHUB_ENV, GITHUB_OUTPUT, best practices, and troubleshooting.

### Preserved content excerpts (from `Environments_and_Variables.md`)

#### Key idea: steps are isolated processes, jobs share a filesystem

- Each step runs in its own process.
- Steps in the same job share the same workspace on disk (filesystem changes persist).
- Shell variables set inside a step do **not** automatically persist to the next step.

#### Persisting env vars across steps (`$GITHUB_ENV`)

```yaml
steps:
  - name: Set env var for later steps
    run: echo "FOO=bar" >> "$GITHUB_ENV"

  - name: Read env var
    run: echo "$FOO"
```

#### Important caveat: secrets in `if:`

- GitHub does not allow `${{ secrets.X }}` directly in `if:`. If you need conditional logic, pass the secret to an `env:` var and test that.

---

## Webhooks and External Notifications

Consolidated from `Webhooks.md`: ChatOps concepts, repository_dispatch, Teams/Slack/Discord examples, security considerations, and sample workflows.

### Preserved content excerpts (from `Webhooks.md`)

- Webhooks let external systems trigger workflows. This enables ChatOps-style controls (e.g., “deploy” from Slack/Teams/Discord).
- For GitHub Actions, use `repository_dispatch` for externally-triggered workflows.

```yaml
on:
  repository_dispatch:
    types: [deploy-production]
```

#### Security notes

- Treat webhook triggers as **production-impacting**: require authentication and authorization.
- Store webhook URLs/tokens in GitHub Secrets, and limit who can trigger dispatch events.


