# CI/CD Security and Governance

## CI/CD Security Key Points

### Security


## **Key Points from Defending Continuous Integration/Continuous Delivery (CI/CD) Environments**

**Focus:** Recommendations and best practices for securing CI/CD pipelines within DevSecOps environments, regardless of the specific tools used.

**Context:** 
CI/CD pipelines are increasingly targeted by malicious actors due to their role in rapidly building and deploying software. Compromise can lead to:

- Injection of malicious code
- Intellectual property theft
- Denial of service attacks

---

### **Threat Landscape:**

- **Insecure Code:** Bugs in first or third-party code can create exploitable vulnerabilities.
- **Poisoned Pipeline Execution:** Injecting malicious code into the build process to compromise later stages.
- **Insufficient Access Control:** Unauthorized access enables code manipulation and other attacks.
- **Insecure Configuration:** Misconfigurations in infrastructure, network, or applications create vulnerabilities.
- **Insecure Third-Party Services:** Vulnerabilities in externally developed services can compromise the pipeline.
- **Exposed Secrets:** Compromise of keys, passwords, and other credentials grants access to sensitive resources.

---

### **Recommendations:**

- **Authentication and Access Control:**

 - Strong cryptography (CNSA Suite for NSS, NIST for others)
 - Minimize long-term credentials, utilize temporary and ephemeral credentials
 - Implement code signing and verification throughout the pipeline
 - Two-person rule for all code updates
 - Least privilege access control, separation of duties
 - Secure user accounts, regularly audit admin accounts

- **Secrets Management:**

 - Never expose secrets in plaintext
 - Utilize dedicated secrets management solutions within CI/CD tools

- **Network Security:**

 - Robust network segmentation and traffic filtering

- **Development Environment Hardening:**

 - Keep software and operating systems updated
 - Update CI/CD tools regularly
 - Remove unnecessary applications
 - Implement endpoint detection and response (EDR) tools

- **Development Process Security:**

 - Integrate security scanning early in the process (SAST, DAST, registry scanning)
 - Use only trusted libraries, tools, and artifacts
 - Analyze committed code for vulnerabilities
 - Remove temporary resources after use
 - Maintain detailed audit logs
 - Implement SBOM and SCA to track components and vulnerabilities

- **Resiliency:**
 - Design for high availability and disaster recovery
 - Ensure scalability for emergency patch updates

---

### **Overall Approach:**

- Zero trust approach, assuming no element is fully trusted.
- Leverage MITRE ATT&CK and D3FEND frameworks for threat modeling and mitigation strategies.

---

### **Outcomes:**

- Reduce attack surface and exploitation vectors.
- Create a challenging environment for malicious actors.
- Improve cybersecurity posture for a wide range of organizations.

---

### **Call to Action:**

Implement the recommended mitigations to secure CI/CD environments and strengthen overall software supply chain security.

[CSI_DEFENDING_CI_CD_ENVIRONMENTS.PDF (defense.gov)](https://media.defense.gov/2023/Jun/28/2003249466/-1/-1/0/CSI_DEFENDING_CI_CD_ENVIRONMENTS.PDF)


---

## Implementing Security Measures in GitHub Actions Enterprise (Cloud-hosted)


## **Implementing Security Measures in GitHub Actions Enterprise (Cloud-hosted) -- Practical Guide**

This guide provides detailed, practical steps for implementing the security recommendations using GitHub Actions Enterprise.

**Authentication and access control**

- **Strong cryptography**: GitHub Actions (and GitHub Enterprise Cloud) uses industry-standard cryptography for transport and storage. Your main job is to keep your org/repo/runners and dependencies up to date.

- **Minimize long-term credentials**:
  - Use GitHub’s secrets store for cases where you must use long-lived credentials.
  - Prefer short-lived credentials via OpenID Connect (OIDC) for cloud deployments.

**Store secrets in GitHub and use them in workflows**

Go to your repository **Settings → Secrets and variables → Actions**, then create a new secret (for example `DOCKER_HUB_TOKEN`).

```yaml
jobs:
  my_job:
    runs-on: ubuntu-latest
    steps:
      - name: Login to Docker Hub
        run: docker login -u ${{ secrets.DOCKER_HUB_TOKEN }}
```

**Use temporary OpenID Connect (OIDC) tokens**

Enable `id-token: write` permissions and use a cloud provider role trust.

```yaml
permissions:
  id-token: write
  contents: read
```

**AWS (example)**

- Create an IAM role trusted for GitHub OIDC.
- Grant only the permissions needed (least privilege).
- Configure credentials in your workflow using the role ARN:

```yaml
jobs:
  deploy:
    runs-on: ubuntu-latest
    environment: production
    steps:
      - uses: aws-actions/configure-aws-credentials@v1
        with:
          role-to-assume: arn:aws:iam::123456789012:role/GitHubActionsDeployRole
          role-session-name: GitHubActionsSession
      - name: Deploy to S3
        run: aws s3 cp my-app.zip s3://my-bucket/
```

**Code signing and verification**

If you sign build artifacts, verify signatures before deployment.

```yaml
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Build and sign the artifact
        run: |
          make build
          cosign sign my-app.zip
```

```yaml
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/download-artifact@v3
        with:
          name: my-app
      - name: Verify the signature
        run: cosign verify my-app.zip
      - name: Deploy the artifact
        run: |
          # Deploy your application...
```

**Two-person rule and branch protection**

In repository settings, add **branch protection** rules for your main/release branches:

- Require pull requests.
- Require 2 (or more) approving reviews.
- Consider dismissing stale approvals on new commits.
- Consider requiring linear history and preventing force pushes.

**Environment protection**

Use GitHub **Environments** (for example `staging`, `production`) with required reviewers and branch restrictions to gate deployments.

**Audit logging**

Use the organization audit log to monitor:

- Logins and token use
- Secret access changes
- Repository permission changes
- Workflow/run configuration changes


---

## Secret Management

### Secret management

This guide provides strategies for storing, accessing, and managing secrets within your GitHub Actions workflows.

### Storing secrets in GitHub

1. Navigate to your repository **Settings → Secrets and variables → Actions**.
2. Click **New repository secret**.
3. Provide a name and value for your secret (for example `DOCKER_USERNAME`).
4. Click **Add secret**.

### Accessing secrets in workflows

Use the `${{ secrets.SECRET_NAME }}` syntax in workflow files.

### Challenges of GitHub-stored secrets

- **Local testing**: relying directly on GitHub secrets can make local testing harder. Prefer parameterizing scripts so you can swap in local environment variables.
- **Key rotation**: GitHub secrets don’t have expiration dates; rotate tokens/keys intentionally.

### Strategies for improved secret management

- **Parameterization**: pass secrets via environment variables or arguments to scripts so the same scripts run locally and in CI.
- **External secrets managers (example: Azure Key Vault)**:
  - Fetch secrets on demand using workload identity / service principals.
  - Prefer short-lived tokens; centralize auditing.
- **Minimize secret scope**: expose secrets only to steps that need them.
- **Least privilege**: keep tokens scoped to the minimum permissions needed.

### Examples

```yaml
- name: Deploy
  run: surge ./build myproject.surge.sh --token ${{ secrets.SURGE_TOKEN }}
```

```yaml
- name: Publish package
  run: twine upload dist/*
  env:
    TWINE_USERNAME: __token__
    TWINE_PASSWORD: ${{ secrets.PYPI_API_TOKEN }}
```

```yaml
- name: Create GitHub release
  uses: actions/create-release@v1
  env:
    GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

```yaml
- run: echo "AWS_BUCKET=mybucket" >> $GITHUB_ENV
```

```yaml
- name: Login to DockerHub
  run: echo ${{ secrets.DOCKER_PASSWORD }} | docker login -u ${{ secrets.DOCKER_USERNAME }} --password-stdin
```

```yaml
- name: Upload coverage to Codecov
  uses: codecov/codecov-action@v1
  with:
    token: ${{ secrets.CODECOV_TOKEN }}
```

---

## Security and Docker Workflow Notes

### Security

Gradle Wrapper Validation, Docker workflow security scanning, multi-arch builds, Docker Hub interactions, tagging logic, and useful patterns that can be adapted to other workflows.

Gradle Wrapper Validation helps ensure the Gradle wrapper files (`gradlew`, `gradlew.bat`, `gradle-wrapper.jar`) haven’t been tampered with. It validates checksums/signatures early in CI so compromised wrapper code doesn’t run.

Example step:

```yaml
- name: Validate the Gradle wrapper
  uses: gradle/wrapper-validation-action@v1
```

Useful workflow patterns from complex Docker pipelines:

- **Path filtering**: run jobs only when relevant Dockerfiles change (useful for monorepos).
- **Multi-architecture builds**: Buildx + QEMU for `amd64`, `arm64`, etc.
- **Vulnerability scanning**: scan built images and upload results (SARIF) to code scanning.
- **Automated registry publishing**: authenticate with secrets/OIDC, push images, update descriptions.
- **Cleanup**: remove credentials after pushes.
- **Tagging logic**: consistent tags based on branches, tags, and commit SHAs for traceability.

---

## Security and Governance Tips

Don't use curl | bash; code owners and branch protection; artifact retention windows; diagnostic logging; 2FA; least privilege; links to analyzers and SSDF.

- Don’t use `curl | bash`. You’re executing remote code that can change, redirect, or be selectively served.

- Use CODEOWNERS and branch protection:
  - [About code owners (GitHub Docs)](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-code-owners#codeowners-and-branch-protection)

- Set artifact retention intentionally:
  - Release artifacts: ~30–90 days (or per compliance needs)
  - PR/dev artifacts: ~3–7 days

- Turn on diagnostic logging for key infrastructure (for example cloud storage accounts).

- Require 2FA for everything.

- Enforce least privilege:
  - [Azure RBAC best practices (Microsoft Learn)](https://learn.microsoft.com/en-us/azure/role-based-access-control/best-practices#only-grant-the-access-users-need)

- Reproducible builds:
  - [dotnet/reproducible-builds](https://github.com/dotnet/reproducible-builds)

- Anti-malware scanning for build artifacts:
  - [Windows Antivirus and antimalware software FAQ (Microsoft Support)](https://support.microsoft.com/en-us/windows/antivirus-and-antimalware-software-faq-31f2a46e-fad6-b713-45cf-b9db579973e6#disable_def)

- Useful analyzers / scanners:
  - [PyCQA/bandit](https://github.com/PyCQA/bandit)
  - [Microsoft/binskim](https://github.com/Microsoft/binskim)
  - [CodeQL scanning for compiled languages (GitHub Docs)](https://docs.github.com/en/code-security/code-scanning/creating-an-advanced-setup-for-code-scanning/codeql-code-scanning-for-compiled-languages)
  - [eslint/eslint](https://github.com/eslint/eslint)
  - [detekt/detekt](https://detekt.dev/)
  - [david-a-wheeler/flawfinder](https://github.com/david-a-wheeler/flawfinder)
  - [securego/gosec](https://github.com/securego/gosec)
  - [PowerShell/PSScriptAnalyzer](https://github.com/PowerShell/PSScriptAnalyzer)
  - [dotnet/roslyn-analyzers](https://github.com/dotnet/roslyn-analyzers)
  - [spotbugs/spotbugs](https://github.com/spotbugs/spotbugs)
  - [microsoft/ApplicationInspector](https://github.com/microsoft/ApplicationInspector)


