Don't use curl \| bash because there is no trusted maintainer, the URL could redirect (or someone else can take over the domain), network connection is closed, or, it might hide its content via the user-agent check. Invoke-WebRequest for PS not good because it can execute javascript.

[[[About code owners - GitHub Docs]{.underline}]{.mark}](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-code-owners#codeowners-and-branch-protection)

Keep release pipeline artifacts for 30-90 days, and PR/dev pipelines for 3-7 days.

Consider turning on diagnostic logging for storage accounts and other items.

Use 2FA for everything.

Principle of least privilege. [[Best practices for Azure RBAC \| Microsoft Learn]{.underline}](https://learn.microsoft.com/en-us/azure/role-based-access-control/best-practices#only-grant-the-access-users-need)

[[GitHub - dotnet/reproducible-builds: Contains the DotNet.ReproducibleBuilds package]{.underline}](https://github.com/dotnet/reproducible-builds)

Anti-malware scanning for build artifacts

From Microsoft build tools start

https://support.microsoft.com/en-us/windows/antivirus-and-antimalware-software-faq-31f2a46e-fad6-b713-45cf-b9db579973e6#disable_def

https://securitytools.visualstudio.com/Phalanx/\_wiki/wikis/Phalanx/74/Armory

https://github.com/PyCQA/bandit

https://github.com/Microsoft/binskim

https://docs.github.com/en/code-security/code-scanning/creating-an-advanced-setup-for-code-scanning/codeql-code-scanning-for-compiled-languages

https://eng.ms/docs/products/credential-risk-exposure-defense

https://securitytools.visualstudio.com/Phalanx/\_wiki/wikis/Phalanx/756/CSRF

https://github.com/eslint/eslint

https://detekt.dev/

https://github.com/david-a-wheeler/flawfinder

https://github.com/securego/gosec

https://github.com/PowerShell/PSScriptAnalyzer

https://github.com/dotnet/roslyn-analyzers

https://github.com/spotbugs/spotbugs

https://github.com/microsoft/ApplicationInspector

From Microsoft build tools end

Table 1: The Secure Software Development Framework (SSDF) Version 1.1

[[GUAC Docs \| GUAC]{.underline}](https://docs.guac.sh/) and the need to do automated dependency management (manual dependencies are harder to scan)

[[krzko/run-with-telemetry: GitHub Action `run` action with OpenTelemetry instrumentation]{.underline}](https://github.com/krzko/run-with-telemetry)

[[inception-health/otel-export-trace-action (github.com)]{.underline}](https://github.com/inception-health/otel-export-trace-action)

- [[Improve your software delivery with CI/CD observability and OpenTelemetry]{.underline}](https://www.elastic.co/virtual-events/ci-cd-observability-and-opentelemetry)

- [[DevOpsWorld 2021 - Embracing Observability in Jenkins with OpenTelemetry]{.underline}](https://www.youtube.com/watch?v=3XzVOxvNpGM)

- [[DevOpsWorld 2021 - Who Observes the Watchers? An Observability Journey]{.underline}](https://www.cloudbees.com/videos/who-observes-the-watchers-an-observability-journey?wvideo=wv11m4uazu)

- [[Embracing Observability in CI/CD with OpenTelemetry]{.underline}](https://www.slideshare.net/cyrille.leclerc/embracing-observability-in-cicd-with-opentelemetry)

- [[FOSDEM 2022 - OpenTelemetry and CI/CD]{.underline}](https://archive.fosdem.org/2022/schedule/event/opentelemetry_and_ci_cd/)

- [[cdCon Austin 2022 - Making your CI/CD Pipelines Speaking in Tongues with OpenTelemetry]{.underline}](https://www.youtube.com/watch?v=1jDLNNe_TEM)

- [[Observability Guide - Elastic Stack 8.7]{.underline}](https://www.elastic.co/guide/en/observability/current/ci-cd-observability.html)

[[bmwiedemann/theunreproduciblepackage: The Unreproducible Package (github.com)]{.underline}](https://github.com/bmwiedemann/theunreproduciblepackage/tree/master)

[[ftp2.osuosl.org/pub/fosdem/2024/k1105/fosdem-2024-3353-reproducible-builds-the-first-ten-years.mp4]{.underline}](https://ftp2.osuosl.org/pub/fosdem/2024/k1105/fosdem-2024-3353-reproducible-builds-the-first-ten-years.mp4)

[[ftp2.osuosl.org/pub/fosdem/2024/k4401/fosdem-2024-3074-sharing-and-reusing-sboms-with-the-osselot-curation-database.mp4]{.underline}](https://ftp2.osuosl.org/pub/fosdem/2024/k4401/fosdem-2024-3074-sharing-and-reusing-sboms-with-the-osselot-curation-database.mp4)

[[ftp2.osuosl.org/pub/fosdem/2024/k4401/fosdem-2024-3146-phantom-dependencies-in-python-and-what-to-do-about-them-.mp4]{.underline}](https://ftp2.osuosl.org/pub/fosdem/2024/k4401/fosdem-2024-3146-phantom-dependencies-in-python-and-what-to-do-about-them-.mp4)

+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| [[ftp2.osuosl.org/pub/fosdem/2024/ua2220/fosdem-2024-3445-strategic-sampling-architectural-approaches-to-efficient-telemetry.mp4]{.underline}](https://ftp2.osuosl.org/pub/fosdem/2024/ua2220/fosdem-2024-3445-strategic-sampling-architectural-approaches-to-efficient-telemetry.mp4) |
| |
| ![](./images/image49.png) |
| |
| ![](./images/image53.png) |
+========================================================================================================================================================================================================================================================================================+
+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

[[ftp2.osuosl.org/pub/fosdem/2024/ua2220/fosdem-2024-3262-what-is-ci-cd-observability-and-how-to-bring-observability-to-ci-cd-pipelines-.mp4]{.underline}](https://ftp2.osuosl.org/pub/fosdem/2024/ua2220/fosdem-2024-3262-what-is-ci-cd-observability-and-how-to-bring-observability-to-ci-cd-pipelines-.mp4)

[[ftp2.osuosl.org/pub/fosdem/2024/ud2208/fosdem-2024-1805-squash-the-flakes-how-to-minimize-the-impact-of-flaky-tests.mp4]{.underline}](https://ftp2.osuosl.org/pub/fosdem/2024/ud2208/fosdem-2024-1805-squash-the-flakes-how-to-minimize-the-impact-of-flaky-tests.mp4)

[[ftp2.osuosl.org/pub/fosdem/2024/k1105/fosdem-2024-3353-reproducible-builds-the-first-ten-years.mp4]{.underline}](https://ftp2.osuosl.org/pub/fosdem/2024/k1105/fosdem-2024-3353-reproducible-builds-the-first-ten-years.mp4)

[[ftp2.osuosl.org/pub/fosdem/2024/k4401/fosdem-2024-3230-getting-lulled-into-a-false-sense-of-security-by-sbom-and-vex.mp4]{.underline}](https://ftp2.osuosl.org/pub/fosdem/2024/k4401/fosdem-2024-3230-getting-lulled-into-a-false-sense-of-security-by-sbom-and-vex.mp4)

[[ftp2.osuosl.org/pub/fosdem/2024/ub2252a/fosdem-2024-3398-modern-build-systems-for-containers.mp4]{.underline}](https://ftp2.osuosl.org/pub/fosdem/2024/ub2252a/fosdem-2024-3398-modern-build-systems-for-containers.mp4)

[[ftp2.osuosl.org/pub/fosdem/2024/ub5230/fosdem-2024-1909-broom-not-included-curling-the-modern-way.mp4]{.underline}](https://ftp2.osuosl.org/pub/fosdem/2024/ub5230/fosdem-2024-1909-broom-not-included-curling-the-modern-way.mp4)

[[bmwiedemann/theunreproduciblepackage: The Unreproducible Package (github.com)]{.underline}](https://github.com/bmwiedemann/theunreproduciblepackage/tree/master)

https://docs.guac.sh/

## [**ep-3-feature-toggles.mp3**](https://1drv.ms/u/s!AOnf7tByrSaDkzI)

## **Key Points on Feature Toggles:**

**Benefits:**

- **Separation of deployment and release:** Enables deploying code without releasing the feature, allowing for controlled rollouts, A/B testing, and experimentation.

- **Reduced risk:** Allows for safer deployments by hiding incomplete features and enabling quick rollbacks if issues arise.

- **Increased development velocity:** Developers can integrate code more frequently without waiting for a feature to be fully complete.

- **Improved product quality:** Facilitates data-driven development by enabling experiments and collecting user feedback on new features.

- **Empowers product teams:** Gives product owners more control over feature releases and the ability to target specific user segments.

**Getting Started:**

- **Start small:** Choose a non-critical feature for your first experiment with feature toggles.

- **Focus on code structure:** Minimize the amount of code impacted by a toggle and aim for easy removal once the feature is fully released.

- **Collaborate with product:** Educate product owners on the benefits of feature toggles and work together to establish a comfortable workflow.

- **Collect baseline data:** Before introducing a new feature, gather data on existing user behavior to measure the impact of the change.

- **Don't overthink the framework:** Avoid building a complex framework upfront. Start simple and iterate as needed.

**Key Considerations:**

- **Data is crucial:** Use feature toggles to gather data and analyze user behavior to validate hypotheses and make informed product decisions.

- **Technical and business perspectives:** Understand the benefits of feature toggles from both a technical (risk reduction, code quality) and business (experimentation, product evolution) perspective.

- **Tooling can help:** Explore existing tools that can simplify feature toggle management, data collection, and experiment analysis.

**Overall, feature toggles are a powerful tool for continuous delivery, enabling faster and safer releases, data-driven development, and enhanced collaboration between development and product teams.**

## [**[31c3-6240-en-Reproducible_Builds_mp3.mp3](https://1drv.ms/u/s!AOnf7tByrSaDlRE)**](#c3-6240-en-reproducible_builds_mp3.mp3)

## **Reproducible Builds: Closing the Trust Gap in Software Security**

This talk, featuring Mike from the Tor Project and Seth from EFF, delves into the crucial security concept of reproducible builds and its increasing relevance in today's software landscape.

**Key Points:**

- **The Trust Gap:** Free software promises transparency, but verifying that a binary matches the source code relies on trust in developers and infrastructure. This trust gap exposes users to potential vulnerabilities and malicious code.

- **Why Developers Are Targets:** Developers' computers and build servers, while often assumed secure, are attractive targets for attackers seeking to compromise widely used software and gain access to millions of machines.

- **Reproducible Builds as a Solution:** Reproducible builds ensure that anyone can generate an identical binary from the source code, eliminating the single point of failure of the developer's machine and making it significantly harder to inject malicious code undetected.

- **Examples & Implementations:** The talk highlights successful implementations of reproducible builds, including:

  - **Tor Browser:** Leveraging the Gideon system for reproducible builds across different platforms.
  - **Debian:** Achieving reproducible builds for a significant portion of its package repository.
  - **F-Droid:** Developing a verification server to enhance trust in Android packages.

- **Addressing the Trusting Trust Attack:** Reproducible builds, combined with techniques like diverse double compilation, offer a way to mitigate the "trusting trust" attack where backdoors can be hidden in compilers and propagate through software generations.

- **Challenges & Future Directions:**
  - Reproducibility efforts require addressing challenges like build environment variations, timestamps, and file system inconsistencies.
  - Ensuring software update distribution integrity is crucial and can be enhanced using technologies like blockchain and certificate transparency.
  - Continuous improvement and adoption of reproducible builds across the software development community are vital for a more secure and trustworthy software ecosystem.

This talk effectively emphasizes the importance of reproducible builds for enhancing software security and encourages developers and users to champion this practice for a more trustworthy digital future.

## [**1w7qpw29ni6lnbex9gksl5y6d961.mp3**](https://1drv.ms/u/s!AOnf7tByrSaDkzU) {#w7qpw29ni6lnbex9gksl5y6d961.mp3 .unnumbered}

## **Key Points from the Continuous Delivery Podcast: Complexity** {#key-points-from-the-continuous-delivery-podcast-complexity .unnumbered}

This episode explores complexity in software development from various angles.

**What is complexity?**

- **Difficulty in completion:** Many dependencies, unreachable stakeholders, and external factors contribute to complexity.

- **Unpredictability:** Inability to foresee how changes will impact the system.

- **Effort disproportionate to change:** Simple changes requiring extensive coordination and effort.

- **Codebase intricacy:** Difficulty understanding code structure, duplication, and fear of unintended consequences.

**Causes of complexity:**

- **Technical debt and legacy code:** Messy, poorly architected codebases.

- **Overly complex frameworks:** Using "one size fits all" solutions that introduce unnecessary dependencies.

- **Designing for unknown future:** Building features for anticipated needs instead of focusing on current requirements.

- **Organizational structure:** Conway's Law - system complexity mirrors organizational complexity. Poorly architected systems reflecting organizational changes.

**Combating complexity:**

- **Merciless refactoring:** Continuously simplify code, keeping methods and classes small.

- **True DevOps adoption:** Empowering developers to build automation and simplify workflows and environments.

- **Tight feedback loops:** Short planning cycles with frequent feedback from product and end-users.

**Identifying and tracking complexity:**

- **Cyclomatic complexity, maintainability index, and other static code analysis tools.**

- **Time to implement changes:** Increasing time indicates growing complexity.

- **Throughput measurement:** Low throughput can be a symptom of a complex system.

- **Number of code changes to fix a bug:** Multiple changes for a single bug suggest a complex system.

**Other important points:**

- **Cynefin framework:** A model for understanding and addressing complexity based on the nature of the problem.

- **Stacy complexity matrix:** Applying the Cynefin framework to system design.

- **Complexity impacts the entire organization:** From development teams to organizational structure.

**Call to action:**

- Join the Continuous Delivery Podcast LinkedIn group.

- Follow the podcast on Twitter: @continuouspod.

## [**9514875-ep-62-overcoming-blockers-to-continuous-delivery.mp3**](https://1drv.ms/u/s!AOnf7tByrSaDkz8) {#ep-62-overcoming-blockers-to-continuous-delivery.mp3 .unnumbered}

## **Key Points from Continuous Delivery Podcast: Overcoming Blockers** {#key-points-from-continuous-delivery-podcast-overcoming-blockers .unnumbered}

This episode discusses common obstacles to achieving Continuous Delivery and offers solutions:

**Problems:**

- **Penetration Testing as a Bottleneck:** Expensive external pen-testing done in large batches slows down frequent deployments.

- **Bureaucracy in Tool Acquisition:** Lengthy procurement processes for essential tools delay Continuous Delivery initiatives by months.

- **Fear and Perceived Lack of Freedom:** Blame culture and the perception that individuals can't effect change stifle innovation and experimentation.

- **Outdated Policies:** Rigid policies, like code freezes or mandatory handoffs, create waste and hinder agility.

- **Lack of Slack:** Overbooked schedules and a lack of breathing room prevent teams from experimenting and improving processes.

**Solutions:**

- **Challenge Assumptions and Policies:** Question the necessity of policies like blanket pen-testing for every change.

- **Focus on Education and Collaboration:** Empower developers with security knowledge and work with operations teams to automate deployments.

- **Start Small with Experiments:** Find a low-risk area to pilot new practices and build trust with stakeholders.

- **Iterative Improvement and Automation:** Gradually automate processes and policies to reduce manual work and increase efficiency.

- **Leadership Buy-In and Evangelization:** Secure leadership support to champion Continuous Delivery and overcome organizational resistance.

- **Build Trust Through Collaboration:** Involve operations teams early in the development process and work together to create robust deployment practices.

- **Emphasize the Importance of Slack:** Advocate for dedicated time to experiment, learn, and improve processes, ultimately paving the way for Continuous Delivery.

**Overall Conclusion:**

While technical challenges exist, the most significant roadblocks to Continuous Delivery are often rooted in organizational culture, outdated policies, and a lack of slack. Overcoming these obstacles requires a shift in mindset, open communication, and a commitment to continuous improvement.

## [**[default_tc.mp3](https://1drv.ms/u/s!AOnf7tByrSaDlAE)**](#default_tc.mp3)

## **Key Points from Agile Embedded Podcast with Jonathan Hall:**

**Topic:** Implementing Continuous Delivery in Reverse (Skipping Automated Tests Initially)

**What is Continuous Delivery (CD)?**

- CD is the practice of delivering software changes on a continual basis, making a deployable artifact ready automatically upon each change.
- It does **not** necessarily mean automatic deployment to production, but having the option to.
- Requires Continuous Integration (CI) as a prerequisite, which itself relies on Trunk-Based Development.

**Continuous Delivery in Reverse:**

- **Start with the desired outcome:** Automate the deployment process first (even if just to a test environment), then work backwards.
- **Shift testing left of the merge:** All testing, even manual, should be completed **before** merging code to the main branch.
- **Don’t rely on batched releases:** Testing becomes more focused and effective when done on individual features, not a collection of changes.

**Benefits:**

- **Forces identification of bottlenecks:** Highlights inefficiencies in the existing testing process.
- **Encourages streamlined testing:** Promotes the adoption of smaller, more focused test suites tailored to specific changes.
- **Empowers developers:** Leads to developers becoming more involved in testing, improving code quality and ownership.
- **Enables faster feedback loops:** Allows for quicker responses to customer feedback and faster iteration cycles.

**Addressing Concerns:**

- **Trusting automated testing:** Start by replicating the existing manual process with automation, even if it doesn't fully replace it.
- **Regulated industries (e.g., medical devices):** Continuous delivery can streamline regulatory compliance by providing auditable, automated test reports.
- **Legacy code:** Prioritize adding tests when making changes to existing code, focusing on areas where confidence is low.

**Overall Message:**

- Continuous delivery is achievable in various contexts, including embedded systems.
- Shifting testing left of the merge, even manual testing, is crucial.
- Focus on building trust in the system and iteratively improving the process.

[[pipelines.mp3](https://1drv.ms/u/s!AOnf7tByrSaDlAI)]

The podcast episode provides a comprehensive guide on adopting CI/CD for your organization. Here’s a breakdown of the steps involved:

**Prerequisites:**

1. **Version Control:** Ensure your codebase is under version control (like Git). This is crucial for tracking changes and enabling collaboration.
2. **Command-Line Builds:** Make sure you can build your project from the command line without manual IDE interaction. This forms the basis for automated builds.

**Initial Setup:**

1. **Basic Build Pipeline:** Start by setting up a simple pipeline that:
   - Builds your project for all targets and release types (debug, release, etc.).
   - Sends email notifications if a build fails.
2. **Discipline:** Cultivate a culture of addressing build failures immediately. A broken pipeline loses its value if ignored.

**Enhancing the Pipeline:**

1. **Static Analysis:** Integrate static analysis tools (like Cppcheck) to enforce coding standards and catch potential issues early on. Choose an existing standard with readily available rule sets to avoid reinventing the wheel.
2. **Unit Testing:** Gradually introduce unit tests, prioritizing new code and high-risk areas. Aim for incremental improvements in code coverage.
3. **Code Formatting:** Enforce consistent code formatting using automated tools. This minimizes stylistic debates and keeps the codebase clean.

**Advanced Techniques:**

1. **Metrics and Dashboards:** Track code metrics (build time, binary size, code coverage, etc.) over time to gain insights into your project’s health. Visual dashboards can make these trends easily digestible.
2. **On-Target Testing:** Set up automated testing on your target hardware. This might require dedicated devices or scheduled overnight runs. Script the flashing, testing, and result parsing to gain confidence in your deployment process.

**General Principles:**

- **Start Small, Iterate:** Begin with a minimal setup and gradually add features.
- **Treat Scripts as Code:** Write clean, well-documented build scripts that are easy for humans to understand.
- **Containerization (Docker):** Consider using containers to simplify environment setup and ensure consistency across development machines and build servers.
- **Single Source of Truth:** Avoid duplicating logic between build scripts and the pipeline itself. Keep all essential information within version control.
- **Embrace Feedback:** Pay attention to pipeline failures and address them promptly. The system is there to help you catch issues early.

**Key Takeaways:**

The benefits of CI/CD extend beyond just faster builds. By implementing these practices, you build trust in your process, improve code quality, and gain valuable documentation along the way. Remember, the journey to a robust CI/CD system is iterative. Start small, build incrementally, and always strive to learn and adapt.

Makefile Example

Here's a simple makefile that demonstrates dependencies and compilation for a C program:

```

main.o: main.c mathFunctions.h utilFunctions.h

gcc -c main.c

utilFunctions.o: utilFunctions.c utilFunctions.h

gcc -c utilFunctions.c

mathFunctions.o: mathFunctions.c mathFunctions.h

gcc -c mathFunctions.c

```

This format allows developers to easily manage and scale complex projects with numerous dependencies.

**Aside start**

IDE-Specific Build Processes

Different IDEs manage build processes uniquely, often abstracting complex commands into user-friendly interfaces with detailed logs available for troubleshooting. For instance, Visual Studio provides build command details through its verbosity settings, while IntelliJ IDEA and Eclipse offer insights via built-in terminals and verbose output settings. Xcode allows developers to track build commands and order through the \"Report Navigator.\"

Different Integrated Development Environments (IDEs) have varied ways of presenting build commands and the order in which they\'re run. Here are instructions for a couple of popular IDEs:

[[Debugging in Visual Studio Code]{.underline}](https://code.visualstudio.com/docs/editor/debugging) (i.e., launch.json file)

1\. **Visual Studio (for C++/C#)**:

- **Build Commands**: Visual Studio uses `msbuild` for building its projects. To see the exact build commands:

1\. Go to the \"Tools\" menu.

2\. Select \"Options.\"

3\. Navigate to \"Projects and Solutions\" -\> \"Build and Run\".

4\. In the \"MSBuild project build output verbosity\" dropdown, select \"Detailed\" or \"Diagnostic\" to increase the verbosity of the build output.

- **Build Order**: The build order can also be observed in the output window when you build the solution, especially if you\'ve set the verbosity to \"Detailed\" or \"Normal.\"

![](./images/image45.png)

The build log might have many things. This is normally useful for troubleshooting, it's less likely that you'll need to provide manual commands. If you have a legacy project, or it's complex, then you might need to provide custom commands.

2\. **IntelliJ IDEA (for Java)**:

- **Build Commands**: IntelliJ IDEA uses its own builder, but you can see the build commands if you\'re using Maven or Gradle by looking at the output when you run the respective build lifecycle or task.

1\. Open the \"Terminal\" tab (usually at the bottom).

2\. Run your build tool command, e.g., `mvn compile` for Maven.

3\. The executed commands will be printed in the terminal.

- **Build Order**: If you\'re using a build tool like Maven, the build lifecycle phases determine the order. For a default Java project in IntelliJ, the IDE handles this, and you can infer the order by observing the messages in the \"Build\" tool window.

3\. **Eclipse (for Java)**:

- **Build Commands**: Eclipse uses its own builder for Java. To see detailed build info:

1\. Go to \"Window\" -\> \"Preferences.\"

2\. Navigate to \"General\" -\> \"Workspace\".

3\. Check \"Enable verbose output for the build.\"

- **Build Order**: Eclipse handles the order internally for Java builds. For more detailed projects, you\'d likely be using a tool like Maven, in which case the build lifecycle phases determine the order.

4\. **Xcode (for C++/Swift/Objective-C)**:

- **Build Commands**:

1\. Go to \"Xcode\" in the top menu.

2\. Select \"Preferences.\"

3\. Navigate to \"Locations\" tab.

4\. Set the \"Derived Data\" location to \"Relative\".

5\. After building, in the \"Report Navigator\" (rightmost tab in the left pane), you can see the build logs. Click on the latest build under the \"Build\" section.

- **Build Order**: This is determined by the dependencies set up in your project. You can observe this order in the build logs in the \"Report Navigator\" after a build.

For all these IDEs, reading the output or log pane during a build will give you a good sense of the commands executed and their sequence.

**Aside end**

### Selecting build tools {#selecting-build-tools .unnumbered}

Tips on selecting build tools:

- "Favor specific, portable tools over hacking"

  - ChatGPT summary of paper explanation: "A CI bad smell arises from a sub-optimal selection of tools in the CI pipeline, which can lead to delays and force developers to adopt hacking solutions like custom shell scripts. These scripts may initially solve the problem but can later cause maintainability and portability issues. To avoid this, developers should use suitable plugins instead of shell scripts and be cautious of different versions of tools conflicting with each other on the same server."

- "Do not use out-of-the-box tools, nor listen customers only"

  - ChatGPT summary of paper explanation: "Proper configuration of tools is essential in software development, and using external tools with default configurations is a bad practice. Involving developers in defining quality gates is crucial, as relying solely on customer requirements may lead to irrelevant warnings and slow down the CI process. Quality gates should be established with input from both developers and customers to ensure an efficient and effective CI process."

- Build scripts are highly dependent upon the IDE (BM2)

  - " The two most positively assessed bad smells were related to the usage of absolute paths in the build (BM1), and the coupling between the build and the IDE (BM2). The high perceived relevance of such smells is justified considering that their presence 26 Fiorella Zampetti et al. will unavoidably limit the portability of the build resulting in statements such as "but it works on my machine"."

  - Certain IDEs install their build and compilation software in hard-coded locations that may or may not be used by the configuration files in the program. This means that other people who use different IDEs may not have those exact same paths, which makes the application IDE dependent. This can cause issues with portability, as the CI server must also be set up exactly the same, which isn't guaranteed (as the workspace folder is usually dynamic.) This can cause configuration errors.

  - Might be hard to collaborate and share configuration with others, as configuration is mixed in with personal preferences and build settings that are required for the application to run. This can also make it difficult for other people to use their IDEs.

  - If the builds are too dependent on the IDE, then it might be difficult to run them or reproduce the environment on CI. This is because the IDE may have custom settings, or special versions of software, that are specific to a single developer. Or, they may be using environment variables injected at build time that the CI does not use. This can change application behavior and make it difficult to build.

Normally, the type of project you are trying to build can be determined via a few heuristics. First, you can try using github-linguist to determine what programming languages are used in the project the most frequently. Programming languages that are commonly used help indicate which type of project it is.

- Java is code -\> byte code -\> run it on JVM

- Python is code -\> interpreted by interpreter

- C# write code -\> compile -\> dll (or exe), if dll then it is included (optionally) as part of another program

- There are many ways in which your IDE can be configured. These are the most common build tools for most projects. Consult the documentation for your IDE for more specific instructions, such as if you use special build steps or plugins

+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Use github-linguist to determine what type of project you're running. A project might contain many different languages; this gives you a high level overview of where to start in terms of build script. |
| |
| In this case, this is clearly a TypeScript project. It also has a packages.json file, indicating that it is an npm project. |
| |
| alex@DESKTOP-7M8V9ET:/dev/shm\$ github-linguist angular-cli/ |
| |
| 94.69% 3661931 TypeScript |
| |
| 2.60% 100620 Starlark |
| |
| 1.36% 52459 JavaScript |
| |
| 0.77% 29939 HTML |
| |
| 0.33% 12624 EJS |
| |
| 0.21% 8143 Shell |
| |
| 0.03% 1281 jq |
| |
| 0.00% 160 CSS |
| |
| 0.00% 36 SCSS |
+==========================================================================================================================================================================================================+
+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

For binary releases, use a coherent branch strategy, often creating a release branch from the development branch. Use cherry picks carefully to maintain clean commit history. Each pull request typically has its own branch.

- For dependency management, inventory all dependencies and explicitly show versions in the code to ensure build consistency.

- Explicit versioning is crucial because relying on the latest version of a package can introduce unforeseen breakages, making debugging and historical comparisons difficult. Always specify the version of your libraries to ensure consistency across development environments.

- Automate the developer environment setup with scripts or containers to save time and avoid inconsistencies. Use dev containers as much as possible

- For testing, ensure the pipeline runs tests without manual intervention. Avoid modifying code in the pipeline to ensure consistency with local tests. Local development environments should support running tests without relying on CI.

- Building, deploying, and releasing are all separate things.

- Integration tests should focus on use cases rather than internal functions. Performance tests should minimize noise and avoid shared resources. End-to-end tests should run post-deployment, with known failures documented.

- Version skew tests verify compatibility between different versions running simultaneously. Rollback tests ensure smooth reversion if needed, while partial failure tests confirm resilience under resource constraints.

- For multi-region deployments, simulate region failures to test failover and recovery. Automate the process to ensure compliance with SLAs.

- Relate software bugs to commits for effective root cause analysis. Use tools like Git bisect to identify and address issues.

- Balance leadership demands for testing and rapid deployment by understanding incident impact, notifying customers, and conducting post-mortem analyses for continuous improvement. Create a troubleshooting guide to document symptoms, mitigation steps, and communication protocols to streamline issue resolution.

- Create a script to get a list of changes/commits/prs from the last release to this release, sometimes releases are posted in a chat channel if you are practicing continuous delivery
  You're right, Handbrake, a popular open-source video transcoder, suffered a serious security breach in 2017 that compromised their download servers. It serves as a stark reminder of how critical secure delivery mechanisms are.
- Projects may have dependency manifests, which are specific to a certain programming language or project type. Check to see which file(s) exist in the root directory of your project.

- The most important part of making sure that your application is fit for release is to make sure that it compiles. If code does not compile, then other developers cannot integrate on top of your work, because they can't compile their own code. Compiling the code makes sure that the build artifacts can be generated. Without compiling, errors can be slowly introduced into the codebase, which makes other developers unable to test their work.

### Dependabot and updating your dependencies {#dependabot-and-updating-your-dependencies .unnumbered}

Setting up Dependabot in your GitHub repository helps automate the process of dependency updates, ensuring that your project regularly receives the latest patches and versions of libraries and packages, which can improve security and performance.

Typically, the alerts have a priority associated with them, such as critical and high. You can start by addressing the critical and high priority alerts if you are receiving a lot of alerts initially.

#### High Toil Tasks:

- **Managing Dependabot Alerts**:

  - **High Volume**: Many repositories, especially those with numerous dependencies, can be flooded with Dependabot alerts, making it difficult to triage and address them efficiently.
  - **False Positives**: Sometimes Dependabot flags updates that aren't actually necessary or compatible, leading to unnecessary investigations.
  - **Manual Merging**: Even if an update is desired, manually reviewing and merging every Dependabot PR can be tedious.

- **Troubleshooting Failing Workflows**:

  - **Unclear Error Messages**: Cryptic error messages can make it difficult to pinpoint the root cause of a failure, leading to time-consuming debugging.
  - **Inconsistent Environments**: Differences between development, testing, and production environments can cause unexpected workflow failures that are hard to reproduce and fix.
  - **Lack of Monitoring/Logging**: Insufficient logging or monitoring can make it difficult to track down the source of errors and understand workflow behavior.

- **Maintaining Self-Hosted Runners**:

  - **Infrastructure Management**: Setting up, maintaining, and securing self-hosted runners requires ongoing effort, especially for complex or distributed environments.
  - **Resource Scaling**: Manually scaling runner resources to meet fluctuating demands can be tedious and inefficient.
  - **Software Updates**: Keeping runners up-to-date with the latest software and security patches can be time-consuming.

- **Managing Secrets and Credentials**:
  - **Manual Rotation**: Regularly rotating secrets and credentials manually can be error-prone and time-consuming.
  - **Insecure Storage**: Storing secrets insecurely or hardcoding them into workflows creates significant security risks.
  - **Auditing and Access Control**: Monitoring access to secrets and ensuring proper auditing can be challenging without robust tooling.

#### Reducing Toil:

Here are strategies to mitigate toil in GitHub Actions:

- **Dependabot Automation**:

  - **Auto-merge**: Configure Dependabot to automatically merge updates for certain dependencies or version ranges that are considered low-risk.
  - **Ignore Rules**: Define ignore rules to filter out unwanted Dependabot alerts for specific dependencies or versions.
  - Make sure that they are merged frequently. This will help prevent major versions from being upgraded, which could likely introduce breaking changes.
  - **Grouped Updates**: Enable Dependabot to group related updates into a single PR to reduce the number of PRs to review.
  - Sometimes upgrading a single package will upgrade many. There are more instructions later on in the next chapters.

- **Improved Troubleshooting**:

  - **Structured Logging**: Implement standardized logging practices to capture useful information for debugging.
  - **Centralized Monitoring**: Use monitoring tools to get real-time visibility into workflow performance and identify issues quickly.
  - **Environment Standardization**: Minimize differences between environments to reduce the likelihood of unexpected errors.

- **Self-Hosted Runner Management**:

  - **Containerization**: Use containers to simplify runner setup and management, ensuring consistent environments.
  - **Infrastructure-as-Code**: Manage runner infrastructure with code (e.g., Terraform) for automation and reproducibility.
  - **Autoscaling**: Implement autoscaling solutions to dynamically adjust runner capacity based on demand.

- **Secrets Management**:
  - **Dedicated Secrets Manager**: Use a dedicated secrets management solution for secure storage, access control, and automated rotation.
  - **Environment Variables**: Leverage environment variables to inject secrets into workflows securely.
  - **GitHub Actions Secrets**: Use GitHub's built-in secrets management functionality for simple use cases.

By proactively addressing these potential sources of toil, you can significantly improve the efficiency and manageability of your GitHub Actions workflows.

Here's how you can set up Dependabot for your repository:

#### Step 1: Access Your GitHub Repository

Navigate to the GitHub repository where you want to enable Dependabot.

#### Step 2: Create a Dependabot Configuration File

You need to create a `.github/dependabot.yml` file in your repository to configure Dependabot settings.

1. **Create a New File**:

   - Navigate to your repository on GitHub.
   - Click "Add file" > "Create new file".
   - Set the path to `.github/dependabot.yml`.

2. **Add Configuration to the File**:

   ```yaml
   version: 2
   updates:
     - package-ecosystem: "npm" # See documentation for other package ecosystems
       directory: "/" # Location of package manifests
       schedule:
         interval: "weekly" # Options: "daily", "weekly", "monthly"
       open-pull-requests-limit: 10 # Maximum number of open pull requests
       commit-message:
         prefix: "chore" # Prefix for the commit message and pull request title
         include: "scope" # Include the scope of the dependency in the commit message
       ignore:
         - dependency-name: "express" # Example: ignore updates for express
           versions: ["4.x.x"]
   ```

   Modify the `package-ecosystem`, `directory`, and other fields as per your project's requirements.

#### Step 3: Commit the Configuration File

- After entering your configuration into the `dependabot.yml` file:
  - Scroll down to the "Commit new file" section at the bottom of the page.
  - Enter a commit message and description if needed.
  - Choose whether to commit directly to the main branch or create a new branch and pull request.
  - Click "Commit new file" or "Propose new file" if you're creating a pull request.

#### Step 4: Dependabot Activation

Once the `dependabot.yml` file is committed, GitHub automatically recognizes and activates Dependabot based on the settings you've defined. Dependabot will begin checking for updates and will open pull requests according to the schedule you've set.

#### Step 5: Review and Merge Pull Requests

- Dependabot will raise pull requests when it finds updates.
- Review these pull requests to ensure compatibility and test them as per your project's standards.
- Merge the pull requests to update the dependencies in your project.

#### Additional Configurations

You can customize Dependabot to ignore certain dependencies, apply labels automatically to pull requests, configure assignees, and more. For advanced configurations and specific settings for different ecosystems (like Maven, NuGet, Docker, etc.), refer to the [Dependabot documentation](https://docs.github.com/en/code-security/supply-chain-security/keeping-your-dependencies-updated-automatically/configuration-options-for-dependency-updates).

Setting up Dependabot not only helps maintain your project's dependency health but also improves security by ensuring that vulnerabilities are patched promptly through dependency updates.

### Budgeting and cost management {#budgeting-and-cost-management .unnumbered}

![](./images/image50.png)

Make sure that your workflows don't run unnecessarily long by frequently checking how long they take. There are actions and ways to monitor typical workflow duration. It's normal for the duration to increase as the project grows because there's more code to compile.

You can also limit the total length of time on your workflow from the default 12 hours to potentially one or two hours, depending on how long they normally take. If they get stuck, you'll be wasting money.

Another approach is to set concurrency to one if the workflow might be running multiple times in the same PR, in which case there's only one job that will be used for its output. You may also want to set concurrency to one if you're doing a deployment; you don't want multiple deployments happening concurrently, which could cause a race condition.

Additionally, make sure to compress your artifacts when you upload them. Adjust the retention period so they're not retained too long or too short. For pull requests, you might retain artifacts for a day or even less. Since you get charged for storage space in GitHub Actions, be careful about what you're storing in artifacts. Anything not required for deployment should be excluded or simply logged.

If you're really running out of space and budget, you may need to remove any artifacts that haven't been deployed, but otherwise it's usually not a problem.
/// End of Selection

```

```
