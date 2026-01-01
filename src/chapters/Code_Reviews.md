# Code Reviews in CI/CD

Code Review (in the context of CI/CD) is the systematic examination of source code changes by one or more individuals—other than the original author—before those changes are merged or deployed.

- Code review also provides the capability for other developers to find bugs and become more familiar with repository changes. This helps understand how integrations will fit together.

- Code review is a critical part of CI/CD because it acts as a gatekeeper to prevent buggy code from reaching production, providing opportunities for feedback on usability, security, and design.

- During code review, the reviewer(s) will look at the changes and verify correctness, making inline comments on specific lines of a pull request.

- Code review themes:

 - Knowledge transfer
 - Finding bugs
 - Design discussions
 - Verifying scope
 - Security feedback

- This process helps increase code quality and prevents bugs from reaching production. Sometimes a large volume of comments (nitpicks) can appear in the PR, which may be better handled with direct discussion or tooling (e.g., automated linters).

- Code review has additional softer advantages, such as building professional relationships and trust between teammates.

#### Why is code review important?

Key points from various resources:

- A simple bug can lead to significant losses in time and customers.
- Peer code review can catch issues early, reducing costs.
- It fosters collaboration during the coding phase.
- No feature addition is worth introducing severe bugs.
- Effective code review can be a competitive advantage.
- Concerns about time and negative social impacts can be mitigated with proper techniques and tools.

Time spent during review is crucial; it should be limited to ensure focus, and slowing down the review increases the number of defects detected. Traditional in-person reviews aren't always necessary; many defects can be found asynchronously via pre-meeting reading or electronic tools. Omission defects are among the most challenging to catch, so checklists can be helpful.

Omissions often refer to missing tests, missing error-handling, insufficient documentation, or incorrectly "skipped" logic paths. Checklists can help guide reviewers to consider these potential gaps.

The following is from an episode from the Agile Embedded Podcast:

- **Code reviews are essential:** Not just for catching bugs, but for knowledge transfer, mentoring, shared understanding of the codebase and requirements, and shared ownership. Avoiding soloed knowledge silos is crucial for business continuity and team morale.
- **Focus on design, not minutiae:** Code reviews should prioritize high-level design and architecture discussions. Automated tools should handle code style (braces, indentation, etc.) to avoid "bikeshedding." Review interfaces and module designs _before_ full implementation.
- **Early and often:** Conduct reviews early in the design process and iterate on smaller code chunks. This prevents large, overwhelming reviews and keeps feedback focused and actionable.
- **Establish a process:** Create checklists for design and code reviews, prioritize review requests (don't let them pile up!), and consider a style guide enforced by automated tooling. If conducting synchronous reviews, set a clear agenda.
- **Communicate intent:** Before diving into a review, discuss the code's purpose (production-ready, experimental, etc.) and the review's goals. This ensures everyone is on the same page and avoids misunderstandings.
- **Positive framing:** Start reviews by highlighting successes and then offer constructive suggestions. This helps maintain a positive and collaborative atmosphere.
- **Shared ownership and mentoring:** Code reviews are opportunities for knowledge transfer and mentoring in both directions (junior ↔ senior). Juniors can offer fresh perspectives and catch errors, while seniors can share their expertise.
- **Practicalities:** Aim for daily reviews of small, cohesive code chunks. Pull requests are a useful mechanism, but informal, ad-hoc reviews are also valuable. Establish a routine for handling reviews to avoid bottlenecks.
- **Consider pair programming:** For continuous review and collaboration, explore pair or mob programming. While seemingly less efficient in the short term, these practices can improve overall code quality and team performance.
- **Metrics:** Don't over-index on code review metrics. Focusing on the _process_ is more valuable, particularly minimizing the waiting time for review feedback.
