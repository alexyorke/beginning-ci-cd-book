## **Practical Examples of rm, ls, wget, cat, and mv** {#practical-examples-of-rm-ls-wget-cat-and-mv .unnumbered}

**rm (Remove files and directories):**

**Removing a single file:\
** rm old_file.txt

-   

**Removing a directory recursively:\
** rm -rf old_directory/

-   This removes the entire directory old_directory and its contents.

**Verbose output:\
** rm -v old_file.txt

-   This removes old_file.txt and shows the file being deleted on the terminal.

**Safety measure:\
** rm - old_file.txt

-   This prevents rm from interpreting the - as a command-line option. It will treat - as a file name.

**ls (List directory contents):**

**Listing non-hidden files:\
** ls

-   This lists all files and directories in the current directory that don\'t start with a dot.

**Listing all files, including hidden ones:\
** ls -a

-   

**Listing with detailed information:\
** ls -l

-   This lists files with detailed information, including permissions, owner, group, size, and last modified date.

**Listing recursively:\
** ls -R

-   This lists files and directories recursively, showing the contents of subdirectories.

**wget (Download files from the internet):**

**Downloading a file and saving it to stdout:\
** wget -O- https://www.example.com/file.txt

-   This downloads the file and prints its content directly to the terminal.

**Downloading a file quietly (no progress bar):\
** wget -q https://www.example.com/file.txt

-   This downloads the file silently, without displaying the progress bar.

**Updating a file if it has changed on the server:\
** wget -n https://www.example.com/file.txt

-   This downloads the file only if it has been modified since the last time it was downloaded.Useful for example if you want to update a file on your runner that is either restored from a cache or something else. So what this does is uses the modification E tag or something in the server and just checks to see if it\'s been modified. So this allows you to.Not doubt something that has been modified.

**cat (Concatenate and print files):**

**Printing the content of a file:\
** cat file.txt

-   This displays the content of file.txt on the terminal.

**Concatenating multiple files:\
** cat file1.txt file2.txt \> combined.txt

-   This concatenates the content of file1.txt and file2.txt and saves the result to combined.txt.

**mv (Move or rename files):**

**Moving a file to a new location:\
** mv file.txt new_directory/

-   This moves file.txt to the directory new_directory.

**Renaming a file:\
** mv old_name.txt new_name.txt

-   This renames old_name.txt to new_name.txt.

**Moving multiple files to a directory:\
** mv -t destination_directory/ file1.txt file2.txt file3.txt

-   This moves file1.txt, file2.txt, and file3.txt to the destination_directory.

Remember to use these commands carefully, especially rm and mv, as they can potentially delete or overwrite files and directories. Always double-check your commands before executing them.


