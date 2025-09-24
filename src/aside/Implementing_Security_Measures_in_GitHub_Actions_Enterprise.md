// Start of Selection
## **Implementing Security Measures in GitHub Actions Enterprise (Cloud-hosted) -- Practical Guide** {#implementing-security-measures-in-github-actions-enterprise-cloud-hosted-practical-guide .unnumbered}

This guide provides detailed, practical steps for implementing the security recommendations using GitHub Actions Enterprise.

**Authentication and Access Control:**

1. **Strong cryptography:**

   - No action required. GitHub Actions Enterprise automatically utilizes industry-standard cryptography for data transmission and storage.

2.

3. **Minimize long-term credentials:**

   - **Utilize GitHub's built-in secret management:**

     - Go to your repository’s “Settings” → “Secrets” → “Actions”.
     - Click “New repository secret”.
     - Name your secret meaningfully (e.g., DOCKER_HUB_TOKEN).
     - Paste the secret value (e.g., your Docker Hub personal access token) and click “Add secret”.

   **Access your secret securely within a workflow file:**

   ```yaml
   jobs:
     my_job:
       runs-on: ubuntu-latest
       steps:
         - name: Login to Docker Hub
           run: docker login -u ${{ secrets.DOCKER_HUB_TOKEN }}
```

- **Use temporary OpenID Connect (OIDC) tokens:**

  **Enable OIDC in your workflow file:**

  ```yaml
  permissions:
    id-token: write
    contents: read

  jobs:
    deploy:
      runs-on: ubuntu-latest
      permissions:
        aws: sts:AssumeRole
  ```

  - **Create a dedicated IAM role in your cloud provider:**

    - **AWS Example:**
      - Open the IAM console in your AWS account.
      - Create a new role with “Web Identity” as the trusted entity.
      - For “Web Identity provider”, select “GitHub Actions” and input your organization and repository URLs.
      - Configure permissions for this role (e.g., allow access to specific S3 buckets).
      - Note the generated role ARN (Amazon Resource Name).

  **Reference the IAM role ARN in your workflow:**

  ```yaml
  jobs:
    deploy:
      runs-on: ubuntu-latest
      environment: production
      permissions:
        aws: sts:AssumeRole
      steps:
        - uses: aws-actions/configure-aws-credentials@v1
          with:
            role-to-assume: arn:aws:iam::123456789012:role/GitHubActionsDeployRole
            role-session-name: GitHubActionsSession

        - name: Deploy to S3
          run: aws s3 cp my-app.zip s3://my-bucket/
  ```

4.

5. **Implement code signing and verification:**

   - **Use GitHub’s code signing feature (available with GitHub Advanced Security):**

     - Navigate to your repository’s “Settings” → “Code security and analysis”.
     - Enable “Code signing” and choose your preferred key management method.

   **Configure your workflow to sign artifacts:**

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

   **Verify signatures before deployment:**

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

6.

7. **Two-person rule for all code updates:**

   - **Enable branch protection rules:**

     - Navigate to your repository’s “Settings” → “Branches”.
     - Click “Add rule” and select your protected branch (e.g., main or release).
     - **Require pull request reviews before merging:**
       - Check “Require pull request reviews before merging”.
       - Set “Required approving reviews” to 2 or more.
       - Optionally, select “Dismiss stale pull request approvals when new commits are pushed”.

   - **Enable “Require linear history” to prevent force pushes:**
     - This ensures a clean and auditable commit history.

8.

9. **Least privilege access control, separation of duties:**

   - **Utilize GitHub’s granular permission system:**

     - Go to your organization’s “Settings” → “Teams”.
     - Create teams based on roles (e.g., “Developers”, “Operations”).
     - Add users to corresponding teams.
     - **Assign repository permissions for each team:**
       - In your repository settings, under “Collaborators & teams”, grant appropriate permissions (read, write, maintain) to each team.

   - **Define environment protection rules:**
     - Navigate to your repository’s “Settings” → “Environments”.
     - Click “New environment” and give it a meaningful name (e.g., staging, production).
     - **Configure protection rules:**
       - Under “Required reviewers”, add required reviewers for deployments to this environment.
       - Define branch protection rules similar to the “Two-person rule” above for deployments.
     - **Require approvals before deployment:**
       - Check “Required reviewers” and specify the required number of reviewers for deployments.

10.

11. **Secure user accounts, regularly audit admin accounts:**

- **Enforce two-factor authentication (2FA) for all users:**

  - In your organization’s “Settings” → “Security”, enable “Require two-factor authentication for all users”.

- **Regularly review and revoke access for inactive users and external collaborators:**

  - Periodically review the “People” tab in your organization settings and remove users who no longer require access.

- **Implement audit logging:**
  - Navigate to your organization’s “Settings” → “Audit log”.
  - Analyze logs for suspicious activity, including login attempts, repository modifications, and access changes.
  - Integrate audit log data with your SIEM or log management system for centralized monitoring and analysis.

12.

**Secrets Management:**

1. **Never expose secrets in plaintext:**

   - **Always utilize GitHub’s built-in secrets management as described in section 2 above.**
   - **Never hardcode secrets directly in workflow files or source code.**

2.

3. **Utilize dedicated secrets management solutions within CI/CD tools:**

   - **Integrate with a dedicated secrets management tool like HashiCorp Vault:**

     **Install the Vault CLI on your runners:**

     ```yaml
     jobs:
       my_job:
         runs-on: ubuntu-latest
         steps:
           - name: Install Vault CLI
             run: |
               apt-get update
               apt-get install -y vault
     ```

     - **Authenticate with Vault within your workflow:**
       - Use a method like AppRole authentication to obtain a Vault token.
       - Configure your Vault server to allow access from GitHub Actions based on OIDC or other authentication mechanisms.

     **Fetch secrets from Vault during runtime:**

     ```yaml
     jobs:
       deploy:
         runs-on: ubuntu-latest
         steps:
           - name: Authenticate with Vault
             run: vault login token=$VAULT_TOKEN

           - name: Read secret from Vault
             run: |
               export MY_SECRET=$(vault read -field=password secret/data/my-app/credentials)
               # Use $MY_SECRET in your deployment commands...
     ```

     - Store the Vault token securely as a GitHub secret or through environment variables.

**Network Security:**

1. **Robust network segmentation and traffic filtering:**

   - **Utilize GitHub’s self-hosted runners for granular control:**

     - Follow GitHub’s documentation to set up self-hosted runners within your private network.
     - **Implement network segmentation:**
       - Use VLANs, subnets, or firewalls to isolate your runners from other parts of your network.
     - **Define strict firewall rules:**
       - Only allow necessary traffic between runners and other resources (e.g., source code repositories, artifact registries, deployment targets).

   - **Leverage your cloud provider’s network security features for cloud-hosted runners:**
     - **Utilize Virtual Private Clouds (VPCs):**
       - Define dedicated VPCs for your GitHub Actions workloads.
       - Use Network Access Control Lists (NACLs) to restrict inbound and outbound traffic to the VPC.
     - **Configure security groups:**
       - Limit access to your runners based on IP addresses, ports, and protocols.
       - Use security groups to enforce least privilege access to other cloud resources used by your workflows.

2.

**Development Environment Hardening:**

1. **Keep software and operating systems updated:**

   - **Utilize actions to ensure updates are applied:**

     **Update the codebase:**

     ```yaml
     jobs:
       build:
         runs-on: ubuntu-latest
         steps:
           - uses: actions/checkout@v3
     ```

     **Update dependencies and system packages:**

     ```yaml
     jobs:
       build:
         runs-on: ubuntu-latest
         steps:
           - name: Update system packages
             run: apt-get update && apt-get upgrade -y

           - name: Update dependencies
             run: npm install
     ```

2.

3. **Update CI/CD tools regularly:**

   - **Subscribe to GitHub’s update notifications and security advisories.**
   - **Schedule regular maintenance windows for applying updates to GitHub Actions and related tools.**

4.

5. **Remove unnecessary applications:**

   - **Utilize minimal base images for your runners:**
     - Use Docker images designed for CI/CD environments, such as ubuntu:latest or alpine:latest.
     - Avoid images with unnecessary software pre-installed.
   - **Avoid installing unnecessary software on runners:**
     - Install only the essential tools required for your workflows.

6.

7. **Implement endpoint detection and response (EDR) tools:**

   - **Install EDR agents on self-hosted runners:**
     - Follow your chosen EDR vendor’s instructions to install and configure agents on your runner machines.
   - **Integrate EDR solutions with your cloud provider’s security monitoring tools:**
     - Use your EDR’s API or integrations to forward security events and alerts to your cloud provider’s security information and event management (SIEM) system.

8.

**Development Process Security:**

1. **Integrate security scanning early in the process:**

   - **Utilize actions for SAST, DAST, and registry scanning:**

     **SAST (Static Application Security Testing):**

     ```yaml
     jobs:
       build:
         runs-on: ubuntu-latest
         steps:
           - uses: actions/checkout@v3
           - name: Run SAST with CodeQL
             uses: github/codeql-action/analyze@v2
     ```

     **DAST (Dynamic Application Security Testing):**

     ```yaml
     jobs:
       test:
         runs-on: ubuntu-latest
         steps:
           - uses: actions/checkout@v3
           - name: Run DAST with OWASP ZAP
             uses: zaproxy/action-baseline@v0.4.0
             with:
               target: https://my-application.com
     ```

     **Container Registry Scanning:**

     ```yaml
     jobs:
       scan:
         runs-on: ubuntu-latest
         steps:
           - name: Scan container image
             uses: anchore/scan-action@v2
             with:
               image: my-registry/my-image:latest
     ```

2.

3. **Use only trusted libraries, tools, and artifacts:**

   - **Define clear policies for approving third-party dependencies:**
     - Establish criteria for evaluating open source libraries and tools, considering factors like popularity, maintenance, security track record, and license compatibility.
   - **Utilize dependency scanning tools to identify vulnerabilities in libraries:**
     - Integrate tools like Snyk or Dependabot into your workflows to continuously monitor dependencies for known vulnerabilities.

4.

5. **Analyze committed code for vulnerabilities:**

   - **Integrate SAST solutions into the development workflow:**
     - Run SAST tools as part of your CI/CD pipeline to identify vulnerabilities early in the development cycle.
   - **Perform manual code reviews with a focus on security:**
     - Train developers to recognize common security vulnerabilities and best practices during code reviews.

6.

7. **Remove temporary resources after use:**

   - **Utilize workflow cleanup scripts to delete temporary files and resources:**
     - Use the run step to execute cleanup commands at the end of your workflow jobs, only if your workflow is not stateless.
     - For example, delete temporary files, remove cloud resources provisioned during testing, or **revoke temporary credentials.**

8.

9. **Maintain detailed audit logs:**

   - **Analyze GitHub Actions audit logs for suspicious activity:**
     - Regularly review audit logs, paying attention to events like user logins, permission changes, and secret access.
   - **Integrate logging with your SIEM or log management system:**
     - Configure GitHub Actions to forward audit logs to your centralized logging system for enhanced analysis and monitoring.

10.

11. **Implement SBOM and SCA to track components and vulnerabilities:**

- **Use actions to generate and manage SBOMs (Software Bill of Materials):**
  - Integrate tools like Syft or CycloneDX into your workflows to generate SBOMs for your software artifacts.
  - Store SBOMs in a secure location for future reference and auditing.
- **Integrate with SCA tools for continuous vulnerability monitoring:**
  - Use tools like Snyk, Dependency-Track, or OWASP Dependency-Check to analyze SBOMs and identify potential vulnerabilities.

12.

**Resiliency:**

1. **Design for high availability and disaster recovery:**

   - **Utilize multiple self-hosted runners in different geographic locations:**
     - Distribute your self-hosted runners across multiple availability zones or regions to ensure redundancy and resilience against regional outages.
   - **Implement failover mechanisms for runners:**
     - Configure your workflow to automatically failover to available runners in case of individual runner failures.

2.

This comprehensive guide provides practical steps for implementing security measures in GitHub Actions Enterprise (Cloud-hosted), enhancing the security and reliability of your CI/CD pipeline.


