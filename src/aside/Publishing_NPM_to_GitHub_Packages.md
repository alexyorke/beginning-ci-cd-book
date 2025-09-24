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

```json

"publishConfig": {

"registry": "https://npm.pkg.github.com/@YOUR-USERNAME"

},

"name": "@YOUR-USERNAME/my-npm-package",

"version": "1.0.0"

```

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

```json

"version": "1.1.0"

```

Publish the updated version:

```bash

npm publish

```

2. **Version 1.1.1 (Patch Update):**

Make minor changes or fixes. Update the version:

```json

"version": "1.1.1"

```

Publish the patch:

```bash

npm publish

```

3. **Version 2.0.0 (Major Update):**

Make significant changes that might break backward compatibility. Update the version:

```json

"version": "2.0.0"

```

Publish the new major version:

```bash

npm publish

```

How do I consume this package on GitHub on my developer's machines? They would also need to create their .npmrc file (not committed to Git) with the aforementioned content. You may not want to give all developers package publish permissions.


