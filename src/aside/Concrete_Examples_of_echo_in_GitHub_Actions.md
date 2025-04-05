## **Concrete Examples of echo in GitHub Actions** {#concrete-examples-of-echo-in-github-actions .unnumbered}

Here are concrete examples for each category, incorporating the nuances of newlines (\\n) and escaping backslashes (\\\\):

**1. Printing simple messages or debug information:**

- **General greeting:**

- name: Greet

run: echo \"Hello, world!\"

- **Debug message:**

- name: Build Docker image

run: \|

echo \"Building Docker image\...\"

docker build -t my-image .

- **Warning message:**

- name: Fail Safe

if: failure()

run: echo \"This job is used to prevent the workflow to fail\...\\nSee previous steps for errors.\"

**2. Displaying values of variables and command outputs:**

- **Environment variable:**

- name: Print Version

run: echo \"Version: \$VERSION\"

- **Output of a command:**

- name: Print Timestamp

run: echo \"Current timestamp: \$(date +%FT%TZ)\"

- **GitHub context:**

- name: Print SHA

run: echo \"Commit SHA: \${{ github.sha }}\"

**3. Writing text to files or setting configuration:**

- **Appending to a configuration file:**

- name: Add Cloud Foundry repository

run: \|

echo \"deb https://packages.cloudfoundry.org/debian stable main\" \| sudo tee -a /etc/apt/sources.list.d/cloudfoundry-cli.list

sudo apt-get update

- **Writing environment variable to a file:**

- name: Set Java Home

run: echo \"JAVA_HOME_8=\$JAVA_HOME\" \>\> \$GITHUB_ENV

- **Creating a .env file:**

- name: Create .env

run: \|

echo \'DEBUG=0\' \>\> .env

echo \'API_KEY=your_api_key\' \>\> .env

**4. Setting outputs for GitHub Actions:**

- **Counting successful tests:**

- name: Run Tests

run: \|

\# Run your tests here\...

\# Output \"Yes\" for each successful test to test-output.txt

- name: Set Success Count

id: success-counter

run: echo \"::set-output name=success_count::\$(grep \"Yes\" test-output.txt \| wc -l)\"

**5. Command execution based on conditions or control flow:**

- **Conditional check with message:**

- name: Check Git Checkout

run: \|

echo \"Check we are starting with clean git checkout\"

git status -s \|\| echo \"Git checkout is not clean!\"

**6. Miscellaneous usages:**

- **Echoing a secret for Docker login:**

- name: Docker Login

run: \|

echo \${{ secrets.DOCKER_PASSWORD }} \| docker login -u \${{ secrets.DOCKER_USERNAME }} \--password-stdin

- **Generating dynamic file content:**

- name: Generate Config

run: \|

echo \"database: my_db\" \> config.txt

echo \"username: user1\" \>\> config.txt

These examples demonstrate the practical use of echo within GitHub Actions workflows, covering various scenarios like printing messages, manipulating variables, setting outputs, and writing to files. Remember to handle escaping backslashes (\\\\) appropriately when dealing with special characters or file paths.
