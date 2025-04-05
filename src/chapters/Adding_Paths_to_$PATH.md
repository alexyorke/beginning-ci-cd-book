## **Adding Paths to \$PATH:** {#adding-paths-to-path .unnumbered}

Here\'s a breakdown of how to add paths to your \$PATH variable, illustrating both the standard export method and using the inline command eval.

**1. Using export:**

**Adding a single path:\
** export PATH=\~/.npm-global/bin:\$PATH

- This appends the directory \~/.npm-global/bin to the beginning of the \$PATH variable.

**Adding multiple paths:\
** export PATH=\~/.local/bin:/usr/local/bin:\$PATH

- This adds two paths, \~/.local/bin and /usr/local/bin, to the beginning of \$PATH.

**Important Notes:**

- **Order matters:** The order of paths in \$PATH is significant. When you run a command, your shell searches for the executable in the directories listed in \$PATH from left to right. Therefore, adding a path to the beginning (like we did above) ensures that it\'s checked first.

- **Temporary vs. Permanent:** The export command only sets the \$PATH variable for the current shell session. To make the change permanent, you\'ll need to add it to your shell\'s configuration file:

  - **Bash:** Add the export line to your .bashrc or .profile file.

  - **Zsh:** Add it to your .zshrc file.

-

**2. Using eval and inline commands:**

The eval command evaluates a string as a command. This is helpful for dynamically building path modifications. The author recommends against this as this could cause arbitrary code execution.

**Example:\
** eval \'export PATH=\$PATH:\$(echo \"/path/to/your/bin\")\'

- - This line uses echo to generate the path string dynamically (good for variable-based paths).

  - It then uses eval to evaluate the entire string as a command, effectively adding the path to \$PATH.
