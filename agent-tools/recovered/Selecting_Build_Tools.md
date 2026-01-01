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

- Java is code -> byte code -> run it on JVM

- Python is code -> interpreted by interpreter

- C# write code -> compile -> dll (or exe), if dll then it is included (optionally) as part of another program

- There are many ways in which your IDE can be configured. These are the most common build tools for most projects. Consult the documentation for your IDE for more specific instructions, such as if you use special build steps or plugins

+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Use github-linguist to determine what type of project you're running. A project might contain many different languages; this gives you a high level overview of where to start in terms of build script. |
| |
| In this case, this is clearly a TypeScript project. It also has a packages.json file, indicating that it is an npm project. |
| |
| alex@DESKTOP-7M8V9ET:/dev/shm$ github-linguist angular-cli/ |
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


