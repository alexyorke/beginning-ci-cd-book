## **Improved approach with a separate script** {#improved-approach-with-a-separate-script .unnumbered}

Let\'s create a separate script configure_configmap.sh:

#!/bin/bash

command=\"\$1\"

kubectl create configmap my-app-config \--from-literal=MY_COMMAND=\"\'\$command\'\"

kubectl apply -f deployment.yaml

Now, our GitHub Actions workflow becomes much cleaner:

name: Deploy to Kubernetes

on:

push:

branches:

- main

jobs:

deploy:

runs-on: ubuntu-latest

steps:

- name: Checkout Code

uses: actions/checkout@v3

- name: Configure ConfigMap

run: ./configure_configmap.sh \'ps -ef \| grep nginx\'

We pass the command to configure_configmap.sh as an argument, allowing us to use single quotes around it without complex escaping. This approach significantly improves the readability and maintainability of your GitHub Actions workflow.
