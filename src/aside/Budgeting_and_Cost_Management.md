### Budgeting and cost management {#budgeting-and-cost-management .unnumbered}

![](./images/image50.png)

Make sure that your workflows don't run unnecessarily long by frequently checking how long they take. There are actions and ways to monitor typical workflow duration. It's normal for the duration to increase as the project grows because there's more code to compile.

You can also limit the total length of time on your workflow from the default 12 hours to potentially one or two hours, depending on how long they normally take. If they get stuck, you'll be wasting money.

Another approach is to set concurrency to one if the workflow might be running multiple times in the same PR, in which case there's only one job that will be used for its output. You may also want to set concurrency to one if you're doing a deployment; you don't want multiple deployments happening concurrently, which could cause a race condition.

Additionally, make sure to compress your artifacts when you upload them. Adjust the retention period so they're not retained too long or too short. For pull requests, you might retain artifacts for a day or even less. Since you get charged for storage space in GitHub Actions, be careful about what you're storing in artifacts. Anything not required for deployment should be excluded or simply logged.

If you're really running out of space and budget, you may need to remove any artifacts that haven't been deployed, but otherwise it's usually not a problem.


