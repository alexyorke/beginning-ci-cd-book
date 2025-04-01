## **Streamlined Guide to Setting Up a Continuous Deployment Pipeline** {#streamlined-guide-to-setting-up-a-continuous-deployment-pipeline .unnumbered}

This guide provides a concise overview of setting up a continuous deployment (CD) pipeline, focusing on key concepts and best practices:

**1. Creating the Pipeline:**

- Use your CI/CD tool and connect it to your artifact repository.

- Choose a clear and descriptive pipeline name (e.g., \"Production - \[Software Name\]\").

**2. Deployment Infrastructure:**

- Decide on your hosting environment (cloud providers like AWS, Google Cloud, Azure, or on-premise).

- Key cloud provider offerings include:

  - Container orchestration (Kubernetes services like ECS, AKS, GKE)

  - Serverless platforms (AWS Lambda, Azure Functions, Google Cloud Functions)

  - Infrastructure as Code (IaC) tools (CloudFormation, ARM, Deployment Manager)

  - Monitoring and Logging services

  - Security and Compliance tools

  - Artifact Management services

-

- Carefully evaluate hosting providers based on:

  - Existing relationships and contracts

  - Support contracts and SLAs

  - Use-case support (e.g., IaC compatibility)

- **3. Continuous Deployment Pipeline Steps:**

- **Artifact Retrieval:** Fetch the correct artifact versions from your repository.

- **Containerization (if applicable):** Build and package your application within a Docker container.

- **Artifact Packaging:** Prepare all necessary files, configurations, and dependencies.

- **Security Scanning:** Scan the built container for vulnerabilities.

- **Cleanup:** Remove temporary files to ensure a clean deployment package.

- **Container Registry:** Push the versioned container image to your registry.

- **Stakeholder Notification:** Inform relevant parties about the deployment.

- **Deployment:** Automate the deployment process to your chosen infrastructure.

  - Use safe deployment practices like blue-green or rolling deployments for minimal downtime.

-

- **Infrastructure Provisioning:** Utilize IaC to manage and automate infrastructure setup.

- **Monitoring and Rollback:** Implement robust monitoring to detect and address issues during and after deployment. Consider strategies like rollbacks or roll forwards.

**4. Release Management:**

- **Gradual Rollout:** Incrementally release new features using techniques like blue-green deployments to minimize risk and impact on users.

- **Monitoring and SLAs:** Establish comprehensive monitoring to track application health, performance, and user experience. Set and meet Service Level Agreements (SLAs) to ensure application availability.

**Key Considerations:**

- **Feature Flags:** Utilize feature flags to control the release of new features independently from deployments.

- **Database Migrations:** Carefully plan and execute database schema changes, especially in environments with multiple application versions.

- **Testing:** Perform thorough pre-deployment and post-deployment testing to catch environment-specific issues.

By following these guidelines, you can establish a robust and efficient continuous deployment pipeline that enables faster and more reliable software releases.

### What is IaC (infrastructure as code?) {#what-is-iac-infrastructure-as-code .unnumbered}

- So, you have your application sitting as build artifacts. That's not super useful to the customer. How do you get it to the customer? Well, it has to be deployed to an environment accessible to the customer, usually via the internet.

- Continuous Deployment (CD) uses the build artifacts from Continuous Integration (CI) and deploys them to production using Infrastructure as Code (IaC). This isn\'t just about running scripts; CD involves comprehensive processes like testing and monitoring. By leveraging CI artifacts, trust is maintained, ensuring that what was tested is what gets deployed. Essentially, Continuous Deployment spans the journey from a developer\'s initial feature development to its live presence in production.

- Continuous Delivery, on the other hand, offers the flexibility to release updates whenever desired, without it being compulsory. Regular releases, as advocated by CD, foster resiliency and facilitate rapid adaptation to user feedback. Smaller, frequent changes are easier to manage and rectify if issues arise. Plus, with the unpredictable ways customers might use features, it\'s advantageous to remain agile and receptive to evolving requirements.

- **Note:** Reusing CI artifacts in CD instills trust; otherwise, the integrity of the entire CI process would be questioned because the artifacts that were tested are different from what is being deployed.

- When we talk about IaC, it means Infrastructure as Code. It is a way to specify which infrastructure needs to be provisioned for your application to run.

- In the past, this may have been a set of instructions, written down on what the current infrastructure looked like and how to set it up. For example, "Click on this button, type in this field, click on Create VM, name it this, etc.". Documentation quickly goes out of date, and it's error-prone and difficult to follow these steps. Not to mention that any configuration changes, no matter how small, in one environment without updating the docs can cause configuration drift: an unfortunate occurrence for managing complex infrastructure.

- The reason why manual infrastructure deployments are not very CI/CD-like, is because they're complicated. They live in people's heads as a fragmented system. And since computers can't mind-read yet, it's not easily possible to re-create that environment, should something go wrong, or if you want to maintain a known good state. Did we change such-and-such last week? Memory is fickle.

- Why is it related to CD?

  - The CD pipeline would take the template provided in VCS and run the terraform script on your cloud provider and prepare the infrastructure. This should happen all automatically.

- What are the principles or values of IaC?

  - Idempotency: no matter how many times you deploy, you'll get the same thing.

  - Immutable: immutable means something that cannot change. Therefore, instead of updating the infrastructure, which could cause configuration issues, replace everything with a new, deployed copy.

  - Composable. Create other puzzle pieces that fit into other architecture patterns.

- Why should I use IaC?

  - Consistency. Everytime you roll out, it will be exactly the same.

  - Reproducibility.

  - Version controlled, thus, it is a single source of truth. Easily rollback to a previous architecture, find what changed (i.e., auditability), or inspect the current architecture.

  - Speed and a fast feedback loop. Reduce trying to manage your infrastructure and trying to track what you changed manually, which could lead to configuration drift between different environments (e.g., QA/dev and prod.) The issue with configuration drift is that it makes it difficult for developers to have a fast feedback loop, because they can't trust that their changes will work in prod if it works in dev because the environments might be too different. Tracking changes in dev to reflect in prod is also tedious.

  - Security.

- What providers do I have for infrastructure deployments? What are some ways I can run IaC code? There are several tools and providers available for infrastructure deployments:

  - Terraform: A cloud-agnostic tool that uses HCL.

  - AWS CloudFormation: Specific to AWS, it uses JSON or YAML templates.

  - Azure Resource Manager (ARM): Used for deploying resources in Microsoft Azure.

  - Google Cloud Deployment Manager: For Google Cloud Platform (GCP) resources.

  - Ansible: An open-source automation tool that can handle tasks such as configuration management and application deployment.

  - Chef and Puppet: Configuration management tools that allow you to define the state of your systems and then automatically enforce that state.

+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Certainly! **Infrastructure as Code (IaC)** is a practice in which infrastructure (networks, virtual machines, load balancers, and connection topology) is provisioned and managed using code and software development techniques. The \"advanced beginner\" in software or IT might be familiar with setting up environments manually through user interfaces or direct commands. IaC takes this to the next level, leveraging code to automate these tasks. Here\'s a more detailed breakdown tailored for an advanced beginner: |
| |
| 1\. **Code, Not Manual Configuration:** Instead of manually setting up databases, servers, or networks, in IaC, these resources are defined in code files. This is similar to how a software developer writes programs to execute tasks instead of doing them manually. |
| |
| 2\. **Version Control:** Just like software code, infrastructure code can be versioned. This means you can maintain a history of changes, track alterations, and revert to previous configurations if needed. This is typically managed using version control systems like Git. |
| |
| 3\. **Consistency and Reproducibility:** By defining infrastructure as code, you ensure consistency across different environments. If you\'ve ever heard the phrase \"It works on my machine\", IaC helps to solve that problem. Everyone uses the same configuration files to set up their environments, which can significantly reduce discrepancies between development, staging, and production setups. |
| |
| 4\. **Automation and Speed:** With IaC, tools can read the code files and set up the environment automatically. This can drastically reduce the time to provision or scale infrastructure. No more manual setups or lengthy procedures. |
| |
| 5\. **Documentation:** The code itself acts as documentation. Instead of keeping separate documentation that details how infrastructure is set up (which can become outdated quickly), the IaC configuration provides an up-to-date representation of the infrastructure setup. |
| |
| 6\. **Tools and Platforms:** Various tools enable IaC. Some of the popular ones include: |
| |
| \- **Terraform:** An open-source tool that allows you to define infrastructure in a descriptive manner across various cloud providers. |
| |
| \- **AWS CloudFormation:** A service from Amazon Web Services that lets you describe AWS resources in JSON or YAML format. |
| |
| \- **Ansible, Puppet, Chef:** Configuration management tools that can be used to set up and manage the state of servers. |
| |
| 7\. **Drift Management:** One of the challenges in infrastructure management is \"drift\", where the actual state of the infrastructure deviates from its expected state. IaC tools can often detect and correct drift, ensuring that the infrastructure remains consistent with the code definition. |
| |
| 8\. **Safety and Testing:** With IaC, you can apply software testing principles to your infrastructure. Tools allow for validation and testing of infrastructure code before it\'s applied, reducing potential issues in real-world deployments. |
| |
| In essence, IaC is the practice of treating infrastructure setup and configuration with the same rigor, precision, and automation as application code. This approach results in more efficient, consistent, and reliable operations, bridging the gap between software development and operations. |
+========================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================+
+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

Instead, we can define what we want our infrastructure to be, in a template, usually called an IaC template. They can be written in multiple programming languages--this one is written in a language called "Bicep".

+-----------------------------------------------------------------------+
| param location string = resourceGroup().location |
| |
| resource myVM \'Microsoft.Compute/virtualMachines@2019-07-01\' = { |
| |
| name: \'myVM\' |
| |
| location: location |
| |
| properties: { |
| |
| hardwareProfile: { |
| |
| vmSize: \'Standard_DS1_v2\' |
| |
| } |
| |
| osProfile: { |
| |
| computerName: \'myVM\' |
| |
| adminUsername: \'adminuser\' |
| |
| adminPassword: \'YourStrongPasswordHere\' |
| |
| } |
| |
| storageProfile: { |
| |
| imageReference: { |
| |
| publisher: \'MicrosoftWindowsServer\' |
| |
| offer: \'WindowsServer\' |
| |
| sku: \'2016-Datacenter\' |
| |
| version: \'latest\' |
| |
| } |
| |
| osDisk: { |
| |
| createOption: \'FromImage\' |
| |
| } |
| |
| } |
| |
| networkProfile: { |
| |
| networkInterfaces: \[ |
| |
| { |
| |
| id: resourceId(\'Microsoft.Network/networkInterfaces\', \'myVMNic\') |
| |
| } |
| |
| \] |
| |
| } |
| |
| } |
| |
| } |
+=======================================================================+
+-----------------------------------------------------------------------+

- What you can immediately see here is that there is now a single source of truth: the infrastructure does not live in people's heads, fragmented, it exists, documented, and very clear instructions that computers can understand. If you need a new environment, well, just redeploy. It's squeaky-clean, and brand-new, just like the last one.

- This enables quite a few things.

  - First, we can now deploy our template pretty much anywhere (well, on the same cloud provider, more on that in a bit.) I would like to have a test environment that is essentially identical to production. Bam. Done. Now I can test my code freely, and know that it's likely to work on production.

  - What if I made a mistake, and changed a network adapter but I forgot what settings I changed? IaC templates are part of your repository, and are version controlled with the other code. Therefore, just revert back. All of the changes are logged, so you know what went wrong and how to fix it.

  - All of a sudden, we have more traffic. All we need to do is just deploy the template again (well...)

- Ultimately, they allow for much more control, reproducibility, and experimentation, albeit indirectly.

- This process should be very easy to do. It should be a single button process, with potentially the ability to select which version to deploy. It should be clear which version is the latest version. All versions should be in a state where they can be deployed, because the CI pipeline has validated the changes. Note: depending on your process, you may have to validate the changes through a QA process. Normally, unfinished features are behind feature flags, which allows them to be conditionally enabled only on QA's devices in production. This allows QA to test the features while also not slowing down development on unrelated features, and allows deployment to continue to take place.Let's recap what we have discussed so far.

- The puzzle-pipeline, from inception to art gallery, is much like a software development pipeline. In the puzzle metaphor, the employees were able to send their assistant to check if the picture of the puzzle looks good in the frame in the art gallery. The assistant can work while the employees are still working on the puzzle. In the case of software development, the pipeline provides a set of checks (such as building and testing the code) that provides developers with a baseline level of confidence that their changes work. Instead of sending it to the art gallery via an assistant (who provides feedback quickly), the pipeline is able to run autonomously, quickly and provide feedback. This allows the software developers to make quick changes on the fly.

- Since the pipeline runs after each developer merges their changes, then therefore the application is always integrated, developers have access to other developers' changes, and since the tests ran, it gives a semblance of high code quality and instills confidence in the application.

- Much like the puzzle, the repository is like the puzzle with the grippy board. The grippy board that helps hold the puzzle pieces together while working on it isn't put into the final product, it is just used for development purposes, but everyone who is working on the puzzle needs it.

- This is a collaborative process, provided by CI, that, through code review and small PRs, allow for some semblance of the big picture and allows people to work together to incrementally add the puzzle pieces together.

### Continuous Monitoring {#continuous-monitoring-1 .unnumbered}

[[GitHub - microsoft/FeatureManagement-Dotnet: Microsoft.FeatureManagement provides standardized APIs for enabling feature flags within applications. Utilize this library to secure a consistent experience when developing applications that use patterns such as beta access, rollout, dark deployments, and more.]{.underline}](https://github.com/microsoft/FeatureManagement-Dotnet)

Look at Grafana "exemplars" and "correlations". and application topology map.

- In the world of software development, the role of continuous monitoring can\'t be overstated. It\'s the heartbeat that tells us how our applications are performing, where they\'re faltering, and how users are interacting with them.

- Imagine this: You\'ve just released a new feature. Is it working as expected? Is it meeting user needs? These questions underscore the necessity of a robust monitoring system. But, while having a myriad of dashboards might seem helpful, it\'s not just about accumulating data. It\'s about distilling this data into actionable insights, helping teams swiftly locate and address issues.

#### Why Monitor?

- The purpose of monitoring extends beyond troubleshooting. It offers insights into user behavior, providing key business metrics like daily or monthly user engagement. Such data isn\'t just numbers; it\'s a reflection of user satisfaction and product viability.

#### Characteristics of Effective Monitoring

- Coverage: Traceability through the system is crucial. This means tracking a user request from initiation to conclusion. Correlation IDs or trace IDs can be invaluable in this regard.

- Relevant Data: Log entries should provide meaningful information. Whether it\'s an error message, user ID, application version, or the server it\'s running on, every bit of data aids in piecing together the bigger picture.

- Strategic Logging Points: Position logs where they can offer the most diagnostic value.

- Priority Management: Assign importance to your logs, ensuring critical logs don\'t get buried under the noise.

- Freshness: Updated, real-time data often carries more value than stale information.

#### Making Sense of Data

- Collecting data is only the initial step. **The challenge lies in understanding this data, and will likely take 95% or more of your time.** Visualizing it, plotting graphs, and discerning patterns will likely consume a significant portion of your time. Graphs, while they should be comprehensive, must remain straightforward, avoiding needless complexities that could mislead or confuse.

#### The Importance of Feedback

- Consider a jigsaw puzzle shipped to a customer. How do we know if it reached in perfect condition? Did the colors appeal to the user? Did they find the image appealing? It\'s this feedback, collected via monitoring, that guides further iterations of the product. Continuous monitoring, embedded within the CI/CD pipeline, offers constant feedback on performance, errors, and user engagement.

#### Telemetry: A Close Look

- Telemetry is the backbone of continuous monitoring. It involves collecting data from the platforms where applications are run. This data is gathered on both the server, providing metrics like CPU usage and memory consumption, and within the application, capturing user-specific metrics. These might include engagement levels or user satisfaction metrics.

#### Monitoring Frequency

- By definition, continuous monitoring is unceasing. Data, much like a river, keeps flowing into the central hub, offering a live pulse of the application.

- So the reason why you don\'t monitor absolutely everything is because there\'s a cost of monitoring. Otherwise it\'s just more every single instruction in every single line of code. And the reason is because of that is monitoring is designed to.Be a little bit pragmatic. So you have to kind of know like, OK, what am I trying to actually solve for this?But it was my goal. Am I trying to reason about the program\'s execution?To find a bug. So for example, am I trying to reduce entropy?With the program execution, when someone runs something, then these logs generated and I can retrace the program steps, which case you don\'t need to log every single line of code likely.You see the log you know inside of the if statements and potentially some.Variables are useful.Information.Like that and.Yeah, there definitely is a way to avoid logging, which is, you know, just debugging. But.Debugging is kind of more of a.To all that\'s.Used to kind of fix something as a means to an end and it is kind of difficult to use a sustainably because.Logs provide more context.And there\'s sometimes that you can\'t use it to debugger, like you know, if some customer reproduced at some point or something like that layer code or that\'s never be totally different in the logs can capture that. But you can\'t go back in time with the debugger and try to figure out what exactly happened. It\'s very difficult to take dumps and such.Um.So.And another thing is if you matter too much, um, you have to do something with this data. And if you just have way too many logs while Southern application performance, if it\'s got too much, if you\'re using like mobile applications, for example, well, you know, it\'s, you know, you\'re pumping out like hundreds of megabytes of logs.Over the user cellular connection or the ASB battering ram and such.The other part is actually like how to process it. And if you\'re logging like way too much stuff, you\'re spending a lot of these CPU cycles and.Storage and self storing all this stuff.And it\'s even more difficult to audit as well.Have you said that like you, too little is also?Definitely probably a larger problem so.Log 2 matches. Probably better to do that instead of logging too little I\'d say.

- And another thing, sometimes people differentiate it.It\'s metrics and locking and analytics so.Logging is just kind of the act of just like saying ohh you know, the program breached.This point or something like that, uh, metrics are kind of more about.Ah.Logging things that can be graphed, so for example like CPU usage would be considered a metric. You could have a graph that shows like over time.How much memory using, how much CPU you\'re using inside, etc. Technically these are logs, but there could be a bit differently to kind of process differently as well. They\'re not really associated to a code path per se, it\'s just like.Diagnostics for the for the whole machine.

- And let\'s try to do this for another application. The first step is with logging. It\'s normally to help to reduce the entropy of your program state.So in this case.We have the application initializers and displays some stuff to the user. Let\'s just kind of go over like a very basic logging exercise. Let\'s also go into correlation IDs to show how you can trace the request back from users web browser all the way throughout the application. What request the application?Makes, et cetera, and we\'ll see why later, why this is really helpful and important.And this usually requires doing some manual setup with the conference doctor. No per se.Like.That this is associated to this request or something like that.So yeah, I think it\'s going to be really useful.

- So the first thing I probably do is bring up our code that we have and then figure out where it probably be good spots to do.Some logging and then as we make our application more complicated, we\'ll see kind of how this scales.Umm.As well and a lot of don\'t necessarily have committed through every single application this call like you can admit it only like 10% of the time or 5% of the time. Just get like a good understanding of what\'s happening, especially there\'s a lot of users hitting that same point. You don\'t necessarily need like 100% of the time, it\'s always.Logging that because it could be bad for performance. But again, it kind of depends on your use case. You\'re probably going through this a little bit more as well.

+-----------------------------------------------------------------------------------------------------------------+
| import React, { useState, useEffect } from \'react\'; |
| |
| import axios from \'axios\'; |
| |
| // Data fetching logic extracted to a custom hook |
| |
| function useWeather(apiKey) { |
| |
| const \[weather, setWeather\] = useState(null); |
| |
| const \[loading, setLoading\] = useState(true); |
| |
| const \[error, setError\] = useState(null); |
| |
| useEffect(() =\> { |
| |
| async function fetchWeather() { |
| |
| try { |
| |
| const response = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=London&appid=\${apiKey}`); |
| |
| setWeather(response.data); |
| |
| setLoading(false); |
| |
| } catch (error) { |
| |
| setError(error); |
| |
| setLoading(false); |
| |
| } |
| |
| } |
| |
| fetchWeather(); |
| |
| }, \[apiKey\]); |
| |
| return { weather, loading, error }; |
| |
| } |
| |
| function Weather() { |
| |
| const apiKey = process.env.REACT_APP_WEATHER_API_KEY; |
| |
| const { weather, loading, error } = useWeather(apiKey); |
| |
| if (loading) return \<p\>Loading weather\...\</p\>; |
| |
| if (error) return \<p\>Error fetching weather\</p\>; |
| |
| return ( |
| |
| \<div\> |
| |
| \<h1\>{weather.name}\</h1\> |
| |
| \<p\>Temperature: {weather.main.temp}°C\</p\> |
| |
| \<p\>Condition: {weather.weather\[0\].description}\</p\> |
| |
| \</div\> |
| |
| ); |
| |
| } |
| |
| export default Weather; |
+=================================================================================================================+
+-----------------------------------------------------------------------------------------------------------------+

Let\'s explore where it might be beneficial to implement logging in an application. Proactive logging is crucial as it allows for quicker bug resolution without needing additional log deployments. For example, in an application that handles weather data, important log points could include:

1\. **Initial API Key Check**: Verify if the API key is set but avoid logging sensitive information.

2\. **Conditional Statements**: Log within conditions handling loading errors or operational states to trace the application flow and identify issues.

3\. **Performance Metrics**: Log the duration it takes to load the weather data, potentially using Web Vitals to capture timing from the initial request to the display on the user's screen.

4\. **Error Handling**: Implement an error boundary to log errors without crashing the application, providing a fallback UI with support links for a better user experience.

5\. **Telemetry and Metrics**: Beyond basic logging, collect telemetry on user interactions, such as location queries, to inform higher-level management reports and monitor system performance.

Additionally, consider logging retry attempts in server communications to correlate them with session IDs, enhancing error analysis and improving the overall reliability of data capture in your application. This approach to logging not only aids in immediate troubleshooting but also enhances long-term application stability and user satisfaction.

Web Vitals primarily focuses on assessing the performance of applications, particularly useful for single-page applications, though adaptable for others. It measures high-level performance metrics like initial load time and various user interaction metrics to detect performance regressions. Installation and usage are straightforward: simply install the Web Vitals package and integrate it into your application.

It\'s designed to capture events such as input delays during usage, continuously updating to reflect the maximum input delay observed. This requires careful database query structuring to ensure only the latest event per session is considered, avoiding duplicates. This is because Web Vitals may send multiple events as it updates the maximum observed values while the application is in use. If the user exits prematurely, some data may not be transmitted, although web beacons could mitigate this issue, albeit with limited library support.

#### Reliability and Performance Metrics

- It\'s impractical to keep a human eye on the influx of data at all times. This is where automated alerts come in, signaling when intervention is necessary. Using reliability metrics like ICE (Ideal Customer Experience) and ACE (Adjusted Customer Experience), teams can gauge application performance against established benchmarks.

#### Introduction

- Let's set the scene. You've released a new feature, or want to ensure that your website or app is still usable by the customers. You can use monitoring to make sure that your customers expectations (with regard to automated tests and performance) remain valid.

- There is one thing about monitoring, however. It's likely that your dashboards aren't going to tell you precisely where the problem is, therefore, you should make your code flexible, and develop a good monitoring strategy to know where to log or to debug next. If that was the case, then, well, you better get coding, because you're going to need a _lot_ of dashboards. This might not be a worthwhile strategy. Part of monitoring is about reducing execution entropy and to reduce disorder by tracing execution. It's important to be able to know how to read a dashboard, which metrics are important, which are less important, and how this corresponds with the actual system, including how to trace requests and look up logs.

- Monitoring isn't all about trying to find bugs. It's also useful for understanding user behavior, for example, how many users use the app per day/month or how many users use the platform. These are very important business KPIs.

- Things that a good monitoring system has:

  - Coverage. The ability to trace a request through the entire system. This doesn't mean that you will necessarily know precisely what happens at each step, only that it goes through a system, but it got messed up for example. There has to be a complete path from the user\'s web browser all the way to the request being serviced, and back again. Teams should provide a correlation id with requests, or provide the capability for you to add your own trace id to the request so that you can track it and helps the other team know if you need help. This might mean that you need to add monitoring to many other intermediary services.

  - Useful data. The events/metrics/logs have to be useful and contain relevant information which can be used to debug. For example, if a user is trying to sign up, but fails, then it might be useful to log their user id or the associated error message. One of the goals should be to reduce execution entropy. Think about it from the person using the logs to ascertain previous system behavior. Are they able to find out where the request failed within your application? How much are they able to narrow it down? It might also include the application's version, along with other versioning information, such as what server it is running on.

  - Useful logging points. This is similar to useful data, but the logging should be in places where it matters, and has a capability to help debug the application, for example, usually before and after control-flow statements, but this depends.

  - Priority/importance. Not all logs are useful, but some are. This doesn't mean you shouldn't log anything that is not critical, it just means to assign a priority to your logs. This allows you to easily filter for the high-important items, providing a better signal to noise ratio.

  - Frequency. Stale or old data is normally less useful than fresh, up to date data, much like a stream.

- Collecting data is the "easy" part. What do I do with all of this data? This is called sensemaking, literally, making sense of the data. IThe act of aggregating, graphing, plotting, and transforming your data is likely to take 90% or more of your time. It's important that you have clear graphs that represent your data accurately, and you might find it useful to graph the same data using multiple data visualization formats multiple times to get different perspectives. [[Show Me the Numbers: Designing Tables and Graphs to Enlighten: Few, Stephen: 9780970601971: Books - Amazon.ca]{.underline}](https://www.amazon.ca/Show-Me-Numbers-Designing-Enlighten/dp/0970601972/ref=sr_1_2?crid=23RT5HWHMW45D&keywords=stephen+few&qid=1698282393&s=books&sprefix=stephen+fe%2Cstripbooks%2C131&sr=1-2) This book is intended for how to design boring graphs. Boring graphs aren't a bad thing, you don't want to be distracted by unnecessary visuals which might alter your perception of the data, or to distract you. Graphs should be used to enlighten, not confuse (at least within the technical realm.)

#### Why is monitoring important?

- After the puzzles have been shipped to our customers, how do we know if they liked them? Were they satisfied? We can put our phone number in the box so that they can call us if they liked it or didn't like it.

- Some of the other questions we'd like answered are:

  - Was the puzzle squished in shipping?

  - Do the colors look nice?

  - Did the image look ok?

- Instead of spending more and more and more energy making the process perfect, which would significantly hinder the integration time (i.e., diminishing returns), we instead try to be resilient and understand how to fix things as they come up, and limit the amount of damage. We expect that there are, at some point, going to be issues. Therefore, we proactively make sure that we have the capability to know when these errors will occur, and limit the amount of customers that are impacted by doing incremental rollouts. We also want to have the ability to know if our customers are using the feature as well, which is important for the business (which would be considered a non-error metric.)

- Continuous Monitoring corresponds to this feedback mechanism: getting feedback. In this case, continuous monitoring refers to getting feedback from a customer's device where they are running our application, in terms of performance, errors, engagement, and more. Developers should embed telemetry inside of their features to ensure that customers are using them, and to quickly turn off the feature flag should there be an error. This is because features with errors could corrupt data, and are not beneficial to the customer's experience. Feature flags are a huge part of continuous integration and CD: they enable developers to quickly experiment and integrate code, all the way to production. Much like a river, events are continuously generated, and continuously logged, and continuously monitored.

- With continuous monitoring, developers will add monitoring to the features that they release, including monitoring metrics for the physical servers that they are deployed to.

#### Terms

+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| 5\. **KPIs**: Key Performance Indicators. Metrics that demonstrate how effectively a company is achieving its business objectives. |
| |
| 7\. **Correlation id**: A unique identifier value that is attached to requests and messages that allow tracing of the whole chain of events of a transaction. |
| |
| 8\. **Telemetry**: An automated process where measurements and data are collected at remote points and transmitted to receiving equipment for monitoring. |
| |
| 10\. **MAU**: Monthly Active Users. The number of users who interact with a product within a 30-day window. |
| |
| 11\. **SLA**: Service Level Agreement. A contract between a service provider and the end-user that specifies what level of service is expected during the agreement\'s duration. |
| |
| 12\. **ICE (Ideal Customer Experience)**: A metric that measures user satisfaction, calculated as the number of successes divided by starts. |
| |
| 13\. **ACE (Adjusted Customer Experience)**: A metric that considers both successes and expected failures, divided by starts. |
| |
| 14\. **Error Budget**: An engineering concept based on the premise that 100% uptime or reliability is neither realistic nor the goal; instead, a certain \"budget\" of allowable errors or downtime is set. |
+=================================================================================================================================================================================================================+
+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

#### What is telemetry?

- Telemetry is a method to collect and send data from customer devices where our applications run. Developers embed telemetry within features to monitor performance, errors, engagement, and other metrics.

- The way continuous monitoring is integrated into your application is two-fold:

  - On the servers hosting the application, there are several integrations or applications you can use to monitor server-specific metrics, such as the number of requests served per second, CPU usage, memory, disk, etc. These are usually agents or applications that run directly on your server, or, it could be provided by your cloud-hosting provider. Normally, this doesn't require modifying the application, but it depends on what type of metrics you want to collect.

  - On the applications themselves, normally, you'd want to collect application-specific or user-specific telemetry. This does require modifying the application to add code to log the specific metrics that you are interested in. There are some frameworks on how to collect this telemetry, and, depending on which telemetry you are collecting, might be sent to a third-party server or your server. If collecting it yourself, it is normally via an HTTP endpoint which stores events into a database that can be queried later (e.g., for reporting.) Some useful metrics that you might be interested in are how many users are using your application per month (MAU), per week, or per day, and whether the user's are happy.

  - There might be several points in-between, such as those from different teams, that may also benefit from monitoring.

#### Frequency of monitoring

- Well, continuous monitoring monitors continuously. This means that as event data is generated, it is streamed (like a river) to our centralized analytics hub. In some cases, it might be aggregated or batched up on the client's side, but this is an advanced topic.

#### Benchmarks for reliability and performance

- Of course, someone isn't staring at the data all day, that would not be a very good use of their time. Instead, we can set up alerts or rules that trigger an event (such as a phone call, email, etc. based on the severity of the alert) for an intervention to occur. An intervention is an act that a human does in order to fix or silence the alert; the computer says that something is wrong, and the human has to either fix it or silence the alert by evaluating the situation. Sometimes, you can also set up automatic interventions where a pre-programmed action takes place if there is a certain type of alert.

  - Let's say we have some telemetry for our new feature set up. Whenever there is an error, the error handler triggers and sends us some error telemetry. If there's a lot of people using our application, there's bound to be maybe one or two false positives. Say that there are millions of people using our application. We might not want to wake up every time someone encounters an error, otherwise I would not get any sleep.

  - In the industry, we measure application reliability and success through something called ACE and ICE [[Delve Telemetry & Monitoring. My name is Luka Bozic and I'm a... \| by Delve Engineering \| Medium]{.underline}](https://medium.com/@delveeng/delve-telemetry-monitoring-686cdbf4b84f).

  - "ICE (Ideal Customer Experience) = successes / starts". In this case, we have 999999 successes and 10000000 total starts (one error.) So, our ICE would be 0.999999.

  - "ACE (Adjusted Customer Experience) = (successes + expected failures) / starts". Expected failures are errors that are retried (succeeded), or errors that are technically not "errors". In this case, our ACE would be the same as our ICE.

- What would my ICE and ACE be? It depends on your application, but usually 99.95% is a good start. This really underscores the importance of good monitoring and also bridges the gap between what the customers see, and what is being evaluated against. Monitoring is only as good as what you put into it.

- But, that doesn't allow for much experimentation, does it? Correct. This allows for about four hours and 20 minutes of downtime, per year [[SLA & Uptime calculator: How much downtime corresponds to 99.95 % uptime]{.underline}](https://uptime.is/). Going up to 99.99% is about 52 minutes of downtime per year. Note that this normally means that the entire application is unavailable; if items are feature flighted then it is likely that an individual customer(s) will have downtime. Therefore, if you are going to make an SLA, then know that it can restrict how much experimentation takes place.

- Wow, we should be super on the safe side, right? Well, technically. You can take calculated risks, such as by using an error budget which allows the team to perform more risky changes when you still have SLA remaining. This allows customers to expect a certain level of stability, while also ensuring that the team can continue to experiment and deliver features on time. This also helps keep stakeholders informed as to the extent that customers are impacted.

#### Getting started with monitoring

- It's likely that your application is complicated. Where do we start to collect data? When we think about what we need to collect, we need to start with a user-focused mindset. This normally involves collecting telemetry on the user's side, such as performance, errors, and frequency metrics (e.g., how often a button was pressed.) It's important to think about the big picture about what you're trying to achieve first, and then do the concrete implementation of the telemetry later. For example, say I want to know if the "Create project" feature that is being rolled out meets customers expectations. We know for sure that it can't meet customers\' expectations if it doesn't work. Therefore, we can add an error handler to send error data back to our analytics hub should there be issues. We can then set up alerting, or rules on the data, that will tell us immediately if customers' expectations are not being met. This helps with experimentation as you get a very fast feedback loop: as soon as there is an issue, you will be notified usually in the order of a few minutes or less, and can correlate it with what you're doing.

#### Ok, where do I start?

- First, you have to think about what you're trying to monitor, especially if it is a business case. For example, the business wants to know how much people like the application. This could be broken down into several sub-goals, such as user retention, logins, activity, etc. and then these can be monitored individually, by turning them into scenarios. Identify these scenarios in your app, and then apply logging to those locations.

- Another situation which overlaps is determine if there are issues or problems in your application, for example errors or performance issues. What are the core user scenarios, for example, when they click on your app, how long does it take to load for the first impression? What about some other processes, like creating a project? Does that take 10 minutes when it should take 10 seconds? What is the entire flow from when a user enters the app to that point? This might require logging at many different points, but there should be a well-reasoned strategy, such as logging in places that reduce execution entropy. For example, logging twice in a row is, in general, probably not as useful to determine what happened next than if it was logged after an if statement. Here's an example.

+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Certainly! Let\'s consider an example involving a simple function to process user registration in a hypothetical application. |
| |
| ### Poor Logging Strategy |
| |
| `python |
| |
| def register_user(username, password, email): |
| |
| try: |
| |
| \# \... some code to add user to database \... |
| |
| db.add_user(username, password, email) |
| |
| \# Vague and non-descriptive log |
| |
| print(\"Operation completed.\") |
| |
| except Exception as e: |
| |
| \# Logging the whole exception without context |
| |
| print(e) |
| |
| \# Usage |
| |
| register_user(\"alice\", \"password123\", \"alice@example.com\") |
| |
| ` |
| |
| Issues with the above code: |
| |
| 1\. Using `print` instead of a proper logging library. |
| |
| 2\. The success message \"Operation completed.\" is vague. We don\'t know what operation was completed. |
| |
| 3\. Catching all exceptions and just printing them out without context can make it hard to understand the root cause. |
| |
| 4\. Sensitive information, like a password, might get logged inadvertently in the exception message. |
| |
| ### Good Logging Strategy |
| |
| Using Python\'s `logging` module: |
| |
| `python |
| |
| import logging |
| |
| logging.basicConfig(level=logging.INFO) |
| |
| logger = logging.getLogger(\_\_name\_\_) |
| |
| def register_user(username, password, email): |
| |
| try: |
| |
| \# \... some code to add user to database \... |
| |
| db.add_user(username, password, email) |
| |
| \# Descriptive log message with relevant context |
| |
| logger.info(f\"User registration successful for username: {username}, email: {email}\") |
| |
| except Exception as e: |
| |
| \# Logging error with context and without exposing sensitive information |
| |
| logger.error(f\"Failed to register user with username: {username}, email: {email}. Error: {type(e).\_\_name\_\_}\") |
| |
| \# Usage |
| |
| register_user(\"alice\", \"password123\", \"alice@example.com\") |
| |
| ` |
| |
| Improvements in the above code: |
| |
| 1\. Using the `logging` module which provides more functionality and flexibility compared to simple print statements. |
| |
| 2\. The success log is descriptive, providing context about which operation was successful. |
| |
| 3\. The error log provides enough information to understand what went wrong without dumping the whole exception, and without exposing any sensitive information like passwords. |
| |
| 4\. It\'s easy to change the logging level, format, and destination (e.g., file, console, external system) with the `logging` module. |
| |
| In practice, a good logging strategy would also involve considerations like log rotation, centralized logging for distributed systems, monitoring of logs for anomalies, etc. |
+=================================================================================================================================================================================+
+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

- The reason why you want to include other information in the logs (e.g., successful, and not necessarily just a logging guid) is because you want to be able to quickly glance at the logs in your logging viewer (whatever that is) and be able to quickly discern if there are issues. Otherwise, you'd have to look up the logging ids every time.

- Another important thing is: if there was an error, what was the user's experience? This is more of a software-related question and not necessarily a CI/CD one.

#### How do we collect this data?

- This would depend on the application that you're writing, but normally there is an endpoint, called /analytics for example that captures event payloads. The event payloads typically correspond to a particular user (e.g., by sending the user's id with the request, along with their session id, time, and what they were doing.) Be careful to read all privacy laws applicable in your area (e.g., GDPR) as some information may have different retention policies or the ability to capture certain types of information.

- Here's a sample code impl in a TypeScript application.

+--------------------------------------------------------------------------------------+
| const telemetry = new TelemetrySender(\'https://telemetry.endpoint.com/sendEvent\'); |
| |
| const event: TelemetryEvent = { |
| |
| eventId: \'userClickedButton\', |
| |
| timestamp: Date.now(), |
| |
| data: { |
| |
| buttonId: \'saveBtn\', |
| |
| userId: \'12345\' |
| |
| } |
| |
| }; |
| |
| telemetry.send(event); |
+======================================================================================+
+--------------------------------------------------------------------------------------+

- In this case, an event is sent to the analytics server once the user clicks on the button. This event is usually associated with the currently logged in user, particular feature flags enabled in the application, or might be part of the payload itself. This would depend on your specific telemetry's implementation, but should contain enough data to trace the request back throughout the application (e.g., via a correlation id) so that you can debug it.

- This event can be anything: it could be an error, a successful event, or diagnostics (e.g., something neutral.) It's up to you to decide what you should monitor, but focus on what the user sees, and what telemetry might be triggered if a user performs a specific action.

- There are other monitoring tools that are much more high-level. For example, they might try to load your website in a virtual browser, or boot your application in a VM and verify that the content of the website looks the same. If, for example, it doesn't load, then it can notify you. The advantage of also using this layer of monitoring is that if the website does not load, then it is not possible for the client-side telemetry to emit useful data. Or, for example, say the telemetry was successfully emitted, but there was a CSS issue that caused a div to take up the entire screen, making it impossible for people to navigate the website. By collecting data, you are able to notice trends and patterns, and so if there is all of a sudden a lack of telemetry, or much more, then you are able to have historical stats to back it up and then be notified to do an investigation.

#### How do I process this data?

- There are many tools available to do so. For example, databases that support KQL (Kusto), MySQL, NoSQL, ClickHouse, etc. The act of creating queries is outside the scope of this book, but is likely to take the majority of your time.

#### What should I monitor?

- Developing a monitoring strategy is important because otherwise the monitoring might not reflect the true user's experience. This can make it difficult to get a fast feedback loop, and for experimentation, as you can't trust your data or dashboard to reliably notify you if there is an error. This means that things like feature rollouts via feature flags, incremental deployments, and more would not be as trustworthy.

- Say a user is creating a new project. Some items that you might want to log or monitor are if creating the project is successful (i.e., did the user just see a white screen? Was there a crash?), how long it took to create the project, what the user was doing beforehand, etc. The errors are usually logged in an error handler, but would depend on the framework that you are logging in.

- There are other levels of where stats should be collected at. For example, the HTTP request itself, such as its status code, latency, etc. This is usually done server-side, and because of the homogeneity of many back-ends, many alerting templates likely will automatically monitor this as a default. These are mostly diagnostic data: for example, 100ms for an HTTP request doesn't mean much in and of itself, or 10% CPU usage, and then fluctuates to 5% for example doesn't mean much either. This is useful for example if you are having issues on the client, or people are experiencing issues and you find out that the CPU usage is at 110%, then it's likely there's a CPU usage issue.

  - However, some are useful for keeping track of. If the CPU usage is steadily rising, with more and more traffic, then you might need to consider your scaling strategy or to provision more servers for example. This provides an early warning sign before issues occur.

- It's also important to collect actual user feedback as well, for example, through a feedback form. This is helpful for collecting higher-level errors, such as usability or new features, which would be difficult to capture via diagnostic data.

- Now you have a whole bunch of events in your database. What do you do with them? They are not useful if they just sit in the database.

- In the case of errors, you'd typically want to create an alert on this. There are several options available, such as DataDog that can help with this. They have different integrations, such as being able to call your phone if there is a certain amount of errors that occur within a timespan. Note that it's only good as your monitoring setup: if you don't do any monitoring, then you won't get any alerts. This doesn't mean that your application is healthy, however.

#### Importance of goals

- It's likely that you will be overwhelmed with numbers, dashboards, and data. Do I care if one HTTP request took 1000ms, and other one took 1001ms?

#### There's lots of places to monitor. Where do we start? Well, let's create a strategy.

- Webapps are very complex. Only measuring the HTTP calls is a poor representation of the user's experience, because many HTTP calls can comprise a user's request. Therefore, even a single call per user could lead to a bad experience (or a slow script) which might not be reflected in the time that the HTTP calls are made. Browsers pipeline requests, and can do requests in parallel, thus making it very challenging to reconstruct it.

- web-vitals useful for measuring web-app perf [[GoogleChrome/web-vitals: Essential metrics for a healthy site. (github.com)]{.underline}](https://github.com/GoogleChrome/web-vitals)

- Know the limitations of your monitoring tool. If it can only measure status codes, then therefore it might be too granular to use for specific user-experience metrics, such as click time.

- Therefore, it depends on the context and application (and where it is running.) You might find it helpful to try simulating the environment that it might run on, including artificially slowing down the environment to make sure the telemetry is accurate.

- Sometimes, the request can't be served at all. In that case, server side monitoring allows for knowing if there are issues server-side.

- Differentiate between diagnostics and goals. Diagnostics are like checking your heart rate, it doesn't really do anything on its own. Or checking how tall someone is. Goals are being able to capture that into something that can be modified or measured or graded against.

- Make sure that when you are consuming the data, that the data is accurate.

#### What do I do with the data?

- Graphing and plotting data, and making sense of what you're seeing is called sensemaking. It is a very important process because different perspectives on how you see and visualize data can alter business outcomes and what you need to do to change the application in response to different events. Try to avoid using templates for high-level business objectives because this might fail to cater to individual apps\' specific needs and features, and might be a sign that your company is developing the same application.

- There's different things, like median, mean, mode, percentiles, etc. please do not average percentiles that does not make sense. Averages are so-so, depends on what you are trying to measure. Percentiles might be misleading so be careful on what you are actually measuring and how it is actually impacting customer experience, cite video about 99.99% percentile video about the issues with that and the 20 HTTP request scenario.

- "I"m trying to measure how many users use the application", what does "use" mean, does it mean login? If so, this is usually straightforward. Make sure to account for users logging in multiple times for example.

- "I'm trying to measure some performance of something" ok this might be a bit complicated. Is it measuring from the user's perspective, and then the percentile is over the user's session? For example, the user is clicking on things, and one of their interactions was very slow. Are we aggregating the 90th percentile per user, and then the percentile of that, or aggregating it across all feature interactions? The latter is not as useful, because a single interaction could cause a poor user experience, and it doesn't discern between a single user having a bad time (but used the application a lot), versus many users having a poor experience.

- Performance regressions, web-vitals for front-end, etc.

- **Monitoring the actual CI/CD pipeline itself could be useful**, for example, if the runner is using more and more RAM, or more and more disk space and might be getting full soon, or it is taking longer and longer to complete (thus compromising the fast feedback loop.) The pipeline is just a server so I\'m wondering if regular monitoring tools would apply. If it's slow then it might be using just a single CPU, or too much network, etc.

- Sample size is important, and provides confidence in estimates (use effect size.) Using heuristics are unlikely to be reliable and are difficult to compare over time.

- [[https://www.youtube.com/watch?v=Y5n2WtCXz48]{.underline}](https://www.youtube.com/watch?v=Y5n2WtCXz48) 12% increase in revenue with faster load times, might be getting a bit off topic...

- For other data, such as goals or diagnostics, you'd typically want to perform sensemaking on them. There are many tools that can connect to your database (e.g., ClickHouse) and can visualize the data. Visualizing data is a way where you can generate insights on the data and be able to do stuff with it. For example, if the performance of a particular part of your application is slow, then you can optimize engineering efforts to improve that piece.

#### Conclusion

- As we embark on the journey of continuous integration and delivery, monitoring remains our guiding star. It\'s not about collecting vast amounts of data but making sense of it. With a strategic approach to monitoring, teams can ensure software products that are not just functional but also resonate with the users\' needs and preferences.

**How do I get the information from my monitors and how do I set up monitoring and logging? How do I associate the logs with a specific application version?**

+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| The section on \"Monitoring and Feedback in Continuous Deployment\" is comprehensive and well-structured. It offers readers insights into various tools, best practices, and methodologies related to monitoring in CI/CD. Here are some suggestions and observations: |
| |
| 1\. **Introductory Transition:** You could introduce the topic with a sentence or two, setting the context for the reader. For instance: |
| |
| \- \"Continuous Deployment relies heavily on effective monitoring and feedback mechanisms to ensure software performance and stability. Let\'s delve into the specifics of setting up and managing these mechanisms.\" |
| |
| 2\. **Goal of Monitoring:** |
| |
| \- Consider highlighting the dual aims: \"The primary aims of monitoring are to ensure application performance and reduce or eliminate ambiguity during troubleshooting.\" |
| |
| 3\. **Dashboard Types:** |
| |
| \- It might be worthwhile to mention that dashboards are visual representations of data, making them indispensable for rapid diagnostics and decision-making. |
| |
| 4\. **Design Considerations:** |
| |
| \- Add a point on responsiveness. With the increase in mobile use, ensuring that dashboards are mobile-friendly and adapt to different screen sizes can be crucial. |
| |
| 5\. **Performance Monitoring:** |
| |
| \- Mention other performance metrics like Disk I/O, Network bandwidth, etc., to give a more rounded view. |
| |
| 6\. **Logging Considerations:** |
| |
| \- You could also highlight the need for secure logging. Certain data should never be logged (like passwords, personal user details, etc.) due to security and privacy concerns. |
| |
| 7\. **5 W's of Logging:** |
| |
| \- Great touch here. This will be incredibly useful for developers and sysadmins alike. |
| |
| 8\. **Blue-green database deployment strategies:** |
| |
| \- It feels a bit out of place since you provided a detailed section before and after it. Consider expanding on it or positioning it in a more appropriate section or context. |
| |
| 9\. **On trust and automation:** |
| |
| \- The content here is dense and rich. To enhance readability, consider breaking down the longer sentences. |
| |
| \- Highlight the importance of human oversight. Even with automation, human involvement remains critical for edge cases and unforeseen circumstances. Emphasize that automation is a tool, not a replacement for human judgment. |
| |
| 10\. **Citations:** |
| |
| \- Ensure that any referenced content is appropriately credited, as you\'ve done. It adds credibility and depth to the material. However, depending on the medium of this content (e.g., a book, an online course, etc.), you may need to follow specific citation styles or consider hyperlinking directly to the source if it\'s a digital medium. |
| |
| 11\. **General:** |
| |
| \- A few headings seem to end with URLs (e.g., Logging and Log Management (ipfs.localhost)). Ensure that these URLs are meant to be there or if they were placeholders that should be updated. |
| |
| \- Consider providing some practical examples or case studies. Real-world scenarios or illustrations can help ground the theoretical information. |
| |
| Overall, you\'ve done an excellent job at consolidating a vast amount of information into a coherent and informative piece. The content covers the essentials of monitoring and feedback in CI/CD thoroughly, making it a valuable resource. |
+======================================================================================================================================================================================================================================================================================================================================================+
+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

#### 1. **Goal of Monitoring:** {#goal-of-monitoring .unnumbered}

The aim is to reduce or eliminate ambiguity when diagnosing incorrect functionality. It\'s important to log strategically, showing a clear execution path but ensuring it doesn\'t excessively slow down the application due to data storage concerns.

#### What should I add to the code to do monitoring? Where do I monitor? {#what-should-i-add-to-the-code-to-do-monitoring-where-do-i-monitor .unnumbered}

#### Monitoring software/tools {#monitoring-softwaretools .unnumbered}

+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Certainly! Monitoring and observability are critical components of the CI/CD pipeline, especially in production environments. Here\'s a list of some popular CI/CD software monitoring products: |
| |
| 1\. **Datadog**: A cloud-based monitoring and analytics platform that allows for full-stack observability by integrating with numerous platforms and services. It offers real-time performance dashboards, end-to-end tracing, synthetic monitoring, and log management. |
| |
| 2\. **Prometheus**: An open-source system monitoring and alerting toolkit originally built at SoundCloud. It\'s now a standalone open-source project and maintained independently of any company. It integrates well with the container orchestration system Kubernetes. |
| |
| 3\. **New Relic**: Provides insights into application performance, infrastructure monitoring, and customer experience. The platform offers a suite of products that track various aspects of applications and infrastructure health. |
| |
| 4\. **Splunk**: Known for its powerful log aggregation and search capabilities, Splunk has expanded its capabilities to offer infrastructure and application monitoring with its Splunk IT Service Intelligence (ITSI) and SignalFx products. |
| |
| 5\. **Elastic Stack (ELK Stack)**: Comprises Elasticsearch, Logstash, and Kibana. It\'s widely used for searching, analyzing, and visualizing logs in real-time. |
| |
| 6\. **Grafana**: An open-source platform for monitoring and observability. Grafana allows users to create, explore, and share dashboards from multiple data sources, including Prometheus, Graphite, and InfluxDB. |
| |
| 7\. **Dynatrace**: A software intelligence platform that offers application performance monitoring (APM), artificial intelligence for operations (AIOps), cloud infrastructure monitoring, and digital experience management. |
| |
| 8\. **AppDynamics**: Acquired by Cisco, AppDynamics is an application performance management (APM) and IT operations analytics (ITOA) company. It provides real-time monitoring of applications and infrastructure. |
| |
| 9\. **Sentry**: An open-source error tracking tool that helps developers monitor and fix crashes in real-time. It\'s especially useful for identifying issues in code post-deployment. |
| |
| 10\. **Raygun**: Provides error and performance monitoring for software applications. It helps developers diagnose issues in their applications by providing detailed error diagnostics and performance timing information. |
| |
| 11\. **Honeycomb**: An observability platform that allows for high-cardinality data exploration, helping developers understand and debug production issues. |
| |
| 12\. **LightStep**: Focuses on tracing and is particularly optimized for microservices and serverless architectures. |
| |
| It\'s worth noting that the best monitoring solution often depends on the specific requirements of the organization, the existing tech stack, and the nature of the applications being monitored. Many companies use a combination of several tools to achieve full-stack observability. |
+==========================================================================================================================================================================================================================================================================================+
+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

#### 2. **Dashboard Types:** {#dashboard-types .unnumbered}

> There are generally two types:
>
> **Diagnostics Dashboards:** These display data without context, such as memory usage or heart rate. They offer a snapshot without specific goals.
>
> **KPI Dashboards:** These are goal-oriented, showcasing metrics like Monthly Active Users (MAU), Daily Active Users (DAU), customer behavior in an app, or success rates for particular scenarios.

#### 3. **Design Considerations:** {#design-considerations .unnumbered}

> Maintain minimalism, avoiding unnecessary decorations that could clutter the dashboard.
>
> Collect relevant data, understanding the significance of metrics like averages, percentiles, and exceptional cases.
>
> Prioritize end-to-end (E2E) metrics that mirror user experience, rather than an aggregate of smaller, potentially unrelated metrics.

#### 4. **Metrics to Consider:** {#metrics-to-consider .unnumbered}

> Focus on higher-level metrics like those from the web-vitals library for web applications to better reflect the user experience.
>
> While HTTP-based metrics are helpful for diagnosis, they may not always be indicative of the overall customer experience.

#### 5. **Graphing Data Sources:** {#graphing-data-sources .unnumbered}

> There are primarily two categories:
>
> **Diagnostics:** More developer-centric, they might include metrics like memory usage.
>
> **KPIs/Scenario Metrics:** More user-focused, they show how users interact with a feature, for instance.

#### 6. **Performance Monitoring:** {#performance-monitoring .unnumbered}

> CPU usage can be an indicator, but it\'s essential to pair it with end-user experience metrics to get a holistic view.
>
> Consider utilizing cloud providers for scalability and fault tolerance. Robust monitoring tools should alert immediately if there\'s a performance issue, possibly via third-party software to ensure redundancy.

#### 7. **Logging Considerations:** {#logging-considerations .unnumbered}

> Log managers manage, tabulate, and graph logs but don\'t instruct on what or where to log.
>
> Developers should create clear, concise log messages that provide essential debugging information.
>
> Also important to know what and when to log, and what to include in the log messages.
>
> Assigning priority levels to different logs is crucial. Telemetry is typically what\'s logged, with different types categorized by importance.

[[Logging and Log Management (ipfs.localhost)]{.underline}](http://bafykbzaceaj2pndeya33yj3lkzcvbkbrdetebwouligktjwdr3vtzhzvjxhyw.ipfs.localhost:8080/?filename=Anton%20A.%20Chuvakin%2C%20Kevin%20J.%20Schmidt%20-%20Logging%20and%20log%20management_%20The%20authoritative%20guide%20to%20understanding%20the%20concepts%20surrounding%20logging%20and%20log%20management-Syngress%20%282012%29.pdf)

> **In general, logs should provide insights into:**
>
> \- **What Happened?**
>
> Provide appropriate details. Merely stating \"Something happened\" is not particularly useful.
>
> \- **When Did It Happen?**
>
> Include timestamps. If relevant, specify when the event started and ended.
>
> \- **Where Did It Happen?**
>
> Specify details such as the host, file system, network interface, etc.
>
> \- **Who Was Involved?**
>
> Identify the user, service, or system entity.
>
> \- **Origin:**
>
> Where did the entity come from?
>
> These key points represent the **\"5 W's of Logging\"**. They have been borrowed from disciplines like journalism and criminal investigation, among others.
>
> For a more comprehensive understanding, it\'s beneficial to know:
>
> \- **Additional Information:**
>
> Where can one find more details about the event?
>
> \- **Certainty:**
>
> How confident are we that the provided details accurately represent the event?
>
> \- **Impact:**
>
> What or who is affected by this event?
>
> **If we were to wish for even more insights, it would be great to know:**
>
> \- **Future Events:**
>
> What might happen next based on the current event?
>
> \- **Correlated Events:**
>
> What else happened that might be relevant or important?
>
> \- **Recommended Actions:**
>
> Given the event, what should one do next?

### Feature Flags {#feature-flags-1 .unnumbered}

#### Precedent {#precedent .unnumbered}

- Likely originated (the word "flag" as used in programming to indicate a state) from [[International maritime signal flags - Wikipedia]{.underline}](https://en.wikipedia.org/wiki/International_maritime_signal_flags)

- [[Best of Velocity: Move Fast and Ship Things - Facebook\'s Operational and Release Processes - YouTube]{.underline}](https://www.youtube.com/watch?v=dDf2t-E_Ea8&t=680s) facebook popularized it? 2013 so nope

- [[10+ Deploys Per Day: Dev and Ops Cooperation at Flickr \| PPT (slideshare.net)]{.underline}](https://www.slideshare.net/jallspaw/10-deploys-per-day-dev-and-ops-cooperation-at-flickr) 2009

#### What are feature flags? {#what-are-feature-flags .unnumbered}

**Feature flags allow for experimentation and integration, and they are essentially remotely controlled "if" statements**. These are both vital to CI/CD because this provides the capacity to release changes quickly and effectively--feature flags can be turned off and on remotely, and also allow for multiple partially developed features to co-exist (i.e., have deferred integration) and testable in a local environment while the rest of the application is available to customers. Feature flags allow for features and other work to be gradually rolled out to customers because they can be controlled server-side, giving you control over which users have the feature flag turned on. For example, you can enable it for certain beta users, user type, geography, ip address, account lifetime, etc.

Feature flags work by fetching a key-value pair (typically a feature name and a boolean) from an HTTP API. For instance, a keypair like \"EnableSpecialFeature\" set to \"true\" alters application behavior accordingly. Here's a quick practical breakdown of a very simple feature flag implementation:

Typically, the term "feature flag" and "feature toggle" are used interchangeably, but if your team uses one convention over the other or differentiates them then you will have to check with them. In this text, they will be used interchangeably.

#### Why would I want to use feature flags? {#why-would-i-want-to-use-feature-flags .unnumbered}

#### Advantages of Feature Flags {#advantages-of-feature-flags .unnumbered}

You've already discussed blue-green deployment strategies. Why wouldn't I just use those instead of feature flags?

- They serve different purposes. With feature flags, you can release new features independent of the deployment pipeline, and multiple features can be released at once. You also have more control over who you release it to, such as specific groups of users or via geographical location, and normally you can turn feature flags on and off much faster than going to another deployment through a deployment pipeline. They also allow hiding in-progress development. They also allow exposing features to certain people, or environments, for example QA to test.

- Blue-green deployments are typically reserved for significant changes such as large-scale infrastructure updates, database migrations, or complete framework shifts, like migrating from React to Angular. This method is especially useful for scenarios where feature flags are not feasible, such as with incompatible frameworks or extensive application refactors. It\'s standard practice to automate the blue-green process to handle these major changes efficiently, ensuring stability and minimal disruption. This approach is also suitable for smaller updates like package upgrades, ensuring all changes, whether minor or major, undergo the same rigorous deployment process.

You want to use feature flags to incrementally expose (or hide) features that are currently being developed. This will be part of your regular CI workflow. When you're working on a feature, put it behind a feature flag. There is an annotated example below with a code implementation.

+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| A/B testing, also known as split testing, is a method of comparing two versions of a webpage, app, email, or other digital assets to determine which one performs better in terms of user engagement or other predefined metrics. In an A/B test, two or more variants, typically referred to as the \"A\" and \"B\" versions, are presented to different groups of users simultaneously. The goal is to assess which variant produces more favorable outcomes, such as higher conversion rates, click-through rates, or user interactions. |
| |
| A canary release, in the context of software deployment and release management, is a deployment strategy that involves rolling out a new version of software or a service incrementally to a subset of users or servers before making it available to the entire user base. This approach is named after the practice of using canaries in coal mines to detect toxic gases; in a canary release, a small, controlled group of users or systems serves as the \"canaries\" that help detect potential issues or problems with the new release. |
+================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================+
+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

Feature flags can be straightforward to implement initially, often managed with just a JSON file downloaded at runtime. However, complexity increases when you need more nuanced control, such as rolling out a feature to only 10% of users. This typically requires passing user IDs or request parameters through a server, which handles the feature list applicable to each request. Relying solely on the client-side for this can complicate debugging and requires deployments for changes, somewhat negating the benefits of feature flags. To maintain clarity and trace issues effectively, it\'s crucial to version feature flags in correlation with the code, potentially through repository management. This ensures that changes in feature flags are trackable and correlated with the codebase for easier troubleshooting.

- You want to perform A/B testing or canary releases to gather user feedback or performance data before fully deploying a new feature. Undertaking A/B experiments to optimize user experience. For instance, enabling features only for specific user segments like beta testers.

- You need to provide different feature sets to different users or user groups, such as premium or trial users.

- You want to develop and release features independently and maintain a single codebase that serves multiple deployment environments.

- Use an effective branching strategy when:

  - You want to manage and organize parallel lines of development, such as features, bug fixes, or release branches.

  - You need to isolate experimental or unstable code changes from the stable main branch to prevent disruptions in production.

  - You want to ensure that different development teams can work on features simultaneously without interfering with each other\'s work.

  - You need a systematic approach to merge code changes from different branches into the main branch, ensuring the codebase remains stable and up-to-date.

  - You want to maintain a clear version history and facilitate traceability of code changes.

  - Needing high agility, where if an issue arises with a new feature, it can be quickly turned off without redeploying the entire application.

  - Incrementally transitioning from an older system to a newer one using the strangler pattern. For example, redirecting requests from an old application to a new one in real-time while maintaining user session states.

**Purpose and Benefits:**

- **Enable integration:** Allow multiple developers to work on different features simultaneously and integrate them seamlessly.

  - **Example:** Two developers can work on the same weather app, one adding a Fahrenheit conversion feature and the other implementing multiple location search. Feature flags allow them to integrate their work without conflicts.

  - **Important Considerations:** Features should be relatively modular to avoid excessive conflicts. Early testing with both feature flags enabled helps identify and address integration issues early on.

-

- **Controlled rollout:** Gradually release features to users, enabling A/B testing and mitigating risks.

  - **Benefits:** Gather user feedback, monitor performance, and minimize the impact of potential bugs.

  - **Example:** Gradually roll out the Fahrenheit feature to a small percentage of users before enabling it for everyone.

-

- **Graceful degradation:** Disable problematic features without impacting core functionality, ensuring a better user experience.

  - **Example:** If the AI-powered weather prediction feature becomes overloaded, it can be temporarily disabled via a feature flag without affecting the basic weather display functionality.

  - **Benefits:** Prevents a complete application outage and provides a better user experience even during issues.

-

- **Resource management:** Control access to resource-intensive features to prevent overload and optimize performance.

  - **Example:** Limit access to a computationally expensive AI feature or a limited-capacity service to prevent performance degradation for all users.

  - **Benefits:** Ensure resource availability for critical features and optimize cost by scaling resources according to actual usage.

- **Implementation Details:**

- **Modular features:** Features should be modular and independent to avoid conflicts and simplify feature flagging.

  - **Challenge:** Highly intertwined features can create complex dependencies, making feature flagging less effective and harder to manage.

-

- **Feature flag management:** Use a feature flag service to manage flags, determine availability, and provide default values.

  - **How it works:** The application queries the feature flag service with relevant parameters (user ID, location, etc.) to determine which flags should be enabled.

  - **Benefits:** Centralized control, easy updates, and the ability to dynamically adjust feature availability based on various factors.

-

- **Frontend and backend implementation:** Feature flags can be implemented on both the frontend and backend, depending on the specific use case.

  - **Frontend:** Suitable for UI changes, feature toggles, and client-side behavior modifications.

  - **Backend:** Ideal for API changes, infrastructure adjustments, and managing access to backend resources.

  - **Example:** Switching between different weather API providers would be a backend implementation, while changing the temperature display would be a frontend implementation.

-

- **Consider data implications:** Be mindful of data inconsistencies when different user groups have access to different features.

  - **Challenge:** Storing and managing data generated by different feature variations.

  - **Solution:** Implement data migration strategies or use feature flags to control data access and ensure consistency.

- **Practical Considerations:**

- **Complexity management:** Avoid excessive feature flags and dependencies to prevent code complexity.

  - **Risk:** Too many feature flags and intricate dependencies can lead to code that\'s hard to understand, maintain, and debug.

  - **Recommendation:** Regularly review and remove obsolete feature flags and strive for simplicity in their implementation.

-

- **Project management:** Coordinate feature flag usage with development streams and release plans.

  - **Challenge:** Independent feature development with feature flags can lead to misaligned user experiences when features are released.

  - **Solution:** Communicate release plans, consider bundling related features, and ensure consistent user experience across feature variations.

-

- **User experience:** Ensure a consistent user experience, even when feature flags are enabled or disabled.

  - **Challenge:** Randomly enabled/disabled features can confuse users.

  - **Solution:** Design features with feature flag toggling in mind, communicate changes clearly, and avoid abrupt transitions.

- **Examples:**

- **Frontend:** Switching between Celsius and Fahrenheit display in a weather app. This could involve duplicating components, changing rendering logic, and updating the UI based on the feature flag\'s state.

- **Backend:** Testing a new weather API provider without impacting user experience. This might involve shadow requests to the new API, comparing responses, and gradually shifting traffic once the new API proves stable.

- **Resource management:** Limiting access to a computationally expensive AI feature. Feature flags can control access based on user subscription level, time of day, or overall system load.

#### Limitations of Feature Flags {#limitations-of-feature-flags .unnumbered}

- Increased Complexity: Feature flags can lead to exponential complexity. For instance, with 10 feature flags, there are 2\^10 (1024) potential combinations, complicating bug reporting. It might not be clear from the QA's side what to test and such. It\'s essential to consider all flags when logging issues for reproducibility. It also makes testing more complex. You should log all feature flags and their status on application crash so that it can help you to debug. PCA can be helpful as well for training an ML model to find which flags are likely causing issues (i.e., correlate it with bad output and the list of flags.)

- Inadequate Concealment: Feature flags can\'t truly hide functionalities. Features shielded behind flags, like those for an enterprise version, could be accessed and enabled client-side. This is also a security issue, if, for example, the code is insecure or contains secret product names that have not yet been released. You can consider transmogrifying your code (e.g., for websites) as this discourages people from snooping into it, but cannot stop it completely.

- Dependency on Default Values: If the feature flag server fails, default values must be set, potentially revealing or hiding features inadvertently. Make sure to set defaults correctly. For example, the feature flag server is down or is not responding, or the client's device is slow.

- Potential for Overuse: Excessive reliance can lead to \"death by a thousand cuts,\" resulting in high cyclomatic complexity and increased testing overhead. Some changes, like OS upgrades, or large refactorings can\'t be toggled with feature flags.

- Mitigation Strategies:

- Server-Side Rendering (SSR): Evaluate feature flags server-side so clients only receive relevant code. This will hide the code on the server-side so that it is only delivered to clients should they have that feature enabled.

- Monitoring Usage: Track feature flag usage through telemetry, although it\'s not entirely reliable.

- Semi-Long Lived Branching: Merge main branch changes into semi-permanent branches, creating multiple build artifacts. Deploy certain branches, like testing ones, to designated environments, especially for sensitive features.

- Code Obfuscation: Embed feature flags in the code and then obfuscate it. This approach, relying on security by obscurity, should be used based on risk tolerance. You can obfuscate code to prevent feature flags from being revealed, but ultimately it is in the source code. You can also not add the feature flights to the clients if they should be disabled, and then the client will assume that they are disabled (based on internal programming.) This can help prevent the release of feature flight names which might make people aware of some of the features.

Here\'s a straightforward example of using feature flags, emphasizing the importance of version control to track when flags are enabled. Initially, create a repository named \'feature flags\' and add a `flags.json` file. Edit this JSON file to deploy changes, ensuring it is well-formed, possibly using a schema for validation. You can manage feature flags for different environments by maintaining separate files.

The deployment pipeline copies the JSON file to an Azure Storage account, which your application accesses at runtime to check the flag status. This method is simple but may not scale efficiently. An alternative is embedding feature flags directly in your code, which requires a separate deployment pipeline for those flags, typically in a continuous deployment style.

However, integrating feature flags with code has its drawbacks, particularly in security. For example, if the storage account is publicly accessible, there\'s a risk of exposing sensitive code files. It\'s advisable to use external services to manage feature flags securely and to further research best practices for their implementation.

1\. Create a GitHub Repository:

- Go to [[https://github.com/]{.underline}](https://github.com/) and create a new repository (e.g., \"feature-flags-azure-storage\").

- Initialize the repository with a README file (optional).

2\. Local Project Setup:

Clone the repository to your local machine:\
git clone https://github.com/your-username/feature-flags-azure-storage.git

cd feature-flags-azure-storage

- content_copyUse code [[with caution]{.underline}](https://support.google.com/legal/answer/13505487).Bash

Create a file named flags.json in the root of the repository with the following content:\
{

\"EnableSpecialFeature\": true,

\"ShowNewHomepage\": false,

\"BetaTestingMode\": {

\"enabled\": true,

\"users\": \[ \"user1@example.com\", \"user2@example.com\" \]

}

}

- content_copyUse code [[with caution]{.underline}](https://support.google.com/legal/answer/13505487).Json

- (Optional) GitHub Actions Workflow (for automatic deployment):

  - Create a .github/workflows directory in your repository.

  - Create a file named deploy-flags.yml (or similar) inside the .github/workflows directory.

Add the following workflow code:\
name: Deploy Feature Flags

on:

push:

branches:

- main \# Trigger deployment on push to main branch

jobs:

deploy:

runs-on: ubuntu-latest

steps:

- name: Checkout code

uses: actions/checkout@v3

- name: Azure Login

uses: azure/login@v1

with:

creds: \${{ secrets.AZURE_CREDENTIALS }}

- name: Upload to Azure Blob Storage

uses: azure/storage-blob-upload@v1

with:

source_dir: \'.\' \# Upload everything from the root

container_name: \'feature-flags\'

storage_account: \${{ secrets.AZURE_STORAGE_ACCOUNT }}

sas_token: \${{ secrets.AZURE_STORAGE_SAS_TOKEN }}

3\. Azure Storage Configuration:

- Create Storage Account & Container: Follow step 2 from the previous response.

- Generate SAS Token (Recommended):

  - Navigate to your storage account in the Azure portal.

  - Go to \"Containers\" -\> Select your container (\"feature-flags\").

  - Go to \"Shared access tokens\" and generate a SAS token with read permissions and an appropriate expiry time.

-

4\. GitHub Secrets (for secure deployment):

- In your GitHub repository settings, go to \"Secrets\" -\> \"Actions\".

- Add the following secrets:

  - AZURE_CREDENTIALS: Create a \"service principal\" in Azure and paste its JSON output here (refer to Azure documentation for details).

  - AZURE_STORAGE_ACCOUNT: Your Azure storage account name.

  - AZURE_STORAGE_SAS_TOKEN: The generated SAS token with read permissions (if using SAS for secure access).

5\. Commit and Push:

Commit your changes and push to the main branch:\
git add .

git commit -m \"Initial setup with feature flags\"

git push origin main

- content_copyUse code [[with caution]{.underline}](https://support.google.com/legal/answer/13505487).Bash\
  > If you set up the GitHub Actions workflow, this push will trigger the deployment to Azure Storage.

6\. Application Code Integration:

- Endpoint URL:

If using public access (not recommended):\
https://your-storage-account.blob.core.windows.net/feature-flags/flags.json

- content_copyUse code [[with caution]{.underline}](https://support.google.com/legal/answer/13505487).

If using a SAS token (recommended):\
https://your-storage-account.blob.core.windows.net/feature-flags/flags.json?your-sas-token

- content_copyUse code [[with caution]{.underline}](https://support.google.com/legal/answer/13505487).

```{=html}
<!-- -->
```

-

Code Example (JavaScript):\
async function fetchFeatureFlags() {

// \... (code from previous response, step 3 - replace with your actual endpoint URL)

}

// Example usage:

fetchFeatureFlags().then(flags =\> {

// \... (access feature flags as needed)

});

- content_copyUse code [[with caution]{.underline}](https://support.google.com/legal/answer/13505487).JavaScript

Then for example, say if you want to turn the feature on or off or modify something for example.What you can do is just make a change to that feature flag. So just make a commit.Big part requests sends them when it gets deployed through application. Once you had refreshed whatever. Well read that.New.Feature flag.And well.Subsequently changed the output of the application or modifies behavior.And it\'s also pretty good to log those feature flags that you\'re using, because it can be especially difficult when you\'re trying to triage.Different bugs and it becomes very complicated very quickly.

#### Popular feature flag providers/managers {#popular-feature-flag-providersmanagers .unnumbered}

+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| 1\. **LaunchDarkly:** LaunchDarkly is a widely recognized feature flagging platform that allows teams to manage feature flags and feature toggles with ease. It provides feature management, experimentation, and targeting capabilities to control and optimize feature releases. |
| |
| 2\. **Split.io:** Split.io is another popular feature flagging and experimentation platform. It offers feature flagging, experimentation, and monitoring tools that enable teams to control feature releases and measure their impact on user behavior. |
| |
| 3\. **Optimizely:** Optimizely (now part of Episerver) is known for its experimentation and feature management platform. It enables teams to create, manage, and optimize feature flags and experiments to improve user experiences and business outcomes. |
| |
| 4\. **ConfigCat:** ConfigCat is a feature flag and configuration management platform that helps development teams roll out features gradually and manage configurations across various environments. It supports feature flags, remote configuration, and user targeting. |
| |
| 5\. **Flagsmith:** Flagsmith is an open-source feature flagging and experimentation platform. It allows teams to create, manage, and control feature flags and experiments to deliver features with confidence. |
+========================================================================================================================================================================================================================================================================================+
+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

#### Feature flags vs. branching {#feature-flags-vs.-branching .unnumbered}

- In many cases, it\'s best to use a combination of both feature flags and effective branching strategies. Feature flags provide the flexibility to toggle features on and off during runtime and manage their rollout, while an effective branching strategy helps manage parallel lines of development and maintain a stable, organized codebase.

- Let's go into more detail about the differences and when to use one over the other.

- Both feature flags and branches can separate parallel lines of development work.

- Feature flags allow for functionality that has already been deployed and is behind a feature flag to be changed at runtime, such as, for example, in production, while customers are using your application. Given a feature flag is just an "if" statement, then this changes the execution flow of the running program. Say for example, I have a feature flag in production, called "enableLogin". If it is off, then the login page won't be accessible to any of the customers. If it is on, then it will be shown. I don't have to do any deployments, releases, or PRs, I just have to change the value of the feature flag in the feature flag manager for this to change. The application then reads the new feature flag and changes its behavior. Changing the feature flag is normally very easy to do, and updates usually occur in the order of seconds.

- Branches allow for parallel lines of development work to be separated at the source-code level, on the business's side inside of the repository, not accessible to customers. For example, say I am working on my feature. I would create a branch, which would allow me to deviate from the other branch (e.g., the trunk.) Or, I'm working on an experiment. Anything I commit (code-wise) to the branch stays on the branch, until I merge it with another branch, which is, effectively transferring the content to the other branch. Branches that are not the trunk are not deployed, thus, my development work stays inside of the repository and does not exist in production. After I merge my branch, the content is then destined for deployment or release, whenever it normally occurs.

- So the big thing is that feature flags allow for integration to occur, as well as experimentation branches.Are.Cause integration to be deferred or never done. They\'re just independent lines of development work. They technically also allow experimentation. So they allow experimentation because you could theoretically deploy a branch, like say if you had a pull request branch to a local test environment that you could experiment.With your changes.Um, over there as well.

- Think of the metaphor like a physical tree. The branches on the tree aren't part of the main trunk.

- ![](./images/image56.png)

- [[Tree Free Stock Photo - Public Domain Pictures]{.underline}](https://www.publicdomainpictures.net/en/view-image.php?image=20740&picture=tree&large=1)

#### What is a feature flag environment? {#what-is-a-feature-flag-environment .unnumbered}

- An environment is a set of feature flags that are on at a certain time.For example, say if you have a feature and.Um.You.Have some other features as well that are all part of this preview program. For example, you may want to turn them on on the integration environment so you put them in some sort of like environment.

- This environment can be served to different users, or, you might be able to manually choose it.Say for example you want to get the new users of the application access to this feature flight. So for example you want to.Say, Oh yeah, everyone who\'s the new user is gonna have the capability to track this new fighter, have access to this new UI or something like that.The reason why you might want to use New Years in this case is because the.The older users who have used the application, for example the users that are been around for a longer by not be as familiar with some of the new UI updates. So if you.Give it to new users who don\'t know much about the current UI, then you kind of.Squeeze in the bed.You can also do it based on different things like region, and you can do it based on language. Depending on what type of your feature is, you can do it based on user preferences. You can get people to opt in manually as well, see if they want to be like a beta tester for example. So there\'s lots of different ways that you can do this.

- For example, if you want all of the experimental features, you can toggle on the "experimental" environment, and then that environment has many feature flags enabled.

#### Feature flag lifecycle? {#feature-flag-lifecycle .unnumbered}

- How long should I leave it in prod for?It depends on your capacity for risk and how long the feature is considered in preview for stability andHow much complexity that you want overtime So like say if you were to keep it in production first forever, you know it is possible. Now there\'s a possibility that.You know, it does make things more complicated. You could turn it on. Turn it off so it\'s exists in the database somewhere and you have to.You know, if it\'s on for 100% of the people, then you know you might might not really be a feature flag anymore. It\'s more just like a permanent feature.The other thing is now if the feature flight server goes down for whatever reason.Or you know, you have the capacity to disable it, then it means that you have to kind of make sure that if you plan to disable the feature, you do test with the other features that you currently have active. So it does kind of increase the complexity and make a lot more difficult to debug so.Yeah, try to keep that in mind.

- How can I easily clean up the feature flags, and know which one(s) are still in use? Having a good naming patterns are good because then you can do a Ctrl+F on your code and it won't accidentally match other parts of your code. You can also search across emails/messages, etc.There\'s some AI tools as well. I\'m not sure if I can share some of the internal Microsoft tools with regard to some of the feature flag.There\'s one by Uber called Piranha which doesn\'t feature flight cleanup as well. You can do something called the time bomb which will automatically deactivate a feature flag after a certain date. Although it\'s a little bit have a **\*\*\*\*** approach, you may want to have some sort of like feature flag lifecycle process that alerts you on a certain.Matrix you want to.To that. So it kind of depends.

#### Feature flag naming patterns {#feature-flag-naming-patterns .unnumbered}

- Feature flags can quickly cause technical debt if they are not cleaned up. Therefore, it is important to make sure that they are easily identifiable.

- Clear, concise names: Short, descriptive flag names.

- Consistent naming convention: Use standard format (e.g., PascalCase, snake_case).SO1 format could be it starts with the letters F and then has the hyphen or an under score or something like that and then it\'s.And starts or whatever has next like what the features about and then dash and then I don\'t know the data something like that when it\'s needs to be disabled or something like that. So as long as there\'s like some way where.You can easily just search for it. Basically don\'t have like a bajillion all over the place.And makes things quite a bit more clear.

- Avoid ambiguous names: Use distinguishable, clear names. Do a Ctrl+F everywhere and make sure that that term for your new feature flag is not being used anywhere, otherwise, it'll be hard to find it later.

- Use action verbs/tense: Start names with \'enable\', \'disable\', or \'toggle\'; consistent tense.

- Full words, not abbreviations: Spell out words for readability.

- Positive flag names: Use positive names (e.g., \'enable_feature\').

- Use prefixes for categories: Start flag names with a prefix that indicates the category, e.g., \'payment_feature_newGateway\' or \'ui_feature_darkMode\'. This allows for regex patterns like payment_feature\_.\* or ui_feature\_.\*.

- Use suffixes for status: Add a suffix to flag names that indicates their status, such as \'\_beta\', \'\_experimental\', or \'\_temporary\', e.g., \'feature_newUI_beta\'. This allows for regex patterns like .\*\_beta or .\*\_experimental.

- Indicate flag types: Specify whether a flag is a kill switch, rollout, or A/B test in the name, e.g., \'feature_newUI_rollout\' or \'feature_darkMode_abTest\'. This allows for regex patterns like .\*\_rollout or .\*\_abTest.

- Use feature or epic identifiers: If your flags are tied to specific features or epics in your project management tool, include the corresponding identifiers in the flag names, e.g., \'F123_feature_newUI\' or \'EP01_feature_darkMode\'. This allows for regex patterns like F123\_.\* or EP01\_.\* to match flags related to a specific feature or epic.

- Separate flags by team or department: Organize flags related to specific teams or departments under a common prefix, e.g., \'frontend_feature_newUI\' or \'backend_feature_optimization\'. This allows for regex patterns like frontend\_.\* or backend\_.\*.

- Incorporate version numbers: Include a version number in the flag name, e.g., \'feature_newUI_v2\'. This allows for regex patterns like .\*\_v2 to match flags related to a specific version.

- Utilize hierarchical naming: Adopt a hierarchical naming structure with categories and subcategories separated by delimiters, e.g., \'category.subcategory.feature_status\'. This allows for regex patterns like category\\..\* or .\*\\.subcategory\\..\*.

- Include environment information: If applicable, include the environment (e.g., \'dev\', \'staging\', or \'prod\') in the flag name. This allows for regex patterns like dev\_.\* or .\*\_prod to match flags specific to a certain environment.

- Use a date format: If applicable, include the creation or activation date in the flag name using a standardized format, such as YYYYMMDD, e.g., \'feature_newUI_20230401\'. This allows for regex patterns like .\*\_2023.\* to match flags created or activated in a specific year.

- Avoid using special characters because they will make matching with regex more difficult, and they may not be able to be used in the code, or, some systems may not be able to accept special characters.

### {#section-5 .unnumbered}

### {#section-6 .unnumbered}

### {#section-7 .unnumbered}

### Artifacts, Docker, and versioning {#artifacts-docker-and-versioning .unnumbered}

#### What are artifacts?

- Artifacts are anything that is generated by the build process. This could be files, folders, applications, executables, documentation, Docker containers, etc. Therefore, it is important to clarify the context when someone says "artifacts" because this could refer to many different things. However, in practice, this normally refers to the final applications, and does not usually refer to Docker images (as these are sometimes called containers). Docker containers are still outcomes of the build process/deployment process, therefore, they are in theory considered artifacts. It depends on the context that this is being used.

- Artifacts can be grouped together or considered individually. For example, when a pipeline runs, it generates many artifacts, some are just parts of the build process and some are required for the application to run. Artifacts can be grouped together, i.e., packaged (in a tar file) or can be considered individually. One artifact can contain many sub-artifacts.

- Artifacts can be inputs or outputs to a build system, depending on which way or context it is considered in. For example, if application "A" depends on application "B", then application "B"'s artifacts can be considered as inputs for application "A". Normally in this context, this would be considered a dependency on a set of artifacts.

#### Importance of versioning

- Versioning is necessary because it is important to keep track of which version of an application is published. This is important because when developers test the application, or need to find and report bugs, they must do so in a specific version. This allows the ability to reproduce the bug and to create a fix for it. Another version of an application might not have that bug, and so a developer would not be able to recreate that bug. Or, the version might have a different variant of the bug with different source code, and thus the fix for one version might differ substantially.

- It also allows documentation and marketing material to be associated with a specific version, or to keep track of which features were developed and when they were released. This is especially important for large, complex features where the work may have to be divided among multiple teams. If the teams are large and complex, then it might not be clear if the feature is done or how long it has existed in production.

- Another reason is for auditing and compliance. Imagine that there was a security issue in your application. Do you know how long the security issue has existed for? If you keep track of versions in your software, then you are able to go back in time and perform the same tests to check if the previous versions are vulnerable to those exploits.

- Depending on how your application is structured, you may have multiple versions of the application that you support.

- Ensure you version your application accurately. Proper versioning allows tracking and differentiation of multiple application versions. Whether addressing issues, making sales pitches, or managing deployments, unique version identifiers or tags are crucial. This prevents confusion among developers and stakeholders, ensuring everyone knows which version is in use, even amidst deployment challenges or staff absences.

- Versions allow you to.Make sense of the development process. So when application version is released, it\'s usually corresponding to some sort of.Some sort of tradition or segue or?Um.You know organizational thing that happens, so for example like the QA testers test this or something like this or.Getting the key testers.Test this version or the version is set for release and stakeholders are notified that this version is associated to this feature set associated to this thing and it allows for, you know, keeping track of it and associating what\'s actually being released with what\'s actually.Provide to customers.It\'s also good for morale as well. You know, you\'ve released something and this is contained within this version which is, you know, associated to this and such and such.

#### Role of Dependency Managers

- Some package repositories can help manage your artifacts. The reason why you would want to have a certain package repository is to allow you to make sure that the artifacts that you are publishing are in the right place and are available to all developers. By having a central source of truth, this reduces confusion with (potentially) multiple versions referring to different copies of the application (which differ in the underlying code.)

- Artifacts are meant to be stored immutably. Git repos, theoretically can rewrite history, which is not a useful property for immutability.If you are, the reason why they artifacts are mutable is because they say if they weren\'t, say if you could change them, you put whatever you want them.Then the version of you know one point 2.3 doesn\'t correspond to.That code anymore.Yeah, it\'s one point 2.3 corresponding to whatever the changes were before you made it. So there\'s technically now they\'re becomes two version numbers.And you know, kind of defeats the point. You know, now you\'re putting it to a point of time which was immutable. So now you have to say like an extra long version number. So kind of treats the point of keeping them immutable and such.Yeah.I think also it can make things very confusing as well. You have version one point 2.3 and it\'s like, well technically which? Which one is that? Is that after modifications that before it is that? What is that? And even small changes in the source code can change the output as well, so.It is really complicated to know.Like.What\'s the impact of some of those changes? And it doesn\'t mean that you can never release a new version. It just means that.That old version that\'s insecure version, whatever you can lock away or whatever, but just don\'t have another application called that version essentially.That\'s kind of.how it works

- The dependency manager is software that normally runs on your computers and is usually specific to the type of application that you are trying to build. Its responsibilities are trying to determine the correct versions for your application to run. It may read a dependency manifest (sometimes called a package or lock file) that the programmer creates to indicate which versions of dependencies that your application needs.

- When your program needs certain versions of the dependency, then the dependency manager is able to retrieve those versions easily. This is because it has internal logic which is able to resolve the dependency tree and automatically download the right dependencies for use.

- A good dependency manager (or somewhere to host your artifacts) abstracts away most of this complexity by having a way to store your artifacts and provides instructions to your dependency manager (run locally) that can help resolve potential dependency conflicts. The artifact manager is just a server that hosts the artifacts, including metadata and might enforce ACLs.

- Imagine if distributing software was not standardized (in the past it was a bit more complex, but I will leave out the history.) This means that someone (usually a developer) has to read specific instructions on how to install the software, and to make sure that only that version is installed, and to reference it correctly. The issue with this approach is that it is tedious, error-prone, and time-consuming. The instructions provided by the package maintainer might be incomplete or may not support adding multiple versions of the software on the system. The package maintainer can't possibly know all of the software that is installed on the customer's computer and thus cannot know about all of the potential packaging conflicts. Trying to find out which versions of two different software are compatible with each other may require manually managing the versions and trying different versions. For example, "v1" only works with "v2" of application "B", but application "B"'s v2 is stored somewhere else, and might require application "C".

- When artifacts are published to an artifact server, the artifact server usually has specific functionality catered specifically for the distribution of artifacts. This may include allowing developers to connect to an artifact repository (which seamlessly integrates with other tools.) It may also be required for package managers which rely on a certain format for the package manifests and metadata to list available versions and to do dependency resolution. It also allows for finer-grained access control on the artifacts, whereas if everything is stored in a Git repository, it is likely that all of the files have the same access control.

- Package repositories can also allow you or have the capability to generate package manifests to allow other developers to easily consume your artifacts or packages as part of their build processes.So for example, let\'s just take the NPM registry. I guess that\'s probably considered a package repository or maybe the Maven one. So if you use the NPM repository.This is what you do is you can just, you know, run app, install whatever this package and it just grabs it for. You don\'t have to download it. You don\'t have to figure it out for any scripts or anything like that. You don\'t have to check to see which version of this package is supported with the other applications and other packages that you have.Saw this while.You don\'t care what versions of dependencies that that that package requires. It just automatically figures it out. And that\'s kind of.Part of the metadata supplied to the package repository. That just kind of does it for you. And if you want to update, you just update it and you know, package checks the package repository and.And does the update and such.This also is.Kind of different security as well, so I\'ll give this a little bit later. So given that package repositories are immutable, this means that.The securities guys were done and these packages and if there\'s a security issue found one of the dependencies for example, then since all dependencies are already classified and and associated to all of the packages.Then it becomes very clear which packages need to be upgraded, or are you know that or something like that. And this allows you to trace back all of your packages and see which ones are.Need to be upgraded? Which ones have security issues or which ones have malware, etcetera. And since you saw through the package repository, there\'s a link to that, so it\'s very easy to check.And this is an approach used by many.ah

- Package repositories usually have the capability of ensuring file integrity through the use of checksums. This can help ensure that the integrity of the package is safe from corruption and may also provide capabilities to host it on multiple servers or to provide backups. The act of backing it up is abstracted away using the artifact manager and allows you to focus on coding.

#### Version numbers: difference between internal builds, release builds, and customer builds

- What are internal builds? They are builds that are generated from the pipeline that aren't intended for release to customers. They might be generated many, many times a day (for example, as part of a branch or PR pipeline.) Normally, these builds aren't retained for long and are not released to customers.So theoretically, you know, an internal list could be promoted to an external release. Basically the only blessing that it gets essentially, I guess you caught that is it\'s been accepted or it\'s OK for stakeholders that moved to the next stage or something like that. So if you\'re using continuous deployment.Technically, your internal releases are likely going to be external releases. Normally, internal releases correspond to.Like temporary. So yeah, kind of that\'s what you calling internal builds. I would say internal builds are ones that are generated by the pipeline.Uh.That are intermediaries discarded while the developer pushes to that branch and have the pre open for example like after they push the code. Yeah, they\'re balls are immediately not useful because it\'s not the code that is.That\'s being reviewed so.But The thing is, is that.GitHub, well, you know, keep.Keep the skirt. So you may want to set the retention policy a lot lower for that.

- What are release builds? These are builds which are destined to be released to customers, but are not ready for customer consumption yet.So you may depending on your software or something like that, maybe something called the release pipeline, which is like a different user interface, but essentially it\'s the same same principles as like regular.As as a regular pipeline normally it\'s kind of more suited towards releases. For example, it takes in a set of artifacts.That have been published.By either deploy request pipeline or the main branch pipeline or something like that and then it goes on and can do some stuff in parallel. It\'s usually like.Green based approach or something like that and.The tasks are kind of set up.In like a different formats kind of more suited for.For releases so.And it allows you to pick and choose which.No artifact version that you want for.That\'s to be deployed.

#### Versioning Strategies

- It's good to have a clear versioning strategy (and clear versions), because if, for example, the versions were just a string of 32 letters (perhaps it is) but you had to use a spreadsheet to convert it into something else (i.e., a lookup table.) This would make it difficult in day-to-day operations because the act of having a version number is important for many reasons.

- Many people are interested in the status of the artifacts, albeit indirectly. For example, if the PM needs to know if "feature X" is being released, then they need to know where it is in the process and what the status is. Developers would also want to know so that they are able to meet the deadlines.

- There are some human aspects to versioning as well. When you are using a "manual" versioning strategy such as SemVer, it is possible that this is not added in code review. Therefore, it can be helpful to create PR templates which can remind people to make sure that a release is created. If not, then it is possible to push an empty commit which can "tag" a version in Git. This approach might be preferred if the releases are manual, and can help keep things consistent. In this case, the empty commit would purely be for the CI/CD pipeline to tag the associated commit, but the commit itself would have no data. It would simply refer to the tag (or the snapshot.) It is important to not make any changes to the code in this commit (except maybe the version number) because any small changes to the code (to generate the commit) might impact behavior, especially if it has already been tested. It also makes it unclear what changes are "fake" and which changes are real and can add noise to the commit log.

- The act of "cutting" a version or tagging can be a bit complicated because it requires the intersection of many processes. In this case, it can rely on build triggers, which versioning strategy to use, pushing multiple commits, and (embracing) a slow feedback loop with the CI runner, with lots of trial and error using unfamiliar syntax and complex branch regex rules. This requires that you know how all of these pieces fit together, and somewhat in depth, which can lead to difficulties trying to set up automated tagging in Git.

- Before making a release, a developer would have to manually type in a version number which would correspond to the SemVer that should be applied to this release. This depends on which type of versioning system you are using, however. Some versioning systems, such as incremental or evergreen versioning, use the date, which can be completely automated. The downsides with using the latter approach is that major changes can be introduced, and it is unclear to consumers that this has occurred. This is less of an issue when developing client-side applications, as customers are unlikely to care which version they are running. However, if you are creating a library or software that is intended to be used by other developers or a library, then backwards incompatible changes can cause breakage which can make it difficult for application consumers to consume the library and use it correctly. It is simply an act of communication.

- What would be an example of a poor versioning strategy?

  - Hypothetical example, the version number is a string of 64 characters, with 32 characters are just "a". This would make it difficult to distinguish between two different versions of the application, because you would have to visually inspect them and figure out how many "a"'s to ignore.

  - It would also be very long, and difficult to display. Some artifact managers or repository managers might not accept a version number that is that long.

  - Mixing commonly confused letters, like I, l, 1, and \| together. This would make it visually difficult to distinguish two versions. It is possible to check if the versions are different using a diff-algorithm but this would be complicated.

  - Using special characters in the version number. The version number might appear in many places, and those places might not be able to accept special characters. For example, git tags and docker tags cannot accept certain types of special characters and have length restrictions.

  - Don't put private information in the version number. It is likely that it will be public in some way or another.

  - Make sure that the customer is able to view the version number, using a non-complicated method or procedure.

  - Trying to follow SemVer, but making too many exceptions. Therefore, it is important to make sure that they have the ability to be compared. Are they different? Is one greater than another one, or does it matter? Which one do we have to release for customers and which one is in testing?

  - You can change your versioning formats in the future if your needs change. But try to be consistent. Don't change it too often because this will cause a lot of confusion. Change it and be done with it.

- However, version numbers are a bit more flexible, but build number should only refer to a specific checksum or build of the application and should be immutable. For example, "iOS 17" refers to the latest copy of Apple's iOS operating system. This could be any versions from 17.0.1, 17.0.2, etc. and these are versions. Internally, they might have multiple builds per day that are not released to the public, or some developer beta versions.

- Versions in software are sort of like serial numbers for products. They allow traceability back all the way through the entire software development process, normally to find bugs or errors and for auditing purposes. It is also useful to know which version is deployed in production so that the product can be marketed correctly and developers know which version of the product contains bug(s), or the ability to know if a release was successful.

- Your versioning strategy should be able to trace the artifact back to the source code, and the versions of the build tools (optional but still useful.) Make sure that the environment is part of the version. There are several ways to version your application, depending on your type of application. SemVer is popular for libraries that have potentially API-breaking changes that consumers should know about. Consumers can specify (in their manifests) which versions of your library they choose to consume, and can do so safely because they know that SemVer will not be violated. In some cases, you might have an evergreen version of an application, or an application that is intended for the end-user (such as a website.) In this case, the API doesn't really have any breaking changes and SemVer might not apply. Therefore, consider using a date-based versioning strategy or a version that just increments. This will help you differentiate between releases.

- Do you segment your customers based on different platforms or levels of service? Make sure to include that in the version. For example, do you have a macOS application and a Windows one? Then make sure that the platform is in the version to make sure that they are differentiated. Is one intended for enterprise customers? Then add that.

  -

---

**Strategy** **Pros** **Cons**

---

1\. Semantic Versioning \- Clear communication on changes \- Requires discipline in adhering to the rules

(SemVer) \- Popularized and widely adopted \- May result in rapid version number inflation for unstable software

                              \- Differentiates between major, minor, and patch releases                       \- Not ideal for projects where public API doesn\'t change often but internals do

                              \- Easily integrated with dependency management tools

2\. Date-based Versioning \- Easily identifies when a release was made \- Doesn\'t communicate the nature or impact of changes

(e.g., YYYY.MM.DD) \- Neutral in terms of software changes -- it doesn\'t imply severity or size \- Can be confusing if releases are made more than once a day

                              \- Can be combined with other versioning methods for clarity                     \- Not as widely adopted as other strategies

3\. Sequential Versioning \- Simple and straightforward \- Doesn\'t provide insights into the nature or impact of changes

(e.g., 1, 2, 3\...) \- Continuously increments with each release \- May give the impression of major changes even for minor updates

                              \- Users can easily identify newer versions

4\. Release Trains \- Predictable release schedule \- Doesn\'t provide specifics about changes within each release

                              \- Can help ensure regular updates and feature drops                             \- Can lead to rushed or half-baked features if sticking strictly to the train schedule

                              \- Useful for larger organizations or projects with a lot of interdependencies   \- If a feature misses a \"train\", it might have to wait for the next scheduled release

---

#### Programming-language specific versioning strategy quirks {#programming-language-specific-versioning-strategy-quirks .unnumbered}

[[7 Understanding Maven Version Numbers (oracle.com)]{.underline}](https://docs.oracle.com/middleware/1212/core/MAVEN/maven_version.htm#MAVEN401)

#### Storing artifacts and artifact retention

- It depends on the type of artifact. If this is an artifact that was distributed to customers, then in general, these are retained longer than artifacts created by CI as part of the build process (e.g., during a pipeline run) but were not released. This is because the artifacts created by the CI or CD pipeline (and are subsequently not released) can be created tens or hundreds of times a day, and it may not be worthwhile to keep them because they are created as an "artifact" of the build process and to show that the build process is still sane and are considered temporary files. Make sure that you _only_ store the necessary files to build and run your application as part of its artifacts. This is because if you include too many files, then it can use up unnecessary space, and can be a potential security issue if it is unclear what those files contain (e.g., passwords, credentials, etc.) if they should not be shipped to customers. It is important to have a link to trace the inputs (source code) to the outputs (artifacts.) You can use Git tagging to create this link. This will allow more reproducibility later on, and can help fix issues (or to backport fixes) to prior versions should they have an issue. This depends on your versioning strategy, of course. For example, webapps that are evergreen do not normally have a version (for example, going to Facebook is always the latest version) but an enterprise desktop application might have many versions that have to be supported at one time.

- There are several things that would inhibit storing artifacts forever. One is the cost of storage, as depending on your application, artifacts may contain multiple dependencies and thus might be large.

- Some artifacts might be tricky to delete because if they are required as dependencies for other versions of software, then it can be difficult to untangle the dependencies. Therefore, keeping them for around longer is sometimes the safer approach.

- You may want to consider cold storage options if you have artifacts that are around for a while. This will allow you to save on storage costs.

- Not _all_ artifacts have to be stored forever. Some are generated when a pipeline is run, and they are sometimes called "snapshots" or "revisions". These are usually temporary artifacts that provide the capability for them to be, in theory, published. In many cases they are never published and thus can be safely deleted. They should still be generated and retained for a while, however, because this will allow you to easily make a deployment should one be needed (or to revert to an older version of the software.)

```{=html}
<!-- -->
```

- Think about the utility of storing these files against the cons. If I store the entire node_modules folder, what do I gain that I don't have if I were to just store the revisions of the package.json and package-lock.json file? If NPM is down, consider using another registry instead of committing node_modules.

- It is difficult or not usually possible to delete items from the Git history. Artifact managers can deprecate or remove old version of the software or make them not available for package consumers.

- My pipeline runs a lot, why is that? Do I need to retain artifacts at each run?

  - A pipeline runs when a trigger has been hit (i.e., a PR was created, push to a branch, a new tag, etc.), or it was run manually. This is important because each run of the pipeline can generate artifacts, and the pipeline also should pass at various stages to prevent committing code that is not ready to be merged.

  - Commit to a Branch: When a commit is pushed to a branch, the pipeline can provide developers with early feedback. While this early-stage feedback is invaluable, it is most beneficial if developers actively utilize it. Typically, artifacts from these runs need not be stored long-term, as they often represent work-in-progress features.

  - PR Creation: It\'s imperative to run the pipeline when a PR is created and updated. This ensures the code meets the required checks before merging. Artifacts from this phase, much like the previous touchpoint, aren\'t usually stored long since multiple updates might be pushed before finalization. The pipeline must pass before the PR is merged.

  - New Tag Addition: If a new tag is pushed, it often signifies a deployment phase, and the pipeline might be geared towards initiating a release. In such cases, retaining the artifacts is crucial.

  - Post-PR Merge: The next time it might run is after the PR is merged. This appears strange, because it already ran on the PR, right? Things get a bit complicated and might depend on your CI/CD software's implementation.

    - When you create a PR, the CI/CD pipeline is run on (your branch, merged with the target branch.) This does not update your branch with the target branch.

    - If the pipeline was successful, the fact that it was successful might be retained for any length of time, usually 12 hours. This means that pushes to the target branch do not cause the PR pipeline to be re-run.

    - Since the target branch can update independently of the PR pipeline running, this means that there is a possibility for conflicting changes to occur (not merge conflicts.) This means that the pipeline has to be rerun on the target branch once it is merged to ensure that there are no issues. If, however, the target branch cannot be merged due to a merge conflict, then it will not allow the merge.

    - I'm assuming that this is the case because if there are multiple team members pushing to the pipeline at once, then this would quickly cause a bottleneck and cause all PRs to be recompiled every time there is a merge to the target branch. This would be fairly wasteful and would reduce throughput significantly. However, there is risk as there is a possibility of conflicting changes.

      -

+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| The provided document focuses on Maven\'s versioning system, SNAPSHOT versions, version range references, and how Oracle handles Maven version numbers. |
| |
| For many popular programming languages and build tools, documentation or guides similar to this can be found to help developers understand the intricacies of version management, dependency management, and related build tool features. Some examples include: |
| |
| 1\. **NPM (Node Package Manager) for JavaScript:** |
| |
| \- A guide on Semantic Versioning (`SemVer`) and how package versions work in NPM. |
| |
| \- Explanation of version ranges, such as `\^1.0.0` and `\~1.0.0`. |
| |
| \- Details about `package-lock.json` and how NPM resolves dependencies. |
| |
| 2\. **pip for Python:** |
| |
| \- Details on how `pip` manages package versions. |
| |
| \- Explanation of version specifiers like `==`, `\>=`, `\<=`, etc. |
| |
| \- Use of `requirements.txt` for specifying dependencies. |
| |
| 3\. **Gradle for Java (and other languages):** |
| |
| \- Information about declaring dependencies in Gradle and how it resolves conflicts. |
| |
| \- Details on versioning, dynamic versions, and changing modules. |
| |
| \- Explanation about the differences between implementation, api, compile, and other configurations. |
| |
| 4\. **RubyGems for Ruby:** |
| |
| \- Documentation about Semantic Versioning in the Ruby ecosystem. |
| |
| \- Explanation of version specifiers in a `Gemfile`. |
| |
| \- Details on how `Bundler` resolves gem dependencies. |
| |
| 5\. **Cargo for Rust:** |
| |
| \- Information on how Cargo handles Rust crate versions. |
| |
| \- Explanation of `Cargo.toml` and `Cargo.lock` files. |
| |
| \- Details on Semantic Versioning in the Rust ecosystem. |
| |
| 6\. **NuGet for .NET:** |
| |
| \- Guides on how NuGet manages package versions. |
| |
| \- Details on versioning conventions and version constraints in `.csproj` files. |
| |
| \- Explanation about `packages.config` and `PackageReference`. |
| |
| 7\. **SBT for Scala:** |
| |
| \- Details on library dependencies and how versions are resolved in Scala projects. |
| |
| \- Explanation of versioning patterns and Semantic Versioning in the Scala ecosystem. |
| |
| For all these tools, the emphasis remains on helping developers understand version management to ensure consistent, repeatable builds and avoid the \"works on my machine\" problem. They discuss version constraints, resolutions, conflicts, and best practices. If you\'re interested in a particular language or tool, diving deep into its documentation will give you insights similar to what you\'ve got for Maven. |
+=============================================================================================================================================================================================================================================================================================================================================================================================================================+
+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

- Treat internal dependences as external dependencies. If you do an upgrade, and it breaks things (i.e., you're always on the latest and you do a PR to upgrade it, thus, running the CI pipeline), then just don't go through with the PR. Keeping it always on the latest version automatically means that previously passing code might start to fail and it might not be clear why.

- Another reason why you'd want to retain artifacts is because you want to have a reproducible build, even if you're generating a new one. This is because in order to know if something is broken (i.e., to narrow it down), then you have to have a stable environment to be able to rule out other factors. Also, dependencies can change functionalities, so if everything is always changing at once then it is difficult to test, and if you try to rollback changes (e.g., via a roll forward), it might not actually fix it because there are new dependencies that are being used instead of the old ones. There isn't an opportunity to test the dependency upgrades in isolation (e.g., via a PR.)

- Do not change artifacts that are in the artifact repository without changing their version number first.

- [[12 From Build Automation to Continuous Integration (oracle.com)]{.underline}](https://docs.oracle.com/middleware/1212/core/MAVEN/ci_environmement_hudson.htm#MAVEN8868)

- [[TheNEXUS \| A Community Project (sonatype.com)]{.underline}](https://books.sonatype.com/mvnref-book/reference/pom-relationships-sect-pom-syntax.html)

- Changing the manifest of the artifact is important when you upgrade the version number so that it can be identified/stamped. Otherwise, it might theoretically be possible for two artifacts with different version numbers to be the same in terms of file content which would be weird, and it's also difficult for the customer to know which version they are running (or you.)

-

#### How do I version code and Docker images? {#how-do-i-version-code-and-docker-images .unnumbered}

- A container is a managed execution environment that isolates its contents from the host, meaning the container doesn\'t know about other applications on the host. It shares the host\'s kernel and resources.

- A CI/CD server shares similarities with a container. It offers a stateless execution environment, often with some pre-installed dependencies. This environment is discarded post-run, ensuring a clean build environment every time.

- Once you\'ve successfully built your program, you can test building it inside a Docker container, like \"ubuntu-latest\" for Linux builds. This mimics a CI/CD environment, which typically starts with a minimal setup, devoid of your application\'s specific dependencies or your codebase. You\'ll need to add these dependencies and your code to the container to build it.

- Note: When creating a tag for your CI/CD pipeline, you\'ll need to have a merged PR. Use `git commit -m --allow-empty "Commit message here"` to push a tag without any commit content.

- Note: if you are planning on using tags to support multiple versions of your software simultaneously, and are using trunk-based development, then this might be a bad idea. This is because tags only refer to a single commit which makes it difficult to change something at one point without changing everything after it. Therefore, you might be interested in different branching strategies. However, if the history is linear, and you're using a rolling versioning strategy (e.g., today's date), and the previous versions are never supported, then therefore tagging will provide a linear history, which should be suitable for most applications.

- All tags do is add an alias to a commit hash. It makes it easy to retrieve a particular version, as you can just view the tag and find the associated commit hash.

Git\'s `git tag` command lets you label specific commits. Here\'s how:

1\. **Lightweight Tags**: A simple pointer to a specific commit.

```bash

git tag v1.0

```

2\. **Annotated Tags**: These are full objects in Git\'s database. They contain metadata like the tagger\'s name, email, date, and a tagging message.

```bash

git tag -a v1.0 -m \"First stable release\"

```

-

- 3\. **Tagging Earlier Commits**: To tag a non-recent commit, use the commit\'s hash.

-

- ```bash

  ```

- git tag v0.9 9fceb02

- ```

  ```

-

- 4\. **Pushing Tags to Remote**: Explicitly push tags to a remote repo.

-

- ```bash

  ```

- git push origin v1.0

- ```

  ```

- Note: you may have to make a commit first (i.e., see previous command.) This is because some CI/CD software does not allow pushing tags because the only way to update the master branch is via a PR, and the PR must have at least one commit.

-

- 5\. **Deleting Tags**: To remove a tag:

-

- ```bash

  ```

- git tag -d v1.0

- ```

  ```

-

- CI/CD tools may differ in their tagging setups. While Git allows for release tagging, some teams use third-party tools like Azure DevOps. If you need deep project management software integration, consider using built-in CI/CD offerings. Should you tag in Git? Weigh the benefits against potential confusion from mismatched tags and releases.

-

- **Containerization**:

-

- Docker packages software applications into deployable units called images. When running, these images are referred to as containers. With Docker, tags reference specific image versions.

+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ### **What is a Dockerfile?** |
| |
| A **Dockerfile** is a text file that contains a set of instructions used to create a Docker image. Docker images are the basis of containers, which are isolated, lightweight, and reproducible environments where applications run. The Dockerfile defines the environment inside the container, including all the software and dependencies that the application needs to run. By using a Dockerfile, developers can ensure that their applications will run the same way, regardless of where the Docker container is deployed. |
| |
| \-\-- |
| |
| ### **Simple Dockerfile for a Python Web Application** |
| |
| `Dockerfile |
| |
| \# Use an official Python runtime as the base image |
| |
| FROM python:3.8-slim |
| |
| \# Set the working directory in the container to /app |
| |
| WORKDIR /app |
| |
| \# Copy the current directory contents into the container at /app |
| |
| COPY . /app |
| |
| \# Install any needed packages specified in requirements.txt |
| |
| RUN pip install \--trusted-host pypi.python.org -r requirements.txt |
| |
| \# Make port 80 available to the world outside this container |
| |
| EXPOSE 80 |
| |
| \# Run app.py when the container launches |
| |
| CMD \[\"python\", \"app.py\"\] |
| |
| ` |
| |
| **Explanation of the Dockerfile Commands:** |
| |
| 1\. **FROM python:3.8-slim**: Specifies the base image to use, in this case, the official image for Python 3.8 with a slim configuration. |
| |
| 2\. **WORKDIR /app**: Sets the working directory inside the container. |
| |
| 3\. **COPY . /app**: Copies the contents of the current local directory into the container\'s `/app` directory. |
| |
| 4\. **RUN pip install \--trusted-host pypi.python.org -r requirements.txt**: Installs the Python packages listed in `requirements.txt`. |
| |
| 5\. **EXPOSE 80**: Indicates that the container will listen on port 80. |
| |
| 6\. **ENV NAME World**: Sets an environment variable inside the container. |
| |
| 7\. **CMD \[\"python\", \"app.py\"\]**: Specifies the command to run when the container starts. |
| |
| \-\-- |
| |
| Using a Dockerfile, developers can create consistent and reproducible environments, ensuring that the application behaves the same way across different stages of development and deployment. |
+========================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================+
+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

- Tags in Docker allow easily referring to a specific image. If you want the container to be pushed to a specific registry, then the Docker's tag has to contain part of the registry URL. Tags can be thought of both as an identifier and the desired location for the image. This is most likely because the Docker push command does not take a registry as an argument and thus relies on the container tag to disambiguate the context.

- Say I create an image with "docker build .". I get an image, but there's no repository and no tag. This makes it difficult to determine what version or what thing I am looking at.

+-----------------------------------------------------------------------+
| alex@DESKTOP-7M8V9ET:/dev/shm/getting-started-app\$ docker images |
| |
| REPOSITORY TAG IMAGE ID CREATED SIZE |
| |
| \<none\> \<none\> d49c4d85c3ea 24 minutes ago 269MB |
+=======================================================================+
+-----------------------------------------------------------------------+

- I don't know what d49c4d85c3ea is. It could contain anything.

- Therefore, we can use tags to keep track of the images.

+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Tagging images in Docker is a vital part of managing and organizing your images, especially when collaborating or deploying applications. Here\'s a step-by-step guide on how to tag Docker images, push them to registries, and pull them based on their tags: |
| |
| ### 1. Building and Tagging a Docker Image: |
| |
| Firstly, when you\'re building an image using a `Dockerfile`, you can tag it right away: |
| |
| `bash |
| |
| docker build -t \[username/imagename\]:\[tag\] . |
| |
| ` |
| |
| \- `\[username/imagename\]`: The name of the Docker image (often prefixed with a username or organization name). |
| |
| \- `\[tag\]`: The tag for the Docker image (e.g., `latest`, `v1.0`, `development`, etc.) |
| |
| For example: |
| |
| `bash |
| |
| docker build -t myuser/myapp:v1.0 . |
| |
| ` |
| |
| ### 2. Tagging an Existing Image: |
| |
| If you have an existing image that you\'d like to tag or retag, you can use the `docker tag` command: |
| |
| `bash |
| |
| docker tag \[source_image\]:\[source_tag\] \[username/imagename\]:\[new_tag\] |
| |
| ` |
| |
| For example, to retag an existing `myapp:latest` image to `myapp:v1.0`: |
| |
| `bash |
| |
| docker tag myapp:latest myuser/myapp:v1.0 |
| |
| ` |
| |
| ### 3. Pushing Tagged Image to Docker Hub: |
| |
| Before pushing, ensure you\'re logged into Docker Hub (or another Docker registry): |
| |
| `bash |
| |
| docker login |
| |
| ` |
| |
| Then, push your tagged image: |
| |
| `bash |
| |
| docker push \[username/imagename\]:\[tag\] |
| |
| ` |
| |
| For example: |
| |
| `bash |
| |
| docker push myuser/myapp:v1.0 |
| |
| ` |
| |
| ### 4. Pushing to Other Registries: |
| |
| If you\'re not using Docker Hub, but another registry like Google Container Registry (GCR), Amazon Elastic Container Registry (ECR), or any other, your image name (and tag) will usually include the registry URL: |
| |
| `bash |
| |
| docker tag myapp:latest registry-url/myuser/myapp:v1.0 |
| |
| docker push registry-url/myuser/myapp:v1.0 |
| |
| ` |
| |
| ### 5. Pulling a Tagged Image: |
| |
| To pull an image based on a specific tag: |
| |
| `bash |
| |
| docker pull \[username/imagename\]:\[tag\] |
| |
| ` |
| |
| For example: |
| |
| `bash |
| |
| docker pull myuser/myapp:v1.0 |
| |
| ` |
| |
| If you don\'t specify a tag, Docker will usually default to the `latest` tag: |
| |
| `bash |
| |
| docker pull myuser/myapp |
| |
| ` |
| |
| ### Tips: |
| |
| \- It\'s good practice to use meaningful tags. Common tags include version numbers (`v1.0`, `v1.1`), development stages (`dev`, `prod`), or even Git commit hashes for granularity. |
| |
| \- Keep in mind that while the `latest` tag might sound like it represents the most recent version of your image, Docker does not enforce this. The `latest` tag is simply the default tag if no tag is specified. Therefore, it\'s always recommended to be explicit with your tags to avoid confusion. |
| |
| \- Remember, each time you change and retag an image, you\'ll need to push the newly tagged image to your registry if you want to share or deploy it. |
+==============================================================================================================================================================================================================================================================================================================+
+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

- Let's tag it with "docker tag d49c4d85c3ea my-app:v1.0". The resultant images list now shows our container, with our version:

+-----------------------------------------------------------------------+
| alex@DESKTOP-7M8V9ET:/dev/shm/getting-started-app\$ docker images |
| |
| REPOSITORY TAG IMAGE ID CREATED SIZE |
| |
| my-app v1.0 d49c4d85c3ea 25 minutes ago 269MB |
+=======================================================================+
+-----------------------------------------------------------------------+

- If I make some changes and rebuild the image with "docker build .", then I will get another untagged image,

+-----------------------------------------------------------------------+
| alex@DESKTOP-7M8V9ET:/dev/shm/getting-started-app\$ docker images |
| |
| REPOSITORY TAG IMAGE ID CREATED SIZE |
| |
| \<none\> \<none\> 0e3996fbe4ca 3 seconds ago 269MB |
| |
| my-app v1.0 d49c4d85c3ea 26 minutes ago 269MB |
+=======================================================================+
+-----------------------------------------------------------------------+

- Instead, I can pass the "-t" argument and tag it immediately. This is helpful because you may have multiple images, and so having many untagged at once can cause a bit of confusion. It is also more efficient and makes sure that you don't forget to tag it.

- Now, we have an image that contains the things that your application needs to run. How do we push it to a container registry, where it can be built and published using a CI pipeline?

- NOTE: when you are building images locally, they might contain cached layers. This is a useful property which makes building the containers faster. However, some commands may not be idempotent. For example, running apt-get install curl may install the latest version of curl that is in your package repositories. Depending on how you have your Dockerfile set up, it might be referring to a cached layer which might be outdated. Also, CI runners are unlikely to use cached layers, which is why you might be getting different results when building locally. Therefore, you may consider doing some uncached builds, or, making sure that the items in the steps cannot change by using specific versions of the software.

- Let's go back to publishing it to a container registry.

+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Azure Container Registry (ACR) is a managed Docker container registry service used for storing private Docker container images. To publish your Docker image (`myapp:v1`) to ACR, follow these steps: |
| |
| ### 1. Prerequisites: |
| |
| \- Ensure you have the `azure-cli` (Azure Command-Line Interface) installed. |
| |
| \- Ensure you have Docker installed. |
| |
| ### 2. Authenticate with Azure: |
| |
| Login to your Azure account: |
| |
| `bash |
| |
| az login |
| |
| ` |
| |
| A browser window will open asking you to sign in to your Azure account. |
| |
| ### 3. Create an Azure Container Registry (if you haven't already): |
| |
| Replace `myregistry` with a unique name for your registry, and `myresourcegroup` with the name of your Azure resource group: |
| |
| `bash |
| |
| az acr create \--resource-group myresourcegroup \--name myregistry \--sku Basic |
| |
| ` |
| |
| You can choose different SKUs (`Basic`, `Standard`, or `Premium`) based on your needs. |
| |
| ### 4. Login to ACR: |
| |
| Before you can push an image, you need to authenticate Docker to the Azure Container Registry: |
| |
| `bash |
| |
| az acr login \--name myregistry |
| |
| ` |
| |
| ### 5. Tag Your Image with the Full ACR Login Server Name: |
| |
| To push an image to ACR, it needs to be tagged with the full ACR login server name. |
| |
| First, retrieve the login server name: |
| |
| `bash |
| |
| az acr list \--resource-group myresourcegroup \--query \"\[\].{acrLoginServer:loginServer}\" \--output table |
| |
| ` |
| |
| Once you have the login server name (something like `myregistry.azurecr.io`), tag your image: |
| |
| `bash |
| |
| docker tag myapp:v1 myregistry.azurecr.io/myapp:v1 |
| |
| ` |
| |
| ### 6. Push the Image to ACR: |
| |
| Now you can push the image to your Azure Container Registry: |
| |
| `bash |
| |
| docker push myregistry.azurecr.io/myapp:v1 |
| |
| ` |
| |
| ### 7. Verify: |
| |
| You can verify that your image was successfully pushed by listing the images in your ACR: |
| |
| `bash |
| |
| az acr repository list \--name myregistry \--output table |
| |
| ` |
| |
| And to see the tags for a specific image: |
| |
| `bash |
| |
| az acr repository show-tags \--name myregistry \--repository myapp \--output table |
| |
| ` |
| |
| You should see `v1` in the list of tags for `myapp`. |
| |
| ### 8. Optional - Logout from ACR: |
| |
| After you\'ve finished working with ACR, it\'s a good practice to log out: |
| |
| `bash |
| |
| az acr logout \--name myregistry |
| |
| ` |
| |
| That\'s it! Your `myapp:v1` image is now published to your Azure Container Registry. Whenever you want to deploy or run this image from the registry, you\'ll pull from `myregistry.azurecr.io/myapp:v1`. |
+===============================================================================================================================================================================================================+
+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

- Ok, so I have tagged a container. How do I tag the associated source code?

- Git Tags don't do anything on their own; they are not capable of creating a release. The CI or CD runner has to look at the tags and do useful work. This normally occurs when a new tag is pushed.

- Git Tags are one way of tracking releases and offer a provider-agnostic way to check out the code at a specific version. There are many ways to track releases, and sometimes tracking must occur at multiple steps. In this case, there must be tracking at the source code level to make sure that one understands which source code is being released. There may be tracking at the user story or task level to understand which task(s) were part of the release, or QA test plans.

- When creating a new release, and the task(s) are not yet done, put them under the next version that has not yet been released.

- Tags do not change the source code on their own. For example, if your application displays its version in its "About" dialog, this won't change if you tag the release. Therefore, you may want to change the version number in the application before or when you tag the release. This can usually be done via automation and the version number for the application might exist in one of the application's configuration files.

- How do I know when a tag has been pushed or created? I would like to run a script in this case (or kick off another pipeline.)

  - This depends on if the tag is annotated, as the commands will differ. I recommend adding in a manual override, as there will be situations where you may need to delete existing tags or rewrite them because of mistakes or exceptions to the procedure.

  - If you are using a monotonically increasing or random version for each application (e.g., evergreen), then I recommend that this process is automated. If you are using semver, then you may want to consider doing releases manually. It should be very easy to do.

  - It can be complex to manage and create tags when releasing software because it may require knowledge of bash scripting, which people might not be familiar with. It also has different programming paradigms.

  - Normally, you'd want to kick off a release when there is a new tag pushed, and the tag is merged. There are a long tail of exceptional situations, such as two tags being pushed at the same time, tags being deleted, merges, etc. that makes things more complex.

  - First, you'd want to figure out your release strategy before your tagging strategy. Tagging strategy is just a technical implementation of your release strategy.

- Some software allows creating a release manually.

- The issue is, if I am using SemVer for example, how do I automate the tagging process? In this case, there are many tools to show if the tag will be backwards not compatible or not, but SemVer usually requires human intervention because "major" changes are subjective. In this case, releases would still be manually initiated but the process itself would be automated. There are some tools to automatically notify of API breakage, but this would depend on the type of library that you are building and whether there exists a tool for this. It cannot detect all changes, normally, only changes to the public API.

- [[java - CI - what to do with old versions? - Stack Overflow]{.underline}](https://stackoverflow.com/questions/41954891/ci-what-to-do-with-old-versions)

- [[c# - Automated Deployment using CI server - Stack Overflow]{.underline}](https://stackoverflow.com/questions/8902468/automated-deployment-using-ci-server)

- [[Build versioning in continuous delivery - Stack Overflow]{.underline}](https://stackoverflow.com/questions/33821137/build-versioning-in-continuous-delivery/33821876#33821876)

- [[Continuous Delivery for multi component Project - Stack Overflow]{.underline}](https://stackoverflow.com/questions/24523055/continuous-delivery-for-multi-component-project)

- What does it mean when a container is generated every time I merge code?

  - Depending on the CI setup, CI might be linked to CD, which means that a deployment is automatically made on every push. Therefore, the CI system might generate the docker container using the Dockerfile included in the repository. The container is usually pushed to a registry after it has been created. [[How to use Docker to make releases? - Stack Overflow]{.underline}](https://stackoverflow.com/questions/30632046/how-to-use-docker-to-make-releases)

- [[git - When to create a branch from tag? - Stack Overflow]{.underline}](https://stackoverflow.com/questions/55359931/when-to-create-a-branch-from-tag) useful to know that each application has a version, although it may not be released to the public. For example, intermediate versions. This would be tedious to do manually.

+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Certainly! Let\'s delve deeper into the common themes and identify their sub-themes (stackoverflow): |
| |
| 1\. **Docker and Image Tags:** |
| |
| \* **Tagging Process in Docker:** |
| |
| \* **Example**: \"While creating a docker-compose file, how is the image section written or what value goes for\...?\" |
| |
| \* **Release Using Docker:** |
| |
| \* **Example**: \"How to use Docker to make releases?\" |
| |
| \* **Tagging and Cloud Integration:** |
| |
| \* **Example**: \"I have a CI/CD pipeline configured where Google Cloud Build automatically builds containers from code pushed to a GitHub repo if tagged with a specific.\" |
| |
| 2\. **Tagging Conventions:** |
| |
| \* **Standard Naming vs. Custom Conventions:** |
| |
| \* **Example**: \"Using CI/CD approach, Dev pipeline is creating artifacts with name convention, something like: 1.0-23-SNAPSHOT.jar.\" |
| |
| \* **Link between Tagging and Versioning:** |
| |
| \* **Example**: \"This isn\'t great, since a- I now commit to master, and b- automated CI/CD will grab the previous commit and release it, but it has the old version number.\" |
| |
| 3\. **Automation & Integration:** |
| |
| \* **Integration with CI/CD Tools:** |
| |
| \* **Example**: \"I am testing a Jenkins CI/CD method. There is a single git repo with a Master branch, a QA branch, and a Dev branch.\" |
| |
| \* **Automated Image Updates:** |
| |
| \* **Example**: \"kubernetes imagePullPolicy:Always is not pulling image automatically.\" |
| |
| \* **Handling Tagging in Cloud Platforms:** |
| |
| \* **Example**: \"Do I need to change the tag on each container with the intended project name before updating the project name itself? Is this handled automatically by GCP?\" |
| |
| 4\. **Versioning Concerns:** |
| |
| \* **Auto-Generation of Version Numbers:** |
| |
| \* **Example**: \"How can I auto-generate the version number from the git tag?\" |
| |
| \* **Issues with Committing to Master:** |
| |
| \* **Example**: \"I now commit to master, and b- automated CI/CD will grab the previous commit and release it, but it has the old version number.\" |
| |
| From this breakdown, it\'s evident that while tagging and versioning might seem straightforward, they entail nuanced complexities. These complexities amplify when combined with modern tools and platforms, especially in the CI/CD paradigm. As CI/CD seeks to automate software delivery processes, understanding and properly managing these nuances becomes crucial. |
+===========================================================================================================================================================================================================================================================================================================================================================================+
+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

#### Integrating Artifact Repositories with CI/CD pipelines

- Package Manager Dependency: Your choice depends on the package manager you\'re using. For example, C# uses the NuGet package manager, so it would have to be a "restore" step in the pipeline to get the packages from the repository.

- Authorization: Connect to your package repository, often using API keys, credentials, a service connection, or an identity. If you are using your CI/CD providers package manager, it will usually have steps on how to connect to it.

- Local Testing: Before using CI, test the setup locally, potentially using your IDE for assistance.

- **Note!** Theoretically, artifacts can also be re-generated which would mean that there isn't a need for artifact repositories (i.e., just build the code again.) However, this process is time-consuming and error-prone because the build-tools are usually not version controlled, which means that a small difference in the build tools will cause the outputs to be different. If the output changes by one bit, it does not necessarily mean that program behavior is impacted. However, this means that the artifact is no longer the same, thus opening up the door for potential exploits/vulnerabilities/security issues.

#### Artifact tracking and naming

- Another issue is: when you have an artifact, how do you trace it throughout its entire lifecycle? For example, say it is in QA. How do you know it is in QA?

- Artifacts are generated at several points during the build process, are generated during non-customer pipeline runs, and during testing. How do I track which one(s) are being used by the customer?

- How do I name artifacts? Organization-module name-revision Repository Layouts JFrog Artifactory Documentation Reader JFrog Help Center.

- When is a version assigned to an artifact?

- Sometimes, the CI or CD runner will assign build numbers to the artifacts.

- An artifact might have a lot of metadata associated with it, such as build numbers, versions, revisions, dates, etc.

- Usually, versions are assigned when doing a release, or they are assigned automatically through the build process, and then whichever version is released, then its version is recorded in the release log.

- A version might exist as a floating version. For example, the marketing material might say "Version 5", when, in fact, there are many updates to that version, such as 5.0.1, 5.2, etc.

- It is also possible to give other developers evergreen versions of the artifact if they are injected at runtime. For example, if they are not bundled with the application (and thus fetched from a remote server), for example a JavaScript payload, then this can ease distribution for multiple clients. You would want to make sure to capture sufficient telemetry, record which version(s) are currently in use so that you can associate error telemetry.

#### Artifact maintenance

- When you try to maintain artifacts, there are several issues that arise. It might be unclear which versions of the application you are trying to keep and you might keep too many versions. This can cause confusion, especially if you use manual dependency management (although dependency managers can usually automatically choose which version is necessary.) It can be a financial cost as well, and a potential liability if there are too many copies of your application stored everywhere. It increases storage costs as the applications are not necessary to be stored and will never be used. Recall that artifacts are _only_ the essential information that your application needs to run.

- By default, typically, artifacts are stored for 30 days on most providers.

- The other issue is: given that we have artifacts that have been deployed to customers, when do we delete them? After seven years? We might need them again depending on the level of support. If unsure, I would recommend keeping them, because it could be very complex to recreate the artifact from scratch.

- There are usually ways to specify retention policies with your artifact manager.

- When the artifacts are no longer useful, then they can be decommissioned. This is where the artifact managers come into play. They are able to track downloads over time, and might be able to track it down to specific pipelines. This helps you understand where the artifacts are being used. You can also selectively deprecate different versions, which will make it so that application developers cannot use that specific version (unless, of course, it is cached on their machine.)

- When an artifact is deprecated, it might be possible to mark it as deprecated in the dependency manager, and in some cases not make it available for download. You should send sufficient communication to relevant stakeholders regarding its deprecation, including its replacement, when it will be removed, ramifications of what will happen after it is removed, its impact, and who to contact if there are questions. Sometimes, if the artifact is not being used much, you might be able to deprecate it without notifying others.

```{=html}
<!-- -->
```

- Stuff

  - This can be made more complex if operations have to be performed on those tags. For example, incrementing a tag or determining if one tag is before another tag, for example, is "v1.0-beta" before "v1.0-dev"? For example, incrementing a tag requires knowing what the last tag was, and then adding something to it (or incrementing it.)

  - If you want to tag your releases with branch names, or to associate it with branch names, then consider slugifying the branch name. This is because Docker image names have a restricted character set as to how they can be named.

  - In order to have a reproducible build environment, you have to have enough information about the environment to make it reproducible, such as versions, inputs, their checksums, hardware, etc. Any small change in any part of the software chain can cause the artifacts to be non-reproducible because the tooling is very complex, and has dependencies on other parts of the build process. One way to do this is through Dockerfiles, which are a set of instructions that contain the specific versions of tools that you use to build your application. Because it runs in an isolated environment, this means that you can run multiple conflicting copies of other dependencies on your machine and it will not interfere with the Docker container.

### {#section-8 .unnumbered}

### Blue-green database deployment strategies {#blue-green-database-deployment-strategies .unnumbered}

- See "Refactoring Databases" book.
