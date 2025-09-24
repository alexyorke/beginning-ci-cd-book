### Reporting, code coverage, etc. {#reporting-code-coverage-etc .unnumbered}

- How do I process code coverage reports? Should I bother with them? How do I compile and aggregate test reports?
- Coverage is the measure of how much the code is covered by tests, usually unit tests. You have to make sure that you understand the limitations and benefits of coverage; otherwise, it stops being a useful metric. For more information, see the Test Coverage Paradox.

These are popular integrations based on actual workflow data (aggregated):

- https://docs.coveralls.io/api-introduction  
- https://docs.codeclimate.com/docs/finding-your-test-coverage-token  
- https://docs.sonarcloud.io/advanced-setup/ci-based-analysis/github-actions-for-sonarcloud/  
- https://docs.codecov.com/docs

So, you should consider how to integrate these tools into your pipeline—understanding what they do and how the results work, etc.

---

## **Setting up SonarCloud with GitHub Actions: A Step-by-Step Guide** {#setting-up-sonarcloud-with-github-actions-a-step-by-step-guide .unnumbered}

This guide walks you through integrating SonarCloud code analysis into your GitHub Actions workflow, enabling automated code quality checks with every push or pull request.

**Step 1: Generate a SonarCloud Token**

1. Log in to your SonarCloud account.
2. Navigate to “My Account” > “Security”.
3. Generate a new token.
4. Copy the token value; you’ll need it for the next step.

**Step 2: Store the Token as a GitHub Secret**

1. Go to your GitHub repository.
2. Click “Settings” > “Secrets” > “Actions”.
3. Click “New repository secret”.
4. Name the secret SONAR_TOKEN.
5. Paste the SonarCloud token you copied in Step 1 into the “Value” field.
6. Save the secret.

**Step 3: Define SonarCloud Properties (Project-Specific)**  
You’ll need to specify these properties for SonarCloud to identify your project. The location of these properties varies depending on your project type.

- **Java (Maven):** pom.xml
- **Java (Gradle):** build.gradle
- **.NET:** Within the SonarScanner command line arguments
- **Other:** Create a sonar-project.properties file in your repository’s root

Inside these files, set the following:

```
sonar.projectKey=your-project-key
sonar.organization=your-organization-key
sonar.host.url=https://sonarcloud.io
```

Replace `your-project-key` and `your-organization-key` with your actual values from SonarCloud.

**Step 4: Create the GitHub Actions Workflow File**

1. Create a file named `.github/workflows/build.yml` in your repository’s root.

Choose the Workflow Configuration based on your project type:

### a) Single Project Workflow

```yaml
name: SonarCloud Analysis

on:
  push:
    branches:
      - main
  pull_request:
    types: [opened, synchronize, reopened]

jobs:
  sonarcloud:
    name: SonarCloud Scan
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
        with:
          fetch-depth: 0

      - name: SonarCloud Scan
        uses: SonarSource/sonarcloud-github-action@master
        env:
          SONAR_TOKEN: ${{ secrets.SONAR_TOKEN }}
```

### b) Monorepo Workflow (Multiple Projects)

```yaml
name: SonarCloud Monorepo Analysis

on:
  push:
    branches:
      - main
  # Add path filters if needed (e.g., - 'project1/**')
  pull_request:
    types: [opened, synchronize, reopened]

jobs:
  sonarcloudScan1:
    name: Project 1 Scan
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
        with:
          fetch-depth: 0

      - name: SonarCloud Scan
        uses: SonarSource/sonarcloud-github-action@master
        env:
          SONAR_TOKEN: ${{ secrets.SONAR_TOKEN }}
        with:
          projectBaseDir: project1/ # Path to project 1

  sonarcloudScan2:
    name: Project 2 Scan
    runs-on: ubuntu-latest
    steps:
      # ... (Similar to sonarcloudScan1, but with projectBaseDir: project2/)
```

### c) C/C++ Project Workflow

This workflow simplifies the process by automatically installing necessary tools:

```yaml
name: SonarCloud C/C++ Analysis

on:
  # ... (Trigger events same as above)

jobs:
  sonarcloud:
    name: SonarCloud Scan
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
        with:
          fetch-depth: 0

      - name: SonarCloud Scan
        uses: SonarSource/sonarcloud-github-action@master
        env:
          SONAR_TOKEN: ${{ secrets.SONAR_TOKEN }}
```

**Step 5: Commit and Push Your Changes**  
Commit your updated project configuration files and the `.github/workflows/build.yml` file to your repository. This will trigger your first SonarCloud analysis.

**Step 6: View the Analysis Report**

1. Go to your SonarCloud project dashboard.
2. You’ll see the results of your code analysis, including code smells, bugs, security vulnerabilities, and code coverage.

**Important Notes**

- **Reusable Workflows**: For reusable workflows, use the `secret: inherit` feature to pass the SONAR_TOKEN securely.
- **Detailed Configuration**: For advanced configuration options, refer to the official SonarCloud documentation and the `sonar-project.properties` file.
- **Language-Specific Setup**: For languages not explicitly mentioned, check the SonarCloud documentation for specific setup instructions.

