### Environments and environment variables {#environments-and-environment-variables .unnumbered}

- I've mentioned a few times that steps are self-contained and they run in their own environment. What exactly is "their own environment?" Each step runs in its own process, and all steps within a job share the same filesystem. For example, say I'm running npm install in one step, and then the next step is "npm test". The command "npm install" would modify the filesystem, do useful work, and then quit. Then, the npm test command, in another step, would run and see that the node_modules are installed and continue. It's sort of like when you're running the commands locally: you open up a new terminal window for each command instead of running everything inside of the same terminal window. What this means, is for example, say you were to "cd" into a directory, then if you were to open up a new terminal window, it doesn't have that context, so therefore it is reset. It also doesn't have any environment variables shared (by default) between steps.

- **The word "environment" is a heavily overloaded term.** They can refer to GitHub's "environments" feature, environment variables, or just the environment (e.g., OS) that the script runs. This section will help disambiguate the terms.

- You can also think of steps like small functions. This can be a helpful metaphor to understand what isn't and is retained between steps. In Python, I might write a function like:

+-----------------------------------------------------------------------------------------------------------------------------------+
| z = 4 |
| |
| def step_1(): |
| |
| x = 2 |
| |
| y = 6 |
| |
| def step_2(): |
| |
| print(x) // won't work, I have to return it from step_1() |
| |
| print(z) // will work, this is sort of like the github context because it is defined outside of the functions in the global scope |
| |
| step_1() |
| |
| step_2() |
+===================================================================================================================================+
|-----------------------------------------------------------------------------------------------------------------------------------|

- If I do something else, such as set a variable, then this won't be available to the next step (by default.) Think of steps like little functions with locals as variables: if I define function "A", and put some variables in it, then I have to return them to make them available outside of the function. If I change some items on my filesystem, then they will be available to the other functions because it is a stateful procedure. The reason why the steps are isolated like this is because they run in processes. Very important to know that filesystem changes between steps are retained. Each step gets access to the global github context, which may contain your secrets and other variables, as well as variables set as outputs from the previous step.

- There are a few ways to share information between steps. One is to use the filesystem, but it can get a bit messy, especially if the data is structured.

- Say I wanted to share data between functions. How would I do that? Well, I would have to make the functions have inputs, like parameters. And I would also have to capture their outputs, much like steps.

+-----------------------------------------------------------------------+
| def step_1(input): |
| |
| x = 2 |
| |
| y = 6 |
| |
| return y |
| |
| def step_2(input): |
| |
| print(input) |
| |
| step_1_output = step_1() |
| |
| step_2(step_1_output) |
+=======================================================================+
|-----------------------------------------------------------------------|

- I have to explicitly do this, otherwise the language won't know what I'm trying to access.

- In GitHub actions, you would write your string to the GITHUB_OUTPUT variable which would transfer it to all subsequent steps. Then you can use it as normal. Note that you will have to give your steps ids, these are similar to ids that you might give an element in JavaScript or react for example: it can't contain spaces or special characters. Similar to functions, you can set the inputs via "env" and then grab it from the step.

- I know that beginners could do this inline. However, there are some weird caveats with sharing passwords and such, plus if everything is written to GITHUB_ENV then it's no longer stateless and it's hard to keep track of what's happening. Plus it might not be clear which variables are auto-imported, for example, GITHUB_ENV injects everything that the user has ever written from all steps which might be confusing because each step is sort of its own little environment. It also might not be clear to the user if they set their own environment variables in the script, as those will take precedence over the GITHUB_ENV stuff. Using the github_output makes it clear which step you want the information from and makes it so that you don't have to read every single step backwards to figure out where the variables are coming from, in case some steps overwrite the values, etc.

- Notice that the steps need ids, this is because it needs to know which output from which step that you want to access.

- So, there are different environments for environment variables, some have different scopes, some can be shifted to and from bash scripts, and some, like secrets, can't be referenced directly in "if" statements. So, it's helpful to determine where and when these can be used.

- When you start a workflow, GitHub will inject some variables into your script. You can use these variables wherever you want. This is called the "context".

  - Some variables come with a pre-calculated value. You can't change this. For example, ${{ github.repository }}. They just appear and there's nothing you can do about it. You can use them anywhere you want.

  - Some are variables that you can set yourself before you start the action. For example, ${{ var.myVariable }}. You can manage these on the GitHub website for your repository in your account. Note that you can access these variables anywhere in the script. Just call ${{ var.myVariable }}. They should not be used for confidential values--the values may show up in the logs. They are available to all workflows within your repository where you set the variable. It gets the variable from whatever value is stored in there.

  - Some are called secrets, for example ${{ secrets.SuperSecret }}. These secrets are also values you can set in the GitHub website for your own repository. You should use secrets for, well, secret information. These include passwords, api keys, ssh keys, etc. These cannot be used within "if" statements. In order to use them within "if" statements, you have to set an env variable specific to the GitHub workflow context within that workflow.

  - There are also environment variables, specific to bash scripts. These variables are specific to each script, or each step. Once the step or script is done, then the variable is erased and not accessible to other steps, unless you specifically set the GITHUB_ENV variable. For example, echo "x=2" >> $GITHUB_ENV. Bash scripts can also access the workflow variables, such as those in the "github", "var", and "secret" context. Think of it like a waterfall.

- First, typically, environment variables are used to store secrets. For example, if you want to publish an image to Docker, or a container to your registry, then it needs credentials. The build server doesn't have your password already stored, much like your CLI might do if you were to push a docker container. Therefore, you have to set up a secret environment variable, which will be injected into your runner, and then you can use it and pass it to docker to allow it to authenticate and then push your image.

- Some items are environment variables, some items are template strings, and you can set environment variables via template strings. Template strings are just pieces of text that are inserted exactly as-is after expansion and after being JSON stringified. Environment variables are similar to variables in a programming language: if they are numbers, you can add one to them, concatenate them, parse them, etc.

- Template strings and environment variables have different uses. Template strings are automatically converted into their GitHub-value counterpart once expanded, and are usually GitHub specific. For example, ${{ github.token }} is first evaluated inside as a JS variable (the property token on the object github), and then it is replaced as-is, wherever it may exist. These might also be secrets (e.g., ${{ secrets.XYZ }}) or references for the github workflow, or output from steps (sometimes.) All they do is expand as a string, and you can't change their value in the script, they are read-only. The content of the template string is evaluated as "GitHub Script", which is a subset of JavaScript. You can do specific things in GitHub script, like contains() or equals().

- Which one you use depends on how you want to use it, the level of scoping required, and what information you're trying to get.

+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------+
| I have a variable declared in my bash script and I only want to keep it to just the bash script to all inline scripts, and I want to make the variable disappear once the step is complete. This variable will be set for all commands in this step from this point forward. | x=2; |
| | |
| | mycommand; |
| | |
| | You can also read variables via ${x} which looks similar to GitHub template strings but are completely different. |
+==============================================================================================================================================================================================================================================================================+==============================================================================================================================================+
| I have a variable that I only want to provide to a single command, or to an external script, and I want to override that variable, if it is defined outside of the script. | (x=2; y=3; mycommand) |
+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------+
| What variables are set at the beginning of each step? | - Anything that is in the specific workflow context (env) |
| | |
| | - Everything in the GitHub "environments", only if you specify an "environment" |
| | |
| | - Anything in the job context (env). Which gets precedence, the job env or the environment? |
| | |
| | - Anything declared in the step's env |
| | |
| | - Anything declared in GITHUB_ENV? Which gets precedence over the step's env? |
| | |
| | - Anything manually declared in the script will change that environment variable for the rest of the steps in the script |
| | |
| | - Anything in sub-shells (overrides it per command) |
| | |
| | - Anything done internally within the command |
+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------+
| When you're writing to GITHUB_ENV, all it is, is a temporary file with a list of key value pairs. When you start a new step, it is as if you are setting the variables all over again at the beginning of each step. | (For each variable set in the file located at path GITHUB_ENV, set them in the shell.) This occurs at the beginning of all subsequent steps. |
| | |
| This means that you can override the values with whatever you want in each step, after all, it is equivalent to simply setting those variables manually at the start of the step. | |
+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------+
| | The environment thing that you set up in the web interface and can use for each job |
+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------+
| | Environment variables in Node |
+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------+
| | Environment variables scoped to a job |
+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------+
| | Environment variables scoped to a workflow |
+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------+
| | Environment variables scoped to a job, passed to a script |
+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------+

### Working with environments and environment variables {#working-with-environments-and-environment-variables .unnumbered}

- Environment variables are key-value pairs that can be accessed from system processes and are especially useful in CI/CD workflows.

  - They allow developers to configure and customize pipelines without altering the code or primary configuration files.

  - They play a pivotal role in maintaining security by offering a way to store sensitive information, such as API keys or database credentials, outside the codebase.

  - Environment variables help prevent hardcoding values, making pipelines more flexible and adaptable to different environments or conditions.

- The reason why you'd want to use environment variables are:

  - Being able to customize the pipeline without having to modify configuration files means that it is more flexible. This allows the pipeline to automatically "adapt" to its environment, since the scripts inside the pipeline now have access to the outside environment provided by the build runner. This means that you can set up scripts that execute different code when the environment variables change.

- Common use cases are,

  - Matrix builds, for example, changing the version of a dependency or framework that the application is built with. This allows for multiple jobs to run in parallel using different configurations. This would be very complex without environment variables.

  - Changing the output of the artifacts, or tooling. This helps the script run on different platforms, for example, you might be able to re-use the script in your local environment (i.e., by changing the path at runtime.) This is a big part of having a consistent development environment, and allows opening a "port hole" into the script to do a small modification, rather than having two different scripts which may become more and more distant from each other, thus, not ensuring environment parity.

  - When you are using a CI provider, your build script may require using CI/CD-specific tooling, such as interacting with pull requests or commenting on PRs, or requesting secrets. In this case, the provider will inject environment variables that you can access to perform those actions. For example, you may want to post an automated comment on the PR with the testing coverage.

  - Since the CI server is running on a different environment, and thus different hardware, you may want to provide options to restrict (or unrestrict) how much resources it can allocate. For example, if the memory on the CI runner is small, then you might want an environment variable that tells the script to use less memory (you would have to program the logic yourself.) Note! This is a risky practice, because this would mean there is no longer parity between the development machines and CI, thus, there could be different results.

  - Another use case is the fact that it is running on CI at all. The reason why this is important is because you want to adjust your logging (for example, to remove color output) as some CI software does not remove the ANSI color coding, which makes grepping through logs very challenging.

  - They can be used to store information securely. Since environment variables are provided at run-time, this means that you do not hardcode your script with secrets, rather, you use a special type of environment variable (normally called a "secret environment variable") that is provided by your CI software. What this does is replaces your environment variable with the secret value. Since the CI runner knows that it is a secret, then it can redact it from the logs if it appears in the log output. It also means that it exists only on the CI runner, which allows for tighter access control, and won't end up in backups, or accidently shared.

  - This is useful when you want to use external services, for example to set up a testing environment via IaC/deploy an ARM template. Or, if you want to run E2E tests on a specialized testing server (e.g., SauceLabs.)

- (I pasted in a lot of GitHub Actions Workflow files, about 1000 lines worth of variables and then got chat gpt to categorize them)

From the given snippets, the GitHub Actions environment variables and related configurations can be grouped into the following broad themes:

1. **Platform & Environment Setup**

  - Setting up Python environment: `$PYTHON = $env:PYTHON`, `$PYTHON_ARCH -eq 32`.

  - Environment types or modes: `env: production`, `env:`, `global:`.

  - Specific environment settings: `CTEST_OUTPUT_ON_FAILURE: 1`, `PERL_USE_UNSAFE_INC: 0`.

2. **Source Code & Build Directories**

  - Source code location: `SOURCE_HOME: $(Build.SourcesDirectory)`.

  - Tooling directories: `TOOLTOOL_MANIFEST`, `MOZ_FETCHES_DIR`, `WORKSPACE: "/builds/worker/workspace"`.

  - Test directories: `JUNIT_FILE: $(TEST_DIR)/$(JUNITXML)`.

3. **Compiler & Language Versions**

  - GHC and Cabal versions for Haskell: `CABALVER=1.22 GHCVER=7.10.3`, `CABALVER=1.24 GHCVER=8.0.1`.

  - Compiler specification: `compiler: ": #GHC 7.10.3"`, `compiler: ": #GHC 8.0.1"`.

  - Addons for different versions: `addons: {apt: {packages: [ghc-ppa-tools,cabal-install-2.0,ghc-7.0.4], sources: [hvr-ghc]}}`.

4. **External Tools & Dependencies**

  - Tooling configurations: `TOOLTOOL_MANIFEST: "/builds/worker/checkouts/gecko/browser/config/tooltool-manifests/macosx64/cross-releng.manifest"`.

  - Downloading and installing tools on Windows with curl: `curl.exe -SL --output ...`.

  - Specific packages installed on a Cygwin setup: `--packages autoconf,automake,...`.

5. **GitHub & Authentication**

  - GitHub-specific environment variables: `GITHUB_TOKEN: ${{ secrets.PROJECT_TOKEN }}`, `ISSUE_OR_PR_ID: ${{ github.event.issue.node_id || github.event.pull_request.node_id }}`, `GITHUB_USER: ${{ github.actor }}`.

  - Organization and team-related: `ORGANIZATION: ohmyzsh`, `TeamName: $(_TeamName)`.

6. **Miscellaneous & Utility**

  - Utility functions/settings: `d_clearenv: ~`, `d_closedir: define`, `RUST_BACKTRACE: 'full'`.

  - Other configurations: `bosh:`, `ccache:`, `CODECOV_TOKEN: $(CODECOV_TOKEN)`.

  - Miscellaneous outputs and commands: `Write-Host "PATH: $env:PATH"`.

The above themes provide a structured overview of the configuration snippets, but a deeper understanding would require a complete context from the original configuration files.

- Certainly, here's an outline for a section on working with environment variables based on the provided text:

- Environment variables are injected at runtime, providing flexibility and prevents secrets from being added to artifacts, since the artifacts are not part of the repository or source code. Secrets that are leaked to production would be very bad. Also, it provides an agile-approach to quickly renewing the secret, in case it was leaked (since they are all in a single place.)

## Section Title: Working with Environment Variables in CI/CD

### Introduction to Environment Variables

- Define what environment variables are in the context of CI/CD.

- Explain their significance in configuring and customizing CI/CD pipelines.

- Mention how environment variables are used to store sensitive information securely.

### Setting Environment Variables

- Describe how to set environment variables in different CI/CD tools (e.g., Jenkins, GitLab CI, Azure Pipelines).

- Provide step-by-step instructions on setting environment variables via the CI/CD platform's user interface.

- Show examples of setting variables for common use cases, such as API keys and deployment targets.

### Using Environment Variables in CI/CD Pipelines

- Explain how environment variables can be accessed and utilized within CI/CD pipeline scripts.

- Demonstrate how to reference environment variables within build scripts or configuration files.

- Showcase practical examples of environment variable usage, such as passing version numbers or credentials to deployment scripts.

### Securing Sensitive Data

- Discuss best practices for securing sensitive data stored in environment variables.

- Cover techniques like encryption, masking, or using secret management tools provided by CI/CD platforms.

- Emphasize the importance of not exposing sensitive data in logs or build artifacts.

### Environment Variable Scope

- Explain the scope of environment variables in CI/CD, including global, job-specific, and branch-specific variables.

- Provide guidance on when to use global variables vs. job-specific ones.

- Show how to override or extend variables for specific pipeline stages or branches.

### Handling Environment Variables for Multiple Environments

- Discuss strategies for managing environment variables when deploying to multiple environments (e.g., development, staging, production).

- Present solutions like environment-specific variable files or conditionally loading variables based on the target environment.

### Troubleshooting Environment Variable Issues

- Offer troubleshooting tips for common environment variable-related problems in CI/CD.

- Explain how to diagnose issues like missing variables or incorrect values.

- Provide examples of error messages and their potential resolutions.

### Conclusion

- Summarize the key takeaways from the section.

- Emphasize the importance of proper environment variable management in CI/CD for flexibility, security, and automation.

- Encourage readers to apply the knowledge gained to enhance their CI/CD pipelines.

Best practices and tips

  - Environment variables are data that are injected into the runner via the environment (i.e., based on where your runner is running.) Your application or build script can use this information so that it can modify its behavior specific to this build.

  - It's important to keep the pipeline simple as possible, unless complexity is warranted. This is because adding too much complexity early on, especially when learning how CI/CD works, can make it difficult to debug the pipeline and what it is doing. It also might be difficult to communicate it to stakeholders. If you want to add new features to the pipeline, consider making a copy of it first and performing the changes there (in another branch) so that it can be discarded without impacting the core development pipeline. This doesn't mean that one shouldn't change the pipeline, rather, you should have the ability to explore and try out new features in an isolated environment that does not impact the core development process.

  - Debugging with logs (or print statements) is very scrappy but surprisingly effective.

  - It's important that the build server is able to run the build script without errors. If there are errors, then it means that there is something wrong with the inputs (i.e., the code that was committed), and therefore confidence can no longer be instilled in the build artifacts, and work is not integrated. This is a cause for concern, therefore, to prevent this from occurring, sometimes the build scripts are run before code is merged to provide a fast feedback loop for potential bugs.

  - While CI/CD is normally used within teams, it can still be very useful for single developers. It is very helpful to be able to track changes and have a fast feedback loop on your changes so that you (in this case you are the business) can deploy at any point, especially if you are deploying frequently.

  - Set up the PR template to make users tick a box that they have built and run the tests locally. This will be automated in the next few steps.

  - Make the build process very simple. A single build script only needs to be used to pull in the right dependencies, and build the application (and run it.)

  - Normally, you do not want to store application passwords in the source code, or credentials. These should be removed prior to migrating your code to a repository because repository history is usually permanent and thus credentials will be written to disk in plaintext on each developer who clones the repo. You can dynamically inject these via environment variables which only live during the build process and are then deleted. This is discussed in more detail in the security chapter.


