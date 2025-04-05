## **CI/CD script with complex quoting for Kubernetes deployment** {#cicd-script-with-complex-quoting-for-kubernetes-deployment .unnumbered}

Imagine you\'re deploying a web application to Kubernetes using GitHub Actions. You need to pass a complex command as an argument to kubectl to configure a ConfigMap for your application. This command includes single quotes that need to be escaped within a single-quoted string.

**Complex bash script in GitHub Actions:**

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

run: \|

kubectl create configmap my-app-config \--from-literal=MY_COMMAND=\'\'\"\'\"\'ps -ef \| grep nginx\'\"\'\"\'

kubectl apply -f deployment.yaml

The challenge lies in the kubectl create configmap command:

- We\'re using \--from-literal to set the MY_COMMAND key in the ConfigMap.

- The value of this key needs to be a shell command: ps -ef \| grep nginx

- This command needs to be enclosed in single quotes for the ConfigMap to interpret it correctly.

This leads to the same convoluted escaping we saw in the previous example: \'\"\'\"\'ps -ef \| grep nginx\'\"\'\"\'

This script is hard to read and prone to errors. Anyone trying to understand or modify this workflow would have a difficult time deciphering the quoting.
