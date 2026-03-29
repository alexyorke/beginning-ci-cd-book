# Runner Software and Self-Hosted Runners

## CI/CD Provider Landscape

CI/CD platforms provide the infrastructure for automated builds, tests, artifact management, deployment, and environment management. Building this from scratch is possible but rarely worth it — off-the-shelf platforms are tested, scalable, and come with rich integration ecosystems.

A brief history of how we got here:

- **Pre-1960s–1970s:** Early software used the Waterfall model. Source Code Management (SCMs) like SCCS (1975) and RCS emerged to manage and audit code changes.
- **1980s–1990s:** "Integration Hell" was coined as a term for the pain of infrequent merges. Nightly builds became popular to surface integration issues overnight. Microsoft's daily build practice (documented by Steve McConnell) was a significant step forward.
- **2000s:** Martin Fowler popularized Continuous Integration in 2000. Tools like CruiseControl, Jenkins, TeamCity, Bamboo, and GitLab CI codified the practice.
- **2010s onward:** Git and distributed version control shifted development toward shorter feedback cycles. Jez Humble and David Farley's *Continuous Delivery* (2010) extended CI toward production-readiness. DevOps culture followed.

### Choosing a provider

When evaluating CI/CD platforms, key dimensions include:

| Dimension | What to evaluate |
|-----------|-----------------|
| Source control integration | Native support for Git, trigger types (push, PR, tag, schedule) |
| Build management | Parallel builds, matrix builds, manual triggers, scheduled runs |
| Security | User authentication, LDAP/SSO, secret management, audit logging |
| Notification integrations | Email, Slack, Teams, webhooks |
| Plugin/marketplace ecosystem | Available actions, plugins, or integrations |
| Installation and hosting | Cloud-hosted vs. self-hosted, cost model |

If you already deploy to a cloud provider (e.g., Azure, AWS), choosing the CI/CD system from that same vendor often simplifies authentication and deployment integration significantly.

---

## Setting Up a Self-Hosted Runner

GitHub provides cloud-hosted runners (`ubuntu-latest`, `windows-latest`, `macos-latest`) that are the default choice for most workflows. Self-hosted runners are useful when you need:

- Access to on-premises resources (databases, private registries, internal services).
- Specific hardware (GPUs, custom CPUs, more RAM/disk than cloud runners offer).
- Cost control at high build volumes.
- Custom pre-installed software environments.

### Registration

1. Go to your repository (or organization) → **Settings** → **Actions** → **Runners** → **New self-hosted runner**.
2. Select your runner OS and follow the instructions to download, configure, and register the agent.

A Windows registration session looks like this:

```
PS C:\actions-runner> ./config.cmd --url https://github.com/your-org/your-repo --token TOKEN_HERE

# Authentication
√ Connected to GitHub

# Runner Registration
Enter the name of the runner group to add this runner to: [press Enter for Default]
Enter the name of runner: [press Enter for my-runner]
This runner will have the following labels: 'self-hosted', 'Windows', 'X64'
Enter any additional labels (ex. label-1,label-2): [press Enter to skip]
√ Runner successfully added
√ Runner connection is good

# Runner settings
Enter name of work folder: [press Enter for _work]
√ Settings Saved.

Would you like to run the runner as service? (Y/N) [press Enter for N]

PS C:\actions-runner> ./run.cmd
√ Connected to GitHub
Current runner version: '2.316.0'
2024-05-06 05:19:09Z: Listening for Jobs
2024-05-06 05:20:12Z: Running job: build
2024-05-06 05:20:30Z: Job build completed with result: Succeeded
```

### Using the runner in a workflow

Reference the runner by its label in `runs-on`:

```yaml
jobs:
  build:
    runs-on: self-hosted   # or a custom label you assigned during registration
```

> **Important:** Do not use personal or shared developer machines as permanent self-hosted runners in production. There is minimal isolation between jobs — the runner executes directly on the host, has access to all installed software, and retains state between runs unless you actively clean it up. Use a dedicated VM or container-based runner instead.

---

## Inside a Runner: What Happens During a Job

Understanding what the runner does internally is valuable for debugging. Here is what the self-hosted agent does from the moment a job is assigned:

### 1. Listener and worker startup

The `Runner.Listener` process reads credentials and configuration, then launches `Runner.Worker.exe` to handle the actual job. The worker loads .NET Core runtime libraries (`hostfxr.dll`, `coreclr.dll`) and reads `Runner.Worker.deps.json` and `Runner.Worker.runtimeconfig.json` to understand the environment.

On Windows, Windows Defender (`MsMpEng.exe`) scans each DLL as it loads — this accounts for some of the startup latency you see in runner logs.

### 2. Job preparation

The worker reads `.runner` and `.setup_info` for runner capabilities, creates working directories under `_work/`, and manages pipeline mappings to isolate each job's workspace. Then it downloads the required actions (e.g., `actions/checkout@v4` as a zip) and extracts them into `_work/_actions/`.

### 3. Action execution (example: checkout)

When `actions/checkout` runs, the worker:

- Creates directories and files for the repository clone.
- Sets file attributes (read-only, hidden) as needed.
- Writes content to `action.yml`, `README.md`, and configuration files.
- Launches `node.exe` (the Node.js runtime) to execute the action's JavaScript.
- The Node.js process reads `event.json` (created by the worker in `_work/_temp/_github_workflow/`) to get event context, then performs git fetch/checkout operations.

### 4. Runner file commands

The runner uses a set of special files in `_work/_temp/_runner_file_commands/` for inter-process communication during workflow execution:

- Adding paths to `$PATH` → append to the file referenced by `$GITHUB_PATH`
- Setting environment variables → append to `$GITHUB_ENV`
- Setting step outputs → append to `$GITHUB_OUTPUT`
- Saving state between steps → append to `$GITHUB_STATE`

This file-based approach replaced the older `::set-output::` and `::save-state::` commands (deprecated in 2022).

### 5. Job completion

On completion, the worker writes final diagnostic info, removes temporary files and directories, and exits. The listener then marks the job as completed on GitHub.

### Directory layout

The runner root looks roughly like this:

```
/home/runner/
├── _work/
│   ├── YourRepository/     ← GITHUB_WORKSPACE
│   ├── _PipelineMapping/
│   └── _temp/
├── runners/
│   ├── 2.316.0/
│   └── 2.316.0.tgz
└── warmup/
```

Use `$GITHUB_WORKSPACE` (not a hardcoded path) to reference your repository directory — GitHub may change the underlying path structure between runner versions.

---

## Pre-installed Software and Installing Dependencies

### What's pre-installed

GitHub-hosted runners come with a large set of pre-installed tools. The full list for `ubuntu-latest` is published at:

[actions/runner-images: ubuntu/Ubuntu2204-Readme.md](https://github.com/actions/runner-images/blob/main/images/ubuntu/Ubuntu2204-Readme.md)

The runner image is updated periodically. This means `npm`, `python`, `docker`, and other tools may be updated underneath you. If builds start failing after no code changes, check whether the runner image was recently updated and whether a newly installed version of a tool changed behavior.

### Installing additional software

When the pre-installed software isn't sufficient, there are four approaches:

**1. Official package repositories (`apt-get`, `brew`, `choco`)**

```yaml
- name: Install a specific package version
  run: sudo apt-get install -y nodejs=18.*
```

Advantages: community-maintained, packages are stable per Ubuntu release, fast security patch propagation.
Disadvantage: Ubuntu LTS repos lag behind upstream versions. Use a PPA or alternative source if you need a newer version.

**2. curl/bash install scripts**

```yaml
- name: Install via official install script
  run: curl -fsSL https://deno.land/install.sh | sh
```

Risk: the remote script can change, be unavailable, or execute partially (e.g., on network timeout). A partially-executed install script can leave the system in an inconsistent state. Where possible, prefer pinning the script to a specific version hash and verifying the checksum. Avoid `curl | bash` for security-sensitive tooling — see the Security and Governance aside.

**3. Custom Docker images**

```yaml
jobs:
  build:
    runs-on: ubuntu-latest
    container:
      image: my-registry/my-build-image:1.2.3
```

Advantages: fully controlled, reproducible environment; all dependencies are locked at image build time.
Disadvantage: adds complexity (image maintenance, registry authentication, layer management). The image itself needs to be updated for security patches.

**4. Private package repositories**

Use a private registry (Nexus, Artifactory, GitHub Packages) when you need full control over which versions are available and want an audit trail of what was installed. Authentication requires managing credentials (ideally via OIDC or a secrets manager rather than long-lived tokens).

### Recommendation

For most projects: rely on pre-installed tools and `apt-get` for any gaps. Pin Docker images and lock files for reproducibility. Reserve custom Docker images for cases where the build environment is genuinely complex or must match a specific production image.
