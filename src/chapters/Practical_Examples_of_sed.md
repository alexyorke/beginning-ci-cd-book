## **Practical Examples of sed** {#practical-examples-of-sed .unnumbered}

**1. Replacing Version Numbers:**

sed -i \'s/version=\"1.2.3\"/version=\"1.2.4\"/g\' file.txt

Important thing to note here is that the forward slash is used as a delimiter.This means that if you put another forward slash, it will be interpreted as a delimiter.In this case you can use different types of delimiters, so for example the pipe which is just a straight line where you can use.Maybe a question mark or something like that?It doesn\'t really matter too much as long as it doesn\'t occur within the text.

That dash I flag, then it will pipe the content of the file with the replacement to send it open.Now, if you are doing that and you\'re piping it to another command, it\'s very important that you don\'t pipe it back to the same file because the file might not be completely redid memory yet, which could cause the file to be corrupted. Instead, you should either use a sponge command which is in the more detailed.Package or you should type it into another file.

This replaces all occurrences of version=\"1.2.3\" with version=\"1.2.4\" in file.txt, editing the file in place.

-   -i: Edits the file in place.

-   s/old/new/g: s for substitution. old is the text to be replaced, new is the replacement text. g stands for \"global\", replacing all occurrences on a line.

**2. Using Different Delimiters:**

sed -i \'s\|old_path\|/new/path\|g\' script.sh

This replaces old_path with /new/path in script.sh using \| as delimiters, useful if your replacement text contains /.

**3. Multiple Replacements on One Line:**

sed -i \'s/old1/new1/g; s/old2/new2/g\' file.txt

This makes two replacements in file.txt: old1 with new1 and old2 with new2.

**4. Using Variables:**

VERSION=\"2.0.0\"

sed -i \"s/version=\\\"1.2.3\\\"/version=\\\"\${VERSION}\\\"/g\" file.txt

This replaces the version number with the value of the VERSION variable, demonstrating dynamic substitution.

**5. Deleting Lines Containing a Pattern:**

sed -i \'/# This line is a comment/d\' config.txt

This removes any lines containing the comment \# This line is a comment in config.txt.

**6. Using Extended Regular Expressions (-E or -r):**

sed -E \'s/\[0-9\]+ (.\*)/\\1/\' file.txt

This command uses extended regular expressions (-E) to remove leading numbers followed by a space from each line in file.txt.

**7. Replacing Text on a Specific Line:**

sed -i \'13s/old_value/new_value/\' source_code.c

This replaces old_value with new_value on line 13 of source_code.c.

**Key Points:**

-   **Delimiters:** You can use any character as a delimiter for sed substitutions, as long as it doesn\'t appear in the old or new text.

-   **Safety:** Like rm, sed -i modifies files in place. Always back up important files before using sed -i.

-   **Regular Expressions:** sed is powerful because of its support for regular expressions. Explore regular expressions to perform more complex text manipulations.

This set of examples demonstrates the versatility of sed in handling various text editing tasks. As you explore further, you\'ll find that sed is an indispensable tool for automating text processing in shell scripts.


