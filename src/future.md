## Future topics to cover (gap list)

This file is a working backlog of **topics not yet fully covered** in the current manuscript, based on the “Comprehensive Gap Analysis and Advanced Curriculum for Modern CI/CD Education” outline.

> Goal: shift from “workflows as scripts” to **pipelines as production software** (platform engineering patterns).

---

### Advanced workflow architecture (modular pipelines)

- **Reusable workflows vs composite actions**
 - When to use `workflow_call` vs `runs: using: "composite"`
 - Interface design: inputs/outputs/secrets contracts
 - Versioning and governance patterns for shared workflows
 - Debuggability trade-offs (step granularity vs encapsulation)
 - Concurrency groups and environment serialization patterns

- **Workflow library design**
 - “platform team” model: centrally managed secure build/release workflows
 - organization-wide policy enforcement patterns (required checks + reusable workflows)

---

### Supply chain security (modern baseline)

- **OIDC / federated credentials (death of static cloud secrets)**
 - GitHub Actions `permissions: id-token: write`
 - Trust policies/claims mapping (repo, ref, environment)
 - Least-privilege secret interfaces for reusable workflows

- **SLSA (Supply-chain Levels for Software Artifacts)**
 - Provenance generation and verification
 - Signing/attestation concepts
 - Ephemeral runners and hardened builds (why hosted/ephemeral matters)
 - Artifact attestations (e.g., provenance files + signatures)

- **Registry trusted publishing**
 - npm provenance / “verified” publishing via OIDC
 - Artifact provenance for containers and packages (beyond “build and push”)

---

### Pipeline observability (beyond logs)

- **OpenTelemetry (OTel) for CI/CD**
 - Tracing workflow steps as spans
 - Correlating builds across pipelines/repos
 - Building dashboards from structured events (not just log text)

- **High-cardinality build events**
 - Cache metrics, dependency download timings, test shard timing, flaky-test rate
 - Using observability to drive pipeline performance/cost decisions

---

### Scaling CI/CD for large codebases

- **Monorepos vs polyrepos**
 - Trade-offs, governance, and pipeline structure
 - Path-aware builds and dynamic matrix generation
 - Tooling: Nx / Turborepo and remote caching patterns

- **Merge queues**
 - “rebase race” and why queues exist
 - Batch testing + bisection strategies
 - Required checks + queue integration patterns

---

### IaC automation patterns (platform workflows)

- **IssueOps**
 - GitHub Issues/Forms as an infra self-service portal
 - Plan as a comment, `/apply` as approval, audit trail patterns

- **Drift detection**
 - Scheduled `terraform plan` and alerting/issue creation
 - Preventing ClickOps drift from becoming the “real” state

---

### Deployment architecture (GitOps and controllers)

- **Push vs pull deployment models**
 - Why “CI has cluster credentials” is risky
 - GitOps flow: CI updates manifests; controller reconciles

- **Argo CD / Flux**
 - Image update strategies
 - Self-healing and reconciliation semantics
 - “App of Apps” bootstrapping patterns

---

### AI-augmented pipelines (2025 reality)

- **Agentic PR review**
 - AI reviewer as part of CI gating (summaries, risk flags, suggested diffs)

- **Automated test generation**
 - Pipeline-driven “coverage gap → test PR” workflow

- **Failure triage / self-healing**
 - Classifying failures (flaky vs deterministic vs infra)
 - Auto-retry policies with guardrails

---

### Mobile CI/CD (the “last mile”)

- **Fastlane**
 - Lanes inside CI (build, sign, test, upload)

- **Signing identities**
 - Cert/provisioning profile handling strategies
 - Secure storage, rotation, and “match”-style patterns

- **Store delivery**
 - TestFlight / App Store Connect / Play Store automation
 - Release gates and staged rollout strategies

---

### Platform engineering, governance, and cost

- **Policy & governance at scale**
 - Organization-wide rule enforcement (required workflows/checks, rulesets)
 - Compliance/audit trail patterns (SOC2-style evidence)

- **Self-hosted runners at scale**
 - Kubernetes runner controllers (ARC-style patterns)
 - Ephemeral runners on your infra (security parity with hosted)

- **FinOps / cost strategy**
 - Right-sizing runners, caching ROI, avoiding rebuild storms
 - Concurrency controls to prevent resource contention

---

### Future directions (beyond YAML)

- **Programmable pipelines**
 - Dagger (pipelines as code in real languages)
 - “run the exact CI pipeline locally” feedback loop patterns


---

## Open Questions and Tool References to Resolve

The following are open questions and tool links that need to be investigated and worked into the manuscript:

1. What about code formatting and linting tasks?
2. [fkirc/skip-duplicate-actions](https://github.com/fkirc/skip-duplicate-actions) � Save time and cost when using GitHub Actions
3. [corretto-8 submit.yml](https://github.com/corretto/corretto-8/blob/92a88d5bd8087f15f18222d87ddacf3a076628c0/.github/workflows/submit.yml#L39)
4. [prisma/.github/workflows](https://github.com/prisma/prisma/tree/main/.github/workflows)
5. GitHub bots to post on comments with test reports
6. Ignore paths for pushes such as README.md and other paths (is there a template for this?)
7. [yplatform main.yml](https://github.com/ysoftwareab/yplatform/blob/c4c188e21215efab824a3f14d80494c0071567e7/.github/workflows/main.yml#L33)
8. [arm-oraclelinux-wls-cluster build.yml](https://github.com/wls-eng/arm-oraclelinux-wls-cluster/blob/develop/.github/workflows/build.yml)
9. Lots of people use "working-directory" -- document the pattern
10. Make sure that if you're running scripts, that someone who makes a PR can't just stick a script in that folder and have it run
11. "There's a convention for tagging built images with metadata including the run id, CI event type, and commit sha."
12. Updating Docker Hub description automatically
13. Docker container security scanning
14. The use of actions like jaywcjlove/create-tag-action and ncipollo/release-action to automate version bumping, tagging, and creating GitHub releases based on changes in package.json.
15. Changelog generation
16. buildx multi-platform builds documentation
17. Python instead of Bash for advanced scripting in workflows
18. Uploading logs as compliance to GitHub artifacts, BOMs?
19. Bats for bash script testing
20. Publishing debug symbols to private server
21. Versioning tools to evaluate and document: GitVersion, standard-version, semantic-release, Nerdbank.GitVersioning, minver, conventional-changelog, release-please, changesets, release-it
