## General CI/CD Anti-patterns

### Naming conventions

- Avoid slashes, spaces, and other special characters (might interfere with scripts)

- Prefix with "dev-", "int-", or "prod-" depending on the env (also helps with regex)

### Avoid typos in pipeline steps

### Avoid incorrect pipeline step names (e.g., wrong versions) as this will impede debuggability

### Avoid pipeline steps with names that become truncated (and vice-versa, too abbreviated)

- From "An empirical characterization of bad practices in continuous integration"

#### Feature branches are used instead of feature toggles (R6)

- Feature toggles can be used in production

- [2007.05760.pdf (arxiv.org)](https://arxiv.org/pdf/2007.05760.pdf) feature toggles *might be better*

- [*[Exploring Differences and Commonalities between Feature Flags and Configuration Options (acm.org)]*](https://dl.acm.org/doi/pdf/10.1145/3377813.3381366)

- Best practices for feature toggles, starting at page 14 [1907.06157.pdf (arxiv.org)](https://arxiv.org/pdf/1907.06157.pdf)

- I don't agree with this as much, I think there's a lot of nuance and context needed here. This might go in the controversial patterns.

```{=html}
<!-- -->
```
- Less relevant (each pattern requires lots of context)

 - *Beginners may follow these code patterns blindly, but some require more information about the root cause of the smell to see if it applies to their project. The following code smells are heavily debated in the literature and may or may not apply to your project. Each section provides more context on when it might be a smell.*

#### A task is implemented using an unsuitable tool/plugin (I6)

#### Number of branches do not fit the project needs/characteristics (R4)

#### Generated artifacts are versioned, while they should not (R8)

#### Some pipeline's tasks are started manually (BP13)

- Manual QA testing is an exception.

### Poor build triggering strategy (BP11)

- A lot lot lot of people on GitHub have issues with this, unsure how to make the rule to trigger the build

#### Builds triggered too often

- For example, pushing to an unrelated branch and having a pipeline do a build but it doesn't make any sense, as the artifact is not required (or vice-versa.) Branch tags are difficult.

### A build is succeeded when a task is failed or an error is thrown (BP16)

- The way the build output is reported is also particularly important. First of all, respondents believe that ignoring the outcome of a task when determining the build status (BP16) defeats the primary purpose of CI. These kinds of smells may occur when, for example, static analysis tools produce high severity warnings without failing a build. While a previous study found that this practice is indeed adopted for tools that may produce a high number of false positives (Wedyan et al., 2009), one SO post remarked that ". . . if the build fails when a potential bug is introduced, the amount of time required to fix it is reduced.", and a different user in the same discussion highlighted that "If you want to use static analysis do it right, fix the problem when it occurs, don't let an error propagate further into the system."

- The entire purpose of CI/CD is to not allow integration issues to enter production. Having said that, there are exceptions to this rule, such as optional tests. However, if the build status is ignored, then there is no purpose for CI/CD, because it is performing work that is not of use.

- Counterpoints:

 - Not *all* warnings and issues should be failures, and it depends on how failures are reported. This can require human judgment. When should one report failures and when is something considered a failure? Write about this some more.

 - Consider gradually transitioning individual warnings to errors if the build still completes. This allows you to incrementally adopt CI/CD.

 - Always failing the build on minor things will not allow the build to be continuous, and can lower developer morale. There has to be a balance, however.

 - Deleting dead code (that is 100% covered), can cause test coverage to decrease, even though the code is not used. This is because other code might not be covered, reducing overall percentage covered. Failing the build in this situation doesn't make sense.

### Missing notification mechanism (BP23) and Issue notifications are ignored (C6)

- "A related bad smell judged as relevant is the lack of an explicit notification of the build outcome (BP23) to developers through emails or other channels. In other words, having the build status only reported in the CI dashboard is not particularly effective, because developers might not realize that a build has failed."

- If the build is intermittently failing, it could mean one of several things, such as flaky tests. Flaky tests indicate that the tests are bad, and might not be truly testing your application. Failed builds mean something went wrong, and re-running the build wastes time if the root cause is not addressed.

- Consider tailoring notification mechanism and priority.

- Ensures proactive issue resolutions.

- Counterpoints:

 - Notification fatigue can occur, meaning important notifications are missed.

### Build failures are not fixed immediately giving priority to other changes (C5)

- If a build failure occurs, for example, on a secondary pipeline (i.e., a merge to master, and not on the PR), then this means that the software is no longer continuously integrated because the artifacts cannot be deployed. These issues quickly build up, because each subsequent build also fails, so it is difficult to determine if unwanted or broken changes (such as code compilation errors) have entered the pipeline.

- If build failures are not found quickly, then tech debt can compound. This means that multiple failures can accumulate, making the root cause difficult to debug.

- Counterpoints:

### Transient failures

- Some build failures are transient, for example, npmjs.org is down. This means that the build failures cannot be fixed immediately because it depends on a third-party service. Halting development during this time would not make sense.

### Missing rollback strategy (D3)

- If there's an issue in production, one can rollback or roll-forward. Not being able to rollback quickly means not being able to properly manage risk. This could lead to production being down because an unintended change cannot be easily reversed.

- Counterpoint:

 - Rollbacks are always inherently risky, due to changes that cannot be rolled back, for example database changes. This means that the team should not consider rollbacks to be an option. Therefore, roll-forwards should be used to push state in one direction (and not back) due to issues with reverting state.

### Build time for the "commit stage" overcomes the 10-minutes rule (BP27)

- I don't really agree with this either. The 10 minute rule came from someone's personal experience working in a couple of teams and doesn't have empirical basis. Having said that, super long builds means that progress will slow.

- Counterpoint:

 - This one is based on a rule of thumb and does not have empirical evidence.


