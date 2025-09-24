**Chapter 4: Controlling Workflow Execution**

Much like programming languages, CI/CD workflows require mechanisms to control the order and conditions under which tasks are executed. This chapter explores control flow concepts within GitHub Actions, including conditional logic, error handling, and managing dependencies between jobs.

**4.1 Conditional Execution with `if`**

In GitHub Actions (GHA), you can conditionally allow steps or jobs to run based on conditions. Conditions are simply "if" statements that assert if a specified condition is true. For example, if the branch is equal to main, then therefore run this step, otherwise, skip it.

**4.1.1 The Default Behavior: `success()`**

- In GitHub Actions workflows, every step implicitly carries a default “if” condition, which is `success()`. This condition means a step will only execute if all preceding steps in the job do not have a status of "failed" and do not have a status of "cancelled", otherwise, it will be marked as skipped and will not run.
- If a step fails, subsequent steps in the job, by default, will not run due to this implicit `success()` condition, although they are eligible to do so. Essentially, a failed step acts like a 'poison waterfall', preventing the execution of the following steps, unless they explicitly define a different "if" condition to override this default behavior.

```yaml
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Install Dependencies
        run: npm ci
      - name: Run Tests
        run: npm test
      - name: Build Project
        run: npm run build
```

**4.1.2 Status Check Functions**

You can use specific functions within `if` conditions to check the status of previous steps or the overall job/workflow:

- `success()`: Returns `true` if all previous steps in the job completed successfully. (Default condition).
- `failure()`: Returns `true` if any previous step in the job failed. Useful for running cleanup or notification steps on failure.
- `cancelled()`: Returns `true` if the workflow run was cancelled.
- `always()`: Always returns `true`. This ensures a step runs regardless of the status (success, failure, cancelled) of previous steps. Useful for critical cleanup tasks.

```yaml
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Run Tests
        id: test
        run: npm test
        continue-on-error: true

      - name: Upload Test Results (on Failure)
        if: failure()
        run: echo "Uploading failure logs..."

      - name: Cleanup Resources
        if: always()
        run: echo "Cleaning up..."

      - name: Notify on Cancellation
        if: cancelled()
        run: echo "Workflow was cancelled!"
```

**4.1.3 Using `if` with Contexts and Expressions**

`if` statements are not limited to status checks. They can evaluate contexts, variables, and functions:

- Branch/Tag Checks:
  ```yaml
  if: github.ref == 'refs/heads/main'
  if: startsWith(github.ref, 'refs/tags/v')
  ```
- Event Type Checks:
  ```yaml
  if: github.event_name == 'pull_request'
  ```
- Actor Checks:
  ```yaml
  if: github.actor == 'dependabot[bot]'
  ```
- Variable/Secret Checks (Indirectly):
  ```yaml
  steps:
    - name: Check env var
      id: check
      run: echo "run_next_step=${{ env.MY_VAR == 'true' }}" >> $GITHUB_OUTPUT
    - name: Conditional Step
      if: steps.check.outputs.run_next_step == 'true'
      run: echo "Running because MY_VAR was true"
  ```
- Combining Conditions:
  ```yaml
  if: github.event_name == 'push' && github.ref == 'refs/heads/main'
  ```

**4.2 Error Handling Strategies**

If a step fails, it is usually something unexpected or unhandled. Failing is good: if you were to keep running, it might be possible to publish corrupted build artifacts for example, or it might not make sense to continue (e.g., if `npm ci` failed, tests can't run). The workflow should generally fail fast.

However, sometimes a step's failure isn't critical to the overall goal.

**4.2.1 `continue-on-error: true`**

- Add `continue-on-error: true` to a step definition.
- If this step fails, the step itself will be marked with a warning/orange icon, but it will not trigger the "poison waterfall". Subsequent steps (with the default `if: success()`) will still run.
- The job's overall status will still be considered successful unless another step (without `continue-on-error`) fails later.

**4.3 Timeouts (`timeout-minutes`)**

- You can set a maximum execution time for entire jobs or individual steps using `timeout-minutes: <minutes>`.
- If a job or step exceeds this time, GitHub Actions will automatically cancel it, marking it as failed due to timeout.

**4.4 Job Dependencies (`needs`)**

- The `needs` keyword defines dependencies between jobs, creating a directed acyclic graph (DAG).
- A job with `needs: [job_A, job_B]` will only start after both `job_A` and `job_B` have completed successfully (by default).
- If any job listed in `needs` fails or is skipped, the dependent job will be skipped by default.

```yaml
jobs:
  build:
    runs-on: ubuntu-latest

  test:
    runs-on: ubuntu-latest
    needs: build
    continue-on-error: true

  deploy:
    runs-on: ubuntu-latest
    needs: [build, test]
    if: success() && needs.build.result == 'success'
    environment: production

  notify:
    runs-on: ubuntu-latest
    needs: [build, test, deploy]
    if: always()
    steps:
      - run: |
          echo "Build Status: ${{ needs.build.result }}"
          echo "Test Status: ${{ needs.test.result }}"
          echo "Deploy Status: ${{ needs.deploy.result }}"
```

**4.5 Common Workflow Patterns**

1. Sequence: Jobs or steps execute one after another. This is the default within a job, and achieved using `needs` between jobs.
2. Parallel Split: Multiple jobs or steps start simultaneously after a preceding task completes.
3. Synchronization (AND-Join): A job or step only starts after all of multiple preceding parallel tasks have completed.
4. Exclusive Choice (XOR-Split/Join): Only one of several possible paths is executed based on a condition.
5. Loop (Iteration): Repeating a task until a condition is met.
6. Calling Sub-Workflows / Reusable Workflows: Encapsulate common sequences of jobs into a separate callable workflow file.

---

This covers the key aspects of controlling workflow execution. The next chapter will likely focus on enhancing workflows with testing, static analysis, and artifact management.


