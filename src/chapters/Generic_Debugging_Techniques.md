## Generic Debugging Techniques {#generic-debugging-techniques .unnumbered}

**Design for debuggability:** Build in features like logging, error handling, and clear code structure to facilitate debugging.

**Example:\
** #!/bin/bash

set -x \# Enable verbose logging

if \[ ! -f \"myfile.txt\" \]; then

echo \"Error: myfile.txt not found!\" \>&2 \# Log error to stderr

exit 1

fi

**Temporary \"breakpoints\":** Add approval checks or conditional statements as temporary breakpoints to control script execution flow.

**Example:\
** #!/bin/bash

read -p \"Continue? (y/n) \" -n 1 -r

echo

if \[\[ \$REPLY =\~ \^\[Yy\]\$ \]\] ; then

echo \"Continuing\...\"

else

echo \"Stopping\...\"

exit 0

fi

**User-agent tracking:** Use a unique GUID in curl\'s user-agent header to track resource requests.So in this way you can kind of correlate this request with your back end logs or some other server or something like that, and you could see if there\'s like a status code issue or if the request was malformed or what the response was and then just get a really good understanding of where the request was throughout the entire process.

**Example:\
** curl -H \"User-Agent: MyScript/1.0 (GUID: 12345678-90abcdef-1234-567890abcdef)\" https://example.com

**Environment-Specific Debugging**

**Recreate issues in a new pipeline:** Isolate a problematic stage by debugging it independently to rule out environmental factors.

- **Steps:**

  - Create a new, simplified pipeline.

  - Configure the new pipeline to execute only the problematic stage.

  - Compare the results with the original pipeline.

**Dump environment variables:** Inspect environment variables (carefully) to identify potential discrepancies or missing settings.

- **Command:** env

**Verbose logging:** Increase logging verbosity to gather comprehensive information about script execution.

**Example:\
** set -x \# Enable verbose logging in Bash

**Debug step:** Create a dedicated debug step in your pipeline to execute specific commands and analyze their output.

**Example:\
** - bash: \|

echo \"Debugging information:\"

env

pwd

ls -la

displayName: \'Debug Step\'

**Pipeline-Specific Debugging**

- **JSONdiff for YAML:** Convert pipeline YAML to JSON to easily spot indenting errors or syntax issues.The diff wells show.Some.Changes that may not be intended, so you may want to.See how this corresponds to the original Jason file?

**Example:\
** \# Convert YAML to JSON

yq . pipeline.yaml \> pipeline.json

\# Convert JSON back to YAML

yq -P . pipeline.json \> pipeline_converted.yaml

\# Compare the original and converted YAML files

diff pipeline.yaml pipeline_converted.yaml

**Dependency management:** Verify the status of dependencies, including version compatibility and availability.

**Example:\
** \# Check for outdated npm packages

npm outdated

\# Check if a specific apt package is installed

dpkg -l \| grep packageName

- **Semver validation:** Programmatically check if applications adhere to Semantic Versioning (Semver) to ensure consistent versioning.

  - **Tools:** semver, node-semver (JavaScript)

- **Bash Script Debugging**

- **Quoting:** Ensure proper quoting of strings and special characters to prevent unexpected behavior.

**Example:\
** \# Correct quoting:

echo \"This string contains spaces and special characters like \$!\"

\# Incorrect quoting:

echo This string contains spaces and special characters like \$!

-

```{=html}
<!-- -->
```

-

- **File I/O race conditions:** Avoid race conditions by using temporary files and atomic operations when writing to files.

**Example:\
** \# Write to a temporary file and then move it atomically

tmp_file=\$(mktemp)

echo \"Content\" \> \"\$tmp_file\"

mv \"\$tmp_file\" target_file.txt

-

```{=html}
<!-- -->
```

-

- **Dependency and version checks:** Thoroughly verify dependency versions and ensure compatibility.For example, you can dump all of the dependencies on your development machine and then on your continuous integration server and then compare them and see which is different.

  - **Tools:** npm ls, pip freeze, dpkg -l

-

- **Line endings:** Pay attention to line endings and ensure consistency between different operating systems.Scripts must use the Unix line endings, and so some of these commands can automatically convert DOS line endings to Unix and so forth.

  - **Tools:** dos2unix, unix2dos, sed

-

- **Inode limits:** Monitor filesystem inode usage to prevent errors caused by exceeding limits.If you make too many files, for example millions of files, usually on GitHub actions runners, you will technically run out of space without actually running out of space just because of your eye. Don\'t uses, it\'s just too hot.Therefore, you can run this command to see how many inodes that you have left.

  - **Command:** df -i

-

- **Shellcheck and defensive programming:** Employ shellcheck to catch potential errors and follow defensive programming practices.You typically want to use this when you are.Committing scripts as part of your pipeline. So for example, the pipeline could validate itself, or you have other scripts that you\'re using for.And different things.Which I\'ll check does is it checks for common mistakes in bash scripts and can prevent several classes of errors. These errors don\'t necessarily appear.In when you\'re developing the bash script like, it might just execute normally, but there\'s a lot of foot guns that may execute a script differently and make it very difficult to debug, so she\'ll check.Well, fix that for you.

**Example:\
** shellcheck myscript.sh

-

```{=html}
<!-- -->
```

-

- **Command verification:** Use the command command to check if commands are available and located correctly.

**Example:\
** command -v python3

-

```{=html}
<!-- -->
```

-

- **Hangs and deadlocks:** Use strace to analyze system calls and identify potential causes of hangs.It\'s. Well, outputs A debugging stream that will show system calls, and if you see that there\'s a system call that just sets, for example like a right command or maybe a recommand, or maybe some errors, you can kind of debug it. It kind of depends on what the errors are, however. Occasionally there might be a application that requires user input, but it\'s hidden behind a pseudo chairman or something like that. It\'s hard to say.

**Example:\
** strace -f -o strace.log my_program

-

```{=html}
<!-- -->
```

-

- **Timeouts and exceptions:** Implement timeouts to prevent long-running processes and handle exceptions gracefully.

**Example:\
** timeout 10s my_command

if \[ \$? -ne 0 \]; then

echo \"Command timed out or failed\" \>&2

fi

-

```{=html}
<!-- -->
```

-

- **set -o errtrace and set -b:** These options can enhance debugging by tracing errors and providing better debugging information.

**Example:\
** set -o errtrace

set -b

-

```{=html}
<!-- -->
```

- **General Tips**

- **Automation:** Automate debugging steps and incorporate them into your pipeline for efficient troubleshooting.

  - **Tools:** Jenkins, GitLab CI/CD, Azure DevOps

-

- **Collaboration:** Share debugging findings and best practices within your team.

  - **Platforms:** Slack, Microsoft Teams, dedicated documentation

-

- **Continuous Improvement:** Continuously refine your debugging process and identify areas for improvement.

  - **Methods:** Retrospective meetings, documentation reviews, knowledge sharing sessions

-

By using these techniques and tools, you can effectively debug your bash scripts and pipelines, reducing errors and ensuring smooth operation. Remember to be patient, persistent, and methodical in your approach to debug

- First, you can set breakpoints in the workflow to inspect the state of the filesystem at different points. For example, "while ! \[ -f /tmp/continue \]; do echo \"Waiting\...\"; sleep 10; done" can be added as a step prior to another step to function as a breakpoint.

+------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| \# START BREAKPOINT |
| |
| \- name: Breakpoint |
| |
| run: while ! \[ -f /tmp/continue \]; do echo \"Waiting\...\"; sleep 10; done |
| |
| \# END BREAKPOINT |
| |
| This should probably delete the file when it's done as well... |
| |
| There are more advanced ways you could do it, for example, to change the content of the file and read it, and then do things with it such as switching steps and such. |
+========================================================================================================================================================================+
+------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

- Then, run your action via act

- Then, do docker container ls

+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| PS C:\\Users\\Alex Yorke\> docker container ls |
| |
| CONTAINER ID IMAGE COMMAND CREATED STATUS PORTS NAMES |
| |
| 4dd905567fdc catthehacker/ubuntu:full-20.04 \"tail -f /dev/null\" 6 seconds ago Up 5 seconds act-blank-yml-example-job-c689ccead8c0297906529f50c32b9c7f2092aab37d1572573eb90b2fc6f9084a |
| |
| PS C:\\Users\\Alex Yorke\> docker exec -it 4dd /bin/bash |
| |
| Then do touch /tmp/continue to continue after the breakpoint. |
+=========================================================================================================================================================================================+
+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

- When you're referencing the workflow by its hash, use this syntax: - uses: actions/checkout@b4ffde65f46336ab88eb53be808477a3936bae11 \# ratchet:actions/checkout@v4

- Here\'s an example of how to debug setting environment variables.

+------------------------------------------------------------------------------------------------------------------+
| \- name: Run tests |
| |
| env: |
| |
| JAX_NUM_GENERATED_CASES: \${{ matrix.num_generated_cases }} |
| |
| JAX_ENABLE_X64: \${{ matrix.enable-x64 }} |
| |
| JAX_ENABLE_CUSTOM_PRNG: \${{ matrix.prng-upgrade }} |
| |
| JAX_THREEFRY_PARTITIONABLE: \${{ matrix.prng-upgrade }} |
| |
| JAX_ENABLE_CHECKS: true |
| |
| JAX_SKIP_SLOW_TESTS: true |
| |
| PY_COLORS: 1 |
| |
| run: \| |
| |
| pip install -e . |
| |
| echo \"JAX_NUM_GENERATED_CASES=\$JAX_NUM_GENERATED_CASES\" |
| |
| echo \"JAX_ENABLE_X64=\$JAX_ENABLE_X64\" |
| |
| echo \"JAX_ENABLE_CUSTOM_PRNG=\$JAX_ENABLE_CUSTOM_PRNG\" |
| |
| echo \"JAX_THREEFRY_PARTITIONABLE=\$JAX_THREEFRY_PARTITIONABLE\" |
| |
| echo \"JAX_ENABLE_CHECKS=\$JAX_ENABLE_CHECKS\" |
| |
| pytest -n auto \--tb=short \--maxfail=20 tests examples |
| |
| Because then you can see all of the vars and can easily debug them without having to re-run your entire workflow |
+==================================================================================================================+
+------------------------------------------------------------------------------------------------------------------+

- For very long bash commands, consider using an external script, or using the backslash to make it multiline

- GitHub Actions runs bash scripts with the "-e" flag, changing behavior. This exits the script if there is an error on any line (i.e., non-zero return code.) This is in contrast to the default behavior, which keeps running the scripts.

- How to download all of the pipeline logs (and how to search through them for a particular string.) This is currently not possible on the GitHub website.

This is an example of how to download all of the logs for your repository between two dates and Then with these logs you can do a search for an error message to see when the error message first occurred.This could help be debugged by narrating down where the error message occurred and then you can find the commit that potentially introduce that error.

#!/bin/bash

\# \-\-- Configuration \-\--

REPO=\"alexyorke/oss_rss\" \# Replace with your repository

LOG_DIR=\"logs\" \# Directory to save logs

START_DATE=\"2023-04-01T00:00:00Z\" \# Start date for log retrieval

END_DATE=\"2023-10-01T00:00:00Z\" \# End date for log retrieval

\# \-\-- Functions \-\--

function download_logs() {

local run_id=\"\$1\"

echo \"Downloading logs for run ID: \$run_id\"

gh run view \"\$run_id\" \--log -R \"\$REPO\" \> \"\$LOG_DIR/\$run_id\"

}

\# \-\-- Main Script \-\--

\# Create the log directory if it doesn\'t exist

mkdir -p \"\$LOG_DIR\"

\# Fetch run IDs within the specified date range

gh run list \--json databaseId,createdAt \--limit 100 -R \"\$REPO\" \| \\

jq -r \".\[\] \| select(.createdAt \>= \\\"\$START_DATE\\\" and .createdAt \<= \\\"\$END_DATE\\\") \| .databaseId\" \| \\

while read -r run_id; do

download_logs \"\$run_id\"

done

echo \"Log download complete!\"

### Cookbook for common bash commands and their arguments (specifically for CI/CD) {#cookbook-for-common-bash-commands-and-their-arguments-specifically-for-cicd .unnumbered}

The following are commands that have been aggregated from multiple GitHub Workflow files, and are very popular. Additionally, I have aggregated common errors, ways that commands are used incorrectly (including how to use them correctly), common command-line args and when they are used, or actions that people commonly want to perform.

Bash script with complex quoting (example 1)

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
    +-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
    | Here are the key points extracted from the provided text: |
    | |
    | 1\. **Shell Scripts**: |
    | |
    | \- Act as the glue for many systems. |
    | |
    | \- Great for system utilities. |
    | |
    | \- Can have issues causing hours of debugging, especially in diverse remote team environments. |
    | |
    | 2\. **Main Issues with Shell Scripts**: |
    | |
    | \- Line breaks and the necessity of converting them. |
    | |
    | \- Syntax validation. |
    | |
    | \- Linting, and its difference from syntax checking. |
    | |
    | \- Non-ignorable UTF-8 ignorables. |
    | |
    | \- Deciding the right shebang. |
    | |
    | 3\. **Line Breaks, Syntax Validation, and Linting**: |
    | |
    | \- Bash scripts require LF line breaks; CRLF can lead to errors. |
    | |
    | \- Wrong line breaks might occur even in unchanged lines, causing non-intuitive errors. |
    | |
    | 4\. **Addressing Line Break Issues**: |
    | |
    | \- Convert while editing using a `.editorconfig`. |
    | |
    | \- After committing, use a `.gitattributes` file. |
    | |
    | \- Before running CI/CD, ensure files are formatted correctly. |
    | |
    | \- Renormalize line endings for the entire team using `git add \--renormalize .`. |
    | |
    | 5\. **Syntax Validation and Linting**: |
    | |
    | \- Bash files often lack pre-CI/CD syntax validation. |
    | |
    | \- Use `shellcheck` for linting and detecting many common errors. |
    | |
    | \- Run `bash -n` during CI/CD for syntax checking. |
    | |
    | \- Always check line endings using `dos2unix`, but avoid rewriting files only on CI/CD. |
    | |
    | \- Team members should run `shellcheck` before pushing to CI/CD. |
    | |
    | 6\. **UTF-8 Ignorables**: |
    | |
    | \- Certain UTF-8 ignorables aren\'t usually ignorable. |
    | |
    | \- These invisible characters can cause problems. (Further details available in the provided link.) |
    | |
    | 7\. **Shebang**: |
    | |
    | \- Use `#!/usr/bin/env bash` instead of `#!/bin/bash` for broader compatibility and access to potentially newer Bash features. |
    | |
    | The text also mentions the benefits of using tools like Visual Studio Code for handling line endings and emphasizes the difference between linting (with tools like `shellcheck`) and pure syntax checking (`bash -n`). |
    +=============================================================================================================================================================================================================================+
    +-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
