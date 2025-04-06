**1. The Basic Process & Workflow**

- So, how does this code review thing actually _work_ day-to-day? How do I even get my code reviewed in the first place?
- Is there a standard process? Like, does the code need to pass automated checks in the CI pipeline _before_ a human even looks at it? Should it?
- What happens _after_ the review? If someone finds issues, how do we handle uploading fixes for another look?
- I've heard about pull requests (PRs). Is that the main way reviews happen?
- What's the deal with merging? Does merging code mean it's immediately live in production, or is that separate? How does CI/CD handle that transition after a review approval?
- Sometimes PRs seem to get stuck waiting for review for ages. Is that normal? How are we supposed to handle that, especially if it blocks things? Can I ever just merge my own stuff if no one looks at it?
- Who typically does the reviewing? Is it seniors, peers, testers, or someone else?
- Do I need to be an expert in the programming language before I can even start reviewing someone else's code? How much do I really need to understand?

**2. Scope and Depth of Review**

- How much detail are reviewers expected to go into? Is there a standard or best practice for how deep the review should be?
- What are the _main things_ reviewers are usually looking for? Are there common mistakes or patterns they focus on?
- I'm confused about the _purpose_. Is code review mainly for finding bugs, or is it more about improving the code's structure and maintainability? Isn't finding bugs what automated tests in the CI pipeline are for?
- How nitpicky should a review be? Is it okay to comment on small things like variable names, or should we stick to bigger issues?
- What about code style? Should reviewers point out style guide violations, or should we rely entirely on automated linters run in the CI process?

**3. Handling Different Situations & Code Types**

- How do we handle reviewing really big changes, like large features or major refactoring? Breaking a big feature into multiple PRs sounds good, but doesn't that just lead to a final giant PR anyway? And how can anyone effectively review thousands of lines of refactoring?
- Should the review process be different for brand new projects versus established codebases?
- What about code that relies heavily on external libraries or frameworks the reviewer isn't familiar with? How can they review that effectively?
- Does the review process change for specific types of code, like security-sensitive code or infrastructure-as-code (Terraform, etc.)?
- What about generated code, like stuff from tools or AI assistants (Copilot)? Should that be reviewed, skipped, or reviewed differently?

**4. Tools and Automation**

- Are there specific tools people recommend for code review, especially for larger teams? Have you tried any specific ones?
- What about automated review tools like SonarQube? How do they fit in? Can they replace manual reviews, or are they just a supplement? (And are tools like SonarSource free?)
- Should linters and auto-formatters be run automatically as part of the CI pipeline or commit hooks to handle style stuff _before_ review?
- How do tools integrate? Can AI tools help review PRs directly in places like GitHub or Azure DevOps? Is that generally available?

**5. Team Culture, Communication & Disagreements**

- How do we handle disagreements during a review? What's the process if the author and reviewer can't agree – escalate to a lead?
- What if a reviewer gives feedback that seems wrong, especially if they're more senior? How do you push back respectfully?
- Sometimes the feedback isn't clear about _what_ needs changing or _why_. How can reviewers give more helpful feedback?
- How do you build a team culture where reviews feel safe and constructive ("psychological safety")?
- What if the author introduces a bug based on a reviewer's suggestion? Who's responsible then?
- Is pair programming a replacement for code review, or do they serve different purposes in the workflow?

**6. Testing and Quality**

- Should the reviewer actually check out the code branch and run it locally? Or even run tests?
- What happens if a PR is missing unit tests? Is that usually a blocker for review?
- How do we ensure the automated tests (unit, integration) run in CI actually reflect whether the code works correctly? Sometimes tests pass, but the feature seems broken manually.
