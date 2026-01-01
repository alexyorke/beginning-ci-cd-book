**Chapter 2: Preparing the Development Environment**

**2.1 Setting Up Version Control**

Effective software development, especially within a CI/CD framework, relies heavily on robust version control practices. Version Control Systems (VCS) like Git track changes to code over time, enable collaboration among developers, and provide a history that is crucial for debugging and understanding the evolution of the software.

**2.1.1 Setting Up Developer Identity**

- Each developer should have an identity, that is, some sort of way to identify them when contributing to the repository. This normally requires creating an account for each developer, or, depending on your CI software, might be able to be linked to another identity provider. Instructions vary. The developer's identity must be set up prior to cloning the repo, otherwise, developers would not be able to clone it. This normally requires setting up SSH Keys with your CI/CD provider. Your provider will have more instructions on how to set this up.
- It is important that each developer has their own identity, because one has to be able to track their changes. This is useful for example for security purposes, and having the ability to know who to ask if more information is required on a change. It ensures only those authorized and authenticated can contribute.

**2.1.2 Get a Repository**

- This will eventually contain everything that your application needs to run. All developers must be able to access this repository. This means that the server (in this case the Git server) has to be accessible to all of the developers. If you are already working from a repository, then you can skip this step. Usually, CI/CD software will host it for you automatically, and you don't have to manage or host it, all you have to do is go through a wizard on a webpage to set one up for your project.
- Second, you will need to store all of your application code in the repository. Usually, this includes application-specific dependency specifications but does not usually include the actual dependencies themselves. It also includes application source code, configuration files, database migrations, documentation, tests, resources, localizations, etc. (everything that your application needs to run.) If your code is hosted somewhere else, then it will have to be copied to this repository and then pushed to the main branch.
- If you already have a repository, then you'll have to import it into the provider.

**2.1.3 Creating a .gitignore file**

A .gitignore file is a special file used by Git, the version control system, to determine which files and directories should be excluded (or ignored) from version control. This means that the specified files and directories will not be tracked by Git, even if they exist in your working directory.

The .gitignore file goes in the root of your repository, and is shared by all developers.

Not _all_ build artifacts are necessary to run the application, and some files are necessary but shouldn't be part of VCS because they should be injected through the environment at runtime (e.g., credentials and sensitive data.) For example, when building an application, it might produce build artifacts such as its executable or final build artifacts. These are necessary to run the application, but shouldn't be committed to version control because they are published as part of the build process. If they were part of version control, then it would be difficult to know how they were generated--were they generated on the build server, or someone's development machine? It would also make working with the repository very, very slow, as Git and other VCSes are not designed to work with large binary files. It would also take up a lot of disk space, too.

| Type of File/Folder                                     | Commonly Stored in VCS | Not Commonly Stored in VCS |
| :------------------------------------------------------ | :--------------------- | :------------------------- |
| Source Code Files                                       | Γ£ô                      |                            |
| Documentation                                           | Γ£ô                      |                            |
| Configuration Files                                     | Γ£ô                      |                            |
| Build Scripts                                           | Γ£ô                      |                            |
| Unit Test Files                                         | Γ£ô                      |                            |
| Images & Other Media (if essential to the project)      | Γ£ô                      |                            |
| Dependency Files (e.g., package.json, requirements.txt) | Γ£ô                      |                            |
| Large Binary Files (e.g., videos, large images)         |                        | Γ£ô                          |
| Generated Files (e.g., compiled binaries)               |                        | Γ£ô                          |
| Temporary Files                                         |                        | Γ£ô                          |
| User-specific Configuration                             |                        | Γ£ô                          |
| Credentials & Sensitive Data                            |                        | Γ£ô                          |
| Log Files                                               |                        | Γ£ô                          |

There are some general principles on whether to version control something or not.

- Is it reproducible and what is the effort for reproducing it? If I run the same command(s) on the same set of file(s) later on, will I get the same output/same changed state? How is it generated, is it generated via a script?
- How large are the files? Are they significantly larger than the files in the repo? Does it generate many thousands of files at once? Many tools are not designed to work with thousands or tens of thousands of changed files at once.
- Are these file(s) not meant to be shared among developers? For example, do developers gain a benefit by having these files version controlled? Should they be shared?
- Are these changes not feasible to be reviewed during code review? For example, thousands of changed files, or a binary blob could be anything. Does a criteria exist to review it or are the changes overwhelming where it is not possible to efficiently do so?
- Answering yes to all questions means that it is likely that the file(s) should not be version controlled and vice-versa.

**Example: node_modules folder**

- Is it reproducible? Yes, through package-lock.json.
- How large are the files? The node_module folder can be very large, up to 600MB. This is usually much larger than the source code in the repo.
- Are the files not meant to be shared among developers? The node_modules folder is specific to an OS and package-lock.json file. Each developer has their own node_modules folder.
- _(Conclusion: Should not be version controlled)_

**Example: source-code**

- Is it reproducible? In theory, yes but it is highly unlikely to be 100% reproducible and takes a lot of effort to reproduce. There are many ways to solve a problem, similar to writing a book. Even small variations can change program behavior.
- The files are likely to be of similar size.
- The files are meant to be shared among developers, as other developers will be working on the source code.
- The number of files is likely to be able to be modified by the programmer by working on a smaller feature. Thus, they should be able to be reviewed during code review.
- _(Conclusion: Should be version controlled)_

Link to gitignore templates: [[GitHub - github/gitignore: A collection of useful .gitignore templates]](https://github.com/github/gitignore)

**2.2 Establishing a Consistent Local Development Environment**

When you're working on multiple projects (or a single project) it can be useful to containerize your development setup. What this allows you to do is to come back to a consistent development environment, and also make sure that other people on the team have a consistent environment. The advantages here is that it can help minimize debugging time (and toil) because everything is set up exactly the way that you want it to be. Since containers are ephemeral, then any changes that you might accidentally make to the environment are not saved. This allows for faster development time, because you are able to easily start up an environment with a couple, simple commands that might have complicated instructions to set up the environment.

The best part is that it is set up the same time every time, so it is always consistent. Since it is isolated, it doesn't matter what other software is on your computer, it is isolated. This means that if you have other versions of software installed, then they won't conflict. If you know that the software dependencies are the same between your environment and CI, then you have greater confidence that your changes are correct, and match what the customers will see. This is because it is technically possible to run different versions of the software on CI and your local testing environment--it is possible that the application will still build and run fine, however, there might be strange issues that weren't covered by tests, for example.

Automate the developer environment setup with scripts or containers to save time and avoid inconsistencies. Use dev containers as much as possible.

How do you make other people use those settings/containers/dev containers to build your software? Is there a way to enforce that particular IDE extensions are installed on each developer's computer? There doesn't appear to be a way to have the extensions force-installed, but you can add them to devcontainer json and it'll prompt as recommendations.

**2.2.1 Tools for Managing Development Environments**

Setting up a local development environment can be time-consuming and challenging, especially when working on complex projects or collaborating with multiple teams. Today, there are several tools and platforms designed to streamline this process, ensuring that developers can start coding with minimal setup. Let's delve into some of these solutions.

1.  **GitHub Codespaces**:

    - **Overview**: Codespaces provides a complete, configurable dev environment on top of GitHub. It enables developers to work from anywhere, on any device, without lengthy setup.
    - **Features**:
      - **Browser-Based IDE**: Develop directly within your browser without any setup.
      - **Visual Studio Code Integration**: Offers the same features and extensions as VS Code.
      - **Customizable**: Use a `devcontainer.json` file to specify the tools, extensions, and configurations needed.
    - **Use Cases**: Ideal for open-source contributors, remote teams, or any situation where setting up a local environment might be cumbersome.
    - **Getting Started with GitHub Codespaces**:
      1.  **Prerequisites**:
          - Ensure you have a GitHub account. If not, sign up at [GitHub.com](https://github.com/).
          - Currently, GitHub Codespaces is a paid service, so you'll need to have billing set up or be part of a team that has access to Codespaces.
      2.  **Access Codespaces**:
          - Navigate to the GitHub website and sign in.
          - Once logged in, click on your profile picture in the top right corner and select "Codespaces" from the dropdown.
      3.  **Create a New Codespace**:
          - Click the "New codespace" button.
          - Choose a repository from your existing ones, or use a public repository's URL. This repository will be the base for your Codespace.
          - GitHub will prepare the Codespace and start up a virtual machine. This may take a few minutes the first time.
      4.  **Setting Up The Environment**:
          - GitHub Codespaces will attempt to automatically configure the environment based on the repository. If the repository contains a `.devcontainer/devcontainer.json` file, it will use it to configure the Codespace environment. Otherwise, it will provide a standard environment.
          - You can customize the environment by modifying the `devcontainer.json` file, allowing you to specify software, extensions, and settings for the Codespace.
      5.  **Using the Codespace**:
          - Once your Codespace is ready, it will open in the browser using the Visual Studio Code (VS Code) interface.
          - Use it just like you would use VS Code locally. You can write code, run commands in the integrated terminal, debug, use Git, and install extensions.
      6.  **Committing Changes**:
          - Make changes to your code and files as you would in a local development environment.
          - Commit your changes directly from Codespaces to the GitHub repository.
      7.  **Suspending or Deleting a Codespace**:
          - If you're done with your work session, you can close the Codespace tab. It will automatically be suspended after a period of inactivity, saving your work and state.
          - To delete a Codespace, navigate to the Codespaces section on GitHub, hover over the Codespace you want to delete, click on the "..." (more options) button, and select "Delete".
      8.  **Accessing Codespace on Different Devices**:
          - You can access your Codespace from any device with a web browser. Just navigate to GitHub, go to the Codespaces section, and select the one you wish to work on.
      9.  **Local Development** (Optional):
          - If you prefer, you can also connect to your Codespace using the local VS Code application on your machine, ensuring a seamless transition between local and cloud development.
      10. **Stay Updated**: \* As GitHub continues to refine and expand the Codespaces feature, it's a good idea to check the official documentation and GitHub blog for updates, new features, and best practices.
          Remember, while Codespaces provides a powerful cloud development environment, always be conscious of the associated costs, especially if you're working with a large team or on multiple projects.

2.  **Dev Containers**:

    - **Overview**: Development containers, or "dev containers", provide a consistent environment for development, which can be shared across a team. They're powered by Docker and can be used with platforms like Visual Studio Code.
    - **Features**:
      - **Isolated Environment**: Ensure that all developers are working within the same setup, reducing the "it works on my machine" syndrome.
      - **Reproducibility**: Easily recreate the environment, making onboarding new team members smoother.
      - **Integration with IDEs**: Visual Studio Code, for example, has a Remote - Containers extension that integrates seamlessly with dev containers.
    - **Use Cases**: Suitable for teams looking for consistency across development environments, or for projects with complex setup requirements.
    - [[Pros and cons of using devcontainers in pipelines - DEV Community]](https://dev.to/eliises/pros-and-cons-of-using-devcontainers-in-pipelines-4cld) nuanced perspective, some github actions can't run inside of the container unfortunately. Useful if you don't want to use any actions and just want to do your own thing, completely separate from github.
    - [[devcontainers/ci: A GitHub Action and Azure DevOps Task designed to simplify using Dev Containers (https://containers.dev) in CI/CD systems.]](https://github.com/devcontainers/ci) using them locally (even if they're not on the CI) is still useful, however, as it ensures consistency when developing locally. Just remember to make sure to update the workflow file when the dev container changes, maybe in the pipeline make a script that puts a comment on the PR reminding people to verify if the dev container and workflow are using the same dependencies.
    - **Getting Started with Dev Containers in VS Code**:
      Development containers in Visual Studio Code, also known as "Dev Containers," are a part of the Remote Development extension pack. They allow developers to define consistent, reproducible, and isolated development environments encapsulated within Docker containers. This ensures that everyone on the team has the same setup and tools, regardless of their local machine setup.
      1.  **Prerequisites**:
          - Install [Visual Studio Code](https://code.visualstudio.com/).
          - Install [Docker Desktop](https://www.docker.com/products/docker-desktop) and ensure it's running on your machine.
          - Inside VS Code, go to the Extensions view by clicking on the square icon in the sidebar or pressing `Ctrl+Shift+X`.
          - Search for and install the `Remote - Containers` extension.
      2.  **Open or Create a Project**:
          - Open an existing project in VS Code or create a new one.
      3.  **Add Dev Container Configuration**:
          - Press `F1` to open the command palette.
          - Type and select `Remote-Containers: Add Development Container Configuration Files...`.
          - A list of predefined container configurations will appear, based on the detected type of your project. Choose a configuration that matches your project or select a base one (like `Node.js` or `Python 3`).
          - This action will add a `.devcontainer` directory to your project with a `devcontainer.json` file (and possibly a `Dockerfile`).
      4.  **Customize the Dev Container** (Optional):
          - Edit the `Dockerfile` if you want to customize the container's base image, install additional software, or change settings.
          - Modify the `devcontainer.json` to adjust various settings like forwarded ports, mount points, extensions to be installed, etc.
      5.  **Open Project in Dev Container**:
          - Press `F1` to open the command palette again.
          - Type and select `Remote-Containers: Reopen in Container`.
          - VS Code will build the Docker image (this might take some time during the first run), start a container, and then reopen your project inside the container.
      6.  **Develop Inside the Container**:
          - Once inside, you can code, run, debug, and use the terminal just like you would locally. Any tools, SDKs, or configurations you defined for the container are immediately available.
          - Extensions defined in `devcontainer.json` are installed within the container, ensuring everyone on the team has the same development setup.
      7.  **Managing the Container**:
          - To stop or start the Dev Container, use the `Remote-Containers: Stop Container` and `Remote-Containers: Start Container` commands from the command palette.
          - If you make changes to the `Dockerfile` or `devcontainer.json`, use the `Remote-Containers: Rebuild Container` command to apply them.
      8.  **Returning to Local Development**:
          - To go back to local development, click on the green remote indicator in the bottom left corner and select `Close Remote Connection`.
      9.  **Sharing the Setup**:
          - Commit the `.devcontainer` directory to your version control system (e.g., git). This allows other team members to check out the project and immediately get the same development environment by reopening the project in a container.
      10. **Advanced Configurations**: \* As you become more familiar with Dev Containers, you can take advantage of advanced configurations like using Docker Compose to set up multi-container environments, setting post-create scripts, and more.
          By following these steps, you'll have a consistent and isolated development environment that can be shared and reproduced across your team, helping eliminate the "it works on my machine" problem.

3.  **Docker Compose**:

    - **Overview**: Docker Compose is a tool for defining and running multi-container Docker applications. Developers can use a `docker-compose.yml` file to configure application services.
    - **Features**:
      - **Multiple Services**: Easily define and run applications comprised of multiple containers.
      - **Networks and Volumes**: Create shared networks, storage volumes, and more.
      - **Easy Scaling**: Scale specific services with a single command.
    - **Use Cases**: Great for local development and testing of microservices architectures or any multi-container app.
    - **Getting Started with Docker Compose**:
      Docker Compose is a powerful tool for defining and running multi-container Docker applications. In this guide, we'll use Docker Compose to set up a simple web server as an example.
      **1. Prerequisites:**
      - Install [Docker Desktop](https://www.docker.com/products/docker-desktop) for Windows or Mac. For Linux, install Docker and Docker Compose separately.
      - Ensure Docker is running on your machine.
        **2. Create a new directory:**
      ```bash
      mkdir my-webserver && cd my-webserver
      ```
      **3. Create a Dockerfile:**
      Inside the `my-webserver` directory, create a file named `Dockerfile` with the following content to set up a basic Nginx web server:
      ```Dockerfile
      FROM nginx:alpine
      COPY ./html /usr/share/nginx/html
      ```
      **4. Create a directory for your HTML files:**
      ```bash
      mkdir html
      ```
      **5. Create a sample HTML page:**
      Inside the `html` directory, create a file named `index.html` with the following content:
      ```html
      <!DOCTYPE html>
      <html>
        <head>
          <title>My Test Server</title>
        </head>
        <body>
          <h1>Welcome to the Test Server powered by Docker Compose!</h1>
        </body>
      </html>
      ```
      **6. Create a docker-compose.yml file:**
      Inside the `my-webserver` directory, create a file named `docker-compose.yml` with the following content:
      ```yaml
      version: "3"
      services:
        webserver:
          build: .
          ports:
            - "8080:80"
      ```
      This file tells Docker Compose to build the Dockerfile in the current directory and map port 8080 on your host machine to port 80 on the container.
      **7. Build and start the services using Docker Compose:**
      In the terminal or command prompt, navigate to the `my-webserver` directory and run:
      ```bash
      docker-compose up
      ```
      This command will build the Docker image and start a container with the Nginx web server.
      **8. Access the test server:**
      Open your web browser and navigate to `http://localhost:8080`. You should see the "Welcome to the Test Server powered by Docker Compose!" message.
      **9. Stopping the test server:**
      Press `Ctrl+C` in your terminal where Docker Compose is running to stop the containers. Alternatively, you can run `docker-compose down` in another terminal window to stop and remove the containers.
      **10. Cleanup (Optional):**
      If you want to remove the built Docker images, you can do so using:
      ```bash
      docker-compose down --rmi all
      ```
      That's it! Using Docker Compose, you've set up a local test server with a basic web page. This example can be extended by adding database services, backend APIs, and other components as needed by defining them in the `docker-compose.yml` file.

4.  **Virtual Machines (VMs)**:
    - **Overview**: VMs allow developers to run another operating system within their primary OS, creating isolated environments for testing or development.
    - **Features**:
      - **Full OS Isolation**: Run multiple OS instances on a single physical machine.
      - **Snapshotting**: Save the current state and roll back to it as needed, which is useful for testing.
      - **Network Configurations**: Create complex network topologies for testing distributed systems.
    - **Use Cases**: Useful for OS-specific development, testing applications on different OS versions, or simulating production environments locally.

**Conclusion**:
The landscape of tools and platforms for setting up local development environments is diverse, catering to various needs and complexities. By choosing the right tools, developers can ensure a smooth, consistent, and efficient workflow, regardless of where they are or what device they're using.

**2.3 Choosing and Configuring Build Tools**

A fundamental prerequisite for CI/CD is the ability to build your project reliably from the command line without manual IDE interaction. This forms the basis for automated builds.

**2.3.1 Tips on Selecting Build Tools**

- **"Favor specific, portable tools over hacking"**
  - ChatGPT summary of paper explanation: "A CI bad smell arises from a sub-optimal selection of tools in the CI pipeline, which can lead to delays and force developers to adopt hacking solutions like custom shell scripts. These scripts may initially solve the problem but can later cause maintainability and portability issues. To avoid this, developers should use suitable plugins instead of shell scripts and be cautious of different versions of tools conflicting with each other on the same server."
- **"Do not use out-of-the-box tools, nor listen customers only"**
  - ChatGPT summary of paper explanation: "Proper configuration of tools is essential in software development, and using external tools with default configurations is a bad practice. Involving developers in defining quality gates is crucial, as relying solely on customer requirements may lead to irrelevant warnings and slow down the CI process. Quality gates should be established with input from both developers and customers to ensure an efficient and effective CI process."
- **Build scripts are highly dependent upon the IDE (BM2)**
  - "The two most positively assessed bad smells were related to the usage of absolute paths in the build (BM1), and the coupling between the build and the IDE (BM2). The high perceived relevance of such smells is justified considering that their presence 26 Fiorella Zampetti et al. will unavoidably limit the portability of the build resulting in statements such as "but it works on my machine"."
  - Certain IDEs install their build and compilation software in hard-coded locations that may or may not be used by the configuration files in the program. This means that other people who use different IDEs may not have those exact same paths, which makes the application IDE dependent. This can cause issues with portability, as the CI server must also be set up exactly the same, which isn't guaranteed (as the workspace folder is usually dynamic.) This can cause configuration errors.
  - Might be hard to collaborate and share configuration with others, as configuration is mixed in with personal preferences and build settings that are required for the application to run. This can also make it difficult for other people to use their IDEs.
  - If the builds are too dependent on the IDE, then it might be difficult to run them or reproduce the environment on CI. This is because the IDE may have custom settings, or special versions of software, that are specific to a single developer. Or, they may be using environment variables injected at build time that the CI does not use. This can change application behavior and make it difficult to build.

**2.3.2 Understanding IDE-Specific Build Processes**

Different IDEs manage build processes uniquely, often abstracting complex commands into user-friendly interfaces with detailed logs available for troubleshooting. For instance, Visual Studio provides build command details through its verbosity settings, while IntelliJ IDEA and Eclipse offer insights via built-in terminals and verbose output settings. Xcode allows developers to track build commands and order through the "Report Navigator."

Different Integrated Development Environments (IDEs) have varied ways of presenting build commands and the order in which they're run. Here are instructions for a couple of popular IDEs:

[[Debugging in Visual Studio Code]](https://code.visualstudio.com/docs/editor/debugging) (i.e., launch.json file)

1.  **Visual Studio (for C++/C#)**:

    - **Build Commands**: Visual Studio uses `msbuild` for building its projects. To see the exact build commands:
      1.  Go to the "Tools" menu.
      2.  Select "Options."
      3.  Navigate to "Projects and Solutions" -> "Build and Run".
      4.  In the "MSBuild project build output verbosity" dropdown, select "Detailed" or "Diagnostic" to increase the verbosity of the build output.
    - **Build Order**: The build order can also be observed in the output window when you build the solution, especially if you've set the verbosity to "Detailed" or "Normal."
      ![](./images/image45.png)
      The build log might have many things. This is normally useful for troubleshooting, it's less likely that you'll need to provide manual commands. If you have a legacy project, or it's complex, then you might need to provide custom commands.

2.  **IntelliJ IDEA (for Java)**:

    - **Build Commands**: IntelliJ IDEA uses its own builder, but you can see the build commands if you're using Maven or Gradle by looking at the output when you run the respective build lifecycle or task.
      1.  Open the "Terminal" tab (usually at the bottom).
      2.  Run your build tool command, e.g., `mvn compile` for Maven.
      3.  The executed commands will be printed in the terminal.
    - **Build Order**: If you're using a build tool like Maven, the build lifecycle phases determine the order. For a default Java project in IntelliJ, the IDE handles this, and you can infer the order by observing the messages in the "Build" tool window.

3.  **Eclipse (for Java)**:

    - **Build Commands**: Eclipse uses its own builder for Java. To see detailed build info:
      1.  Go to "Window" -> "Preferences."
      2.  Navigate to "General" -> "Workspace".
      3.  Check "Enable verbose output for the build."
    - **Build Order**: Eclipse handles the order internally for Java builds. For more detailed projects, you'd likely be using a tool like Maven, in which case the build lifecycle phases determine the order.

4.  **Xcode (for C++/Swift/Objective-C)**:

    - **Build Commands**:
      1.  Go to "Xcode" in the top menu.
      2.  Select "Preferences."
      3.  Navigate to "Locations" tab.
      4.  Set the "Derived Data" location to "Relative".
      5.  After building, in the "Report Navigator" (rightmost tab in the left pane), you can see the build logs. Click on the latest build under the "Build" section.
    - **Build Order**: This is determined by the dependencies set up in your project. You can observe this order in the build logs in the "Report Navigator" after a build.

For all these IDEs, reading the output or log pane during a build will give you a good sense of the commands executed and their sequence.

**Makefile Example**

Here's a simple makefile that demonstrates dependencies and compilation for a C program:

```makefile
main.o: main.c mathFunctions.h utilFunctions.h
    gcc -c main.c

utilFunctions.o: utilFunctions.c utilFunctions.h
    gcc -c utilFunctions.c

mathFunctions.o: mathFunctions.c mathFunctions.h
    gcc -c mathFunctions.c
```

This format allows developers to easily manage and scale complex projects with numerous dependencies. Use a makefile when building your software is complex, and you have many dependencies (e.g., C or C++) that can't be easily defined through steps or jobs.

**2.3.3 Identifying Project Type and Common Tools**

Normally, the type of project you are trying to build can be determined via a few heuristics. First, you can try using github-linguist to determine what programming languages are used in the project the most frequently. Programming languages that are commonly used help indicate which type of project it is.

- Java is code -> byte code -> run it on JVM
- Python is code -> interpreted by interpreter
- C# write code -> compile -> dll (or exe), if dll then it is included (optionally) as part of another program

```
Use github-linguist to determine what type of project you're running. A project might contain many different languages; this gives you a high level overview of where to start in terms of build script.

In this case, this is clearly a TypeScript project. It also has a packages.json file, indicating that it is an npm project.

alex@DESKTOP-7M8V9ET:/dev/shm$ github-linguist angular-cli/
94.69%  3661931 TypeScript
 2.60%   100620 Starlark
 1.36%    52459 JavaScript
 0.77%    29939 HTML
 0.33%    12624 EJS
 0.21%     8143 Shell
 0.03%     1281 jq
 0.00%      160 CSS
 0.00%       36 SCSS
```

There are many ways in which your IDE can be configured. These are the most common build tools for most projects. Consult the documentation for your IDE for more specific instructions, such as if you use special build steps or plugins.

- (Maven: [[Maven -- Introduction to the Standard Directory Layout (apache.org)]](https://maven.apache.org/guides/introduction/introduction-to-the-standard-directory-layout.html))
- (Gradle: [[Organizing Gradle Projects]](https://docs.gradle.org/current/userguide/organizing_gradle_projects.html))
- (.NET: [[samples/framework/libraries/migrate-library at main ┬╖ dotnet/samples (github.com)]](https://github.com/dotnet/samples/tree/main/framework/libraries/migrate-library/))

**2.3.4 Local vs. CI Build Commands**

Here is a table to show how you can adapt your commands that you might run in your local environment, to those on a CI.

| Language             | Local Development Command         | CI Environment Command                            | Explanation                                                                                                                                                 |
| :------------------- | :-------------------------------- | :------------------------------------------------ | :---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| JavaScript (Node.js) | `yarn install` or `npm install`   | `yarn install --frozen-lockfile` or `npm ci`      | In CI, `yarn install --frozen-lockfile` and `npm ci` ensure reproducible builds by respecting exact versions in `yarn.lock` or `package-lock.json`.         |
| Python               | `pip install -r requirements.txt` | `pip install --no-deps -r requirements.txt`       | CI might use `--no-deps` to avoid installing unnecessary dependencies, relying on an accurately populated `requirements.txt`.                               |
| Ruby                 | `bundle install`                  | `bundle install --deployment`                     | The `--deployment` flag in Bundler ensures dependencies are locked to those in `Gemfile.lock`, similar to `yarn install --frozen-lockfile` for JavaScript.  |
| Java (Maven)         | `mvn install`                     | `mvn -B package --file pom.xml`                   | In CI, Maven might use batch mode (-B) for non-interactive builds and focus on packaging (package) rather than installing (install).                        |
| Java (Gradle)        | `gradle build`                    | `gradle build -x test`                            | In CI, Gradle might skip certain tasks like testing (-x test) if the tests are run separately in the pipeline.                                              |
| Go                   | `go get ./...`                    | `go build` or `go test`                           | Locally, developers might use `go get` to fetch dependencies, but in CI, explicit build or test commands are used to ensure compilation and test execution. |
| Rust                 | `cargo build`                     | `cargo build --locked`                            | The `--locked` flag ensures that CI uses the exact versions specified in `Cargo.lock`.                                                                      |
| PHP (Composer)       | `composer install`                | `composer install --no-interaction --prefer-dist` | CI environments use flags like `--no-interaction` and `--prefer-dist` for non-interactive installs and to prefer distribution packages.                     |

**2.4 Dependency Management**

Proper dependency management is crucial for stable and reproducible builds.

- **Inventory Dependencies:** Inventory all dependencies.
- **Explicit Versioning:** Explicitly show versions in the code to ensure build consistency. Explicit versioning is crucial because relying on the latest version of a package can introduce unforeseen breakages, making debugging and historical comparisons difficult. Always specify the version of your libraries to ensure consistency across development environments. [[Best practices for Azure RBAC | Microsoft Learn]](https://learn.microsoft.com/en-us/azure/role-based-access-control/best-practices#only-grant-the-access-users-need) _(Note: This link seems misplaced, likely intended for the Principle of Least Privilege section elsewhere)_
- **Dependency Manifests:** Projects may have dependency manifests, which are specific to a certain programming language or project type. Check to see which file(s) exist in the root directory of your project.
- **Reproducible Builds:** Automated dependency management is needed (manual dependencies are harder to scan). [[GUAC Docs | GUAC]](https://docs.guac.sh/) [[GitHub - dotnet/reproducible-builds: Contains the DotNet.ReproducibleBuilds package]](https://github.com/dotnet/reproducible-builds) [[bmwiedemann/theunreproduciblepackage: The Unreproducible Package (github.com)]](https://github.com/bmwiedemann/theunreproduciblepackage/tree/master) [[ftp2.osuosl.org/pub/fosdem/2024/k1105/fosdem-2024-3353-reproducible-builds-the-first-ten-years.mp4]](https://ftp2.osuosl.org/pub/fosdem/2024/k1105/fosdem-2024-3353-reproducible-builds-the-first-ten-years.mp4)
- **Phantom Dependencies:** [[ftp2.osuosl.org/pub/fosdem/2024/k4401/fosdem-2024-3146-phantom-dependencies-in-python-and-what-to-do-about-them-.mp4]](https://ftp2.osuosl.org/pub/fosdem/2024/k4401/fosdem-2024-3146-phantom-dependencies-in-python-and-what-to-do-about-them-.mp4)
- **Reproducible Builds Security:** [**[31c3-6240-en-Reproducible_Builds_mp3.mp3](https://1drv.ms/u/s!AOnf7tByrSaDlRE)**](#c3-6240-en-reproducible_builds_mp3.mp3)

  - **Reproducible Builds: Closing the Trust Gap in Software Security**
    This talk, featuring Mike from the Tor Project and Seth from EFF, delves into the crucial security concept of reproducible builds and its increasing relevance in today's software landscape.
    **Key Points:**
    - **The Trust Gap:** Free software promises transparency, but verifying that a binary matches the source code relies on trust in developers and infrastructure. This trust gap exposes users to potential vulnerabilities and malicious code.
    - **Why Developers Are Targets:** Developers' computers and build servers, while often assumed secure, are attractive targets for attackers seeking to compromise widely used software and gain access to millions of machines.
    - **Reproducible Builds as a Solution:** Reproducible builds ensure that anyone can generate an identical binary from the source code, eliminating the single point of failure of the developer's machine and making it significantly harder to inject malicious code undetected.
    - **Examples & Implementations:** The talk highlights successful implementations of reproducible builds, including:
      - Tor Browser: Leveraging the Gideon system for reproducible builds across different platforms.
      - Debian: Achieving reproducible builds for a significant portion of its package repository.
      - F-Droid: Developing a verification server to enhance trust in Android packages.
    - **Addressing the Trusting Trust Attack:** Reproducible builds, combined with techniques like diverse double compilation, offer a way to mitigate the "trusting trust" attack where backdoors can be hidden in compilers and propagate through software generations.
    - **Challenges & Future Directions:**
      _ Reproducibility efforts require addressing challenges like build environment variations, timestamps, and file system inconsistencies.
      _ Ensuring software update distribution integrity is crucial and can be enhanced using technologies like blockchain and certificate transparency. * Continuous improvement and adoption of reproducible builds across the software development community are vital for a more secure and trustworthy software ecosystem.
      This talk effectively emphasizes the importance of reproducible builds for enhancing software security and encourages developers and users to champion this practice for a more trustworthy digital future.

- **Private Package Repositories:** Some commands may require access to private package repositories, such as a company-specific NPM repository. Setting this up on CI systems typically involves obtaining a Personal Access Token (PAT) specific to the CI. Once obtained, it's crucial to treat the PAT as a secret. Later in this chapter, we'll discuss the preference for using managed identities over PATs wherever possible.
- **Migrating Resources to GitHub:** When managing resources on GitHub, you have several strategies depending on your needs. For handling artifacts like packages or executables, using GitHub Packages is advisable for easier access and streamlined authentication, beneficial for both GitHub Actions and remote developers. For resources such as special servers or shared file drives typically hosted on-premises, consider using a self-hosted GitHub runner or deploying a GitHub agent on your cloud. For example, if migrating Docker images or local server packages to GitHub, the process typically involves re-tagging and pushing them to GitHub. Post-migration, setting up access for your team involves configuring authentication methods, possibly using OAuth, and managing permissions for public and private packages, which may require GitHub Enterprise for enhanced control.
- **Proxying Public Registries:** Additionally, proxying public registries like npmjs.org with your own server can provide control over package updates and enhance security by allowing you to monitor package usage and identify potentially malicious downloads, ensuring a secure development environment.

**2.4.1 Example: Creating and Publishing NPM Packages to GitHub Packages**

To create and publish a new NPM package to GitHub Artifacts (assuming you want to use GitHub Packages as your artifact repository), follow these detailed instructions. This guide will also show you how to create three versions of your package.

**Step 1: Set Up Your Project**

1.  **Create a New Directory for Your Project:**
    ```bash
    mkdir my-npm-package
    cd my-npm-package
    ```
2.  **Initialize a New NPM Package:**
    Initialize your project with `npm init`. This command will prompt you to enter several pieces of information (like the package name, version, description, etc.), or you can use `npm init -y` to accept default values.
    ```bash
    npm init -y
    ```
3.  **Create Your Package:**
    Write the code for your package. Create a new file (e.g., `index.js`) and add your code logic:

    ```javascript
    // Example function in index.js
    function greet(name) {
      return `Hello, ${name}!`;
    }

    module.exports = greet;
    ```

**Step 2: Configure GitHub Packages**

1.  **Authenticate to GitHub Packages:**
    You need to authenticate with GitHub Packages to publish your package. Create a `.npmrc` file in your project root:
    ```
    //npm.pkg.github.com/:_authToken=TOKEN
    @YOUR-USERNAME:registry=https://npm.pkg.github.com
    ```
    Replace `TOKEN` with your personal access token (PAT) from GitHub (make sure it has the appropriate scopes for package publication), and `YOUR-USERNAME` with your GitHub username.
2.  **Update `package.json`:**
    Add a `publishConfig` section to your `package.json` to specify the GitHub Packages registry:
    ```json
    "publishConfig": {
      "registry": "https://npm.pkg.github.com/@YOUR-USERNAME"
    },
    "name": "@YOUR-USERNAME/my-npm-package",
    "version": "1.0.0"
    ```
    Replace `YOUR-USERNAME` with your GitHub username.

**Step 3: Publish Your Package**

1.  **Publish the Package:**
    Ensure you are logged into NPM configured to use your GitHub token, then publish your package:
    ```bash
    npm publish
    ```
2.  **Verify Publication:**
    Check your GitHub repository under the 'Packages' section to see your newly published npm package.

**Step 4: Update and Publish New Versions**

To publish new versions of your package, you will make changes, update the version in your `package.json`, and then run `npm publish` again. Here's how to create three versions:

1.  **Version 1.1.0 (Minor Update):**
    Make some changes to your code. Then update the version in `package.json`:
    ```json
    "version": "1.1.0"
    ```
    Publish the updated version:
    ```bash
    npm publish
    ```
2.  **Version 1.1.1 (Patch Update):**
    Make minor changes or fixes. Update the version:
    ```json
    "version": "1.1.1"
    ```
    Publish the patch:
    ```bash
    npm publish
    ```
3.  **Version 2.0.0 (Major Update):**
    Make significant changes that might break backward compatibility. Update the version:
    ```json
    "version": "2.0.0"
    ```
    Publish the new major version:
    ```bash
    npm publish
    ```

How do I consume this package on GitHub on my developer's machines? They would also need to create their .npmrc file (not committed to Git) with the aforementioned content. You may not want to give all developers package publish permissions.

**2.5 Installing Software on CI Runners**

The reason why commands like `npm ci` work is because there is some software pre-installed on the runner (in this case, `ubuntu-latest`). You can find out more about which software is pre-installed here: [[runner-images/images/ubuntu/Ubuntu2204-Readme.md at main ┬╖ actions/runner-images (github.com)]](https://github.com/actions/runner-images/blob/main/images/ubuntu/Ubuntu2204-Readme.md)

When examining dependencies in our script, we need to consider npm, which is pre-installed in the "ubuntu-latest" GitHub Actions environment. However, since the ubuntu-latest image is updated periodically, the npm version may change, Addition to other pre installed packages on the runner, impacting the reproducibility of builds. If reproducibility is compromised extensively, what this means is sometimes there might be errors on the CI CD runner that may suddenly be unexpected given that there is no code changes or the results do not match what is on the developers machines, compromising its integrity and usefulness. However, on the other side, not upgrading software at all means that there is a risk that there could be security vulnerabilities. Therefore, it is important that the software is stable and consistent, but upgraded regularly. [[Updating dependencies sucks, so let's do more of that - Depfu Blog]](https://depfu.com/blog/updating-dependencies-sucks)

In scenarios where additional software or specific versions are required, installation can be managed through several methods:

1.  **Official Repositories:** Use commands like `sudo apt-get install <package>` to install software directly from Ubuntu's repositories. For specific versions, specify the version, e.g., `sudo apt-get install nodejs=16`. The advantage of this approach is that it allows for more people to review it and allows packages to remove quickly if there's malicious code, because it's part of a repository that's controlled by a very large community. Disadvantage however is if you need a more recent version then you may have to get it through alternative manners. This is because the Ubuntu repositories usually keep packages for a long time to maintain stability. `apt` packages are apparently pretty stable per release so unsure if sticking to a specific version is ok (given that it will be subsequently removed.) Perhaps [[snapshot.debian.org]](https://snapshot.debian.org/) could be useful if you were to go back in time and had to reproduce an older build for example. [[https://unix.stackexchange.com/a/544434/6737]](https://unix.stackexchange.com/a/544434/6737)
2.  **Bash|Curl Scripts:** Software can be installed via bash scripts executed with curl. However, this method poses risks such as unverified script integrity and potential partial execution, leading to unpredictable system states. This also can potentially compromise the reproducibility of your build, because it is unclear if the package maintainer will keep the scripts the same or may make modifications to it, or the script may become unavailable. In contrast with using the official repositories, the official repositories are dependent upon by many people and so the packages usually remain in the old versions for quite some time. Even back to the Ubuntu versions from 5 or 10 years ago. Unfortunately, some of the scripts may not be written with integrity in mind. It is possible for a script to be partially downloaded or potentially redirect to a malicious website and the script might or the server might time out halfway through the requests. This means that the script will be sent or potentially successful status code, but the script will not be executed in its entirety because it will be cut off. This is frequently remedied using legitimate software repositories that normally back the script in a function to make sure that partial execution is not possible. Don't use `curl | bash` because there is no trusted maintainer, the URL could redirect (or someone else can take over the domain), network connection is closed, or, it might hide its content via the user-agent check. `Invoke-WebRequest` for PS not good because it can execute javascript. [[ftp2.osuosl.org/pub/fosdem/2024/ub5230/fosdem-2024-1909-broom-not-included-curling-the-modern-way.mp4]](https://ftp2.osuosl.org/pub/fosdem/2024/ub5230/fosdem-2024-1909-broom-not-included-curling-the-modern-way.mp4)
3.  **Private Package Repositories:** These are useful when needing trust and security in your software supply chain, though they lack the broad security scanning and community oversight found in public repositories. Advantage is it's very easy to get the latest version of the software or another version by simply changing the version inside of the package string. The disadvantage is again, this is controlled by a third party, and this may not necessarily have all of the auditing requirements commonly found in large package or public package repositories. However, if you can use GPG keys, then you could have at least some semblance of security to make sure that it is published by the intended publisher. Mr. only requires trusting the GPG keys beforehand.
4.  **Docker Images:** Using docker images, either public or private, ensures a consistent environment with pre-installed software, ideal for complex dependencies or ensuring build reproducibility. The disadvantage with this approach is it can become very complicated to mimic the dependencies that your software requires. It could also be potentially difficult to upgrade some of these dependencies as a docker image is essentially a operating system whose kernel is shared by the host. This means that multiple versions of packages could coexist, or this could be a combination of state from many layers or many package revisions over time. This speaks at a stage 4 environment and we have to be careful to make sure that the same image is used locally when building software. [[ftp2.osuosl.org/pub/fosdem/2024/ub2252a/fosdem-2024-3398-modern-build-systems-for-containers.mp4]](https://ftp2.osuosl.org/pub/fosdem/2024/ub2252a/fosdem-2024-3398-modern-build-systems-for-containers.mp4)

It is also possible to bring your own environment, such as a custom Docker image, to tailor the development environment to specific needs. For some bundled software like curl or apt-get, the version is less critical, provided it is not outdated. However, the primary focus should remain on ensuring that key components in the build script are up-to-date and secure.

---

This completes Chapter 2. Ready for Chapter 3, which will likely delve into building the CI/CD pipeline itself using GitHub Actions.

Okay, let's move on to Chapter 3, focusing on designing and implementing CI/CD workflows, using GitHub Actions as the primary example.

---


