## Security tools <a id="security-tools" class="unnumbered"></a>

Certainly! Here's a list of 10 security build tools, commonly known as static application security testing (SAST) tools or static code analysis tools. These tools scan your source code or binaries to find vulnerabilities without executing the program.

• dependabot to update deps

1. **Checkmarx**: A widely used tool that scans source code or even binaries to find security vulnerabilities.

2. **SonarQube**: A continuous inspection tool that provides insights on code quality. It includes a security analysis feature.

3. **Fortify Static Code Analyzer (SCA)**: Provided by Micro Focus, it's a solution for detecting vulnerabilities in applications.

4. **Veracode**: A SaaS-based tool that provides full application scans, including static, dynamic, and software composition analysis.

5. **Coverity**: Offered by Synopsys, it provides static code analysis to detect and fix critical software defects in C, C++, Java, and more.

6. **Klocwork**: Used for identifying vulnerabilities; it integrates seamlessly into desktops, build tools, and CI servers.

7. **RIPS**: A PHP-specific static code analysis tool, known for its accuracy and speed.

8. **Bandit**: A tool designed to find common security issues in Python code.

9. **Brakeman**: A static analysis security vulnerability scanner specifically for Ruby on Rails applications.

10. **GitLab Static Application Security Testing (SAST)**: Integrated into the GitLab CI/CD process, automatically scans the latest code changes for vulnerabilities.

It's important to note that no tool can identify all vulnerabilities, and they often need to be used in conjunction with other security practices—including dynamic analysis and manual code review—to ensure comprehensive application security.

#### <a id="section-4" class="unnumbered"></a>

### Configuring build tools <a id="configuring-build-tools" class="unnumbered"></a>

#### Setting up the build tool with the appropriate configuration file(s)

- How do I force other developers to use extensions in the IDE? Workspaces, etc. You can do so implicitly by forcing these checks on the CI server, such as linting. It should have the same configuration as the ones that developers have. Therefore, developers will be inclined to use the recommended extensions because that way they won't have to redo a commit or a formatting change.

- IDE extensions such as linting on save/format, particular rules, etc.

- The testing commands won't work (usually) if you don't have any tests. It's advisable to write some more using CI/CD, or at least writing a single test, to show that the test build step can block the build if it fails.

- Try to run these commands on your local computer and see if they work (via the command line) outside of your IDE. This is because your IDE might have certain software pre-installed (or different environment variables set), which could make things more complex. If they work, then you're on the right track.

- git commit hooks? Might be too advanced, unsure.

#### Defining the build lifecycle, including phases and goals

- When you're building it, make sure that the runner's OS matches the ones that you're developing on. This is important because testing is done on the build machines, thus, if you build it on a different OS it is possible for idiosyncrasies. If you are using multiple OSes, do a matrix build, but don't use the artifacts from the other build steps (just test them.) Instead, just deploy the artifacts that are targeted for the destination OS. The latter part is optional but provides a baseline level of assurance that the tests/compile passes on the systems where it is being developed.

#### Getting better control on your dependencies, and lock files

- Lock files are a way to control your dependencies at a specific version, including any of its dependencies. Its goal is to make a reproducible build environment. The lock files are required because, even if you run the same commands in the same environment on non-dependency locked files, it's possible that it might use the latest or a different version of the dependency, depending on whatever dependency satisfies the one in the manifest and is in the artifact repository on the remote.

- You might already have a lockfile. If not, I would recommend that you create one. This is how you do it in the popular programming languages:

Sure, here's a list of instructions on how to utilize lock files during installation for each of the respective programming languages:

1. **JavaScript (using npm)**:

   - Once you have `package-lock.json` in your project directory (e.g., from npm install).
   - Run:  
     npm ci
   - This command uses the `package-lock.json` file to provide a clean, exact installation of your dependencies.

2. **Python (using pipenv)**:

   - With both `Pipfile` and `Pipfile.lock` present in your project directory:
   - Run:  
     pipenv install --ignore-pipfile
   - This ensures that the installation uses versions specified in the `Pipfile.lock`.

3. **Java (using Maven)**:

   - While Maven's `pom.xml` doesn't function as a lock file in the traditional sense, you should specify exact versions in `pom.xml`.
   - Run:  
     mvn clean install
   - Maven will fetch and install the exact versions defined in `pom.xml`.

4. **Ruby (using Bundler)**:

   - Once you have a `Gemfile.lock` in your project:
   - Run:  
     bundle install
   - Bundler will install the exact versions specified.

5. **C# (using .NET Core/NuGet)**:
   - With specified versions in your `.csproj` file:
   - Run:  
     dotnet restore
   - The .NET CLI will fetch and install the correct packages as listed in the `.csproj`.

It's crucial to ensure that the lock files (or their equivalents) are committed to your version control system so others can benefit from consistent builds.

#### How big should my PRs be?

- PRs should be concise and focused, encapsulating a single, coherent change or improvement that can be reviewed in context. Extremely small PRs are not helpful for providing context, and very large PRs can be overwhelming and difficult to revert.

- If a new feature isn't yet complete, use feature flags that allow partial functionality to be committed and tested without impacting users.

#### On pair programming

- Pair programming is a practice where two people work together, typically on the same machine in real time. It can be especially helpful if one is a senior dev mentoring a junior dev, providing a high-bandwidth communication channel and real-time feedback.

- Pair programming was popularized in Extreme Programming (XP). It is similar to code review, but occurs synchronously and can catch issues earlier. Async code reviews (via PRs) often complement or replace pair programming.

**Note**: Some projects (e.g., Python) don't produce traditional compiled outputs. Adjust your CI/CD pipeline accordingly.

---

### Common Project Layouts (C#, Python, JavaScript/TypeScript, Java)

Below is a concise overview of typical project structures. Adapt them based on your specific needs.

#### C# Project Layout

- **/src**: Main source code.
  - ProjectName: Contains .cs files and ProjectName.csproj
- **/tests**: Unit and integration tests.
  - ProjectName.Tests.csproj
- **/docs**: Documentation.
- **/lib**: Libraries not in package managers.
- **/tools**: Build and related tools.
- **/scripts**: Build, deployment, and migration scripts.
- **/packages**: NuGet packages (less common in .NET Core).
- **/.git**: Git metadata.
- **.gitignore & .gitattributes**: Git configuration.
- **/bin**: Compiled binaries.
  - /bin/Debug
  - /bin/Release (usually for deployment)
- **/obj**: Intermediate files (not for deployment).

#### Python Project Layout

- **/src** (optional): Main source code.
  - your_package_name: .py files
- **/tests**: Unit tests (often using pytest).
- **/docs**: Documentation (e.g., Sphinx).
- **/scripts**: Utility or migration scripts.
- **/data**: Datasets or config files.
- **/venv** or /env: Virtual environment folder (ignored in .gitignore).
- **setup.py**: Packaging and distribution script.
- **requirements.txt**: Dependencies list.
- **.gitignore**: Git ignore rules.

Deployment often involves installing dependencies from requirements.txt using pip in a fresh environment.

#### JavaScript/TypeScript Project Layout

- **/src**: Main source code.
  - /components (for React, etc.)
  - /models or /types
  - /assets
  - /utils or /lib
- **/dist** or **/build**: Transpiled/compiled output (for deployment).
- **/tests** or **/**tests\*\*\*\*: Unit/integration tests with Jest/Mocha, etc.
- **/public**: Static assets (index.html, CSS, etc.).
- **/node_modules**: Installed dependencies (ignored in Git).
- **package.json**: Project metadata and dependencies.
- **package-lock.json** or **yarn.lock**: Exact versions for deterministic builds.
- **tsconfig.json**: TypeScript compiler config (if using TS).
- **.gitignore**: Git ignore rules.
- **.eslintrc** / **.prettierrc**: Linter/formatter configs.

#### Java Project Layout

- **/src**: Main code/resources.
  - /main/java (source code)
  - /main/resources (config, images, etc.)
  - /test/java (test code)
  - /test/resources (test resources)
- **/target** or **/build**: Compiled artifacts (JARs, WARs).
- **pom.xml** (Maven) or **build.gradle** (Gradle).
- **.gitignore**: Ignore rules.
- **README.md**: Documentation.

---

### Deployment and Release Strategies

Commonly used deployment strategies in CI/CD:

1. **Blue-Green Deployment**

   - Two environments: Blue (current production) and Green (new version). Switch traffic to Green when ready.
   - Advantages: Quick rollback, reduced downtime.
   - Disadvantages: Requires duplicated environments.

2. **Canary Deployment**

   - Gradual rollout to a subset of users before expanding to all.
   - Advantages: Early detection of issues, reduced risk.
   - Disadvantages: Requires sophisticated routing and monitoring.

3. **Rolling Deployment**

   - Incrementally replace old version instances with new.
   - Advantages: Simpler than Blue-Green in terms of environment duplication.
   - Disadvantages: Multiple versions run simultaneously during rollout, complicating rollback.

4. **Feature Toggles (Feature Flags)**

   - Deploy code behind flags; enable features when ready.
   - Advantages: Granular control, quick rollback without redeploy.
   - Disadvantages: Adds complexity if toggles are not well managed.

5. **Shadow Deployment**
   - New version runs alongside old in production, but real traffic doesn't affect live users.
   - Advantages: Test with real traffic without user impact.
   - Disadvantages: Resource-intensive, requires traffic mirroring setup.

The best strategy depends on your application, infrastructure, and team capabilities. Many organizations use a combination of these based on their needs.
