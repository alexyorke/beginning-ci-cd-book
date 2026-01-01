## **Practical Examples of rm, ls, wget, cat, and mv**

### rm (Remove files and directories)

#### Removing a single file

```bash
rm old_file.txt
```

#### Removing a directory recursively

```bash
rm -rf old_directory/
```

- This removes the entire directory "old_directory" and its contents.

#### Verbose output

```bash
rm -v old_file.txt
```

- Shows the file being deleted on the terminal.

#### Safety measure

```bash
rm - old_file.txt
```

- Prevents rm from interpreting "-" as a command-line option by treating it as a file name.

---

### ls (List directory contents)

#### Listing non-hidden files

```bash
ls
```

- Lists files and directories in the current directory that don’t start with a dot.

#### Listing all files, including hidden ones

```bash
ls -a
```

#### Listing with detailed information

```bash
ls -l
```

- Shows permissions, owner, group, size, and last modified date.

#### Listing recursively

```bash
ls -R
```

- Displays contents of subdirectories recursively.

---

### wget (Download files from the internet)

#### Downloading a file and saving it to stdout

```bash
wget -O- https://www.example.com/file.txt
```

- Prints the file content directly to the terminal.

#### Downloading a file quietly (no progress bar)

```bash
wget -q https://www.example.com/file.txt
```

- Downloads silently with no progress bar.

#### Updating a file if it has changed on the server

```bash
wget -n https://www.example.com/file.txt
```

- Downloads only if it has been modified since the last time it was downloaded. This can be useful, for example, if you want to update a file on your runner that is cached or restored. It uses the modification ETag (or similar) from the server to check for changes.

---

### cat (Concatenate and print files)

#### Printing the content of a file

```bash
cat file.txt
```

- Displays the content of file.txt.

#### Concatenating multiple files

```bash
cat file1.txt file2.txt > combined.txt
```

- Combines the content of file1.txt and file2.txt into combined.txt.

---

### mv (Move or rename files)

#### Moving a file to a new location

```bash
mv file.txt new_directory/
```

- Moves file.txt to the directory "new_directory".

#### Renaming a file

```bash
mv old_name.txt new_name.txt
```

- Renames old_name.txt to new_name.txt.

#### Moving multiple files to a directory

```bash
mv -t destination_directory/ file1.txt file2.txt file3.txt
```

- Moves file1.txt, file2.txt, and file3.txt to "destination_directory".

---

Remember to use these commands carefully, especially rm and mv, as they can potentially delete or overwrite files and directories. Always double-check your commands before executing them.
