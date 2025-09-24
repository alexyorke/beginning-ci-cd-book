[[bmwiedemann/theunreproduciblepackage: The Unreproducible Package (github.com)]{.underline}](https://github.com/bmwiedemann/theunreproduciblepackage/tree/master)

[[ftp2.osuosl.org/pub/fosdem/2024/k1105/fosdem-2024-3353-reproducible-builds-the-first-ten-years.mp4]{.underline}](https://ftp2.osuosl.org/pub/fosdem/2024/k1105/fosdem-2024-3353-reproducible-builds-the-first-ten-years.mp4)

[[ftp2.osuosl.org/pub/fosdem/2024/k4401/fosdem-2024-3074-sharing-and-reusing-sboms-with-the-osselot-curation-database.mp4]{.underline}](https://ftp2.osuosl.org/pub/fosdem/2024/k4401/fosdem-2024-3074-sharing-and-reusing-sboms-with-the-osselot-curation-database.mp4)

[[ftp2.osuosl.org/pub/fosdem/2024/k4401/fosdem-2024-3146-phantom-dependencies-in-python-and-what-to-do-about-them-.mp4]{.underline}](https://ftp2.osuosl.org/pub/fosdem/2024/k4401/fosdem-2024-3146-phantom-dependencies-in-python-and-what-to-do-about-them-.mp4)

[[bmwiedemann/theunreproduciblepackage: The Unreproducible Package (github.com)]{.underline}](https://github.com/bmwiedemann/theunreproduciblepackage/tree/master)

https://docs.guac.sh/

## [**[31c3-6240-en-Reproducible_Builds_mp3.mp3](https://1drv.ms/u/s!AOnf7tByrSaDlRE)**](#c3-6240-en-reproducible_builds_mp3.mp3)

## **Reproducible Builds: Closing the Trust Gap in Software Security**

This talk, featuring Mike from the Tor Project and Seth from EFF, delves into the crucial security concept of reproducible builds and its increasing relevance in today's software landscape.

**Key Points:**

- **The Trust Gap:** Free software promises transparency, but verifying that a binary matches the source code relies on trust in developers and infrastructure. This trust gap exposes users to potential vulnerabilities and malicious code.

- **Why Developers Are Targets:** Developers' computers and build servers, while often assumed secure, are attractive targets for attackers seeking to compromise widely used software and gain access to millions of machines.

- **Reproducible Builds as a Solution:** Reproducible builds ensure that anyone can generate an identical binary from the source code, eliminating the single point of failure of the developer's machine and making it significantly harder to inject malicious code undetected.

- **Examples & Implementations:** The talk highlights successful implementations of reproducible builds, including:

  - **Tor Browser:** Leveraging the Gideon system for reproducible builds across different platforms.
  - **Debian:** Achieving reproducible builds for a significant portion of its package repository.
  - **F-Droid:** Developing a verification server to enhance trust in Android packages.

- **Addressing the Trusting Trust Attack:** Reproducible builds, combined with techniques like diverse double compilation, offer a way to mitigate the "trusting trust" attack where backdoors can be hidden in compilers and propagate through software generations.

- **Challenges & Future Directions:**
  - Reproducibility efforts require addressing challenges like build environment variations, timestamps, and file system inconsistencies.
  - Ensuring software update distribution integrity is crucial and can be enhanced using technologies like blockchain and certificate transparency.
  - Continuous improvement and adoption of reproducible builds across the software development community are vital for a more secure and trustworthy software ecosystem.

This talk effectively emphasizes the importance of reproducible builds for enhancing software security and encourages developers and users to champion this practice for a more trustworthy digital future.


