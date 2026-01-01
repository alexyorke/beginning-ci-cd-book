### Webhooks {#webhooks .unnumbered}

When working within an organization or individually, you're likely familiar with tools like Slack, Discord, Teams, or Azure. These can be integrated to perform tasks such as deployments directly from GitHub. To do this effectively, you can set up workflows that must be triggered remotely, often through the use of webhooks.

A webhook is an HTTP endpoint provided by GitHub that can trigger actions within your repository. These actions can be initiated by a third-party service, such as Slack, Discord, Microsoft Teams, or even Lync. Essentially, this allows you to integrate your familiar platforms directly with GitHub. For instance, you could configure Discord to allow users to click a button or send a message to a bot. This bot, in turn, would have the capability to trigger specific workflows in your repository with custom data.

One practical application of this is deploying directly through Discord. This method taps into what is known as ChatOps, which integrates operational tasks with chat applications that teams are already using daily. ChatOps facilitates real-time tracking and management of operations right within the chat environment.

For example, if a build fails, you can set up the system to automatically notify stakeholders through various channels supported by webhooks. This could include sending messages through Teams, Slack, Discord, emails, text messages, or even phone calls. Webhooks are incredibly versatile and can be configured to interact with nearly any service that accepts them, thereby enhancing the flexibility and responsiveness of your operations.

This integration ensures that stakeholders are kept informed in the most effective way possible, improving communication and response times across your projects.

### Deployment Pipeline Activation

The entire deployment pipeline can be activated by a single webhook call. However, for more complex workflows that involve multiple conditional steps, you might need to manage this process more finely. This involves using filters to selectively trigger specific steps based on certain conditions, similar to using filters in an email service to sort incoming emails.

To send a notification to Microsoft Teams when a build fails on the main branch, itΓÇÖs best to use official actions or direct HTTP requests to the Teams webhook from GitHub Actions, avoiding third-party actions unless necessary. Below is a guide on setting up a workflow using GitHub ActionsΓÇÖ native capabilities for HTTP requests.

### Step 1: Set Up Microsoft Teams Incoming Webhook

First, you need to set up an incoming webhook in Microsoft Teams:

1. Go to the channel where you want the notifications.
2. Click on the three dots (more options) and choose **Connectors**.
3. Find and configure the **Incoming Webhook**, give it a name, and copy the provided URL.

### Step 2: Create the GitHub Actions Workflow

Create a new YAML file in the `.github/workflows` directory of your repository, such as `notify_teams_on_failure.yml`. HereΓÇÖs how to configure it:

```yaml
name: Notify Teams on Build Failure

on:
  push:
    branches:
      - main

jobs:
  build-and-notify:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v2

      - name: Build project
        run: echo "Build commands go here" # Replace this with your actual build command
        id: build

      - name: Notify Teams on failure
        if: failure() # This condition makes the step run only if the previous step fails
        uses: actions/github-script@v6
        with:
          script: |
            const webhookUrl = '${{ secrets.TEAMS_WEBHOOK_URL }}';
            const message = `{
              "@type": "MessageCard",
              "@context": "http://schema.org/extensions",
              "themeColor": "0076D7",
              "summary": "Build failure notification",
              "sections": [{
                "activityTitle": "Build Failed",
                "activitySubtitle": "Build failed on the main branch",
                "facts": [{
                  "name": "Repository:",
                  "value": "${{ github.repository }}"
                }, {
                  "name": "Commit:",
                  "value": "${{ github.sha }}"
                }],
                "markdown": true
              }]
            }`;

            await axios.post(webhookUrl, JSON.parse(message), {
              headers: {
                'Content-Type': 'application/json'
              }
            });
```

### Explanation of the Workflow

- **Trigger**: The workflow is triggered by pushes to the `main` branch.
- **Jobs and Steps**:
  - **Checkout code**: Checks out your repository under `$GITHUB_WORKSPACE`, so it can access it.
  - **Build project**: Replace the echo statement with your build command. The `id: build` is for reference but not used explicitly here.
  - **Notify Teams on failure**: Uses `actions/github-script` to run JavaScript code. It makes an HTTP POST request to the Microsoft Teams webhook URL with a custom message formatted as a MessageCard.

### Setting Secrets

You should store your Microsoft Teams webhook URL securely:

1. Go to your repository on GitHub.
2. Navigate to **Settings** > **Secrets** > **New repository secret**.
3. Name it `TEAMS_WEBHOOK_URL` and paste your webhook URL as the value.

This workflow configuration ensures a Teams message is sent only when a build fails on the main branch, integrating development updates directly into your communication tools and enhancing the visibility of critical build statuses.

---

And this is a way you can trigger a workflow based on a webhook. For example, you might be in Microsoft Teams or Slack or another platform, click a button, and then the workflow will initiate. You can also pass extra information to the workflow, such as additional data you want the workflow to process. With GitHub, you can set up custom behaviors.

---

Integrating a webhook inside Discord to initiate a build to production and setting up security measures involves several steps, including configuring Discord, setting up a server to handle the webhook, and ensuring proper access controls. HereΓÇÖs a detailed guide on how to accomplish this:

### Step 1: Setting Up a Discord Bot

1. **Create a Discord Bot**:

   - Go to the Discord Developer Portal.
   - Create a new application and name it.
   - Go to the ΓÇ£BotΓÇ¥ tab and click ΓÇ£Add BotΓÇ¥.

2. **Invite the Bot to Your Server**:
   - Under the OAuth2 tab, select ΓÇ£URL GeneratorΓÇ¥.
   - Choose ΓÇ£botΓÇ¥ in scopes and select permissions (e.g., send messages, manage messages).
   - Use the generated URL to invite the bot to your Discord server.

### Step 2: Creating a Server to Handle Webhook Calls

YouΓÇÖll need a server that can receive commands from Discord and trigger actions on GitHub. This server will act as a middleman between Discord and GitHub.

**Example with Node.js and Express**:

```javascript
const express = require("express");
const axios = require("axios");
const discord = require("discord.js");
const client = new discord.Client();

const TOKEN = "YOUR_DISCORD_BOT_TOKEN";
const GITHUB_TOKEN = "YOUR_GITHUB_PERSONAL_ACCESS_TOKEN";
const GITHUB_REPO =
  "https://api.github.com/repos/yourusername/yourrepo/dispatches";

client.login(TOKEN);

client.on("message", async (message) => {
  if (message.content.startsWith("!deploy")) {
    // Security check: Ensure only authorized users can trigger
    if (!["allowed_user_id1", "allowed_user_id2"].includes(message.author.id)) {
      return message.reply("You are not authorized to initiate deployments.");
    }

    try {
      await axios.post(
        GITHUB_REPO,
        {
          event_type: "deploy-production",
        },
        {
          headers: {
            Authorization: `token ${GITHUB_TOKEN}`,
            Accept: "application/vnd.github.everest-preview+json",
          },
        }
      );

      message.channel.send("Deployment to production initiated!");
    } catch (error) {
      console.error("Failed to initiate deployment:", error);
      message.channel.send("Failed to initiate deployment.");
    }
  }
});

const app = express();
app.listen(3000, () => console.log("Server running on port 3000"));
```

### Step 3: Configuring GitHub Actions

Create a GitHub Actions workflow that listens for the `deploy-production` event.

**Example GitHub Action**:

```yaml
name: Production Deployment

on:
  repository_dispatch:
    types: [deploy-production]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v2

      - name: Deploy to production
        run: echo "Deploying to production..."
        # Add your deployment scripts here
```

### Security Considerations

1. **Token Security**: Secure your Discord bot token and GitHub personal access token. Do not hard-code them in your source code. Use environment variables or secret management tools.
2. **User Authentication**: In the script, ensure that only authorized users can trigger the deployment by checking their user IDs against a list of allowed IDs.
3. **Permissions**: Limit the botΓÇÖs permissions on Discord. Only give it necessary permissions, like reading messages and sending messages.
4. **Exposure**: By using a webhook, you expose part of your deployment process to an external platform (Discord). Make sure the communication between Discord and your server is secure, and consider using HTTPS for your server.
5. **Error Handling**: Implement robust error handling in your server script to manage failures in calling the GitHub API or handling Discord commands.

By following these steps, you can successfully integrate a webhook inside Discord to control production builds, while also keeping a check on security aspects to ensure that only authorized users can initiate these builds.

![Webhook illustration](../chapters/images/image89.png)

