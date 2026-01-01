**Chapter 3: Designing and Building CI/CD Workflows with GitHub Actions**

**3.1 Introduction to GitHub Actions**

GitHub Actions is a CI/CD platform that automates software development tasks within GitHub repositories. It uses "workflow files," which are YAML-based instructions that define the steps of a CI/CD pipeline, similar to a project manager for your build scripts.

These workflows are triggered by specific events in your repository, like pushing code or creating a pull request. When triggered, they run on virtual build servers (runners) provided by GitHub, executing tasks such as building, testing, and deploying your application. These servers are ephemeral -- they're created for each workflow run and deleted afterward, ensuring a clean and consistent environment.

Workflows are organized into "jobs," each containing multiple "steps." Each step represents a discrete action, like running a script or using a pre-built action from the GitHub Marketplace.

**Benefits of this structured approach:**

- **Clarity:** Named steps improve readability and make it easier to track progress, debug issues, and set up notifications.
- **Security:** Steps run in isolated environments, protecting sensitive information like secrets and environment variables. _(Note: While steps run in separate processes, they share the same runner filesystem within a job, which has security implications discussed later)._ 
- **Efficiency:** GitHub Actions provides features for parallelization, triggering, resource management, and secret management, simplifying complex tasks.
- **Standardization:** The workflow syntax promotes consistency across projects and teams, facilitating collaboration and knowledge sharing.

**3.2 Getting Started with Your First Workflow**

**3.2.1 Prerequisites**

1.  **Version Control:** Ensure your codebase is under version control (like Git). This is crucial for tracking changes and enabling collaboration.
2.  **Command-Line Builds:** Make sure you can build your project from the command line without manual IDE interaction. This forms the basis for automated builds.

**3.2.2 Basic Build Pipeline Setup**

Start by setting up a simple pipeline that:

1.  Builds your project for all targets and release types (debug, release, etc.).
2.  Sends email notifications if a build fails.

```yaml
name: Basic Build Pipeline

on:
  push:
    branches: [main] # Trigger on push to main branch
  pull_request:
    branches: [main] # Trigger on pull requests targeting main

jobs:
  build:
    runs-on: ubuntu-latest # Use a GitHub-hosted runner

    steps:
      - name: Checkout code
        uses: actions/checkout@v4 # Use a pre-built action to get the code

      # Add steps specific to your project's build process
      # Example for Node.js:
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: "20" # Specify Node.js version

      - name: Install Dependencies
        run: npm ci # Use 'ci' for reproducible dependency installation

      - name: Build Project
        run: npm run build # Replace with your actual build command

      # Example Notification (Simplified - Real notification might need more setup)
      - name: Notify on failure
        if: failure()
        run: echo "Build failed! Check logs." # Replace with actual notification logic (e.g., email action)
```

**3.2.3 Cultivating Discipline**

Cultivate a culture of addressing build failures immediately. A broken pipeline loses its value if ignored. It's important that the build server is able to run the build script without errors. If there are errors, then it means that there is something wrong with the inputs (i.e., the code that was committed), and therefore confidence can no longer be instilled in the build artifacts, and work is not integrated.

**3.3 Understanding Workflow Components**

**3.3.1 Triggers (`on:`)**

In CI/CD, a trigger is an event that initiates the execution of a workflow or pipeline. Common triggers include code commits, pull requests, scheduled times, or manual intervention.

- The `on` trigger is sort of like a big funnel, then you can filter it down with more refined statements using path filters, branch filters, etc.
- When you set up a workflow to be triggered by something, sometimes it is not possible to precisely specify exactly how the trigger should be specified in the `on` clause.
- Recall that the github actions pipelines are merely computers, and can run scripts. Therefore, what we can do is to add a trigger that is narrow enough to trigger when the pipeline may need to be triggered, but it might trigger when it doesn't need to be triggered. Then, in our script, we can use an "if" block to make sure that we don't continue with the pipeline if it actually shouldn't have been triggered, by performing more checks. For example, say that you only want to run the pipeline on the last day of the month. This isn't possible by just using the crontab syntax, you have to specify which day(s) you want to run. Therefore, you can specify that you want to run every 30th and 31st, and then in your script, verify that that day is, indeed, the last day of the month.

**Common Triggers:**

- `push`: When code is pushed to specific branches or tags.
- `pull_request`: When a pull request is opened, synchronized, or closed.
- `schedule`: Runs the workflow at specified times using cron syntax.
- `workflow_dispatch`: Allows manual triggering from the GitHub UI.
- `workflow_run`: Triggered by the completion of another workflow.
- `repository_dispatch`: Triggered by an external event via webhook.

**3.3.2 Runners (`runs-on:`)**

In software development, an environment refers to a setup where software runs. This can include factors like the operating system, available software and tools, system variables, and network access.

- **GitHub-Hosted Runners:** Provided by GitHub with various OS options (Ubuntu, Windows, macOS) and pre-installed software. Convenient but offer less control.
- **Self-Hosted Runners:** Machines you manage (on-prem or cloud) where you install the GitHub Actions runner agent. Offer more control over hardware, software, and network access but require maintenance.

**3.3.3 Jobs (`jobs:`)**

Workflows are organized into "jobs." Each job runs on a fresh runner instance (by default) and contains multiple "steps." Jobs can run in parallel or sequentially depending on dependencies defined using the `needs` keyword.

**3.3.4 Steps (`steps:`)**

A build step is a single task or command within a job. It's a specific action to be executed, such as compiling code, running tests, or deploying software.

- I've mentioned a few times that steps are self-contained and they run in their own environment. What exactly is "their own environment?" Each step runs in its own process, and all steps within a job share the same filesystem. For example, say I'm running npm install in one step, and then the next step is "npm test". The command "npm install" would modify the filesystem, do useful work, and then quit. Then, the npm test command, in another step, would run and see that the node_modules are installed and continue. It's sort of like when you're running the commands locally: you open up a new terminal window for each command instead of running everything inside of the same terminal window. What this means, is for example, say you were to "cd" into a directory, then if you were to open up a new terminal window, it doesn't have that context, so therefore it is reset. It also doesn't have any environment variables shared (by default) between steps.
- If I do something else, such as set a variable, then this won't be available to the next step (by default.) Think of steps like little functions with locals as variables: if I define function "A", and put some variables in it, then I have to return them to make them available outside of the function. If I change some items on my filesystem, then they will be available to the other functions because it is a stateful procedure. The reason why the steps are isolated like this is because they run in processes. Very important to know that filesystem changes between steps are retained. Each step gets access to the global github context, which may contain your secrets and other variables, as well as variables set as outputs from the previous step.

**Common Steps/Actions:**

- `actions/checkout@vX`: Checks out your repository code.
- `actions/setup-<tool>@vX`: Sets up specific tools like Node.js, Python, Java, Go, .NET.
- `actions/cache@vX`: Caches dependencies or build outputs to speed up workflows.
- `actions/upload-artifact@vX`: Uploads files generated during the workflow.
- `actions/download-artifact@vX`: Downloads files uploaded in previous jobs.

**3.3.5 Using Actions vs. Custom Scripts (`uses:` vs. `run:`)**

Steps can either `run` shell commands directly or `use` pre-built actions.

**Pros of using an "action":**

- The "actions" by GitHub are a bit nicer if you need to do matrix builds on multiple OSes, as the syntax is identical.
- The syntax for the actions are a lot nicer, so, for example, you can just pass in some data in the "with" clause and then it'll pass it to the action.
- Actions are cross OS, so useful if you want to share it with others and you don't want them to use a specific runner.
- GitHub actions has a marketplace, and therefore you can host it on there.
- GitHub actions makes it easier to release workflows/actions because it provides a nice marketplace, you can see how many people are using the action, and you can re-tag your commit and then have it update for everyone else very quickly.
- Encapsulation of complex logic.

**Cons of using an "action":**

- If you do a matrix build by installing .NET manually, for example, then it is more difficult because you can't easily reuse the job for different variables.
- The other thing with actions is that they can be updated, the scripts in your step might not be able to be updated easily which may or may not be a good thing. _(Pinning action versions using commit SHAs or tags is recommended for stability)._ 
- It's difficult to actually know what the action is doing, though, so that's a bit more risky and they are proprietary to GitHub.
- If it uses a lot of state from the runner, and the data is just going back to GitHub, then it might be better to use an action.
- It wouldn't really make sense to test the publish artifacts thing locally, the action is so simple that it's hard to deconstruct it from GitHub.
- The CI pipelines should avoid vendor lock-in as those are likely to be run locally, so try to avoid GitHub-specific actions as those are difficult to run locally. If there are vendor-specific steps that you'll have to change anyway, for example, using GitHub's artifacts, then therefore you might have to leave those as-is, they are difficult to change.

**Rule of Thumb:** The rule of thumb is to wait for three different occurrences of (something) before you refactor it out into its own action or workflow. Try to use these sparingly as they are difficult to reproduce locally.

**3.4 Managing Environments and Secrets**

**3.4.1 Environment Variables (`env:`)**

- Environment variables are key-value pairs that can be accessed from system processes and are especially useful in CI/CD workflows.
  - They allow developers to configure and customize pipelines without altering the code or primary configuration files.
  - They play a pivotal role in maintaining security by offering a way to store sensitive information, such as API keys or database credentials, outside the codebase.
  - Environment variables help prevent hardcoding values, making pipelines more flexible and adaptable to different environments or conditions.
- The word "environment" is a heavily overloaded term. They can refer to GitHub's "environments" feature, environment variables, or just the environment (e.g., OS) that the script runs. This section will help disambiguate the terms.

**Why Use Environment Variables?**

- **Flexibility:** Customize the pipeline without modifying configuration files, allowing adaptation to the runner's environment.
- **Consistency:** Use variables to ensure paths or settings are consistent between local development and CI.
- **Conditional Logic:** Execute different code based on environment variable values (e.g., detect if running in CI).
- **Security:** Store secrets securely, injected at runtime and redacted from logs.

**Common Use Cases:**

- Matrix builds (changing dependency versions).
- Customizing output paths or tooling based on the environment.
- Accessing CI/CD provider-specific information (e.g., PR numbers, commit SHAs).
- Managing resource allocation based on runner capabilities (use with caution due to parity risks).
- Adjusting logging behavior for CI (e.g., removing color codes).
- Storing credentials for external services (databases, registries, deployment targets).

**Scope and Precedence:**

GitHub Actions provides different ways to define variables, each with its own scope and precedence:

1.  **Workflow `env:`:** Variables defined at the top level of the workflow file. Available to all jobs and steps.
2.  **Job `env:`:** Variables defined within a specific job. Available to all steps within that job. Overrides workflow-level variables.
3.  **Step `env:`:** Variables defined within a specific step. Available only to that step's `run` command. Overrides job and workflow-level variables.
4.  **Script Variables:** Variables set directly within a `run` script (e.g., `export VAR=value` or `echo "VAR=value" >> $GITHUB_ENV`). Their scope depends on how they are set.
5.  **GitHub Contexts:** Read-only variables provided by GitHub (e.g., `${{ github.repository }}`, `${{ secrets.MY_SECRET }}`, `${{ vars.MY_VAR }}`). Available broadly depending on the context.
6.  **GitHub Environments:** A feature for defining deployment targets with specific protection rules and secrets/variables. Variables set here are available when a job targets that environment.

| How Variable is Set                                 | Scope                                                  | Behavior                                                                   | Use Case                                        |
| :-------------------------------------------------- | :----------------------------------------------------- | :------------------------------------------------------------------------- | :---------------------------------------------- |
| `env:` at Workflow level                            | Entire Workflow                                        | Available to all jobs/steps                                                | Global settings (e.g., `NODE_ENV=production`)   |
| `env:` at Job level                                 | Specific Job                                           | Available to all steps in the job; overrides workflow `env`                | Job-specific config (e.g., build flags)         |
| `env:` at Step level                                | Specific Step's `run` command                          | Available only to the command; overrides job/workflow `env`                | Providing input specifically to one command     |
| `export VAR=...` in `run`                           | Current and subsequent commands _within the same step_ | Standard shell variable                                                    | Temporary script variables                      |
| `echo "VAR=..." >> $GITHUB_ENV` in `run`            | Subsequent steps _within the same job_                 | Persists across steps in the job; appended to step start                   | Passing script-generated values between steps   |
| `${{ secrets.NAME }}`                               | Depends on where secret is defined (repo, org, env)    | Injected securely; redacted from logs; **cannot** be used in `if` directly | API keys, passwords, tokens                     |
| `${{ vars.NAME }}`                                  | Depends on where var is defined (repo, org, env)       | Injected as plain text; visible in logs                                    | Non-sensitive configuration (e.g., URLs, flags) |
| `${{ github.* }}`, `${{ job.* }}`, `${{ steps.* }}` | Varies (e.g., `github` is global)                      | Read-only context information provided by GitHub                           | Accessing workflow metadata (commit SHA, actor) |

**3.4.2 Secrets (`secrets:`)**

Secrets are encrypted environment variables intended for sensitive information.

- Create secrets in your repository, organization, or environment settings under "Settings" -> "Secrets and variables" -> "Actions".
- Reference them using the `${{ secrets.SECRET_NAME }}` syntax.
- GitHub automatically redacts secret values from logs.
- **Important:** Secrets cannot be directly used in `if:` conditions due to security reasons. To use a secret in a condition, pass it to an intermediate step's `env` and then check the environment variable in the subsequent step's `if:`.

```yaml
jobs:
  conditional_job:
    runs-on: ubuntu-latest
    steps:
      - name: Check Secret Step 1
        id: check_secret
        env:
          MY_SECRET_VALUE: ${{ secrets.MY_SECRET }}
        run: echo "Checking secret..." # This step gets the secret into an env var

      - name: Conditional Step 2
        # Now check the env var from the previous step
        if: steps.check_secret.outputs.MY_SECRET_VALUE == 'expected_value'
        run: echo "Secret matches!"
        # Note: Directly comparing env var in 'if' might not work as expected.
        # Better approach: Use GITHUB_OUTPUT in Step 1
        # Step 1 revised:
        # run: echo "secret_match=true" >> $GITHUB_OUTPUT # if logic matches
        # Step 2 revised:
        # if: steps.check_secret.outputs.secret_match == 'true'
```

_(Self-correction: Directly checking `env` in `if` is less reliable/clear than using outputs. Updated example using `GITHUB_OUTPUT`).

**3.4.3 GitHub Variables (`vars:`)**

Variables (`vars`) are used for non-sensitive configuration data.

- Create them alongside secrets in settings.
- Reference using `${{ vars.VARIABLE_NAME }}`.
- Values are stored as plain text and _will_ appear in logs. Use them for configuration flags, URLs, etc., but never for sensitive data.

**3.4.4 GitHub Environments**

Environments in GitHub Actions are used to configure deployment targets (e.g., `production`, `staging`).

- Go to repository "Settings" -> "Environments".
- Create environments and configure protection rules (e.g., required reviewers, wait timers).
- Store environment-specific secrets and variables within each environment.
- Reference an environment in your job: `environment: production`. The job will then have access to that environment's secrets/variables and must adhere to its protection rules.

**3.5 Sharing Data Between Steps and Jobs**

Sharing information between steps and jobs in a CI/CD pipeline is crucial for maintaining continuity and consistency across the workflow.

**3.5.1 Information Sharing Between Steps (within the same job)**

1.  **Filesystem:** Since all steps in a job share the same runner filesystem, one step can create/modify a file, and subsequent steps can read/use it.
2.  **Environment Variables (`GITHUB_ENV`):** A step can write key-value pairs to the file located at `$GITHUB_ENV`. These variables are then available to all subsequent steps in the same job.

```yaml
steps:
  - name: Set variable
    id: set_var
    run: echo "MY_DATA=some_value" >> $GITHUB_ENV

  - name: Use variable
    run: echo "The data is ${{ env.MY_DATA }}" # Access via env context
```

3.  **Step Outputs (`GITHUB_OUTPUT`):** A step can write output parameters to the file located at `$GITHUB_OUTPUT`. These outputs can be referenced by subsequent steps using the `${{ steps.<step_id>.outputs.<output_name> }}` syntax. This is generally preferred over `GITHUB_ENV` for passing discrete values as it makes the data flow explicit.

```yaml
steps:
  - name: Generate data
    id: step1
    run: echo "RESULT=hello" >> "$GITHUB_OUTPUT"

  - name: Use data
    id: step2
    env:
      STEP1_RESULT: ${{ steps.step1.outputs.RESULT }}
    run: echo "Step 1 result was $STEP1_RESULT"
```

- You only need `id`s for steps if you want to share data between different steps using outputs. Adding `id`s doesn't hurt anything if you add them and you don't use them, however.
- **Note!** If you try to access an output that does not exist from a step, you'll get back an empty string and no error. To prevent this, use `actionlint` which is a third-party tool that lints your workflow files. It will catch this error.
- You can also specify outputs via the "output" mapping on an action (`uses:` step). This is especially useful if you want to share information specific to GitHub actions as those do not have a run block where you can export information via GITHUB_OUTPUT.
- **Common Uses for Outputs:**
  - [[actions/create-release: An Action to create releases via the GitHub Release API]](https://github.com/actions/create-release#outputs) where the output is the `release_url` and then it is used in the `upload-release-asset` task as an input to add things to the release, potentially use output release URL in other integrations such as posting the release URL to teams.
  - Tags are grabbed in one step and then re-used in many others, tagging docker images with the version.
  - If you're using timestamps, then you have to have it as a variable because otherwise if you re-evaluate it then it will change.
  - Version numbers and references have to be stamped everywhere (tags, docker images, source code, etc.) so these are commonly re-used as outputs. They are also difficult to compute sometimes, so therefore it makes sense to have them in their own step.
  - Output from tests (success/failure/count). This might be because people don't know that you can continue a failing step (`continue-on-error`), or that failing tests might cause the rest of the workflow to fail, therefore to publish the testing results then you have to make sure that you continue on because otherwise the workflow would stop.
- Sometimes, however, outputs might still be available from your steps but might not be explicitly defined in the `action.yml`. You have to check the GitHub Actions documentation for the specific action. Example: `actions/cache` `cache-hit` output.

```yaml
- name: Restore Cache
  id: cache
  uses: actions/cache@v4 # Use latest version
  with:
    path: node_modules
    key: ${{ runner.os }}-node-${{ hashFiles('**/package-lock.json') }}

- name: Report Cache Status
  if: steps.cache.outputs.cache-hit != 'true' # cache-hit is an output of actions/cache
  run: echo "Cache key not found. Regenerating cache."
```

**3.5.2 Information Sharing Between Jobs**

1.  **Job Dependencies (`needs`):** To pass information from one job to another, the consuming job must list the producing job in its `needs` context. This ensures the producing job completes first.
2.  **Job Outputs:** Define `outputs` at the job level, mapping them to step outputs from within that job. Subsequent jobs can access these using the `${{ needs.<job_id>.outputs.<output_name> }}` syntax. Suitable for small pieces of data.

```yaml
jobs:
  job1:
    runs-on: ubuntu-latest
    outputs: # Map job outputs
      output1: ${{ steps.step1.outputs.test }}
      output2: ${{ steps.step2.outputs.test }}
    steps:
      - id: step1
        run: echo "test=hello" >> "$GITHUB_OUTPUT"
      - id: step2
        run: echo "test=world" >> "$GITHUB_OUTPUT"

  job2:
    runs-on: ubuntu-latest
    needs: job1 # Depends on job1
    steps:
      - env: # Access job1's outputs
          OUTPUT1: ${{ needs.job1.outputs.output1 }}
          OUTPUT2: ${{ needs.job1.outputs.output2 }}
        run: echo "$OUTPUT1 $OUTPUT2" # Prints "hello world"
```

- If you need information from a step in another job, make sure that it runs before your job runs (`needs:`). Otherwise, the output will be undefined because the job did not run yet.

3.  **Artifacts (`actions/upload-artifact` & `actions/download-artifact`):** Use artifacts to share files or large amounts of data between jobs. One job uploads the artifact, and dependent jobs download it. Suitable for build results, test reports, etc.

```yaml
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - run: mkdir -p path/to && echo "build data" > path/to/artifact.txt
      - name: Upload artifact
        uses: actions/upload-artifact@v4
        with:
          name: my-artifact
          path: path/to/artifact.txt

  deploy:
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Download artifact
        uses: actions/download-artifact@v4
        with:
          name: my-artifact
          # path: ./ # Optional: specify download path
      - run: cat artifact.txt # Use the downloaded artifact
```

---

This covers the core components of GitHub Actions workflows. Ready for the next section on Control Flow?

Okay, here is Chapter 4, focusing on controlling the flow of execution within your CI/CD workflows.

---


