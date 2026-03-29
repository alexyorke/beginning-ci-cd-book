Adding to the previous groupings, here’s how the additional file path globs can be categorized by theme:

Category | Additional File Path Globs
-------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
Documentation | `**.md`, `*.md`, `**/*.md`, `**.adoc`, `**/*.txt`, `*.txt`, `**.rst`, `**/*.rst`, `docs/**`, `doc/**`, `docs/`, `docs/*`, `Docs/*`, `documentation/**`, `README.md`, `README*`, `README.*`, `readme.md`, `CHANGELOG.md`, `changelog.txt`, `CONTRIBUTING.md`, `LICENSE.md`, `LEGAL`, `NOTICE`, `CODEOWNERS`, `Vision.md`, `ToUpgrade.md`, `ToTest.md`, `TestEnv.md`, `README.ko.md`, `HowToSetProject.md`, `HowToSetProject.ko.md`, `Example.md`, `CODE_OF_CONDUCT.md`, `**/*.markdown`, `*.rst`, `**/*.rst`
Project Configuration and Setup | `.gitignore`, `.gitattributes`, `.editorconfig`, `.travis.yml`, `.all-contributorsrc`, `.vscode/**`, `.github/**`, `.github/ISSUE_TEMPLATE/**`, `.github/workflows/**`, `.gitmodules`, `.gitlab-ci.yml`, `.dependabot/**`, `.cirrus.yml`, `.dockerignore`, `.circleci/**`, `.codecov.yml`, `.clang-format`, `.yamllint`, `.vscode`, `.spellcheck.dict.txt`, `.devcontainer`, `.ansible-lint`, `.prettierrc`, `.prettierignore`, `.lintstagedrc.js`, `config/**`, `package.json`, `appveyor.yml`, `Dockerfile`, `docker-compose.yml`, `docker/**`, `data/**`, `site/**`, `examples/**`, `build/**`, `snap/**`, `scripts/**`, `**/.gitignore`, `**/*.yml`, `*.yml`, `**.yml`, `*.sh`, `**/*.sh`, `**.nix`, `**.txt`, `**/*.txt`, `Makefile`, `**.png`, `**/*.png`, `*.png`, `*.html`, `*.bat`, `*.ini`, `**/*.org`, `**.org`, `lombok.config`, `requirements.txt`, `Brewfile`, `**/argoDeploy.json`, `**/*.rst`, `**.rst`
License and Legal | `LICENSE`, `LICENCE`, `LICENSE.txt`, `**/LICENSE`
Continuous Integration and Continuous Deployment (CI/CD) | `.github/workflows/macos.yml`, `.github/workflows/TagBot.yml`, `.github/workflows/pages.yml`, `.github/labels.yml`, `.github/workflows/test.yml`, `.github/workflows/windows.yml`, `.github/workflows/dockerhub-description.yml`, `.github/CONTRIBUTING.md`, `.github/dependabot.yml`, `.github/CODEOWNERS`, `.github/ISSUE_TEMPLATE/*`, `.github/ISSUE_TEMPLATE`, `.github/renovate.json`, `.github/*.yml`, `.github/*`, `.github/workflows/generate.yml`, `.github/workflows/verify-pages.yml`, `.github/workflows/no-response.yml`, `.github/workflows/labels.yml`, `.github/workflows/ubuntu.yml`, `.github/workflows/release.yml`, `.github/workflows/buildx-release.yml`, `.github/workflows/buildx-latest.yml`, `.github/release.yml`, `.github/FUNDING.yml`, `.github/workflows/mingw-w64.yml`, `.github/workflows/docker.yml`, `./github/**`, `!./github/workflow/test.yml`, `!**/*.yml`, `!**/*.sh`, `!**/*.png`, `!**/*.html`, `!**/*.bat`, `!**/*.ini`, `!**/*.org`, `!**/*.rst`, `ci/subst-release-info.py`, `ci/generate-docs.py`, `ci/build-docs.sh`

## Testing Branch Glob Patterns Locally

GitHub Actions uses the `minimatch` library under the hood to evaluate branch filters (the `branches:` key in your `on:` trigger). The official `@actions/glob` package works against the filesystem only, so you cannot use it directly to test branch name patterns. The following Node.js script replicates the exact options that the runner uses, giving you a fast local feedback loop before you push a workflow change.

```javascript
const { minimatch } = require('minimatch');

function testPatterns(items, pattern, options) {
  const matches = [];
  const nonMatches = [];
  items.forEach(item => {
    if (minimatch(item, pattern, options)) {
      matches.push(item);
    } else {
      nonMatches.push(item);
    }
  });
  return { matches, nonMatches };
}

const itemsToTest = [
  'RELEASE/a',
  'release/b',
  'hotfix/a',
  'feature/c'
];

const pattern = 'release/**';

// These options match what the GitHub Actions runner passes to minimatch
const minimatchOptions = {
  dot: false,
  nobrace: true,
  nocase: false,
  nocomment: true,
  noext: true
};

const result = testPatterns(itemsToTest, pattern, minimatchOptions);
console.log('Matching items:', result.matches);
console.log('Non-matching items:', result.nonMatches);
```

Run with `node test-globs.js` after `npm install minimatch`. Note that branch pattern matching is case-sensitive by default (`nocase: false`), so `RELEASE/a` will not match `release/**`.


