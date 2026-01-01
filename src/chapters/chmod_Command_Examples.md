## **chmod Command Examples:** {#chmod-command-examples .unnumbered}

Here are practical examples of how to use the chmod command to change file permissions:

**1. Making a File Executable:**

**Single file:\
** chmod +x script.sh

-   [This command adds execute permission to the file script.sh. Required in order to run your bash script if you were to write it on a GitHub runner.Now you can run the script by typing ./script.sh.]{.mark}

**Recursive on a directory:\
** chmod -R +x bin/

-   This command recursively adds execute permission to all files and directories within the bin/ directory.

**2. Setting Specific Permissions:**

**[SSH public keys and private keys each have a certain permissions. Otherwise it won't be possible to use these keys when you use SSH within your runner.]{.mark}**

**Setting read and write permissions for the owner:\
** chmod 600 \~/.ssh/id_rsa

-   This sets the permissions of the file \~/.ssh/id_rsa to 600, which translates to:

    -   6 - owner (user) has read and write permissions

    -   0 - group has no permissions

    -   0 - others have no permissions

-   

**Setting read permissions for the owner, group, and others:\
** chmod 644 \~/.ssh/id_rsa.pub

-   This sets the permissions of the file \~/.ssh/id_rsa.pub to 644, which translates to:

    -   6 - owner (user) has read and write permissions

    -   4 - group has read permissions

    -   4 - others have read permissions

-   

**3. Understanding Permission Modes:**

-   **Octal Notation:** chmod uses octal notation to represent permissions:

    -   The first digit (hundreds place) represents the owner's permissions.

    -   The second digit (tens place) represents the group's permissions.

    -   The third digit (ones place) represents the others' permissions.

-   

-   **Permissions:**

    -   4: Read permission

    -   2: Write permission

    -   1: Execute permission

-   

**4. Using umask:**

-   **Setting the default permissions:** The umask command sets the default permissions for newly created files and directories. For example, umask 022 sets the default permissions to 644 for files and 755 for directories.

**Setting a specific umask:\
** umask 022

-   This sets the umask to 022, ensuring that newly created files will have read/write permissions for the owner and read permissions for the group and others.

**Key Points:**

-   **Safety:** Be cautious when using chmod. Incorrectly setting permissions can make files inaccessible or grant unintended access to others.

-   **Best Practices:** It's often good practice to restrict permissions on sensitive files like SSH keys (\~/.ssh/id_rsa) to the owner only (using chmod 600).

-   **Reference:** You can use ls -l to view the current permissions of a file. The first character in the output represents the file type (e.g., - for a regular file, d for a directory), and the next nine characters represent the permissions (three sets of three characters for owner, group, and others).


