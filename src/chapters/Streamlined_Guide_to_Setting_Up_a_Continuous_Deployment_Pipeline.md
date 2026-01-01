## **Streamlined Guide to Setting Up a Continuous Deployment Pipeline** {#streamlined-guide-to-setting-up-a-continuous-deployment-pipeline .unnumbered}

This guide provides a concise overview of setting up a continuous deployment (CD) pipeline, focusing on key concepts and best practices:

**1. Creating the Pipeline:**

- Use your CI/CD tool and connect it to your artifact repository.

- Choose a clear and descriptive pipeline name (e.g., "Production - \[Software Name\]").

**2. Deployment Infrastructure:**

- Decide on your hosting environment (cloud providers like AWS, Google Cloud, Azure, or on-premise).

- Key cloud provider offerings include:

  - Container orchestration (Kubernetes services like ECS, AKS, GKE)

  - Serverless platforms (AWS Lambda, Azure Functions, Google Cloud Functions)

  - Infrastructure as Code (IaC) tools (CloudFormation, ARM, Deployment Manager)

  - Monitoring and Logging services

  - Security and Compliance tools

  - Artifact Management services


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

- Continuous Deployment (CD) uses the build artifacts from Continuous Integration (CI) and deploys them to production using Infrastructure as Code (IaC). This isn't just about running scripts; CD involves comprehensive processes like testing and monitoring. By leveraging CI artifacts, trust is maintained, ensuring that what was tested is what gets deployed. Essentially, Continuous Deployment spans the journey from a developer's initial feature development to its live presence in production.

- Continuous Delivery, on the other hand, offers the flexibility to release updates whenever desired, without it being compulsory. Regular releases, as advocated by CD, foster resiliency and facilitate rapid adaptation to user feedback. Smaller, frequent changes are easier to manage and rectify if issues arise. Plus, with the unpredictable ways customers might use features, it's advantageous to remain agile and receptive to evolving requirements.

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

Certainly! **Infrastructure as Code (IaC)** is a practice in which infrastructure (networks, virtual machines, load balancers, and connection topology) is provisioned and managed using code and software development techniques. The "advanced beginner" in software or IT might be familiar with setting up environments manually through user interfaces or direct commands. IaC takes this to the next level, leveraging code to automate these tasks. Here's a more detailed breakdown tailored for an advanced beginner:

1. **Code, Not Manual Configuration:** Instead of manually setting up databases, servers, or networks, in IaC, these resources are defined in code files. This is similar to how a software developer writes programs to execute tasks instead of doing them manually.

2. **Version Control:** Just like software code, infrastructure code can be versioned. This means you can maintain a history of changes, track alterations, and revert to previous configurations if needed. This is typically managed using version control systems like Git.

3. **Consistency and Reproducibility:** By defining infrastructure as code, you ensure consistency across different environments. If you've ever heard the phrase "It works on my machine", IaC helps to solve that problem. Everyone uses the same configuration files to set up their environments, which can significantly reduce discrepancies between development, staging, and production setups.

4. **Automation and Speed:** With IaC, tools can read the code files and set up the environment automatically. This can drastically reduce the time to provision or scale infrastructure. No more manual setups or lengthy procedures.

5. **Documentation:** The code itself acts as documentation. Instead of keeping separate documentation that details how infrastructure is set up (which can become outdated quickly), the IaC configuration provides an up-to-date representation of the infrastructure setup.

6. **Tools and Platforms:** Various tools enable IaC. Some of the popular ones include:

\- **Terraform:** An open-source tool that allows you to define infrastructure in a descriptive manner across various cloud providers.

\- **AWS CloudFormation:** A service from Amazon Web Services that lets you describe AWS resources in JSON or YAML format.

\- **Ansible, Puppet, Chef:** Configuration management tools that can be used to set up and manage the state of servers.

7. **Drift Management:** One of the challenges in infrastructure management is "drift", where the actual state of the infrastructure deviates from its expected state. IaC tools can often detect and correct drift, ensuring that the infrastructure remains consistent with the code definition.

8. **Safety and Testing:** With IaC, you can apply software testing principles to your infrastructure. Tools allow for validation and testing of infrastructure code before it's applied, reducing potential issues in real-world deployments.

In essence, IaC is the practice of treating infrastructure setup and configuration with the same rigor, precision, and automation as application code. This approach results in more efficient, consistent, and reliable operations, bridging the gap between software development and operations.

Instead, we can define what we want our infrastructure to be, in a template, usually called an IaC template. They can be written in multiple programming languages--this one is written in a language called "Bicep".

```bicep
param location string = resourceGroup().location

resource myVM 'Microsoft.Compute/virtualMachines@2019-07-01' = {

name: 'myVM'

location: location

properties: {

hardwareProfile: {

vmSize: 'Standard_DS1_v2'

}

osProfile: {

computerName: 'myVM'

adminUsername: 'adminuser'

adminPassword: 'YourStrongPasswordHere'

}

storageProfile: {

imageReference: {

publisher: 'MicrosoftWindowsServer'

offer: 'WindowsServer'

sku: '2016-Datacenter'

version: 'latest'

}

osDisk: {

createOption: 'FromImage'

}

}

networkProfile: {

networkInterfaces: [

{

id: resourceId('Microsoft.Network/networkInterfaces', 'myVMNic')

}

]

}

}

}
```

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

- In the world of software development, the role of continuous monitoring can't be overstated. It's the heartbeat that tells us how our applications are performing, where they're faltering, and how users are interacting with them.

- Imagine this: You've just released a new feature. Is it working as expected? Is it meeting user needs? These questions underscore the necessity of a robust monitoring system. But, while having a myriad of dashboards might seem helpful, it's not just about accumulating data. It's about distilling this data into actionable insights, helping teams swiftly locate and address issues.

#### Why Monitor?

- The purpose of monitoring extends beyond troubleshooting. It offers insights into user behavior, providing key business metrics like daily or monthly user engagement. Such data isn't just numbers; it's a reflection of user satisfaction and product viability.

#### Characteristics of Effective Monitoring

- Coverage: Traceability through the system is crucial. This means tracking a user request from initiation to conclusion. Correlation IDs or trace IDs can be invaluable in this regard.

- Relevant Data: Log entries should provide meaningful information. Whether it's an error message, user ID, application version, or the server it's running on, every bit of data aids in piecing together the bigger picture.

- Strategic Logging Points: Position logs where they can offer the most diagnostic value.

- Priority Management: Assign importance to your logs, ensuring critical logs don't get buried under the noise.

- Freshness: Updated, real-time data often carries more value than stale information.

#### Making Sense of Data

- Collecting data is only the initial step. **The challenge lies in understanding this data, and will likely take 95% or more of your time.** Visualizing it, plotting graphs, and discerning patterns will likely consume a significant portion of your time. Graphs, while they should be comprehensive, must remain straightforward, avoiding needless complexities that could mislead or confuse.

#### The Importance of Feedback

- Consider a jigsaw puzzle shipped to a customer. How do we know if it reached in perfect condition? Did the colors appeal to the user? Did they find the image appealing? It's this feedback, collected via monitoring, that guides further iterations of the product. Continuous monitoring, embedded within the CI/CD pipeline, offers constant feedback on performance, errors, and user engagement.

#### Telemetry: A Close Look

- Telemetry is the backbone of continuous monitoring. It involves collecting data from the platforms where applications are run. This data is gathered on both the server, providing metrics like CPU usage and memory consumption, and within the application, capturing user-specific metrics. These might include engagement levels or user satisfaction metrics.

#### Monitoring Frequency

- By definition, continuous monitoring is unceasing. Data, much like a river, keeps flowing into the central hub, offering a live pulse of the application.

- So the reason why you don't monitor absolutely everything is because there's a cost of monitoring. Otherwise it's just more every single instruction in every single line of code. And the reason is because of that is monitoring is designed to.Be a little bit pragmatic. So you have to kind of know like, OK, what am I trying to actually solve for this?But it was my goal. Am I trying to reason about the program's execution?To find a bug. So for example, am I trying to reduce entropy?With the program execution, when someone runs something, then these logs generated and I can retrace the program steps, which case you don't need to log every single line of code likely.You see the log you know inside of the if statements and potentially some.Variables are useful.Information.Like that and.Yeah, there definitely is a way to avoid logging, which is, you know, just debugging. But.Debugging is kind of more of a.To all that's.Used to kind of fix something as a means to an end and it is kind of difficult to use a sustainably because.Logs provide more context.And there's sometimes that you can't use it to debugger, like you know, if some customer reproduced at some point or something like that layer code or that's never be totally different in the logs can capture that. But you can't go back in time with the debugger and try to figure out what exactly happened. It's very difficult to take dumps and such.Um.So.And another thing is if you matter too much, um, you have to do something with this data. And if you just have way too many logs while Southern application performance, if it's got too much, if you're using like mobile applications, for example, well, you know, it's, you know, you're pumping out like hundreds of megabytes of logs.Over the user cellular connection or the ASB battering ram and such.The other part is actually like how to process it. And if you're logging like way too much stuff, you're spending a lot of these CPU cycles and.Storage and self storing all this stuff.And it's even more difficult to audit as well.Have you said that like you, too little is also?Definitely probably a larger problem so.Log 2 matches. Probably better to do that instead of logging too little I'd say.

- And another thing, sometimes people differentiate it.It's metrics and locking and analytics so.Logging is just kind of the act of just like saying ohh you know, the program breached.This point or something like that, uh, metrics are kind of more about.Ah.Logging things that can be graphed, so for example like CPU usage would be considered a metric. You could have a graph that shows like over time.How much memory using, how much CPU you're using inside, etc. Technically these are logs, but there could be a bit differently to kind of process differently as well. They're not really associated to a code path per se, it's just like.Diagnostics for the for the whole machine.

- And let's try to do this for another application. The first step is with logging. It's normally to help to reduce the entropy of your program state.So in this case.We have the application initializers and displays some stuff to the user. Let's just kind of go over like a very basic logging exercise. Let's also go into correlation IDs to show how you can trace the request back from users web browser all the way throughout the application. What request the application?Makes, et cetera, and we'll see why later, why this is really helpful and important.And this usually requires doing some manual setup with the conference doctor. No per se.Like.That this is associated to this request or something like that.So yeah, I think it's going to be really useful.

- So the first thing I probably do is bring up our code that we have and then figure out where it probably be good spots to do.Some logging and then as we make our application more complicated, we'll see kind of how this scales.Umm.As well and a lot of don't necessarily have committed through every single application this call like you can admit it only like 10% of the time or 5% of the time. Just get like a good understanding of what's happening, especially there's a lot of users hitting that same point. You don't necessarily need like 100% of the time, it's always.Logging that because it could be bad for performance. But again, it kind of depends on your use case. You're probably going through this a little bit more as well.

```
import React, { useState, useEffect } from 'react';

import axios from 'axios';

// Data fetching logic extracted to a custom hook

function useWeather(apiKey) {

const [weather, setWeather] = useState(null);

const [loading, setLoading] = useState(true);

const [error, setError] = useState(null);

useEffect(() => {

async function fetchWeather() {

try {

const response = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=London&appid=${apiKey}`);

setWeather(response.data);

setLoading(false);

} catch (error) {

setError(error);

setLoading(false);

}

}

fetchWeather();

}, [apiKey]);

return { weather, loading, error };

}

function Weather() {

const apiKey = process.env.REACT_APP_WEATHER_API_KEY;

const { weather, loading, error } = useWeather(apiKey);

if (loading) return <p>Loading weather\...</p>;

if (error) return <p>Error fetching weather</p>;

return (

<div>

<h1>{weather.name}</h1>

<p>Temperature: {weather.main.temp}°C</p>

<p>Condition: {weather.weather[0].description}</p>

</div>

);

}

export default Weather;
```

Let's explore where it might be beneficial to implement logging in an application. Proactive logging is crucial as it allows for quicker bug resolution without needing additional log deployments. For example, in an application that handles weather data, important log points could include:

1. **Initial API Key Check**: Verify if the API key is set but avoid logging sensitive information.

2. **Conditional Statements**: Log within conditions handling loading errors or operational states to trace the application flow and identify issues.

3. **Performance Metrics**: Log the duration it takes to load the weather data, potentially using Web Vitals to capture timing from the initial request to the display on the user's screen.

4. **Error Handling**: Implement an error boundary to log errors without crashing the application, providing a fallback UI with support links for a better user experience.

5. **Telemetry and Metrics**: Beyond basic logging, collect telemetry on user interactions, such as location queries, to inform higher-level management reports and monitor system performance.

Additionally, consider logging retry attempts in server communications to correlate them with session IDs, enhancing error analysis and improving the overall reliability of data capture in your application. This approach to logging not only aids in immediate troubleshooting but also enhances long-term application stability and user satisfaction.

Web Vitals primarily focuses on assessing the performance of applications, particularly useful for single-page applications, though adaptable for others. It measures high-level performance metrics like initial load time and various user interaction metrics to detect performance regressions. Installation and usage are straightforward: simply install the Web Vitals package and integrate it into your application.

It's designed to capture events such as input delays during usage, continuously updating to reflect the maximum input delay observed. This requires careful database query structuring to ensure only the latest event per session is considered, avoiding duplicates. This is because Web Vitals may send multiple events as it updates the maximum observed values while the application is in use. If the user exits prematurely, some data may not be transmitted, although web beacons could mitigate this issue, albeit with limited library support.

#### Reliability and Performance Metrics

- It's impractical to keep a human eye on the influx of data at all times. This is where automated alerts come in, signaling when intervention is necessary. Using reliability metrics like ICE (Ideal Customer Experience) and ACE (Adjusted Customer Experience), teams can gauge application performance against established benchmarks.

#### Introduction

- Let's set the scene. You've released a new feature, or want to ensure that your website or app is still usable by the customers. You can use monitoring to make sure that your customers expectations (with regard to automated tests and performance) remain valid.

- There is one thing about monitoring, however. It's likely that your dashboards aren't going to tell you precisely where the problem is, therefore, you should make your code flexible, and develop a good monitoring strategy to know where to log or to debug next. If that was the case, then, well, you better get coding, because you're going to need a _lot_ of dashboards. This might not be a worthwhile strategy. Part of monitoring is about reducing execution entropy and to reduce disorder by tracing execution. It's important to be able to know how to read a dashboard, which metrics are important, which are less important, and how this corresponds with the actual system, including how to trace requests and look up logs.

- Monitoring isn't all about trying to find bugs. It's also useful for understanding user behavior, for example, how many users use the app per day/month or how many users use the platform. These are very important business KPIs.

- Things that a good monitoring system has:

  - Coverage. The ability to trace a request through the entire system. This doesn't mean that you will necessarily know precisely what happens at each step, only that it goes through a system, but it got messed up for example. There has to be a complete path from the user's web browser all the way to the request being serviced, and back again. Teams should provide a correlation id with requests, or provide the capability for you to add your own trace id to the request so that you can track it and helps the other team know if you need help. This might mean that you need to add monitoring to many other intermediary services.

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

5\. **KPIs**: Key Performance Indicators. Metrics that demonstrate how effectively a company is achieving its business objectives.

7\. **Correlation id**: A unique identifier value that is attached to requests and messages that allow tracing of the whole chain of events of a transaction.

8\. **Telemetry**: An automated process where measurements and data are collected at remote points and transmitted to receiving equipment for monitoring.

10\. **MAU**: Monthly Active Users. The number of users who interact with a product within a 30-day window.

11\. **SLA**: Service Level Agreement. A contract between a service provider and the end-user that specifies what level of service is expected during the agreement's duration.

12\. **ICE (Ideal Customer Experience)**: A metric that measures user satisfaction, calculated as the number of successes divided by starts.

13\. **ACE (Adjusted Customer Experience)**: A metric that considers both successes and expected failures, divided by starts.

14\. **Error Budget**: An engineering concept based on the premise that 100% uptime or reliability is neither realistic nor the goal; instead, a certain "budget" of allowable errors or downtime is set.

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

- It's likely that your application is complicated. Where do we start to collect data? When we think about what we need to collect, we need to start with a user-focused mindset. This normally involves collecting telemetry on the user's side, such as performance, errors, and frequency metrics (e.g., how often a button was pressed.) It's important to think about the big picture about what you're trying to achieve first, and then do the concrete implementation of the telemetry later. For example, say I want to know if the "Create project" feature that is being rolled out meets customers expectations. We know for sure that it can't meet customers' expectations if it doesn't work. Therefore, we can add an error handler to send error data back to our analytics hub should there be issues. We can then set up alerting, or rules on the data, that will tell us immediately if customers' expectations are not being met. This helps with experimentation as you get a very fast feedback loop: as soon as there is an issue, you will be notified usually in the order of a few minutes or less, and can correlate it with what you're doing.

#### Ok, where do I start?

- First, you have to think about what you're trying to monitor, especially if it is a business case. For example, the business wants to know how much people like the application. This could be broken down into several sub-goals, such as user retention, logins, activity, etc. and then these can be monitored individually, by turning them into scenarios. Identify these scenarios in your app, and then apply logging to those locations.

- Another situation which overlaps is determine if there are issues or problems in your application, for example errors or performance issues. What are the core user scenarios, for example, when they click on your app, how long does it take to load for the first impression? What about some other processes, like creating a project? Does that take 10 minutes when it should take 10 seconds? What is the entire flow from when a user enters the app to that point? This might require logging at many different points, but there should be a well-reasoned strategy, such as logging in places that reduce execution entropy. For example, logging twice in a row is, in general, probably not as useful to determine what happened next than if it was logged after an if statement. Here's an example.

Let's consider an example involving a simple function to process user registration in a hypothetical application.

### Poor Logging Strategy

```python
def register_user(username, password, email):
    try:
        # ... some code to add user to database ...
        db.add_user(username, password, email)

        # Vague and non-descriptive log
        print("Operation completed.")

    except Exception as e:
        # Logging the whole exception without context
        print(e)

# Usage
register_user("alice", "password123", "alice@example.com")
```

Issues with the above code:

1. Using `print` instead of a proper logging library.

2. The success message "Operation completed." is vague. We don't know what operation was completed.

3. Catching all exceptions and just printing them out without context can make it hard to understand the root cause.

4. Sensitive information, like a password, might get logged inadvertently in the exception message.

### Good Logging Strategy

Using Python's `logging` module:

```python
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def register_user(username, password, email):
    try:
        # ... some code to add user to database ...
        db.add_user(username, password, email)

        # Descriptive log message with relevant context
        logger.info(
            f"User registration successful for username: {username}, email: {email}"
        )

    except Exception as e:
        # Logging error with context and without exposing sensitive information
        logger.error(
            f"Failed to register user with username: {username}, email: {email}. "
            f"Error: {type(e).__name__}"
        )

# Usage
register_user("alice", "password123", "alice@example.com")
```

Improvements in the above code:

1. Using the `logging` module which provides more functionality and flexibility compared to simple print statements.

2. The success log is descriptive, providing context about which operation was successful.

3. The error log provides enough information to understand what went wrong without dumping the whole exception, and without exposing any sensitive information like passwords.

4. It's easy to change the logging level, format, and destination (e.g., file, console, external system) with the `logging` module.

In practice, a good logging strategy would also involve considerations like log rotation, centralized logging for distributed systems, monitoring of logs for anomalies, etc.

- The reason why you want to include other information in the logs (e.g., successful, and not necessarily just a logging guid) is because you want to be able to quickly glance at the logs in your logging viewer (whatever that is) and be able to quickly discern if there are issues. Otherwise, you'd have to look up the logging ids every time.

- Another important thing is: if there was an error, what was the user's experience? This is more of a software-related question and not necessarily a CI/CD one.

#### How do we collect this data?

- This would depend on the application that you're writing, but normally there is an endpoint, called /analytics for example that captures event payloads. The event payloads typically correspond to a particular user (e.g., by sending the user's id with the request, along with their session id, time, and what they were doing.) Be careful to read all privacy laws applicable in your area (e.g., GDPR) as some information may have different retention policies or the ability to capture certain types of information.

- Here's a sample code impl in a TypeScript application.

```ts
const telemetry = new TelemetrySender('https://telemetry.endpoint.com/sendEvent');

const event: TelemetryEvent = {

eventId: 'userClickedButton',

timestamp: Date.now(),

data: {

buttonId: 'saveBtn',

userId: '12345'

}

};

telemetry.send(event);
```

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

- Graphing and plotting data, and making sense of what you're seeing is called sensemaking. It is a very important process because different perspectives on how you see and visualize data can alter business outcomes and what you need to do to change the application in response to different events. Try to avoid using templates for high-level business objectives because this might fail to cater to individual apps' specific needs and features, and might be a sign that your company is developing the same application.

- There's different things, like median, mean, mode, percentiles, etc. please do not average percentiles that does not make sense. Averages are so-so, depends on what you are trying to measure. Percentiles might be misleading so be careful on what you are actually measuring and how it is actually impacting customer experience, cite video about 99.99% percentile video about the issues with that and the 20 HTTP request scenario.

- "I"m trying to measure how many users use the application", what does "use" mean, does it mean login? If so, this is usually straightforward. Make sure to account for users logging in multiple times for example.

- "I'm trying to measure some performance of something" ok this might be a bit complicated. Is it measuring from the user's perspective, and then the percentile is over the user's session? For example, the user is clicking on things, and one of their interactions was very slow. Are we aggregating the 90th percentile per user, and then the percentile of that, or aggregating it across all feature interactions? The latter is not as useful, because a single interaction could cause a poor user experience, and it doesn't discern between a single user having a bad time (but used the application a lot), versus many users having a poor experience.

- Performance regressions, web-vitals for front-end, etc.

- **Monitoring the actual CI/CD pipeline itself could be useful**, for example, if the runner is using more and more RAM, or more and more disk space and might be getting full soon, or it is taking longer and longer to complete (thus compromising the fast feedback loop.) The pipeline is just a server so I'm wondering if regular monitoring tools would apply. If it's slow then it might be using just a single CPU, or too much network, etc.

- Sample size is important, and provides confidence in estimates (use effect size.) Using heuristics are unlikely to be reliable and are difficult to compare over time.

- [[https://www.youtube.com/watch?v=Y5n2WtCXz48]{.underline}](https://www.youtube.com/watch?v=Y5n2WtCXz48) 12% increase in revenue with faster load times, might be getting a bit off topic...

- For other data, such as goals or diagnostics, you'd typically want to perform sensemaking on them. There are many tools that can connect to your database (e.g., ClickHouse) and can visualize the data. Visualizing data is a way where you can generate insights on the data and be able to do stuff with it. For example, if the performance of a particular part of your application is slow, then you can optimize engineering efforts to improve that piece.

#### Conclusion

- As we embark on the journey of continuous integration and delivery, monitoring remains our guiding star. It's not about collecting vast amounts of data but making sense of it. With a strategic approach to monitoring, teams can ensure software products that are not just functional but also resonate with the users' needs and preferences.

**How do I get the information from my monitors and how do I set up monitoring and logging? How do I associate the logs with a specific application version?**

The section on "Monitoring and Feedback in Continuous Deployment" is comprehensive and well-structured. It offers readers insights into various tools, best practices, and methodologies related to monitoring in CI/CD. Here are some suggestions and observations:

1. **Introductory Transition:** You could introduce the topic with a sentence or two, setting the context for the reader. For instance:

\- "Continuous Deployment relies heavily on effective monitoring and feedback mechanisms to ensure software performance and stability. Let's delve into the specifics of setting up and managing these mechanisms."

2. **Goal of Monitoring:**

\- Consider highlighting the dual aims: "The primary aims of monitoring are to ensure application performance and reduce or eliminate ambiguity during troubleshooting."

3. **Dashboard Types:**

\- It might be worthwhile to mention that dashboards are visual representations of data, making them indispensable for rapid diagnostics and decision-making.

4. **Design Considerations:**

\- Add a point on responsiveness. With the increase in mobile use, ensuring that dashboards are mobile-friendly and adapt to different screen sizes can be crucial.

5. **Performance Monitoring:**

\- Mention other performance metrics like Disk I/O, Network bandwidth, etc., to give a more rounded view.

6. **Logging Considerations:**

\- You could also highlight the need for secure logging. Certain data should never be logged (like passwords, personal user details, etc.) due to security and privacy concerns.

7. **5 W's of Logging:**

\- Great touch here. This will be incredibly useful for developers and sysadmins alike.

8. **Blue-green database deployment strategies:**

\- It feels a bit out of place since you provided a detailed section before and after it. Consider expanding on it or positioning it in a more appropriate section or context.

9. **On trust and automation:**

\- The content here is dense and rich. To enhance readability, consider breaking down the longer sentences.

\- Highlight the importance of human oversight. Even with automation, human involvement remains critical for edge cases and unforeseen circumstances. Emphasize that automation is a tool, not a replacement for human judgment.

10. **Citations:**

\- Ensure that any referenced content is appropriately credited, as you've done. It adds credibility and depth to the material. However, depending on the medium of this content (e.g., a book, an online course, etc.), you may need to follow specific citation styles or consider hyperlinking directly to the source if it's a digital medium.

11. **General:**

\- A few headings seem to end with URLs (e.g., Logging and Log Management (ipfs.localhost)). Ensure that these URLs are meant to be there or if they were placeholders that should be updated.

\- Consider providing some practical examples or case studies. Real-world scenarios or illustrations can help ground the theoretical information.

Overall, you've done an excellent job at consolidating a vast amount of information into a coherent and informative piece. The content covers the essentials of monitoring and feedback in CI/CD thoroughly, making it a valuable resource.

#### 1. **Goal of Monitoring:** {#goal-of-monitoring .unnumbered}

The aim is to reduce or eliminate ambiguity when diagnosing incorrect functionality. It's important to log strategically, showing a clear execution path but ensuring it doesn't excessively slow down the application due to data storage concerns.

#### What should I add to the code to do monitoring? Where do I monitor? {#what-should-i-add-to-the-code-to-do-monitoring-where-do-i-monitor .unnumbered}

#### Monitoring software/tools {#monitoring-softwaretools .unnumbered}

Certainly! Monitoring and observability are critical components of the CI/CD pipeline, especially in production environments. Here's a list of some popular CI/CD software monitoring products:

1\. **Datadog**: A cloud-based monitoring and analytics platform that allows for full-stack observability by integrating with numerous platforms and services. It offers real-time performance dashboards, end-to-end tracing, synthetic monitoring, and log management.

2\. **Prometheus**: An open-source system monitoring and alerting toolkit originally built at SoundCloud. It's now a standalone open-source project and maintained independently of any company. It integrates well with the container orchestration system Kubernetes.

3\. **New Relic**: Provides insights into application performance, infrastructure monitoring, and customer experience. The platform offers a suite of products that track various aspects of applications and infrastructure health.

4\. **Splunk**: Known for its powerful log aggregation and search capabilities, Splunk has expanded its capabilities to offer infrastructure and application monitoring with its Splunk IT Service Intelligence (ITSI) and SignalFx products.

5\. **Elastic Stack (ELK Stack)**: Comprises Elasticsearch, Logstash, and Kibana. It's widely used for searching, analyzing, and visualizing logs in real-time.

6\. **Grafana**: An open-source platform for monitoring and observability. Grafana allows users to create, explore, and share dashboards from multiple data sources, including Prometheus, Graphite, and InfluxDB.

7\. **Dynatrace**: A software intelligence platform that offers application performance monitoring (APM), artificial intelligence for operations (AIOps), cloud infrastructure monitoring, and digital experience management.

8\. **AppDynamics**: Acquired by Cisco, AppDynamics is an application performance management (APM) and IT operations analytics (ITOA) company. It provides real-time monitoring of applications and infrastructure.

9\. **Sentry**: An open-source error tracking tool that helps developers monitor and fix crashes in real-time. It's especially useful for identifying issues in code post-deployment.

10\. **Raygun**: Provides error and performance monitoring for software applications. It helps developers diagnose issues in their applications by providing detailed error diagnostics and performance timing information.

11\. **Honeycomb**: An observability platform that allows for high-cardinality data exploration, helping developers understand and debug production issues.

12\. **LightStep**: Focuses on tracing and is particularly optimized for microservices and serverless architectures.

It's worth noting that the best monitoring solution often depends on the specific requirements of the organization, the existing tech stack, and the nature of the applications being monitored. Many companies use a combination of several tools to achieve full-stack observability.

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

> CPU usage can be an indicator, but it's essential to pair it with end-user experience metrics to get a holistic view.
>
> Consider utilizing cloud providers for scalability and fault tolerance. Robust monitoring tools should alert immediately if there's a performance issue, possibly via third-party software to ensure redundancy.

#### 7. **Logging Considerations:** {#logging-considerations .unnumbered}

> Log managers manage, tabulate, and graph logs but don't instruct on what or where to log.
>
> Developers should create clear, concise log messages that provide essential debugging information.
>
> Also important to know what and when to log, and what to include in the log messages.
>
> Assigning priority levels to different logs is crucial. Telemetry is typically what's logged, with different types categorized by importance.

[[Logging and Log Management (ipfs.localhost)]{.underline}](http://bafykbzaceaj2pndeya33yj3lkzcvbkbrdetebwouligktjwdr3vtzhzvjxhyw.ipfs.localhost:8080/?filename=Anton%20A.%20Chuvakin%2C%20Kevin%20J.%20Schmidt%20-%20Logging%20and%20log%20management_%20The%20authoritative%20guide%20to%20understanding%20the%20concepts%20surrounding%20logging%20and%20log%20management-Syngress%20%282012%29.pdf)

> **In general, logs should provide insights into:**
>
> \- **What Happened?**
>
> Provide appropriate details. Merely stating "Something happened" is not particularly useful.
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
> These key points represent the **"5 W's of Logging"**. They have been borrowed from disciplines like journalism and criminal investigation, among others.
>
> For a more comprehensive understanding, it's beneficial to know:
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

- [[Best of Velocity: Move Fast and Ship Things - Facebook's Operational and Release Processes - YouTube]{.underline}](https://www.youtube.com/watch?v=dDf2t-E_Ea8&t=680s) facebook popularized it? 2013 so nope

- [[10+ Deploys Per Day: Dev and Ops Cooperation at Flickr \| PPT (slideshare.net)]{.underline}](https://www.slideshare.net/jallspaw/10-deploys-per-day-dev-and-ops-cooperation-at-flickr) 2009

# Feature Flags {#feature-flags-1 .unnumbered}

## Precedent {#precedent .unnumbered}

* The programming term **“flag”** likely draws inspiration from **international maritime signal flags**, where visual flags convey state and intent. See: [International maritime signal flags — Wikipedia](https://en.wikipedia.org/wiki/International_maritime_signal_flags).
* Feature flags (a.k.a. *feature toggles*) have been used for years. Notable early public discussions include:

  * **“10+ Deploys Per Day: Dev and Ops Cooperation at Flickr” (2009)** — highlighted deployment practices that paved the way for frequent releases and controlled exposure. [Slides](https://www.slideshare.net/jallspaw/10-deploys-per-day-dev-and-ops-cooperation-at-flickr).
  * **Facebook’s “Move Fast and Ship Things” (2013)** — popularized modern rollout and operational controls at scale. [Talk](https://www.youtube.com/watch?v=dDf2t-E_Ea8&t=680s).

## What are feature flags? {#what-are-feature-flags .unnumbered}

**Feature flags are remotely controlled `if` statements.** They allow you to alter code paths at runtime without redeploying. In CI/CD, they enable rapid, low-risk releases by:

* Decoupling **deploy** (ship the code) from **release** (expose functionality).
* Letting **in-progress features** coexist safely.
* Enabling **targeted rollout** (e.g., beta users, specific geographies, user types, IP ranges, or account age).

Flags are often resolved by fetching key–value pairs (e.g., `"EnableSpecialFeature": true`) from a server. Throughout this chapter, **feature flag** and **feature toggle** are used interchangeably.

## Why use feature flags? {#why-would-i-want-to-use-feature-flags .unnumbered}

### Advantages {#advantages-of-feature-flags .unnumbered}

* **Release independence:** Turn features on/off at runtime, independent of your deployment pipeline. Multiple features can be released (or hidden) in parallel.
* **Fine-grained targeting:** Expose a feature to cohorts (beta testers, premium users), regions/languages, or by request attributes.
* **Safer integration:** Merge work early and often; keep risky paths guarded until they’re ready.
* **Progressive delivery:** Roll out gradually, monitor, and roll back instantly if needed.
* **Graceful degradation:** Disable heavy or unstable features during incidents without impacting core functionality.
* **Resource management:** Throttle access to expensive capabilities (e.g., AI inference) based on load, plan, or time of day.
* **Strangler pattern support:** Route a portion of traffic from a legacy path to a new one while maintaining session/state.

> **A/B testing vs. Canary releases**
>
> * **A/B testing (split testing):** Show two or more variants (A, B, …) to different users at the same time to compare behavior (e.g., conversion or retention).
> * **Canary release:** Gradually roll out a new version to a small percentage of users or servers to detect issues before a full rollout.

### Versus blue–green deployments

* **Feature flags** excel at **runtime control of behavior** and targeted exposure. They’re ideal for iterative product work and experimentation.
* **Blue–green** is better for **big-bang changes** (infrastructure shifts, database migrations, framework swaps). Automate blue–green to reduce risk. Use both approaches together when appropriate: e.g., deploy via blue–green, then *release* via flags.

## Implementation basics

Feature flags can start simple (e.g., a JSON file downloaded at runtime) and evolve. Complexity grows when you need, for example, “10% of users” — at that point, **server-side assignment** is preferable: pass user or request context to a flag service and return a resolved set of flags. Avoid doing percentage splits purely on the client; it complicates debugging and often requires redeploys for changes.

Always **version and track flags alongside code** (e.g., in the repository) so behavior changes are auditable and reproducible.

### Frontend vs. backend flags

* **Frontend:** UI variations, layout changes, client-only behavior.
* **Backend:** API paths, provider selection, infra toggles, gating of costly operations.

Example: selecting a new weather API provider is backend; switching between Celsius/Fahrenheit display is frontend.

## DIY example: remote JSON via Azure Storage + GitHub Actions

This simple approach fetches flags from a blob at runtime. It’s quick to start with, though specialized SaaS or a self-hosted service will scale better for complex needs.

> **Security note:** If you host a public blob, treat it as non-secret. Prefer time-limited SAS URLs or private access behind an API. Never rely on flags to hide sensitive code—ship only what clients should see.

### 1) Create a GitHub repository

# Create/clone a repo
```bash
git clone https://github.com/your-username/feature-flags-azure-storage.git
```
cd feature-flags-azure-storage

### 2) Add a `flags.json`

```json
{
  "EnableSpecialFeature": true,
  "ShowNewHomepage": false,
  "BetaTestingMode": {
    "enabled": true,
    "users": ["user1@example.com", "user2@example.com"]
  }
}
```

Optionally maintain **per-environment** files (e.g., `flags.dev.json`, `flags.staging.json`, `flags.prod.json`). Validate with a JSON schema in CI.

### 3) Optional: GitHub Actions workflow (deploy blob)

Create `.github/workflows/deploy-flags.yml`:

```yaml
name: Deploy Feature Flags
on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v3

      - name: Azure Login
        uses: azure/login@v1
        with:
          creds: ${{ secrets.AZURE_CREDENTIALS }}

      - name: Upload to Azure Blob Storage
        uses: azure/storage-blob-upload@v1
        with:
          source_dir: '.'
          container_name: 'feature-flags'
          storage_account: ${{ secrets.AZURE_STORAGE_ACCOUNT }}
          sas_token: ${{ secrets.AZURE_STORAGE_SAS_TOKEN }}
```

> Replace the upload step with your preferred method if needed; this is illustrative.

### 4) Azure Storage setup (summary)

* Create a **storage account** and **container** (e.g., `feature-flags`).
* Generate a **SAS token** with read permission and sensible expiry.

### 5) Add GitHub Secrets

* `AZURE_CREDENTIALS` — Service principal JSON (see Azure docs).
* `AZURE_STORAGE_ACCOUNT` — Storage account name.
* `AZURE_STORAGE_SAS_TOKEN` — Read-only SAS token for uploads/reads.

### 6) Commit & push

git add .
```bash
git commit -m "Initial setup with feature flags"
git push origin main
```

### 7) Client code (JavaScript example)

```js
async function fetchFeatureFlags(url) {
  const res = await fetch(url, { cache: 'no-store' });
  if (!res.ok) throw new Error(`Flag fetch failed: ${res.status}`);
  const flags = await res.json();
  return flags;
}

// Example usage
(async () => {
  const url = 'https://your-storage-account.blob.core.windows.net/feature-flags/flags.json?your-sas-token';
  const flags = await fetchFeatureFlags(url);

  if (flags.EnableSpecialFeature) {
    // Enable the new path
  }

  if (flags.BetaTestingMode?.enabled) {
    // Check current user against BetaTestingMode.users
  }
})();
```

**Operational flow:** To change behavior, update `flags.json` (or use a flag service UI). Your app refetches on an interval or per request; behavior flips without redeploying. **Log the set of resolved flags** with errors/crashes to aid reproducibility.

## Practical considerations

### Data implications

Different cohorts may generate different data shapes. Plan migrations and compatibility carefully. Use flags to gate access to new schemas and write dual-format when transitioning.

### Complexity management

* The number of combinations grows as **2^N** for **N** independent boolean flags (e.g., 10 flags → 1,024 combos). Testing and bug reports must include **flag states**.
* Consider automated analysis (e.g., PCA or other ML) to correlate problematic outcomes with flag combinations in telemetry.
* Regularly **sunset** obsolete flags and keep implementations simple.

### Project & UX coordination

* Communicate rollout plans across teams to avoid incoherent, mixed experiences.
* Bundle related flags into coherent “releases” when it helps UX consistency.

### Server-side evaluation (SSR/API mediation)

* Resolve flags on the server so clients only receive relevant code/paths. This improves security (no hidden UI to unhide) and simplifies debugging.

### Monitoring & observability

* Track exposure, conversions, and errors by **flag and variant**. Telemetry is directional, not perfect—treat it as a signal.

### Security notes

* Flags **do not** provide true concealment. Anything shipped to clients can be discovered and toggled.
* If secrecy matters, **don’t ship** related resources until the feature is truly live.
* If you must ship client flags, consider obfuscation and name hygiene; rely on this only as a minor deterrent.

## Limitations & risks {#limitations-of-feature-flags .unnumbered}

* **Combinatorial explosion:** Many flags → many interactions → harder QA. Always capture flag states in logs and error reports.
* **Inadequate concealment:** Client-delivered code can be probed (including enterprise-only features). Avoid leaking names that reveal roadmap details.
* **Default dependencies:** If the flag server fails, **fail safe**. Choose secure defaults and timeouts to prevent accidental exposure or outages.
* **Overuse:** Excess flags increase cyclomatic complexity and test cost. Some changes (OS upgrades, huge refactors) simply aren’t “toggleable.”

**Mitigations**

* **SSR / server-side checks** so clients only see what they can use.
* **Usage monitoring** with telemetry and anomaly detection.
* **Semi-long-lived branches** for high-risk or sensitive work; produce isolated builds for test environments.
* **Code obfuscation** only as a deterrent; pair with not shipping disabled resources.
* **Lifecycle automation** (see below) to prevent stale flags.

## Feature flags vs. branching {#feature-flags-vs.-branching .unnumbered}

* **Both** separate lines of work, but at different layers:

  * **Branches** isolate **source code**. Non-trunk work isn’t deployed; it lives in the repo until merged.
  * **Flags** control **runtime execution** of already-deployed code in production and other environments.
* Flags enable early integration and experimentation without redeploys. Branches defer integration and are ideal for larger or unstable work.
* Use **both**: develop on branches, merge often, protect risky paths with flags, and release progressively.

*(Metaphor: a tree’s branches diverge from the trunk; flags decide which “path” to walk at runtime.)*

## Environments {#what-is-a-feature-flag-environment .unnumbered}

An **environment** is a curated set of flag states. Common environments are `dev`, `staging`, and `prod`, but you can create cohorts such as `beta`, `experimental`, or region/language-specific sets.

* Assign environments automatically (e.g., by deployment target) or dynamically (e.g., new users get `experimental`).
* Allow **manual opt-in** for beta programs.
* Keep environment definitions in code or your flag service for traceability.

## Lifecycle {#feature-flag-lifecycle .unnumbered}

* **Short-lived by default:** Most flags should live days/weeks, not months. Once a feature is at **100%**, remove the flag and dead code.
* **Time bombs / expiries:** Add an **expiration date** and alerts; auto-disable or page owners when stale.
* **Ownership:** Record an **owner**, **purpose**, and **cleanup plan** for each flag.
* **Cleanup tooling:** Use static analyzers or tools (e.g., Uber’s **Piranha**) to remove unused flags automatically.
* **Testing discipline:** If you plan to disable a widely enabled feature, periodically test the **off** path with other active flags.

## Naming patterns {#feature-flag-naming-patterns .unnumbered}

Good names prevent technical debt and make cleanup/search reliable.

* **Clear and concise:** Prefer full words over abbreviations.
* **Consistent casing:** e.g., `PascalCase` or `snake_case` — pick one.
* **Action verbs:** Start with `Enable`, `Disable`, or `Toggle` to clarify intent.
* **Positive names:** Prefer `EnableNewUI` over `DisableOldUI`.
* **Categorize with prefixes:** `payment_`, `ui_`, `search_` to group logically.
* **Indicate type:** Append `_rollout`, `_killswitch`, `_abtest`.
* **Indicate status:** `_beta`, `_experimental`, `_temporary`.
* **Tie to work items:** Include IDs (e.g., `EP01_EnableDarkMode`) to improve traceability.
* **Team scoping:** `frontend_`, `backend_`, etc., if that helps ownership.
* **Versioning:** Include a version when relevant (e.g., `_v2`).
* **Dates (optional):** Suffix with `YYYYMMDD` for planned removal (e.g., `_rm20250401`).
* **Avoid special characters** that complicate regex or tooling.

**Example:** `ui_EnableDarkMode_rollout_beta_v2_rm20250401`

## Popular feature flag providers/managers {#popular-feature-flag-providersmanagers .unnumbered}

1. **LaunchDarkly** — mature feature management with targeting and experiments.
2. **Split.io** — flags + experimentation + monitoring.
3. **Optimizely** — experimentation and feature management (formerly Episerver).
4. **ConfigCat** — flags and remote config across environments with targeting.
5. **Flagsmith** — open-source feature flags and experimentation.

---

### Quick checklist

* [ ] Add a flag behind every non-trivial user-facing change.
* [ ] Decide targeting and metrics **before** rollout.
* [ ] Log resolved flag states with errors and key events.
* [ ] Prefer server-side evaluation and avoid shipping unused code.
* [ ] Set an **expiry** and **owner** for each flag; clean up after 100% rollout.
* [ ] Keep naming and documentation consistent across the org.

You want to perform A/B testing or canary releases to gather user feedback or performance data before fully deploying a new feature. Undertaking A/B experiments to optimize user experience. For instance, enabling features only for specific user segments like beta testers.

You need to provide different feature sets to different users or user groups, such as premium or trial users.

You want to develop and release features independently and maintain a single codebase that serves multiple deployment environments.

Use an effective branching strategy when:

You want to manage and organize parallel lines of development, such as features, bug fixes, or release branches.

You need to isolate experimental or unstable code changes from the stable main branch to prevent disruptions in production.

You want to ensure that different development teams can work on features simultaneously without interfering with each other's work.

You need a systematic approach to merge code changes from different branches into the main branch, ensuring the codebase remains stable and up-to-date.

You want to maintain a clear version history and facilitate traceability of code changes.

Needing high agility, where if an issue arises with a new feature, it can be quickly turned off without redeploying the entire application.

Incrementally transitioning from an older system to a newer one using the strangler pattern. For example, redirecting requests from an old application to a new one in real-time while maintaining user session states.

Advantages of Feature Flags
You've already discussed blue-green deployment strategies. Why wouldn't I just use those instead of feature flags?

They serve different purposes. With feature flags, you can release new features independent of the deployment pipeline, and multiple features can be released at once. You also have more control over who you release it to, such as specific groups of users or via geographical location, and normally you can turn feature flags on and off much faster than going to another deployment through a deployment pipeline. They also allow hiding in-progress development. They also allow exposing features to certain people, or environments, for example QA to test.

Blue-green deployments are typically reserved for significant changes such as large-scale infrastructure updates, database migrations, or complete framework shifts, like migrating from React to Angular. This method is especially useful for scenarios where feature flags are not feasible, such as with incompatible frameworks or extensive application refactors. It's standard practice to automate the blue-green process to handle these major changes efficiently, ensuring stability and minimal disruption. This approach is also suitable for smaller updates like package upgrades, ensuring all changes, whether minor or major, undergo the same rigorous deployment process.

You want to use feature flags to incrementally expose (or hide) features that are currently being developed. This will be part of your regular CI workflow. When you're working on a feature, put it behind a feature flag. There is an annotated example below with a code implementation.



---

### Artifacts, Docker, and Versioning {#artifacts-docker-and-versioning .unnumbered}

#### What are artifacts?

* **Artifacts** are the outputs of your build: binaries, libraries, archives, documentation, container **images**, etc. (A running **container** is not an artifact; the **image** it runs from is.)
* Artifacts can be treated **individually** or **as a package** (e.g., a tar/zip containing multiple files).
* In dependency graphs, one project’s **outputs** become another’s **inputs** (e.g., app A depends on app B’s published artifact).

#### Docker essentials

**What is a Dockerfile?**
A **Dockerfile** is a text file with instructions to build a Docker **image**—a portable, reproducible environment including your app and its dependencies.

**Example: simple Python web app Dockerfile**

# 1) Base image
FROM python:3.8-slim

# 2) Working directory
WORKDIR /app

# 3) Copy sources
COPY . /app

# 4) Install dependencies
RUN pip install --trusted-host pypi.python.org -r requirements.txt

# 5) Expose port (example)
EXPOSE 80

# 6) Default command
CMD ["python", "app.py"]

**Notes**

* Build with a tag immediately to avoid dangling, untagged images:

  ```bash
  docker build -t myuser/myapp:v1.0 .
  ```
* If you build without `-t`, you’ll get an image with `<none>:<none>` and an image ID (e.g., `d49c4d85c3ea`), which is hard to track. Retag if needed:

  ```bash
```bash
  docker tag d49c4d85c3ea myuser/myapp:v1.0
```
  ```

#### Tagging images & pushing to registries

* A **tag** identifies *which* image you mean (and often *where* it lives). The full name includes the registry when pushing somewhere other than Docker Hub:

  ```
  <registry>/<namespace>/<repo>:<tag>
  # e.g. ghcr.io/acme/myapp:v1.2.3
  ```
* Common tag strategies:

  * **SemVer**: `v1.2.3`
  * **Channels**: `dev`, `staging`, `prod`
  * **Immutability**: short **Git SHA** (`sha-abc123`)
  * Combine: `v1.2.3-sha-abc123`
* Avoid relying on `latest`; be explicit.

**Build, tag, push (general)**

# Build
docker build -t myuser/myapp:v1.0 .

# (Optional) Retag with registry hostname
```bash
docker tag myuser/myapp:v1.0 myregistry.example.com/myuser/myapp:v1.0
```

# Login + push
```bash
docker login myregistry.example.com
docker push myregistry.example.com/myuser/myapp:v1.0
```

# Pull elsewhere
```bash
docker pull myregistry.example.com/myuser/myapp:v1.0
```

**Azure Container Registry (ACR) example (condensed)**

# Login to Azure
```bash
az login
```

# Create registry (once)
```bash
az acr create --resource-group myresourcegroup --name myregistry --sku Basic
```

# Docker/ACR auth
```bash
az acr login --name myregistry
```

# Tag with login server
```bash
docker tag myuser/myapp:v1 myregistry.azurecr.io/myapp:v1
```

# Push + verify
```bash
docker push myregistry.azurecr.io/myapp:v1
az acr repository list --name myregistry --output table
az acr repository show-tags --name myregistry --repository myapp --output table
```

#### Reproducible builds & Docker cache

* Local builds often use cached layers; CI runners may not. This can produce different results.
* Prefer **pinned versions** and **idempotent** steps. For example, avoid a bare `apt-get install curl`; pin to a version or use deterministic sources.
* Consider occasional **no-cache** builds in CI to catch drift:

  ```bash
  docker build --no-cache -t myuser/myapp:ci-check .
  ```

#### Integrating artifact repositories with CI/CD

* **Restore step**: Use your language’s package manager (NuGet, npm, pip, Maven, etc.) pointed at your artifact/package repository.
* **Auth**: Connect via service principals, API keys, or your CI provider’s service connection.
* **Local test first**: Validate repo access and package restore locally before automating.

> **Why not always rebuild instead of storing artifacts?**
> Toolchains and environments change. Even a one-bit difference means it’s no longer the *same* artifact, which complicates audits, rollbacks, and security verification. Artifact repositories provide immutability, retention, and traceability.

#### Artifact tracking & naming

* Decide how you’ll **trace an artifact** across environments (build → QA → staging → prod). Use consistent **metadata**: build number, version, commit SHA, build date, source branch.
* **When is a version assigned?**

  * Some teams assign a build version each run and record which version gets promoted.
  * Others version only on release. Either way, **record** which artifact was released.
* **Marketing vs. engineering versions**: “Version 5” publicly can map to many internal patch versions (5.0.1, 5.2, …). Keep a mapping.
* **Evergreen/remote assets** (e.g., JS payloads fetched at runtime): make sure you instrument with telemetry so you know exactly which version each client is running.
* **Name safety**: If embedding branch names in image names or tags, **slugify** them to match Docker’s allowed characters.
* **Pre-release ordering** (`v1.0-dev` vs `v1.0-beta`): define conventions clearly; SemVer pre-release identifiers compare lexicographically—document what “comes before” in your process.

#### Artifact maintenance & retention

* Keep **just enough history** to support rollbacks, audits, and customer support; avoid hoarding every build forever.
* Use your repository’s **retention policies** and deprecation features:

  * Track **downloads/usage** to learn what’s still in use.
  * **Deprecate** versions with clear comms (replacement, removal date, impact, contact). For rarely used artifacts, a silent deprecation may be fine, but document the decision.
* Providers often default to \~**30 days** retention for temporary artifacts; configure to your needs.

#### Git tags & release automation

* **Git tags** label a specific commit (lightweight or annotated). Tags alone don’t “make a release”—your CI/CD must **react** to them.
* Typical flow:

  1. **Decide release strategy** (what triggers a release, who approves).
  2. Implement a **tagging strategy** that encodes that decision (e.g., push `vX.Y.Z` tag on `main`).
  3. CI job on **tag push**: build, set app version, create release notes, publish artifacts/images.
* **Version in the app**: If your app shows a version string, update it in your config or embed it during build (and do this **before**/as you tag).
* **SemVer vs. evergreen**:

  * **SemVer** needs human judgment for “major” changes; automate detection of obvious API breaks where tooling exists, but expect manual decisions.
  * **Evergreen** (monotonic or SHA-based) can be fully automated; use promotion markers (e.g., “this SHA is now prod”).

> **FAQ: Why does a container image get built on every merge?**
> Your CI may be wired to build on each push/merge and optionally **auto-deploy** (CD). The pipeline runs the Dockerfile, tags the image, and pushes it to a registry for the target environment.

#### References & further reading

* CI & old versions: [https://stackoverflow.com/questions/41954891/ci-what-to-do-with-old-versions](https://stackoverflow.com/questions/41954891/ci-what-to-do-with-old-versions)
* Automated deployment: [https://stackoverflow.com/questions/8902468/automated-deployment-using-ci-server](https://stackoverflow.com/questions/8902468/automated-deployment-using-ci-server)
* Build versioning in CD: [https://stackoverflow.com/questions/33821137/build-versioning-in-continuous-delivery/33821876#33821876](https://stackoverflow.com/questions/33821137/build-versioning-in-continuous-delivery/33821876#33821876)
* Release with Docker: [https://stackoverflow.com/questions/30632046/how-to-use-docker-to-make-releases](https://stackoverflow.com/questions/30632046/how-to-use-docker-to-make-releases)
* Branching from tags: [https://stackoverflow.com/questions/55359931/when-to-create-a-branch-from-tag](https://stackoverflow.com/questions/55359931/when-to-create-a-branch-from-tag)

---

### Blue-green database deployment strategies {#blue-green-database-deployment-strategies .unnumbered}

* See ***Refactoring Databases*** for patterns and caveats; treat schema changes as versioned, reversible artifacts aligned to the app release cadence.

---

Here’s a tighter, de-duplicated version that keeps the substance and flow.

---

### Integrating Artifact Repositories with CI/CD Pipelines

* **Package manager restore.** Add a restore step that targets your artifact/package repo (e.g., NuGet for C#, npm, pip, Maven/Gradle).
* **Authorization.** Connect via service principals/identities, API keys, or your CI provider’s service connection. Follow your provider’s documented login steps.
* **Test locally first.** Validate repo access and restores in your dev environment/IDE before wiring CI.
* **Why store artifacts (vs. re-building)?** Toolchains and environments drift. Even a 1-bit change yields a *different* artifact, complicating audits, rollbacks, and security verification. Artifact repos give immutability, retention, and traceability.

---

### Artifact Tracking & Naming

* **Lifecycle traceability.** Decide how you’ll track an artifact from build → QA → staging → prod. Attach consistent metadata: build number, semantic/app version, commit SHA, build date, source branch.
* **Multiple creation points.** Builds, non-customer pipelines, and tests may each produce artifacts. Record which ones are **customer-facing**.
* **Naming conventions.** Use a clear schema (e.g., `<org>/<module>:<version>` or `<group>/<name>/<version>`). Keep it consistent with your repo’s layout rules.
* **When versions are assigned.**

  * Some teams stamp **every build** and promote selected builds.
  * Others version **only on release**. In all cases, record the released artifact version in release notes/logs.
* **Marketing vs. engineering versions.** Public “Version 5” often maps to many internal versions (5.0.1, 5.2…). Maintain the mapping.
* **Evergreen/remote assets.** If clients fetch assets at runtime (e.g., JS payloads), instrument with telemetry to know exactly which version each client runs.

---

### Artifact Maintenance & Retention

* **Keep what you need—no more.** Excess versions increase storage cost and confusion. Dependency managers can help resolve “right version,” but set a policy.
* **Retention defaults.** Many providers default temporary artifacts to \~30 days—tune to your support/rollback requirements.
* **Support horizon.** For shipped artifacts, align retention to contractual/regulatory support windows (e.g., years). Re-creating exact artifacts later can be hard.
* **Policies & tooling.** Use your artifact manager’s retention rules, usage/download stats, and lineage to understand what’s still in use.
* **Deprecation.** Mark versions deprecated (and optionally block download). Communicate replacements, removal dates, impact, and contacts. For rarely used artifacts, a low-touch deprecation may suffice.
* **Definition reminder.** Artifacts are only the **essential** bits needed to run—avoid hoarding nonessential build byproducts.

---

### Tagging Notes (SemVer & Branch Names)

* **Pre-release ordering.** Define conventions up front (`-dev`, `-beta`, `-rc`). SemVer compares pre-release identifiers lexicographically—document what “comes before” what.
* **Automating bumps.** Incrementing tags requires reading the last published version; encode rules in your release script.
* **Branch names in tags/images.** If embedding branch names, **slugify** them—Docker image names have restricted characters.

---

### Reproducible Build Environments

* **Capture the inputs.** Pin tool versions, OS/base images, and dependency versions; record input checksums and build metadata. Non-idempotent steps cause drift.
* **Use containers.** Dockerfiles provide isolated, repeatable build environments and allow conflicting host dependencies to coexist safely.
* **Bit-for-bit vs. behavior.** Small toolchain changes may alter bytes without changing behavior—but the artifact is still *not the same*, which matters for audits and supply-chain security.

---
