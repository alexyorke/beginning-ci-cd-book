## The open-core model

- [The Cathedral & the Bazaar: Musings on Linux and Open Source by an Accidental Revolutionary: Raymond, Eric: 9780596001087: Books - Amazon.ca](https://www.amazon.ca/Cathedral-Bazaar-Musings-Accidental-Revolutionary/dp/0596001088/ref=sr_1_1?crid=XCFSOMVRR5D4&keywords=The+Cathedral+%26+the+Bazaar&qid=1700097194&sprefix=the+cathedral+%26+the+bazaar%2Caps%2C120&sr=8-1)

- [Producing Open Source Software](https://cloudflare-ipfs.com/ipfs/bafykbzacedv5v4ghgwokmo2xchmi7ymhwx2qzvs275nue2prhyiksb6fbn36k?filename=Fogel%2C%20Karl%20-%20Producing%20Open%20Source%20Software_%20How%20to%20Run%20a%20Successful%20Free%20Software%20Project-O%27Reilly%20Media%2C%20Inc%20%282005_2009%29.pdf)

- I shouldn't go too much into the monetization aspect, but I can go into the release strategies and how to incorporate contributions from other developers and how to architect your software to be able to do that.

- [https://grafana.com/oss-vs-cloud/?plcmt=footer](https://grafana.com/oss-vs-cloud/?plcmt=footer)

- [Open Core Business Model (opencoreventures.com)](https://handbook.opencoreventures.com/open-core-business-model)

- You have to know a little bit about how you want your open-core application to work first. So, for example, is it just proprietary plugins or large features?

 - [Open Core Business Model (opencoreventures.com)](https://handbook.opencoreventures.com/open-core-business-model)

 - [Distribution (opencoreventures.com)](https://handbook.opencoreventures.com/distribution)

 - [Ship open source software \| Replicated](https://www.replicated.com/for-open-core)

 - [Archetypes of open-source business models \| Electronic Markets (springer.com)](https://link.springer.com/article/10.1007/s12525-022-00557-9)

 - [google/copybara: Copybara: A tool for transforming and moving code between repositories. (github.com)](https://github.com/google/copybara)

 - [Moving code between GIT repositories with Copybara (kubesimplify.com)](https://blog.kubesimplify.com/moving-code-between-git-repositories-with-copybara)

 - [github - How to track upstream using Git when forking a project? - Open Source Stack Exchange](https://opensource.stackexchange.com/questions/7625/how-to-track-upstream-using-git-when-forking-a-project?rq=1)

 - [What is the best and right way to open-source packages from a company monorepo? \| Hacker News (ycombinator.com)](https://news.ycombinator.com/item?id=23377012)

 - [Open source business models - your choices and how PostHog makes money - YouTube](https://www.youtube.com/watch?v=L1Ovbzs7vyo)

 - [Commercial Open Source Business Models: GitLab's Bet on Buyer-based Open Core - Brendan O'Leary - YouTube](https://www.youtube.com/watch?v=Xt1kY7EEXb8)

 - [What does Open Core mean? - YouTube](https://www.youtube.com/watch?v=DnjmsaAYZfc)

 - [Open Core vs Proprietary SaaS (which to bet your startup's life on?) - YouTube](https://www.youtube.com/watch?v=9Vj51JqQgzA)

 - [Releases (readme.io)](https://diffgram.readme.io/docs/releases)

 - There are many different approaches. It depends on what you are trying to build and what you are trying to do.

 - If you are planning to have 95-99% of your application open source, or maybe even 100%, and then have a few extra proprietary things that are very small, then you may consider adding them as plugins. This would require that you make the application suited to have plugins, or to add integration points to the application. Or, if your application is 100%-99% closed source, then you may just want to create a fully open source plugin. It would have no connection to the other repo, it would be as if was managed by a different company. Therefore, you would have to "release" your plugin and then test it against the private application.

 - If you're doing heavy-duty changes to the application, such as different application behaviors, features, licensing, etc. then the following approach might be more suited for what you are trying to do.

 - If all you want to do is share your code with the community, then you can do that relatively easily, just make sure that you have proper sanitization steps and you have the private things separated from the public things. This may require restructuring the application. This might miss the entire point of open core, however, as you're not allowing other people to easily contribute changes back, rather, you're just dumping code and hoping that someone figures out how to use it.

 - There is another approach which is a more integrated approach. I would recommend having a private repo with a branch called "public" that would track the public repo. The goal of open core is to not send blobs of code to the open source community without their "permission" because this is not very nice. Therefore, everything should be done by default in the public repo, unless it is specific to a private integration. This allows for other contributors to see what is going on, and to provide feedback--that is the entire point of open source.

 - When you want to test your new change against the private repo (because it has private things), you would want to somehow fetch and pull down your public branch into the private repo under (public/your-branch), and then make sure that it is merged into the private repo. Then you can do some more tests and checks to make sure everything is ok. This might be able to be automated.

 - If the private integrations are plugins, or small changes to the application, then it might make more sense to instead include a release of the public project (as an external package) into the private integration or plugin. This would make things much simpler. This would also mean that the private plugin is somewhat separated from the application, and other people (might) want to use it in the public. For example, if the private contributions are very small, then you may be able to consume it as a public package. Or, if the private integration doesn't change much and is not released too often, then you don't have to have all of the webhook things set up and instead just manually test it against whatever the public release is, and then just do fixes manually.

 - When you push to main on the public repo, it should push the entire content of its repo (assuming that the build was successful) to the public branch of the private repo. This can be done via a PAT token in GitHub secrets. This makes sure that the changes stay up-to-date.

 - When the pipeline on the PR is almost done, it can push its changes to a public-derived branch (e.g., public/your-PR) to the private repo, so that way people can check it locally against any private integrations.

 - In the public repo, you can then set up a webhook that tests the code against the proprietary integrations. What it would do, is to push the public branch to a public/your-PR branch in the private repo, call a webhook in the private repo to run the pipeline on that branch in the private repo (since it is up to date), then in the meantime, run the pipeline in the public repo, and then report the status of the private pipeline once the webhook reports a status. A pull method (i.e., from public to private) might be safer because then you don't have any possibility of the private tokens stored on your repo. You'd have to make a scheduled task in your private repo to pull in changes from the public branch, however, or have some sort of webhook maybe that would be called from the public repo to pull in the branch.

 - Another approach is to just synchronize the code in one direction, that is, if you don't have any private things, then just copy everything over to GitHub, there are lots of tasks for that. This is sort of like the "code dumping" approach and is not useful if you want to accept substantial contributions (small contributions can be upstreamed, however) because nobody is able to review the PRs for the project. If you are planning to open source your project, you have to be super, super careful and make sure that there are no secrets, and any secrets that may have existed are either removed from the history or have no use anymore (i.e., expired.)

 - Lots of considerations for dual-licensing, marketing, social-aspects as well, etc.

Yes, several of the startups listed are known for following the "Open Core" model. In the Open Core model, the core functionality of the product is open source, but additional features, often enterprise-focused, are offered under a proprietary license. Here are some of the startups from the list that are known for using the Open Core model:

1. **GitLab**:

- GitLab offers an open-source version known as GitLab Community Edition (CE), while providing additional features in its proprietary Enterprise Edition (EE).

2. **HashiCorp**:

- Known for products like Terraform, Vagrant, and Consul, HashiCorp offers core tools as open source, with additional enterprise features available in paid versions.

3. **Docker**:

- Docker, particularly known for Docker Engine and Docker Compose, follows a similar model where the core Docker software is open source, but Docker also offers Docker Enterprise for business customers with additional features.

4. **Elastic**:

- Elastic, the company behind Elasticsearch and Kibana, provides open-source versions of its products, as well as proprietary features and managed services under Elastic Cloud.

5. **MongoDB**:

- MongoDB, the NoSQL database, is available as open source, but the company also offers MongoDB Atlas, a fully managed database service with additional features.

6. **Cockroach Labs**:

- CockroachDB, their primary product, is available in an open-source version, with additional enterprise features available in their commercial offerings.

7. **Grafana Labs**:

- Grafana is an open-source monitoring solution, and Grafana Labs offers additional enterprise features and hosted Grafana as part of their commercial products.

These companies leverage the Open Core model to combine the benefits of open-source development (such as community contributions and transparency) with a sustainable revenue model through the sale of premium features and services.


