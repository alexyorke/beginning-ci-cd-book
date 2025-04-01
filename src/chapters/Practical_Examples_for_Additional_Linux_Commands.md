## **Practical Examples for Additional Linux Commands:** {#practical-examples-for-additional-linux-commands .unnumbered}

**1. env**

- **Display all environment variables:This will also show any keys as well. There are only echoing out certain variables if necessary.**

env

- **Check the value of a specific environment variable:This will show any keys as well.**

env \| grep HOME

**2. exit**

- **Exit a script with a specific exit code:Thing other than 0 is considered a failure exit code, so be careful.**

#!/bin/bash

if \[ ! -d \"/path/to/directory\" \]; then

echo \"Directory not found!\"

exit 1

fi

\# \... rest of your script \...

- **Exit a script with a success code:**

#!/bin/bash

\# \... your script logic \...

exit 0

**3. choco**

- **Install the \"7-zip\" package:**

choco install 7zip

- **Install multiple packages:**

choco install 7zip notepadplusplus

- **Update the package list:**

choco update -y all

**4. while**

- **Loop until a file exists:**

#!/bin/bash

while \[ ! -f \"my_file.txt\" \]; do

echo \"Waiting for my_file.txt\...\"

sleep 1

done

echo \"File found!\"

- **Loop until a specific condition is met:**

#!/bin/bash

counter=0

while \[ \$counter -lt 10 \]; do

echo \"Counter: \$counter\"

counter=\$((counter + 1))

done

**5. dir**

- **List files in the current directory:**

dir

- **List files in a specific directory:**

dir /path/to/directory

- **List hidden files:**

dir /a

**6. diff**

- **Compare two files and display differences:**

diff file1.txt file2.txt

- **Highlight differences using color:**

diff \--color file1.txt file2.txt

- **Compare two directories recursively:**

diff -r dir1 dir2

**7. apt**

- **Update the package list:**

apt update

- **Install a package:**

apt install vim

- **Upgrade all installed packages:**

apt upgrade

- **Remove a package:**

apt remove vim

### Tips on working with JSON {#tips-on-working-with-json .unnumbered}

I would be tempted to use Python if you are doing advanced string manipulation/JSON.

Common commands. Lots are for managing GitHub releases/tags/GitHub API and extracting release ids and such. jq -r very popular (raw output, that is, no quotes.) jq -c also popular (print on one line.) jq --arg should be used more frequently; variable injection manually is very weird as to what people are doing. Using -c with -r is redundant. You can also avoid piping jq to jq via jq \'.icons \| keys \| .\[\]\' manifest.json. Lots of unnecessary uses of cat and echo; jq can pass in a filename as its second argument.

Creating a cookbook about using \`jq\` in CI/CD GitHub Actions based on the provided commands can be a valuable resource for developers. Here are key topics and tips you should consider including in your cookbook:

1\. **Introduction to \`jq\` and Its Relevance in CI/CD Pipelines**: Explain what \`jq\` is and why it\'s particularly useful in CI/CD contexts, especially with GitHub Actions. Highlight its ability to parse, filter, and transform JSON data.

2\. **Basic \`jq\` Syntax and Operations**: Start with basic \`jq\` syntax and operations, as many users may be new to \`jq\`. Examples from your commands include extracting values (\`jq \'.NumberOfPass\'\`), raw string output (\`jq -r\`), and array operations (\`jq \'.\[\]\'\`).

3\. **Parsing GitHub API Responses**: Many of your commands involve parsing GitHub API responses. Include examples on how to extract specific data like repository names, pull request numbers, and tag names (e.g., \`jq \--raw-output \'.repository.name\' \$GITHUB_EVENT_PATH\`).

4\. **Manipulating and Writing JSON Data**: Show how \`jq\` can be used to modify JSON files, which is crucial in dynamic CI/CD environments. This includes setting new values, deleting keys, and merging JSON objects (e.g., \`jq \'.version = \$version\' package.json \> \"\$tmp\"\`).

5\. **Complex Filters and Queries**: Cover more complex \`jq\` queries for advanced use cases, such as filtering, mapping, and reducing JSON data. For example, extracting data based on certain conditions or iterating over arrays.

6\. **Integrating \`jq\` with Shell Commands**: Many commands show \`jq\` being used in conjunction with shell commands (\`curl\`, \`echo\`, \`sed\`, etc.). Offer guidance on how to effectively combine these tools within GitHub Actions workflows.

7\. **Error Handling and Debugging**: Include tips on handling errors in \`jq\` commands and how to debug common issues. For instance, dealing with missing or unexpected data.

8\. **Use Cases Specific to GitHub Actions**: Provide specific examples of \`jq\` use cases in GitHub Actions, like setting environment variables, extracting data from GitHub event payloads, and working with outputs from other actions.

9\. **Security and Best Practices**: Discuss best practices for using \`jq\` securely in CI/CD pipelines, especially when handling sensitive data, and how to avoid common pitfalls.

10\. **Advanced Topics**: Optionally, cover more advanced topics like writing custom functions in \`jq\` or optimizing performance for large JSON datasets.

Remember to include plenty of examples and perhaps even a troubleshooting section. This cookbook can be a practical guide for developers looking to harness the power of \`jq\` in automating and enhancing their CI/CD pipelines with GitHub Actions.

Jq is a command-line JSON parser. It is very powerful and can even parse messy JSON. However, it has a few useful features to ensure output correctness and safety. As with all commands, it has some behaviors on failure which may or may not be desirable.

Knowing about the pitfalls and workarounds allow you to use jq more robustly and avoid changing it with other commands which can cause parsing issues later on that are difficult to debug.

### Use jq -r if you don't want quotes; don't use tr -d {#use-jq--r-if-you-dont-want-quotes-dont-use-tr--d .unnumbered}

Say you have a value in a JSON string that has quotes but you want to remove the quotes. You could do:

echo \"{\\\"x\\\":\\\"3\\\"}\" \| jq .x \| tr -d \'\"\' which returns 3.

The issue is that you're assuming that the JSON will have no quoted values. For example, this returns the wrong value:

echo \"{\\\"x\\\": \\\"\\\\\\\"Three\\\\\\\"\\\" }\" \| jq .x \| tr -d \'\"\' returns \\Three\\ instead of just the word "Three" (with quotes.) This was probably not intended.

If you use -r:

echo \"{\\\"x\\\": \\\"\\\\\\\"Three\\\\\\\"\\\" }\" \| jq -r .x

The output is "Three" (with quotes) which probably was intended.

### If the JSON isn't valid, jq will stop parsing and will print incomplete output {#if-the-json-isnt-valid-jq-will-stop-parsing-and-will-print-incomplete-output .unnumbered}

Be careful when parsing documents that could be invalid JSON because jq will print the first part that parsed correctly. If you're piping it, it may appear that it was parsed in its entirety. Always check status codes to ensure that the entire JSON block was parsed.

For example, I have a JSON document with one syntactically invalid entry but several entries before it are valid.

I run jq .\[\].friends test and get:

\...

\[

{

\"id\": 0,

\"name\": \"Rosario Melendez\"

},

{

\"id\": 1,

\"name\": \"Melendez Brennan\"

},

{

\"id\": 2,

\"name\": \"Vincent Spence\"

}

\]

parse error: Expected separator between values at line 448, column 7

I get output, but that output is incomplete. Ensure you check the status code from jq (in this case it was 4.) If I stored it in a variable, I would get a string but that string would be invalid because the parsing error didn't parse the entire file. If I just checked if the variable's length wasn't zero, then I wouldn't be getting the right output.

#### Just use set -e\...right? Right? {#just-use-set--e...right-right .unnumbered}

You may think that set -e will help. It can, if the output isn't piped. If it is piped, then the receiving program could line-buffer the input and start processing it when it could be invalid or incomplete.

It's easy to test this. Simply run:

#!/bin/bash

set -e

true \| jq invalid \| echo test

echo \"I am still running\"

The output is "test" followed by "I am still running" (although some errors), even though the command jq invalid failed (because the file doesn't exist.) The script still continued to run even though one of the lines returned a failure code. Also, the exit code from the script is 0, indicating success even though it was unsuccessful.

#### Considerations {#considerations .unnumbered}

Use jq's empty filter to validate the file before parsing, or check the error code after parsing the JSON.

### Be careful with jq -r and newlines {#be-careful-with-jq--r-and-newlines .unnumbered}

Let's go back to an example file. You run cat test \| jq -c .\[\].friends and get the following output:

\[{\"id\":0,\"name\":\"Cherie\\nFrederick\"},{\"id\":1,\"name\":\"Mcclure Howell\"},{\"id\":2,\"name\":\"Skinner Leon\"}\]

\[{\"id\":0,\"name\":\"Dana Stout\"},{\"id\":1,\"name\":\"Stacy Irwin\"},{\"id\":2,\"name\":\"Everett Paul\"}\]

\[{\"id\":0,\"name\":\"Billie Douglas\"},{\"id\":1,\"name\":\"Ebony Acosta\"},{\"id\":2,\"name\":\"Hunt Strickland\"}\]

\[{\"id\":0,\"name\":\"Mcclain Roberts\"},{\"id\":1,\"name\":\"Frankie Wynn\"},{\"id\":2,\"name\":\"Mckay Sanders\"}\]

\[{\"id\":0,\"name\":\"Rosario Melendez\"},{\"id\":1,\"name\":\"Melendez Brennan\"},{\"id\":2,\"name\":\"Vincent Spence\"}\]

Each friend is on a line by themselves. This means I can loop over the lines and parse each JSON line individually, right? Well, in this example yes. If the names contain newlines, though, then you'll have broken JSON:

cat test \| jq -c .\[\].friends \| jq -r .\[\].name

**Cherie**

**Frederick**

Mcclure Howell

Skinner Leon

Dana Stout

...

Here, Cherie and Frederick are on two seperate lines. If you were to parse them, then the names wouldn't match.

#### Considerations {#considerations-1 .unnumbered}

Use jq -0 instead of -r to delimit using null characters.

### Don't quote the output yourself, use -R {#dont-quote-the-output-yourself-use--r .unnumbered}

Wrapping the output in double quotes doesn't guarantee that the characters will be escaped correctly if the input contains double quotes.

### Use -a for escaping unicode characters {#use--a-for-escaping-unicode-characters .unnumbered}

Depending on the JSON parser or other parsers in the pipeline, it might not expect non-ASCII chars.

If you are logging to a file and the logger doesn't expect UTF-8 output (and parses it as ASCII), then some characters could become corrupted.

For example,

echo \"Á\" \| jq -R yields \"Á" (with quotes.)

The -a switch changes this behavior and replaces them with escape sequences:

echo \"Á\" \| jq -a -R yields \"\\u00c1\" (with quotes.)

#### Considerations {#considerations-2 .unnumbered}

Use -a when you need unicode safety.

### Use \@filters instead of \$(\...) when concatenating strings {#use-filters-instead-of-...-when-concatenating-strings .unnumbered}

Running this command produces the right output,

echo \"{\\\"page\\\": 3}\" \| echo \"https://example.com/search?id=\$(jq .page)\" (outputs [[https://example.com/search?id=3]{.underline}](https://example.com/search?id=3)).

But it gets dangerous if the number turns into text that contains non-URI safe characters:

echo \"{\\\"page\\\": \\\"\[3-2\]\\\"}\" \| echo \"https://example.com/search?id=\$(jq .page)\" which returns [[https://example.com/search?id=\"\[3]{.underline}](https://example.com/search?id=%22%5B3)-2\]\" . If you were to pipe this URL into curl, curl interprets the square brackets as a URL range. Curl fails to download that URL with the error, "curl: (3) \[globbing\] bad range in column 26".

However, running:

echo \"{\\\"page\\\": \\\"\[3-2\]\\\"}\" \| jq \'@uri \"[[https://www.google.com/search?q=\\(.page)]{.underline}](<https://www.google.com/search?q=%5C(.page)>)\"\' which returns \"[[https://www.google.com/search?q=%5B3-2%5D]{.underline}](https://www.google.com/search?q=%5B3-2%5D)\". This is URL safe.

#### Considerations {#considerations-3 .unnumbered}

Use jq's filters when concatenating inputs from multiple sources. Look into the \@sh filter for creating shell compatible output to ensure command interoperability.

These commands are using the GitHub API to perform a variety of tasks related to repository management, such as checking for tags, retrieving release information, obtaining commit details, and more. Below is an overview of their functionalities:

1\. **Checking if a Tag Exists**: Multiple commands are designed to check if a specific tag exists in a repository. This is commonly used in CI/CD pipelines to determine if a new release or deployment should be triggered.

2\. **Fetching Release Information**: Several commands retrieve information about the latest releases of different repositories, such as the latest release tag, release ID, asset IDs, etc. This is useful for automation scripts that deploy or update software based on the latest release.

3\. **Obtaining Commit Details**: Some commands fetch details about specific commits, like the commit date, the commit message, and the commit\'s SHA. This can be used for tracking changes or automating workflows based on commit history.

4\. **Pull Request and Issue Management**: A few commands involve extracting information about pull requests and issues (like PR numbers or issue labels). This is essential for automating workflows around issue tracking and PR management.

5\. **Extracting Repository Data**: Commands are used to extract various repository data, such as the number of stars, repository description, default branch, and contributor details. Such information is often used in metrics dashboards or repository documentation.

6\. **Download URLs for Assets**: Many commands are designed to extract download URLs for specific assets from releases. This is commonly used in scripts to automatically download the latest version of a software package or tool.

7\. **Workflow Management**: Some commands focus on retrieving information about GitHub Actions workflows, like workflow IDs, run conclusions, and statuses. This aids in managing and tracking CI/CD processes.

8\. **Setting Environment Variables**: Several commands set environment variables based on data fetched from the GitHub API, such as release tags, version numbers, or asset IDs. This is a common practice in CI/CD pipelines to pass dynamic data between steps.

Overall, these commands represent a diverse set of automated tasks related to software development and deployment, leveraging GitHub as a central platform for source code management and CI/CD processes.

**[After this, here are the next sections (not finished) it will continue with the weather app And introduce more complex things such as blue-green deployments as well as advanced deployment strategies including ARM and BICEP templates, infrastructure as code, security, and everything described below.]{.mark}**
