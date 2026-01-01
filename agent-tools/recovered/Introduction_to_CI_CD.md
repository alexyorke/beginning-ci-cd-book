**Chapter 1: Introduction to Continuous Integration and Continuous Deployment (CI/CD)**

**1.1 What is CI/CD?**

Continuous Integration/Continuous Deployment (CI/CD) software represents a suite of tools designed to enhance the software development lifecycle. These platforms provide extensive functionalities that optimize the CI/CD process. Key features include automated builds, continuous testing, artifact management, deployment automation, and environment management. Furthermore, they allow for intricate pipeline orchestration, support a myriad of integrations, offer monitoring metrics, and include security scanning tools.

CI/CD is a software development methodology optimizing for frequent and efficient deployment of small changes. It is a combination of Continuous Integration and either Continuous Deployment or Continuous Delivery, depending on where this term is used.

CI/CD aims to avoid ΓÇ£integration hellΓÇ¥ by ensuring continuous integration and either continuous delivery or deployment. Work is constantly merged into the main/master branch after it has been verified via code review and the continuous integration pipeline. This involves practices like trunk-based development, where all developers work on a shared branch, promoting constant integration and minimizing merge conflicts. While CI/CD emphasizes readily deployable code, it allows flexibility in release schedules to align with business needs and customer expectations.

It requires both technical and cultural shifts, including:

- Smaller work units: Breaking down features into independently deployable and testable components.
- Modular codebase: Facilitating localized changes without impacting the entire application.
- Focus on rapid feedback: Prioritizing quick delivery of changes and gathering customer insights.

**1.2 History of CI/CD**

- **Pre-1960's:** Early computing was exclusive to entities like governments and large corporations due to high costs and complex maintenance. This led to a risk-averse, bureaucratic software development culture, using the Waterfall methodology. Dr. Winston W. Royce critiqued the Waterfall model in 1970, yet its basic form was widely adopted for its structured approach, fitting the slow, tedious programming challenges of the time.
- **1960-1970s:** The era's bureaucratic environment influenced the development of critical practices like Source Code Management (SCMs), vital for managing and auditing code changes. Key developments included the introduction of the Source Code Control System (SCCS) in 1975, as discussed in Marc J. Rochkind's paper, and B. L. Ryle's work on software configuration management. This period also saw increased focus on testing and established repeatable build processes to mitigate risks.
- **1980s:** The late 20th century saw advancements with SCM systems like SCCS, RCS, and CVS, and the rise of Integrated Development Environments (IDEs). Notable developments included the GANDALF IDE, which integrated development with RCS, and Watts S. Humphrey's "Managing the Software Process" (1989), focusing on iterative development approaches and process improvement. Challenges included real-time testing for embedded systems, highlighted in Richard N. Taylor's 1984 study.
- **1980s-1990s:** Increased computer accessibility led to a boom in the software industry, with startups like Amazon emerging. The period was marked by "Integration Hell," a term possibly first formally introduced in Douglas Hackney's 1997 work. To combat this, the concept of nightly builds became popular. These are builds that are automatically triggered every night from the latest version of the codebase, allowing teams to detect and fix integration issues the next morning. Integration challenges were further analyzed by Nancy Staudenmayer and Michael A. Cusumano (MIT, 1998). Watts S. Humphrey emphasized the need for reproducible builds in "Managing the Software Process." The early 2000s saw the rise of Extreme Programming (XP), addressing integration risks, and the emergence of the Capability Maturity Model (1991). Microsoft's daily builds in 1996, detailed in Steve McConnell's work, marked a significant shift towards more efficient development practices.
- **2000s:** Continuous Integration (CI) revolutionized software development, popularized by Martin Fowler in 2000. CI's emphasis on regular integrations, automated builds, and fast feedback loops significantly improved development efficiency. Tools like CruiseControl, Jenkins, TeamCity, Bamboo, and GitLab CI further established CI/CD practices.
- **2010's onwards:** The rise of Distributed Version Control systems like Git signaled a shift in software development, emphasizing continuous feedback and iterative processes. Jez Humble and David Farley's "Continuous Delivery" (2010) advocated for automation and ensuring software readiness for release, paving the way for the evolution of DevOps, which emphasized collaboration, automation, measurement, and sharing.

**1.3 Key Concepts and Terminology**

- **Build pipelines** (or just pipelines) are simply scripts that developers maintain to perform useful work, such as building your application, generating build artifacts, or deploying your application. It is called a pipeline because the way it is structured encourages a one-way dataflow, and a set of goals that are or are not achieved.
- They are central to CI/CD, and developers will be maintaining them constantly, and updating them. Therefore, it's very important that you know the right terminology for them, how they work, and how to create them. If, for example, the deployment pipeline fails, then it must be fixed quickly, because this is usually the only route to production. Therefore, it is important to know what they are, how to create them, and how to debug them quickly and effectively.

**Disambiguation of terms between CI providers:**

- This book is somewhat focused on GitHub Actions, but tries to provide a provider-agnostic view. Some of the terms might be a bit different depending on your CI/CD provider. Here is a table that helps clarify.

  | Definition                                                                                                                                                                                                                                                                                                                  | Generic Term  | Jenkins            | GitHub Actions       | GitLab CI/CD    | CircleCI              |
  | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------ | :----------------- | :------------------- | :-------------- | :-------------------- |
  | A build step is a single task or command within a CI/CD pipeline. It's a specific action to be executed, such as compiling code, running tests, or deploying software.                                                                                                                                                      | Build Step    | Build Step         | Job                  | Job             | Job                   |
  | In software development, an environment refers to a setup where software runs. This can include factors like the operating system, available software and tools, system variables, and network access. Different environments (like development, testing, and production) mimic different stages of the software lifecycle. | Environment   | Node               | Runner               | Runner          | Executor              |
  | A workflow is a sequence of tasks that process a set of data. In CI/CD, a workflow is a set of rules for defining the build process, typically comprising multiple jobs or build steps.                                                                                                                                     | Workflow      | Pipeline           | Workflow             | Pipeline        | Workflow              |
  | In CI/CD, a trigger is an event that initiates the execution of a workflow or pipeline. Common triggers include code commits, pull requests, scheduled times, or manual intervention.                                                                                                                                       | Trigger       | Build Trigger      | Event                | Trigger         | Trigger               |
  | Secrets are sensitive data, such as passwords, tokens, or keys, essential for the operation of applications and the security of resources. In CI/CD pipelines, secrets are used to access resources without exposing them in the code or workflow definitions.                                                              | Secrets       | Credentials        | Secrets              | Variables       | Environment Variables |
  | A container is a lightweight, executable package that includes everything needed to run a piece of software, including the code, runtime, system tools, libraries, and settings. Containers are isolated from each other and the host system, ensuring consistency across different environments.                           | Container     | Agent/Docker Agent | Container            | Docker Executor | Docker                |
  | Configuration in software development refers to the settings and parameters that define how software or hardware operates. In the context of CI/CD, configuration files (like YAML files in GitHub Actions) specify the parameters and settings of the build process.                                                       | Configuration | Jenkinsfile        | .github/workflows/* | .gitlab-ci.yml  | .circleci/config.yml  |
  | Artifacts are files or data that are produced as a result of a build step or job in a CI/CD pipeline. These can include compiled code, binaries, libraries, containers, and documentation.                                                                                                                                  | Artifacts     | Build Artifacts    | Artifacts            | Artifacts       | Artifacts             |
  | In CI/CD, caching refers to the practice of storing a part of the build process, like dependencies or compiled code, so that it can be reused in subsequent runs, improving build speed and efficiency.                                                                                                                     | Cache         | Workspace          | Cache                | Cache           | Cache                 |
  | Parallelism in CI/CD is the execution of multiple build steps or jobs simultaneously. It is used to speed up the build process by dividing the workload across multiple runners or agents.                                                                                                                                  | Parallelism   | Parallel Builds    | Matrix Builds        | Parallel Matrix | Parallel Jobs         |
  | Build status is an indicator of whether a build or integration process in a CI/CD pipeline succeeded or failed. It provides immediate feedback on the health and success of a change or a set of changes made in the repository.                                                                                            | Build Status  | Build Status       | Check                | Pipeline Status | Build Status          |

- Some testing environments might have different terms. These might be called "Development Environment", Dev, QA, Staging, UAT, PPE, Testing, Experimental, or Beta. These terms may have different connotations, depending on which environments you are using, and for which purpose.

**1.4 Continuous Integration (CI)**

The first step is continuous integration. Breaking this down, continuous means often or as frequently as possible in integration means the act of combining multiple disparate pieces into a whole. **Integration is the act of constantly merging your changes with other developers', and vice-versa. It's the act of combining multiple changes, from multiple developers, into a single, cohesive whole, regularly.** All developers work on a shared codebase. Integration (i.e., snapping the puzzle pieces together) occurs regularly.

Normally in CI/CD, long-lived branches are discouraged because it means that work is not integrated and testable with the rest of the application. Separate branches are normally considered developer workspaces. So, we need a way to make sure that integration work is done, well, continuously. Work is only integrated if it exists as part of the application.

Trunk-based development is a software development strategy that emphasizes frequent merges to a single branch known as the ΓÇ£trunk.ΓÇ¥ This approach can be likened to the structure of a tree. In this analogy, the trunk represents the main codebase, which is central and robust, continually growing as new changes are integrated. The branches, on the other hand, represent smaller, temporary code changes or features that developers work on. These branches are merged back into the trunk, ensuring that they become part of the main/master branch. This method promotes a continuous integration environment where updates are made regularly and incrementally to the central codebase, minimizing the complexity of merges and reducing the risk of significant conflicts.

To support integration the tasks themselves have to be small and integrable, and must be done in an intelligible order. Simply making the PRs small isn't sufficient. At every point after you finish your task, you should be able to validate whether your work is getting closer to being fully integrated. This is because if the PR's are too small, there might not be any functionality to test, so it might be unclear if the work is actually integrated. An anti pattern in this case would be to commit one line of code that creates A variable but the variable is not used. It's unclear if this code is actually integrated, because simply writing the code assigns it to the variable, but the variable is not used. This means that the code is likely removed at runtime by the compiler. And has no effect on the application.

This means that you should be able to integrate against others' work, that is, you should be able to know if you're making progress towards your goal, and have concrete evidence (i.e., tests pass and these tests are related to what the user can do.) You should be able to know, very early on, if part of your feature is working with the other parts of the application. It doesn't have to be finished super fast, rather, that you are aware that things are fitting together properly, and you're able to test it in production. Say for example, we're working on the weather application. We would like to create a new user interface for this weather application. If we start with removing the existing weather overlay, well, then the customers can't use it in the meantime, so we can't integrate these changes--this is a problem. Instead, we should develop the newer features alongside the current overlay and provide the capability to remove and replace the old weather overlay with the new one. This is normally made much easier through modular application approaches (and good application architecture.) This may require a bit of refactoring initially, as the application may not be built with every possible business requirement in mind.

**1.5 Continuous Delivery vs. Continuous Deployment (CD)**

**Continuous Deployment** (often confused with Continuous Delivery) is the practice where every change that passes the automated tests is **automatically deployed** into the production environment With little to no human intervention. This also encompasses CI and is a superset of CI. The work has to be integrated first with continuous integration before it is deployed to the production environment.

**Continuous Delivery**, on the other hand, ensures that the code is always in a deployable state, but **it may not be deployed to production automatically. Instead, it might require manual approval.** It provides the business with the opportunity to deploy at any point. Further tests, often user acceptance testing (UAT) or other types of end-to-end tests, are run in this environment. Therefore, in organizations with low risk tolerance, continuous delivery might be a safer approach. Continuous Deployment is a superset of continuous deployment. It just extends continuous delivery to make sure that the code is always in a deployable state and also deploys it.

This should be the only route to deploy to production because otherwise the point of having the continuous delivery pipeline is compromised because changes external to it can be non-idempotent, thus, making using the pipeline more brittle as manual configuration changes aren't reflected in the automation. The goal is to create artifact(s) that can be deployed as close as possible with minimal modifications. Do use the artifacts created by the continuous integration pipeline as inputs. Failure to do so means there is no trust in the continuous integration pipeline's ability to generate usable artifacts that can be used as-is for continuous deployment.

**Note:** how do I remember the difference between continuous delivery and continuous deployment? Continuous _Deployment_ means to _Deploy (i.e., a ship)_, and Deploy is getting it out to production.

- [[Continuous Delivery: Reliable Software Releases through Build, Test, and Deployment Automation: Humble, Jez, Farley, David: 9780321601919: Books - Amazon.ca]](https://www.amazon.ca/Continuous-Delivery-Reliable-Deployment-Automation/dp/0321601912/ref=sr_1_1?crid=2H71BL6NRSX7Q&keywords=continuous+delivery&qid=1698110152&sprefix=continuous+delivery%2Caps%2C132&sr=8-1)
- [[Continuous Integration: Improving Software Quality and Reducing Risk: Duvall, Paul, Matyas, Steve, Glover, Andrew: 9780321336385: Books - Amazon.ca]](https://www.amazon.ca/Continuous-Integration-Improving-Software-Reducing/dp/0321336380/ref=sr_1_1?crid=3VS7DPPXR40T8&keywords=continuous+integration&qid=1698110160&sprefix=continuous+integration%2Caps%2C123&sr=8-1)

**1.6 The CI/CD Process Overview**

Here is what the software development process looks like when using CI/CD. Note that many of these processes are automated.

![](./images/image3.png)

Here's a description of what's going on in the diagram.

- After tasks are broken down, then they can be worked on by the developers. Once completed, they create a Pull Request (PR). This automatically triggers a Continuous Integration (CI) pipeline that includes building, testing, and linting the PR. Your CI/CD provider should have detailed instructions on how to get the pipeline set up for the first time, and can automatically run it when developers create PRs. The pipeline, maintained by developers, must succeed before the PR is merged. This is a critical part of CI/CD, because the pipeline builds and runs the automated tests, which allow developers to gain confidence in their changes, and ensures that the work meets a quality threshold prior to merging (and thus becoming available for other developers to work on the changes, and for them to be available to the customers.)
- If it is not successful, then developers have to fix their changes before they are merged--this also includes code review. A successful pipeline run results in build artifacts being published to an artifact repository. However, at this stage, the artifacts remain unused in the repository and are not yet accessible to customers. Therefore, we need to have a way to release these to production.
- In the past, releasing software meant that changes were available to customers immediately, or via a death-march rollout that was difficult to undo. This mimicked the real world closely, which meant that it was easy to understand the process. For example, say I am writing a newspaper. If I hit print, and distribute all of the newspapers to everyone, and there is a typo, then it's going to be costly to fix. I can't easily pull the newspapers back into my office and change them.
- This is a very scary prospect, and so code was withheld until it was thoroughly tested. This makes sense: It was difficult to quickly deploy a new version of your application with the fix and tooling was not as mature as it was today.
- Deployments are managed via a ΓÇ£deployment pipelineΓÇ¥ similar to the build pipeline but tailored for deployment. The specific deployment steps and commands vary based on the cloud provider, but all require the build artifacts and relevant credentials to access production environments. Deployments utilize infrastructure as code, using predefined templates to dictate resource provisioning and application setup, ensuring configurations are standardized and rebuilt from scratch to avoid nonstandard ΓÇ£snowflakeΓÇ¥ machines.
- When we do CD, we can deliver code that sometimes is still a work in progress. Normally, this would be of great concern: the feature isn't done yet, so customers would be negatively impacted because the feature would be buggy or wouldn't work. However, we can safely hide it behind a feature flag. This means that customers are not impacted by the work that is in progress. The application looks the same, and functions the same. Instead of it being integrated on a develop branch internally, it is in production, but just inactive.
- There are many strategies for deploying the new changes. One way is to put the new change behind a feature flag, which means that it is only enabled once the feature flag is turned on. This approach is useful if you're developing a small-to-large sized feature, and need multiple PRs to create it. If it's a very small change, then it's not as useful to put behind a feature flag, as the overhead is likely too high. Additionally, any changes, even if they are behind a feature flag, have a risk to production. For example, upgrading dependencies.
- Therefore, we need a way to make sure that we can gradually incorporate changes to production without interrupting existing users. There are two main strategies we can use to do this. One is called blue-green deployments: Maintain two production environments (blue for the current version and green for the new version) to achieve zero-downtime deployments. Another is called incremental deployments, or canary deployments: Release updates to a subset of users initially, gradually increasing the reach, allowing early feedback and risk mitigation.
- Blue-green deployments are useful when there are major changes, or if customer traffic cannot be served by two different nodes running different versions of the application. Think large infrastructure upgrades, database refactorings, etc. Most changes can be serviced via incremental deployments, where old copies of the application are destroyed, and newer copies are deployed in its place. This allows for a gradual introduction of new changes to production, and traffic is drained from the nodes before they go into service.
- Note that the act of moving changes to production does not necessarily mean that they are "released." Deploying, Delivering, and Releasing take on different definitions. This requires a very different way of thinking about how you approach releasing changes to customers, and is a very large paradigm shift.
- Over time, as we work on the feature, it might become ready for customers. In this case, we can gradually enable the feature flag to make it available to customers.
- To mitigate risk, we adopt a two-pronged approach. First, we slowly enable the feature flag. This means that the feature is not available to all customers yet. Second, we write monitors for our feature (much like the canary in the coal mine.)
- This stage ends once the application is available to the customer. This means that there are some post-deployment checks that occur, however, they are short in nature and only represent a snapshot of time.
- After (and during release), the application is closely monitored using continuous monitoring. This ensures that if the application goes down, that the deployment is quickly rolled back.

**1.7 Benefits of CI/CD**

_(This section could incorporate benefits mentioned implicitly, like faster feedback loops, reduced risk, improved quality, and avoiding "integration hell". The source text doesn't explicitly list benefits in one place, but they are woven throughout the descriptions.)_

**1.8 Related Concepts**

- **DevOps:**
  - [[The Phoenix Project: A Novel about IT, DevOps, and Helping Your Business Win: Kim, Gene, Behr, Kevin, Spafford, George: 9781942788294: Books - Amazon.ca]](https://www.amazon.ca/Phoenix-Project-DevOps-Helping-Business/dp/1942788290/ref=sr_1_1?crid=969HQYQJ3ROE&keywords=%22The+Phoenix+Project%22&qid=1698110264&sprefix=the+phoenix+project+%2Caps%2C128&sr=8-1)
  - [[The DevOps Handbook: How to Create World-Class Agility, Reliability, and Security in Technology Organizations: Kim, Gene, Debois, Patrick, Willis, John, Humble, Jez, Allspaw, John: 9781942788003: Books - Amazon.ca]](https://www.amazon.ca/DevOps-Handbook-World-Class-Reliability-Organizations/dp/1942788002)
- **Complexity in Software Development:**

  - [**Key Points from the Continuous Delivery Podcast: Complexity**](#key-points-from-the-continuous-delivery-podcast-complexity)
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
    - [[1w7qpw29ni6lnbex9gksl5y6d961.mp3](https://1drv.ms/u/s!AOnf7tByrSaDkzU)](#w7qpw29ni6lnbex9gksl5y6d961.mp3)

---

This concludes the first chapter. Please let me know when you're ready for Chapter 2, which will cover preparing the development environment.


