## Tips and tricks

- Consider setting the maximum duration of your build pipeline shorter, especially if the equipment is very expensive. What time would be very concerning if the pipeline were to take X minutes? Make sure not to set it too short, otherwise it might make it difficult for developers, and external services might be responding slowly. The typical durations are usually 2-6 hours, sometimes up to 12. Also, have an understanding of how long it typically takes to build, so that developers can check on the pipeline if it is taking significantly longer than usual. You can probably set up alerts for this.

- 1\. **Monitor Pipeline Run Time**:

- \- Track the duration of pipeline runs and predict when you\'ll approach limits.

- \- Regularly review and possibly reduce the maximum pipeline time.

-

- 2\. **Scripting Language Familiarity**:

- \- Understand Bash and other scripting languages, including their pitfalls.

- \- Address complex measurements such as ulimits and inode counts by logging them in the pipeline.

-

- 3\. **Enhance Pipeline Logs**:

- \- Make sure pipeline logs are readable and free from excessive output.

-

- 4\. **Miscellaneous Monitoring Benefits**:

- \- Simplifies transferring between Continuous Integration (CI) systems.

- \- Potentially downsize the pipeline to save costs based on monitored resource usage.

- \- Heed emitted warnings to proactively address issues.

-

- 5\. **Pipeline Success Discrepancies**:

- \- Be wary of pipelines that indicate success when they shouldn\'t.

- \- Reasons might include: accidental exclusions, focused tests, limited Bash knowledge, un-linted scripts, unpinned dependencies, and flaky tests.

- \- Counter these issues with practices like linting Bash scripts, addressing flaky tests, and pinning dependencies.

-

- 6\. **Pipeline Waste**:

- \- Inefficient pipelines consume more resources and credits.

- \- Wasted credits indicate potential for more testing, such as soak tests or larger E2E tests, but also risks overcommitting.

- \- Overpowered pipelines may miss flaky tests due to speed; underpowered ones might artificially inflate test flakiness.

-

- 7\. **Failing Fast**:

- \- Developers get immediate feedback.

- \- It can lead to cost savings and improved productivity.

- \- Techniques include moving fast, independent steps to the beginning and using git pre-commit hooks.

-

- 8\. **Selective Pipeline Runs**:

- \- Avoid running the pipeline if changes are made only to non-essential files like READMEs or images.

-

- 9\. **Conclusion**:

- \- Proactive maintenance helps avoid emergencies.

- \- Understand Bash scripting because of its centrality to development workflows.

- \- Avoid unnecessary pipeline runs to save costs and time.

- +-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
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

- +-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
  | To automatically run `npm install` when you pull new code that modifies the `package.json` file, you can use Git hooks, specifically the `post-merge` and `post-checkout` hooks. |
  | |
  | Here\'s how you can set it up: |
  | |
  | 1\. **Navigate to your repository\'s `.git` directory**: |
  | |
  | `|
| |
| cd path/to/your/repo/.git/hooks |
| |
|` |
  | |
  | 2\. **Create or edit the `post-merge` and `post-checkout` hooks**: |
  | |
  | \- Use a text editor to create/edit the `post-merge` file: |
  | |
  | `|
| |
| nano post-merge |
| |
|` |
  | |
  | \- Use a text editor to create/edit the `post-checkout` file: |
  | |
  | `|
| |
| nano post-checkout |
| |
|` |
  | |
  | 3\. **Add the following script to both files**: |
  | |
  | `bash |
| |
| #!/bin/sh |
| |
| changed_files=\"\$(git diff-tree -r \--name-only \--no-commit-id ORIG_HEAD HEAD)\" |
| |
| check_run() { |
| |
| echo \"\$changed_files\" \| grep \--quiet \"\$1\" && eval \"\$2\" |
| |
| } |
| |
| check_run package.json \"npm install\" |
| |
| ` |
  | |
  | This script checks if `package.json` is among the changed files and runs `npm install` if it is. |
  | |
  | 4\. **Make the hooks executable**: |
  | |
  | `|
| |
| chmod +x post-merge post-checkout |
| |
|` |
  | |
  | Now, whenever you pull new changes with `git pull` (which internally does a merge) or checkout to a different commit/branch, the hooks will check if `package.json` was modified and will run `npm install` if necessary. |
  | |
  | **Note**: Git hooks are local to your clone of the repository and aren\'t shared with other clones of the repository. If you want all developers to have this behavior, you\'ll need to instruct them to set up the hooks themselves, or consider using a tool like \[Husky\](https://typicode.github.io/husky/#/) that simplifies the management of Git hooks in a shared project. |
  +=========================================================================================================================================================================================================================================================================================================================================================================================+
  +-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

-
