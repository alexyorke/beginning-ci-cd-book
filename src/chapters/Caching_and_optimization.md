## Caching and optimization

### Introduction

#### Definition of caching

#### Benefits of using caching

- Also useful for increasing reliability of external services

- Can reduce cost (VM running time), especially if the VM is expensive as you're normally charged for runtime and not how much CPU it uses

#### When not to cache

### Setting up pipeline caching

#### Knowing your intermediate build artifacts

- How to handle different types of files and assets that need to be cached, such as build artifacts, dependencies, and test results

  - Some artifacts do and don't benefit from compression, and some compression algorithms might be more efficient for certain types of data, you'd have to experiment with them

  - Whether symlinks have to be preserved or modification dates (tar might be good in this case)

  - Consider decompression algorithms that can be streamed, so you can decompress the data while downloading

  - Some files may be large, others might be a set of small files. This will impact how the files are stored and if any preprocessing is required. For example, one tar file will probably be better to compact the data, but tarring a large file might not provide any benefits (other than to provide a container.) Some very large files may have to be downloaded quickly, so a distributed cache system could be better.

  - Some artifacts can be quickly regenerated, some might be more complex. Consider this when prioritizing the caching strategies.

  - If you're building a dependency that is used by multiple teams, then it could instead be built once and then included as a dependency (e.g., through a CDN or as-is as an artifact) and then could be cached more widely. This also means it could exist on a more permanent storage medium which could improve the performance characteristics.

#### Creating a cache

#### Uploading and downloading a cache

#### Configuring cache timeout and size

### Debugging and Troubleshooting

#### Cache metrics

- Hit rate (is my cache being used?)

- Miss rate (how often can it be used?)

- Usage/size (is it too big/small?)

- Performance/latency (is it taking forever to download?)

- Eviction rate (are items just being cached never to be used again and evicted immediately? This might not show up in the miss rate) Does the eviction policy have to change? Is there enough disk space to hold the cache?

#### Incorrect or missing cache key

- If cache string is too long, just hash it

- The cache key determines which cache should be used, so if the key is incorrect or missing, the cache won't be used or the wrong cache will be used. This can lead to slower build times or incorrect build results.

#### Caching too many or too few files

- Caching too many files can lead to slow cache retrieval times and can also cause issues when different builds use different versions of the same file. Caching too few files can cause a slower build time because files that should be cached have to be rebuilt.

#### Using an old or non-existent cache

- If the cache is not updated or invalidated when it should be, old or non-existent files can be used, leading to incorrect build results or slow build times.

- Preventing vendor lock-in

  - When you construct your workflows, you want to make sure that you can run them locally. This is important because:

    - Fast feedback loop for debugging or adding steps to the build process. This is because some parts of the CI/CD workflow are proprietary and must be run on the CI server itself. This means that one may resort to manually updating the workflow file to update it, resulting in a very slow and frustrating experience.

    - An understanding of what is happening behind the scenes when your workflow is running, and to prevent "magic". It's important to have a good understanding of the build process and what processes do what, because debugging requires extensive knowledge of the system. It is also important to ensure its correctness, because if you do not understand what the desired state is or what the program is doing, then it is not possible to verify it.

    - When you run/test software locally, then it depends on a specific environment. If your CI/CD system is too complicated, then it might mean that it is not possible to run it within any reasonable approximation locally. This means that it can be difficult to know if your software is working as intended, because the two environments are different and may introduce subtle bugs.

    - If there is too much vendor lock-in, then it might be difficult to move to a new platform in the future because it would cause the existing workflows to have to be rewritten, verified, and require additional staff training. This means that your business requirements are partially dependent on what the vendor seeks to offer, which may or may not be aligned with your business model. Therefore, it is theoretically possible to be constrained by outside limitations on which you do not have control over.

  - Some things are difficult to replicate locally, but are not impossible. For example, caching actions usually upload to a vendor-specific location that is encapsulated within a vendor's proprietary action.

  - Even if actions/workflows are open-source, ultimately they depend on the infrastructure and idioms of the infrastructure that they are implemented within.

- Other things

  - By key

    - Writing safe cache keys

    - Dependencies on package-lock.json, OS, and node and npm versions

    - Make sure to add a delimiter that isn't used by any scripts, so that values are not erroneously concatenated together and create a new cache key that may already exist. For example "3" and "39" or "33" and "9". If you use dashes then it becomes 3-39 or 33-9 but they cannot be mixed up.

    - Use a monotonically increasing number that is incremented when you want the cache to be reset

    - npm scripts may cause node_modules to not be cacheable because it can mutate it depending on the source code

    - Also, npm scripts may cause the node_modules not to be cacheable if software is installed outside of node_modules (for example, npm_config_binroot [[scripts \| npm Docs]{.underline}](https://docs.npmjs.com/cli/v9/using-npm/scripts#:~:text=Inspect%20the%20env%20to%20determine%20where%20to%20put%20things.%20For%20instance%2C%20if%20the%20npm_config_binroot%20environment%20variable%20is%20set%20to%20/home/user/bin%2C%20then%20don%27t%20try%20to%20install%20executables%20into%20/usr/local/bin.%20The%20user%20probably%20set%20it%20up%20that%20way%20for%20a%20reason).)

  - How consistent does it need to be?

    - For example, npm caches don't have to match the packages that are being installed, because it will backfill with items from the external registry. However, if the items are only being fetched from the cache, then there is a risk it could be out of date. Check the ETags of resources.

    - Checking the hash of the downloaded file can still help (even if you have to re-download it) because the downloaded file might in and of itself be an installer, so this would save on CPU time re-installing it

  - Advanced auto-expiring cache rules (TTL)

    - Expire after date

    - Expire if file matches hash

    - Expire after end of day, end of week, end of month

    - Expire after day of the week

    - Expire after X days (use X cache keys with +1 added to each of them?)

    - Expire if size of folder is too large

    - Algebra with keys (ORing, ANDing, XORing, etc.) ORing would be a cartesian product

# Appendix {#appendix .unnumbered}
