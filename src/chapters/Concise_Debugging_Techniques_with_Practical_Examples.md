## **Concise Debugging Techniques with Practical Examples** {#concise-debugging-techniques-with-practical-examples .unnumbered}

If a job fails, you may only want to log debug output so as to prevent slowing down the runner and saving unnecessary information. Therefore, you can run a github action that has a job or step that only runs on failure, uploading the debug logs to the artifacts

jobs:

build:

runs-on: ubuntu-latest

steps:

- name: Checkout code

uses: actions/checkout@v3

- name: Build project

run: \|

\# Your build command here

npm run build

- name: Run tests

run: \|

\# Your test command here

npm run test

debug:

runs-on: ubuntu-latest

needs: build

if: failure()

steps:

- name: Checkout code

uses: actions/checkout@v3

- name: Print environment variables

run: \|

env

- name: Print debug information

run: \|

echo \"## Debugging information\"

echo \"The previous step failed.\"

echo \"Here\'s some information that might help:\"

\# Add commands to print relevant debugging information here, e.g.:

\# ls -l

\# cat error.log

\# npm run debug \--verbose

- name: Upload artifacts

uses: actions/upload-artifact@v3

with:

name: debug-artifacts

path: \|

\# Specify the paths to the files you want to upload

build/

test-results/

error.log

**Explanation:**

1.  **jobs.debug**: Defines a job named \"debug\" for debugging purposes.

2.  **needs: build**: Ensures this job runs only after the \"build\" job, whether successful or not.

3.  **if: failure()**: Triggers this job only if any step in the \"build\" job fails.

4.  **Steps within debug**:

    - **Checkout code**: Checks out the code again for access within this job.

    - **Print environment variables**: Prints environment variables, which might contain clues about the failure.

    - **Print debug information**:

      - Provides a starting point for printing custom debugging information.

      - You can add commands to:

        - List files (ls -l).

        - Display content of specific files (cat error.log).

        - Run debugging scripts (npm run debug \--verbose).

      -

    -

    - **Upload artifacts**:

      - Uses the actions/upload-artifact action to store relevant files as downloadable artifacts.

      - This allows you to examine these files later for detailed analysis.

**How to use:**

1.  **Customize the Print debug information step**: Replace the placeholder comments with specific commands that generate valuable debugging output for your project.

2.  **Tailor path in Upload artifacts**: Specify the directory or files that hold crucial information for debugging.
