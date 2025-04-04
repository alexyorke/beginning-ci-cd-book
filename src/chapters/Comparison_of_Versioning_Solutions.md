## **Comparison of Versioning Solutions** {#comparison-of-versioning-solutions .unnumbered}

---

Tool Description Versioning Scheme Automation Language/Framework Pros Cons

---

**GitVersion** Derives semantic version based on Git history, branches, and tags. Semantic Versioning Build-time .NET, CLI Flexible configuration options, supports complex branching strategies. Can be complex to configure, requires understanding of Git branching strategies.

**standard-version** Automates version bumps, changelogs, and Git tags based on Conventional Commits. Semantic Versioning Commit-time, Release JavaScript Easy to use, enforces consistent commit messages. Less flexible configuration, requires adherence to Conventional Commits.

**semantic-release** Fully automates releases, changelog generation, and publishing based on Conventional Commits. Semantic Versioning Continuous Deployment JavaScript Highly automated, ensures consistent releases. Requires strong commitment to Continuous Deployment, can be challenging to set up initially.

**Nerdbank.GitVersioning** Embeds version metadata directly in the code using an MSBuild task. Semantic Versioning Build-time .NET Lightweight, good for simple projects. Limited configuration options, less flexible than GitVersion.

**minver** Infers semantic version from Git tags, supporting pre-release versions. Semantic Versioning Build-time .NET Minimal configuration, easy to get started. Limited control over versioning logic.

**conventional-changelog** Generates changelogs from commit messages formatted according to Conventional Commits. N/A N/A JavaScript Useful for generating changelogs independently from versioning. Requires adherence to Conventional Commits.

**release-please** Automates release PR creation based on Conventional Commits and labels. Semantic Versioning GitHub Actions JavaScript Streamlines the release process, integrates well with GitHub. Relies on GitHub Actions, requires adherence to Conventional Commits.

**changesets** Manages version bumps and changelogs for monorepos, using a separate file for change descriptions. Semantic Versioning Release JavaScript Good for managing complex monorepos, allows for granular versioning decisions. Requires additional steps for managing changesets, can be more complex for smaller projects.

**release-it** General-purpose release automation tool that supports various versioning schemes and plugins. Customizable Release JavaScript Highly customizable, supports various workflows and integrations. Can require more configuration compared to simpler tools.

---

**Choosing the Right Tool:**

- **Complexity:** For simpler projects with basic branching strategies, **minver** or **Nerdbank.GitVersioning** might be sufficient.

- **Conventional Commits:** If you are committed to using Conventional Commits, **standard-version**, **semantic-release**, or **release-please** are good choices.

- **Continuous Deployment:** For fully automated releases, **semantic-release** is the optimal choice.

- **Monorepos:** **changesets** is designed for managing versioning in monorepos.

- **Flexibility:** **GitVersion** and **release-it** offer high levels of customization and flexibility.

/// Start of Selection
Consider your project's specific needs and your team's workflow to select the most appropriate versioning solution.

```yaml
name: Deployment

on:
  workflow_dispatch:
    inputs:
      releaseType:
        type: environment
        required: true

concurrency:
  group: ${{ github.workflow }}-${{ github.ref }}
  cancel-in-progress: false

jobs:
  create_release:
    permissions:
      id-token: write # This is required for requesting the JWT
      contents: write # This is required for actions/checkout
    runs-on: ubuntu-latest
    if: ${{ github.event.inputs.releaseType == 'production' }}
    outputs:
      release_id: ${{ steps.create_release.outputs.release_id }}

    steps:
      - name: Create Release
        id: create_release
        uses: actions/github-script@v6
        with:
          script: |
            const release = await github.rest.repos.createRelease({
              owner: context.repo.owner,
              repo: context.repo.repo,
              tag_name: `v${Date.now()}`, // This is an example tag format. Customize as needed.
              name: 'Production Release',
              body: 'New production release',
              draft: false,
              prerelease: false
            });
            return release.data.id;

  staging:
    needs: [create_release]
    runs-on: ubuntu-latest
    environment:
      name: staging
      url: https://github.com
    steps:
      - name: Check out repository
        uses: actions/checkout@v3

      - name: Deploy to Staging
        run: |
          echo "Pretending to deploy to staging environment"
          sleep 30

  production:
    needs: [staging]
    if: ${{ github.event.inputs.releaseType == 'production' }}
    runs-on: ubuntu-latest
    environment:
      name: production
      url: https://github.com
    steps:
      - name: Check out repository
        uses: actions/checkout@v3

      - name: Deploy to Production
        run: |
          echo "Deploying to production environment with release ID ${{ needs.create_release.outputs.release_id }}"
          sleep 30
```

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
