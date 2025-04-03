## Setting up your repository: Build tools and more {#setting-up-your-repository-build-tools-and-more .unnumbered}

### Introduction {#introduction-1 .unnumbered}

Clicking \"Run\" or \"Start\" in an IDE initiates a sequence of command-line tools that compile and manage dependencies to create build artifacts, simplifying the complex process with a single button. This abstraction can obscure the specific tools used, complicating tool selection for CI/CD pipelines.

What do I deliver to the customer, i.e., what are build artifacts?
A typical software release often includes several components, tailored to the nature of the software and the target audience. Here are some of the common elements you might find:

1. **Binaries**: These are the compiled code files that are executable on the target platform(s). For desktop applications, these might be `.exe` files for Windows, `.app` packages for macOS, or binaries for Linux. For mobile applications, these would be `.apk` files for Android or `.ipa` files for iOS.
2. **Libraries**: If the software relies on specific libraries, these may either be bundled with the binaries or referenced as dependencies that need to be installed separately.
3. **Documentation**: This can include user manuals, release notes, and API documentation. Release notes are particularly important as they typically outline the new features, bug fixes, and known issues in that release.
4. **Source Code** (in some cases): For open-source software, the source code is often provided along with the binaries. Even in some proprietary contexts, source code may be provided to certain customers under specific agreements.
5. **Installation Scripts/Programs**: These are scripts or executable files that help users install the software on their system. This could include setup wizards for Windows, package installers for Linux, or dmg files for macOS.
6. **Configuration Files**: These files are used to configure the software for initial use, or to customize its operation. They might be in the form of XML, JSON, or other formats.
7. **Database Files**: If the application uses a database, the release might include database scripts to set up schemas or initial data sets.
8. **License and/or Copyright Information**: Legal documentation specifying the terms under which the software is provided.
9. **Digital Signatures/Certificates**: For security, the binaries and installer might be digitally signed to assure users that the software is genuine and has not been tampered with.
10. **Additional Resources**: This can include images, icons, data files, or other resources needed for the software to function correctly.
11. **Patches/Updates**: If the release is an update or patch to existing software, it may only include files that have been changed rather than the entire software package.

The contents of a software release can vary widely depending on the type of software, the platform it's being released on, and the policies of the developing company or organization. In enterprise environments, additional components like deployment guides, training materials, and support information may also be included.

The main artifact is the executable, or code, and are typically produced via your IDE. Sometimes, for manual build processes, there may be a team who is responsible for packaging the various build materials.

## Visual Studio (for C++/C#)

- **Build Commands**  
  Visual Studio uses `msbuild` to build projects. To see the exact commands:
  - Open the **Tools** menu.
  - Select **Options**.
  - Navigate to **Projects and Solutions → Build and Run**.
  - In the **MSBuild project build output verbosity** dropdown, choose **Detailed** or **Diagnostic**.
- **Build Order**  
  The build order appears in the output window during a build (especially with verbosity set to Detailed or Normal).

_Note:_ Build logs are primarily for troubleshooting. In legacy or complex projects, you might sometimes need to provide custom commands.

## IntelliJ IDEA (for Java)

- **Build Commands**
  - The IDE uses its own builder. For Maven or Gradle builds:
    - Open the **Terminal** tab.
    - Run your build tool command (e.g., `mvn compile` for Maven).
    - The executed commands are printed in the terminal.
- **Build Order**
  - When using tools like Maven, the lifecycle phases determine the order. The order is also visible in the **Build** tool window messages.

## Eclipse (for Java)

- **Build Commands**
  - Eclipse uses its internal builder. To view detailed build info:
    - Go to **Window → Preferences**.
    - Navigate to **General → Workspace**.
    - Enable **Verbose output for the build**.
- **Build Order**
  - Eclipse handles the build order internally. For more complex projects (often using Maven), the build lifecycle phases clarify the sequence.

## Xcode (for C++/Swift/Objective-C)

- **Build Commands**
  - Open **Xcode** from the top menu.
  - Select **Preferences** and go to the **Locations** tab.
  - Set the **Derived Data** location to **Relative**.
  - After building, check the **Report Navigator** (rightmost tab) to view build logs.
- **Build Order**
  - The order is determined by your project dependencies and can be reviewed in the build logs in the **Report Navigator**.

_Overall:_ Reviewing the output or log pane during builds is the best way to understand the commands executed and their sequence.

---

# Build Tool Selection and CI Best Practices

When choosing build tools and configuring your CI pipeline, consider these guidelines:

- **Favor Specific, Portable Tools Over Hacking**  
  A poor tool selection can lead to “CI bad smells.” Relying on custom shell scripts to patch issues may work initially but can later cause maintainability and portability problems. Instead, use established plugins and ensure tool versions do not conflict on your CI server.

- **Avoid Out-of-the-Box Configurations**  
  Default configurations for external tools might not be optimal. Involve developers when defining quality gates instead of relying solely on customer requirements. This collaborative approach helps avoid irrelevant warnings and keeps the CI process efficient.

---

# IDE Dependency and Portability Issues

Build scripts can become too tightly coupled with the IDE, leading to several problems:

- **Hard-Coded Paths:**  
  Some IDEs install build tools in fixed locations. If your configuration references these paths, it can make your project IDE dependent, limiting portability.

- **Configuration Challenges:**  
  Mixing personal IDE preferences with essential build settings can make collaboration difficult. Different environments (including CI servers) may not replicate the same configuration, leading to errors.

- **Reproducibility on CI:**  
  Custom IDE settings, specific software versions, or environment variables injected at build time might not be available on CI. This discrepancy can change application behavior and hinder reliable builds.

---

# Identifying Project Build Types

Determining the type of project and its build process can be done using a few heuristics:

- **Use GitHub Linguist:**  
  Analyze the project’s primary languages. For example, if a project shows a high percentage of TypeScript and contains a `package.json`, it’s likely an npm project.

- **Common Build Flows by Language:**

  - **Java:** Code → Bytecode → Run on JVM.
  - **Python:** Code is interpreted.
  - **C#:** Code compiles into DLLs or EXE files.

- **Check for Dependency Manifests:**  
  Look for files like `package.json`, `Gemfile`, `pom.xml`, etc., in the root directory. These files indicate the project type and guide you on how to build and test it.

---

# Examples of Dependency Manifests and Build Commands

Below are several examples (from Heroku buildpacks) that illustrate how different project types are detected and built:

- **Ruby**

  - **Files:** Gemfile, Rakefile
  - **Build:** Not compiled in the traditional sense
  - **Test:** `rake test`
  - [Heroku Buildpack Ruby](https://github.com/heroku/heroku-buildpack-ruby/blob/main/bin/detect)

- **JavaScript/TypeScript**

  - **Files:** package.json
  - **Build:** `npm ci` or `npm install` (or corresponding Yarn commands; be cautious if both package-lock.json and yarn.lock exist)
  - **Test:** `npm test`
  - [Heroku Buildpack Nodejs](https://github.com/heroku/heroku-buildpack-nodejs/blob/main/bin/detect)

- **Clojure**

  - **Files:** project.clj
  - **Build:** `/bin/build` or `lien compile?`
  - **Test:** `lien test`
  - [Heroku Buildpack Clojure](https://github.com/heroku/heroku-buildpack-clojure/blob/main/bin/detect)

- **Python**

  - **Files:** requirements.txt, setup.py, Pipfile
  - **Build:** Use pip to install dependencies
  - **Test:** `python -m unittest` (varies by project)
  - [Heroku Buildpack Python](https://github.com/heroku/heroku-buildpack-python/blob/main/bin/detect)

- **Java (Maven)**

  - **Files:** pom.xml (and related variants: pom.atom, pom.clj, etc.)
  - **Build:** `mvn compile`
  - **Test:** `mvn test`
  - [Heroku Buildpack Java](https://github.com/heroku/heroku-buildpack-java/blob/main/bin/detect)

- **Java (Gradle)**

  - **Files:** build.gradle, gradlew, build.gradle.kts, settings.gradle, settings.gradle.kts
  - **Build:** `gradlew {check, test, build, etc.}`
  - **Test:** `gradlew test`
  - [Heroku Buildpack Gradle](https://github.com/heroku/heroku-buildpack-gradle/blob/main/bin/detect)

- **PHP**

  - **Files:** index.php, composer.json
  - **Build:** `composer install`
  - **Test:** Varies depending on the application
  - [Heroku Buildpack PHP](https://github.com/heroku/heroku-buildpack-php/blob/main/bin/detect)

- **Go**

  - **Files:** go.mod, Gopkg.lock, Godeps/Godeps.json, vendor/vendor.json, glide.yaml
  - **Build:** `go build`
  - **Test:** `go test`
  - [Heroku Buildpack Go](https://github.com/heroku/heroku-buildpack-go/blob/main/bin/detect)

- **C#**

  - **Files:** .sln, .csproj, .fsproj, .vbproj
  - **Build:** Typically `dotnet build`
  - **Test:** Typically `dotnet test`

- **C/C++**
  - **Files:** Look for Makefile, CMakeLists.txt (for CMake), or .pro files (for qmake)
  - **Build/Test:** Depends on the build system (e.g., make, cmake, qmake)
  - _Note:_ Makefiles can be used for various project types and might require inspection of the commands (gcc, g++, as, ld, etc.).

Typically, software development projects are complex and there may be different interpretations of what a project is. When organizing code, there are two main approaches: mono repo and multi repo.

**Mono Repo:**

- **Advantages:** Simplifies interdependency management, as all components are in one repository. Easier deployment and versioning together.

- **Disadvantages:** Git clone can become slow over time, though this can be mitigated by partial clones or Git VFS.

**Multi Repo:**

- **Advantages:** Each component has its own repository, allowing for independent deployment and versioning. This approach encourages creating public APIs for interaction.

- **Disadvantages:** Managing changes across many repositories can be complex, especially when multiple repositories need simultaneous updates.

**Security:**

- Multi repo offers better access control, as different repositories can have separate permissions.

**Flexibility:**

- Switching between mono repo and multi repo setups can be challenging and may disrupt Git history. Splitting a mono repo into multiple repos is generally easier than merging multiple repos into one.

If you're working with multiple developers, you may want to set up a GitHub organization to help manage multiple users access to your repositories. However, there are some security settings you should pay particular attention to. Below are the recommended settings when creating a new GitHub organization.

![](./images/image31.png)

When you first set up your GitHub Actions enterprise repository, you may want to change a few things in the general actions permissions. First, allow "enterprise" and select "non-enterprise" actions and reusable workflows. Specifically, you want to only allow actions created by GitHub and disable the repository-level self-hosted runners. This is because allowing actions created by GitHub is technically a trusted source. However, if you allow actions from the marketplace, you must be careful about the creators you're using. If you only reference the version hash of that workflow file, arbitrary code could be executed. There have been instances where such code was not amenable to what you're trying to run in your repository. Additionally, avoid using self-hosted runners as they might allow someone to control or modify outputs for your runners, potentially injecting malicious code.

![](./images/image48.png)

The next one is artifact and log retention. Set it to the maximum value—90 days in this case. This allows you to check for any malicious code that might have interrupted or interacted with your repository by reviewing the logs to see when a certain dependency was injected. It's also useful for debugging. For example, if you want to check if a build was contaminated with malware, or if you’re testing and need to determine which version was vulnerable to a security issue, retaining artifacts and logs is crucial. For an enterprise, it might also support auditing requirements.

![](./images/image26.png)

For fork pull request workflows from outside collaborators, enable the "Require approval for all outside collaborators" option. This is crucial because you don't want workflows to run automatically when any collaborator forks your repository and makes a pull request. Without approval, those pull requests could contain malicious code that either consumes your repository resources (like for Bitcoin mining) or tries to access secrets. Although GitHub has improved security, there's still a risk of arbitrary code running on your runners. This is especially important if you're using self-hosted runners, where someone could execute arbitrary code. It's better to enforce these settings at the enterprise or repository level to avoid accidental modifications to workflow files, which could compromise your processes.

![](./images/image18.png)

For member privileges under repository comments, check the box "Allow members to see comment authors' profile name" in private repositories. This helps identify who made a comment, providing more transparency and accountability within your team. It’s particularly useful when multiple contributors are involved, ensuring that feedback and discussions are attributed correctly.

![](./images/image74.png)

Under Rules, there are several settings to check. First, require a pull request before merging. Set the required approvals to at least two, unless there's only one person on your team. This ensures at least one other person approves the pull request. Requiring a pull request before merging ensures that continuous integration runs, preventing random merges.

Next, dismiss stale pull request approvals when new commits are pushed. This is because an approval is based on the current state. If new code is pushed, it's a different pull request and needs re-approval.

Require a review from code owners to ensure certain parts of the repository get the proper review before updates.

Check "Require approval of the most recent reviewable push." This ties into the required approvals, ensuring each new push gets fresh approval.

Require conversation resolution before merging for auditing and to ensure all feedback is addressed.

Require status checks to pass to confirm continuous integration tests succeed.

Check "Require branches to be up-to-date before merging" to prevent issues when merging. However, this can create a bottleneck in large teams, as merging each pull request may take longer.

![](./images/image83.png)

Under Rules, check "Block force pushes" to prevent rewriting history. This is crucial for auditing and ensures that others pulling the repository don't need to rebase unexpectedly.

You might also consider "Require workflows to pass before merging." However, it's wise to have a "break-glass" procedure for emergencies. For example, if your CI system is broken or you need to fix an urgent bug, bypassing checks can be necessary. This approach helps maintain operational flexibility while keeping security and stability in mind.

![](./images/image29.png)

For repository roles, create a "break-glass" role used for emergencies only. Choose a role to inherit, which is write. Add permissions like "Jump to the front of the queue" under merge queue permissions, and "Request a solo merge." For repository permissions, allow bypassing branch protections. This role allows a member to elevate their permissions temporarily in emergencies. A repository administrator can assign this role, allowing them to bypass security checks once, ensuring break-glass procedures work as intended.

![](./images/image21.png)

For two-factor authentication, ensure it's enabled. Check the box "Require two-factor authentication for everyone in the organization." This step greatly increases your organization's security.

![](./images/image19.png)

Under Global Settings for Dependabot, you might want to check "Grouped security updates," though this depends on your preference. Also, enable Dependabot on actions runners to ensure it runs properly. If you have only self-hosted runners, check Dependabot on self-hosted runners to keep it in a trusted environment.

For secret scanning push protection, check "Add a resource link in the CLI and web UI when a commit is blocked." This provides helpful context and guidance for developers when they encounter blocked commits.

![](./images/image80.png)

For third-party application access policy, set the policy to "Access Restricted" and allow people to create pending requests. This ensures that applications can't access your entire codebase without approval from the application administrator. This is crucial for security, as it prevents unauthorized access and ensures applications operate only with proper permissions.

![](./images/image90.png)

Under Personal Access Tokens, ensure the option "Allow access via fine-grained personal access tokens" is checked. This provides only the necessary permissions for users and applications to access your repositories and organization. Also, set "Do not require administrator approval" for creating tokens to avoid hassle, especially since tokens can expire quickly. Additionally, disable or restrict access via classic personal access tokens, as they lack fine-grained control and can allow excessive permissions unless needed for legacy support.

![](./images/image17.png)

Under Scheduled Reminders, you may want to connect your Slack workspace to notify developers when pull requests are ready for review. This integrates with your workflow, making it more convenient for developers to stay on top of reviews. You might also consider integrating with a webhook or another provider like email to ensure developers receive timely notifications and keep pull requests moving smoothly.

![](./images/image39.png)

Under Repository Policies, set the base permissions to "Write" for all organization repositories. This ensures members have the lowest necessary access level, and higher permissions granted elsewhere will override it. For repository creation, set it to "Disabled" so members can't create their own repositories, enhancing security.

Disable repository forking to maintain a single source of truth and clear code control. Set outside collaborators to "Repository administrators allowed" to restrict who can invite external contributors.

Set the default branch name to "main." Restrict repository visibility changes to organization owners to prevent accidental exposure.

Disable repository deletion and transfer to maintain auditability and protect code history.

![](./images/image71.png)

Under GitHub Codespaces, set it to "Disabled" unless you specifically want people to use it. GitHub Codespaces runs in a virtual machine outside your company's network, which can complicate auditing and security. It may also incur costs if developers leave Codespaces open for extended periods. Additionally, Codespaces might not meet your organization's data residency requirements.

![](./images/image41.png)

Under Runners, set it to "Disabled for all organizations" to allow organizations to self-manage their own self-hosted runners. Avoid using self-hosted runners unless absolutely required, as they can be difficult to manage and keep up-to-date. They also run in an unsecure environment and operate on your company's network. It's better to keep everything isolated within GitHub. Allow self-hosted runners only if they need to access internal services that can't be run over the internet. Otherwise, disabling them prevents users from running self-hosted runners on personal devices, which could produce untrusted build outputs.

![](./images/image9.png)

Create a new team called "Engineers" and potentially others like "QA." This avoids assigning permissions directly to each user. When a member leaves, you can remove them from the group, simplifying permission management. Assigning permissions at the team level makes auditing easier and ensures everyone in the group has the same access level.

You can also create a "Break Glass" team to temporarily elevate an engineer’s access for emergencies. Afterward, you can easily remove them, keeping access transparent and controlled.

![](./images/image82.png)

When you set up two-factor authentication for your GitHub account, it's a good idea to set up a security key like a YubiKey. You probably won't want to use it for every commit, as it can be inconvenient to touch the YubiKey every time you commit. Also, install the GitHub mobile app for two-factor authentication. It's more secure than SMS codes and serves as a backup if you lose your phone or change numbers.

![](./images/image61.png)

![](./images/image72.png)

![](./images/image63.png)

![](./images/image79.png)

![](./images/image22.png)

![](./images/image44.png)

![](./images/image85.png)

When creating a runner, typically, you would use the OS that most of your team members are using, or, the OS required to build the application

![](./images/image11.png)

The instructions that github provides is for a stateful runner, much different from the runners cloud hosted by github. You will have to use kubernetes to re-create the nodes.

[[Trace Context Level 3 (w3c.github.io)]{.underline}](https://w3c.github.io/trace-context/)

A good dev setup guide (i.,e readme) should be clear and comprehensive. It should:

1\. Describe the repository\'s purpose and fit within the organization.

2\. Provide instructions on building, navigating, and using the repository.

3\. Include links to wikis for setting up build tools.

4\. Ensure the repository is self-contained, with all necessary dependencies easily accessible.

5\. Specify contact information for the repository\'s owner or relevant team.

6\. Include thorough documentation and possibly revise how wikis are managed on GitHub.

Here's a breakdown of what happened:

- **Compromised Server:** Attackers gained unauthorized access to one of Handbrake's download servers.

- **Trojanized Software:** They replaced the legitimate Handbrake application with a malicious version containing a Trojan (malware designed to disguise itself as legitimate software).

- **User Downloads:** Users who downloaded Handbrake from the compromised server unknowingly installed the Trojanized version on their machines.

- **Remote Access and Data Theft:** The Trojan gave attackers remote access to infected computers, potentially allowing them to steal sensitive data, install additional malware, or control the system.

**How it Relates to Secure Delivery Mechanisms:**

The Handbrake incident highlights several failures in their delivery mechanism:

1. **Inadequate Server Security:** The attackers were able to exploit vulnerabilities on the download server, indicating insufficient security hardening, patching, or intrusion detection measures.

2. **Lack of Code Signing:** Handbrake, at the time, didn't use code signing for their software releases. This means users had no way to cryptographically verify the authenticity of the downloaded file.

3. **No Integrity Checks:** The absence of checksums or hashes alongside downloads meant users couldn't easily detect that the file had been tampered with.

**Lessons Learned:**

The Handbrake breach underscores the importance of:

- **Robust Server Security:** Hardening servers, keeping software up to date, and implementing strong authentication and intrusion detection are crucial.

- **Code Signing:** Digitally signing software provides users with a reliable way to confirm the software's legitimacy.

- **Integrity Verification:** Providing checksums or hashes empowers users to independently check for file tampering.

- **Security Awareness:** Regularly remind users to download software only from official sources and to verify its integrity.

**In Conclusion:**

The Handbrake compromise was a costly and damaging incident that could have been prevented with stronger security measures in their delivery mechanism. It serves as a cautionary tale for all software developers and highlights the absolute necessity of prioritizing secure software delivery.
