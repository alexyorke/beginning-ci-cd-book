## Introduction {#introduction .unnumbered}

Many developers and organizations embark on their journey with Continuous Integration and Continuous Deployment (CI/CD) full of optimism, yet the real-life experiences of countless developers reveal that the path to mastering CI/CD is fraught with complications, unexpected setbacks, and sometimes overwhelming obstacles. As we strip away the buzz and the lofty claims about CI/CD revolutionizing development, we often find developers entangled in tedious manual setups, scrambling to manage breakdowns in production, hindered by team silos, and grappling with complex, fragile systems.

This book is an endeavor to peel back the layers of CI/CD, moving beyond mere automation and frequent code merging. We aim to guide you through the intricacies of what CI/CD truly entails and how to implement it effectively using GitHub Actions as a practical example. While the theory of CI/CD promises streamlined operations and faster deployments, the reality involves navigating through a myriad of challenges that can stymie even the most determined teams.

Whether you are a seasoned developer familiar with the pitfalls or a newcomer eager to implement CI/CD in your projects, this guide seeks to offer not just the technical know-how but also insights into the human elements vital for success. It delves into version management, artifact handling, testing strategies, and common pitfalls, all while emphasizing the importance of team dynamics and process integration.

In this journey, you will learn not only to set up a basic pipeline but also to understand the nuances that can either hinder or enhance your team's productivity. By demystifying the complexities and optimizing your CI/CD approach, this guide aims to equip you with the tools to move beyond the peak of inflated expectations toward a plateau of productivity, regardless of whether you\'re working in a team environment or as a single developer seeking to leverage the automation and efficiency that CI/CD offers.

What is CI/CD?

#### Continuous Integration (CI) {#continuous-integration-ci .unnumbered}

The first step is continuous integration. Breaking this down, continuous means often or as frequently as possible in integration means the act of combining multiple disparate pieces into a whole. **Integration is the act of constantly merging your changes with other developers', and vice-versa. It's the act of combining multiple changes, from multiple developers, into a single, cohesive whole, regularly.** All developers work on a shared codebase. The product owner or another person (internally) should be able to use your app, or another team can demo their feature--it might not be finished but the application still works as intended.

#### Continuous Deployment (CD) and Continuous Development (CD) {#continuous-deployment-cd-and-continuous-development-cd .unnumbered}

**Continuous Deployment** (often confused with Continuous Delivery) is the practice where every change that passes the automated tests and other confidence-inducing procedures is **automatically deployed** into the production environment with little to no human intervention.

**Continuous Delivery**, on the other hand, ensures that the code is always in a deployable state, but **it may not be deployed to production automatically. Instead, it might require manual approval.** It provides the business with the opportunity to deploy at any point. Continuous delivery is not simply an automated pipeline for on-demand deployment. For example, code in long-lived feature branches necessitates retrieving specific versions or bug fixes that require complex version control, which can disrupt other work. Or, the build requires a special ceremony, such as complex testing, an implicit contract with another service that has to be deployed in a certain order, manually run scripts, manual checks, etc. This indicates the code base is not always deployable, thus not fully meeting continuous integration principles. This also includes necessary automated testing to ensure its capacity to be deployed continuously.

Deployments are technical events managed by engineering, releasing (making those features usable by customers) is both an engineering and business thing.

CD isn't all or nothing. See the appendix for more information on how to migrate a legacy application to CI/CD.

1\. Evergreen Applications (e.g., web apps):

Automatically serve the latest version, no user intervention needed.

Users are always up-to-date.

2\. Thick Clients:

Require manual updates, often with application restarts.

Updates can be major or minor.

Users may delay or skip updates, leading to version fragmentation.

3\. Hybrid Approaches:

Some applications (e.g., web browsers) auto-update in the background, prompting users only for major updates.

Others (e.g., communication tools) automatically apply minor updates but offer manual updates for significant changes (e.g., new UI).

Continuous Delivery and Version Management:

With continuous delivery, especially for thick clients, managing updates becomes crucial. Options include:

Scheduled updates: Automatically check for updates daily or weekly to avoid overwhelming users.

Version support: While technically supporting multiple versions is necessary, auto-updating minimizes the need to actively maintain older versions.

Evergreen applications and API Versioning:

Evergreen applications generally don\'t require strict versioning as users are constantly updated.

However, for applications with APIs, versioning ensures backward compatibility and prevents breaking changes for existing users.

#### CI/CD {#cicd .unnumbered}

CI/CD aims to avoid \"integration hell\" by ensuring continuous integration and either continuous delivery or deployment. Work is constantly merged into the main/master branch after it has been verified via code review and the continuous integration pipeline. This involves practices like trunk-based development, where all developers work on a shared branch, promoting constant integration and minimizing merge conflicts.

Personally accepted way to do continuous integration and development. Each company and team will have a slightly different interpretation of it. It isn\'t necessarily a rule or regulation, much like finances.

**Aside:** I've heard that some companies deploy a hundred times a day. Isn't deploying a thousand times a day even better? The act of deploying in continuous deployment is automated, thus, it occurs after every change if it meets the quality criteria. Frequent deploys are common because there is less of a delta between the last known good (LKG) version and the new version. Therefore, if there was a bug, then the changeset is much smaller and it is clearer what the root cause is. It also means that deployments occur quickly and so if there is a bug, then it can be reverted or re-deployed quickly which will reduce profit loss for the business. It also instills more confidence in the deployment process, if you've done it thousands of times then the process is likely robust.

It requires both technical and cultural shifts, including:

-   Smaller work units: Breaking down features into independently deployable and testable components.

-   Modular codebase: Facilitating localized changes without impacting the entire application.

-   Focus on rapid feedback: Prioritizing quick delivery of changes and gathering customer insights.

Here is what the software development process looks like when using CI/CD. Note that many of these processes are automated.

### ![](./images/media/image3.png){width="6.546875546806649in" height="4.348610017497813in"} {#section .unnumbered}

### Why is CI/CD important? {#why-is-cicd-important .unnumbered}

Several books introduce the concept of integration within software development, explaining its role in accelerating development processes and boosting efficiency.

Core Benefits:

-   Faster Development and Deployment: CI/CD enables rapid deployment of small changes, accelerating development and deployment cycles, allowing businesses to be more agile and responsive to customer needs.

-   Improved Code Quality: Continuous integration, automated testing, and code review practices built into CI/CD processes lead to higher-quality code and more reliable software.

-   Increased Collaboration and Transparency: CI/CD encourages collaboration between developers, operations, and QA teams, fostering shared understanding and transparency throughout the development lifecycle.

```{=html}
<!-- -->
```
-   Decoupling of Integration, Deployment, and Release: CI/CD separates these stages, allowing for flexibility in releasing features and testing in production without impacting users.

-   Enhanced Confidence in Changes: Automated testing and build pipelines provide developers with a higher level of confidence in their code, reducing the risk of introducing bugs.

-   Improved Estimation Accuracy: By deploying frequently, teams gain a better understanding of the development process, leading to more accurate estimations.

-   Streamlined Workflow: Automation eliminates manual processes, smoothing workflows, and allowing developers to focus on core development tasks.

-   Support for Experimentation and Innovation: Feature flags enable controlled experimentation and incremental rollouts, allowing teams to test new features and gather feedback without risking the entire application.

Despite these benefits, several challenges can hinder successful CI/CD implementation:

-   Zero-Downtime Deployments: Achieving seamless deployments while managing resources and data integrity requires strategies like blue-green deployments, canary releases, and feature flags.

-   Database Schema Impacts: Even small code changes can disrupt database schemas, necessitating schema migration tools and a disciplined approach to database management.

-   Central Point of Failure: CI/CD creates a central point of failure that demands constant vigilance. Maintaining a \"green\" pipeline requires rigorous testing, code review, and ongoing maintenance to ensure stability and compliance. Do not rubber stamp PRs.

-   Culture Shift: CI/CD requires a shift in mindset, emphasizing collaboration, shared responsibility, and open communication across teams. This will exaggerate any communication issues, if they exist.

-   Continuous Learning: Teams must invest in ongoing training, keeping their skills up-to-date with evolving CI/CD technologies and security best practices.

-   Clear Objectives: A lack of clarity regarding CI/CD goals can lead to resistance and misaligned expectations. It\'s crucial to define objectives, communicate the value proposition, and secure stakeholder buy-in.

CI/CD is not a magic bullet. It demands discipline, commitment to quality, and a proactive approach to addressing technical and organizational challenges. However, when implemented effectively, it can significantly accelerate development, enhance software quality, and empower teams to deliver value more efficiently.

To ensure successful CI/CD implementation, it\'s critical to identify and avoid common anti-patterns:

-   Ignoring build failures leads to technical debt and compromised software quality. In a CI/CD environment, where testing is continuous, it\'s crucial to address failures immediately to maintain a \"green\" pipeline. This ensures code is always validated and deployable.

-   Optimize build configurations and implement cleanup strategies.

-   Utilize caching mechanisms to speed up builds.

-   Don\'t skimp on compute resources -- developer time is more valuable than saving a few cents on a faster build server.

-   Robust notification systems are essential to alert stakeholders about build failures, enabling prompt resolution and collaboration. For example, some stakeholders want to be notified by e-mail if the build fails, and some other ones want to be notified if there\'s a sev one and nobody can use a website.

-   A well-defined rollback strategy is crucial for mitigating production issues. This doesn\'t always mean reverting to a prior state, but requires a clear plan for applying hotfixes quickly and effectively, even when database migrations complicate the process.

-   Stateful build environments, even when virtualized, introduce security risks:

    -   Reusing machines can allow malware to spread (lateral movement).

    -   Compromised packages can contaminate build artifacts.

-   Mitigate these risks by:

    -   Using ephemeral build environments whenever possible.

    -   Continuously updating packages with tools like Dependabot.

    -   Implementing robust security scanning and dependency analysis.

CI/CD implementation is not a one-time event but rather a continuous journey of learning and improvement. As the number of pipelines grows, effective management becomes vital to prevent sprawl and maintain consistency. Strategies for standardization, modularization, and lifecycle management are crucial. Consider:

-   Pipeline Templates: Adopt a standardized template that all teams extend, ensuring consistency and compliance.

-   QA Integration: Close collaboration between QA and development teams is essential. Involve QA early, automate tests, and embrace a \"shift-left\" approach to ensure quality throughout the CI/CD process.

-   Clear Metrics: Establish key metrics, like deployment frequency, lead time, change failure rate, and mean time to restore (MTTR), to track progress, measure impact, and drive continuous improvement. These are also called "DORA" metrics.

-   Ensuring that security issues are addressed timely.

### Traditional software development {#traditional-software-development .unnumbered}

Traditional software development is a methodology that is difficult to define because there\'s multiple definitions of what traditional means. This usually means before continuous integration and development was widely popularized, for example prior to 2010.

Traditional Development:

-   Teams often work in silos with limited visibility into each other\'s work.

-   Slow feedback loops and long development cycles are common.

-   Manual integration and deployment processes are complex and resource-intensive.

-   Late-stage testing limits opportunities for early customer feedback.

CI/CD Development:

-   Promotes continuous collaboration and transparency through practices like trunk-based development.

-   Enables rapid feedback loops and iterative development with frequent integrations and deployments.

-   Automates builds, tests, and deployments, freeing developers to focus on core tasks.

-   Allows controlled feature rollouts and early customer feedback through feature flags.

> ![](./images/media/image92.png){width="2.9270833333333335in" height="7.927083333333333in"}
>
> ![](./images/media/image73.png){width="8.729166666666666in" height="4.489583333333333in"}

#### The build server or build pipeline {#the-build-server-or-build-pipeline .unnumbered}

A build server is a dedicated computer or virtual machine that automates tasks such as building, testing, linting, and conducting security scans, preparing code for deployment or integration. It acts as a quality gatekeeper, running CI/CD workflows before code is deployed or merged into the main branch. The build server doesn\'t inherently perform tasks but executes the instructions specified in the workflow file by developers. Anything can be run on a build server, since it\'s just a virtual machine.

Then why build servers are used instead of developer workstations to prepare CI CD workflows are:

-   Security: These servers handle sensitive resources like company source code and secrets. It is crucial to secure them to prevent unauthorized access and protect against lateral attacks.

-   Consistency and Isolation: Each server, agent, or VM should operate independently to minimize the impact of potential compromises

#### Automation {#automation .unnumbered}

Automation is essential for CI/CD, streamlining tasks like builds, deployments, and testing. This saves time, improves efficiency, and ensures consistency and reliability, crucial for frequent deployments. However, over-automation can be detrimental, especially for tasks requiring human judgment or adaptability.

The key is to find the right balance, automating repetitive tasks while retaining human oversight for critical decision-making and complex scenarios. Robust error handling and clear guidelines for human intervention are crucial for successful automation.

[[researchgate.net/profile/Kevin-Hoff-3/publication/272887576_Trust_in_Automation_Integrating_Empirical_Evidence_on_Factors_That_Influence_Trust/links/57952ba008aec89db7a8cf4f/Trust-in-Automation-Integrating-Empirical-Evidence-on-Factors-That-Influence-Trust.pdf]{.underline}](https://www.researchgate.net/profile/Kevin-Hoff-3/publication/272887576_Trust_in_Automation_Integrating_Empirical_Evidence_on_Factors_That_Influence_Trust/links/57952ba008aec89db7a8cf4f/Trust-in-Automation-Integrating-Empirical-Evidence-on-Factors-That-Influence-Trust.pdf)

Trust in automation: Part I. Theoretical issues in the study of trust and human intervention in automated systems. Ergonomics, 37(11), 1905--1922 \| 10.1080/00140139408964957

A model for types and levels of human interaction with automation. IEEE Transactions on Systems, Man, and Cybernetics - Part A: Systems and Humans, 30(3), 286--297 \| 10.1109/3468.844354

#### Testing, code review, and quality assurance {#testing-code-review-and-quality-assurance .unnumbered}

Testing and quality assurance are crucial for CI/CD, ensuring software quality and confidence in deployments. While both automated and manual testing play vital roles, they address different aspects:

-   Automated Testing: This process verifies functionality and performance through predefined tests, similar to controlled experiments, providing rapid feedback on code changes. Imagine a chemistry teacher at the front of a classroom, mixing two chemicals and instructing students to watch closely. This scenario serves as an example of a demonstration because the outcome is known beforehand, akin to how these tests predictably assess the impacts of changes in the code.

-   Manual Testing: Leverages human judgment for evaluating usability, aesthetics, and user experience, crucial for aspects difficult to automate.Humans should not be doing the checking aspect.Rather, automated testing should be responsible for that.

-   CI/CD emphasizes automation but doesn\'t eliminate the need for manual testing. Instead, it allows testers to focus on higher-level tasks requiring human expertise. Maintaining a balance between automated and manual testing is key for efficient, high-quality software development.

-   Skipping quality assurance in CI/CD can be tempting due to the fast-paced nature, but it\'s essential for ensuring customer satisfaction and protecting the business\'s reputation.It is additionally very tempting because the lack of automation will not show up for quite some time.

**Aside:** fire QA, right?! Well, no. QA shifts left, and instead prioritizes testing PRs (which have a smaller scope and smaller changeset.) Since checking (testing an outcome that is known) is done mostly via unit tests, QA can use their human-ness to evaluate the product for quality, usability, functionality, and exploration testing. When a feature is developed under a feature flag, QA can test it in the pre-production environment (feature flag enabled for them), allowing developers to get early feedback.

#### Rapid Feedback Loops {#rapid-feedback-loops .unnumbered}

The essence of CI/CD lies in maintaining business agility through a fast feedback loop. This allows companies, especially startups and small businesses, to rapidly experiment, identify what works, and make quick improvements.

Rapid feedback loops are a multi-pronged approach:

-   Streamlined Local Testing: Developers need easily accessible local testing environments mirroring production. Tools like hot reloading and ephemeral test environments with simple provisioning are crucial.

-   Efficient Build Pipeline: Aim for a build time under 15-20 minutes with automated processes, notifications for failures, and minimal manual intervention.This period of time is arbitrary. However, if the build time is too long, then there\'s a possibility of frustrating developers as well as not being able to quickly react to feedback from your customers.You will also make it more difficult to quickly push changes should there be a production outage.

-   Timely Code Reviews: Prioritize prompt and thorough PR reviews (ideally within a day) with constructive feedback and a focus on code readability.

-   Regular Deployments: Embrace semi-regular deployments to accelerate feedback loops and customer value delivery (refer to DORA metrics).

-   Comprehensive Monitoring & Alerting: Implement robust monitoring in all environments to detect issues early. Define a severity matrix for appropriate stakeholder notifications, escalating critical incidents promptly.

#### Infrastructure as Code and modularity {#infrastructure-as-code-and-modularity .unnumbered}

To achieve continuous integration and efficient deployments, it\'s essential to structure applications so that small changes are manageable. This involves both the application itself and its underlying infrastructure. If making small changes is cumbersome, integration becomes challenging, as larger updates can span multiple components, increasing both the testing burden and the associated risks.

-   Independent Modules: Structure applications with clear boundaries between components. This facilitates isolated changes and reduces testing complexity. This isn't the fact that you must adopt microservices, rather it\'s just structuring your code to be a modular approach. Modularity leads to smaller, more manageable changes, simplifying testing and increasing development speed.

-   Version-Controlled Infrastructure: Treat infrastructure configurations like code, storing them in version control systems for tracking, reverting, and collaboration.Your application. This could be terraform templates or ARM templates.

-   Eliminate configuration inconsistencies between development, testing, and production, preventing \"snowflake servers\" and ensuring reliable deployments.

#### Feature Flags {#feature-flags .unnumbered}

Feature flags are for **experimentation and release. They separate the act of deploying (moving the code to production, managed by engineering) and the act of making the changes usable by customers (commonly associated with a marketing event from the business's side.)** They are remote-controlled conditional statements that allow the selective activation or deactivation of application functionalities across different environments (development, integration, pre-production, production) without needing a redeployment. These flags can be toggled within seconds or minutes and can be set based on criteria like geographic location, IP address, or user type, facilitating targeted and gradual feature rollouts.

What exactly constitutes a feature or needs to be released via a feature flag is up to the product managers and the business. Usually not everything is behind a feature flag, for example, logging statements, refactors, package upgrades\*, security fixes\*, bug fixes, or small changes like typo fixes.

Typically, developers can enable these feature flags by themselves. Here's an example of an application in development, and it shows a special development overlay that allows developers to toggle feature flags.

![](./images/media/image81.png){width="7.395833333333333in" height="4.25in"}

[[Implementing feature flags in React with Unleash - Case Study (claimcompass.eu)]{.underline}](https://www.claimcompass.eu/blog/en/feature-flags-in-react-with-unleash/)

This approach is beneficial for trunk-based development, where changes are incremental. Developers can merge new features behind feature flags, allowing others to activate these flags for testing selectively.

Feature flags also enable controlled risk-taking. For example, a promising feature might be released to a small user segment (e.g., 1%) to evaluate performance and gather feedback, minimizing risks of broader release.

\*\*Branches versus Feature Flags:\*\*

Branches provide isolated workspaces for developers, supporting multiple application versions or development paths. However, unlike branches that delay integration, feature flags allow for integration while controlling feature activation.

\*\*Limitations:\*\*

Feature flags should not be used to restrict feature access based on customer payments, as they are often visible and modifiable on the client-side. They are better suited for testing, phased rollouts, and controlled changes.

\*\*Maintenance:\*\*

Proper feature flag management is crucial. Unused flags should be removed to avoid clutter and potential confusion. Limiting the number of active feature flags helps reduce code complexity and ease debugging.

Summary table,

  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Aspect**                **Branching**                                                                                                                                                         **Feature Flags**
  ------------------------- --------------------------------------------------------------------------------------------------------------------------------------------------------------------- ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  What It Is                Managing and isolating code changes in separate lines of development.                                                                                                 Tools for remotely controlling the visibility of new features in the production environment.

  Main Actions              Changes stay within the branch. To make changes visible, merge, copy, squash, or rebase onto a production-bound branch (like trunk/master).                           Allowing code changes to exist in production without being visible to everyone. Can be enabled for specific users or scenarios.

  Visibility to Customers   Changes are not visible to customers unless the branch is deployed to production. Testing in environments like test, dev, experimental is possible.                   Feature flags are crucial in managing what customers see in production. They hide or reveal new features based on their status.

  Specific Considerations   Recommended to deploy the main or trunk branch to production, especially in TBD (trunk-based development). Branches are ideal for testing and isolated development.   Feature flags should be used judiciously, as overuse can complicate application maintenance. They are intended to be temporary and should not replace good branching and merging strategies.
  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

#### Version Control System (VCS) {#version-control-system-vcs .unnumbered}

Version control systems are crucial for continuous integration and development because they track changes, **simplifying the integration process**. For instance, if you have two versions of a document, merging them into one requires a detailed comparison of each word. This task involves identifying and understanding changes. Version control automates this process, significantly reducing the likelihood of errors associated with manually tracking changes. This automation ensures smooth and accurate integration of code changes, forming a cohesive whole.

VCSes show that work has been integrated because it is considered a central source of truth. Multiple copies of the application with different versions mean that there isn't a single source of truth, therefore, we can't know if our changes have been integrated.

VCSs enhance auditability, allowing developers to easily trace back to see when and why code was altered. This is particularly important from a security perspective to ensure that only authorized changes are made. For example, if unauthorized changes occur, they can be quickly identified and reverted.

#### Culture and communication, collaboration {#culture-and-communication-collaboration .unnumbered}

While CI/CD tools automate integration and deployment, successful implementation requires more than just technology. It demands a fundamental shift in organizational culture and project management.

CI/CD thrives on:

-   **Collaboration and Communication:** Teams must work closely, sharing information and coordinating efforts to ensure smooth integration and deployment.

-   **Rapid Iteration:** Frequent code merges, small feature updates, and continuous feedback loops are essential for maximizing the benefits of CI/CD.

-   **Strategic Project Management:** Breaking down features into manageable, independently testable units facilitates continuous integration and deployment without disrupting the entire application.

Ignoring the human element of CI/CD can lead to challenges:

-   **Batched Changes and Integration Conflicts:** Infrequent code merges increase the risk of complex integration issues.

-   **Delayed Feedback:** Waiting to test in production hinders rapid iteration and learning.

-   **Siloed Information and Debugging Difficulties:** Poor communication can lead to significant debugging challenges.

CI/CD is not a one-time setup. It requires ongoing maintenance, pipeline updates, and continuous learning to adapt to evolving practices. Effective testing, code reviews, and organizational support for these processes are vital for maintaining a smooth development cycle.

### Continuous Deployment/Continuous Delivery {#continuous-deploymentcontinuous-delivery .unnumbered}

Infrastructure as Code (IaC) represents a transformative approach in managing and provisioning computing resources, utilizing machine-readable definition files rather than traditional physical hardware setups. This automation-focused methodology enhances the setup, configuration, and management of infrastructure, promoting rapid deployments, efficient resource utilization, and consistent, reliable environments. IaC is mainly declarative, targeting the desired end state of the infrastructure while the underlying tooling manages the execution. This is crucial in Continuous Deployment (CD) pipelines where IaC templates are automatically deployed in the cloud, ensuring each deployment is consistent, reproducible, and easily reversible. This aligns with principles like idempotency, immutability, and composability---key for maintaining interoperable and stable components.

The benefits of adopting IaC are extensive, including consistent infrastructure deployments across environments, enhanced reproducibility, and robust version control which acts as a single source of truth. Such structured deployments reduce configuration drifts between different environments such as QA/dev and production, speeding up the feedback loop for developers and boosting security measures. Tools such as Terraform offer cloud-agnostic deployment options, whereas AWS CloudFormation, Azure Resource Manager, and Google Cloud Deployment Manager cater to specific cloud environments. Additionally, open-source tools like Ansible and traditional configuration management tools like Chef and Puppet provide further automation capabilities, ensuring thorough enforcement of system states.

Historically, server management was a manual process involving system administrators physically logging into servers to apply changes, a method prone to errors and inconsistencies, especially in complex server environments. This labor-intensive process made replicating servers difficult, often requiring extensive documentation and manual reconfiguration. Before the adoption of IaC, administrators relied on shell scripts to manage and synchronize server configurations, though these scripts were limited in handling complex scenarios effectively. The rise of configuration management tools in the mid-to-late 2000s, such as CFEngine, Puppet, and Chef, began to address the issue of \"snowflake servers\"---highly customized servers difficult to replicate from scratch. Despite the advancements, many continued using shell scripts and command-line tools for their simplicity and familiarity. Today, IaC practices, exemplified by Terraform and other cloud-specific tools, have largely superseded these older methods, providing scalable, reliable, and repeatable server environment setups.

Here\'s a snippet of a simple Terraform configuration that demonstrates how to create an AWS infrastructure:

+-----------------------------------------------------------------------+
| \`\`\`hcl                                                             |
|                                                                       |
| provider \"aws\" {                                                    |
|                                                                       |
| region = \"us-west-1\"                                                |
|                                                                       |
| }                                                                     |
|                                                                       |
| resource \"aws_vpc\" \"sample_vpc\" {                                 |
|                                                                       |
| cidr_block = \"10.0.0.0/16\"                                          |
|                                                                       |
| \... // Additional configurations                                     |
|                                                                       |
| }                                                                     |
|                                                                       |
| resource \"aws_subnet\" \"sample_subnet\" {                           |
|                                                                       |
| vpc_id = aws_vpc.sample_vpc.id                                        |
|                                                                       |
| cidr_block = \"10.0.1.0/24\"                                          |
|                                                                       |
| \... // Additional configurations                                     |
|                                                                       |
| }                                                                     |
|                                                                       |
| resource \"aws_instance\" \"sample_ec2\" {                            |
|                                                                       |
| ami = \"ami-0c55b159cbfafe1f0\"                                       |
|                                                                       |
| instance_type = \"t2.micro\"                                          |
|                                                                       |
| subnet_id = aws_subnet.sample_subnet.id                               |
|                                                                       |
| \... // Additional configurations                                     |
|                                                                       |
| }                                                                     |
|                                                                       |
| \`\`\`                                                                |
+=======================================================================+
+-----------------------------------------------------------------------+

What do I deliver to the customer, i.e., what are build artifacts?

> A typical software release often includes several components, tailored to the nature of the software and the target audience. Here are some of the common elements you might find:
>
> 1\. \*\*Binaries\*\*: These are the compiled code files that are executable on the target platform(s). For desktop applications, these might be \`.exe\` files for Windows, \`.app\` packages for macOS, or binaries for Linux. For mobile applications, these would be \`.apk\` files for Android or \`.ipa\` files for iOS.
>
> 2\. \*\*Libraries\*\*: If the software relies on specific libraries, these may either be bundled with the binaries or referenced as dependencies that need to be installed separately.
>
> 3\. \*\*Documentation\*\*: This can include user manuals, release notes, and API documentation. Release notes are particularly important as they typically outline the new features, bug fixes, and known issues in that release.
>
> 4\. \*\*Source Code\*\* (in some cases): For open-source software, the source code is often provided along with the binaries. Even in some proprietary contexts, source code may be provided to certain customers under specific agreements.
>
> 5\. \*\*Installation Scripts/Programs\*\*: These are scripts or executable files that help users install the software on their system. This could include setup wizards for Windows, package installers for Linux, or dmg files for macOS.
>
> 6\. \*\*Configuration Files\*\*: These files are used to configure the software for initial use, or to customize its operation. They might be in the form of XML, JSON, or other formats.
>
> 7\. \*\*Database Files\*\*: If the application uses a database, the release might include database scripts to set up schemas or initial data sets.
>
> 8\. \*\*License and/or Copyright Information\*\*: Legal documentation specifying the terms under which the software is provided.
>
> 9\. \*\*Digital Signatures/Certificates\*\*: For security, the binaries and installer might be digitally signed to assure users that the software is genuine and has not been tampered with.
>
> 10\. \*\*Additional Resources\*\*: This can include images, icons, data files, or other resources needed for the software to function correctly.
>
> 11\. \*\*Patches/Updates\*\*: If the release is an update or patch to existing software, it may only include files that have been changed rather than the entire software package.

The contents of a software release can vary widely depending on the type of software, the platform it\'s being released on, and the policies of the developing company or organization. In enterprise environments, additional components like deployment guides, training materials, and support information may also be included.

> ![](./images/media/image58.png){width="9.713542213473316in" height="2.5517016622922135in"}

### Continuous Monitoring {#continuous-monitoring .unnumbered}

In CI/CD, continuous monitoring is essential as it allows developers to embed telemetry within their features, alerting them to production issues and user engagement metrics. This instant feedback helps developers and businesses assess if features are performing as expected or require adjustments. Monitoring encompasses tracking application performance metrics such as CPU usage, browser latency, and error reports, while providing real-time insights into user impact.

Setting up telemetry is generally straightforward, but extracting meaningful insights from the data is where most of the effort lies. Important aspects of monitoring include diagnostics, which report server-side issues, and analytics, which gauge user interactions and goal achievement.

-   Comprehensive Coverage: Track requests through the entire system, using correlation IDs for seamless tracing.

-   Meaningful Data: Log relevant information, including error messages, user IDs, and application versions, to facilitate debugging.

-   Strategic Logging: Prioritize logs based on importance and position them strategically to maximize diagnostic value.

-   Real-time insights: Utilize fresh, updated data for accurate and timely analysis.

-   Effective Visualization: Employ clear and concise graphs to represent data and identify patterns, avoiding unnecessary complexity.

Benefits of Continuous Monitoring:

-   Proactive Issue Resolution: Detect and address problems before they impact users, minimizing downtime and enhancing reliability.

-   Data-Driven Optimization: Gain insights into user behavior, application performance, and business metrics to inform product development and optimize user experience.

-   Enhanced User Satisfaction: Deliver a seamless and reliable user experience by proactively identifying and addressing performance bottlenecks and errors.

-   Faster Feedback Loops: Enable rapid experimentation and feature deployment with real-time feedback on new features and updates.

-   Improved Collaboration: Provide a single source of truth for development and operations teams, fostering collaboration and faster issue resolution.

Getting Started with Monitoring:

-   Define Goals: Identify key business objectives and user scenarios to determine what to monitor.

-   Implement Telemetry: Embed data collection points within the application to track user interactions, performance metrics, and errors.

-   Visualize and Analyze Data: Utilize dashboards and visualization tools to analyze data, identify trends, and uncover insights.

-   Establish Alerts: Set up automated alerts to notify relevant teams of critical issues and deviations from expected performance.

-   Continuously Improve: Regularly review and refine monitoring strategies based on data analysis and evolving business needs.

*At Shopzilla, continuous monitoring of their website\'s front-end performance revealed that even small changes, like optimizing image loading and deferring javascript, led to significant improvements. These optimizations resulted in a 0.4% increase in conversion rates, which translated into a full return on investment within two months and substantial ongoing revenue gains. This case study highlights how prioritizing continuous monitoring and even minor performance enhancements can have a substantial positive impact on a business\'s bottom line. [[(2) Velocity 2010: Tim Morrow, \"Time is Money - The Measurable Value of Performance by Design\" - YouTube]{.underline}](https://www.youtube.com/watch?v=Y5n2WtCXz48)*

In the realm of monitoring, several companies offer robust logging and monitoring solutions. Some of the leading logging provider companies in the market include:

  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Tool**                  **Description**
  ------------------------- --------------------------------------------------------------------------------------------------------------------------------------------------------
  Splunk                    Known for its powerful searching, analyzing, and visualizing capabilities of machine-generated data.

  Datadog                   Offers cloud-scale monitoring, providing a full-stack observability platform that combines metrics, traces, and logs in one place.

  New Relic                 Specializes in APM (Application Performance Management) and provides deep performance analytics for every part of the software environment.

  Sumo Logic                A cloud-native, machine data analytics platform delivering real-time, continuous intelligence.

  Elastic (Elasticsearch)   Known for the Elasticsearch search engine, Elastic offers powerful, real-time data search and analytics capabilities.

  Loggly                    A cloud-based log management and analytics service provider, popular for managing and analyzing large volumes of log data.

  Dynatrace                 Offers AI-powered, full-stack, automated monitoring solutions that provide insights into applications, clouds, infrastructure, and digital experience.
  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

### CI/CD transformations {#cicd-transformations .unnumbered}

What companies transformed their existing environment to use CI/CD?

[[CI/CD Pipeline Adoption Case Study: 6000 Releases per Month (sealights.io)]{.underline}](https://www.sealights.io/blog/60000-benefits-of-switching-to-ci-cd/)

*In the early stages of Continuous Integration (CI) and Continuous Delivery (CD), the speed of software release was a primary focus, but release automation was not yet widely established. The introduction of CI/CD pipelines marked a significant shift from slow-moving release cycles to rapid software development and delivery, emphasizing the release of high-quality builds. Automated testing, an essential component of this methodology, continuously ensures the desired behavior of applications, facilitating swift and streamlined delivery. This new approach was exemplified by a large European bank\'s adoption of CI/CD, highlighting how development and operations teams, within a DevOps culture, could collaborate to automate and streamline releases, tests, and builds.*

*The bank faced challenges in moving away from the traditional Waterfall model of software development, which resulted in lengthy release cycles of 12-18 months, bloated with features and prolonged testing phases. The adoption of CD transformed their approach, allowing them to support an impressive rate of 60,000 releases a month by focusing on minimizing the size of each release. This approach shortened the release cycle to mere hours, enabling rapid iteration and incorporation of feedback. A significant achievement was the complete rebuild of their outdated mobile application. Under the new CD regime, a basic version of the app was developed in two weeks, with continuous improvements leading to a feature-complete version in months and a substantial increase in user satisfaction. The case study shows the potential of CD for rapid development and market delivery, though it also suggests a need for further refinement in increasing the rate of production-quality releases without requiring revisions.*

[[DevOps At Target: Year 3 - YouTube]{.underline}](https://www.youtube.com/watch?v=1FMktLCYukQ)

*Target\'s transformation into a DevOps-centric organization, as outlined by Heather McMahon, Senior Director for Platform Engineering, marks a significant shift in its approach to software development and IT operations. Beginning in 2012, Target embarked on a journey integrating DevOps practices, including the development of APIs and the adoption of Continuous Integration/Continuous Deployment (CI/CD) methodologies. This shift significantly improved operational efficiency, **reducing the onboarding time for applications from 30 days to just 5 by 2015**, and paved the way for the adoption of agile methodologies and microservices, especially in cloud strategies.*

*Central to this transformation was the emphasis on continuous integration, treating infrastructure as code, and a culture of continuous learning and innovation. Target\'s approach involved breaking down monolithic structures into microservices, particularly in its cloud architecture. The move towards a cloud-native solution was bolstered by the establishment of APIs that centralized core retail data, drastically improving task efficiency. The transition to microservices architecture and cloud solutions, along with the focus on agile development, played a critical role in enhancing customer experiences and managing the vast scale of Target\'s operations.*

*Target\'s DevOps journey also included cultural shifts within the organization, emphasizing the importance of social coding, transparency, and collaboration. The focus on frequent deployments, efficient infrastructure management, and the adoption of configuration management tools streamlined their software development processes. By 2016, Target had achieved significant milestones, such as reducing the time to production to under five minutes for several applications and moving towards containerized solutions like Kubernetes. This comprehensive approach to DevOps not only accelerated technological development at Target but also highlighted the importance of adaptive, proactive learning environments and strong leadership in fostering a successful DevOps culture.*

Google [[45880.pdf (googleusercontent.com)]{.underline}](https://static.googleusercontent.com/media/research.google.com/en//pubs/archive/45880.pdf)

*Google\'s approach to continuous integration (CI) testing represents a paradigm of scale and efficiency in software development. The company\'s CI system is a testament to advanced automated testing, managing around 4.2 million individual tests daily across over 13,000 project teams. This extensive testing regime, underpinned by a sophisticated infrastructure using an internal version of Bazel for distributed computing, **achieves a remarkable 99% pass rate across 150 million test executions per day**. The system\'s backbone is its regression test selection, which plays a critical role in pre- and post-submission testing, enabling rapid identification and resolution of software regressions, thus enhancing code quality and reducing build failures.*

*Google\'s decade-long commitment to a robust testing culture has been integral to this success. Initiatives like \'Testing on the Toilet\' and the Google Test Automation Conference (GTAC) have been pivotal in ingraining this culture. Each engineer is responsible for creating automated tests for their code, ensuring consistent quality and reliability. However, challenges like test flakiness, where tests yield inconsistent results, consume significant resources. Google tackles this through strategies like repeated test runs and maintaining a database for known flaky tests. This dedication to addressing testing challenges and refining their CI system establishes Google as a leader in large-scale continuous integration and testing, setting a benchmark for the industry.*

### Should I use CI/CD? {#should-i-use-cicd .unnumbered}

CI/CD won\'t solve deep-rooted business issues and could complicate unresolved problems. In fact, it can actually make it worse because it requires people to work much more closely. Before migrating, define clear goals and a strategy, focusing on business needs like deployment speed, bureaucratic hurdles, demo readiness, and competitive pace. Implementing CI/CD without clear goals or understanding of its benefits can lead to wasted efforts and decreased software quality. Lastly, ensure management addresses the value of frequent integration and deployment, as without clear goals, developers may not see the need to integrate frequently as there is no reason to do so. (source: Continuous Integration is Not About Build Systems. 2017 43rd Euromicro Conference on Software Engineering and Advanced Applications (SEAA) \| 10.1109/SEAA.2017.30). Don't adopt CI/CD to follow trends or because the big tech companies are doing it. A thorough, honest assessment is key, as migration is costly and complex, potentially impacting short-term productivity and increasing development costs.

CI/CD Works Well For:

-   Startups and actively developed projects, especially new ones.

-   Projects with modular codebases or easily segmented work.

-   Agile projects requiring rapid feedback and iteration.

-   Evergreen applications like web apps.

-   Teams with strong communication, code review practices, and testing discipline.

-   Organizations with a strong desire for fast feedback.

CI/CD May Not Be Suitable For:

-   Projects with infrequent releases (e.g., once a year or more) and no desire to increase it, or where frequent changes are not desired.

-   Projects nearing decommissioning or with limited need for customer feedback.

-   Environments where provisioning a test environment is very expensive or time consuming, or it cannot be known ahead of time what the environment will be.

-   Environments with poor testing practices, slow code reviews, or limited ability to revert changes. For example, deploying optical media to a non-internet connected device.

-   Organizations lacking the motivation or resources to adopt new methodologies.

-   Developers or teams that lack discipline to create useful tests and do judicious code reviews.Or there isn\'t sufficient knowledge within the team to correctly make sure that the code that\'s entering production is safe. For example, if there\'s many junior developers on the team and there isn\'t necessarily a mentor that can provide them with some stability to make sure that the code is functioning correctly.That it may be difficult for the other juniors to review each other\'s code.

If you are going to implement it, here are some tips:

-   **Understand the Current Process:** Start by thoroughly understanding your release process. Measure all relevant timelines, including durations of past releases, integration periods, and time taken to complete features. Use documented records over unreliable human memory. When uncertain about durations, gather diverse estimates without averaging them. Immerse yourself in the team, observing and inquiring for at least a week. Identify how people work together, who they communicate with, team-related issues, interpersonal issues, and why they do the process in that way. Identify any necessary communications, hidden expectations, and specific stakeholder requirements, such as release notes or approvals.

-   **Increase Release Frequency:** Rome wasn't built in a day. Aim for more frequent releases, such as quarterly or biannually, to maintain a manageable yet progressive pace. This cadence allows the business to operate smoothly without needing extensive automation or technical adjustments initially. Frequent releases demonstrate confidence in processes and recovery capabilities. As release cycles shorten, automation opportunities typically become apparent, with concise cycles leading to less code to integrate, thus shortening integration times. Consider slightly reducing scope to balance with increased release frequency. Engage Product Managers (PMs) early as these changes can impact roadmaps and feature delivery schedules. Evaluate which tasks can be streamlined or reduced to facilitate earlier releases, thereby identifying inefficiencies and bottlenecks. Keep procedures consistently in focus through their regularity, minimizing the need for changes between releases. Prioritize reducing project scopes and allocate time for setting up automation. Ensure the software remains deployable at all times, showcasing partial features through demos. Adopt Agile methodologies to enhance CI/CD efforts, leveraging shorter cycles for less integration hassle and faster delivery to customers, necessitating PM involvement to adjust roadmaps accordingly.

-   **Automation and Trust Building:** Start with basic automation to ensure timely releases. Begin by automating simple, mechanical tasks, such as creating automated tests for developers to run locally and setting up a build pipeline. Prioritize automating functions that don't involve complex decision-making or error handling, and maintain human involvement where necessary. Focus testing resources on critical areas like usability, functionality, and exploration, ensuring these are supported by sufficient automated tests. This approach enhances QA efficiency without expanding the team. Be strategic about what to automate to avoid unnecessary complexity and maintain trust in the automation process. Recognize that the benefits of automation, such as increased release frequency and improved efficiency, may not be immediately apparent but will become more evident as the release cycle shortens.

-   **Refinement and Streamlining:** Remove unnecessary steps and automate repetitive tasks. Get feedback from teams. Before progressing further, ensure the refined process can be executed multiple times without significant modifications.

-   **Continuous Improvement:** Once the release process is consistent, review it for any repetitive or superfluous steps. Gather feedback from teams and analyze past releases to pinpoint inefficiencies. Continually refine the process by integrating more tests and releasing more frequently. The goal is a streamlined process with minimized manual interventions or deviations.

### How do I get started transitioning to CI/CD for my org? {#how-do-i-get-started-transitioning-to-cicd-for-my-org .unnumbered}

From a technical perspective, what are the **minimal** items we need to get started? [[Minimum Viable CD :: MinimumCD.org]{.underline}](https://minimumcd.org/minimumcd/). If you adopt a CI/CD provider, you will have most of these tools available.

-   Version Control System (VCS) - Essential for tracking changes and collaboration in codebases.Some version control systems are for example Git, Mercurial, Subversion or other proprietary ones such as Clear Case.

-   Source Code Repository - Centralized storage for code, which is integral for any CI/CD pipeline.

-   The ability to do code review.Typically this is done in a web-based interface, for example at GitHub. However it can also be done over e-mail.

-   Build server and build agent - The engine that automates the integration and deployment processes Including the execution.Resource switches that computer or computers that run the instructions from the build agent.

-   Build Tools - Necessary for automating the build process and creating executable artifacts from code.

-   Automated Testing Frameworks - Critical for ensuring the quality and reliability of code before it gets deployed. The developers will have to choose the appropriate testing framework for your application.

-   Artifact Repository - A system to store the build artifacts for deployment and sharing between stages.

-   Deployment Tools - Tools to automate the deployment of applications to various environments. Some tools, like Azure and AWS, also provide deployment hardware and ways to continuously integrate (e.g., Azure DevOps) and project management tools.

-   Monitoring and Logging Tools - For tracking the application\'s performance and troubleshooting issues post-deployment. These are normally third-party tools, but sometimes you can make simple ones yourself. Data visualization tools are especially useful, including alerting (e.g., automated phone calls.)

-   **Some sort of notification mechanism to notify people when the build fails.**

CI/CD success is gauged by software quality and release times, and is beneficial even with infrequent deployments, as organizations can still enjoy incremental improvements. The DORA (DevOps Research and Assessment) metrics---Deployment Frequency, Lead Time for Changes, Change Failure Rate, and Time to Restore Service---serve as crucial indicators. Optimal performance would involve multiple daily deployments, commits reaching production in under a day, a deployment failure rate of 0-15%, and recovery from production failures in less than an hour.

### History of CI/CD {#history-of-cicd .unnumbered}

CI/CD roots extend well before the 21st century, growing from a long evolution of software development practices. Understanding this history is vital as it helps contextualize the purpose and utility of emerging tools, preventing repetition of past errors. Historical practices, though not always labeled as \"continuous integration\" or \"continuous development,\" have exposed pain points that shaped today's CI/CD methodologies. This insight into the past clarifies why current practices have developed, enhancing the efficiency and effectiveness of modern software development.

-   Pre-1960's: Early computing was exclusive to entities like governments and large corporations due to high costs and complex maintenance. This led to a risk-averse, bureaucratic software development culture, using the Waterfall methodology. Dr. Winston W. Royce critiqued the Waterfall model in 1970, yet its basic form was widely adopted for its structured approach, fitting the slow, tedious programming challenges of the time.

-   1960-1970s: The era\'s bureaucratic environment influenced the development of critical practices like Source Code Management (SCMs), vital for managing and auditing code changes. Key developments included the introduction of the Source Code Control System (SCCS) in 1975, as discussed in Marc J. Rochkind\'s paper, and B. L. Ryle\'s work on software configuration management. This period also saw increased focus on testing and established repeatable build processes to mitigate risks.

-   1980s: The late 20th century saw advancements with SCM systems like SCCS, RCS, and CVS, and the rise of Integrated Development Environments (IDEs). Notable developments included the GANDALF IDE, which integrated development with RCS, and Watts S. Humphrey\'s \"Managing the Software Process\" (1989), focusing on iterative development approaches and process improvement. Challenges included real-time testing for embedded systems, highlighted in Richard N. Taylor\'s 1984 study.

-   1980s-1990s: Increased computer accessibility led to a boom in the software industry, with startups like Amazon emerging. The period was marked by \"Integration Hell,\" a term possibly first formally introduced in Douglas Hackney\'s 1997 work. To combat this, the concept of nightly builds became popular. These are builds that are automatically triggered every night from the latest version of the codebase, allowing teams to detect and fix integration issues the next morning. Integration challenges were further analyzed by Nancy Staudenmayer and Michael A. Cusumano (MIT, 1998). Watts S. Humphrey emphasized the need for reproducible builds in \"Managing the Software Process.\" The early 2000s saw the rise of Extreme Programming (XP), addressing integration risks, and the emergence of the Capability Maturity Model (1991). Microsoft\'s daily builds in 1996, detailed in Steve McConnell\'s work, marked a significant shift towards more efficient development practices.

-   2000s: Continuous Integration (CI) revolutionized software development, popularized by Martin Fowler in 2000. CI\'s emphasis on regular integrations, automated builds, and fast feedback loops significantly improved development efficiency. Tools like CruiseControl, Jenkins, TeamCity, Bamboo, and GitLab CI further established CI/CD practices.

-   2010's onwards: The rise of Distributed Version Control systems like Git signaled a shift in software development, emphasizing continuous feedback and iterative processes. Jez Humble and David Farley\'s \"Continuous Delivery\" (2010) advocated for automation and ensuring software readiness for release, paving the way for the evolution of DevOps, which emphasized collaboration, automation, measurement, and sharing.

### Providers and hosting {#providers-and-hosting .unnumbered}

There are two main classes of providers (with overlap): those that can provide CI/CD tooling, and those that provide the infrastructure to run or deploy your application.You can mix and match. For example, you can use GitHub Actions to.To continuous integration and deployment. But the actual place where your application is hosted could be on Azure or somewhere else, for example AWS or Google Cloud or Oracle Cloud. Already have a support contract or contract with one of these companies It makes sense to continue with the rest of their offerings so that your software is integrated with the rest of your security policies and contract.

-   **GitHub Actions:** GitHub Actions is an integrated CI/CD service within GitHub, enabling automated workflows for build, test, and deployment directly in your GitHub repository. It offers customizable workflows, a rich marketplace for actions, and supports various environments with hosted runners for Linux, Windows, and macOS. Ideal for GitHub users, it simplifies automation across multiple stages of software development.

-   **GitLab CI/CD:** GitLab offers a single application for the entire software development and deployment lifecycle. It\'s well-regarded for its built-in CI/CD capabilities. Seamless integration with GitLab\'s version control system, easy configuration with \`.gitlab-ci.yml\` file, Auto DevOps features, and extensive built-in security and compliance functionalities.

-   **Jenkins:** An open-source automation server, Jenkins is highly flexible and widely adopted. It has a vast ecosystem of plugins, making it a powerful tool for building, testing, and deploying software. Highly customizable with plugins, supports a wide range of programming languages and SCM tools, and provides excellent community support.

-   **CircleCI:** CircleCI is a cloud-based CI/CD service that supports rapid software development and publishing. It's known for its ease of integration with other tools and services. Easy setup and maintenance, Docker support, ability to run jobs in parallel, thus reducing build times, and integration with GitHub and Bitbucket.

-   **Azure DevOps:** From Microsoft, Azure DevOps provides developer services for support teams to plan work, collaborate on code development, and build and deploy applications. Offers a comprehensive suite of services including Azure Boards, Azure Repos, Azure Pipelines, Azure Test Plans, and Azure Artifacts. It\'s integrated well with other Azure services and offers extensions for integration with other popular tools.

-   **Bamboo by Atlassian:** Bamboo is a CI/CD tool that integrates well with Atlassian's other products like Jira Software and Bitbucket. Good for enterprises using Atlassian products, offers built-in deployment projects, environment management, and dedicated support.

-   **Travis CI:** A hosted CI/CD service used to build and test software projects hosted on GitHub and Bitbucket. Easy to set up, integrates deeply with GitHub, supports multiple languages, and can deploy to various cloud services.

For hosting your application in the cloud, here are some providers.

-   **Amazon Web Services (AWS):** AWS offers a comprehensive set of services that support CI/CD, including AWS CodePipeline for automating release pipelines, AWS CodeBuild for compiling and testing code, and various other integrations and tools.

-   Microsoft Azure: Azure provides Azure DevOps Services, which include Azure Pipelines, a fully-featured CI/CD service that works with any language, platform, and cloud. Azure also supports integration with various tools and repositories.

-   **Google Cloud Platform (GCP):** GCP offers Cloud Build, a service that executes your builds on Google Cloud\'s infrastructure. GCP also integrates well with popular open source CI/CD tools and supports Docker container-based workflows.

-   **IBM Cloud:** IBM Cloud has a range of DevOps tools for CI/CD, including toolchains that combine various development tools for an end-to-end workflow. It supports integration with popular tools like Jenkins, GitHub, and Slack.

-   **DigitalOcean:** Known for its simplicity, DigitalOcean provides a platform that can easily be configured for CI/CD workflows. With support for Kubernetes and integration capabilities with popular CI/CD tools, it\'s a good choice for smaller to medium-sized applications.

> ![](./images/media/image12.png){width="9.057292213473316in" height="4.816178915135608in"}

### Further readings {#further-readings .unnumbered}

[[Continuous Delivery: Reliable Software Releases through Build, Test, and Deployment Automation: Humble, Jez, Farley, David: 9780321601919: Books - Amazon.ca]{.underline}](https://www.amazon.ca/Continuous-Delivery-Reliable-Deployment-Automation/dp/0321601912/ref=sr_1_1?crid=2H71BL6NRSX7Q&keywords=continuous+delivery&qid=1698110152&sprefix=continuous+delivery%2Caps%2C132&sr=8-1)

[[Continuous Integration: Improving Software Quality and Reducing Risk: Duvall, Paul, Matyas, Steve, Glover, Andrew: 9780321336385: Books - Amazon.ca]{.underline}](https://www.amazon.ca/Continuous-Integration-Improving-Software-Reducing/dp/0321336380/ref=sr_1_1?crid=3VS7DPPXR40T8&keywords=continuous+integration&qid=1698110160&sprefix=continuous+integration%2Caps%2C123&sr=8-1)

[[The Phoenix Project: A Novel about IT, DevOps, and Helping Your Business Win: Kim, Gene, Behr, Kevin, Spafford, George: 9781942788294: Books - Amazon.ca]{.underline}](https://www.amazon.ca/Phoenix-Project-DevOps-Helping-Business/dp/1942788290/ref=sr_1_1?crid=969HQYQJ3ROE&keywords=%22The+Phoenix+Project%22&qid=1698110264&sprefix=the+phoenix+project+%2Caps%2C128&sr=8-1)

[[The DevOps Handbook: How to Create World-Class Agility, Reliability, and Security in Technology Organizations: Kim, Gene, Debois, Patrick, Willis, John, Humble, Jez, Allspaw, John: 9781942788003: Books - Amazon.ca]{.underline}](https://www.amazon.ca/DevOps-Handbook-World-Class-Reliability-Organizations/dp/1942788002)


