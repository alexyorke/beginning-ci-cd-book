### Outputs (and common outputs) {#outputs-and-common-outputs .unnumbered}

Sharing information between steps and jobs in a CI/CD pipeline is crucial for maintaining continuity and consistency across the workflow. Here's how it works more coherently explained:

### Information Sharing Between Steps

1. **In-Memory Structures**: Information that isn't persisted to the file system, like variables or environment variables, can be passed between steps within the same job.

2. **Outputs as Inputs**: Outputs from one step can be used as inputs in subsequent steps. For example, generating a version number in one step and using it in subsequent steps for tasks like stamping the version into source code, resource files, or naming artifacts.

### Job-to-Job Communication

1. **Sequential Job Execution**: To pass information from one job to another, the first job must complete before the next starts if the subsequent job relies on outputs from the first.

2. **Using Outputs Across Jobs**: Outputs from one job can be set as inputs for the next job. This is particularly useful for sharing configuration data, such as release numbers or outcomes of tests.

### Practical Usage of Outputs

1. **Version Control**: A common use of outputs is to generate a version number that can be utilized across multiple steps, ensuring all parts of the application and its artifacts are version-coordinated.

2. **Conditional Steps Based on Outputs**: Outputs can determine workflow logic, such as skipping software installation steps if caches were successfully restored.

### Technical Implementation

1. **Unique Step Identification**: Ensure each step that generates outputs has a unique "id" so its outputs can be specifically referenced.

2. **Passing Data**: Data is passed to the next step by writing to a temporary file located at `$GITHUB_OUTPUT`. This file is then re-sourced at the start of each subsequent step, injecting the exported environment variables into the step.

3. **Environment Variables Integration**: By exporting the required outputs into environment variables, each subsequent step can access these values seamlessly.

You only need ids for steps if you want to share data between different steps. Adding ids don't hurt anything if you add them and you don't use the ids, however.

````yaml
name: Context testing

on: push

jobs:

  job1:

    runs-on: ubuntu-latest

    steps:

      - id: step1

        name: Step 1

        run: echo "TESTING=hello sample text" >> $GITHUB_OUTPUT;

      - id: step2

        name: Step 2

        run: echo "$TESTING"

        env:

          TESTING: ${{steps.step1.outputs.TESTING}}

If you need to share large amounts of information, such as files, then you can use the upload-artifacts action to upload the artifacts, and then download them in the next job.

You can also specify outputs via the "output" mapping. This is especially useful if you want to share information specific to GitHub actions (i.e., those with the "using:" mapping) as those do not have a run block where you can export information via GITHUB_OUTPUT.

If you need information from a step in another job, make sure that it runs before your job runs. Otherwise, the output will be undefined because the job did not run yet. This has to be explicitly defined.

**Note!** If you try to access an output that does not exist from a step, you'll get back an empty string and no error. To prevent this, use actionlint which is a third-party tool that lints your workflow files. It will catch this error.

```yaml
// Start of Selection
jobs:
  job1:
    runs-on: ubuntu-latest
    # Map a step output to a job output
    outputs:
      output1: ${{ steps.step1.outputs.test }}
      output2: ${{ steps.step2.outputs.test }}
    steps:
      - id: step1
        run: echo "test=hello" >> "$GITHUB_OUTPUT"

      - id: step2
        run: echo "test=world" >> "$GITHUB_OUTPUT"

  job2:
    runs-on: ubuntu-latest
    needs: job1
    steps:
      - env:
          OUTPUT1: ${{ needs.job1.outputs.output1 }}
          OUTPUT2: ${{ needs.job1.outputs.output2 }}
        run: echo "$OUTPUT1 $OUTPUT2"

### {#section-1 .unnumbered}

#### What are outputs commonly used for? {#what-are-outputs-commonly-used-for .unnumbered}

- [[actions/create-release: An Action to create releases via the GitHub Release API]{.underline}](https://github.com/actions/create-release#outputs) where the output is the release_url and then it is used in the upload-release-asset task as an input to add things to the release, potentially use output release URL in other integrations such as posting the release URL to teams, tags are grabbed in one step and then re-used in many others, tagging docker images with the version. If you're using timestamps, then you have to have it as a variable because otherwise if you re-evaluate it then it will change.

- Version numbers and references and such have to be stamped everywhere, all over the tags, docker images, source code, etc. so these are commonly re-used as outputs in the workflows. They are also difficult to compute sometimes, so therefore it makes sense to have them in their own step.

- Output from tests, so for example, success/failure/how many tests passed, etc. I suppose it is because people don't know that you can continue a failing step, or, that technically, failing tests might cause the rest of the workflow to fail, therefore in order to publish the testing results then you have to make sure that you continue on because otherwise the workflow would stop (and you want to publish the test failures.)

Sometimes, however, outputs might still be available from your steps but might not be explicitly defined. For example, GitHub Actions actions may define outputs, even though they are not in the workflow file.Find out if this is the case for your action. You have to check the GitHub Actions documentation.

```yaml
- name: Restore Cache
  id: cache
  uses: actions/cache@v2
  with:
    path: node_modules
    key: ${{ runner.os }}-node-${{ hashFiles('**/package-lock.json') }}

- name: Report Cache Status
  if: steps.cache.outputs.cache-hit != 'true' # not defined in previous step
  run: echo "Cache key not found. Regenerating cache."
````


