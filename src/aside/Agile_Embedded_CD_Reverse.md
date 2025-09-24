## [**[default_tc.mp3](https://1drv.ms/u/s!AOnf7tByrSaDlAE)**](#default_tc.mp3)

## **Key Points from Agile Embedded Podcast with Jonathan Hall:**

**Topic:** Implementing Continuous Delivery in Reverse (Skipping Automated Tests Initially)

**What is Continuous Delivery (CD)?**

- CD is the practice of delivering software changes on a continual basis, making a deployable artifact ready automatically upon each change.
- It does **not** necessarily mean automatic deployment to production, but having the option to.
- Requires Continuous Integration (CI) as a prerequisite, which itself relies on Trunk-Based Development.

**Continuous Delivery in Reverse:**

- **Start with the desired outcome:** Automate the deployment process first (even if just to a test environment), then work backwards.
- **Shift testing left of the merge:** All testing, even manual, should be completed **before** merging code to the main branch.
- **Don’t rely on batched releases:** Testing becomes more focused and effective when done on individual features, not a collection of changes.

**Benefits:**

- **Forces identification of bottlenecks:** Highlights inefficiencies in the existing testing process.
- **Encourages streamlined testing:** Promotes the adoption of smaller, more focused test suites tailored to specific changes.
- **Empowers developers:** Leads to developers becoming more involved in testing, improving code quality and ownership.
- **Enables faster feedback loops:** Allows for quicker responses to customer feedback and faster iteration cycles.

**Addressing Concerns:**

- **Trusting automated testing:** Start by replicating the existing manual process with automation, even if it doesn't fully replace it.
- **Regulated industries (e.g., medical devices):** Continuous delivery can streamline regulatory compliance by providing auditable, automated test reports.
- **Legacy code:** Prioritize adding tests when making changes to existing code, focusing on areas where confidence is low.

**Overall Message:**

- Continuous delivery is achievable in various contexts, including embedded systems.
- Shifting testing left of the merge, even manual testing, is crucial.
- Focus on building trust in the system and iteratively improving the process.


