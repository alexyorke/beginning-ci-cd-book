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

