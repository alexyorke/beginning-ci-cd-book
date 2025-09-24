## {#section-13 .unnumbered}

### Continuous integration and development software {#continuous-integration-and-development-software .unnumbered}

Continuous Integration/Continuous Deployment (CI/CD) software represents a suite of tools designed to enhance the software development lifecycle. These platforms provide extensive functionalities that optimize the CI/CD process. Key features include automated builds, continuous testing, artifact management, deployment automation, and environment management. Furthermore, they allow for intricate pipeline orchestration, support a myriad of integrations, offer monitoring metrics, and include security scanning tools.

Constructing a CI/CD server in-house is not only challenging but also time-intensive. However, in this book we will be going over how to create a very small continuous integration and development system to show you that it really isn't that complicated and to also show you the benefits and why using an off the shelf on it's usually better most of the time.

### Why Choose Off-the-Shelf CI/CD Tools? {#why-choose-off-the-shelf-cicd-tools .unnumbered}

- Time Efficiency: Building a CI/CD server from scratch is time-consuming, and potentially error-prone. Using established tools like Jenkins, GitLab, and Azure DevOps saves significant time.

- Reliability and Scalability: These tools are tested and trusted by many organizations globally, ensuring reliability and scalability.

- Rich Feature Set: With features for build management, testing automation, security scanning, and more, these tools offer a comprehensive CI/CD solution.

- The following are all-in-one CI/CD providers. They provide the entire technical-side for CI/CD, and a select few may also provide infrastructure for hosting your application (e.g., Azure.) Note that you can deploy to third-party platforms that host your production environment.

- Each provider has significant documentation on how to get started with their platform. Including steps for all platforms might make this book very large.

- Research available CI/CD tools. These may include build servers, which can build your code. They can also host your code as well and allow other team members to access it. For example, Jenkins, GitLab, Azure DevOps, etc. You can use your new or revised onboarding guide to identify which providers might fit your needs. If you already deploy to one of those providers, then it might be easier to migrate to that provider, since other integrations will be much easier. For example, deploying to Azure.

How do I know which provided to select? Here's a breakdown of some of the concepts and.I framework to show you what to consider when choosing A continuous integration and development provider.

From CI/CD providers spreadsheet [[Wayback Machine (archive.org)]{.underline}](https://web.archive.org/web/20230101095803/https://www.centurion.link/w/_media/software/ci_feature_matrix.pdf):

- Key aspects here include whether the tool is open source, offers a free version, and the implementation language. The number of active developers can also provide insight into the tool's support and ongoing development.

- The support for popular SCM systems like Git, Subversion, Team Foundation Server, and Mercurial is crucial. Additionally, features such as SCM related support, multi-SCM, and the ability to create new SCM repositories are essential.

- Build management is a core feature of CI/CD tools. Key features include support for parallel and distributed builds, the ability to manually force builds, SCM triggered builds, and proactive measures to prevent build breakages. It's also important to have mechanisms for detecting new failing tests during a build process.

- Integration with other systems, such as your current plugins, service connections, identity, etc.

- Security is paramount in CI/CD tools. Essential features include robust user authentication and authorization schemes. Also, LDAP Integration, Kerberos, and Single Sign On are important for enterprise-level security.

- Key aspects in this category include email notifications and other communication tools like Slack/Teams.

- The ability to manage projects (add, delete, clone, modify), view changesets, access build artifacts, and support for multi-project views are significant in the web interface of a CI/CD tool. Self-updating web page is a useful feature for real-time updates.

- Direct support for commonly used build tools like Shell/Command Script, Maven, Ant, Make, and MsBuild is crucial for seamless operation.

- Integration with popular project management tools such as JIRA, Bugzilla, Confluence, Mingle, Rally, and VersionOne is important for tracking issues and coordinating work.

- Key aspects include support for common test frameworks like JUnit, NUnit, PHPUnit, and tools like Agitar, QualityCenter for test rendering.

- Ease of installation (such as Windows Installer or self-contained distribution) and configuration is crucial. It's also beneficial if the tool can automatically configure from a build script and doesn't require modifications to existing build scripts.

```{=html}
<!-- -->
```

- Pre-1960's: Early computing was exclusive to entities like governments and large corporations due to high costs and complex maintenance. This led to a risk-averse, bureaucratic software development culture, using the Waterfall methodology. Dr. Winston W. Royce critiqued the Waterfall model in 1970, yet its basic form was widely adopted for its structured approach, fitting the slow, tedious programming challenges of the time.

- 1960-1970s: The era's bureaucratic environment influenced the development of critical practices like Source Code Management (SCMs), vital for managing and auditing code changes. Key developments included the introduction of the Source Code Control System (SCCS) in 1975, as discussed in Marc J. Rochkind's paper, and B. L. Ryle's work on software configuration management. This period also saw increased focus on testing and established repeatable build processes to mitigate risks.

- 1980s: The late 20th century saw advancements with SCM systems like SCCS, RCS, and CVS, and the rise of Integrated Development Environments (IDEs). Notable developments included the GANDALF IDE, which integrated development with RCS, and Watts S. Humphrey's "Managing the Software Process" (1989), focusing on iterative development approaches and process improvement. Challenges included real-time testing for embedded systems, highlighted in Richard N. Taylor's 1984 study.

- 1980s-1990s: Increased computer accessibility led to a boom in the software industry, with startups like Amazon emerging. The period was marked by "Integration Hell," a term possibly first formally introduced in Douglas Hackney's 1997 work. To combat this, the concept of nightly builds became popular. These are builds that are automatically triggered every night from the latest version of the codebase, allowing teams to detect and fix integration issues the next morning. Integration challenges were further analyzed by Nancy Staudenmayer and Michael A. Cusumano (MIT, 1998). Watts S. Humphrey emphasized the need for reproducible builds in "Managing the Software Process." The early 2000s saw the rise of Extreme Programming (XP), addressing integration risks, and the emergence of the Capability Maturity Model (1991). Microsoft's daily builds in 1996, detailed in Steve McConnell's work, marked a significant shift towards more efficient development practices.

- 2000s: Continuous Integration (CI) revolutionized software development, popularized by Martin Fowler in 2000. CI's emphasis on regular integrations, automated builds, and fast feedback loops significantly improved development efficiency. Tools like CruiseControl, Jenkins, TeamCity, Bamboo, and GitLab CI further established CI/CD practices.

- 2010's onwards: The rise of Distributed Version Control systems like Git signaled a shift in software development, emphasizing continuous feedback and iterative processes. Jez Humble and David Farley's "Continuous Delivery" (2010) advocated for automation and ensuring software readiness for release, paving the way for the evolution of DevOps, which emphasized collaboration, automation, measurement, and sharing.

Now that you know what a build server is, let's use your computer as a build server. Don't worry, nothing bad will happen, it will just use. We will use the reapproved GitHub Actions template.Which is trustworthy?It will use the MSM.Version as well as all of the other applications that are on your computer in order to build the software similar to how you did previously.We'll also look at some of the directories and files that GitHub.Actions runner produces as well as some of the.Different statefulness, nature it has and the importance of having an affair about building environment, how to actually get that set U.If you're really concerned, you can start up a new virtual machine and install the GitHub Actions agent there.

1st.In GitHub Actions, create a new self hosted runner.Created the new Self hosted runner. You will have to set U the GitHub Actions agent on your local computer.To do that, there are instructions on the GitHub Actions website. In order to do that, you'll probably have to place a secret key and log in to GitHub to verify that and to associate your computer with this build pipeline. Make sure to delete.The self hosted runner IE your own computer before.You actually use it in production because normally self hosted computers are not used as build servers.

After you've created a new self hosted runner, you can create a job now.After you.Around the pipeline in GitHub Actions, you can run it manually. We can create a new trigger so that you don't have to push to the branch every time that you want to start the pipeline. So there's a workflow trigger thing that we can add to that.We.Hand.Runners and see.What happens? So you'd have to probably associate it to your pool. Now the complicated thing about this is it might.Nuts work the first time because the runs on field depends on a docker image I think, so I don't know if it will work for all environments.For example Windows. I don't think you could do that. I have to figure that out.So you may have to set the runs on to a.Your self hosted runner.Name or ID or something like that. Otherwise it will just sit in the queue because there are no runners available, but it might be good exercise to.Do that just to show you the capabilities and why some of them do and don't work and such like that.And yeah.Uh, I'll probably have to figure that at some point I guess.Um.

After you get the GitHub Actions set up as a self hosted runner, you can modify the GitHub Actions workflow file to run on the self hosted runner instead of Ubuntu latest.After you push a commit, for example modifying the reboot file, you'll notice that within about four or five seconds, the GitHub Actions runner will run that build script on your local computer.We will add another step that will.List the contents of your C drive to show you that this is a stateful environment and to prove that it is actually running on your own computer.Um.The goal what I'm trying to show here, you can also peak in the GitHub Actions Runner folder under C Drive to kind of see how things are broken down and you could also see a copy of your repository that was downloaded too.You can also see the content of the GitHub Actions action, which is a checkout action and you can also look at its source code.It's simply just stayed note application that runs and checks out your code.Umm.So that's essentially what's doing it on a build server.It just has the agent running reconfigured.And that it does the same.Kind of thing.

The reason why the runs on Ubuntu latest.Just kept their job in the queue and didn't do anything.Well, I guess because.You'd have to turn off sub posted. You have to turn on self hosted runners to turn off the GitHub Actions workflow for that to work, but.Umm.It looks.Whenever you have whenever you create a new vendor pool.Each runner has its own label, so for example in this case our runner has a self hosted labeled by default.And the ones on GitHub or preconfigured with Ubuntu latest as well as like much rather ones. So if we called ours Ubuntu latest.Technically that was be affect confusing because it's kind of a reserve for GitHub Actions, but it would run.On.Our server to label is just specifying what capabilities like Tiger I have.

Also notice that if you didn't have NPM install it would have thrown a command not found error, or if you did have MPN installed it just uses your version installed NPM. This is because it's literally just running the instructions on your computer.There's no real isolation other than having a bit of a work directory to kind of keep things organized.

+-----------------------------------------------------------------------------------------------------------------------------------------------------------------+
| PS C:\\actions-runner> ./config.cmd --url https://github.com/alexyorke/OptimaShot --token token_here |
| |
| -------------------------------------------------------------------------------------------------------------------------- |
| |
| | ____ _ _ _ _ _ _ | |
| |
| | / ___(_) |_| | |\_ __| |__/ \ ___| |(_) ___ _ __ ___ | |
| |
| | | | _| | __| | | | | '_ \ / _ \ / __| __| |/ _ \| '_ \/ __| | |
| |
| | | | | | |_| _ | |_| | |_) | / ___ \ (__ | |_| | (_) | | | \__ \ | |
| |
| | \____|_|\__|_| |_|\__,_|_.__/ /_/ \_\___|\__|_|\___/|_| |_|___/ | |
| |
| | | |
| |
| | Self-hosted runner registration | |
| |
| | | |
| |
| -------------------------------------------------------------------------------------------------------------------------- |
| |
| # Authentication |
| |
| √ Connected to GitHub |
| |
| # Runner Registration |
| |
| Enter the name of the runner group to add this runner to: [press Enter for Default] |
| |
| Enter the name of runner: [press Enter for DESKTOP-7M8V9ET] |
| |
| This runner will have the following labels: 'self-hosted', 'Windows', 'X64' |
| |
| Enter any additional labels (ex. label-1,label-2): [press Enter to skip] |
| |
| √ Runner successfully added |
| |
| √ Runner connection is good |
| |
| # Runner settings |
| |
| Enter name of work folder: [press Enter for _work] |
| |
| √ Settings Saved. |
| |
| Would you like to run the runner as service? (Y/N) [press Enter for N] |
| |
| PS C:\\actions-runner> ./run.cmd |
| |
| 1 file(s) copied. |
| |
| √ Connected to GitHub |
| |
| Current runner version: '2.316.0' |
| |
| 2024-05-06 05:19:09Z: Listening for Jobs |
| |
| 2024-05-06 05:20:12Z: Running job: build |
| |
| 2024-05-06 05:20:30Z: Job build completed with result: Succeeded |
|=================================================================================================================================================================+
|-----------------------------------------------------------------------------------------------------------------------------------------------------------------|

|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Detailed Breakdown of GitHub Actions Self-Hosted Agent Log File: |
| |
| 1. Runner.Listener Startup: |
| |
| Credential and Configuration Reading: The listener process begins by accessing and reading the necessary credentials and configuration files. This likely includes information like the runner token, GitHub server URL, and work directory path. |
| |
| Runner.Worker.exe Launch: After initializing itself, the listener spawns a new process, Runner.Worker.exe. This worker process is responsible for executing the actual jobs assigned to the self-hosted runner. |
| |
| Diagnostic Logging: Throughout its operation, the listener logs relevant events and activities to a designated diagnostic log file. This provides valuable information for troubleshooting and understanding the runner's behavior. |
| |
| 2. Runner.Worker Initialization: |
| |
| Library Loading: The worker loads essential libraries (DLLs) to function correctly. |
| |
| Runner.Worker.dll: Contains the core logic for the worker process. |
| |
| .NET Core Runtime Libraries: hostfxr.dll and coreclr.dll are crucial for running applications based on the .NET Core framework, indicating the self-hosted agent's dependence on this technology. |
| |
| Windows Defender Scans: As each DLL is loaded, the MsMpEng.exe process (Windows Defender) performs scans to ensure the files are safe and do not contain any malicious code. |
| |
| Configuration File Parsing: The worker then reads and parses various configuration files to understand the environment and job requirements. |
| |
| Runner.Worker.deps.json: Specifies the dependencies required by the worker and the actions it executes. |
| |
| Runner.Worker.runtimeconfig.json: Contains configuration details for the .NET Core runtime environment, like the framework version and garbage collector settings. |
| |
| Additional Library Loading: Based on the information gathered from the configuration files, the worker loads further system libraries for specific functionalities. |
| |
| System.Private.CoreLib.dll: Provides fundamental classes and utilities essential for .NET Core applications. |
| |
| clrjit.dll: Handles Just-In-Time (JIT) compilation, which translates intermediate language code into machine code for efficient execution. |
| |
| 3. Job Preparation: |
| |
| Runner and Setup Information: The worker accesses files like .runner and .setup_info to gather details about the runner environment, its capabilities, and any setup scripts that need to be run before job execution. |
| |
| Working Directory and Pipeline Mappings: Based on the workflow and job requirements, the worker creates the necessary working directories within the work folder. It also manages pipeline mappings, associating workflow files with their corresponding directories, ensuring jobs run in isolated environments. |
| |
| Action Download and Extraction: The worker downloads the required action, in this case, the "actions/checkout@v4" action, as a zip file. It then extracts the contents of the zip file into a temporary directory within the _work/_actions folder, preparing the action for execution. |
| |
| 4. Action Checkout: |
| |
| File Operations: A sequence of file operations unfolds as the checkout action is executed. |
| |
| Directory and File Creation: The worker creates directories and files as needed by the action. This includes creating folders for the repository, action scripts, and any necessary configuration files. |
| |
| File Attribute Management: The worker utilizes system calls to set file attributes, such as read-only or hidden, as required by the action or the runner environment. |
| |
| File Content Writing: Content, such as code, documentation, or configuration settings, is written to various files, including action.yml, README.md, and other relevant files for the checkout process. |
| |
| Process Collaboration: Both Runner.Worker.exe and bzserv.exe (a background process related to runner operations) participate in these file operations, indicating collaboration between processes during action execution. |
| |
| 5. Workflow Execution: |
| |
| Workflow Event File Creation: The worker generates an "event.json" file within the _work/_temp/_github_workflow directory. This file likely contains information about the workflow event that triggered the job, such as a push or pull request event, along with relevant details about the repository and commit. |
| |
| Runner File Command Preparation: The worker prepares a series of files within the _work/_temp/_runner_file_commands directory. These files contain commands for managing the runner environment during job execution. This includes commands for adding paths to the system's PATH environment variable, setting environment variables with specific values, generating step summaries, saving state information, and setting outputs for subsequent steps in the workflow. |
| |
| Node.js Runtime Launch: A new process, node.exe (the Node.js runtime environment) is launched by the worker. This suggests that the checkout action or subsequent steps in the workflow utilize JavaScript code that needs to be executed within the Node.js environment. |
| |
| 6. Node.js Execution: |
| |
| Repository Interaction: The Node.js process interacts with the git repository. |
| |
| Configuration Management: It reads and writes git configuration files like .gitconfig and config files within the .git folder to ensure the repository is set up correctly and to configure authentication details. |
| |
| Git Operations: The process likely performs git operations like fetching, cloning, or checking out specific branches or commits as required by the workflow. |
| |
| Workflow Event File Processing: Node.js accesses and reads the "event.json" file created earlier, utilizing the information about the workflow event to determine appropriate actions and configure the environment accordingly. |
| |
| System Tool Usage: Node.js interacts with various system tools to perform tasks like text processing and information gathering. |
| |
| sh.exe: The shell is used to execute shell commands, potentially for setting up the environment or running scripts. |
| |
| basename.exe and sed.exe: These tools are likely used for text manipulation tasks like extracting filenames or modifying content within files. |
| |
| uname.exe: This tool helps gather information about the operating system, which can be useful for making decisions or customizing the environment based on the runner platform. |
| |
| 7. Job Completion: |
| |
| Diagnostic File Writing and Closure: The worker writes any final summary information or logs to the relevant diagnostic files before closing them. This ensures that all pertinent information about the job execution is captured for future reference or troubleshooting. |
| |
| Temporary File Cleanup: The worker removes temporary files and directories that were created during job execution. This helps maintain a clean working environment and prevents unnecessary disk space usage. |
| |
| Worker Process Exit: After completing all tasks and cleanup, the worker process exits, signaling the end of the job execution on the self-hosted runner. |
| |
| Additional Considerations: |
| |
| The log file does not explicitly reveal the specific logic within the checkout action or the workflow steps. However, the file and process interactions provide valuable clues about the actions being performed. |
| |
| The log focuses on a single job execution, and the details may vary significantly depending on the specific workflow and the actions involved. |
| |
| I hope this expanded breakdown provides a clearer understanding of the processes and activities involved in the GitHub Actions self-hosted agent's operation. |
|=================================================================================================================================================================================================================================================================================================================================================================================================================================================================================+
|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|

Challenges with Poor Work Structuring:

- Broken features: Removing old features before creating new ones can leave the application unusable during development.

- Difficult testing: Tightly coupled code with dependencies across features makes testing and isolation challenging.

- Feature flag complexity: Lack of modularity complicates feature flag implementation and rollouts.

Strategies for Effective Work Structuring:

- Modular architecture: Design the application with well-defined modules and clear separation of concerns.

- Small, independent tasks: Break down features into manageable units that can be developed and tested independently.

- Feature flags: Use feature flags to hide incomplete features and control their rollout without affecting the main application.

Example: In the weather app, a modular design allows for developing a new receipt generation method without impacting existing functionality, simplifying testing and feature flag implementation.

By structuring work effectively, you can ensure a smooth CI/CD process while maintaining a usable and continuously deployable application.

----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
| In software development, features should be modular and loosely coupled to allow for flexibility and independent scaling or modification. When features are unnecessarily tied together, changes to one feature can inadvertently affect the other, making it difficult to implement feature flags or make isolated changes. Below is an example of Java code that demonstrates two features that are unnecessarily intertwined: |
| |
| `java |
| |
| public class PaymentProcessor { |
| |
| // Feature 1: Process credit card payment |
| |
| // Feature 2: Generate receipt for the payment |
| |
| public void processPaymentAndGenerateReceipt(String creditCardNumber, double amount) { |
| |
| // Process the credit card payment |
| |
| if (!validateCreditCard(creditCardNumber)) { |
| |
| throw new IllegalArgumentException("Invalid credit card number."); |
| |
| } |
| |
| System.out.println("Processing credit card payment for amount: " + amount); |
| |
| // ... (Payment processing logic) |
| |
| // Generate a receipt after processing payment |
| |
| String receipt = "Receipt: Credit Card Payment of $" + amount + " processed."; |
| |
| System.out.println(receipt); |
| |
| // Send an email with the receipt |
| |
| // This logic is tightly coupled with payment processing. |
| |
| sendReceiptEmail(receipt); |
| |
| } |
| |
| private boolean validateCreditCard(String creditCardNumber) { |
| |
| // Validation logic for the credit card number |
| |
| return creditCardNumber.startsWith("4"); // Simplistic check for a Visa card |
| |
| } |
| |
| private void sendReceiptEmail(String receipt) { |
| |
| // Email sending logic |
| |
| System.out.println("Sending receipt via email: " + receipt); |
| |
| } |
| |
| } |
| |
| public class Main { |
| |
| public static void main(String[] args) { |
| |
| PaymentProcessor processor = new PaymentProcessor(); |
| |
| processor.processPaymentAndGenerateReceipt("4111111111111111", 100.0); |
| |
| } |
| |
| } |
| |
| ` |
| |
| In this example, the `processPaymentAndGenerateReceipt` method ties together the payment processing logic and receipt generation, including sending the receipt via email. These features should be separate to allow for changes such as modifying the receipt format or payment processing logic independently. |
| |
| Here's how you might refactor this to decouple the features and make it easier to put behind feature flags: |
| |
| `java |
| |
| public class PaymentProcessor { |
| |
| // Feature 1: Process credit card payment |
| |
| public boolean processPayment(String creditCardNumber, double amount) { |
| |
| if (!validateCreditCard(creditCardNumber)) { |
| |
| return false; |
| |
| } |
| |
| System.out.println("Processing credit card payment for amount: " + amount); |
| |
| // ... (Payment processing logic) |
| |
| return true; |
| |
| } |
| |
| // Feature 2: Generate receipt for the payment |
| |
| public String generateReceipt(double amount) { |
| |
| // Receipt generation logic can be changed independently |
| |
| return "Receipt: Credit Card Payment of $" + amount + " processed."; |
| |
| } |
| |
| private boolean validateCreditCard(String creditCardNumber) { |
| |
| // Validation logic for the credit card number |
| |
| return creditCardNumber.startsWith("4"); // Simplistic check for a Visa card |
| |
| } |
| |
| } |
| |
| public class EmailService { |
| |
| public void sendReceiptEmail(String receipt) { |
| |
| // Email sending logic is separate |
| |
| System.out.println("Sending receipt via email: " + receipt); |
| |
| } |
| |
| } |
| |
| public class Main { |
| |
| public static void main(String[] args) { |
| |
| PaymentProcessor processor = new PaymentProcessor(); |
| |
| EmailService emailService = new EmailService(); |
| |
| // Feature flags could be used to control the flow here |
| |
| boolean paymentSuccess = processor.processPayment("4111111111111111", 100.0); |
| |
| if (paymentSuccess) { |
| |
| String receipt = processor.generateReceipt(100.0); |
| |
| // The email feature can be toggled on or off |
| |
| boolean emailReceiptFeatureFlag = true; // This could be driven by external config |
| |
| if (emailReceiptFeatureFlag) { |
| |
| emailService.sendReceiptEmail(receipt); |
| |
| } |
| |
| } |
| |
| } |
| |
| } |
| |
| ` |
| |
| By decoupling the payment processing from the receipt generation and email sending, we can now easily add a feature flag for sending receipts via email without affecting the payment processing logic. Each component can be developed, tested, and changed independently, allowing for more flexible development and deployment workflows. |
|==================================================================================================================================================================================================================================================================================================================================================================================================================================+
|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|


