## **Practical sudo Examples in CI/CD** {#practical-sudo-examples-in-cicd .unnumbered}

Here are practical examples of how you might use sudo with common package managers in CI/CD pipelines, particularly in Ubuntu-based environments:

You want to use pseudo when you are in an environment where you need to install software. It requires super user privileges. Normally for a lot of these containers it has something called password list pseudo so you could just type sudo whatever and then you can install whatever you need to install. However sometimes it just runs as root.By default, which is not normally recommended. Sometimes there\'s some like docker security stuff or something like that, so which case you have to prefix your commands with sudo normally however.A lot of the commands that operate on the system files. For example, if you\'re installing software which installs it globally, you\'ll have to use pseudo.

**1. apt and apt-get:**

**Updating package lists:\
** - name: Update apt packages

run: sudo apt update

-   

**Installing a package:\
** - name: Install nginx

run: sudo apt install -y nginx

-   

**Removing a package:\
** - name: Remove a package

run: sudo apt remove -y package-name

-   

**Adding a new repository:\
** - name: Add Docker repository

run: \|

sudo apt-key adv \--keyserver hkp://keyserver.ubuntu.com:80 \--recv-keys 58118E89F3A912897C070ADBF76221572C52609D

echo \"deb https://apt.dockerproject.org/repo ubuntu-xenial main\" \| sudo tee /etc/apt/sources.list.d/docker.list

sudo apt update

-   

**2. pip3:**

**Installing a Python package globally (usually not recommended):\
** - name: Install requests

run: sudo pip3 install requests

-   **Note:** It\'s generally best practice to use virtual environments for Python packages within CI/CD to avoid conflicts and maintain project-specific dependencies.

**Upgrading a global Python package:\
** - name: Upgrade pip

run: sudo pip3 install \--upgrade pip

-   

**3. gem install:**

**Installing a Ruby gem globally:\
** - name: Install bundler

run: sudo gem install bundler

-   **Note:** Similar to pip, using bundler and a Gemfile to manage Ruby gems within your project is a better practice for CI/CD.

**Updating a Ruby gem:\
** - name: Update rake

run: sudo gem update rake

-   


