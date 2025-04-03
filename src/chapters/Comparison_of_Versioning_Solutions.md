## **Comparison of Versioning Solutions** {#comparison-of-versioning-solutions .unnumbered}

---

Tool Description Versioning Scheme Automation Language/Framework Pros Cons

---

**GitVersion** Derives semantic version based on Git history, branches, and tags. Semantic Versioning Build-time .NET, CLI Flexible configuration options, supports complex branching strategies. Can be complex to configure, requires understanding of Git branching strategies.

**standard-version** Automates version bumps, changelogs, and Git tags based on Conventional Commits. Semantic Versioning Commit-time, Release JavaScript Easy to use, enforces consistent commit messages. Less flexible configuration, requires adherence to Conventional Commits.

**semantic-release** Fully automates releases, changelog generation, and publishing based on Conventional Commits. Semantic Versioning Continuous Deployment JavaScript Highly automated, ensures consistent releases. Requires strong commitment to Continuous Deployment, can be challenging to set up initially.

**Nerdbank.GitVersioning** Embeds version metadata directly in the code using an MSBuild task. Semantic Versioning Build-time .NET Lightweight, good for simple projects. Limited configuration options, less flexible than GitVersion.

**minver** Infers semantic version from Git tags, supporting pre-release versions. Semantic Versioning Build-time .NET Minimal configuration, easy to get started. Limited control over versioning logic.

**conventional-changelog** Generates changelogs from commit messages formatted according to Conventional Commits. N/A N/A JavaScript Useful for generating changelogs independently from versioning. Requires adherence to Conventional Commits.

**release-please** Automates release PR creation based on Conventional Commits and labels. Semantic Versioning GitHub Actions JavaScript Streamlines the release process, integrates well with GitHub. Relies on GitHub Actions, requires adherence to Conventional Commits.

**changesets** Manages version bumps and changelogs for monorepos, using a separate file for change descriptions. Semantic Versioning Release JavaScript Good for managing complex monorepos, allows for granular versioning decisions. Requires additional steps for managing changesets, can be more complex for smaller projects.

**release-it** General-purpose release automation tool that supports various versioning schemes and plugins. Customizable Release JavaScript Highly customizable, supports various workflows and integrations. Can require more configuration compared to simpler tools.

---

**Choosing the Right Tool:**

- **Complexity:** For simpler projects with basic branching strategies, **minver** or **Nerdbank.GitVersioning** might be sufficient.

- **Conventional Commits:** If you are committed to using Conventional Commits, **standard-version**, **semantic-release**, or **release-please** are good choices.

- **Continuous Deployment:** For fully automated releases, **semantic-release** is the optimal choice.

- **Monorepos:** **changesets** is designed for managing versioning in monorepos.

- **Flexibility:** **GitVersion** and **release-it** offer high levels of customization and flexibility.

/// Start of Selection
Consider your project's specific needs and your team's workflow to select the most appropriate versioning solution.

```yaml
name: Deployment

on:
  workflow_dispatch:
    inputs:
      releaseType:
        type: environment
        required: true

concurrency:
  group: ${{ github.workflow }}-${{ github.ref }}
  cancel-in-progress: false

jobs:
  create_release:
    permissions:
      id-token: write # This is required for requesting the JWT
      contents: write # This is required for actions/checkout
    runs-on: ubuntu-latest
    if: ${{ github.event.inputs.releaseType == 'production' }}
    outputs:
      release_id: ${{ steps.create_release.outputs.release_id }}

    steps:
      - name: Create Release
        id: create_release
        uses: actions/github-script@v6
        with:
          script: |
            const release = await github.rest.repos.createRelease({
              owner: context.repo.owner,
              repo: context.repo.repo,
              tag_name: `v${Date.now()}`, // This is an example tag format. Customize as needed.
              name: 'Production Release',
              body: 'New production release',
              draft: false,
              prerelease: false
            });
            return release.data.id;

  staging:
    needs: [create_release]
    runs-on: ubuntu-latest
    environment:
      name: staging
      url: https://github.com
    steps:
      - name: Check out repository
        uses: actions/checkout@v3

      - name: Deploy to Staging
        run: |
          echo "Pretending to deploy to staging environment"
          sleep 30

  production:
    needs: [staging]
    if: ${{ github.event.inputs.releaseType == 'production' }}
    runs-on: ubuntu-latest
    environment:
      name: production
      url: https://github.com
    steps:
      - name: Check out repository
        uses: actions/checkout@v3

      - name: Deploy to Production
        run: |
          echo "Deploying to production environment with release ID ${{ needs.create_release.outputs.release_id }}"
          sleep 30
```
