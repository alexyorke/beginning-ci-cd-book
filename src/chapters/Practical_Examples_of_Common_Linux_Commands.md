## **Practical Examples of Common Linux Commands** {#practical-examples-of-common-linux-commands .unnumbered}

Here are some practical examples demonstrating the usage of common Linux commands:

**1. find**

**Finding files with specific criteria:**

-   Find all files in the current directory and its subdirectories named \"config.txt\":

find . -name \"config.txt\"

-   Find all files in the current directory and its subdirectories modified in the last 24 hours:

find . -mtime -1

-   Find all files in the current directory and its subdirectories with the \"txt\" extension:

find . -name \"\*.txt\"

**Using find with -exec to execute commands:**

-   Delete all files in the current directory and its subdirectories older than 30 days:

find . -mtime +30 -exec rm {} \\;

-   Rename all files in the current directory and its subdirectories ending with \".bak\" to \".txt\":

find . -name \"\*.bak\" -exec mv {} \`echo {} \| sed \'s/\\.bak\$/.txt/\'\` \\;

**Using find with -0 for piping:**

-   Find all .txt files in the current directory and its subdirectories, then print their file sizes:

find . -name \"\*.txt\" -print0 \| xargs -0 du -h

**2. tar**

**Creating an archive:**

-   Archive all files in the current directory into a file named \"my_archive.tar\":

tar -cf my_archive.tar \*

-   Archive all files in the \"documents\" directory into a file named \"documents.tar\", showing progress:

tar -cvf documents.tar documents/\*

-   Create a compressed archive of all files in the \"pictures\" directory:

tar -czvf pictures.tar.gz pictures/

**Extracting an archive:**

-   Extract the contents of \"my_archive.tar\" to the current directory:

tar -xf my_archive.tar

-   Extract the contents of \"documents.tar.gz\" to the \"extracted\" directory:

tar -xzvf documents.tar.gz -C extracted

**Directory Structure of tar Archives:**

If you cd into a directory and then use tar -cf archive.tar \* to create an archive, the resulting archive will have a structure that reflects the relative paths of the files within the directory. For example, if your directory structure is:

directory/

\- file1.txt

\- subdirectory/

\- file2.txt

content_copyUse code [[with caution]{.underline}](https://support.google.com/legal/answer/13505487).

The archive.tar will have a similar structure when extracted:

extracted/

\- file1.txt

\- subdirectory/

\- file2.txt

content_copyUse code [[with caution]{.underline}](https://support.google.com/legal/answer/13505487).

**3. zip**

**Creating an archive:**

-   Zip all files in the current directory into \"my_archive.zip\":

zip -r my_archive.zip \*

-   Zip the contents of the \"documents\" directory into \"documents.zip\":

zip -r documents.zip documents/

**Extracting an archive:**

-   Extract the contents of \"my_archive.zip\" to the current directory:

unzip my_archive.zip

-   Extract the contents of \"documents.zip\" to the \"extracted\" directory:

unzip -d extracted documents.zip

**4. for**

**Looping through files:**

-   Print the names of all files in the current directory:

for file in \*; do

echo \"\$file\"

done

-   Create a backup of all .txt files in the current directory:

for file in \*.txt; do

cp \"\$file\" \"\$file.bak\"

done

**Looping through numbers:**

-   Print numbers from 1 to 10:

for i in {1..10}; do

echo \"\$i\"

done

-   Execute a command 5 times with a 2-second delay between each execution:

for i in {1..5}; do

echo \"Executing command\...\"

sleep 2

done

**5. touch**

-   Create a new empty file named \"new_file.txt\":

touch new_file.txt

\`

-   Update the modification time of \"important_file.txt\" to the current time:

touch important_file.txt

**6. EOF**

**Multiline strings in shell scripts:**

#!/bin/bash

message=\"This is a multiline

string with variables: \$HOME\"

echo \"\$message\"

cat \<\< EOF

This is another multiline

string.

EOF

**7. pwd**

-   Print the current working directory:This is useful when you want to debug where you\'re currently at. If you\'re writing some commands and they look like they\'re not working, for example.

pwd

**8. sleep**

-   Wait for 5 seconds:

sleep 5

-   Wait for 10 minutes:

sleep 10m

-   Wait for 2.5 hours:

sleep 2.5h

**9. apt-get**

-   Update the package list:

apt-get update

-   Install the \"vim\" package without prompting:

apt-get -y install vim

-   Install multiple packages:

apt-get -y install vim curl git

**10. ln**

-   Create a symbolic link named \"my_link\" pointing to the file \"important_file.txt\":

ln -s important_file.txt my_link

**11. df**

-   Show free disk space for all mounted filesystems:It\'s useful if your runner is running out of space and you want to do some debugging, for example.

df -h

-   Show free disk space for the \"/home\" filesystem:

df -h /home

**12. unzip**

-   Unzip the contents of \"my_archive.zip\" to the current directory:

unzip my_archive.zip

-   Unzip the contents of \"documents.zip\" to the \"extracted\" directory:

unzip -d extracted documents.zip

**13. grep**

-   Find lines containing the word \"error\" in the file \"log.txt\":

grep \"error\" log.txt

-   Find lines containing the pattern \"error\[0-9\]+\" (error followed by one or more digits) in the file \"log.txt\":

grep \"error\[0-9\]+\" log.txt

-   Find lines in all files in the current directory that contain the word \"warning\":

grep \"warning\" \*


