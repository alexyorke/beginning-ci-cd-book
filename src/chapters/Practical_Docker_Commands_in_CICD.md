## **Practical Docker Commands in CI/CD**

Here are practical examples of the Docker commands, incorporating best practices for CI/CD workflows:

**1. Docker Build and Push (73 instances):**

```yaml
- name: Build and Push Image
  run: |
    docker build -t registry.example.com/my-project/my-app:${{ github.sha }} .
    docker push registry.example.com/my-project/my-app:${{ github.sha }}
```

This builds an image tagged with the GitHub commit SHA for traceability and pushes it to a registry.Reason why you would watch this command is because when you push something to a registry and it's a new version for example, you have to tag the image and when you tag it and you push it then it pushes that tag and that and subsequently that docker image to the registry. So for example if you building some docker images inside of your continuous integration pipeline, you would tag the image and then push it.This also be useful for deployment for example. Echo command in this case is used to pass the password that's associated with your registry to the standard input of the docker command, and this way it makes it so that it's not it doesn't get displayed on the output, and also you're not creating these temporary files that have passwords in them, so it's only done in memory.

**2. Docker Login and Logout (13 instances):**

- name: Docker Login

run: echo "\${{ secrets.DOCKER_PASSWORD }}" \| docker login -u \${{ secrets.DOCKER_USERNAME }} \--password-stdin registry.example.com

- name: Docker Logout

if: always()

run: docker logout registry.example.com

This securely logs into the registry using secrets, and the if: always() ensures logout even if previous steps fail.

**3. Docker Run (8 instances):**

- name: Run Database

run: docker run -d -p 5432:5432 \--name my-postgres -e POSTGRES_PASSWORD=secret postgres:13

This starts a PostgreSQL database container in detached mode with specific configurations.

**4. Docker Pull (4 instances):**

- name: Pull Node.js Image

run: docker pull node:16-alpine

This pulls a specific Node.js image for use in later steps.

**5. Docker RMI (Remove Image) (3 instances):**

- name: Clean Up Images

if: always()

run: docker rmi \$(docker images -f "dangling=true" -q)

This cleans up dangling images after builds, freeing up space.

**6. Docker Start & Exec & Network Ops (4 instances):**

- name: Start Database

run: docker start my-postgres

- name: Execute Command in Container

run: docker exec my-postgres psql -U postgres -c "SELECT version();"

- name: Create Network

run: docker network create my-network

This demonstrates starting a container, running commands inside it, and managing networks.

**7. Docker Tag (2 instances):**

- name: Tag Image for Production

run: docker tag registry.example.com/my-project/my-app:\${{ github.sha }} registry.example.com/my-project/my-app:production

This creates a production tag for the latest successful build.

**8. Docker System and Info (2 instances):**

- name: System Prune

if: always()

run: docker system prune -f

- name: Docker Info

run: docker info

This cleans up unused Docker resources and displays system-wide information.

**9. Docker-compose (1 instance):**

- name: Build and Push with Compose
  run: |
    docker-compose -f docker-compose.prod.yml build
    docker-compose -f docker-compose.prod.yml push

This builds and pushes a multi-container application using docker-compose.

**10. Docker CP (Copy) (1 instance):**

- name: Copy File to Container

run: docker cp ./config.json my-container:/app/config.json

This copies a configuration file to a running container.

**11. Docker Commit (1 instance):**

- name: Commit Container Changes

run: docker commit my-container registry.example.com/my-project/modified-container:latest

This creates a new image based on the changes made to a container.

**12. Docker Inspect imagetools (1 instance):**

- name: Inspect Image

run: docker buildx imagetools inspect registry.example.com/my-project/my-app:latest

This provides details about the specified image.

**13. Docker Run Test (1 instance):**

- name: Run Tests in Container

run: docker run my-test-image npm test

This executes tests inside a container dedicated to testing.

**14. Docker Pull and Run (1 instance):**

- name: Pull and Run Migration Script

run: \|

```bash
docker pull registry.example.com/my-project/migration-tool:latest
```

```bash
docker run registry.example.com/my-project/migration-tool:latest --database my-database
```

This pulls a dedicated image and then runs a migration script with it.
