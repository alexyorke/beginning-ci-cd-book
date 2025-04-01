## **Practical Examples of Conditional Statements in Bash (GitHub Actions)** {#practical-examples-of-conditional-statements-in-bash-github-actions .unnumbered}

Here are concrete examples of the conditional statements, written as if statements in Bash, suitable for GitHub Actions workflows:

**Theme: Conditional Flow Based on File Existence**

- **Check for docker-compose.test.yml:**

- name: Run Tests with Docker Compose

run: \|

if \[\[ -f docker-compose.test.yml && github.event_name == \'push\' \]\]; then

docker-compose -f docker-compose.test.yml up -d \--build

fi

- **Install Python dependencies if requirements.txt exists:**

- name: Install Python Dependencies

run: \|

if \[\[ -f requirements.txt \]\]; then

pip install -r requirements.txt

fi

**Theme: Conditional Flow Based on String Comparisons**

- **Set environment variable based on branch:**

- name: Set Environment

run: \|

if \[\[ github.ref == \'refs/heads/main\' \]\]; then

echo \"ENVIRONMENT=production\" \>\> \$GITHUB_ENV

fi

- **Perform release steps for tagged commits:**

- name: Create Release

run: \|

if \[\[ \"\${github.ref}\" == \"refs/tags/\"\* \]\]; then

gh release create \${{ github.ref_name }} \--generate-notes

fi

**Theme: Conditional Flow Based on Regular Expression Matches**

- **Check tag format for version:**

- name: Validate Tag

run: \|

if \[\[ ! \"\${github.ref}\" =\~ \^refs/tags/v\[0-9\]+\\.\[0-9\]+\\.\[0-9\]+\$ \]\]; then

echo \"::error::Invalid tag format. Must be vX.Y.Z\"

fi

**Theme: Error Handling and Exit Codes**

- **Proceed only if tests passed:**

- name: Run Tests

id: run-tests

run: npm test

- name: Deploy

run: \|

if \[\[ \"\${{ steps.run-tests.outcome }}\" == \"success\" \]\]; then

./deploy.sh

fi

**Explanation of && and \|\| within if Statements:**

- &&: Within an if statement, && combines two conditions. The second condition is only evaluated if the first condition is true. If both conditions are true, the entire if statement is true.

- \|\|: Within an if statement, \|\| acts as an \"or\". If either the first or the second condition is true (or both), the entire if statement is true.

**Important Note:** Remember that GitHub Actions runs scripts with the -e flag, meaning the entire script will fail if any command within it fails. So, you might want to handle potential errors within the if blocks to prevent premature workflow termination.
