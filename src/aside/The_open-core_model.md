# The Open-Core Model

The open-core model is a business strategy where the core of a product is open source, but additional features — typically enterprise-focused — are offered under a proprietary license. It combines the benefits of open-source development (community contributions, transparency, trust) with a sustainable commercial revenue stream.

This aside focuses on the engineering and release strategy side of running an open-core project, not the marketing or legal dimensions.

## Further Reading

- [The Cathedral & the Bazaar](https://www.amazon.ca/Cathedral-Bazaar-Musings-Accidental-Revolutionary/dp/0596001088/) by Eric Raymond — foundational essay on open-source development culture.
- [Producing Open Source Software](https://producingoss.com/) by Karl Fogel — practical guide to running a successful open-source project.
- [Open Core Business Model Handbook](https://handbook.opencoreventures.com/open-core-business-model) — detailed framework for structuring open-core products.
- [Grafana: OSS vs Cloud](https://grafana.com/oss-vs-cloud/) — Grafana Labs' own explanation of their model.
- [Archetypes of Open-Source Business Models](https://link.springer.com/article/10.1007/s12525-022-00557-9) (Springer) — academic taxonomy.

**Video explanations:**

- [What does Open Core mean?](https://www.youtube.com/watch?v=DnjmsaAYZfc)
- [Open Core vs Proprietary SaaS](https://www.youtube.com/watch?v=9Vj51JqQgzA)
- [Commercial Open Source Business Models: GitLab's Bet on Buyer-based Open Core](https://www.youtube.com/watch?v=Xt1kY7EEXb8)
- [Open source business models — PostHog](https://www.youtube.com/watch?v=L1Ovbzs7vyo)

## Structuring Your Open-Core Repository

The first question to answer is: what is proprietary, and how tightly is it coupled to the open-source core?

**Scenario A: Proprietary plugins or small feature additions**

If the proprietary components are small (extra integrations, enterprise authentication providers, admin dashboards), keep the open-source core as the primary repository and expose well-defined extension points. The proprietary additions are published as separate packages or plugins that consume the public core as a dependency.

This approach is simpler to maintain. The private plugin can be tested against a published release of the public core, and the two repositories remain loosely coupled.

**Scenario B: Heavy-duty proprietary integration**

If the proprietary code is deeply integrated (different application behavior, licensing enforcement, white-labeling), you need a more structured sync between a public and a private repository.

A recommended pattern:

- Do all work in the **public repo** by default. Only proprietary-specific code lives in the private repo.
- The public repo's `main` branch is automatically synced to a `public` branch in the private repo (via a PAT stored as a GitHub secret and a push step in CI).
- When you want to test a public PR against the private integrations, push the PR branch to a `public/<branch-name>` branch in the private repo, trigger the private pipeline via `repository_dispatch` or a webhook, and report the result back on the public PR.
- [Copybara](https://github.com/google/copybara) is a Google tool designed for this — it transforms and moves code between repositories, handling include/exclude rules cleanly.

## Syncing Public and Private Repositories

```yaml
# In the public repo's workflow — push main to the private repo's public branch
- name: Sync to private repo
  run: |
    git remote add private https://x-access-token:${{ secrets.PRIVATE_REPO_PAT }}@github.com/your-org/private-repo.git
    git push private main:public --force
  env:
    PRIVATE_REPO_PAT: ${{ secrets.PRIVATE_REPO_PAT }}
```

**Before open-sourcing:** Audit the full git history for secrets, credentials, and internal hostnames. If any exist, rotate or expire them and scrub history before making the repository public. A leaked credential in git history is as dangerous as one in live code.

## Companies Using the Open-Core Model

| Company | Open-source core | Proprietary layer |
|---------|-----------------|-------------------|
| **GitLab** | GitLab Community Edition (CE) | Enterprise Edition (EE) |
| **HashiCorp** | Terraform, Vault, Consul | Enterprise editions |
| **Docker** | Docker Engine, Docker Compose | Docker Business/Enterprise |
| **Elastic** | Elasticsearch, Kibana | Elastic Cloud, proprietary features |
| **MongoDB** | MongoDB Community | Atlas managed service |
| **CockroachDB** | CockroachDB Core | CockroachDB Enterprise |
| **Grafana Labs** | Grafana OSS | Grafana Cloud, Enterprise features |
