### Secret management {#secret-management .unnumbered}

This guide provides strategies for storing, accessing, and managing secrets within your GitHub Actions workflows.

### **Storing Secrets in GitHub:** {#storing-secrets-in-github .unnumbered}

1.  **GitHub UI:**

    - Navigate to your repository's "Settings" -> "Secrets" -> "Actions".

    - Click "New repository secret".

    - Provide a name (using uppercase letters and underscores, e.g., DOCKER_USERNAME) and value for your secret.

    - Click "Add secret".

2.

3.  **Accessing Secrets in Workflows:**

    - Use the ${{ secrets.SECRET_NAME }} syntax within your workflow files.

4.

### **Challenges of GitHub-Stored Secrets:** {#challenges-of-github-stored-secrets .unnumbered}

- **Local Testing:** Using GitHub secrets directly in scripts hinders local testing because you can't easily swap out environment variables.

- **Key Rotation:** GitHub secrets don't have expiration dates, so you need to manually rotate keys like NPM tokens when they expire.

### **Strategies for Improved Secret Management:** {#strategies-for-improved-secret-management .unnumbered}

**1. Parameterization:**

- Pass secrets as command-line arguments or environment variables to your scripts. This allows flexibility for both CI and local execution.

**2. External Secret Management (e.g., Azure Key Vault):**

- Store secrets in a secure key vault service (like Azure Key Vault).

- Authenticate against the key vault within your workflow.

- Fetch secrets on demand using a service principal.

- **Advantages:**

  - No need for manual token rotation.

  - Short-lived access tokens enhance security.

  - Centralized auditing and management.

-

- **Consider:** Granular access control to prevent unnecessary exposure of secrets to all workflow steps.

**3. Service Principal Authentication:**

- Leverage service principals to authenticate directly to required services at the beginning of your script.

- Obtain short-lived access tokens for specific resources.

- **Advantages:**

  - Enhanced security through short-lived tokens.

  - Reduced management overhead.

  - Potential for using the GitHub repository's identity for increased security.

- **General Recommendations:**

- **Minimize Secret Scope:** Only expose secrets to the workflow steps that require them.

- **Principle of Least Privilege:** Grant minimal permissions to service principals.

- **Docker Registry Authentication:** Explore authenticating via environment variables or dedicated secrets for Docker registries instead of passing passwords via stdin.

- **Secret Rotation:** Establish a regular process for rotating secrets, whether managed in GitHub or an external vault.

By implementing these strategies, you can improve the security and manageability of secrets within your GitHub Actions workflows.

1. **Correct usage of secrets**:

Most workflows have been updated to correctly use GitHub Secrets, which are encrypted environment variables created in a repository's settings. The correct syntax is `${{ secrets.SECRET_NAME }}`. For example:

```yaml
- name: Deploy
  run: surge ./build myproject.surge.sh --token ${{ secrets.SURGE_TOKEN }}
```

In the above example, `SURGE_TOKEN` is a secret that's used to authenticate with the Surge.sh service for deploying applications.

2. **Properly passing credentials for publication**:

Credentials for package repositories and external services need to be handled securely. `TWINE_USERNAME` and `TWINE_PASSWORD` for Twine, used to upload packages to PyPI, or `NPM_TOKEN` for npm, are set in the workflow file:

```yaml
- name: Publish package
  run: twine upload dist/*
  env:
    TWINE_USERNAME: __token__
    TWINE_PASSWORD: ${{ secrets.PYPI_API_TOKEN }}
```

Here, the `PYPI_API_TOKEN` is used as a password to publish the package to PyPI securely.

3. **Updating reference to GitHub token**:

The GitHub token is used to authenticate various actions requiring GitHub API access, such as pushing changes or creating releases. The correct passing of this token is crucial:

```yaml
- name: Create GitHub release
  uses: actions/create-release@v1
  env:
    GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

4. **Correct reference to repository or branch names**:

Conditional steps based on the branch name or other git references are important to ensure that deployments and other actions only happen from the correct branches or tags.

```yaml
if: github.ref == 'refs/heads/master' || github.ref == 'refs/heads/staging'
```

In this case, the deployment step is set to run only when commits are made to the `master` or `staging` branches.

5. **Properly handling SSH and deploy keys**:

SSH keys are used to securely connect to remote servers and perform actions like deployments. Handling SSH keys correctly in workflows is crucial to security.

```yaml
- name: Deploy Project
  uses: easingthemes/ssh-deploy@v2.1.5
  env:
    SSH_PRIVATE_KEY: ${{ secrets.DEPLOY_KEY }}
```

6. **Fixing incorrect usage of `set-env`**:

With `set-env` being deprecated, the new format for setting environment variables is now `echo "name=value" >> $GITHUB_ENV`.

```yaml
- run: echo "AWS_BUCKET=mybucket" >> $GITHUB_ENV
```

7. **Securing Docker login**:

Securely logging into Docker registries is critical for pushing and pulling images.

```yaml
- name: Login to DockerHub
  run: echo ${{ secrets.DOCKER_PASSWORD }} | docker login -u ${{ secrets.DOCKER_USERNAME }} --password-stdin
```

9. **Correcting API tokens and keys**:

Maintaining the integrity of API tokens for external services is crucial. Tokens should be stored as secrets and referenced correctly in workflow files.

```yaml
- name: Upload coverage to Codecov
  uses: codecov/codecov-action@v1
  with:
    token: ${{ secrets.CODECOV_TOKEN }}
```

