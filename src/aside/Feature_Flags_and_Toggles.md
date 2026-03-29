# Feature Flags and Toggles

## What Are Feature Flags?

Feature flags (also called feature toggles) are conditionals that let you enable or disable parts of your application at runtime without deploying new code. Think of them as remotely controlled `if` statements.

Common implementations range from a simple JSON file in a storage bucket to dedicated platforms like LaunchDarkly or Split. Start simple — a JSON file is often enough to get started.

## Why Use Feature Flags with CI/CD?

Feature flags are what make it safe to merge incomplete work to `main` continuously. Rather than waiting on a long-lived feature branch, you merge early and keep the new code path hidden behind a flag until it is ready.

**Benefits:**

- **Separate deployment from release.** Deploy code to production while keeping the feature hidden. When the business is ready, flip the flag — no new deployment required.
- **Reduce risk.** If a newly released feature causes problems, turn it off immediately without a rollback deployment.
- **Support A/B testing and gradual rollouts.** Enable the feature for 5% of users, measure impact, then expand.
- **Increase development velocity.** Developers integrate to `main` more frequently without waiting for a complete feature.
- **Empower product teams.** Product owners can control release timing independently of engineering deploy cycles.

## Prerequisites: Modular Code

Feature flags only work cleanly in modular code. Attempting to add a flag to a tightly coupled codebase (where changing one path requires changes across many modules) is painful and error-prone. Clean architecture — where features can be enabled or disabled at a clear boundary — is a prerequisite.

## Scheduling Workflows and Cron Pitfalls

If you use cron-scheduled workflows alongside feature flags for time-based rollouts, keep these in mind:

- **GitHub does not guarantee exact execution times.** Workflows scheduled at popular times (especially around midnight UTC) are frequently delayed. If exact timing matters, use a webhook or `workflow_dispatch` instead of `schedule`.
- **The last day of the month cannot be expressed cleanly in cron syntax.** If you need end-of-month runs, schedule for the 29th, 30th, and 31st with a script block that checks whether today is actually the last day of the month before proceeding. Alternatively, run on the first day of the next month and reference the prior month's data.

## Getting Started

- **Start small.** Choose a non-critical feature for your first experiment.
- **Minimize toggle scope.** Keep the flag's impact to as few code paths as possible. Design flags to be removed once the feature is fully released.
- **Collect baseline data first.** Before enabling a new feature, capture baseline metrics so you can measure impact.
- **Don't over-engineer the framework.** Start with a JSON file or environment variable. Add a full feature-flag service only when you have proven the need.
- **Collaborate with product.** Educate product owners on what flags can do — they are a powerful tool for experiments and targeted rollouts.

## Key Considerations

- **Data is crucial.** Use flags to gather data, validate hypotheses, and make informed decisions — not just to hide code.
- **Technical and business value.** Flags reduce technical risk (safe rollouts, quick rollback) and create business value (experimentation, independent release timing).
- **Tooling can help.** Platforms like LaunchDarkly, Split, Unleash, and Flagsmith manage flag lifecycle, targeting rules, and analytics so you don't have to build that infrastructure yourself.

> For observability, monitoring, and how to measure whether a flagged feature is performing well, see the [Observability, Monitoring, Logging, and Reporting](Observability_Monitoring_and_Logging.md) aside.
