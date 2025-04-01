## Considerations for businesses

### Regional differences

-   [[https://arxiv.org/pdf/2204.09638.pdf]{.underline}](https://arxiv.org/pdf/2204.09638.pdf)

-   [[IEEE Paper Template in A4 (V1) (researchgate.net)]{.underline}](https://www.researchgate.net/profile/Indika-Perera-3/publication/312963879_Evaluating_the_impact_of_DevOps_practice_in_Sri_Lankan_software_development_organizations/links/5a9b7007aca2721e3f302b0d/Evaluating-the-impact-of-DevOps-practice-in-Sri-Lankan-software-development-organizations.pdf)

-   [[A-Study-of-Awareness-and-Practices-in-Pakistans-Software-Industry-towards-DevOps-Readiness.pdf (researchgate.net)]{.underline}](https://www.researchgate.net/profile/Imran-Imran-19/publication/359347861_A_Study_of_Awareness_and_Practices_in_Pakistan's_Software_Industry_towards_DevOps_Readiness/links/623631c6d545b7729404310d/A-Study-of-Awareness-and-Practices-in-Pakistans-Software-Industry-towards-DevOps-Readiness.pdf)

-   [[content (hawaii.edu)]{.underline}](https://scholarspace.manoa.hawaii.edu/server/api/core/bitstreams/c86180b7-4583-402f-8d32-94597c0351b4/content) page 6788 has interesting sources for DevOps being deep seated in culture

-   [[Microsoft Word - Hussain, Clear & MacDonell (2017) ICGSE.docx (arxiv.org)]{.underline}](https://arxiv.org/ftp/arxiv/papers/2104/2104.00881.pdf) job ads in New Zealand

-   different distribution of people's skills, personnel geographically make implementing devops difficult or easy, depending on how many skilled people there are in that region, migration, immigration, etc. makes things very complicated

-   potentially country culture might impact adoption, need to look into this

### Introduction

-   Let's dive into CI and understand what it really is and how it can be implemented

    -   It all starts with the business. The business defines if it should or should not adopt CI/CD. This means that there has to be a reason, or a goal, from the business that is not met, and therefore they believe that the CI/CD methodology can help them achieve those goals. For example, they want to increase the development cadence or their customers are saying that they want newer features faster, and the current process has been shown to be a bottleneck, as small features take a very long time to be released due to many procedures or legacy processes. It's important that people understand what CI/CD really means, because otherwise adopting a methodology (and not using it to its potential) means that there is a lot of wasted training or confusion within the organization: some people believe that CI/CD is being practiced, but the actual steps or processes are too far from what would be considered CI/CD. The changes don't get to the customers faster, and developer's can't instill confidence in their changes.

    -   The business should think about why it wants to adopt CI/CD. It is a modern framework, and many people are doing it. But it does not fit into all situations. It is as much a social endeavor as a technical one, and requires re-thinking of the entire development process, including a new release cadence and schedule. CI/CD does not always increase throughput, although automation can help reduce repetitive tasks. Therefore, if you still have your tasks and methodologies tied to waterfall, for example, the organization is set up to do things in a very heavy-duty way, then it will be challenging to adopt CI/CD. Additionally, not providing developers with the resources that they need to adopt CI/CD will make it so that the benefits won't be fulfilled easily. For example, say there are many physical servers that need to be adapted to have deployments via IaC. If these servers cannot be changed or upgraded, or migrated away from (potentially into the cloud), then it will make it challenging for developers to instill confidence in their changes, because they cannot easily start up a new test environment. Therefore, developers have to have a capability to start up a new test environment that can be easily created and destroyed. Failure to do so means that you're only adopting a build server, which may have questionable output status and might not be reliable or indicative of whether the changes are actually good, therefore, reliance on heavy-duty procedures will persist.

    -   Simply adopting CI/CD software is only a small part of actually adopting CI/CD. This is because your application needs to be receptive to new changes, and it has to be able to be built quickly, preferably in the order of 10-30 minutes to ensure developers have a rapid feedback loop. To do this, this may require a large architecture overhaul or, potentially, a migration to microservices, depending on the application. Large, monolithic applications might be very slow to be able to be deployed.

    -   Let's go into a bit more detail about how the CI process works from end to end.

    -   When a business would like a new feature in their software, it might be a top-down approach, where an entire feature is constructed and planned meticulously, and then given as a spec to the developers to implement. Technically, this form of task planning or task creation is possible to do in CI/CD, but it is commonly used with agile-methodologies. This is because, for example, you want to get rapid feedback. Rapid feedback commonly extends to the development cycle itself, that is, once you make a small change, you're able to run the tests and see if the changes were successful. Or, that the smaller changes are less likely to impact the entire application, therefore, QA passes are faster. When you deploy the WIP feature to production, it is integrated, so you can get rapid feedback in terms of having that feature running in production with the other code, and then you can test it there, etc. However, it is also useful to have rapid feedback in terms of getting feedback from your customers. This is because the business normally wants to increase its development velocity and get things out faster, and to take calculated risks with new features and such, they want to grow quickly. So, this follows that the business would normally be useful in adopting agile-like approaches, such as creating MVPs of features, to make sure that the features are released sooner rather than later. This does not mean that developers work harder, rather, the scope of the work is defined or designed to just provide what customers want. This overlaps with the technical side, because if there are some foundation mistakes (or changes) based on customer feedback, it is normally easier to change an application with fewer features and a smaller codebase, then one with many features (which themselves may have schemas or lots of databases/data) which would be difficult to migrate, as there might be many features used in parallel and in complex ways, so it makes testing more challenging if there was a new feature to be added (because its compatibility would have to be evaluated against all existing scenarios.)

    -   Instead, you would release a feature that would have a minimal feature set, or an MVP, that you can send out to customers and see if they like it. If they don't like it, then you can get feedback much earlier on: you didn't create an entire feature that people don't like or are not interested in. Practicing agile-like methodologies isn't a hard requirement to also practice CI/CD.

    -   Let's show a typical flow of how work would be tasked out for the weather app.

    -   First, you have to make your feature have the ability to be modular or easy to edit. This means adopting good software development patterns. If you don't, then it will be very difficult to integrate new parts of the feature, because they won't be able to be tested as part of your application easily.

    -   Imagine we want to create an entirely new overlay. Technically, you'd want to have a more gradual change, because you would want to get customers feedback at every point throughout the redesign instead of just changing everything all at once as it might confuse people. But let's say for now that we want to redo the entire thing.

    -   For starters, the application must continue to work in the meantime. The old overlay still has to work, and customers still have to be able to use the weather app. This also means that the new overlay can be in production, but not necessarily visible to customers.

    -   This also means that the old overlay has to have the capability to be disabled, or removed, so that the new overlay can work.

    -   The overlays control the map. Right now, the overlay is tied to the map with certain function calls that pass in its application state into the map. This is a very tight-coupling. This means that there might have to be some refactoring done while the new feature is being implemented. This is because there should be a separation point from the old overlay and the new one, so that they can be easily replaced. Also, the map might provide feedback back to the overlay, for example, the overlay might show average wind speed on the entire displayed map, so therefore, the map has to tell the overlay what that value is: there is two-way communication. The overlay can also shift the map with some navigation tools (e.g., arrow buttons), and passes in a large amount of application state that would not be applicable for the other overlay. Additionally, the overlay is rendered as part of the map (they are the same component), which makes it very difficult to remove the overlay specifically. This is because the map is also initialized by the overlay, and the initialization routines go back and forth when the map is rendered.

    -   First step, is to separate the overlay from the map. They should be in a separate component or some way to decouple them. This might involve creating an interface that the overlay uses to communicate with the map. This helps create a separation point, because now the caller has to implement the interface, rather than the actual method calls.

    -   Second, the interface should be set up generically. This means that an overlay-specific state that is specific to that component shouldn't be used, because there is another overlay that won't have that specific overlay state. Therefore, try to make the communication between the navigation arrows more straightforward. For example, the arrows could send a navigation event to the map, instead of the entire application state. This means that someone else (i.e., you) who is creating a different overlay component can easily swap in another one and doesn't need to have the same internals as the old one.

    -   Normally, these software development patterns should be done while tasks are being done, or part of general refactoring for the application. Therefore, this process shouldn't take a long time, unless you have a legacy application or have strange abstractions.

    -   This pattern is called the "strangler" pattern, where an existing part of the application is cut off from the rest. This also makes it easier to feature flag it, such that you can conditionally enable or disable the older overlay and collect telemetry from the new one and make sure that it is working correctly.

    -   Then, you can start to develop the new overlay, and add some telemetry to it. This can be monitored using continuous monitoring, and the telemetry should capture user-focused metrics. If you're measuring performance, capture when it is displayed (in pixels) on the screen. For front-end applications, web-vitals is useful for this.

    -   When you're developing it, you can merge the changes in the meantime. The feature might not be finished, or, it might not work. But the main application should still work, and the existing overlay should appear untouched from the customer's perspective.

    -   When working on telemetry, focus on what the customer is seeing. API calls do not mean that the customer will experience that latency. The customer doesn't care about how long an HTTP request took. What they care about, is after I click on this thing, when do I see it displayed on my screen, in pixels? This doesn't mean that they are useless, rather, the API calls are a subset of the entire gantt chart of what the user is experiencing. For example, if it took 1000ms for a customer to click on the button and see something, and the API call (as part of that flow) took 900ms, then the API call is likely to blame for being the bottleneck for this user's interaction, and can help prioritize what is optimized. Creating a sum from its parts without knowing all of the parts means that there is an undefined amount of time that the customer may have had a bad experience.

    -   After the small change is made, you can test it locally, and then create a PR.

    -   The pipeline then builds and runs the automated tests on the changes. The pipeline may also deploy those changes to a private testing server, which can help developers see how the application will function. This is important, because, especially for web-based applications, there are some things (e.g., cookies, HSTS rules, CORS) that only work when it is deployed to an actual environment with those correct HTTPS certs for example. The only way to know for sure if something will work is to actually deploy it.

    -   In order to deploy to a testing environment, you have to have the infrastructure to do this. This means that your deployments must be defined in IaC, which will allow your pipeline to automatically re-create that environment and then deploy that branch. Depending on the application resources, each environment should be specific to that PR. So therefore, you can have multiple PRs open at the same time. The environment itself might be fairly minimalistic, depending on how you are running it. For example, if the environment itself is simply a web service or application (or a CDN), then this is probably much simpler to do, and *might* not require IaC, rather, it's just a set of files (e.g., JS, PNGs, CSS, HTML, etc.) that are deployed to a CDN under a certain server or a subdomain. For example, you could create an application that merely goes to a specific PR subdomain (or directory) that contains the application after the pipeline has uploaded the artifacts to it. The server should indicate which commit hash it is running to ensure that you are able to identify its version.

    -   Since there will be much more PRs created than usual, it means that reviewers must ensure that they are reviewed promptly. Each reviewer should have the capability to pull the code on their machine and test it. Additionally, you can set up some plugins in GitHub to remind people of aging PRs.

    -   When you're developing continuous monitoring, you have to make sure that you understand the capabilities of the monitoring solution that you have. For example, if it is not capable of intercepting all of the requests and their contents (for example, it cannot parse JSON payloads) then therefore it would make sense to use something that it is compatible with it, for example, by specifying information in the request headers. This might also reduce the load on the monitoring server (or telemetry solution) because parsing JSON is usually much more complex than simply checking the headers. It also allows the response to be an error response or another response, and this might not be JSON encoded (or it could be corrupted), which means that the monitoring solution might be easier to write a rule for and could be more resilient.

### Accelerating Without Cutting Corners: Embracing Continuous Improvement and Maintenance

-   Let's start with CI. CI is about integrating continuously.

-   There's a build pipeline that validates the changes, and also compiles the code so that developers can be re-assured of its changes and it doesn't break everyone else later on.

-   With CI, it's more about treading down the grass constantly, so that if there is something that comes up, for example a small flood, you can fix it quickly.

-   You've merged in code a few days ago, or did a release relatively recently, so any changes you've made up until now (in the span of a few days) that don't work are likely going to be much smaller.

-   This means that the tempo of contributions increases as well, almost in a play-by-play sportscast. Bob committed X! Sally committed Y, and used part of Bob's X! Now, Sandy is coming in clutch and doing a refactor to X and Y!

-   When we integrate in smaller pieces, this increases the development tempo. Lots of things start happening: pipelines are running, people are doing code review, and lots of changes are being delivered. If we retain our existing development mindset, where things must go through many days, weeks, or months of manual testing, followed by lots of integration time, it looks like we're making a big mess. We found so many bugs last time, you exclaim, so if we commit constantly, and get things merged, then there are going to be a lot more bugs.

-   In this case, CI/CD encourages automated testing and code review, which helps ensure that these changes are going to be safe. There are also concepts like hiding features from customers before they are ready, that ensures that WIP is not shown to customers, but still allows it to be integrated and tested, so that when it is shown to customers, it's all ready to go and has been tested in production.

-   CI/CD is about having *more* control over your process. Automation is strict and clear. If it works, then you know that the instructions work. The instructions are purpose-built for a computer to run, thus, the computer cannot tolerate ambiguity. There is no room for misinterpretation.

-   **CI/CD is not a set it and forget it thing where you just leave it to be. It requires continual maintenance. Since it is invoked often, it will have a higher ROI. This maintenance should be much less than the current manual processes in place.**

-   Your application will be constantly changing; new configuration, new tests, new dependencies, etc. thus, there will be frequent revisions to the pipeline. The goal of the pipeline is not to never have any human intervention at all until the end of time, rather, it is to automate a series of menial steps, and to do so reproducibly, consistently, accurately, and provide stakeholders with information (e.g., blocking PRs if they do not meet the thresholds of quality or the pipeline fails.) This provides a reliable way for developers to instill confidence in their changes.

-   What people get a bit apprehensive about is the act of releasing often, because this is associated with changing things. But it doesn't necessarily have to be so, and CI/CD isn't always about everything that is committed must go to production immediately without review as fast as possible. It's about making that process smoother via automation and resilient processes created through constant experimentation. There are many opportunities where humans stay in the loop.

-   This looks very hectic. But this is only hectic if there isn't control over the process. Letting everyone change whatever in any order without any safeguards, like testing, means it's likely to be a disaster. There has to be a baseline of "pause", for example, the code has to be able to be compiled to run (interpreted languages are special.) If the code can't run, then the customer's can't use it.

-   This isn't akin to editing an "index.html" file on an FTP server and then having millions of customers seeing the changes immediately. It is about having the tools necessary to validate these changes locally, through code review, through testing, and also in production (behind a curtain, more on that later) before they are released gradually. Not everything that is committed is released immediately.

-   Part of integrating often is to deliver smaller pieces of work, that are less risky, but more frequently. This requires thinking about what matters to the end-users most.

-   When we integrate often, this means that features, even ones that are partially completed, exist in production but are not accessible to customers necessarily. The lack of automated testing is more abstract, because in traditional software development, changes would undergo testing and integration at similar times, thus, the software is "still in development", and trying to demo the feature would result in bugs or crashes. With continuous integration and development, this work is structured so that prototypes are quickly available. This means that if one skips writing tests or code review, it might not be immediately apparent in the short-term because work is delivered, whereas with traditional development both processes were combined together.

-   Note that this does require a bit more discipline. For example, the only thing that is truly in between you and getting things out to production is the build pipeline (people don't have to code review.) Therefore, technically, you don't have to write any tests: as long as the test suite is passing, then the build is working. This is an unfortunate situation though, as developers are no longer able to instill confidence in their changes if these processes are removed.

-   This and continuous maintenance is of special importance because nobody wants to write tests if they have 500 failing tests in their test suite for a few years. This would require a significant workload on their part, and much of the team has likely stopped trusting the test suite, thus, they are on longer able to get feedback quickly.

-   If the continuous monitoring data is incomplete, missing, or not trustworthy, or too noisy, too many alerts, then people will ignore it. This is part of being a human: being able to find what works and what doesn't; it's illogical to pay attention to something that doesn't have useful information.

-   Continuous improvement is vital for adopting CI/CD, because as software develops, more and more changes are required to the build pipeline. Teams change, and software requirements change.

-   In order to maintain agility, the build pipeline may have to be refactored, new steps might have to be added or changed, or there might be a different environment to release to.

-   Therefore, one has to continuously improve the existing processes to make sure that your software can continue to adapt.

-   Continuous employee training is important because new skills will be needed to maintain the pipeline, for example, because newer versions of software are being released and have to be used.

-   There is still room for QA test passes as well. In Continuous Delivery, everything is integrated up until the point of the actual release to production. This gives opportunities for QA test passes, for example. In Continuous Deployment, however, everything that is committed goes to production. Don't fire the QA team--they'll still be busy, except they will be focusing on higher-order things, like usability, security, and function rather than menial tasks. This is a much higher-value use of your QA team.

-   And we should make sure that production isn't a special unicorn of a delicate bowl of dishes. This is because it makes it difficult to take risks, which impact the ability to experiment. Being able to experiment is important for developers to be productive, to learn (and thus to become more productive), and to work on features. If you can fail quickly, but also recover quickly, this is normally better in the long-term than not failing often, but when you do, there's a large cleanup which contributes to organizational scar issue and slows down processes. It's about making the processes more resilient, because, no matter what methodology you use, there will always be bugs. It's not about shipping a spacecraft that you can't easily recall to earth, it's about shipping a few letters to your friend, and re-sending them if one of them gets lost in the mail. Software is flexible, mutable, and doesn't necessarily confirm to physical beings.

```{=html}
<!-- -->
```
-   Continuous integration extends much further than simply automating the process to generate build artifacts, because it requires a change in development cadence which impacts what information stakeholders receive regarding development progress. Adopting continuous integration means that the pipeline must always be kept green (or passing) because the developers must create artifacts that reflect real-time development progress and thus must have sufficient confidence in those artifacts. The business has to prioritize resources to allow developers the time to maintain and manage the pipeline. They also must chunk work in such a way that allows for small integrations to occur. Also, a failing build means that developers are unable to integrate their work, as the build artifacts are unlikely to be generated.

-   The current software architecture might be unwelcoming to fast changes, because of complex or unnecessary dependencies. Therefore, there are some frameworks and software design patterns that you might find helpful to help divide the change and isolate dependencies into interfaces to make their behavior more defined, and to better scope what changing a dependency does in an entire program (that could be very large.)

-   CI/CD is usually used with Agile-based methodologies. CI/CD shows how to structure the software development process to allow for efficient and regular integration and deployment. Agile shows how to restructure the actual work, and provides guidance on restructuring work to be more customer-oriented chunks. CI/CD is usually used with Agile because the rapid iteration that Agile provides requires a streamlined software development process to get the changes out to customers. If a small piece of work is created, then there has to be a fast process to get this out to customers, otherwise a significant amount of work could be developed which would negate some of Agile's effectiveness as it is not possible to get customer feedback if the changes are not deployed. However, it still would be possible to demo the work to stakeholders locally.

-   CI/CD is ultimately a systems thinking approach. For example, when testing becomes a bottleneck, a superficial solution might urge testers to speed up. Yet, pushing testers, who are already at capacity, may diminish quality. Transferring manual testing to developers slows feature development, creating a new bottleneck. In response, there might be a push for detailed requirements, leading developers to wait and then adhere strictly to these specs. This often results in isolated components that are challenging to integrate, causing merging issues. After merge issues are resolved, the application appears disjointed, and features don't work together, and feature overlap occurs between features. Detailed specs can also demotivate developers and reduce collaboration, culminating in disjointed features and user experiences. Delays in deployment and documentation complexities arise, necessitating a large support team to handle customer concerns. Amidst this, the requirements writer is stressed, producing exhaustive specs, which ultimately prolong the product\'s release and may let competitors advance. Adopting a systems approach would prioritize understanding root issues, like why testing lags, and might suggest solutions such as test automation.

-   These set of processes make more sense when practiced together than when they are alone. This is because they have higher ROI when practiced together. For example, writing automated tests that are just used once doesn't have as much value as if they were run multiple times, potentially hundreds of times, while new changes were being developed, as they could provide a baseline level of assurance in the changes. Since the rest of the pipeline is optimized to run these tests multiple times, then it means that everything is much more useful. It's a bit of a strategy, because you need people to change their behavior and way of working, it can't all be automated. People have to do a lot more teamwork if they are to not step on each other's changes.

-   It provides a strategy on how to reduce common bottlenecks, such as avoiding lots of manual procedures when releasing and packaging software, as these steps don't need lots of human creativity and don't change often. But if you want to release software faster, you have to look at your bottlenecks in your process and figure out how to solve them using systems thinking, and CI/CD offers a set of strategies on how to do this. It's just about making it easier to work and to support developers.

-   It's easy to tell a QA person, in writing, how to test something because it is resistant to refactors, and humans are very adaptable. You don't need to rewrite the tests, but you can know that it is tested.

-   If you're constantly writing tests to fix things that break, and writing more, and more, and more because more and more things are breaking in strange ways, then you might reconsider your architecture.

-   Now, the act of getting everyone continuously integrating is another issue. The technical side is an implementation detail compared to what needs to happen in the people side. People have to be aware of the priorities of the business's desire to release at any point, thus, the build pipeline must be maintained. This is because it is usually the only way to release software, therefore, if it is not working then software cannot be released.

-   There are many definitions of continuous integration. I think it is more of a gradient and what the business gets in return for adopting this process. Therefore, if one implements it "incorrectly", then one should look as to what outcomes are not being fulfilled or where the developer pain points are. Is the software quality poor? Are releases taking too long? CI/CD can be adapted to work with different workflows and different companies and you can still get value out of it, even if your releases are far and in between.

-   Use system thinking principles. When we want to optimize a delivery process, it may not make sense to simply optimize a single part, because this could have downstream effects. Therefore, it is important to understand the root cause of issues before optimizing because there might be a reason why things are done a certain way. For example, say there is a testing, dev, and prod environment. These environments are created because, when deploying to dev, there are a lot of bugs and many things that break. If we eliminated the dev environment, it would increase our velocity at the expense of software quality. Therefore, we have to look at why the dev environment was created: because there are many bugs that are released. Therefore, we should look at how these bugs are being introduced, whether the current architecture is too complex to reason about your changes, and whether we need increased testing to enforce guardrails.

-   The goal is to instill confidence in the build artifacts at every step, so that when the code hits production, then it has sufficient confidence instilled into it.

-   Don't discount the fact that you are not deploying multiple times in a day, look at total fold-over-fold increases initially to build momentum. An organization can still benefit from CI/CD practices even if they do not deploy everyday. One must measure how long the current delivery cycle is to make sure that subjective judgements are not made.

### Defining the rationale

-   When doing a migration, make sure to clearly list goals and develop a minimal strategy to do the migration.

    -   Why do you want to move to CI/CD?

    -   Why do you need to build artifacts that reflect real-time development progress, are they being used by another system or process? Are the business deliverables taking too long to complete? Do you need to do demos? Note that there may be other development improvement possibilities, such as integrating frequently can reduce bottlenecks in the overall process. Try to be pragmatic about where the bottlenecks are in the process, even though this is somewhat likely to improve the entire process.

    -   Is there too much integration work being done?

    -   Does the company need to keep up with competitors and become more agile?

    -   Is the company looking to add "CI/CD" to the job postings to attract newer developers?

    -   Is it just because "it's the next best thing?"

    -   Be honest with your goals, because migrating is very complex and in some cases, could be detrimental if not done correctly. It also requires lots of business resources, stakeholder involvement, and in the short-term could increase overhead for releases while the release process is being optimized.

-   When upgrading dependencies, upgrade often, so that you can pause if there's an error (and have time to fix it.) Consider merging teams if there's a team whose only dependent is your project. It might not make sense to split up the projects into two parts, because this increases communication overhead.

-   What are some situations where you don't need to build artifacts that reflect real-time development progress? There is a non-trivial training cost to set things up, build server investment, and a risk premium that must be evaluated. Trading a bit of testing to get features out much much faster that have 1%-ish more bugs so that you can maintain a competitive edge might be more beneficial (this is what risk premium describes.)

-   If the business doesn't need the ability to deploy at any point, then CI/CD might not be as useful. There's a lot of overlaps with CI/CD in terms of just following better practices (i.e., the codebase is organized, easy to edit, etc.) and new processes. Having an organized codebase means that edits are usually easier to make, and impact of changes more well-defined. Developers have to know the desire for the business to request releases more often. There has to be some executive-level drive to get things moving, otherwise people will not change.

-   Before adopting CI/CD, the business should evaluate if they have the ability to quickly revert deployed changes. Each business will have their appetite for risk and whether it is more valuable to potentially ship (and have the ability to quickly revert) broken functionality to a few customers, with the advantage of significantly faster feature deployment.

-   The business must understand what it seeks to gain from continuous integration and what bottleneck this is aimed to solve. For example, what are the symptoms of not frequently integrating, are these visible? What happens if integration is delayed? Will features be delayed from deployment? Given that this is normally paired with continuous deployment, what value is the business receiving from integrating often (and thus deploying often?) If these are not addressed, then developers are unlikely to integrate often as there is no reason to do so. (source: Continuous Integration is Not About Build Systems. 2017 43rd Euromicro Conference on Software Engineering and Advanced Applications (SEAA) \| 10.1109/SEAA.2017.30).

-   Moving to CI/CD most likely won't fix business problems that are much deeper. You have to fix those first, otherwise moving to CI/CD, you will be worse off as you have a new system that isn't designed to be used in that way, along with a lot of new training.

-   While embracing industry trends can enhance an organization\'s attractiveness to potential programmers, it\'s essential to evaluate whether implementing CI/CD aligns with both business and technological needs. CI/CD requires a time and monetary commitment and clear indicators of successful implementation.

-   CI/CD cannot provide customer value in and of itself, but it can provide a foundation to allow for changes to be pushed out quickly in response to customer feedback. It's up to the PMs, the ICs, the CEO to provide customer value by choosing what to work on and how to do it. CI/CD provides a foundation on how to streamline this process so that these customer-value pieces can be delivered quickly, while keeping the deployed application up and running.

-   Before starting implementing CI/CD, make sure that you understand why you want to do it. Why does the business need software released faster? Are you ok with errors in production? Do you have someone on-call to handle potential outages? Are they trained? Not all software needs CI/CD. Merely upgrading software because it's best practices (e.g., a legacy project that is scheduled to be decommissioned) is a waste of time.

-   Say if we had the software released twice as fast, but with half the features. Is there anything we can do with the software? Are people going to use it? If you're shipping to customers, they might be ok with minor feature breakages in exchange for much much faster feature delivery.

-   Try to find the bottlenecks. CI/CD isn't a silver bullet to make everything faster. What is the time of every step from creating the feature, to releasing it to customers? What step takes the longest? It is a bit more complex, as there might be some steps that are impacted by other steps. For example, if releases take too long, this might be because there are no guidelines to how to release the software. If you ask the team to create guidelines, then the bottleneck will show up somewhere else because they're creating guidelines, so then if you ask the team to stop creating guidelines, then the release will be slow again. It's about going to the root-cause of the issue, and understanding why release requirements are needed in the first place.

    -   

+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| While CI/CD is widely beneficial, there are scenarios where its adoption might not offer as much value, or its implementation might be challenging. Here are some situations where CI/CD might not be the best fit:                                                                                                      |
|                                                                                                                                                                                                                                                                                                                          |
| 1\. \*\*Infrequent Releases\*\*: If a product is mature and requires only occasional maintenance updates, the overhead of setting up and maintaining a CI/CD pipeline might outweigh the benefits. This is especially true for legacy systems where the release cycle is prolonged.                                      |
|                                                                                                                                                                                                                                                                                                                          |
| 2\. \*\*Highly Regulated Environments\*\*: In industries where software changes are subject to strict regulatory scrutiny (e.g., aerospace, certain medical devices), continuous deployment may not be practical. Every change might require exhaustive documentation, rigorous testing, and lengthy approval processes. |
|                                                                                                                                                                                                                                                                                                                          |
| 3\. \*\*Extensive Manual Testing\*\*: Some applications, especially those involving complex graphical interfaces or intricate workflows, might be hard to test automatically. If manual testing constitutes a significant portion of the quality assurance process, continuous deployment might be slowed down.          |
|                                                                                                                                                                                                                                                                                                                          |
| 4\. \*\*Limited Infrastructure or Resources\*\*: Smaller organizations or startups operating on tight budgets might find it challenging to invest in the required infrastructure, tools, or human resources to set up an effective CI/CD process.                                                                        |
|                                                                                                                                                                                                                                                                                                                          |
| 5\. \*\*Monolithic Architectures\*\*: While CI/CD can be implemented for monolithic applications, microservice architectures often make it easier to adopt CI/CD practices. Large monoliths might have slower build and test times, making the \"continuous\" aspect less feasible.                                      |
|                                                                                                                                                                                                                                                                                                                          |
| 6\. \*\*Lack of Team Buy-in\*\*: CI/CD isn\'t just a set of tools; it\'s also a culture. If the development team or management isn\'t fully on board, or if they don\'t understand the benefits, implementing CI/CD might be challenging.                                                                                |
|                                                                                                                                                                                                                                                                                                                          |
| 7\. \*\*Short Project Lifespan\*\*: For short-term or one-off projects, the effort required to set up a CI/CD pipeline might not be justified, especially if the project won\'t undergo multiple iterations.                                                                                                             |
|                                                                                                                                                                                                                                                                                                                          |
| 8\. \*\*Limited Connectivity\*\*: For teams working in environments with limited internet connectivity, continuously pulling, building, and deploying code might be impractical.                                                                                                                                         |
|                                                                                                                                                                                                                                                                                                                          |
| 9\. \*\*Heavy Reliance on External Dependencies\*\*: If a project relies heavily on external systems that are not always available for testing, creating a seamless CI/CD process can be challenging. Integration testing might be intermittent or might require extensive mocking.                                      |
|                                                                                                                                                                                                                                                                                                                          |
| 10\. \*\*High Costs of Failure\*\*: In systems where failures can have catastrophic consequences (e.g., nuclear reactor control systems, space missions), the preference might be towards exhaustive review and testing processes rather than rapid deployments.                                                         |
|                                                                                                                                                                                                                                                                                                                          |
| It\'s essential to note that while CI/CD might not be universally applicable, many of its principles, such as automated testing and early error detection, can still be beneficial in most development environments.                                                                                                     |
+==========================================================================================================================================================================================================================================================================================================================+
+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

-   Also see AAMI TIR45:2012/(R)2018.

#### For software developers: getting to know the new system

-   Getting Started

-   Understand Your Process: Measure your current process, including build times.

-   Trust in the Build Process: Ensure builds are reproducible and successful.

-   Start Small: Gradually automate testing, build understanding, and adopt more CI/CD practices.

-   Seek Guidance: Consult your team, guides, or experts in the field.

-   Common Pitfalls

-   Overcomplicating build pipelines

-   Ignoring test stages

-   Ineffective planning

-   Migration to CI/CD can be gradual and its benefits can be realized immediately. Getting more clarity on the build process isn't useless, and each step can gradually be made more efficient. For example, consider testing. Some of the manual "checking" test cases can be automated which can begin to increase confidence in the build system.

-   You probably want to create tests and get your build process understood before the implementation of your pipeline. Otherwise, it is unclear which provider you will need, and planning can go a very long way and does not disrupt the business. What processes are currently in place prior to merging? You can create tests in parallel with the other activities.

-   First step is to get organized. How do you build it? What dependencies do you need? What operating systems do you need?

-   Start by creating an onboarding guide (or revisiting it) on how to build your software. You may want to do it on a fresh VM or a new computer, especially if the software is complicated. This will help you identify which dependencies are required to be installed. Make sure that you include all steps, even if they appear simple. If you identify dependencies on software that your organization owns, then you will probably want to have those artifacts published to a package repository first (and then consumed by your application.) Make careful note of steps that require special usernames, passwords, access tokens, API keys and secrets, special scripts that you run, or specific access to certain resources. These items will have to be stored securely. The quickest way to identify these is to build in a clean VM, and then any other remnants will quickly appear when you try to build it on the CI/CD server.

-   The dependencies don't have to be migrated to CI/CD just yet, however, their artifacts must be versioned (and it is recommended that it is migrated but not a requirement.) The project can be migrated to CI/CD in the background, and when it's ready, it can publish its own artifacts to the package repository. The act of publishing the artifacts will replace the current process for how your artifacts are currently updated. Therefore, it is useful to identify this explicitly in the steps. The artifacts in the package feed will remain the ground truth of which artifact to use and any other versions laying around should be removed. Only accept artifacts from the package feed and do not manually install them going forward.

    -   If you stop at any point during refreshing the onboarding guide, no work is lost and the business does not have any extra downtime. It is simply a way to get new developers (and existing developers) up to speed on how to build the software.

    -   Make sure that other developers are also using the guide. If they cannot follow it, make sure that the steps are correct and that they have the correct dependencies installed. If they don't say anything and there are issues, then there might be some developers who are unable to build on the pipeline because the ci/cd pipeline will have a certain configuration that may be incompatible with their setup.

    -   Then the project has to be migrated to version control. There are lots of good books on how to get this set up.

    -   Some steps might be automatically performed by your IDE, such as installing third-party dependencies such as NuGet packages when building your software locally.

    -   If you have a very good understanding of which dependencies your software requires, such as those which are already published to a package repository and are likely to be easy to retrieve, you may not have to do a clean build in a VM.

    -   Make careful note of steps that require authentication to third-party repositories, including how to get their credentials. This will be very important for other steps, as the CI/CD server will need secure access to these credentials or access, especially if these resources only exist on the intranet. If so, then you might consider a local CI runner on your intranet, but managed remotely (i.e., as a self-hosted runner.) The self-hosted runner can be in the cloud, but may have to be in a manually-managed VM and may have to have a connection to your intranet. Instructions will vary dependending on how your identity management is set up.

    -   If your application uses custom dependencies, think about how those will be updated in the future and consumed by your application. You may consider migrating those to a CI pipeline first, make sure that they are published with versions, and then import those in your dependent project. Each project will have a different way to identify custom dependencies. Some tips on if you are using custom dependencies:

        1.  If you are importing DLLs directly or have to copy specific files from a server to your project.

        2.  If you have to install custom lesser-known software on the host computer prior to building the application.

        3.  If your project references files that are outside of the build folder, or on an external harddrive or mounted filesystem. These will be quickly identified if you cannot build the software in a fresh VM.

    -   Some steps might have equivalents in the pipeline template and may not match precisely what you wrote in your directions. For example, a publish artifact step might include using the appropriate artifacts, but your step might say to go to a specific folder. Try to use the pipeline template instead but make sure that you note which artifacts you are publishing and configure the template correctly.

-   [[Panel Discussion - Learning From Today - Shaping Tomorrow - YouTube]{.underline}](https://www.youtube.com/watch?v=aFBoFxZ-lgM)

-   Blocks entire development team when pipeline is broken

-   Central hub model

-   Alignment of organization's goals

#### For managers: Understanding motivation and goals for CI/CD adoption

-   Why do you want to migrate to CI/CD? If you don't know why you want to change, then you don't know once you've succeeded in changing.

-   Migrating because it's best practices or because you want a build server, or because you want to spend time setting it up are not good reasons. Resist the temptation to artificially find reasons to migrate.

-   It requires investment from the entire organization because many dependencies also require to be adopted/onboarded to continuous integration as those can quickly become blockers and changes cannot be continuously integrated. It requires monitoring, testing, and a very different deployment model, therefore setup is not trivial.

-   Given that the pipeline is the way to deploy and/or integrate software, it must be constantly maintained. Therefore, additional training might be required, including ongoing investments. These investments should have a high ROI if the pipeline is used frequently and can provide business value quickly.

-   Developers take on a broader operation of responsibilities, as they are now responsible for development and operations Adopting Continuous Delivery and Deployment. Proceedings of the 21st International Conference on Evaluation and Assessment in Software Engineering - EASE'17 \| 10.1145/3084226.3084263 (i.e., higher training costs.)

    -   This is because it is very expensive to migrate to CI/CD, and it may even increase development costs. This also means there is significant change, and may slightly decrease productivity in the short-term. If no actual realizations are made in terms of outputs or processes, then it is wasted effort. Just "going faster" to prove that the initiative was successful by pretending to be agile is also not useful, because it can lead to burn out and low quality software by ignoring the test stages.

    -   This fails to realize the full benefits of CI/CD, because even if changes are merged in often, and are feature flighted, this doesn't mean that the changes are incremental in nature, nor does it mean that customers have an early view at some of the new products in their beta stage.

-   Think about the business issues first -- is the deployment too slow? Is there too much bureaucracy when trying to release, making it difficult to get deployments out? Are features taking too long to become demoable? Is competition getting closer, yet you can't get the features out in time?

    -   These might be hiring issues, cultural issues, process issues, etc. Identify what these issues are first. It's highly possible that CI/CD could help address these, but if it's so-and-so from such-and-such that is causing delays for example, then fixing the root of the issue is much more likely to yield an effective CI/CD transition. No amount of CI/CD and build efficiency fixes can fix people-related issues. Find the bottlenecks in the process.

```{=html}
<!-- -->
```
-   Defining \"done\" and setting measurable goals

    -   (From Agile Embedded Podcast) \"speeding up your process\" - Measure the time it takes for the build process to complete. Do not base it on gut feelings, use concrete times from email/chat threads. If you do not have any measurement in place whatsoever, take a bit of time to measure the process. If there is absolutely no time to do it whatsoever, get a group of people to agree on approximate times of how long things take to be deployed and do not force everyone to agree on a duration, instead, create a histogram to show the variability and uncertainty in the estimates. Also during this time, get a better understanding of the full flow of the process.

    -   If there is ambiguity in the estimates, don't worry. Try to get the best estimates as possible, but also make sure that you're keeping track of ambiguity. This is because CI/CD can reduce ambiguity and variance to integration/deployment, so therefore this is helpful to track the before and after.

    -   If you don't know, make an educated guess but make sure to retain the ambiguity.

        -   Quote: \"So what is the goal of setting up build automation? I think maybe the most obvious, but also maybe least interesting goal is that of speeding up your process.\"

    -   Trust in the build process and product - Measure the number of successful builds and the percentage of successful builds over time.

        -   Quote: \"I think in the end, a lot of the techniques that we\'re talking about, they will speed things up for you, but even more so, they give you confidence and trust. And that\'s what gives you speed. Exactly. And having that confidence enables you to go faster.\"

    -   Reproducibility - Measure the success rate of setting up new infrastructure or rebuilding the system from scratch.

    -   Don\'t make build pipelines too complicated (e.g., Jenkins scripts that can\'t be run locally.)

        -   Quote: \"You want to be able to trust in the reproducibility of what you\'re doing. If some part of your infrastructure falls over, so what? You can set up another one just by typing a command and then sipping coffee as you watch the machine do its work.\"

    -   Feedback loops - Track the number and types of feedback loops, such as build success, code analysis, unit tests, and target testing.

        -   Quote: \"And of course, you get all of the feedback loops, the tiny ones from, can you even still build it, to code analysis, to unit tests, to can I flush it on the target, to can I still run tests on the target?\"

    -   What business value or goals are derived/KPIs?

        -   Why is the migration taking place? What are the goals for the new CI system?

        -   Addressing the importance of investing in CI/CD infrastructure and practices and providing metrics that can be used to justify the investment.

        -   Quantifying and measuring success

        -   Get current metrics on how long development time takes, then set a goal that can be achieved with CI/CD

        -   What technical challenges will migrating to CI/CD solve?

        -   What is the final state or end goal?

        -   Discussing the importance of finding out what the current system is lacking, and how the migration will provide the solutions.

        -   When you're choosing between cloud and self-hosted for your runners, there are a few things to consider. First, if your application requires application-specific or your company-specific hardware that cannot be migrated to the cloud, or, requires very specific security rules that cannot be replicated. For example, the application requires running on mainframes or needs access to legacy resources that cannot be migrated to the cloud. Examples of where this is not the case is publishing artifacts (as these are commonly available within the CI provider options.) There is also cost: for example, bandwidth charges can be higher in the cloud, especially for uploads. Also, if you have specialized hardware (or it is cost-prohibitive to rent it out in the cloud), then you can do the builds locally.

        -   If you choose cloud-hosted, this provides the capability to quickly create new runners and upgrade existing ones if needed. Also, the OS updates are usually automatically managed for you, depending on the type of runner that you choose. You can always change your decision later if you make a mistake.

-   What's the ROI of Continuous Integration?

-   There is an intent to deceive if CI/CD processes are claimed to be followed but are not because of an implicit assumption about their benefits or potential efficiency gains (such as costs) to a company. It is important to concretely and accurately define how the process works, what is the scope of the implementation, what are the goals, and which parts of the process correspond to continuous integration.

    -   It might also be confusing for those who are familiar with the standard CI/CD approaches, and the organization might not be aligned.

### Adopting CI/CD: a gradual approach

-   Understanding the Existing Process

    -   Note: some of these steps can occur in parallel.

    -   When considering adapting continuous integration (CI) for organizations, it\'s crucial to recognize there are multiple ways to practice it while still reaping its benefits.

    -   If an organization already has a team and processes, spend a few weeks understanding their work and how they work together, including their workflows. Learn how they communicate and with whom. Having the team document their processes is essential; create a living document that gives a clear step-by-step guide on deploying or building software.

-   Start small

    -   Begin the transition to CI/CD by making incremental changes. The ultimate goal is to deliver software faster, without causing long-term disruptions. Businesses should maintain their current pace during this transition.

    -   Start with familiarizing your team on pull requests. Depending on the existing system, code reviews may need to be introduced or strengthened. Code reviews are normally very lightweight, and can be done in CI/CD software. Make sure that all code undergoes code review before it is merged.

    -   Understand what the teams concerns are. This will help prioritize what to start with first. Are they afraid of adopting CI/CD? What about bad software going into production? If that's the case, then consider emphasizing testing first.

-   Laying the Groundwork

    -   Developers have to be able to verify their changes, and it has to be done fairly quickly because of a need for a fast feedback loop. Can developers verify their changes? Can they run the application locally, or, somewhere? Is this easy to do? This doesn't have to be automated tests yet, just the capacity to be able to run the application and see if their changes work. Make sure that wherever they are testing is ephemeral, and can be easily re-created.

    -   Then, start creating automated tests to cover existing code. These tests should be able to be run locally. These tests might be acceptance tests, or user-focused tests. It might impact multiple parts of the application, such as databases. The first test will take a long time to setup, likely, because there is a lot of groundwork to cover. Then, the other tests, which use the existing infrastructure, should be easier to do.

    -   Synchronize dependencies: Make sure all team members know which version of the dependencies are being used on CI. If uncertain about which versions to use, select a team member with a successful setup and get deps from them. Ensure the CI uses the agreed-upon versions. Team members may use different versions from time to time, for example, by testing newer versions of software or dependencies.

-   Setting up the CD pipeline

    -   The CD pipeline won't do everything just yet. To start, it will just build and test the code, and copy the artifacts generated and publish them to an artifact repository. This can be thought of just as Continuous Integration.

    -   Create a test suite that has at least one test. This test should verify the sanity of the application but does not have to be comprehensive. It is important that there is at least one test as this will help verify if the application can be tested on CI, and will ensure that other tests will run. Make sure that this sample test does run on the CI server, and the PR is blocked if the test fails.

    -   Create a build definition file, such as Jenkinsfile or .github/workflow.yml. This will depend on your provider. To start, make it super simple. It might just build a single component of the application.

    -   Then, make it more complex, such that it can build the entire application.

    -   Publish the build artifacts to the artifacts repository. Only use these artifacts for releasing and don't do manual builds. They can be handed to the release team (temporarily.)

    -   Begin to use the continuous deployment artifacts generated by the build pipeline in the release pipeline. This could include manually downloading them from the CI server after a build. Since the deployments do not occur often, then this should be ok. If the release artifacts are not suitable from the continuous release system, or do not work, then those should be fixed. You can still increase the efficiency of your current deployment schedule in the meantime.

-   Improving Release Frequency

    -   1\. \*\*Understand the Current Process\*\*:

    -   \- Begin by understanding how a release is made. Is there a need to communicate with someone, such as sending an email? What are hidden expectations and stakeholder communications? For example, are there certain stakeholders that need certain release notes, or to sign off on it?

    -   \- If the process isn't clear, scrutinize every line of the script. Abstract individual steps into broader categories, creating a hierarchical understanding.

    -   \- Consult the release team for clarity. Document every step to ensure accurate scripting and automation.

    -   2\. \*\*Identify Inconsistencies\*\*:

    -   \- Note variations in the release steps across different releases. Identify and eliminate sources of these deviations, especially if they prove hard to automate.

    -   \- Look for hidden expectations or implicit steps, like manual emails or specific conditions under which certain actions are taken.

    -   3\. \*\*Spot Bottlenecks and Redundancies\*\*:

    -   \- Find and address bottlenecks that slow down the process.

    -   \- Ensure that quality testing isn't compromised for speed. Instead, aim to automate tasks that don\'t require human decision-making.

    -   \- Prioritize testing resources for crucial functions like usability, functionality, and exploration.

    -   Start finding bottlenecks in the process. Do not eliminate testing in the pursuit for speed, rather, consider automating tasks that exist purely as demonstrations and thus do not require much human ingenuity. This will allow the QA team (or testing resources) to remain fairly constant while increasing their efficiency. Testing resources should be focused more on higher-level items, such as usability, functionality, and exploration.

    -   4\. \*\*Increase Release Frequency\*\*:

    -   \- Aim to release more often, such as quarterly instead of yearly. This can highlight inefficiencies and keep processes fresh.

    -   \- This will trigger a cascading effect that will shape how much time is dedicated for integration tasks, feature work, etc. and will make inefficient processes or bottlenecks quickly apparent. This will also keep the processes fresh in people's minds as they are done more frequently, and will likely require less change in-between releases because there is less code changing.

    -   \- Even if a release isn't ready, ensure the software is in a deployable state. Showcase partial features through demos to verify their integration.

    -   \- Adopting Agile practices alongside CI/CD can be beneficial in this context.

    -   \- If the release cycle is shorter, then there should be less code to merge. This means that there should be less time required for integration steps if there are fewer things to merge or fewer merge conflicts. Consider taking on slightly less scope. This scope decrease will be mitigated by more frequent releases. This will require involvement with PMs because this may change the roadmap and what can be delivered at certain dates, so it could take a while to change. They should be open to the idea because there should be a drive to deliver software to customers faster.

    -   5\. \*\*Automation and Trust Building\*\*:

    -   \- Begin with minimal automation, focusing on ensuring timely releases.

    -   \- Avoid over-reliance on automation in the early stages. Debugging scripts while simultaneously changing processes can be challenging and could undermine trust in the automation process.

    -   \- Areas of automation may only become visible when increasing the release cycle, due to organizational forgetfulness and lack of explicitly documented procedures, and lots of ad-hoc scenario specific procedures. Automation may appear to have a low ROI initially if the release cycle is long, however, when it is shorter, then it will make more sense.

    -   6\. \*\*Refinement and Streamlining\*\*:

    -   \- Remove unnecessary steps and automate repetitive tasks. Get feedback from teams.

    -   \- Before progressing further, ensure the refined process can be executed multiple times without significant modifications.

    -   7\. \*\*Efficiency and Stakeholder Involvement\*\*:

    -   \- Enhance deployment efficiency gradually. This may entail automation and engaging various stakeholders due to potential interdependencies.

    -   \- Increase deployment frequency progressively, continually optimizing the process.

    -   \- Communicate impending changes to all involved and be prepared for significant restructuring.

    -   8\. \*\*Evaluation and Feedback\*\*:

    -   \- Once the release process is consistent, review it for any repetitive or superfluous steps.

    -   \- Gather feedback from teams and analyze past releases to pinpoint inefficiencies.

    -   9\. \*\*Releasing Frequency and Scope\*\*:

    -   \- Transitioning from bi-annual releases to weekly releases is commendable. Frequent releases reflect confidence in processes and the ability to recover from issues.

    -   \- Begin by marginally shortening the release cycle. Automation opportunities often emerge when the release cycle tightens.

    -   \- A concise release cycle typically results in less code to merge, reducing integration time. Consider slight reductions in scope, counterbalanced by increased release frequency.

    -   \- Engage Product Managers (PMs) in discussions, as changes may affect roadmaps and delivery timelines and may require restructuring features.

    -   10\. \*\*Iterative Improvement\*\*:

    -   \- Continually refine the process by integrating more tests and releasing more frequently.

    -   \- The goal is a streamlined process with minimized manual interventions or deviations.

### Branching Strategies for Teams

#### Streamlining Branching for CI/CD

-   Some teams may be already entrenched with the branch pattern. Migrating to CI/CD is a process, and so identifying and making the existing process more efficient *to facilitate* continuous integration and deployment starts with having an effective branching strategy to avoid big-bang integrations.

-   It's good to have a branching strategy such that stale or out of date branches can be identified, and optionally deleted. This is because it is important to keep track of potentially non-integrated work. Not all branches must be merged into master. In fact, in some strategies, some branches may exist separated from main indefinitely, because the branch refers to a different copy or version of the code that has to be supported. Make sure to map branches to the business context, not to an artificial software context. Branches are an implementation of business needs and requirements.

#### Branching Types and Usage [[P37.pdf (hillside.net)]{.underline}](https://hillside.net/plop/plop98/final_submissions/P37.pdf)

-   Changing your branching process overnight (i.e., to a trunk-based strategy) is unlikely to be super simple. Therefore, first, it's better to get an understanding of how the team currently branches. Make sure that you are not following any anti-patterns, and start to label how you are branching. This can provide more context on how to proceed when you do adopt either a trunk-based strategy or a GitHub/Git Flow strategy, depending on if you are supporting legacy software.

-   Branching will bring many scenarios to mind as to when it is applicable. To make sure that branching is sustainable in the long term, branch structuring techniques can help prevent long-term branching issues. For example, when working on a task, one would want stability to make sure that they can test their own changes. The code might not be production ready, and so must exist outside of the main branch.

    -   Long-running branches are normally considered to be an anti-pattern for CI/CD. This is because long-running branches, such as feature branches, are associated with withholding integration. Since continuous integration is about continuously integrating, this partially defeats the purpose of continuous integration. Most applications are evergreen, which means that there isn't a fixed release number, changes are continually released to users (think about the last time that you saw a version number for Facebook for example.) However, there are many situations where long-running branches are necessary, and one can still practice continuous integration.

    -   For example, consider an application that has multiple versions. Each version must exist independently, and can have fixes backported to it. The branches would never re-integrate with the main branch, but the main branch must integrate into it.

    -   It's important to give branches a consistent naming scheme so that they are organized and easily identifiable. Software like Azure DevOps will automatically categorize branches named like directories (e.g., "alexyorke/test") as a folder "alexyorke" with the branch "test" inside of it. This can make sure that you don't accidentally take someone else's branch by accident, and can also allow you to delete old branches and keep track of the open branches you have. This also helps with branch lifecycle management.

-   Basic Branching

    -   Trunk-Based Development

    -   Basic Branching

    -   Single Branch Development

    -   Simple Branching

-   Branching with Parallel Development

    -   Feature Branching

    -   Release Branching

    -   Hotfix Branching

    -   Task Branching

-   Advanced Branching

    -   Streams

    -   Variants

    -   Component Branching

    -   Pipeline Branching

-   Distributed Development

    -   Distributed Development

    -   Merging Third-Party Code

    -   Inside/Outside Lines

-   Miscellaneous

    -   Mainline Development

    -   Branch by Abstraction

    -   Reverse Integration

-   Mainline

    -   Summary: A single branch that serves as the main development line for the project. Developers commit their changes directly to this branch.

-   Feature Branch

    -   Summary: A branch created for the development of a specific feature or set of related features. Changes are made on this branch and then merged back into the mainline once the feature is complete.

-   Release Branch

    -   Summary: A branch created to prepare for a new release of the software. Bug fixes and other changes specific to the release are made on this branch. Once the release is complete, the branch is merged back into the mainline.

-   Maintenance Branch

    -   Summary: A branch created to provide ongoing maintenance for a particular release of the software. Bug fixes and other changes are made on this branch, and then merged back into the release branch.

-   Experimental Branch

    -   Summary: A branch used for experimentation with new ideas or technologies. Changes made on this branch are not intended for release and may not be merged back into the mainline.

-   Long-Running Branch

    -   Summary: A branch that exists for an extended period of time and is used for ongoing development work. Changes made on this branch may be periodically merged back into the mainline.

#### Task Branching and Long-Lived Branches

-   Branching that is most commonly used is task branching. When working on a task, a developer creates a branch from main or master, pushes work to it, and then creates a PR. However, branches can be longer-lived, for example, if supporting old software, developing a very complex feature, or testing something out.

-   Normally, long-lived branches are discouraged in CI/CD because the goal is to integrate often. One should strive for integrating as often as possible, and reach for branches when integration work would become messy. This could be because of a legacy code base, where significant refactoring to make feature flags possible might not be possible or economical.

-   Branches require being merged or deployed in order for other users to use the features and code deployed to those branches. This creates a bottleneck, because merging takes time, and creating another deployment from a branch that is not continually synchronized with the main branch can cause some functionality to be different from the main branch.

#### Branching anti-patterns

-   Figure 3 on [[Proceedings Template - WORD (microsoft.com)]{.underline}](https://www.microsoft.com/en-us/research/wp-content/uploads/2016/02/bird-fse-2012.pdf)

    -   It is important to not bring the old development ways to continuous integration. Check if you see any of these strategies in your codebase. They are not commonly associated with business requirements, and thus may indicate a misunderstanding of how branching works and could prohibit successful continuous integration. Here are some anti-patterns to look out for.

    -   "Merge Paranoia --- avoiding merging at all cost, usually because of a fear of the consequences.

    -   Merge Mania --- spending too much time merging code instead of developing it.

    -   Big Bang Merge --- deferring branch merging and attempting to merge all branches simultaneously.

    -   Never-Ending Merge --- continuous merging activity because there is always more to merge.

    -   Wrong-Way Merge --- merging into the wrong branch.

    -   Branch Mania --- creating too many branches.

    -   Cascading Branches --- branching but never merging back to the main line.

    -   Mysterious Branches --- branching for no apparent reason.

    -   Runaway Branches --- branching for single purpose evolves to multi-purpose branch for unrelated tasks.

    -   Volatile Branches --- branching with unstable files merged into other branches.

    -   Development Freeze --- stopping all development activities while branching and merging.

    -   Integration Wall --- using branches to divide the development team members, instead of dividing work.

    -   Spaghetti Branching --- integrating changes between unrelated branches."

```{=html}
<!-- -->
```
-   Potentially unresolved problems from "On the journey to continuous deployment: Technical and social challenges along the way"

    -   "Seamless upgrades -- complications in implementation of seamless upgrades due to resource limitations, zero downtime deployment and customer data preservation"

    -   "Changing database schemas -- minor changes in code create unplanned changes in database schema"

    -   "Product Marketing -- marketing CD products requires marketing a versionless product, which requires alternative marketing strategies" highlight ongoing improvements

    -   Can agility be related to mole crabs?

-   What causes migrations to fail?

    -   Lack of goals or what it means to be migrated to CI/CD. For example, doing a generic cloud migration, but not identifying which applications or services have to be migrated, or the scope of the migration. This means that it is unclear if the benefits of working in the cloud are materialized because the migration is continuously ongoing.

    -   Lack of understanding on what to do next and priorities. When performing the migration, one first needs to get a general sense of the scope. It does not have to be detailed, for example, one does not need to count the number of worms in the soil prior to building a house, but they should check whether the foundation is solid. What is the critical path or critical work that needs to be done to meet the goal? Prioritize that work.

    -   There is a bit of overhead when using CI/CD, i.e., the builds are done every PR instead of all at once during an integration cycle. This overhead is designed to be automated to be fast, however, it cannot be zero. The tradeoff is a project or application that can be continually built and is in a known-good state. This may or may not be needed for applications that require very flexible and fast changes. It might be wasteful for applications that have a high regulatory overhead, as integrations may be very involved and so doing so multiple times might be difficult.

### Anti-patterns

#### "Do not ignore nor hide build failures"

-   ChatGPT summary of paper explanation: "When working with the CI pipeline, developers must prioritize addressing build failures and warnings instead of hiding or ignoring them. Disabling failing tests or quality checks without resolving underlying issues can lead to decreased software quality. It\'s crucial to avoid arbitrarily skipping pipeline steps and to fix build failures immediately, while also paying attention to issue notifications. This will ensure a higher-quality and more reliable software product."

-   The CI/CD is providing a service, that is, instilling confidence in the build artifacts. If the output is ignored, then it is no longer providing much value and the business cannot release when it wants to, because the build artifacts lack confidence.

-   My thing is, it is about risk management. Does it make sense to stop development to fix the test, or, can the test (usually an automated demonstration) be ok if someone manually verified the functionality?

#### Inappropriate build environment clean-up strategy (BP1)

-   "Build Process Organization. This category, the one with the largest number of bad smells (29), features CI bad smells related to a poor configuration of the whole CI pipeline, as detailed in Table 6. Some of such bad smells are related to the CI environment's initialization. Specifically, inappropriate clean-up strategies (BP1) could have been chosen. This, on the one hand (aggressive clean-up), may unnecessarily slow-down the build, and, on the other hand (lack of clean-up where needed), would make the build less effective to reveal problems"

-   Lots of issues. Spending lots and lots of time deleting a large folder with thousands of files at the end of a build, even if the runner isn't shared and will be erased anyway. Or, creating lots of garbage and not cleaning up and then running out of space.

```{=html}
<!-- -->
```
-   Challenges in Implementing CI/CD

#### Anti-patterns

-   Failure notif. only sent to teams that explicitly subscribed (BP22)

    -   Some teams may not care about your CI/CD pipeline.

-   Only the last commit is built, aborting obsolete and queued builds (BP6)

    -   If a commit is pushed to a branch with a CI/CD pipeline, it makes sense to cancel the previous build.

-   Independent build jobs are not executed in parallel (BP5)

    -   Some build jobs cannot be parallelized.

-   Environment variables are not used at all (BM3)

    -   Some applications do not require environment variables.

-   Build configurations are cloned in different environments (BM4)

    -   If the clones are designed to be independent, then it makes sense to duplicate them.

-   Wide and incohesive jobs are used (BP3)

-   Tasks are not properly distributed among different build stages (BP9)

-   Pipeline related resources are not versioned (R10)

    -   \'"negatively impacts the reproducibility of the overall build process"

    -   For example, say there is a package.json file that builds a node app. When building it, it may or may not be fetching the same versions of the software because the version ranges are flexible. This means that it is possible that the software built locally does not match the software deployed to users, since the CI/CD would also build the software.

    -   This also impacts the ability to test the program, because the software on CI/CD will be different than what is locally tested.

    -   It is also possible that new versions of the packages could cause breakages, even if no code changes are made. This could make finding bugs very difficult.

    -   Difficult for team members to collaborate because each build of the application is unique.

    -   Software that constantly changes can't be cached easily. For example, a cache key can be a package-lock.json file, but if it is a package.json file then it may suddenly change if the cache is evicted (and has to do an npm install.)

    -   Difficult to determine if something has security vulnerabilities, as the software keeps changing. This means that all of a sudden your application may be vulnerable to something in an unrelated code push as the dependencies are constantly upgraded.

    -   Trying to rebuild your source code from an earlier build will be difficult, because the dependencies aren't fixed, and could have installed anything at that point in time. There is a fix for this (using the --since flag for npm.)

    -   Counterpoints:

        1.  Requires that one remembers to commit lockfiles

        2.  Does not lock global tooling to specific versions

        3.  Build can break if legacy version vanishes, and fixed versions never receive security updates (tradeoff between stability and features), also, semver is just a social contract

```{=html}
<!-- -->
```
-   People who normally do not communicate often will be communicating much more, potentially exacerbating communication difficulties

-   [[Adopting Continuous Integration -- A Case Study (aalto.fi)]{.underline}](https://aaltodoc.aalto.fi/bitstream/handle/123456789/17798/master_Hukkanen_Lauri_2015.pdf?sequence=1)

-   [[IEEE Xplore Full-Text PDF:]{.underline}](https://ieeexplore.ieee.org/stamp/stamp.jsp?arnumber=7884954)

-   Summary of [[http://ieeexplore.ieee.org/document/7884954/]{.underline}](http://ieeexplore.ieee.org/document/7884954/) (individual sections)

    -   Lack of awareness and transparency (chp 1)

        -   "Continuous delivery process should be designed in a way that the status of a project, number of errors, the quality of features, and the time when features are finished are visible and transparent for all team members" which causes increased merge conflicts. Fix would be to increase transparency and what people are working on.

-   "Ch2. Coordination and collaboration challenges"

    -   Closer connection between operations team. Theoretically, this could strain the relationship because of higher pressure and more frequent interactions, bringing any personality conflict to light immediately.

    -   More collaboration and communication between teams needed.

    -   "Automated testing in the continuous delivery pipeline: A case study of an online company" mentions that it is also the developer's responsibility to keep build green and also ensure management buy-in

    -   More about making sure everyone is aligned on what needs to be done

    -   "Stakeholder perceptions of the adoption of continuous integration-A case study" says "Thus, the challenge of the adoption is not to convert people to believe in CI, but instead to find a common view of the adoption path towards CI. As in our case, this proved to be a difficult task because of the global distribution of the organization." Criticism was against how adoption was taking place, not necessarily against CI/CD itself.

    -   "Towards DevOps in the Embedded Systems Domain: Why is It so Hard?" personality conflicts with new team members (plus more frequent interactions?)

        -   [[250024.pdf (chalmers.se)]{.underline}](https://publications.lib.chalmers.se/records/fulltext/250024/250024.pdf)

-   "Ch3. Cost"

    -   "With increased productivity it is likely that additional hardware will be required. Be cautious in applying new hardware and understand that it must be supported and maintained. " from "Hitting the wall: What to do when high performing scrum teams overwhelm operations and infrastructure"

    -   Many resources from customers such as having customers have to change their UI flow if they're completing a task, interrupting their tasks for downtime, management keeping track of frequent changes, reporting bugs, etc. "Transitioning towards continuous delivery in the B2B domain: A case study"

    -   Lots and lots of training costs

    -   "Automated testing in the continuous delivery pipeline: A case study of an online company" has general solutions tips

    -   "Automated testing in the continuous delivery pipeline: A case study of an online company" maintenance costs high (e.g., testing and maintaining pipeline), devs might not feel responsible for fixing QA tests that break

-   "Ch4. Lack of experience and skill"

    -   Lots of training required

-   "Ch5. More pressure and workload for team members"

    -   "Stakeholder perceptions of the adoption of continuous integration-A case study" says tight release pressure supersedes CI adoption and time has to be taken to investigate test failures, since they impact the continuous release (which could take up to 30min or more)

-   "Ch6. Lack of suitable tools and technologies"

    -   "Challenges when adopting continuous integration: A case study" lack of bigger picture when approving PRs, integration queue (many devs working at the same time), very slow feedback loop for tests, unstable tests (flaky tests), not enough automatic tests (too many manual tests), unclear when to test code when it is introduced/hard to keep track of newly untested code, low quality due to high velocity of code changes and frequent integration

    -   "Achieving reliable high-frequency releases in cloud environments" baked vs. unbaked vm upgrade times (will have to look at results for which is better in certain situations)

    -   "Security of public continuous integration services" downloading external content is not good, could contain symbolic links that resolve to other files on system, pre-build tasks can erase or modify files, external repos not recommended (as they can change)

    -   "DevOps: A definition and perceived adoption impediments" monolithic architecture (hard to rapidly deploy parts of system), dev environment slightly different from production (can't accurately validate changes)

-   "Ch7. General resistance to change"

    -   "Challenges when adopting continuous integration: A case study" unclear what benefits there are to increasing delivery cadence, difficult to change old habits, exposing work early when it is not finished means there is not a usual time for polishing

    -   "Hitting the target: Practices for moving toward innovation experiment systems" table 3 has good general information, not sure how it relates to objections to change though

-   "Ch8. Scepticism and distrust on continuous practices"

    -   "Transforming a six month release cycle to continuous flow" good general/solutions tips, not sure what issues release team had with concurrent releases (as it is possible to identify which release it is in the logs.)

    -   "The highways and country roads to continuous deployment" lack of automation testing eroded trust and developer's reputation on if the release will be successful

    -   "Stakeholder perceptions of the adoption of continuous integration-A case study" unstable tests and lack of a consistent testing environment makes it difficult to trust results. Additionally, external components that are not version controlled had to be re-implemented because it stalled the pipeline weekly as it had to be manually upgraded

-   "Ch9. Difficulty to change established organizational polices and cultures"

    -   Bureaucracy

    -   "Transitioning towards continuous delivery in the B2B domain: A case study" large companies just like having long-lived feature branches because that's what they have been using

-   "Ch10. Distributed organization"

    -   "Hitting the target: Practices for moving toward innovation experiment systems" difficulty aligning distributed teams

    -   "Hitting the wall: What to do when high performing scrum teams overwhelm operations and infrastructure" integration issues found too late after each team got their own build server

    -   "Stakeholder perceptions of the adoption of continuous integration-A case study" says "Global distribution of teams causes problems, if some competencies are separated to a single site. In the studied case, the CI competencies and operations organization were isolated from other sites and this was seen to cause problems" and also contains potential fixes such as "First, understand that the product architecture has a significant effect on the adoption. However, do not let architectural problems keep you from implementing continuous integration. You may adjust the architecture by changing technologies or components if needed. Second, give enough time for your team members to overcome the initial learning phase. You have to lower the priority of new features during the adoption. Third, invest in the communication between different sites and avoid centralizing different competencies to certain sites. Understand the value of face-to-face communication and local support personnel when adopting CI."

    -   "Stakeholder perceptions of the adoption of continuous integration-A case study" says CI mindset not adopted by other teams, suggests looking at HP InkJet study on how to adopt mindset

    -   "Practical Approach to Large-Scale Agile Development, A: How HP Transformed LaserJet FutureSmart Firmware (Agile Software Development Series)" L0 to L4 testing with increasing more testing for firmware. This is so that developers are able to frequently integrate by checking for common issues (that can break the build) quickly, however, not running everything at once (because that would be too long and defeat the point of continuous integration.) I bought this book, may have to look through it more.

-   "Ch11. Lack of proper test strategy"

    -   "The highways and country roads to continuous deployment" says manual testing and exploratory testing still a big component of testing. Tests such as performance and security were not being run after every change, due to specialized hardware and increased resource requirements. Sometimes, exploratory testing can find issues that automated tests could not.

    -   "Challenges when adopting continuous integration: A case study" says too many required manual tests make CI difficult; suggests hardware-folks need to run more manual tests than application developers.

    -   "Hitting the target: Practices for moving toward innovation experiment systems" significant effort required to create test cases

    -   "Factors impacting rapid releases: An industrial case study" 86% of time was dedicated to testing and suggested using more automation testing to reduce lead time.

    -   "Transitioning towards continuous delivery in the B2B domain: A case study" some customers require that they do the acceptance testing, customers may be overwhelmed by the amount of testing that needs to be done

    -   "Stakeholder perceptions of the adoption of continuous integration-A case study" more frequent releases meant higher pressure on QA teams to do manual testing more frequently, automation tests were skipped due to higher frequency and more features being delivered. Solutions suggested are: " Change the Architecture, Proper Testing Environments, Testing Strategy, More, Frequent Smaller Releases,"

    -   "Hitting the target: Practices for moving toward innovation experiment systems" says lack of TDD.

        -   Solutions:

        -   \"Incorporate supply chain (component and technology suppliers) in the development cycle.\"

        -   \"Provide modular architecture that can be integrated and tested continuously.\"

        -   \"Adopt test-driven development and daily build practices.\"

        -   \"Integrate validation and verification (V&V) in cross-functional/feature teams.\"

-   "Ch12. Poor test quality"

    -   "The highways and country roads to continuous deployment" static test fixtures difficult due to changing data. Also, 60k tests take a long time to run.

    -   "Challenges when adopting continuous integration: A case study" tests are likely to break or may not reflect what should be tested.

    -   Insatiable tests, low test coverage, low quality test data, long running tests, test dependencies

-   "Ch13. Merging conflicts"

    -   "Backtracking incremental continuous integration" says that if a dependency can't be built against the current version, then use a previous version of dependency (this trades up-to-dateness with feedback) and they created a custom tool to do that.

    -   "Technical dependency challenges in large-scale agile software development" independent teams work on independent projects, and then discover that merging them together last minute causes integration errors

    -   "Factors impacting rapid releases: An industrial case study" developers spend 6% of the time doing merge conflict resolution, 6% of the time doing merge stabilization. Interfaces and method signatures much more likely to cause merge conflicts rather than code churn. Look at linked study on more info about merge conflicts. This study has more info on merge conflicts and how to prevent them: [[Proactive Detection of Collaboration Conflicts (psu.edu)]{.underline}](https://citeseerx.ist.psu.edu/document?repid=rep1&type=pdf&doi=005fbcd6a7b5261ee4d679be48808cf1ecca3909)

    -   [[Program slicing - Wikipedia]{.underline}](https://en.wikipedia.org/wiki/Program_slicing) might be useful in general (logging, debugging, merge conflict resolution)

    -   "Technical dependency challenges in large-scale agile software development" reduce number of team members working on same code, increase knowledge sharing to reduce merge conflicts

    -   "Lack of understanding of changed components"

    -   "Stakeholder perceptions of the adoption of continuous integration-A case study" says "Difficult Components: The product architecture contained third-party components, which were causing trouble in the CI system. For example, one of the systems could not be updated automatically and the configuration of the system could not be version controlled. This meant that the system needed to be updated to the CI system manually during a certain time weekly. The components also caused delays in automated tests, so the tests needed to either wait for long periods of time, or fail from time to time."

    -   [[978-3-642-28872-2_23-libre.pdf (d1wqtxts1xzle7.cloudfront.net)]{.underline}](https://d1wqtxts1xzle7.cloudfront.net/72493109/978-3-642-28872-2_23-libre.pdf?1634270750=&response-content-disposition=inline%3B+filename%3DMaking_Software_Integration_Really_Conti.pdf&Expires=1675751016&Signature=IwQuc3TyqpoRO1dc16lTT1WxxYIII9W1SsNNZh2t~H1nUvctF9XXB3nU3QC4HxbzsbOToyvoI4EUlJ9biycCFsri74wyv9MEW3CDNwXXk5nRMDoNA5dYxDwvPTjnidMri6R9B5ko1q9Vx7KmEU9If3Q4z7l7NWc-0a95IWRDlaeEMenGj4n99F4uBUn32rRC37bDTptXMRCsLxAai~CJy2hI-H1mjt4c3nEG2STh-z9DhTxI6bmcchdByBPitP2jj7tC2UXO4Y-GvSjY8GLRfaBILTYgLg14ExfKlQr0N7mxAd9hlpUgvmU23tlK4nPr~DCMwuBx8gM26dmxY1kdzg__&Key-Pair-Id=APKAJLOHF5GGSLRBV4ZA) has good things about issues with merging (page 345):

        -   Awareness solutions based on reporting changes made by co-workers in files, types, and program elements to detect conflicts early

        -   Overloading developers with irrelevant notifications and requiring investigation to determine relevance

        -   Difficulty in determining relevance due to complex semantic dependencies between program elements

        -   Steals time from programming

        -   Some solutions report direct conflicts even when changes are independent

        -   Structure-based solutions don\'t have this shortcoming

        -   Others go beyond direct conflicts and notify about concurrent changes by the developer and co-worker connected by semantic dependencies

        -   Developers still have to investigate notifications to identify real conflicts.

-   "Ch14. Dependencies in design and code"

    -   Architectures are highly coupled, consider pulling at seams to separate infrastructure

    -   Not really done

-   "Ch15. Database schemas changes"

    -   "On the journey to continuous deployment: Technical and social challenges along the way" says that unexpected changes to database schemas make it difficult to adopt CD. Solution is unsatisfactory.

    -   "Continuous deployment at Facebook and OANDA" says "However, OANDA's database schema changes always were always ad hoc and full of fear. OANDA never spent the time to streamline its database schema changes which resulted in changes that added tables and columns resulting in a superset of what was needed over time. Database schema changes have been shown to be possible with a concerted effort." does not list solutions

    -   Chapter 12 from [[0321670272.pdf (cloudflare-ipfs.com)]{.underline}](https://cloudflare-ipfs.com/ipfs/bafykbzacebjoo2zj453jym26q5c4sdbctgw4bmtzucu4is3qlcb7u45h5etis?filename=%28Addison-Wesley%20Signature%20Series%20Fowler%29%20Jez%20Humble%2C%20David%20Farley%20-%20Continuous%20Delivery_%20Reliable%20Software%20Releases%20through%20Build%2C%20Test%2C%20and%20Deployment%20Automation%20-Addison-Wesley%20Professional%20%282010%29.pdf) looks very useful for mitigating database issues. "Liquibase" might be able to automate that.

-   "Ch16. Team dependencies"

    -   Skip for now

-   "Ch17. Customer environment"

    -   Skip for now

-   "Ch18. Dependencies with hardware and other (legacy) applications"

    -   Skip for now

-   "Ch19. Customer preference"

    -   Skip for now

-   "Ch20. Domain constraints"

    -   Skip for now

-   Team Awareness and Communication

    -   Lack of awareness and transparency

    -   Coordination and collaboration challenges

    -   Go into how to record metrics

-   Lack of investment

    -   Cost

        -   CI/CD is the gatekeeper for the entire project, but does not directly provide business value

        -   Go into cost-saving chapter

    -   Lack of experience and skill

        -   Learn Bash and shell scripting

        -   Bash scripts may be confusing to developers who work in procedural languages with exceptions. Normally, when a line fails, the program will abort. Bash, however, continues to run even if a line fails. This can make comparing commands and logs difficult, and introduce untested edge cases.

        -   As developers may not be familiar with the tools available, they may run the scripts on the CI/CD server to test them. This approach works, but it is very slow and frustrates developers.

    -   More pressure and workload for team members

        -   Slow feedback loop

            1.  Recursive loop because CI/CD not seen as important thus little investments are added to it

            2.  Link to chapter on testing

        -   Avoiding touching scripts unless necessary

    -   Lack of suitable tools and technologies

        -   Lack of remote debugging tools

            1.  Go into chapter about remote debugging tools

        -   Google and Stack Overflow answers are nuanced to the specific OS, version, and script requirements

        -   Before running these commands, check the answer\'s .bashrc file for any additional packages or command aliases

-   Change resistance

    -   General resistance to change

    -   Skepticism and distrust on continuous integration practices

-   Organizational processes, structure and policies

    -   Establish metrics and quick wins (deployments must make a measurable improvement to bottom line in terms of costs, or can be a % difference in release time for example) and how to measure success

-   Difficulty to change established organizational policies and structures

    -   Distributed organization

-   Testing

    -   Lack of a proper test strategy

    -   Poor test quality

-   Merging conflicts

    -   Link to chapter on merge conflicts and branching strategies

    -   Linters could run inside of the pipeline if the aim is to reduce merge conflicts

-   Lack of suitable architecture

    -   Dependencies in design and code

        -   Link to dependency management chapter

    -   Database schemas and changes

-   Team dependencies

-   Customer challenges

    -   Customer environment

    -   Dependencies with hardware and other legacy applications

        -   Emulation in docker and startup scripts

        -   Try to rewrite the script if possible (if it's simple) or take source code/decompile it

    -   Customer preference

-   Domain constraints

#### Caveats

-   \*\*1. Challenges in Evaluating CI/CD Effectiveness\*\*

-   \- CI/CD systems can create a bias towards short-term objectives, prioritizing speed over more comprehensive long-term goals. This focus on rapid delivery can sometimes overshadow other important objectives.

-   \- Trust needs to be established in the build system and its monitoring mechanisms. The lack of proper monitoring and alerting may allow undetected issues to persist. This can lead to product quality degradation over time.

-   \- CI/CD\'s continuous delivery model can compromise certain traditional practices, like collective manual testing sessions or build blocks. These practices, while slowing down the process, allow for a more thoughtful consideration of the application and its requirements.

-   \*\*2. Automation Pitfalls\*\*

-   \- Over-reliance on automation and code coverage as a measure of test coverage can lead to undetected defects. Automation can\'t capture subtle usability issues or make judgments on test validity, potentially creating a false sense of confidence in software quality.

-   \- Automated tests are limited by their programming. They verify outputs based on predefined expectations and can\'t necessarily identify all bugs or issues that might occur in production.

-   \- The human aspect of testing, including exploratory testing and human judgment, is essential and cannot be fully automated. Too much reliance on automation can result in an overspecified and rigid test setup, making the system resistant to change and potentially neglecting user experience.

-   \*\*3. Impact on Testing and Quality Assurance\*\*

-   

-   \- The shift to a continuous delivery model can fundamentally change the role and importance of testing in the development process. Traditional \'big bang\' releases encourage a thorough, collective testing effort. With CI/CD, testing can be seen as a bottleneck, leading to potential neglect.

-   \- Test coverage metrics can be misleading. While a \"green\" pipeline can indicate that everything is functioning as intended, the lack of test cases for uncovered code can lead to slow degradation in software quality.

-   \- CI/CD\'s focus on short-term goals, such as regular software releases, may undermine long-term quality assurance goals. The accumulation of unaddressed bugs and quality issues over time can be a significant challenge.

-   \- CI/CD makes it difficult to assess gradual degradation in software quality. This is due to the lack of heightened awareness around potential bugs and issues, which is commonly seen with major \'big bang\' releases.

#### Common adoption challenges

-   People issues must be resolved first before migrating to CI/CD. No amount of technology can fix people issues, and CI/CD may exacerbate it as it requires more communication among stakeholders.

-   Transforming to CI/CD by just removing or reducing the testing stage from the software development process is not likely to yield good results. This is because it could have been possible that testing was part of customer experience, however, since it has disappeared, it means that the burden is now placed on the customers.

    1.  It is possible that there was too much or an unnecessary amount of testing before, therefore, it is unclear how much testing one would need.

    2.  Certain industries require a level of professionalism, and software development is a bit different. For example, you would not expect to receive a trial treatment in place of another one if you were to undergo surgery without warning. However, in software development, depending on the project, the risks are much lower (not rendering an image is not likely to cause life distress for example) therefore one would have different expectations.

-   When setting up automation, one must first think of activation energy required to set it up. After it is set up, a chain reaction occurs and the legacy processes are no longer needed. This reduces the total overall energy of the system, thus saving time (e.g., resources.) Since there is activation energy required, i.e., a bump, then it does require some investment to get it started.

-   Quality must occur at every step of the process because each stage has a different interpretation of quality, and it might not be possible to predict what that interpretation is at every stage, as those stages might be unknown.

-   How can software architecture and database design be optimized to support effective CI/CD?

-   What are some strategies for rearchitecting an application to make it easier to work with in a CI/CD pipeline?

-   Why are poor CI/CD implementations difficult to assess?

-   What are the limitations of CI/CD in terms of long-term abstract goals?

-   How do big changes in CI/CD impact testing and automation?

-   How do workflow items beyond the threshold of deviation impact scrutiny in CI/CD?

-   Can the concept of \"continuous\" be defined objectively, or is it subjective and dependent on individual attention spans and expectations?

-   What is the risk amortization over the long run and how is it calculated?

-   How can organizations avoid deception in claiming to follow CI/CD processes, and ensure accurate and concrete definition and implementation of the process?

-   What are some best practices for automated testing to ensure high software quality in a CI/CD pipeline?

#### Exceptions

-   There are some exceptions, such as emergency deployments that outweigh the risk of not running tests in the pipeline.

-   Emergency deployments are when the risk of not running tests is less than the risk of a current failure that impacts many customers. This failure could have real-world financial implications, and so minimizing downtime is of utmost importance. This has to be weighed against the fact that the tests will not be run, and so one has to be very careful about which changes are made. Sometimes, a rollback is performed (i.e., to the last good known state.)

```{=html}
<!-- -->
```
-   [[A DevOps a Day Keeps the Auditors Away (and Helps Organizations Stay in Compliance with Federal Regulations such as Sarbanes-Oxley) (cmu.edu)]{.underline}](https://insights.sei.cmu.edu/blog/a-devops-a-day-keeps-the-auditors-away-and-helps-organizations-stay-in-compliance-with-federal-regulations-such-as-sarbanes-oxley/)

-   Migration might be complex due to different stakeholder requirements and frequency of receiving information. For example, say if there is a stakeholder who wants release notes, and the release occurs every six months. If the release is changed to once per day or once per week, the stakeholder will be receiving much more information, and the paperwork necessary to generate those release notes might be too much overhead. Therefore, the stakeholder should re-assess if they still want that level of information, or if the reports can be automated.

    -   Also consider administrative paperwork required for each release. If releases are occurring more often, then the paperwork required to release them might be more complex and time-consuming. This is because it is occurring more often, and may have a fixed overhead. A solution could be to automate the paperwork, or to find the reason as to why the paperwork is required and switch to a different model.

-   No news is not good news: monitoring is a selective activity and the lack of monitoring or a lack of errors does not mean that there are no issues. There should be sufficient monitoring in place to notify people of errors.

-   Businesses may think that they have implemented CI/CD correctly because they are getting much higher code velocity, but do not invest in other parts such as maintenance because there would be no need to waste time on other things if things are going well.

-   Through CI/CD, smaller less drastic changes can maximize automated testing ROI, allowing more frequent releases. CI/CD should not be used as a device purely to reduce development costs.

    -   Characterizing DevOps by Hearing Multiple Voices. Proceedings of the 30th Brazilian Symposium on Software Engineering - SBES '16 \| 10.1145/2973839.2973845

-   Each person in an organization has a different amount of seniority, or capability if you will. It's important to give those with more capability more autonomy, as they are smart and will find more efficient solutions than you can. More junior employees benefit from more guidance, otherwise they may be over in Brazil looking for some penguins. Junior people aren't stupid, though. Everyone was a junior at some point, and nobody is born immediately knowing how to program a computer.

-   However, it is useful to divide them into steps, because some products may only be relevant for a single step or advertised for "continuous integration". Also, it is useful when hiring, and in general, terminology because there has to be a somewhat set of common terminology otherwise nobody knows what is being discussed. [[2103.05451.pdf (arxiv.org)]{.underline}](https://arxiv.org/pdf/2103.05451.pdf)

-   Given that there isn't a reliable foundation for the studies on CI, I will be proactively trying to find the ones that are most frequently mentioned, including taking a proactive approach by ensuring that the disadvantages are properly mitigated. It is possible that this approach is too cautious, so therefore you may have to assess your team to determine if the approach is advisable.

-   The ultimate goal is to make sure that your KPIs are met. This means that one has to, in some situations, take a reactive approach if they discover that the KPIs are not met in your business. CI adoption should be driven by a requirement for build artifacts to be available frequently and up to date with real-time development progress. If there are an unacceptable amount of situations where this is the case, then this book will have guidance on how to identify and mitigate some of those issues. It will also help you identify and recognize patterns that might contribute to a poor CI implementation.

-   The goal should be for developers to be working more efficiently. If this isn't the case, then there might be some issues with the implementation.

-   In terms of DORA metrics, one might deploy many times per day, or less than once every six months. If one is interested to adopt CI/CD, then there has to be a reason as to why the deployment frequency is too low. What is that tied to? Are customers upset about not getting new features? Is the business looking to experiment with new technologies? If deployment is important, then you can adopt CI/CD, but make sure that it is tied to something concrete and not just the fact that it is best practices. It is possible to adopt CI without adopting CD. Developers may gain a productivity boost by automating frequent interactions when committing to a central repository, such as building code. This means that customers are unlikely to notice any changes (i.e., say that they prefer the current development and deployment consistency), but allows developers to make sure that their changes are integrated frequently and allows the final release to be as unblocked as possible, with fewer chances of surprises.

-   Deployment frequency is not a means to an end. It has to be useful for something. If you deploy faster, who cares? What happens? What are you trying to achieve? In some cases it may or may not increase developer productivity, although it is difficult to determine this because the variety of studies do not have a consistent definition of CI/CD.

-   Just start writing more automated tests, or automate existing manual tests. Encourage developers to run the tests locally, and, if there is already a code review process, make sure that they tick a box saying that they've run the tests locally.

-   The second step, although heavy-duty, can occur by adding a manual breakpoint prior to a release (e.g., a manual release step.)

-   Make sure that developers have a sandbox where they can try out new things, or new pipelines. These should be separated from the production environment, but they can use other testing things. If security is a super large concern, then they can be on different subs.

-   Page 99 (starting at page 99) has very good info [[Software Configuration Management Patterns: Effective Teamwork, Practical Integration]{.underline}](https://cloudflare-ipfs.com/ipfs/bafykbzacedotsgprm3bmvy2abux5dzi7xwwzs2p3y6mvt3tjkfcwrlimw4uas?filename=Stephen%20P.%20Berczuk%2C%20Brad%20Appleton%2C%20Kyle%20Brown%20-%20Software%20Configuration%20Management%20Patterns_%20Effective%20Teamwork%2C%20Practical%20Integration-Addison-Wesley%20Professional%20%282003%29.pdf)

    -   Developers should be able to build the code locally in their own private workspace without errors. They should have access to all dependencies, components, frameworks, install scripts, libraries, etc. to be able to build the application.

    -   After this is the case, then this tooling, configuration scripts, etc. should be put in version control so that other development environments remain consistent, and other developers can automatically use the latest changes. Developer-specific-non-application settings, like the font-size of the IDE, should remain separate because they do not impact how the application is built.

    -   The act of committing it to a central repository (and others developers using it) will necessitate making the tools more generic, as other developers have to use them. For example, hard-coded paths with usernames may not work on others computers who do not have the same username.

-   Developers have a specific cadence when they work on tasks. If in the past the work was blocked frequently, it may have meant that they have had lots of time for learning or other activities, like documentation. However, if work is unblocked, and requires lots of communication, this means that their schedules might be different, and they might be available for working for more hours of the day. This means that developers now have the capacity to work more, but might be a bit challenging as their workload may have increased. So therefore you might want to make sure not to overload people.

-   Note: feature development during this time may be reduced. For example, changing the deployment schedule from one year to six months does not mean that one years' worth of work can be done in six months. Therefore, some features may have to be restructured to fit within the timeframe, if they are required to be released. Partial integration of features can still occur. You are still encouraged to deploy even if there are no customer facing changes, after all, the goal of continuous deployment is to get a deployment out.

-   Metaphorically sweating or working overtime means that you are working too hard. The current process must be changed or adapted to allow fast releases and may require that stakeholders make compromises.

-   Compare progress within the migration cycle to a previous state to see how far the organization has come along, the goal does not necessarily have to be met completely to make progress. Therefore, understand how long it takes to do a build, to deploy, to create a feature, etc. Make sure to ask multiple people and try to rely on hard-data, however, don't merge it into an average. Instead, incorporate diverse opinions into a range. This will be important later.

-   You might want to figure out who people talk to right now. CI/CD involves lots of communication, so if these relationships are brittle then they might cause conflicts.

-   Keep the end goal in mind. You should be shipping software faster. If you're following this CI/CD process and it's getting slower, or there are weird issues, then try to look into it. Don't discard the process all-together but do adapt it depending on your company. Some procedures are a bit heavy-duty, so try to do as much as you can. Try to make sure that your team is not liable for late software, and that things always build for example.

-   If you're working on a feature, it doesn't mean that the feature has to be delivered to customers incrementally. It's useful to do so, but you don't have to do it. It has to be in production, behind a feature flag though so that people can't use it. It has to be tested, and it has to work once the feature flags have been turned off. In a way, though, it might be beneficial to leave feature flags in production forever because if something happens with a feature, then you can turn it off. For example, a flaky third-party integration.

-   You can ship partial features, and then add stubs to other parts of features with a button saying "Notify me once this becomes available" which will allow prioritization on the backend.

-   In some cases, it might not make sense to announce your efforts to migrate to ci/cd. How much independence do you have in your organization to do things differently? For example, management doesn't really care how you write code, usually. It's more of the outputs. And so, do they care which software methodology you use? If you're adopting a new methodology to strive to better meet the business goals of delivering a better customer experience, then CI/CD can help with this. It's just part of being customer focused, and so announcing it as a brand new initiative, especially when there aren't too many people needed for it, might be unnecessary and might draw attention to something which is just everyday business practices. For example, announcing that you're going over to the watercooler is a bit odd, and people might want to investigate why this menial task is being announced, is there something going to happen? Is there a new water cooler? Is he going to say something interesting?

-   It doesn't have to be this big budget thing. It's just continuing as normal, except making things a bit more efficient. It doesn\'t have to be announced, it's just common practice. However, if you are blocked on other teams and do require a large initiative, then you should announce it, otherwise it might be confusing and too secretive.

-   It might not be necessary to announce it to everyone if it doesn't require approval. It's more about scope and who to involve and who to leave out of the discussion. Because managers have their own communication needs and don't need to know everything that's going on.

-   After the migration

    -   Assess dev experience after setting up pipelines

        -   Go through entire process from dev to prod

        -   Set up auxiliary tools, like SonarCloud and other service integrations

        -   Allow people to experiment with a cloned copy of the pipeline, provided that it does not publish artifacts or cause state changes. They can then have the freedom to explore and make it more efficient.

    -   Do a test deployment in a staging environment

    -   Set up reporting, alerting

    -   Employee training (and using up free credits)

        -   Running tests to check which ones are flaky

        -   Scheduled jobs

        -   Testing with future versions of dependencies

        -   Experimentation

    -   Measuring performance, bugs, success rate, developer productivity

    -   What happens to the old system? Is it archived or used as a backup?

    -   Who will be maintaining the system?

    -   Documentation

    -   Incident management

    -   Process for troubleshooting, monitoring, maintenance, documentation (in other sections)

-   Managing vendor lock-in

+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Category 3: CI/CD for Legacy Systems and Monolithic Applications                                                                                                                                                                                                                  |
|                                                                                                                                                                                                                                                                                   |
| Implementing CI/CD for legacy systems and monolithic applications can be challenging due to various reasons such as outdated technology, lack of modularity, and limited test coverage. Here are some specific issues that could occur, along with concrete solutions and advice. |
|                                                                                                                                                                                                                                                                                   |
| Issue: Limited modularity and tightly coupled components                                                                                                                                                                                                                          |
|                                                                                                                                                                                                                                                                                   |
| Legacy systems and monolithic applications often have tightly coupled components, making it difficult to deploy and test individual parts.                                                                                                                                        |
|                                                                                                                                                                                                                                                                                   |
| Solution/Advice:                                                                                                                                                                                                                                                                  |
|                                                                                                                                                                                                                                                                                   |
| Gradually refactor the monolithic application into smaller, more modular components.                                                                                                                                                                                              |
|                                                                                                                                                                                                                                                                                   |
| Apply the Strangler pattern to replace parts of the application with microservices over time.                                                                                                                                                                                     |
|                                                                                                                                                                                                                                                                                   |
| Issue: Inadequate test coverage                                                                                                                                                                                                                                                   |
|                                                                                                                                                                                                                                                                                   |
| Older systems might lack comprehensive test suites, increasing the risk of introducing new bugs during CI/CD implementation.                                                                                                                                                      |
|                                                                                                                                                                                                                                                                                   |
| Solution/Advice:                                                                                                                                                                                                                                                                  |
|                                                                                                                                                                                                                                                                                   |
| Gradually introduce and improve automated testing, prioritizing critical functionalities.                                                                                                                                                                                         |
|                                                                                                                                                                                                                                                                                   |
| Establish a test pyramid strategy that includes unit, integration, and end-to-end tests to ensure proper test coverage.                                                                                                                                                           |
|                                                                                                                                                                                                                                                                                   |
| Issue: Outdated technology and lack of support for modern CI/CD tools                                                                                                                                                                                                             |
|                                                                                                                                                                                                                                                                                   |
| Legacy systems may rely on outdated technology, making it difficult to integrate with modern CI/CD tools and practices.                                                                                                                                                           |
|                                                                                                                                                                                                                                                                                   |
| Solution/Advice:                                                                                                                                                                                                                                                                  |
|                                                                                                                                                                                                                                                                                   |
| Identify and replace outdated components or libraries with more modern alternatives that support CI/CD.                                                                                                                                                                           |
|                                                                                                                                                                                                                                                                                   |
| Use containerization, such as Docker, to package applications with dependencies, enabling easier integration with modern CI/CD tools.                                                                                                                                             |
|                                                                                                                                                                                                                                                                                   |
| Issue: Resistance to change and organizational challenges                                                                                                                                                                                                                         |
|                                                                                                                                                                                                                                                                                   |
| Introducing CI/CD in a legacy system environment can be met with resistance from team members accustomed to traditional processes.                                                                                                                                                |
|                                                                                                                                                                                                                                                                                   |
| Solution/Advice:                                                                                                                                                                                                                                                                  |
|                                                                                                                                                                                                                                                                                   |
| Communicate the benefits of CI/CD to stakeholders and team members.                                                                                                                                                                                                               |
|                                                                                                                                                                                                                                                                                   |
| Provide training and resources to help team members adapt to the new processes and tools.                                                                                                                                                                                         |
|                                                                                                                                                                                                                                                                                   |
| Issue: Complex and time-consuming build and deployment processes                                                                                                                                                                                                                  |
|                                                                                                                                                                                                                                                                                   |
| Monolithic applications often have lengthy build and deployment times, which can hinder the agility of CI/CD pipelines.                                                                                                                                                           |
|                                                                                                                                                                                                                                                                                   |
| Solution/Advice:                                                                                                                                                                                                                                                                  |
|                                                                                                                                                                                                                                                                                   |
| Optimize build and deployment processes by caching dependencies, parallelizing tasks, and using incremental builds.                                                                                                                                                               |
|                                                                                                                                                                                                                                                                                   |
| Utilize tools like build accelerators to speed up compilation times.                                                                                                                                                                                                              |
|                                                                                                                                                                                                                                                                                   |
| Issue: Difficulty in scaling and managing infrastructure                                                                                                                                                                                                                          |
|                                                                                                                                                                                                                                                                                   |
| Legacy systems may have infrastructure constraints, making it difficult to scale and manage resources efficiently.                                                                                                                                                                |
|                                                                                                                                                                                                                                                                                   |
| Solution/Advice:                                                                                                                                                                                                                                                                  |
|                                                                                                                                                                                                                                                                                   |
| Adopt Infrastructure as Code (IaC) principles to manage infrastructure in a more scalable and maintainable way.                                                                                                                                                                   |
|                                                                                                                                                                                                                                                                                   |
| Consider leveraging cloud-based solutions to offload resource-intensive tasks and enable auto-scaling.                                                                                                                                                                            |
+===================================================================================================================================================================================================================================================================================+
+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

-   At some point, there might be many pipelines with many different configurations

-   There is a lot of risk, as some might be out of date (due to old OSes), use an insecure configuration, lack security auditing, or might be wasting resources by using their own separate pool for everything (and thus have many machines idling.)

-   There should be cooperation between teams to diversify the cost centers

-   Look into workflow orchestration standards and standardization to make the pipelines easier to use and manage

-   Avoiding sprawl

    -   6867833-ci-cd-agility-and-controlling-pipeline-sprawl.mp3

    -   "Here are some potential action items based on the information provided:

        -   Identify common patterns and actions in your YAML configuration files.

        -   Abstract these patterns and actions into separate scripts.

        -   Create a \"pipelines library\" to store these scripts and make them easily reusable.

        -   Use the scripts in your YAML configuration files to reduce redundancy and improve maintainability.

        -   Consider implementing object-oriented programming principles to further improve the organization and reuse of code in your CI/CD pipelines."

-   Splitting up and consolidating pipelines

-   Pipeline library or pieces

-   Pipeline lifecycle management

    -   How to do brown outs on legacy pipelines

    -   Do something on run count (e.g., run count is zero, say that the pipeline is deprecated and fail, but then allow it to run the second and nth time after that if manually re-run) or randomize the failures

    -   Reduce the number of runners (to make it slower) and to save on costs gradually

    -   Continue to monitor usage (to make sure that stakeholders are actually slowly not using the pipeline)

    -   Set a target date for final decommissioning (when the pipeline will not be available) and its alternatives

    -   Backup the pipeline config (optional)

    -   Take inventory of all tokens/keys in the pipeline and revoke them once pipeline is decommissioned. Make sure that those subscriptions are canceled if applicable.

        -   Make sure that any dependent services are cleaned up if they are no longer used (e.g., environments or other servers)

    -   Notify stakeholders

    -   Slowly remove permissions from pipeline

    -   Disable pipeline (occasionally or all at once) and then re-enable if there it is needed in an emergency as a stop-gap prior to decommissioning

    -   How to automate this

-   Also for branch maintenance (deleting stale branches) because they could be accidentally re-merged

-   Token refreshing (although service connections are preferred)

-   Continuous improvement: avoiding anti-patterns in CI

    -   When I say continuous, one might think that one should divide tasks up so incredibly small that each commit is the absolute smallest it can be. This isn't useful because it prohibits code review, which means that changes cannot be validated for integration.

        -   Say I am committing one line of code per commit. "Let x = 2" and the next commit is "if x = 2, then do this." There is absolutely no context for the first commit and I cannot review it. By the time the second commit comes, I have to try to figure out the context and change code that is not part of this PR.

    -   Highly relevant (table 13) from "An empirical characterization of bad practices in continuous integration"

        -   Pipeline related resources are not versioned (R10)

        -   A build is succeeded when a task is failed or an error is thrown (BP16)

        -   Missing notification mechanism (BP23) and Issue notifications are ignored (C6)

        -   Build failures are not fixed immediately giving priority to other changes (C5)

        -   Build scripts are highly dependent upon the IDE (BM2)

        -   Testing is not fully automated (Q8)

        -   Production resources are used for testing purposes (Q7)

        -   Authentication data is hardcoded (in clear) under VCS (BP29)

        -   Build time for the "commit stage" overcomes the 10-minutes rule (BP27)

            -   Developers could have meetings, so this isn't a hard rule

        -   Missing rollback strategy (D3)

        -   Lack of testing in a production-like environment (Q1)

    -   Medium relevant

        -   Divergent branches (R7)

        -   Use of nightly builds (BP14)

        -   Poor build triggering strategy (BP11)

        -   Dependency management is not used (BP18)

            -   Many repos don't manage Ubuntu-based packages

        -   Missing artifacts' repository (D2)

        -   Developers and operators are kept as separate roles (C3)

        -   Developers do not have a complete control of the environment (C4)

            -   Corporate software governance

        -   Missing smoke test, set of tests to verify the testability of the build (BM7)

        -   Inappropriate build environment clean-up strategy (BP1)

        -   Feature branches are used instead of feature toggles (R6)

            -   Feature toggles can be used in production

            -   [[2007.05760.pdf (arxiv.org)]{.underline}](https://arxiv.org/pdf/2007.05760.pdf) feature toggles *might be better*

            -   [*[Exploring Differences and Commonalities between Feature Flags and Configuration Options (acm.org)]{.underline}*](https://dl.acm.org/doi/pdf/10.1145/3377813.3381366)

            -   Best practices for feature toggles, starting at page 14 [[1907.06157.pdf (arxiv.org)]{.underline}](https://arxiv.org/pdf/1907.06157.pdf)

#### Tips on how to integrate QA with development process

-   Say you'd like to have some QA testers. How do you incorporate them into the flow without blocking everything? You can have them test twice a week, and then deploy your code on PPE for them to test. In the meantime, you can continue to continuously integrate, and deploy to an identical ephemeral environment where the more complex tests can be run. It is not always possible to test everything in production because feature flagging every little thing becomes very tedious. Therefore, it is useful to have at least one pre-production environment (you don't need PPE.) You can do more comprehensive tests, like authentication tests, in PPE and just mock the data on the PRs. This is a type of staggered testing and is like the HP's case study.

-   You should be able to continue to allow a prod release even if there are some tests failing, but make sure to keep them very low and if possible you may have to perform them manually. This is because tests themselves have to be tested, and in order to do that, it requires human evaluation and judgment. If you test tests with tests, then what do you test the tests with? You should not let it get out of control, as this could harm software quality. This is because we have to test the tests, that is, if the tests are buggy, then it doesn't make sense to re-do the entire pipeline just to fix a single test. If there are many that are failing, that would represent a significant business risk.

-   The QA test pass should not prevent developers from committing or being able to test it, it's just that the QA testers have a stable environment where they can test. It shouldn't take more than a couple days to do the testing, and the testing should be very high-level and require human judgements and insights, like usability testing.

-   Get testers to work with developers early in the process, and get QA to write some automation tests as well to share the workload. Get developers to do "manual" testing on their changes as well, or potentially even a bug bash. If QA is involved with developers, then developers can tell them the scope of the change or components that are likely to be impacted, therefore, QA might do just a subset of the tests, which could speed things up. It depends on how much quality the customer wants and how fast the features should come out. You may have to revisit the architecture if bugs are constantly appearing, or evaluate how bugs are passing through the code review process. Note that this is likely to slow down the development process, so testing might no longer be a bottleneck but development might be. You can also do testing async, by creating feature flags and then sending that to production (where testing is done.) The issue is that more and more stuff will be released in the meantime, so QA testers will have to keep up. If the changes are small, then it's likely that the bugs will remain.

#### When is the migration done?

-   The question \"When is the migration done?\" reflects the Sorites Paradox, which examines the ambiguity of borderline cases in defining clear limits or thresholds. This uncertainty also applies to CI/CD migrations, where defining the completion of the migration process can be challenging due to its continuous nature.

-   Businesses require concrete goals to define success. However, these goals can be achieved incrementally rather than in entirety, which is particularly relevant in CI/CD migrations. Even when targets aren\'t fully met, they can still generate benefits, unlike absolute minimum performance goals that require complete achievement.

-   The benefits of more frequent releases and customer expectations vary and are unlikely to be fixed. It\'s based more on consensus than on absolute measurements. The role of consensus is crucial for alignment within an organization. But this consensus can sometimes lead to a misalignment when the actual practice deviates from the defined norm, for example, incorporating non-standard practices in the CI/CD process.

-   Despite the importance of consensus, there should still be a final goal or metric to measure the completion of the migration. This helps to provide a clear cutoff point for when the CI/CD implementation started and enables effective performance measurement. Without it, there may be continued creation of migration-related tasks, diverting resources from regular business activities.


