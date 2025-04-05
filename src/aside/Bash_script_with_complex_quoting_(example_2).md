## **Bash script with complex quoting (example 2)** {#bash-script-with-complex-quoting-example-2 .unnumbered}

Let\'s say you need a bash script to process a list of files, each containing a JSON object, and extract a specific value from them, while handling spaces in file names. Here\'s what it might look like:

#!/bin/bash

files=\$(find \"./data\" -name \"\*.json\")

for file in \$files; do

\# Extract the \'name\' field from the JSON using jq

name=\$(jq -r \'.name\' \"\$file\")

\# Print the filename and the extracted name

echo \"File: \'\$file\', Name: \'\$name\'\"

done

This script seems straightforward, but it has a subtle bug. If any file name contains spaces, the for loop will break, as the spaces will be interpreted as delimiters between file names.

To fix this, we need to add extra quoting:

#!/bin/bash

files=\$(find \"./data\" -name \"\*.json\" -print0 \| xargs -0 -n1 echo)

for file in \$files; do

\# Extract the \'name\' field from the JSON using jq

name=\$(jq -r \'.name\' \"\$file\")

\# Print the filename and the extracted name

echo \"File: \'\$file\', Name: \'\$name\'\"

done

We\'ve used find \... -print0 \| xargs -0 to handle spaces in file names. This solution works, but the quoting makes the script harder to read and understand. It\'s difficult to tell at a glance what each layer of quoting is doing.

Your familiarity with bash scripts. You may also choose Python as another way to do the operations, and this way it is.Slightly more difficult to hit some of the potholes that are associated with bash scripts.


