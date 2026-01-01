### Adapting Local Development Commands for CI Environments

Here is a table to show how you can adapt your commands that you might run in your local environment, to those on a CI.

---

**Language** **Local Development Command** **CI Environment Command** **Explanation**

---

JavaScript (Node.js) yarn install or npm install yarn install \--frozen-lockfile or npm ci In CI, yarn install \--frozen-lockfile and npm ci ensure reproducible builds by respecting exact versions in yarn.lock or package-lock.json.

Python pip install -r requirements.txt pip install \--no-deps -r requirements.txt CI might use \--no-deps to avoid installing unnecessary dependencies, relying on an accurately populated requirements.txt.

Ruby bundle install bundle install \--deployment The \--deployment flag in Bundler ensures dependencies are locked to those in Gemfile.lock, similar to yarn install \--frozen-lockfile for JavaScript.

Java (Maven) mvn install mvn -B package \--file pom.xml In CI, Maven might use batch mode (-B) for non-interactive builds and focus on packaging (package) rather than installing (install).

Java (Gradle) gradle build gradle build -x test In CI, Gradle might skip certain tasks like testing (-x test) if the tests are run separately in the pipeline.

Go go get ./\... go build or go test Locally, developers might use go get to fetch dependencies, but in CI, explicit build or test commands are used to ensure compilation and test execution.

Rust cargo build cargo build \--locked The \--locked flag ensures that CI uses the exact versions specified in Cargo.lock.

PHP (Composer) composer install composer install \--no-interaction \--prefer-dist CI environments use flags like \--no-interaction and \--prefer-dist for non-interactive installs and to prefer distribution packages.


