To create and publish a new NPM package to GitHub Artifacts (assuming you want to use GitHub Packages as your artifact repository), follow these detailed instructions. This guide will also show you how to create three versions of your package.

### Step 1: Set Up Your Project

1. **Create a New Directory for Your Project:**

```bash

mkdir my-npm-package

cd my-npm-package

```

2. **Initialize a New NPM Package:**

Initialize your project with `npm init`. This command will prompt you to enter several pieces of information (like the package name, version, description, etc.), or you can use `npm init -y` to accept default values.

```bash

npm init -y

```

3. **Create Your Package:**

Write the code for your package. Create a new file (e.g., `index.js`) and add your code logic:

```javascript
// Example function in index.js

function greet(name) {
  return `Hello, ${name}!`;
}

module.exports = greet;
```

### Step 2: Configure GitHub Packages

1. **Authenticate to GitHub Packages:**

You need to authenticate with GitHub Packages to publish your package. Create a `.npmrc` file in your project root:

```

//npm.pkg.github.com/_authToken=TOKEN

@YOUR-USERNAME:registry=https://npm.pkg.github.com

```

Replace `TOKEN` with your personal access token (PAT) from GitHub (make sure it has the appropriate scopes for package publication), and `YOUR-USERNAME` with your GitHub username.

2. **Update `package.json`:**

Add a `publishConfig` section to your `package.json` to specify the GitHub Packages registry:


"publishConfig": {

"registry": "https://npm.pkg.github.com/@YOUR-USERNAME"

},

"name": "@YOUR-USERNAME/my-npm-package",

"version": "1.0.0"


Replace `YOUR-USERNAME` with your GitHub username.

### Step 3: Publish Your Package

1. **Publish the Package:**

Ensure you are logged into NPM configured to use your GitHub token, then publish your package:

```bash

npm publish

```

2. **Verify Publication:**

Check your GitHub repository under the 'Packages' section to see your newly published npm package.

### Step 4: Update and Publish New Versions

To publish new versions of your package, you will make changes, update the version in your `package.json`, and then run `npm publish` again. Here's how to create three versions:

1. **Version 1.1.0 (Minor Update):**

Make some changes to your code. Then update the version in `package.json`:


"version": "1.1.0"


Publish the updated version:

```bash

npm publish

```

2. **Version 1.1.1 (Patch Update):**

Make minor changes or fixes. Update the version:


"version": "1.1.1"


Publish the patch:

```bash

npm publish

```

3. **Version 2.0.0 (Major Update):**

Make significant changes that might break backward compatibility. Update the version:


"version": "2.0.0"


Publish the new major version:

```bash

npm publish

```

How do I consume this package on GitHub on my developer's machines? They would also need to create their .npmrc file (not committed to Git) with the aforementioned content. You may not want to give all developers package publish permissions.

## Artifacts vs. Packages: Choosing the Right Registry

When deciding where to host build output, distinguish between two scenarios:

- **Short-lived build artifacts** (e.g., compiled binaries from a PR): Use `actions/upload-artifact` / `actions/download-artifact` to pass them between jobs within a single workflow run. These are ephemeral and tied to the workflow run.

- **Versioned, shareable packages** (e.g., an npm library, a Docker image, a .NET NuGet package): Use **GitHub Packages** (`npm.pkg.github.com`, `ghcr.io`, etc.) for easier access, streamlined authentication via `GITHUB_TOKEN`, and visibility alongside your repository.

### On-premises resources and self-hosted runners

For resources that cannot move to the cloud (special servers, shared file drives, internal artifact repositories), deploy a **self-hosted GitHub Actions runner** inside your network. The runner connects outbound to GitHub and executes jobs with access to internal resources — no inbound firewall rules are required.

### Proxying public registries

Rather than pulling packages directly from public registries (npmjs.org, Docker Hub, PyPI), consider routing through a **private registry proxy** (e.g., Nexus, Artifactory, or GitHub Packages with upstreaming). Benefits include:

- Control over which package versions are allowed in your organization.
- Ability to detect and block potentially malicious downloads.
- A cached copy that keeps builds working even if the upstream registry has an outage.
- An audit trail of what packages were pulled and when.


