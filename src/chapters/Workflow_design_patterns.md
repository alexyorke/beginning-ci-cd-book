## Workflow design patterns

- +-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
  | Really super long lines with lots of escaping characters is really hard to read. I would recommend either using string literals (e.g., those terminated by EOF), or making them separate files. |
  | |
  | cat \<\< EOF |
  | |
  | Line 1 |
  | |
  | Line 2 |
  | |
  | Line 3 |
  | |
  | EOF |
  | |
  | If you can't help it and the command has to be long, then the lines can be made shorter via appending \\ which will allow you to continue on a new line. |
  | |
  | Another thing is doing lots of pipes to many commands. I would prefer having them on separate lines. |
  | |
  | find . -type f -name \"\*.txt\" -exec wc -l {} + \| awk \'\$1 \>= 100\' \| sort -nr \| head -n 5 \| awk \'{print \"File: \" \$2 \" - Line Count: \" \$1}\' |
  | |
  | find . -type f -name \"\*.txt\" -exec wc -l {} + \\ |
  | |
  | \| awk \'\$1 \>= 100\' \\ |
  | |
  | \| sort -nr \\\ |
  | \| head -n 5 \\ |
  | |
  | \| awk \'{print \"File: \" \$2 \" - Line Count: \" \$1}\' |
  | |
  | I think that formatting is very nice to look at, especially for scripts with many pipes/lines. |
  | |
  | You're also allowed to use functions in bash scripts as well. |
  | |
  | Error checking important, as it might be unclear which command failed if in a long script. |
  | |
  | End lines with semicolons. |
  +=================================================================================================================================================================================================+
  +-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

- +--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
  | What I've seen a lot is using matrix builds for jobs that are very different. I don't think that is a good strategy as it makes things very complicated. It's like a for loop but running a different program every time. I would be tempted to just make them separate jobs (that run in parallel, of course) and then make them all depends on something else if you want to run things in parallel. |
  | |
  | Using matrix builds combined with `if` statements to target a particular operating system (OS) in GitHub Actions can be seen as inefficient or suboptimal, but whether it\'s an anti-pattern depends on the context and specific implementation. Let\'s explore this in more detail: |
  | |
  | ### Matrix Builds and `if` Statements |
  | |
  | \- **Matrix Builds**: They allow you to run jobs across multiple environments (e.g., different OS versions, language versions) simultaneously. The main goal is to test your code in various conditions efficiently. |
  | |
  | \- **`if` Statements**: These provide conditional execution of steps or jobs based on certain criteria. |
  | |
  | ### Potential Issues with Combining Them |
  | |
  | 1\. **Redundancy**: If you use a matrix build to set up environments for multiple OSes but then use `if` statements to run certain steps only for a specific OS, you might end up running unnecessary jobs. This can waste CI resources and increase build times. |
  | |
  | 2\. **Complexity**: Overusing `if` conditions within a matrix can lead to complex and hard-to-maintain workflows. |
  | |
  | ### When It Might Not Be An Anti-pattern |
  | |
  | \- **Specific Use Cases**: In cases where most steps are common across all matrix elements but a few steps are OS-specific, using `if` statements might be justified. |
  | |
  | \- **Minimal Conditional Logic**: If the conditional logic is minimal and does not significantly impact the overall efficiency of the workflow. |
  | |
  | ### Alternatives and Best Practices |
  | |
  | \- **Separate Workflows or Jobs**: If the steps for different OSes are significantly different, consider creating separate workflows or jobs for each OS. |
  | |
  | \- **Optimize Matrix Strategy**: Use matrix builds for what they\'re best at -- running the same or similar jobs across different environments. Avoid over-complicating them with too many conditions. |
  | |
  | \- **Clarity and Maintenance**: Aim for workflows that are easy to understand and maintain. Overly complex workflows with numerous conditions can become difficult to manage. |
  | |
  | ### Conclusion |
  | |
  | In summary, while combining matrix builds with `if` statements targeting specific OSes in GitHub Actions isn\'t necessarily an anti-pattern, it can lead to inefficiencies and complexities. It\'s crucial to assess whether the benefits of such an approach outweigh the potential downsides in terms of workflow complexity and resource utilization. Often, simpler and more targeted workflows are more efficient and easier to maintain. |
  +==================================================================================================================================================================================================================================================================================================================================================================================================================================================+
  +--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

-
