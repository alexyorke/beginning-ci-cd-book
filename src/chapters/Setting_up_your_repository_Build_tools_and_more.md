## Setting up your repository: Build tools and more {#setting-up-your-repository-build-tools-and-more .unnumbered}

### Introduction {#introduction-1 .unnumbered}

Clicking \"Run\" or \"Start\" in an IDE initiates a sequence of command-line tools that compile and manage dependencies to create build artifacts, simplifying the complex process with a single button. This abstraction can obscure the specific tools used, complicating tool selection for CI/CD pipelines.

![](./images/image31.png)

![](./images/image48.png)

![](./images/image26.png)

![](./images/image18.png)

![](./images/image74.png)

![](./images/image83.png)

![](./images/image29.png)

![](./images/image21.png)

![](./images/image19.png)

![](./images/image80.png)

![](./images/image90.png)

![](./images/image17.png)

![](./images/image39.png)

![](./images/image71.png)

![](./images/image41.png)

![](./images/image9.png)

![](./images/image82.png)

![](./images/image61.png)

![](./images/image72.png)

![](./images/image63.png)

![](./images/image79.png)

![](./images/image22.png)

![](./images/image44.png)

![](./images/image85.png)

When creating a runner, typically, you would use the OS that most of your team members are using, or, the OS required to build the application

![](./images/image11.png)

The instructions that github provides is for a stateful runner, much different from the runners cloud hosted by github. You will have to use kubernetes to re-create the nodes.

Don't use curl \| bash because there is no trusted maintainer, the URL could redirect (or someone else can take over the domain), network connection is closed, or, it might hide its content via the user-agent check. Invoke-WebRequest for PS not good because it can execute javascript.

[[[About code owners - GitHub Docs]{.underline}]{.mark}](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-code-owners#codeowners-and-branch-protection)

Keep release pipeline artifacts for 30-90 days, and PR/dev pipelines for 3-7 days.

Consider turning on diagnostic logging for storage accounts and other items.

Use 2FA for everything.

Principle of least privilege. [[Best practices for Azure RBAC \| Microsoft Learn]{.underline}](https://learn.microsoft.com/en-us/azure/role-based-access-control/best-practices#only-grant-the-access-users-need)

[[GitHub - dotnet/reproducible-builds: Contains the DotNet.ReproducibleBuilds package]{.underline}](https://github.com/dotnet/reproducible-builds)

Anti-malware scanning for build artifacts

From Microsoft build tools start

https://support.microsoft.com/en-us/windows/antivirus-and-antimalware-software-faq-31f2a46e-fad6-b713-45cf-b9db579973e6#disable_def

https://securitytools.visualstudio.com/Phalanx/\_wiki/wikis/Phalanx/74/Armory

https://github.com/PyCQA/bandit

https://github.com/Microsoft/binskim

https://docs.github.com/en/code-security/code-scanning/creating-an-advanced-setup-for-code-scanning/codeql-code-scanning-for-compiled-languages

https://eng.ms/docs/products/credential-risk-exposure-defense

https://securitytools.visualstudio.com/Phalanx/\_wiki/wikis/Phalanx/756/CSRF

https://github.com/eslint/eslint

https://detekt.dev/

https://github.com/david-a-wheeler/flawfinder

https://github.com/securego/gosec

https://github.com/PowerShell/PSScriptAnalyzer

https://github.com/dotnet/roslyn-analyzers

https://github.com/spotbugs/spotbugs

https://github.com/microsoft/ApplicationInspector

From Microsoft build tools end

Table 1: The Secure Software Development Framework (SSDF) Version 1.1

+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Practices | Tasks | Notional Implementation Examples | References | |
+=======================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================+=============================================================================================================================================================================================================================================================================================================================================================+========================================================================================================================================================================================================================================================================================================================================================================================================================================+===============================================================================================================================================================================================================================================================+=================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================+
| Prepare the Organization (PO) | | | | |
+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| | **PO.1.1**: Identify and document all applicable security requirements for the organization's general software development infrastructures and processes, and maintain the requirements over time. | > **Example 1**: Define policies for securing software development infrastructures and their components, including development endpoints, throughout the SDLC and code repositoriesmaintaining that security. | [**BSAFSS**: SM.3, DE.1, IA.1, IA.2]{.mark} | [**[bsa_software_security_framework_web_final.pdf]{.underline}**](https://www.bsa.org/files/reports/bsa_software_security_framework_web_final.pdf) |
| | | > | | |
| | | > · **Example 2**: Define policies cover the entirefor securing software life cycle, including notifying users of the impending end of software supportdevelopment processes throughout the SDLC and the date of software end-of-life. | [**BSIMM**: CP1.1, CP1.3, SR1.1, SR2.2, SE1.2, SE2.6]{.mark} | [**[IoT Security Maturity Model: ISA/IEC 62443 (isagca.org)]{.underline}**](https://www.isagca.org/hubfs/2023%20ISA%20Website%20Redesigns/ISAGCA/PDFs/SMM-62443-Asset-Owner-Product-Supplier-Service_20230809.pdf) |
| | | > | | |
| | | > Use a well-known set of maintaining that security requirements as a structure or lexicon for defining the organization's requirements. This set can be mapped to, including for open-source and other third-party security requirements to which the organization is also subjectsoftware components utilized by software being developed. | [**EO14028**: 4e(ix)]{.mark} | [**[ID.GV-3: Legal and regulatory requirements regarding cybersecurity, including privacy and civil liberties obligations, are understood and managed - CSF Tools]{.underline}**](https://csf.tools/reference/nist-cybersecurity-framework/v1-1/id/id-gv/id-gv-3/) |
| | | > | | |
| | | > · **Example 3**: Review and update security requirements after each response to a vulnerability incident. | [**IEC62443**: SM-7, SM-9]{.mark} | [**[ASVS/4.0/OWASP Application Security Verification Standard 4.0.3-en.pdf at v4.0.3 · OWASP/ASVS (github.com)]{.underline}**](https://github.com/OWASP/ASVS/blob/v4.0.3/4.0/OWASP%20Application%20Security%20Verification%20Standard%204.0.3-en.pdf) |
| | | > | | |
| | | > · Conduct a periodic (typically at least annual) review of all security requirements. | [**NISTCSF**: ID.GV-3]{.mark} | [**[SAMM-v2-PDF.pdf - Google Drive]{.underline}**](https://drive.google.com/file/d/1cI3Qzfrly_X89z7StLWI5p_Jfqs0-OZv/view) |
| | | > | | |
| | | > Promptly reviewannually, or sooner if there are new requirements from internal or external requirements and updates to existing external requirements.sources, or a major security incident targeting software development infrastructure has occurred. | [**OWASPASVS**: 1.1.1]{.mark} | **SP800161 (summarized)** The text recommends enhancing supply chain cybersecurity by employing encryption, access control, identity management, and tamper detection; designing system components to be tamper-proof and to trigger notifications if compromised; and safeguarding delivery mechanisms to reduce exposure and access during transport. |
| | | > | | |
| | | > **Example 4**: Educate affected individuals on impending changes to requirements. | [**OWASPMASVS**: 1.10]{.mark} | |
| | | | | |
| | | | [**OWASPSAMM**: PC1-A, PC1-B, PC2-A]{.mark} | |
| | | | | |
| | | | **PCISSLC**: 2.1, 2.2 | |
| | | | | |
| | | | **SCFPSSD**: Planning the Implementation and Deployment of Secure Development Practices | |
| | | | | |
| | | | **SP80053**: SA-1, SA-8, SA-15, SR-3 | |
| | | | | |
| | | | **SP800160**: 3.1.2, 3.2.1, 3.2.2, 3.3.1, 3.4.2, 3.4.3 | |
| | | | | |
| | | | **SP800161**: SA-1, SA-8, SA-15, SR-3 | |
| | | | | |
| | | | **SP800181**: T0414; K0003, K0039, K0044, K0157, K0168, K0177, K0211, K0260, K0261, K0262, K0524; S0010, S0357, S0368; A0033, A0123, A0151? | |
+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| | **PO.1.2**: Identify and document all security requirements for organization-developed software to meet, and maintain the requirements over time. | > **Example 1**: Define policies that specify risk-based software architecture and design requirements, such as making code modular to facilitate code reuse and updates; isolating security components from other components during execution; avoiding undocumented commands and settings; and providing features that will aid software acquirers with the secure deployment, operation, and maintenance of the software. | **BSAFSS**: SC.1-1, SC.2, PD.1-1, PD.1-2, PD.1-3, PD.2-2, SI, PA, CS, AA, LO, EE | (**BSAFSS)** Threat modeling and zero trust, canonicalizing and validating data (especially dates), error handling, the software adheres to security best practices by avoiding hard-coded passwords, not storing secrets in the source code, using robust authentication mechanisms to prevent common security weaknesses, and managing stored sensitive information according to current best practices, following standards like ISO/IEC 9798, OWASP, and NIST. Principal of least privilege, the software implements secure logging mechanisms by documenting all critical security incidents and events, distinguishing between monitoring and auditing logs, logging all security-relevant failures with timestamps and identifying information, ensuring restricted access to logs, incorporating anti-tamper protections, avoiding the storage of sensitive data, and employing input validation and output encoding, in line with standards from SAFECode, OWASP, and CWE. The software incorporates comprehensive error and exception handling capabilities by identifying and managing both predictable and unpredictable exceptions, ensuring that error notifications do not disclose sensitive information, and maintaining functionality in a degraded state until a secure shutdown is necessary, reverting to secure default states to preserve confidentiality and integrity, guided by standards from DHS/DACS, OWASP, SAFECode, and various CWE guidelines. |
| | | > | | |
| | | > **Example 2**: Define policies that specify the security requirements for the organization's software, and verify compliance at key points in the SDLC (e.g., classes of software flaws verified by gates, responses to vulnerabilities discovered in released software). | **BSIMM**: SM1.1, SM1.4, SM2.2, CP1.1, CP1.2, CP1.3, CP2.1, CP2.3, AM1.2, SFD1.1, SFD2.1, SFD3.2, SR1.1, SR1.3, SR2.2, SR3.3, SR3.4 | BSIMM, privacy (PII of customers data), labeling private data (inventory), AM1.2 looks interesting, use pipeline templates/templates with security features built in/governance at the org level, SR1.1 looks interesting |
| | | > | | |
| | | > **Example 3**: Analyze the risk of applicable technology stacks (e.g., languages, environments, deployment models), and recommend or require the use of stacks that will reduce risk compared to others. | **EO14028**: 4e(ix) | EO14028 SBOMs and how to verify if they are actually working |
| | | > | | |
| | | > **Example 4**: Define policies that specify what needs to be archived for each software release (e.g., code, package files, third-party libraries, documentation, data inventory) and how long it needs to be retained based on the SDLC model, software end-of-life, and other factors. | **IEC62443**: SR-3, SR-4, SR-5, SD-4 | MSSDL [[Secure Platforms (microsoft.com)]{.underline}](https://www.microsoft.com/en-us/securityengineering/sdl/practices/secure-platforms) and [[SSCS (microsoft.com)]{.underline}](https://www.microsoft.com/en-us/securityengineering/sdl/practices/sscs) |
| | | > | | |
| | | > **Example 5**: Ensure that policies cover the entire software life cycle, including notifying users of the impending end of software support and the date of software end-of-life. | **ISO27034**: 7.3.2 | [[SAMM-v2-PDF.pdf - Google Drive]{.underline}](https://drive.google.com/file/d/1cI3Qzfrly_X89z7StLWI5p_Jfqs0-OZv/view) |
| | | > | | |
| | | > **Example 6**: Review all security requirements at least annually, or sooner if there are new requirements from internal or external sources, a major vulnerability is discovered in released software, or a major security incident targeting organization-developed software has occurred. | **MSSDL**: 2, 5 | [[SA-8: Security and Privacy Engineering Principles - CSF Tools]{.underline}](https://csf.tools/reference/nist-sp-800-53/r5/sa/sa-8/) |
| | | > | | |
| | | > **Example 7**: Establish and follow processes for handling requirement exception requests, including periodic reviews of all approved exceptions. | **NISTCSF**: ID.GV-3 | **SP800161** Design system components to be tamper-proof with alerts for tampering, secure delivery mechanisms to protect the supply chain, and implement robust validation processes during operation. |
| | | | | |
| | | | **OWASPMASVS**: 1.12 | **SP800181** " Knowledge of cyber attack stages (e.g., reconnaissance, scanning, enumeration, gaining access, escalation of privileges, maintaining access, network exploitation, covering tracks)." |
| | | | | |
| | | | **OWASPSAMM**: PC1-A, PC1-B, PC2-A, PC3-A, SR1-A, SR1-B, SR2-B, SA1-B, IR1-A | |
| | | | | |
| | | | **PCISSLC**: 2.1, 2.2, 2.3, 3.3 | |
| | | | | |
| | | | **SCFPSSD**: Establish Coding Standards and Conventions | |
| | | | | |
| | | | **SP80053**: SA-8, SA-8(3), SA-15, SR-3 | |
| | | | | |
| | | | **SP800160**: 3.1.2, 3.2.1, 3.3.1 | |
| | | | | |
| | | | **SP800161**: SA-8, SA-15, SR-3 | |
| | | | | |
| | | | **SP800181**: T0414; K0003, K0039, K0044, K0157, K0168, K0177, K0211, K0260, K0261, K0262, K0524; S0010, S0357, S0368; A0033, A0123, A0151 | |
+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| | **PO.1.3**: Communicate requirements to all third parties who will provide commercial software components to the organization for reuse by the organization's own software. \[Formerly PW.3.1\] | > **Example 1**: Define a core set of security requirements for software components, and include it in acquisition documents, software contracts, and other agreements with third parties. | **BSAFSS**: SM.1, SM.2, SM.2-1, SM.2-4 | BSAFSS SBOMs and test them |
| | | > | | |
| | | > **Example 2**: Define security-related criteria for selecting software; the criteria can include the third party's vulnerability disclosure program and product security incident response capabilities or the third party's adherence to organization-defined practices. | **BSIMM**: CP2.4, CP3.2, SR2.5, SR3.2 | EO14028 basically dependabot and other scanners |
| | | > | | |
| | | > **Example 3**: Require third parties to attest that their software complies with the organization's security requirements. | **EO14028**: 4e(vi), 4e(ix) | MSSDL [[Security Testing (microsoft.com)]{.underline}](https://www.microsoft.com/en-us/securityengineering/sdl/practices/security-testing) |
| | | > | | |
| | | > **Example 4**: Require third parties to provide provenance\[1\] data and integrity verification mechanisms for all components of their software. | **IDASOAR**: 19**,** 21 | SCSIC interesting [[SAFECode_Software_Integrity_Controls0610.pdf]{.underline}](https://safecode.org/publication/SAFECode_Software_Integrity_Controls0610.pdf) |
| | | > | | |
| | | > **Example 5**: Establish and follow processes to address risk when there are security requirements that third-party software components to be acquired do not meet; this should include periodic reviews of all approved exceptions to requirements. | **IEC62443**: SM-9, SM-10 | OWASPSAMM maybe doesn't have much |
| | | | | |
| | | | **MSSDL**: 7 | SCAGILE [[Practical Security Stories and Security Tasks (safecode.org)]{.underline}](https://safecode.org/publication/SAFECode_Agile_Dev_Security0712.pdf) |
| | | | | |
| | | | **NISTCSF**: ID.SC-3 | SCFPSSD [[SAFECode_TPC_Whitepaper.pdf]{.underline}](https://safecode.org/wp-content/uploads/2017/05/SAFECode_TPC_Whitepaper.pdf) interesting SBOMs may require different software because of different programming languages |
| | | | | |
| | | | **OWASPSAMM**: SR3-A | SCSIC not much new info |
| | | | | |
| | | | **SCAGILE**: Tasks Requiring the Help of Security Experts 8 | SP80053 Use work tracking software, artifacts must have unique versions, SWID tags |
| | | | | |
| | | | **SCFPSSD**: Manage Security Risk Inherent in the Use of Third-Party Components | SP800160 assess the extent you can trust the software |
| | | | | |
| | | | **SCSIC**: Vendor Sourcing Integrity Controls | SP800161 not much new info |
| | | | | |
| | | | **SP80053**: SA-4, SA-9, SA-10, SA-10(1), SA-15, SR-3, SR-4, SR-5 | SP800181 not much new info, maybe mirror for software repos? |
| | | | | |
| | | | **SP800160**: 3.1.1, 3.1.2 | |
| | | | | |
| | | | **SP800161**: SA-4, SA-9, SA-9(1), SA-9(3), SA-10, SA-10(1), SA-15, SR-3, SR-4, SR-5 | |
| | | | | |
| | | | **SP800181**: T0203, T0415; K0039; S0374; A0056, A0161 | |
+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| **Implement Roles and Responsibilities (PO.2)**: Ensure that everyone inside and outside of the organization involved in the SDLC is prepared to perform their SDLC-related roles and responsibilities throughout the SDLC. | **PO.2.1**: Create new roles and alter responsibilities for existing roles as needed to encompass all parts of the SDLC. Periodically review and maintain the defined roles and responsibilities, updating them as needed. | > **Example 1**: Define SDLC-related roles and responsibilities for all members of the software development team. | **BSAFSS**: PD.2-1, PD.2-2 | |
| | | > | | |
| | | > **Example 2**: Integrate the security roles into the software development team. | **BSIMM**: SM1.1, SM2.3, SM2.7, CR1.7 | |
| | | > | | |
| | | > **Example 3**: Define roles and responsibilities for cybersecurity staff, security champions, project managers and leads, senior management, software developers, software testers, software assurance leads and staff, product owners, operations and platform engineers, and others involved in the SDLC. | **EO14028**: 4e(ix) | |
| | | > | | |
| | | > **Example 4**: Conduct an annual review of all roles and responsibilities. | **IEC62443**: SM-2, SM-13 | |
| | | > | | |
| | | > **Example 5**: Educate affected individuals on impending changes to roles and responsibilities, and confirm that the individuals understand the changes and agree to follow them. | **NISTCSF**: ID.AM-6, ID.GV-2 | |
| | | > | | |
| | | > **Example 6**: Implement and use tools and processes to promote communication and engagement among individuals with SDLC-related roles and responsibilities, such as creating messaging channels for team discussions. | **PCISSLC**: 1.2 | |
| | | > | | |
| | | > **Example 7**: Designate a group of individuals or a team as the code owner for each project. | **SCSIC**: Vendor Software Development Integrity Controls | |
| | | | | |
| | | | **SP80053**: SA-3 | |
| | | | | |
| | | | **SP800160**: 3.2.1, 3.2.4, 3.3.1 | |
| | | | | |
| | | | **SP800161**: SA-3 | |
| | | | | |
| | | | **SP800181**: K0233 | |
+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| | **PO.2.2**: Provide role-specificbased training for all personnel with responsibilities that contribute to secure development. Periodically review personnel proficiency and role-specificbased training, and update the training as needed. | > **Example 1**: Document the desired outcomes of training for each role. | **BSAFSS**: PD.2-2 | |
| | | > | | |
| | | > **Example 2**: Define the type of training or curriculum required to achieve the desired outcome for each role. | **BSIMM**: T1.1, T1.7, T1.8, T2.5, T2.8, T2.9, T3.1, T3.2, T3.4 | |
| | | > | | |
| | | > **Example 3**: Create a training plan for each role. | **EO14028**: 4e(ix) | |
| | | > | | |
| | | > **Example 4**: Acquire or create training for each role; acquired training may need to be customized for the organization. | **IEC62443**: SM-4 | |
| | | > | | |
| | | > **Example 5**: Measure outcome performance to identify areas where changes to training may be beneficial. | **MSSDL**: 1 | |
| | | | | |
| | | | **NISTCSF**: PR.AT | |
| | | | | |
| | | | **OWASPSAMM**: EG1-A, EG2-A | |
| | | | | |
| | | | **PCISSLC**: 1.3 | |
| | | | | |
| | | | **SCAGILE**: Operational Security Tasks 14, 15; Tasks Requiring the Help of Security Experts 1 | |
| | | | | |
| | | | **SCFPSSD**: Planning the Implementation and Deployment of Secure Development Practices | |
| | | | | |
| | | | **SCSIC**: Vendor Software Development Integrity Controls | |
| | | | | |
| | | | **SP80053**: SA-8 | |
| | | | | |
| | | | **SP800160**: 3.2.4, 3.2.6 | |
| | | | | |
| | | | **SP800161**: SA-8 | |
| | | | | |
| | | | **SP800181**: OV-TEA-001, OV-TEA-002; T0030, T0073, T0320; K0204, K0208, K0220, K0226, K0243, K0245, K0252; S0100, S0101; A0004, A0057 | |
+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| | **PO.2.3**: Obtain upper management or authorizing official commitment to secure development, and convey that commitment to all with development-related roles and responsibilities. | > · Increase awareness by upper management. | **BSIMM**: SM1.3, SM2.7, CP2.5 | |
| | | > | | |
| | | > **Example 1**: Appoint a single leader or leadership team to be responsible for the entire secure software development process, including being accountable for releasing software to production and delegating responsibilities as appropriate. | **EO14028**: 4e(ix) | |
| | | > | | |
| | | > **Example 2**: Increase authorizing officials' awareness of the risks of developing software without integrating security throughout the development life cycle and the risk mitigation provided by secure development practices. | **NISTCSF**: ID.RM-1, ID.SC-1 | |
| | | > | | |
| | | > **Example 3**: Assist upper management in incorporating secure development support into their communications with personnel with development-related roles and responsibilities. | **OWASPSAMM**: SM1.A | |
| | | > | | |
| | | > **Example 4**: Educate all personnel with development-related roles and responsibilities on upper management's commitment to secure development and the importance of secure development to the organization. | **PCISSLC**: 1.1 | |
| | | | | |
| | | | **SP800181**: T0001, T0004 | |
+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| **Implement Supporting Toolchains (PO.3)**: Use automation to reduce human effort needed and improve the accuracy, consistencyreproducibility, usability, and comprehensiveness of security practices throughout the SDLC, as well as provide a way to document and demonstrate the use of these practices. Toolchains and tools may be used at different levels of the organization, such as organization-wide or project-specific, and may address a particular part of the SDLC, like a build pipeline. | **PO.3.1**: Specify which tools or tool types are tomust or should be included in each toolchain and which are mandatoryto mitigate identified risks, as well as how the toolchain components are to be integrated with each other. | > **Example 1**: Define categories of toolchains, and specify the mandatory tools or tool types to be used for each category. | **BSIMM**: CR1.4, ST1.4, ST2.5, SE2.7 | |
| | | > | | |
| | | > **Example 2**: Identify security tools to integrate into the developer toolchain. | **CNCFSSCP**: Securing Materials---Verification; Securing Build Pipelines---Verification, Automation, Secure Authentication/Access; Securing Artefacts---Verification; Securing Deployments---Verification | |
| | | > | | |
| | | > **Example 3**: Define what information is to be passed between tools and what data formats are to be used. | **EO14028**: 4e(iii), 4e(ix) | |
| | | > | | |
| | | > **Example 4**: Evaluate tools' signing capabilities to create immutable records/logs for auditability within the toolchain. | **MSSDL**: 8 | |
| | | > | | |
| | | > **Example 5**: Use automated technology for toolchain management and orchestration. | **OWASPSAMM**: IR2-B, ST2-B | |
| | | | | |
| | | | **SCAGILE**: Tasks Requiring the Help of Security Experts 9 | |
| | | | | |
| | | | **SCSIC**: Vendor Software Delivery Integrity Controls | |
| | | | | |
| | | | **SP80053**: SA-15 | |
| | | | | |
| | | | **SP800161**: SA-15 | |
| | | | | |
| | | | **SP800181**: K0013, K0178 | |
+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| | **PO.3.2**: Follow recommended security practices to deploy and configure tools, integrate them within the toolchain, operate, and maintain the individual tools and the toolchain as a wholetoolchains. | > **Example 1**: Evaluate, select, and acquire tools, and assess the security of each tool. | **BSAFSS**: DE.2 | **IR8397**: 2.2 do automated testing and static analysis |
| | | > | | |
| | | > **Example 2**: Integrate tools with other tools and existing software development processes and workflows. | **BSIMM**: SR1.1, SR1.3, SR3.4 | |
| | | > | | |
| | | > **Example 3**: Use code-based configuration for toolchains (e.g., pipelines-as-code, toolchains-as-code). | **CNCFSSCP**: Securing Build Pipelines---Verification, Automation, Controlled Environments, Secure Authentication/Access; Securing Artefacts---Verification, Automation, Controlled Environments, Encryption; Securing Deployments---Verification, Automation | |
| | | > | | |
| | | > **Example 4**: Implement the technologies and processes needed for reproducible builds. | **EO14028**: 4e(i)(F), 4e(ii), 4e(iii), 4e(v), 4e(vi), 4e(ix) | |
| | | > | | |
| | | > **Example 5**: Update, upgrade, or replace existing tools as needed to address tool vulnerabilities or add new tool capabilities. | **IEC62443**: SM-7 | |
| | | > | | |
| | | > **Example 6**: Continuously monitor tools and tool logs for potential operational and security issues, including policy violations and anomalous behavior. | **IR8397**: 2.2 | |
| | | > | | |
| | | > **Example 7**: Regularly verify the integrity and check the provenance of each tool to identify potential problems. | **OWASPASVS**: 1.14.3, 1.14.4, 14.1, 14.2 | |
| | | > | | |
| | | > **Example 8**: See PW.6 regarding compiler, interpreter, and build tools. | **OWASPMASVS**: 7.9 | |
| | | > | | |
| | | > **Example 9**: See PO.5 regarding implementing and maintaining secure environments. | **OWASPSCVS**: 3, 5 | |
| | | | | |
| | | | **SCAGILE**: Tasks Requiring the Help of Security Experts 9 | |
| | | | | |
| | | | **SCFPSSD**: Use Current Compiler and Toolchain Versions and Secure Compiler Options | |
| | | | | |
| | | | **SCSIC**: Vendor Software Delivery Integrity Controls | |
| | | | | |
| | | | **SP80053**: SA-15 | |
| | | | | |
| | | | **SP800161**: SA-15 | |
| | | | | |
| | | | **SP800181**: K0013, K0178 | |
+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| | **PO.3.3**: Configure tools to collect evidence andgenerate artifacts\[2\] of their support of secure software development practices as defined by the organization. | > **Example 1**: Use the organization's existing tooling (e.g., workflow tracking, issue tracking systems, value stream mapping) to create an audit trail of the secure development-related actions that are performed for continuous improvement purposes. | **BSAFSS**: PD.1-5 | |
| | | > | | |
| | | > **Example 2**: Determine how often the collected information should be audited, and implement the necessary processes. | **BSIMM**: SM1.4, SM3.4, SR1.3 | |
| | | > | | |
| | | > **Example 3**: Establish and enforce security and retention policies for artifact data. | **CNCFSSCP**: Securing Build Pipelines---Verification, Automation, Controlled Environments; Securing Artefacts---Verification | |
| | | | | |
| | | **Example 4**: Assign responsibility for creating any needed artifacts that tools cannot generate. | **EO14028**: 4e(i)(F), 4e(ii), 4e(v), 4e(ix) | |
| | | | | |
| | | | **IEC62443**: SM-12, SI-2 | |
| | | | | |
| | | | **MSSDL**: 8 | |
| | | | | |
| | | | **OWASPSAMM**: PC3-B | |
| | | | | |
| | | | **OWASPSCVS**: 3.13, 3.14 | |
| | | | | |
| | | | **PCISSLC**: 2.5 | |
| | | | | |
| | | | **SCAGILE**: Tasks Requiring the Help of Security Experts 9 | |
| | | | | |
| | | | **SCSIC**: Vendor Software Delivery Integrity Controls | |
| | | | | |
| | | | **SP80053**: SA-15 | |
| | | | | |
| | | | **SP800161**: SA-15 | |
| | | | | |
| | | | **SP800181**: K0013; T0024 | |
+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| **Define and Use Criteria for Software Security Checks (PO.4)**: Help ensure that the software resulting from the SDLC meets the organization's expectations by defining and using criteria for checking the software's security during development. | **PO.4.1**: Define criteria for software security checks and track throughout the SDLC. | > **Example 1**: Ensure that the criteria adequately indicate how effectively security risk is being managed. | **BSAFSS**: TV.2-1, TV.5-1 | |
| | | > | | |
| | | > **Example 2**: Define key performance indicators (KPIs), key risk indicators (KRIs), vulnerability severity scores, and other measures for software security. | **BSIMM**: SM1.4, SM2.1, SM2.2, SM2.6, SM3.3, CP2.2 | |
| | | > | | |
| | | > **Example 3**: Add software security criteria to existing checks (e.g., the Definition of Done in agile SDLC methodologies). | **EO14028**: 4e(iv), 4e(v), 4e(ix) | |
| | | > | | |
| | | > **Example 4**: Review the artifacts generated as part of the software development workflow system to determine if they meet the criteria. | **IEC62443**: SI-1, SI-2, SVV-3 | |
| | | > | | |
| | | > **Example 5:** Record security check approvals, rejections, and requests for exception requests as part of the workflow and tracking system. | **ISO27034**: 7.3.5 | |
| | | > | | |
| | | > **Example 6**: Analyze collected data in the context of the security successes and failures of each development project, and use the results to improve the SDLC. | **MSSDL**: 3 | |
| | | | | |
| | | | **OWASPSAMM**: PC3-A, DR3-B, IR3-B, ST3-B | |
| | | | | |
| | | | **PCISSLC**: 3.3 | |
| | | | | |
| | | | **SP80053**: SA-15, SA-15(1) | |
| | | | | |
| | | | **SP800160**: 3.2.1, 3.2.5, 3.3.1 | |
| | | | | |
| | | | **SP800161**: SA-15, SA-15(1) | |
| | | | | |
| | | | **SP800181**: K0153, K0165 | |
+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| | **PO.4.2**: Implement processes, mechanisms, etc. to gather and safeguard the necessary information in support of the criteria. | > **Example 1**: Use the toolchain to automatically gather information that informs security decision-making. | **BSAFSS**: PD.1-4, PD.1-5 | |
| | | > | | |
| | | > **Example 2**: Deploy additional tools if needed to support the generation and collection of information supporting the criteria. | **BSIMM**: SM1.4, SM2.1, SM2.2, SM3.4 | |
| | | > | | |
| | | > **Example 3**: Automate decision-making processes utilizing the criteria, and periodically review these processes. | **EO14028**: 4e(iv), 4e(v), 4e(ix) | |
| | | | | |
| | | **Example 4**: Only allow authorized personnel to access the gathered information, and prevent any alteration or deletion of the information. | **IEC62443**: SI-1, SVV-1, SVV-2, SVV-3, SVV-4 | |
| | | | | |
| | | | **OWASPSAMM**: PC3-B | |
| | | | | |
| | | | **PCISSLC**: 2.5 | |
| | | | | |
| | | | **SCSIC**: Vendor Software Delivery Integrity Controls | |
| | | | | |
| | | | **SP80053**: SA-15, SA-15(1), SA-15(11) | |
| | | | | |
| | | | **SP800160**: 3.2.5, 3.3.7 | |
| | | | | |
| | | | **SP800161**: SA-15, SA-15(1), SA-15(11) | |
| | | | | |
| | | | **SP800181**: T0349; K0153 | |
+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| **Implement and Maintain Secure Environments for Software Development (PO.5)**: Ensure that all components of the environments for software development are strongly protected from internal and external threats to prevent compromises of the environments or the software being developed or maintained within them. Examples of environments for software development include development, build, test, and distribution environments. | **PO.5.1**: Separate and protect each environment involved in software development. | > **Example 1**: Use multi-factor, risk-based authentication and conditional access for each environment. | **BSAFSS**: DE.1, IA.1, IA.2 | |
| | | > | | |
| | | > **Example 2**: Use network segmentation and access controls to separate the environments from each other and from production environments, and to separate components from each other within each non-production environment, in order to reduce attack surfaces and attackers' lateral movement and privilege/access escalation. | **CNCFSSCP**: Securing Build Pipelines---Controlled Environments | |
| | | > | | |
| | | > **Example 3**: Enforce authentication and tightly restrict connections entering and exiting each software development environment, including minimizing access to the internet to only what is necessary. | **EO14028**: 4e(i)(A), 4e(i)(B), 4e(i)(C), 4e(i)(D), 4e(i)(F), 4e(ii), 4e(iii), 4e(v), 4e(vi), 4e(ix) | |
| | | > | | |
| | | > **Example 4**: Minimize direct human access to toolchain systems, such as build services. Continuously monitor and audit all access attempts and all use of privileged access. | **IEC62443**: SM-7 | |
| | | > | | |
| | | > **Example 5**: Minimize the use of production-environment software and services from non-production environments. | **NISTCSF**: PR.AC-5, PR.DS-7 | |
| | | > | | |
| | | > **Example 6**: Regularly log, monitor, and audit trust relationships for authorization and access between the environments and between the components within each environment. | **SCAGILE**: Tasks Requiring the Help of Security Experts 11 | |
| | | > | | |
| | | > **Example 7**: Continuously log and monitor operations and alerts across all components of the development environment to detect, respond, and recover from attempted and actual cyber incidents. | **SCSIC**: Vendor Software Delivery Integrity Controls | |
| | | > | | |
| | | > **Example 8**: Configure security controls and other tools involved in separating and protecting the environments to generate artifacts for their activities. | **SP80053**: SA-3(1), SA-8, SA-15 | |
| | | > | | |
| | | > **Example 9**: Continuously monitor all software deployed in each environment for new vulnerabilities, and respond to vulnerabilities appropriately following a risk-based approach. | **SP800161**: SA-3, SA-8, SA-15 | |
| | | > | | |
| | | > **Example 10**: Configure and implement measures to secure the environments' hosting infrastructures following a zero trust architecture\[3\]. | **SP800181**: OM-NET-001, SP-SYS-001; T0019, T0023, T0144, T0160, T0262, T0438, T0484, T0485, T0553; K0001, K0005, K0007, K0033, K0049, K0056, K0061, K0071, K0104, K0112, K0179, K0326, K0487; S0007, S0084, S0121; A0048 | |
+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| | **PO.5.2**: Secure and harden development endpoints (i.e., endpoints for software designers, developers, testers, builders, etc.) to perform development-related tasks using a risk-based approach. | > **Example 1**: Configure each development endpoint based on approved hardening guides, checklists, etc.; for example, enable FIPS-compliant encryption of all sensitive data at rest and in transit. | **BSAFSS**: DE.1-1, IA.1, IA.2 | |
| | | > | | |
| | | > **Example 2**: Configure each development endpoint and the development resources to provide the least functionality needed by users and services and to enforce the principle of least privilege. | **EO14028**: 4e(i)(C), 4e(i)(E), 4e(i)(F), 4e(ii), 4e(iii), 4e(v), 4e(vi), 4e(ix) | |
| | | > | | |
| | | > **Example 3**: Continuously monitor the security posture of all development endpoints, including monitoring and auditing all use of privileged access. | **IEC62443**: SM-7 | |
| | | > | | |
| | | > **Example 4**: Configure security controls and other tools involved in securing and hardening development endpoints to generate artifacts for their activities. | **NISTCSF**: PR.AC-4, PR.AC-7, PR.IP-1, PR.IP-3, PR.IP-12, PR.PT-1, PR.PT-3, DE.CM | |
| | | > | | |
| | | > **Example 5**: Require multi-factor authentication for all access to development endpoints and development resources. | **SCAGILE**: Tasks Requiring the Help of Security Experts 11 | |
| | | > | | |
| | | > **Example 6**: Provide dedicated development endpoints on non-production networks for performing all development-related tasks. Provide separate endpoints on production networks for all other tasks. | **SCSIC**: Vendor Software Delivery Integrity Controls | |
| | | > | | |
| | | > **Example 7**: Configure each development endpoint following a zero trust architecture. | **SP80053**: SA-15 | |
| | | | | |
| | | | **SP800161**: SA-15 | |
| | | | | |
| | | | **SP800181**: OM-ADM-001, SP-SYS-001; T0484, T0485, T0489, T0553; K0005, K0007, K0077, K0088, K0130, K0167, K0205, K0275; S0076, S0097, S0121, S0158; A0155 | |
+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| > **Protect Software (PS)** | | | | |
+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| **Protect All Forms of Code from Unauthorized Access and Tampering (PS.1)**: Help prevent unauthorized changes to code, both inadvertent and intentional, which could circumvent or negate the intended security characteristics of the software. For code that is not intended to be publicly accessible, this helps prevent theft of the software and may make it more difficult or time-consuming for attackers to find vulnerabilities in the software. | **PS.1.1**: Store all forms of code -- including source code, executable code, and configuration-as-code -- based on the principle of least privilege so that only authorized personnel, tools, services, etc. have the necessary forms of access. | > **Example 1**: Store all source code and configuration-as-code in a code repository, and restrict access to it based on the nature of the code. For example, someopen-source code may be intended for public access may need its integrity and availability protected; other code may also need its confidentiality protected. | **BSAFSS**: IA.1, IA.2, SM.4-1, DE.1-2 | |
| | | > | | |
| | | > **Example 2**: Use version control features of the repository to track all changes made to the code with accountability to the individual developer account. | **BSIMM**: SE2.4 | |
| | | > | | |
| | | > **Example 3**: Use commit signing for code repositories. | **CNCFSSCP**: Securing the Source Code---Verification, Automation, Controlled Environments, Secure Authentication; Securing Materials---Automation | |
| | | > | | |
| | | > **Example 4**: Have the code owner review and approve all changes made to the code by others. | **EO14028**: 4e(iii), 4e(iv), 4e(ix) | |
| | | > | | |
| | | > **Example 5**: Use code signing\[4\] to help protect the integrity and provenance of executables. | **IDASOAR**: Fact Sheet 25 | |
| | | > | | |
| | | > **Example 6**: Use cryptography (e.g., cryptographic hashes) to help protect file integrity Create and maintain a software bill of materials (SBOM) for each software package created. | **IEC62443**: SM-6, SM-7, SM-8 | |
| | | | | |
| | | | **NISTCSF**: PR.AC-4, PR.DS-6, PR.IP-3 | |
| | | | | |
| | | | **OWASPASVS**: 1.10, 10.3.2 | |
| | | | | |
| | | | **OWASPMASVS**: 7.1 | |
| | | | | |
| | | | **OWASPSAMM**: OE3-B | |
| | | | | |
| | | | **PCISSLC**: 5.1, 6.1 | |
| | | | | |
| | | | **SCSIC**: Vendor Software Delivery Integrity Controls, Vendor Software Development Integrity Controls | |
| | | | | |
| | | | **SP80053**: SA-10 | |
| | | | | |
| | | | **SP800161**: SA-8, SA-10 | |
+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| **Provide a Mechanism for Verifying Software Release Integrity (PS.2)**: Help software acquirers ensure that the software they acquire is legitimate and has not been tampered with. | **PS.2.1**: Make software integrity verification information available to software acquirers. | > **Example 1**: Post cryptographic hashes for release files on a well-secured website. | **BSAFSS**: SM.4, SM.5, SM.6 | |
| | | > | | |
| | | > **Example 2**: Use an established certificate authority for code signing so consumersthat consumers' operating systems or other tools and services can confirm the validity of signatures before use. | **BSIMM**: SE2.4 | |
| | | > | | |
| | | > **Example 3**: Periodically review the code signing processes, including certificate renewal, rotation, revocation, and protection. | **CNCFSSCP**: Securing Deployments---Verification | |
| | | | | |
| | | | **EO14028**: 4e(iii), 4e(ix), 4e(x) | |
| | | | | |
| | | | **IEC62443**: SM-6, SM-8, SUM-4 | |
| | | | | |
| | | | **NISTCSF**: PR.DS-6 | |
| | | | | |
| | | | **NISTLABEL**: 2.2.2.4 | |
| | | | | |
| | | | **OWASPSAMM**: OE3-B | |
| | | | | |
| | | | **OWASPSCVS**: 4 | |
| | | | | |
| | | | **PCISSLC**: 6.1, 6.2 | |
| | | | | |
| | | | **SCSIC**: Vendor Software Delivery Integrity Controls | |
| | | | | |
| | | | **SP80053**: SA-8 | |
| | | | | |
| | | | **SP800161**: SA-8 | |
| | | | | |
| | | | **SP800181**: K0178 | |
+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| **Archive and Protect Each Software Release (PS.3)**: Preserve software releases in order to help identify, analyze, and eliminate vulnerabilities discovered in the software after release. | **PS.3.1**: Securely archive a copy of each releasethe necessary files and all of its componentssupporting data (e.g., code, package files, third-party libraries, documentation), and release integrity verification information, provenance data) to be retained for each software release. | > **Example 1**: Store the release files in a repository, and restrict, associated images, etc. in repositories following the organization's established policy. Allow read-only access to them by necessary personnel and no access by anyone else. | **BSAFSS**: PD.1-5, DE.1-2, IA.2 | |
| | | > | | |
| | | > **Example 2**: Store and protect release integrity verification information and provenance data, such as by keeping it in a separate location from the release files or by signing the data. | **CNCFSSCP**: Securing Artefacts---Automation, Controlled Environments, Encryption; Securing Deployments---Verification | |
| | | | | |
| | | | **EO14028**: 4e(iii), 4e(vi), 4e(ix), 4e(x) | |
| | | | | |
| | | | **IDASOAR**: 25 | |
| | | | | |
| | | | **IEC62443**: SM-6, SM-7 | |
| | | | | |
| | | | **NISTCSF**: PR.IP-4 | |
| | | | | |
| | | | **OWASPSCVS**: 1, 3.18, 3.19, 6.3 | |
| | | | | |
| | | | **PCISSLC**: 5.2, 6.1, 6.2 | |
| | | | | |
| | | | **SCSIC**: Vendor Software Delivery Integrity Controls | |
| | | | | |
| | | | **SP80053**: SA-10, SA-15, SA-15(11), SR-4 | |
| | | | | |
| | | | **SP800161**: SA-8, SA-10, SA-15(11), SR-4 | |
+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| | **PS.3.2**: Collect, safeguard, maintain, and share provenance data for all components of each software release (e.g., in a software bill of materials \[SBOM\]). | > **Example 1**: Make the provenance data available to software acquirers in accordance with the organization's policies, preferably using standards-based formats. | **BSAFSS**: SM.2 | |
| | | > | | |
| | | > **Example 2**: Make the provenance data available to the organization's operations and response teams to aid them in mitigating software vulnerabilities. | **BSIMM**: SE3.6 | |
| | | > | | |
| | | > **Example 3**: Protect the integrity of provenance data, and provide a way for recipients to verify provenance data integrity. | **CNCFSSCP**: Securing Materials---Verification, Automation | |
| | | > | | |
| | | > **Example 4**: Update the provenance data every time any of the software's components are updated. | **EO14028**: 4e(vi), 4e(vii), 4e(ix), 4e(x) | |
| | | | | |
| | | | **NTIASBOM**: All | |
| | | | | |
| | | | **OWASPSCVS**: 1.4, 2 | |
| | | | | |
| | | | **SCSIC**: Vendor Software Delivery Integrity Controls | |
| | | | | |
| | | | **SCTPC**: MAINTAIN3 | |
| | | | | |
| | | | **SP80053**: SA-8, SR-3, SR-4 | |
| | | | | |
| | | | **SP800161**: SA-8, SR-3, SR-4 | |
+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| **Produce Well-Secured Software (PW)** | | | | |
+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| **Design Software to Meet Security Requirements and Mitigate Security Risks (PW.1)**: Identify and evaluate the applicable security requirements for the software's designsoftware; determine what security risks the software is likely to face during production operation and how those risks should be mitigated by the software's design and architecture should mitigate those risks; and justify any cases where risk-based decisions concludeanalysis indicates that security requirements should be relaxed or waived. Addressing security requirements and risks during software design (secure by design) helps to makeis key for improving software security and also helps improve development more efficientefficiency. | **PW.1.1**: Use forms of risk modeling -- such as threat modeling, attack modeling, or attack surface mapping -- to help assess the security risk for the software. | > **Example 1**: Train the development team (security champions, in particular) or collaborate with a risk modeling expert to create threat models and attack models and to analyze how to use a risk-based approach to addresscommunicate the risks and determine how to address them, including implementing mitigations. | **BSAFSS**: SC.1 | |
| | | > | | |
| | | > **Example 2**: Perform more rigorous assessments for high-risk areas, such as protecting sensitive data and safeguarding identification, authentication, and access control, including credential management. | **BSIMM**: AM1.2, AM1.3, AM1.5, AM2.1, AM2.2, AM2.5, AM2.6, AM2.7, SFD2.2, AA1.1, AA1.2, AA1.3, AA2.1 | |
| | | > | | |
| | | > **Example 3**: Review vulnerability reports and statistics for previous software to inform the security risk assessment. | **EO14028**: 4e(ix) | |
| | | > | | |
| | | > **Example 4**: Use data classification methods to identify and characterize each type of data that the software will interact with. | **IDASOAR**: 1 | |
| | | | | |
| | | | **IEC62443**: SM-4, SR-1, SR-2, SD-1 | |
| | | | | |
| | | | **IR8397**: 2.1 | |
| | | | | |
| | | | **ISO27034**: 7.3.3 | |
| | | | | |
| | | | **MSSDL**: 4 | |
| | | | | |
| | | | **NISTCSF**: ID.RA | |
| | | | | |
| | | | **OWASPASVS**: 1.1.2, 1.2, 1.4, 1.6, 1.8, 1.9, 1.11, 2, 3, 4, 6, 8, 9, 11, 12, 13 | |
| | | | | |
| | | | **OWASPMASVS**: 1.6, 1.8, 2, 3, 4, 5, 6 | |
| | | | | |
| | | | **OWASPSAMM**: TA1-A, TA1-B, TA3-B, DR1-A | |
| | | | | |
| | | | **PCISSLC**: 3.2, 3.3 | |
| | | | | |
| | | | **SCAGILE**: Tasks Requiring the Help of Security Experts 3 | |
| | | | | |
| | | | **SCFPSSD**: Threat Modeling | |
| | | | | |
| | | | **SCTTM**: Entire guide | |
| | | | | |
| | | | **SP80053**: SA-8, SA-11(2), SA-11(6), SA-15(5) | |
| | | | | |
| | | | **SP800160**: 3.3.4, 3.4.5 | |
| | | | | |
| | | | **SP800161**: SA-8, SA-11(2), SA-11(6), SA-15(5) | |
| | | | | |
| | | | **SP800181**: T0038, T0062; K0005, K0009, K0038, K0039, K0070, K0080, K0119, K0147, K0149, K0151, K0152, K0160, K0161, K0162, K0165, K0297, K0310, K0344, K0362, K0487, K0624; S0006, S0009, S0022, S0078, S0171, S0229, S0248; A0092, A0093, A0107 | |
+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| | **PW.1.2**: Track and maintain the software's security requirements, risks, and design decisions. | > **Example 1**: Record the response to each risk, including how mitigations are to be achieved and what the rationales are for any approved exceptions to the security requirements. Add any mitigations to the software's security requirements. | **BSAFSS**: SC.1-1, PD.1-1 | |
| | | > | | |
| | | > **Example 2**: Maintain records of design decisions, risk responses, and approved exceptions that can be used for auditing and maintenance purposes throughout the rest of the software life cycle. | **BSIMM**: SFD3.1, SFD3.3, AA2.2, AA3.2 | |
| | | > | | |
| | | > **Example 3**: Periodically re-evaluate all approved exceptions to the security requirements, and implement changes as needed. | **EO14028**: 4e(v), 4e(ix) | |
| | | | | |
| | | | **IEC62443**: SD-1 | |
| | | | | |
| | | | **ISO27034**: 7.3.3 | |
| | | | | |
| | | | **MSSDL**: 4 | |
| | | | | |
| | | | **NISTLABEL**: 2.2.2.2 | |
| | | | | |
| | | | **OWASPASVS**: 1.1.3, 1.1.4 | |
| | | | | |
| | | | **OWASPMASVS**: 1.3, 1.6 | |
| | | | | |
| | | | **OWASPSAMM**: DR1-B | |
| | | | | |
| | | | **PCISSLC**: 3.2, 3.3 | |
| | | | | |
| | | | **SP80053**: SA-8, SA-10, SA-17 | |
| | | | | |
| | | | **SP800161**: SA-8, SA-17 | |
| | | | | |
| | | | **SP800181**: T0256; K0005, K0038, K0039, K0147, K0149, K0160, K0161, K0162, K0165, K0344, K0362, K0487; S0006, S0009, S0078, S0171, S0229, S0248; A0092, A0107 | |
+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| | **PW.1.3**: Where appropriate, build in support for using standardized security features and services (e.g., enabling software to integrate with existing log management, identity management, access control, and vulnerability management systems) instead of creating proprietary implementations of security features and services. \[Formerly PW.4.3\] | > **Example 1**: Maintain one or more software repositories of modules for supporting standardized security features and services. | **BSAFSS**: SI.2-1, SI.2-2, LO.1 | |
| | | > | | |
| | | > **Example 2**: Determine secure configurations for modules for supporting standardized security features and services, and make these configurations available (e.g., as configuration-as-code) so developers can readily use them. | **BSIMM**: SFD1.1, SFD2.1, SFD3.2, SR1.1, SR3.4 | |
| | | > | | |
| | | > **Example 3**: Define criteria for which security features and services must be supported by software to be developed. | **EO14028**: 4e(ix) | |
| | | | | |
| | | | **IEC62443**: SD-1, SD-4 | |
| | | | | |
| | | | **MSSDL**: 5 | |
| | | | | |
| | | | **OWASPASVS**: 1.1.6 | |
| | | | | |
| | | | **OWASPSAMM**: SA2-A | |
| | | | | |
| | | | **SCFPSSD**: Standardize Identity and Access Management; Establish Log Requirements and Audit Practices | |
+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| **Review the Software Design to Verify Compliance with Security Requirements and Risk Information (PW.2)**: Help ensure that the software will meet the security requirements and satisfactorily address the identified risk information. | **PW.2.1**: Have 1) a qualified person (or people) who were not involved with the design and/or 2) automated processes instantiated in the toolchain review the software design to confirm and enforce that it meets all of the security requirements and satisfactorily addresses the identified risk information. | > **Example 1**: Review the software design to confirm that it addresses applicable security requirements. | **BSAFSS**: TV.3 | |
| | | > | | |
| | | > **Example 2**: Review the risk models created during software design to determine if they appear to adequately identify the risks. | **BSIMM**: AA1.1, AA1.2, AA1.3, AA2.1, AA3.1 | |
| | | > | | |
| | | > **Example 3**: Review the software design to confirm that it satisfactorily addresses the risks identified by the risk models. | **EO14028**: 4e(iv), 4e(v), 4e(ix) | |
| | | > | | |
| | | > **Example 4**: Have the software's designer correct failures to meet the requirements. | **IEC62443**: SM-2, SR-2, SR-5, SD-3, SD-4, SI-2 | |
| | | > | | |
| | | > **Example 5**: Change the design and/or the risk response strategy if the security requirements cannot be met. | **ISO27034**: 7.3.3 | |
| | | > | | |
| | | > **Example 6**: Record the findings of design reviews to serve as artifacts (e.g., in the software specification, in the issue tracking system, in the threat model). | **OWASPASVS**: 1.1.5 | |
| | | | | |
| | | | **OWASPSAMM**: DR1-A, DR1-B | |
| | | | | |
| | | | **PCISSLC**: 3.2 | |
| | | | | |
| | | | **SP800181**: T0328; K0038, K0039, K0070, K0080, K0119, K0152, K0153, K0161, K0165, K0172, K0297; S0006, S0009, S0022, S0036, S0141, S0171 | |
+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| **\*Verify Third-Party Software Complies with Security Requirements (PW.3)**: Moved to PW.4\* | **\*PW.3.1**: Moved to PO.1.3\* | | | |
+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| | **\*PW.3.2**: Moved to PW.4.4\* | | | |
+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| **Reuse Existing, Well-Secured Software When Feasible Instead of Duplicating Functionality (PW.4)**: Lower the costs of software development, expedite software development, and decrease the likelihood of introducing additional security vulnerabilities into the software by reusing software modules and services that have already had their security posture checked. This is particularly trueimportant for software that implements security functionality, such as cryptographic modules and protocols. | **PW.4.1**: Acquire and maintain well-secured software components (e.g., software libraries, modules, middleware, frameworks) from third partiescommercial, open-source, and other third-party developers for use by the organization's software. | > **Example 1**: Review and evaluate third-party software components in the context of their expected use. If a component is to be used in a substantially different way in the future, perform the review and evaluation again with that new context in mind. | **BSAFSS**: SM.2 | |
| | | > | | |
| | | > **Example 2**: Determine secure configurations for software components, and make these available (e.g., as configuration-as-code) so developers can readily use the configurations. | **BSIMM**: SFD2.1, SFD3.2, SR2.4, SR3.1, SE3.6 | |
| | | > | | |
| | | > **Example 3**: Obtain provenance information (e.g., SBOM, source composition analysis, binary software composition analysis) for each software component, and analyze that information to better assess the risk that the component may introduce. | **CNCFSSCP**: Securing Materials---Verification | |
| | | > | | |
| | | > **Example 4**: Establish an organization-wideone or more software repositoryrepositories to host sanctioned and vetted open-source components. | **EO14028**: 4e(iii), 4e(vi), 4e(ix), 4e(x) | |
| | | > | | |
| | | > **Example 5**: Maintain a list of organization-approved commercial software components and component versions along with their provenance data. | **IDASOAR**: 19 | |
| | | > | | |
| | | > **Example 6**: Designate which components must be included in software to be developed. | **IEC62443**: SM-9, SM-10 | |
| | | > | | |
| | | > **Example 7**: Implement processes to update deployed software components to newer versions, and retain older versions of software components until all transitions from those versions have been completed successfully. | **MSSDL**: 6 | |
| | | > | | |
| | | > **Example 8**: If the integrity or provenance of acquired binaries cannot be confirmed, build binaries from source code after verifying the source code's integrity and provenance. | **NISTCSF**: ID.SC-2 | |
| | | | | |
| | | | **OWASPASVS**: 1.1.6 | |
| | | | | |
| | | | **OWASPSAMM**: SA1-A | |
| | | | | |
| | | | **OWASPSCVS**: 4 | |
| | | | | |
| | | | **SCSIC**: Vendor Sourcing Integrity Controls | |
| | | | | |
| | | | **SCTPC**: MAINTAIN | |
| | | | | |
| | | | **SP80053**: SA-4, SA-5, SA-8(3), SA-10(6), SR-3, SR-4 | |
| | | | | |
| | | | **SP800161**: SA-4, SA-5, SA-8(3), SA-10(6), SR-3, SR-4 | |
| | | | | |
| | | | **SP800181**: K0039 | |
+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| | **PW.4.2**: Create and maintain well-secured software components in-house following SDLC processes to meet common internal software development needs that cannot be better met by third-party software components. | > **Example 1**: Follow organization-established security practices for secure software developmentMaintain an organization-wide software repository for these when creating and maintaining the components. | **BSIMM**: SFD1.1, SFD2.1, SFD3.2, SR1.1 | |
| | | > | | |
| | | > **Example 2**: Determine secure configurations for software components, and make these available (e.g., as configuration-as-code) so developers can readily use the configurations. | **EO14028**: 4e(ix) | |
| | | > | | |
| | | > **Example 3**: Maintain one or more software repositories for these components. | **IDASOAR**: 19 | |
| | | > | | |
| | | > **Example 4**: Designate which components must be included in software to be developed. | **OWASPASVS**: 1.1.6 | |
| | | > | | |
| | | > **Example 5**: Implement processes to update deployed software components to newer versions, and maintain older versions of software components until all transitions from those versions have been completed successfully. | **SCTPC**: MAINTAIN | |
| | | | | |
| | | | **SP80053**: SA-8(3) | |
| | | | | |
| | | | **SP800161**: SA-8(3) | |
| | | | | |
| | | | **SP800181**: SP-DEV-001 | |
+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| | **\*PW.4.3**: Moved to PW.1.3\* | | | |
+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| | **PW.4.4**: Verify that acquired commercial, open-source, and all other third-party software components comply with the requirements, as defined by the organization, throughout their life cycles. | > **Example 1**: Regularly check whether there are publicly known vulnerabilities in the software modules and services that vendors have not yet fixed. | **BSAFSS**: SC.3-1, SM.2-1, SM.2-2, SM.2-3, TV.2, TV.3 | |
| | | > | | |
| | | > **Example 2**: Build into the toolchain automatic detection of known vulnerabilities in software components. | **BSIMM**: CP3.2, SR2.4, SR3.1, SR3.2, SE2.4, SE3.6 | |
| | | > | | |
| | | > **Example 3**: Use existing results from commercial services for vetting the software modules and services. | **CNCFSSCP**: Securing Materials---Verification, Automation | |
| | | > | | |
| | | > **Example 4**: Ensure that each software component is still actively maintained and has not reached end of life; this should include new vulnerabilities found in the software being remediated. | **EO14028**: 4e(iii), 4e(iv), 4e(vi), 4e(ix), 4e(x) | |
| | | > | | |
| | | > **Example 5**: Determine a plan of action for each software component that is no longer being maintained or will not be available in the near future. | **IDASOAR**: 21 | |
| | | > | | |
| | | > **Example 6**: Confirm the integrity of software components through digital signatures or other mechanisms. | **IEC62443**: SI-1, SM-9, SM-10, DM-1 | |
| | | | | |
| | | **Example 7**: Review, analyze, and/or test code. See PW.7 and PW.8. | **IR8397**: 2.11 | |
| | | | | |
| | | | **MSSDL**: 7 | |
| | | | | |
| | | | **NISTCSF**: ID.SC-4, PR.DS-6 | |
| | | | | |
| | | | **NISTLABEL**: 2.2.2.2 | |
| | | | | |
| | | | **OWASPASVS**: 10, 14.2 | |
| | | | | |
| | | | **OWASPMASVS**: 7.5 | |
| | | | | |
| | | | **OWASPSAMM**: TA3-A, SR3-B | |
| | | | | |
| | | | **OWASPSCVS:** 4, 5, 6 | |
| | | | | |
| | | | **PCISSLC**: 3.2, 3.4, 4.1 | |
| | | | | |
| | | | **SCAGILE**: Tasks Requiring the Help of Security Experts 8 | |
| | | | | |
| | | | **SCFPSSD**: Manage Security Risk Inherent in the Use of Third-Party Components | |
| | | | | |
| | | | **SCSIC**: Vendor Sourcing Integrity Controls, Peer Reviews and Security Testing | |
| | | | | |
| | | | **SCTPC**: MAINTAIN, ASSESS | |
| | | | | |
| | | | **SP80053**: SA-9, SR-3, SR-4, SR-4(3), SR-4(4) | |
| | | | | |
| | | | **SP800160**: 3.1.2, 3.3.8 | |
| | | | | |
| | | | **SP800161**: SA-4, SA-8, SA-9, SA-9(3), SR-3, SR-4, SR-4(3), SR-4(4) | |
| | | | | |
| | | | **SP800181**: SP-DEV-002; K0153, K0266; S0298 | |
+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| | **\*PW.4.5**: Moved to PW.4.1 and PW.4.4\* | | | |
+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| **Create Source Code by Adhering to Secure Coding Practices (PW.5)**: Decrease the number of security vulnerabilities in the software, and reduce costs by eliminatingminimizing vulnerabilities introduced during source code creation that meet or exceed organization-defined vulnerability severity criteria. | **PW.5.1**: Follow all secure coding practices that are appropriate to the development languages and environment to meet the organization's requirements. | > **Example 1**: Validate all inputs, and validate and properly encode all outputs. | **BSAFSS**: SC.2, SC.3, LO.1, EE.1 | |
| | | > | | |
| | | > **Example 2**: Avoid using unsafe functions and calls. | **BSIMM**: SR3.3, CR1.4, CR3.5 | |
| | | > | | |
| | | > **Example 3**: Detect errors, and handle them gracefully. | **EO14028**: 4e(iv), 4e(ix) | |
| | | > | | |
| | | > **Example 4**: Provide logging and tracing capabilities. | **IDASOAR**: 2 | |
| | | > | | |
| | | > **Example 5**: Use development environments with automated features that encourage or require the use of secure coding practices with just-in-time training-in-place. | **IEC62443**: SI-1, SI-2 | |
| | | > | | |
| | | > **Example 6**: Follow procedures for manually ensuring compliance with secure coding practices when automated methods are insufficient or unavailable. | **ISO27034**: 7.3.5 | |
| | | > | | |
| | | > **Example 7**: Use tools (e.g., linters, formatters) to standardize the style and formatting of the source code. | **MSSDL**: 9 | |
| | | > | | |
| | | > **Example 8**: Check for other vulnerabilities that are common to the development languages and environment. | **OWASPASVS**: 1.1.7, 1.5, 1.7, 5, 7 | |
| | | > | | |
| | | > **Example 9**: Have the developer review their own human-readable code to complement (not replace) code review performed by other people or tools. See PW.7. | **OWASPMASVS**: 7.6 | |
| | | | | |
| | | | **SCFPSSD**: Establish Log Requirements and Audit Practices, Use Code Analysis Tools to Find Security Issues Early, Handle Data Safely, Handle Errors, Use Safe Functions Only | |
| | | | | |
| | | | **SP800181**: SP-DEV-001; T0013, T0077, T0176; K0009, K0016, K0039, K0070, K0140, K0624; S0019, S0060, S0149, S0172, S0266**;** A0036, A0047 | |
+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| | **\*PW.5.2**: Moved to PW.5.1 as example* | | | |
+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| **Configure the Compilation, Interpreter, and Build Processes to Improve Executable Security (PW.6)**: Decrease the number of security vulnerabilities in the software and reduce costs by eliminating vulnerabilities before testing occurs. | **PW.6.1**: Use compiler, interpreter, and build tools that offer features to improve executable security. | > **Example 1**: Use up-to-date versions of compiler, interpreter, and build tools. | **BSAFSS**: DE.2-1 | |
| | | > | | |
| | | > **Example 2**: Follow change management processes when deploying or updating compiler, interpreter, and build tools, and audit all unexpected changes to tools. | **BSIMM**: SE2.4 | |
| | | > | | |
| | | > **Example 3**: Regularly validate the authenticity and integrity of compiler, interpreter, and build tools. See PO.3. | **CNCFSSCP**: Securing Build Pipelines---Verification, Automation | |
| | | | | |
| | | | **EO14028**: 4e(iv), 4e(ix) | |
| | | | | |
| | | | **IEC62443**: SI-2 | |
| | | | | |
| | | | **MSSDL**: 8 | |
| | | | | |
| | | | **SCAGILE**: Operational Security Task 3 | |
| | | | | |
| | | | **SCFPSSD**: Use Current Compiler and Toolchain Versions and Secure Compiler Options | |
| | | | | |
| | | | **SCSIC**: Vendor Software Development Integrity Controls | |
| | | | | |
| | | | **SP80053**: SA-15 | |
| | | | | |
| | | | **SP800161**: SA-15 | |
+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| | **PW.6.2**: Determine which compiler, interpreter, and build tool features should be used and how each should be configured, then implement and use the approved configurations. | > **Example 1**: Enable compiler features that produce warnings for poorly secured code during the compilation process. | **BSAFSS**: DE.2-3, DE.2-4, DE.2-5 | |
| | | > | | |
| | | > **Example 2**: Implement the "clean build" concept, where all compiler warnings are treated as errors and eliminated except those determined to be false positives or irrelevant. | **BSIMM**: SE2.4, SE3.2 | |
| | | > | | |
| | | > **Example 3**: Perform all builds in a dedicated, highly controlled build environment. | **CNCFSSCP**: Securing Build Pipelines---Verification, Automation | |
| | | > | | |
| | | > **Example 4**: Enable compiler features that randomize or obfuscate execution characteristics, such as memory location usage, that would otherwise be predictable and thus potentially exploitable. | **EO14028**: 4e(iv), 4e(ix) | |
| | | > | | |
| | | > **Example 5**: Test to ensure that the features are working as expected and are not inadvertently causing any operational issues or other problems. | **IEC62443**: SI-2 | |
| | | > | | |
| | | > **Example 6**: Continuously verify that the approved configurations are being used. | **IR8397**: 2.5 | |
| | | > | | |
| | | > · **Example 7**: Make the approved tool configurations available as configuration is enabled for compilation and build tools, processes, etc. | **MSSDL**: 8 | |
| | | > | | |
| | | > Document information about the compilation and build tool configuration in a knowledge base that developers can access and search.-as-code so developers can readily use them. | **OWASPASVS**: 14.1, 14.2.1 | |
| | | | | |
| | | | **OWASPMASVS**: 7.2 | |
| | | | | |
| | | | **PCISSLC**: 3.2 | |
| | | | | |
| | | | **SCAGILE**: Operational Security Task 8 | |
| | | | | |
| | | | **SCFPSSD**: Use Current Compiler and Toolchain Versions and Secure Compiler Options | |
| | | | | |
| | | | **SCSIC**: Vendor Software Development Integrity Controls | |
| | | | | |
| | | | **SP80053**: SA-15, SR-9 | |
| | | | | |
| | | | **SP800161**: SA-15, SR-9 | |
| | | | | |
| | | | **SP800181**: K0039, K0070 | |
+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| **Review and/or Analyze Human-Readable Code to Identify Vulnerabilities and Verify Compliance with Security Requirements (PW.7)**: Help identify vulnerabilities so that they can be corrected before the software is released to prevent exploitation. Using automated methods lowers the effort and resources needed to detect vulnerabilities. Human-readable code includes source code, scripts, and any other form of code that an organization deems human-readable. | **PW.7.1**: Determine whether code *review* (a person looks directly at the code to find issues) and/or code *analysis\* (tools are used to find issues in code, either in a fully automated way or in conjunction with a person) should be used, as defined by the organization. | > **Example 1**: Follow the organization's policies or guidelines for when code review should be performed and how it should be conducted. This may include third-party code and reusable code modules written in-house. | **BSIMM**: CR1.5 | |
| | | > | | |
| | | > **Example 2**: Follow the organization's policies or guidelines for when code analysis should be performed and how it should be conducted. | **EO14028**: 4e(iv), 4e(ix) | |
| | | > | | |
| | | > **Example 3**: Choose code review and/or analysis methods based on the stage of the software. | **IEC62443**: SM-5, SI-1, SVV-1 | |
| | | | | |
| | | | **NISTLABEL**: 2.2.2.2 | |
| | | | | |
| | | | **SCSIC**: Peer Reviews and Security Testing | |
| | | | | |
| | | | **SP80053**: SA-11 | |
| | | | | |
| | | | **SP800161**: SA-11 | |
| | | | | |
| | | | **SP800181**: SP-DEV-002; K0013, K0039, K0070, K0153, K0165; S0174 | |
+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| | **PW.7.2**: Perform the code review and/or code analysis based on the organization's secure coding standards, and documentrecord and triage all discovered issues and recommended remediations in the development team's workflow or issue tracking system. | > **Example 1**: Perform peer review of code, and review any existing code review, analysis, or testing results as part of the peer review. | **BSAFSS**: TV.2, PD.1-4 | |
| | | > | | |
| | | > **Example 2**: Use peer reviewsexpert reviewers to check code for backdoors and other malicious content. | **BSIMM**: CR1.2, CR1.4, CR1.6, CR2.6, CR2.7, CR3.4, CR3.5 | |
| | | > | | |
| | | > **Example 3**: Use peer reviewing tools that facilitate the peer review process, and document all discussions and other feedback. | **EO14028**: 4e(iv), 4e(v), 4e(ix) | |
| | | > | | |
| | | > **Example 4**: Use a static analysis tool to automatically check code for vulnerabilities and compliance with the organization's secure coding standards with a human reviewing the issues reported by the tool and remediating them as necessary. | **IDASOAR**: 3, 4, 5, 14, 15, 48 | |
| | | > | | |
| | | > **Example 5**: Use review checklists to verify that the code complies with the requirements. | **IEC62443**: SI-1, SVV-1, SVV-2 | |
| | | > | | |
| | | > **Example 6**: Use automated tools to identify and remediate documented and verified unsafe software practices on a continuous basis as human-readable code is checked into the code repository. | **IR8397**: 2.3, 2.4 | |
| | | > | | |
| | | > **Example 7**: Identify and document the root causes of each discovered issueissues. | **ISO27034**: 7.3.6 | |
| | | > | | |
| | | > **Example 8**: Document lessons learned from code review and analysis in a knowledge basewiki that developers can access and search. | **MSSDL**: 9, 10 | |
| | | | | |
| | | | **NISTLABEL**: 2.2.2.2 | |
| | | | | |
| | | | **OWASPASVS**: 1.1.7, 10 | |
| | | | | |
| | | | **OWASPMASVS**: 7.5 | |
| | | | | |
| | | | **OWASPSAMM**: IR1-B, IR2-A, IR2-B, IR3-A | |
| | | | | |
| | | | **PCISSLC**: 3.2, 4.1 | |
| | | | | |
| | | | **SCAGILE**: Operational Security Tasks 4, 7; Tasks Requiring the Help of Security Experts 10 | |
| | | | | |
| | | | **SCFPSSD**: Use Code Analysis Tools to Find Security Issues Early, Use Static Analysis Security Testing Tools, Perform Manual Verification of Security Features/Mitigations | |
| | | | | |
| | | | **SCSIC**: Peer Reviews and Security Testing | |
| | | | | |
| | | | **SP80053**: SA-11, SA-11(1), SA-11(4), SA-15(7) | |
| | | | | |
| | | | **SP800161**: SA-11, SA-11(1), SA-11(4), SA-15(7) | |
| | | | | |
| | | | **SP800181**: SP-DEV-001, SP-DEV-002; T0013, T0111, T0176, T0267, T0516; K0009, K0039, K0070, K0140, K0624; S0019, S0060, S0078, S0137, S0149, S0167, S0174, S0242, S0266**;** A0007, A0015, A0036, A0044, A0047 | |
+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| **Test Executable Code to Identify Vulnerabilities and Verify Compliance with Security Requirements (PW.8)**: Help identify vulnerabilities so that they can be corrected before the software is released in order to prevent exploitation. Using automated methods lowers the effort and resources needed to detect vulnerabilities and improves traceability and repeatability. Executable code includes binaries, directly executed bytecode and source code, and any other form of code that an organization deems executable. | **PW.8.1**: Determine whether executable code testing should be performed to find vulnerabilities not identified by previous reviews, analysis, or testing and, if so, which types of testing should be used. | > **Example 1**: Follow the organization's policies or guidelines for when code testing should be performed and how it should be conducted (e.g., within a sandboxed environment). This may include third-party executable code and reusable executable code modules written in-house. | **BSAFSS**: TV.3 | |
| | | > | | |
| | | > **Example 2**: Choose testing methods based on the stage of the software. | **BSIMM**: PT2.3 | |
| | | | | |
| | | | **EO14028**: 4e(ix) | |
| | | | | |
| | | | **IEC62443**: SVV-1, SVV-2, SVV-3, SVV-4, SVV-5 | |
| | | | | |
| | | | **NISTLABEL**: 2.2.2.2 | |
| | | | | |
| | | | **SCSIC**: Peer Reviews and Security Testing | |
| | | | | |
| | | | **SP80053**: SA-11 | |
| | | | | |
| | | | **SP800161**: SA-11 | |
| | | | | |
| | | | **SP800181**: SP-DEV-001, SP-DEV-002; T0456; K0013, K0039, K0070, K0153, K0165, K0342, K0367, K0536, K0624; S0001, S0015, S0026, S0061, S0083, S0112, S0135 | |
+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| | **PW.8.2**: Scope the testing, design the tests, perform the testing, and document the results, including recording and triaging all discovered issues and recommended remediations in the development team's workflow or issue tracking system. | > **Example 1**: Perform robust functional testing of security features. | **BSAFSS**: TV.3, TV.5, PD.1-4 | |
| | | > | | |
| | | > **Example 2**: Integrate dynamic vulnerability testing into the project's automated test suite. | **BSIMM**: ST1.1, ST1.3, ST1.4, ST2.4, ST2.5, ST2.6, ST3.3, ST3.4, ST3.5, ST3.6, PT1.1, PT1.2, PT1.3, PT3.1 | |
| | | > | | |
| | | > **Example 3**: Incorporate tests for previously reported vulnerabilities into the project's test suite to ensure that errors are not reintroduced. | **EO14028**: 4e(iv), 4e(v), 4e(ix) | |
| | | > | | |
| | | > **Example 4**: Take into consideration the infrastructures and technology stacks that the software will be used with in production when developing test plans. | **IDASOAR**: 7, 8, 10, 11, 38, 39, 43, 44, 48, 55, 56, 57 | |
| | | > | | |
| | | > **Example 5**: Use fuzz testing tools to find issues with input handling. | **IEC62443**: SM-5, SM-13, SI-1, SVV-1, SVV-2, SVV-3, SVV-4, SVV-5 | |
| | | > | | |
| | | > **Example 6**: If resources are available, use penetration testing to simulate how an attacker might attempt to compromise the software in high-risk scenarios. | **IR8397**: 2.6, 2.7, 2.8, 2.9, 2.10, 2.11 | |
| | | > | | |
| | | > **Example 7**: Identify and documentrecord the root causes of each discovered issueissues. | **ISO27034**: 7.3.6 | |
| | | > | | |
| | | > **Example 8**: Document lessons learned from code testing in a knowledge basewiki that developers can access and search. | **MSSDL**: 10, 11 | |
| | | > | | |
| | | > **Example 9**: Use source code, design records, and other resources when developing test plans. | **NISTLABEL**: 2.2.2.2 | |
| | | | | |
| | | | **OWASPMASVS**: 7.5 | |
| | | | | |
| | | | **OWASPSAMM**: ST1-A, ST1-B, ST2-A, ST2-B, ST3-A | |
| | | | | |
| | | | **PCISSLC**: 4.1 | |
| | | | | |
| | | | **SCAGILE**: Operational Security Tasks 10, 11; Tasks Requiring the Help of Security Experts 4, 5, 6, 7 | |
| | | | | |
| | | | **SCFPSSD**: Perform Dynamic Analysis Security Testing, Fuzz Parsers, Network Vulnerability Scanning, Perform Automated Functional Testing of Security Features/Mitigations, Perform Penetration Testing | |
| | | | | |
| | | | **SCSIC**: Peer Reviews and Security Testing | |
| | | | | |
| | | | **SP80053:** SA-11, SA-11(5), SA-11(8), SA-15(7) | |
| | | | | |
| | | | **SP800161**: SA-11, SA-11(5), SA-11(8), SA-15(7) | |
| | | | | |
| | | | **SP800181**: SP-DEV-001, SP-DEV-002; T0013, T0028, T0169, T0176, T0253, T0266, T0456, T0516; K0009, K0039, K0070, K0272, K0339, K0342, K0362, K0536, K0624; S0001, S0015, S0046, S0051, S0078, S0081, S0083, S0135, S0137, S0167, S0242; A0015 | |
+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| **Configure Software to Have Secure Settings by Default (PW.9)**: Help improve the security of the software at the time of installation to reduce the likelihood of the software being deployed with weak security settings, putting it at greater risk of compromise. | **PW.9.1**: DetermineDefine a secure baseline by determining how to configure each setting that has an effect on security or a security-related setting so that the default settings are secure and do not weaken the security functions provided by the platform, network infrastructure, or services. | > **Example 1**: Conduct testing to ensure that the settings, including the default settings, are working as expected and are not inadvertently causing any security weaknesses, operational issues, or other problems. | **BSAFSS**: CF.1 | |
| | | | | |
| | | | **BSIMM**: SE2.2 | |
| | | | | |
| | | | **EO14028**: 4e(iv), 4e(ix) | |
| | | | | |
| | | | **IDASOAR**: 23 | |
| | | | | |
| | | | **IEC62443**: SD-4, SVV-1, SG-1 | |
| | | | | |
| | | | **ISO27034**: 7.3.5 | |
| | | | | |
| | | | **SCAGILE**: Tasks Requiring the Help of Security Experts 12 | |
| | | | | |
| | | | **SCSIC**: Vendor Software Delivery Integrity Controls, Vendor Software Development Integrity Controls | |
| | | | | |
| | | | **SP800181**: SP-DEV-002; K0009, K0039, K0073, K0153, K0165, K0275, K0531; S0167 | |
+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| | **PW.9.2**: Implement the default settings (or groups of default settings, if applicable), and document each setting for software administrators. | > **Example 1**: Verify that the approved configuration is in place for the software. | **BSAFSS**: CF.1 | |
| | | > | | |
| | | > **Example 2**: Document each setting's purpose, options, default value, security relevance, potential operational impact, and relationships with other settings. | **BSIMM**: SE2.2 | |
| | | > | | |
| | | > **Example 3**: Use authoritative programmatic technical mechanisms to record Document how each setting can be implemented and assessed by software administrators. | **EO14028**: 4e(iv), 4e(ix) | |
| | | > | | |
| | | > **Example 4**: Store the default configuration in a usable format and follow change control practices for modifying it (e.g., configuration-as-code). | **IDASOAR**: 23 | |
| | | | | |
| | | | **IEC62443**: SG-3 | |
| | | | | |
| | | | **OWASPSAMM**: OE1-A | |
| | | | | |
| | | | **PCISSLC**: 8.1, 8.2 | |
| | | | | |
| | | | **SCAGILE**: Tasks Requiring the Help of Security Experts 12 | |
| | | | | |
| | | | **SCFPSSD**: Verify Secure Configurations and Use of Platform Mitigation | |
| | | | | |
| | | | **SCSIC**: Vendor Software Delivery Integrity Controls, Vendor Software Development Integrity Controls | |
| | | | | |
| | | | **SP80053**: SA-5, SA-8(23) | |
| | | | | |
| | | | **SP800161**: SA-5, SA-8(23) | |
| | | | | |
| | | | **SP800181**: SP-DEV-001; K0009, K0039, K0073, K0153, K0165, K0275, K0531 | |
+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| **Respond to Vulnerabilities (RV)** | | | | |
+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| **Identify and Confirm Vulnerabilities on an Ongoing Basis (RV.1)**: Help ensure that vulnerabilities are identified more quickly so that they can be remediated more quickly in accordance with risk, reducing the window of opportunity for attackers. | **RV.1.1**: Gather information from software acquirers, users, and public sources on potential vulnerabilities in the software and third-party components that the software uses, and investigate all credible reports. | > · Establish a vulnerability response program, and make it easy for security researchers to learn about your program and report possible vulnerabilities. | **BSAFSS**: VM.1-3, VM.3 | |
| | | > | | |
| | | > **Example 1**: Monitor vulnerability databases\[5\], security mailing lists, and other sources of vulnerability reports through manual or automated means. | **BSIMM**: AM1.5, CMVM1.2, CMVM2.1, CMVM3.4, CMVM3.7 | |
| | | > | | |
| | | > **Example 2**: Use threat intelligence sources to better understand how vulnerabilities in general are being exploited. | **CNCFSSCP**: Securing Materials---Verification | |
| | | | | |
| | | **Example 3**: Automatically review provenance and software composition data for all software components to identify any new vulnerabilities they have. | **EO14028**: 4e(iv), 4e(vi), 4e(viii), 4e(ix) | |
| | | | | |
| | | | **IEC62443**: DM-1, DM-2, DM-3 | |
| | | | | |
| | | | **ISO29147**: 6.2.1, 6.2.2, 6.2.4, 6.3, 6.5 | |
| | | | | |
| | | | **ISO30111**: 7.1.3 | |
| | | | | |
| | | | **OWASPSAMM**: IM1-A, IM2-B, EH1-B | |
| | | | | |
| | | | **OWASPSCVS**: 4 | |
| | | | | |
| | | | **PCISSLC**: 3.4, 4.1, 9.1 | |
| | | | | |
| | | | **SCAGILE**: Operational Security Task 5 | |
| | | | | |
| | | | **SCFPSSD**: Vulnerability Response and Disclosure | |
| | | | | |
| | | | **SCTPC**: MONITOR1 | |
| | | | | |
| | | | **SP80053**: SA-10, SR-3, SR-4 | |
| | | | | |
| | | | **SP800161**: SA-10, SR-3, SR-4 | |
| | | | | |
| | | | **SP800181**: K0009, K0038, K0040, K0070, K0161, K0362; S0078 | |
+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| | **RV.1.2**: Review, analyze, and/or test the software's code to identify or confirm the presence of previously undetected vulnerabilities. | > **Example 1**: Configure the toolchain to perform automated code analysis and testing on a regular or continuous basis for all supported releases. | **BSAFSS**: VM.1-2, VM.2-1 | |
| | | > | | |
| | | > **Example 2**: See PW.7 and PW.8. | **BSIMM**: CMVM3.1 | |
| | | | | |
| | | | **EO14028**: 4e(iv), 4e(vi), 4e(viii), 4e(ix) | |
| | | | | |
| | | | **IEC62443**: SI-1, SVV-2, SVV-3, SVV-4, DM-1, DM-2 | |
| | | | | |
| | | | **ISO27034**: 7.3.6 | |
| | | | | |
| | | | **ISO29147**: 6.4 | |
| | | | | |
| | | | **ISO30111**: 7.1.4 | |
| | | | | |
| | | | **PCISSLC**: 3.4, 4.1 | |
| | | | | |
| | | | **SCAGILE**: Operational Security Tasks 10, 11 | |
| | | | | |
| | | | **SP80053**: SA-11 | |
| | | | | |
| | | | **SP800161**: SA-11 | |
| | | | | |
| | | | **SP800181**: SP-DEV-002; K0009, K0039, K0153 | |
+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| | **RV.1.3**: Have a team and process in place to handle the responses topolicy that addresses vulnerability reportsdisclosure and remediation, and incidentsimplement the roles, responsibilities, and processes needed to support that policy. | > Have a policy that addresses **Example 1**: Establish a vulnerability disclosure program, and remediation,make it easy for security researchers to learn about your program and implement the report possible vulnerabilities. | **BSAFSS**: VM.1-1, VM.2 | |
| | | > | | |
| | | > **Example 2**: Have a Product Security Incident Response Team (PSIRT) and processes in place to handle the responses to vulnerability reports and incidents, including communications plans for all stakeholders. | **BSIMM**: CMVM1.1, CMVM2.1, CMVM3.3, CMVM3.7 | |
| | | > | | |
| | | > **Example 3**: Have a security response playbook to handle a generic reported vulnerability, a report of zero-days, a vulnerability being exploited in the wild, and a major ongoing incident involving multiple parties and open-source software components. | **EO14028**: 4e(viii), 4e(ix) | |
| | | > | | |
| | | > **Example 4**: Periodically conduct exercises of the product security incident response processes. | **IEC62443**: DM-1, DM-2, DM-3, DM-4, DM-5 | |
| | | | | |
| | | | **ISO29147**: All | |
| | | | | |
| | | | **ISO30111**: All | |
| | | | | |
| | | | **MSSDL**: 12 | |
| | | | | |
| | | | **NISTLABEL**: 2.2.2.3 | |
| | | | | |
| | | | **OWASPMASVS**: 1.11 | |
| | | | | |
| | | | **OWASPSAMM**: IM1-A, IM1-B, IM2-A, IM2-B | |
| | | | | |
| | | | **PCISSLC**: 9.2, 9.3 | |
| | | | | |
| | | | **SCFPSSD**: Vulnerability Response and Disclosure | |
| | | | | |
| | | | **SP80053**: SA-15(10) | |
| | | | | |
| | | | **SP800160**: 3.3.8 | |
| | | | | |
| | | | **SP800161**: SA-15(10) | |
| | | | | |
| | | | **SP800181**: K0041, K0042, K0151, K0292, K0317; S0054; A0025 | |
| | | | | |
| | | | **SP800216**: All | |
+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| **Assess, Prioritize, and Remediate Vulnerabilities (RV.2)**: Help ensure that vulnerabilities are remediated as quickly as necessary, reducingin accordance with risk to reduce the window of opportunity for attackers. | **RV.2.1**: Analyze each vulnerability to gather sufficient information about risk to plan its remediation or other risk response. | > **Example 1**: Use existing issue tracking software to documentrecord each vulnerability. | **BSAFSS**: VM.2 | |
| | | > | | |
| | | > · **Example 2**: Perform risk calculations for each vulnerabilityEstimate based on estimates of its exploitability, the potential impact of vulnerability exploitation. | **BSIMM**: CMVM1.2, CMVM2.2 | |
| | | > | | |
| | | > · Estimate the resources needed to weaponize the vulnerability, if that has not already been done. | **EO14028**: 4e(iv), 4e(viii), 4e(ix) | |
| | | > | | |
| | | > Estimateif exploited, and any other relevant factors needed to plan the remediation of the vulnerabilitycharacteristics. | **IEC62443**: DM-2, DM-3 | |
| | | | | |
| | | | **ISO30111**: 7.1.4 | |
| | | | | |
| | | | **NISTLABEL**: 2.2.2.2 | |
| | | | | |
| | | | **PCISSLC**: 3.4, 4.2 | |
| | | | | |
| | | | **SCAGILE**: Operational Security Task 1, Tasks Requiring the Help of Security Experts 10 | |
| | | | | |
| | | | **SP80053**: SA-10, SA-15(7) | |
| | | | | |
| | | | **SP800160**: 3.3.8 | |
| | | | | |
| | | | **SP800161**: SA-15(7) | |
| | | | | |
| | | | **SP800181**: K0009, K0039, K0070, K0161, K0165; S0078 | |
+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| | **RV.2.2**: DevelopPlan and implement a remediation planrisk responses for each vulnerabilityvulnerabilities. | > **Example 1**: Make a risk-based decision as to whether each vulnerability will be remediated or if the risk will be addressed through other means (e.g., risk acceptance, risk transference), and prioritize any actions to be taken. | **BSAFSS**: VM.1-1, VM-2 | |
| | | > | | |
| | | > **Example 2**: If a permanent mitigation for a vulnerability is not yet available, determine how the vulnerability can be temporarily mitigated until the permanent solution is available, and add that temporary remediation to the plan. | **BSIMM**: CMVM2.1 | |
| | | > | | |
| | | > **Example 3**: Develop and release security advisories that provide the necessary information to software acquirers, including descriptions of what the vulnerabilities are, how to find instances of the vulnerable software, and how to address them (e.g., where to get patches and what the patches change in the software; what configuration settings may need to be changed; how temporary workarounds could be implemented). | **EO14028**: 4e(iv), 4e(vi), 4e(viii), 4e(ix) | |
| | | > | | |
| | | > **Example 4**: Deliver remediations to acquirers via an automated and trusted delivery mechanism. A single remediation could address multiple vulnerabilities. | **IEC62443**: DM-4 | |
| | | > | | |
| | | > **Example 5**: Update records of design decisions, risk responses, and approved exceptions as needed. See PW.1.2. | **ISO30111**: 7.1.4, 7.1.5 | |
| | | | | |
| | | | **NISTLABEL**: 2.2.2.2 | |
| | | | | |
| | | | **PCISSLC**: 4.1, 4.2, 10.1 | |
| | | | | |
| | | | **SCAGILE**: Operational Security Task 2 | |
| | | | | |
| | | | **SCFPSSD**: Fix the Vulnerability, Identify Mitigating Factors or Workarounds | |
| | | | | |
| | | | **SCTPC**: MITIGATE | |
| | | | | |
| | | | **SP80053**: SA-5, SA-10, SA-11, SA-15(7) | |
| | | | | |
| | | | **SP800160**: 3.3.8 | |
| | | | | |
| | | | **SP800161**: SA-5, SA-8, SA-10, SA-11, SA-15(7) | |
| | | | | |
| | | | **SP800181**: T0163, T0229, T0264; K0009, K0070 | |
+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| **Analyze Vulnerabilities to Identify Their Root Causes (RV.3)**: Help reduce the frequency of vulnerabilities in the future. | **RV.3.1**: Analyze all identified vulnerabilities to determine their root cause of each vulnerabilitycauses. | > **Example 1**: Record the root cause of discovered issues. | **BSAFSS**: VM.2-1 | |
| | | > | | |
| | | > **Example 2**: Record lessons learned through root cause analysis in a knowledge basewiki that developers can access and search. | **BSIMM**: CMVM3.1, CMVM3.2 | |
| | | | | |
| | | | **EO14028**: 4e(ix) | |
| | | | | |
| | | | **IEC62443**: DM-3 | |
| | | | | |
| | | | **ISO30111**: 7.1.4 | |
| | | | | |
| | | | **OWASPSAMM**: IM3-A | |
| | | | | |
| | | | **PCISSLC**: 4.2 | |
| | | | | |
| | | | **SCFPSSD**: Secure Development Lifecycle Feedback | |
| | | | | |
| | | | **SP800181**: T0047, K0009, K0039, K0070, K0343 | |
+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| | **RV.3.2**: Analyze the root causes over time to identify patterns, such as a particular secure coding practice not being followed consistently. | > **Example 1**: Record lessons learned through root cause analysis in a knowledge basewiki that developers can access and search. | **BSAFSS**: VM.2-1, PD.1-3 | |
| | | > | | |
| | | > **Example 2**: Add mechanisms to the toolchain to automatically detect future instances of the root cause. | **BSIMM**: CP3.3, CMVM3.2 | |
| | | > | | |
| | | > **Example 3**: Update manual processes to detect future instances of the root cause. | **EO14028**: 4e(ix) | |
| | | | | |
| | | | **IEC62443**: DM-4 | |
| | | | | |
| | | | **ISO30111**: 7.1.7 | |
| | | | | |
| | | | **OWASPSAMM**: IM3-B | |
| | | | | |
| | | | **PCISSLC**: 2.6, 4.2 | |
| | | | | |
| | | | **SCFPSSD**: Secure Development Lifecycle Feedback | |
| | | | | |
| | | | **SP800160**: 3.3.8 | |
| | | | | |
| | | | **SP800181**: T0111, K0009, K0039, K0070, K0343 | |
+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| | **RV.3.3**: Review the software for other instancessimilar vulnerabilities to eradicate a class of the reported problemvulnerabilities, and proactively fix them rather than waiting for external reports. | > **Example 1**: See PW.7 and PW.8. | **BSAFSS**: VM.2 | |
| | | | | |
| | | | **BSIMM**: CR3.3, CMVM3.1 | |
| | | | | |
| | | | **EO14028**: 4e(iv), 4e(viii), 4e(ix) | |
| | | | | |
| | | | **IEC62443**: SI-1, DM-3, DM-4 | |
| | | | | |
| | | | **ISO30111**: 7.1.4 | |
| | | | | |
| | | | **PCISSLC**: 4.2 | |
| | | | | |
| | | | **SP80053**: SA-11 | |
| | | | | |
| | | | **SP800161**: SA-11 | |
| | | | | |
| | | | **SP800181**: SP-DEV-001, SP-DEV-002; K0009, K0039, K0070 | |
+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| | **RV.3.4**: Review the SDLC process, and update it if appropriate to prevent (or reduce the likelihood of) the root cause recurring in updates to the software or in new software that is created. | > **Example 1**: Record lessons learned through root cause analysis in a knowledge basewiki that developers can access and search. | **BSAFSS**: PD.1-3 | |
| | | > | | |
| | | > **Example 2**: Plan and implement changes to the appropriate SDLC practices. | **BSIMM**: CP3.3, CMVM3.2 | |
| | | | | |
| | | | **EO14028**: 4e(ix) | |
| | | | | |
| | | | **IEC62443**: DM-6 | |
| | | | | |
| | | | **ISO30111**: 7.1.7 | |
| | | | | |
| | | | **MSSDL**: 2 | |
| | | | | |
| | | | **PCISSLC**: 2.6, 4.2 | |
| | | | | |
| | | | **SCFPSSD**: Secure Development Lifecycle Feedback | |
| | | | | |
| | | | **SP80053**: SA-15 | |
| | | | | |
| | | | **SP800161**: SA-15 | |
| | | | | |
| | | | **SP800181**: K0009, K0039, K0070 | |
+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

\[1\] _Provenance_ is "the chronology of the origin, development, ownership, location, and changes to a system or system component and associated data. It may also include personnel and processes used to interact with or make modifications to the system, component, or associated data" \[SP80053\].

\[2\] An _artifact_ is "a piece of evidence" \[adapted from IR7692\]. _Evidence_ is "grounds for belief or disbelief; data on which to base proof or to establish truth or falsehood" \[SP800160\]. Artifacts provide records of secure software development practices.

\[3\] See NIST SP 800-207, _Zero Trust Architecture_, for additional information ([[https://doi.org/10.6028/NIST.SP.800-207]{.underline}](https://doi.org/10.6028/NIST.SP.800-207)).

\[4\] For more information on code signing, see NIST Cybersecurity White Paper, _Security Considerations for Code Signing_ ([[https://doi.org/10.6028/NIST.CSWP.01262018]{.underline}](https://doi.org/10.6028/NIST.CSWP.01262018)).

\[5\] An example is the National Vulnerability Database (NVD) ([[https://nvd.nist.gov/]{.underline}](https://nvd.nist.gov/)).

[[GUAC Docs \| GUAC]{.underline}](https://docs.guac.sh/) and the need to do automated dependency management (manual dependencies are harder to scan)

[[krzko/run-with-telemetry: GitHub Action `run` action with OpenTelemetry instrumentation]{.underline}](https://github.com/krzko/run-with-telemetry)

[[inception-health/otel-export-trace-action (github.com)]{.underline}](https://github.com/inception-health/otel-export-trace-action)

- [[Improve your software delivery with CI/CD observability and OpenTelemetry]{.underline}](https://www.elastic.co/virtual-events/ci-cd-observability-and-opentelemetry)

- [[DevOpsWorld 2021 - Embracing Observability in Jenkins with OpenTelemetry]{.underline}](https://www.youtube.com/watch?v=3XzVOxvNpGM)

- [[DevOpsWorld 2021 - Who Observes the Watchers? An Observability Journey]{.underline}](https://www.cloudbees.com/videos/who-observes-the-watchers-an-observability-journey?wvideo=wv11m4uazu)

- [[Embracing Observability in CI/CD with OpenTelemetry]{.underline}](https://www.slideshare.net/cyrille.leclerc/embracing-observability-in-cicd-with-opentelemetry)

- [[FOSDEM 2022 - OpenTelemetry and CI/CD]{.underline}](https://archive.fosdem.org/2022/schedule/event/opentelemetry_and_ci_cd/)

- [[cdCon Austin 2022 - Making your CI/CD Pipelines Speaking in Tongues with OpenTelemetry]{.underline}](https://www.youtube.com/watch?v=1jDLNNe_TEM)

- [[Observability Guide - Elastic Stack 8.7]{.underline}](https://www.elastic.co/guide/en/observability/current/ci-cd-observability.html)

[[bmwiedemann/theunreproduciblepackage: The Unreproducible Package (github.com)]{.underline}](https://github.com/bmwiedemann/theunreproduciblepackage/tree/master)

[[ftp2.osuosl.org/pub/fosdem/2024/k1105/fosdem-2024-3353-reproducible-builds-the-first-ten-years.mp4]{.underline}](https://ftp2.osuosl.org/pub/fosdem/2024/k1105/fosdem-2024-3353-reproducible-builds-the-first-ten-years.mp4)

[[ftp2.osuosl.org/pub/fosdem/2024/k4401/fosdem-2024-3074-sharing-and-reusing-sboms-with-the-osselot-curation-database.mp4]{.underline}](https://ftp2.osuosl.org/pub/fosdem/2024/k4401/fosdem-2024-3074-sharing-and-reusing-sboms-with-the-osselot-curation-database.mp4)

[[ftp2.osuosl.org/pub/fosdem/2024/k4401/fosdem-2024-3146-phantom-dependencies-in-python-and-what-to-do-about-them-.mp4]{.underline}](https://ftp2.osuosl.org/pub/fosdem/2024/k4401/fosdem-2024-3146-phantom-dependencies-in-python-and-what-to-do-about-them-.mp4)

+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| [[ftp2.osuosl.org/pub/fosdem/2024/ua2220/fosdem-2024-3445-strategic-sampling-architectural-approaches-to-efficient-telemetry.mp4]{.underline}](https://ftp2.osuosl.org/pub/fosdem/2024/ua2220/fosdem-2024-3445-strategic-sampling-architectural-approaches-to-efficient-telemetry.mp4) |
| |
| ![](./images/image49.png) |
| |
| ![](./images/image53.png) |
+========================================================================================================================================================================================================================================================================================+
+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

[[ftp2.osuosl.org/pub/fosdem/2024/ua2220/fosdem-2024-3262-what-is-ci-cd-observability-and-how-to-bring-observability-to-ci-cd-pipelines-.mp4]{.underline}](https://ftp2.osuosl.org/pub/fosdem/2024/ua2220/fosdem-2024-3262-what-is-ci-cd-observability-and-how-to-bring-observability-to-ci-cd-pipelines-.mp4)

[[ftp2.osuosl.org/pub/fosdem/2024/ud2208/fosdem-2024-1805-squash-the-flakes-how-to-minimize-the-impact-of-flaky-tests.mp4]{.underline}](https://ftp2.osuosl.org/pub/fosdem/2024/ud2208/fosdem-2024-1805-squash-the-flakes-how-to-minimize-the-impact-of-flaky-tests.mp4)

[[ftp2.osuosl.org/pub/fosdem/2024/k1105/fosdem-2024-3353-reproducible-builds-the-first-ten-years.mp4]{.underline}](https://ftp2.osuosl.org/pub/fosdem/2024/k1105/fosdem-2024-3353-reproducible-builds-the-first-ten-years.mp4)

[[ftp2.osuosl.org/pub/fosdem/2024/k4401/fosdem-2024-3230-getting-lulled-into-a-false-sense-of-security-by-sbom-and-vex.mp4]{.underline}](https://ftp2.osuosl.org/pub/fosdem/2024/k4401/fosdem-2024-3230-getting-lulled-into-a-false-sense-of-security-by-sbom-and-vex.mp4)

[[ftp2.osuosl.org/pub/fosdem/2024/ub2252a/fosdem-2024-3398-modern-build-systems-for-containers.mp4]{.underline}](https://ftp2.osuosl.org/pub/fosdem/2024/ub2252a/fosdem-2024-3398-modern-build-systems-for-containers.mp4)

[[ftp2.osuosl.org/pub/fosdem/2024/ub5230/fosdem-2024-1909-broom-not-included-curling-the-modern-way.mp4]{.underline}](https://ftp2.osuosl.org/pub/fosdem/2024/ub5230/fosdem-2024-1909-broom-not-included-curling-the-modern-way.mp4)

[[bmwiedemann/theunreproduciblepackage: The Unreproducible Package (github.com)]{.underline}](https://github.com/bmwiedemann/theunreproduciblepackage/tree/master)

https://docs.guac.sh/

+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| You\'re right, Handbrake, a popular open-source video transcoder, suffered a serious security breach in 2017 that compromised their download servers. It serves as a stark reminder of how critical secure delivery mechanisms are. |
| |
| Here\'s a breakdown of what happened: |
| |
| - **Compromised Server:** Attackers gained unauthorized access to one of Handbrake\'s download servers. |
| |
| - **Trojanized Software:** They replaced the legitimate Handbrake application with a malicious version containing a Trojan (malware designed to disguise itself as legitimate software). |
| |
| - **User Downloads:** Users who downloaded Handbrake from the compromised server unknowingly installed the Trojanized version on their machines. |
| |
| - **Remote Access and Data Theft:** The Trojan gave attackers remote access to infected computers, potentially allowing them to steal sensitive data, install additional malware, or control the system. |
| |
| **How it Relates to Secure Delivery Mechanisms:** |
| |
| The Handbrake incident highlights several failures in their delivery mechanism: |
| |
| 1. **Inadequate Server Security:** The attackers were able to exploit vulnerabilities on the download server, indicating insufficient security hardening, patching, or intrusion detection measures. |
| |
| 2. **Lack of Code Signing:** Handbrake, at the time, didn\'t use code signing for their software releases. This means users had no way to cryptographically verify the authenticity of the downloaded file. |
| |
| 3. **No Integrity Checks:** The absence of checksums or hashes alongside downloads meant users couldn\'t easily detect that the file had been tampered with. |
| |
| **Lessons Learned:** |
| |
| The Handbrake breach underscores the importance of: |
| |
| - **Robust Server Security:** Hardening servers, keeping software up to date, and implementing strong authentication and intrusion detection are crucial. |
| |
| - **Code Signing:** Digitally signing software provides users with a reliable way to confirm the software\'s legitimacy. |
| |
| - **Integrity Verification:** Providing checksums or hashes empowers users to independently check for file tampering. |
| |
| - **Security Awareness:** Regularly remind users to download software only from official sources and to verify its integrity. |
| |
| **In Conclusion:** |
| |
| The Handbrake compromise was a costly and damaging incident that could have been prevented with stronger security measures in their delivery mechanism. It serves as a cautionary tale for all software developers and highlights the absolute necessity of prioritizing secure software delivery |
+===================================================================================================================================================================================================================================================================================================+
+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

When organizing code, there are two main approaches: mono repo and multi repo.

**Mono Repo:**

- **Advantages:** Simplifies interdependency management, as all components are in one repository. Easier deployment and versioning together.

- **Disadvantages:** Git clone can become slow over time, though this can be mitigated by partial clones or Git VFS.

**Multi Repo:**

- **Advantages:** Each component has its own repository, allowing for independent deployment and versioning. This approach encourages creating public APIs for interaction.

- **Disadvantages:** Managing changes across many repositories can be complex, especially when multiple repositories need simultaneous updates.

**Security:**

- Multi repo offers better access control, as different repositories can have separate permissions.

**Flexibility:**

- Switching between mono repo and multi repo setups can be challenging and may disrupt Git history. Splitting a mono repo into multiple repos is generally easier than merging multiple repos into one.

[[Trace Context Level 3 (w3c.github.io)]{.underline}](https://w3c.github.io/trace-context/)

A good dev setup guide (i.,e readme) should be clear and comprehensive. It should:

1\. Describe the repository\'s purpose and fit within the organization.

2\. Provide instructions on building, navigating, and using the repository.

3\. Include links to wikis for setting up build tools.

4\. Ensure the repository is self-contained, with all necessary dependencies easily accessible.

5\. Specify contact information for the repository\'s owner or relevant team.

6\. Include thorough documentation and possibly revise how wikis are managed on GitHub.

For binary releases, use a coherent branch strategy, often creating a release branch from the development branch. Use cherry picks carefully to maintain clean commit history. Each pull request typically has its own branch.

- For dependency management, inventory all dependencies and explicitly show versions in the code to ensure build consistency.

-

- Explicit versioning is crucial because relying on the latest version of a package can introduce unforeseen breakages, making debugging and historical comparisons difficult. Always specify the version of your libraries to ensure consistency across development environments.

-

- Automate the developer environment setup with scripts or containers to save time and avoid inconsistencies. Use dev containers as much as possible

- For testing, ensure the pipeline runs tests without manual intervention. Avoid modifying code in the pipeline to ensure consistency with local tests. Local development environments should support running tests without relying on CI.

- Building, deploying, and releasing are all separate things.

-

- Integration tests should focus on use cases rather than internal functions. Performance tests should minimize noise and avoid shared resources. End-to-end tests should run post-deployment, with known failures documented.

-

- Version skew tests verify compatibility between different versions running simultaneously. Rollback tests ensure smooth reversion if needed, while partial failure tests confirm resilience under resource constraints.

-

- For multi-region deployments, simulate region failures to test failover and recovery. Automate the process to ensure compliance with SLAs.

-

- Relate software bugs to commits for effective root cause analysis. Use tools like Git bisect to identify and address issues.

-

- Balance leadership demands for testing and rapid deployment by understanding incident impact, notifying customers, and conducting post-mortem analyses for continuous improvement. Create a troubleshooting guide to document symptoms, mitigation steps, and communication protocols to streamline issue resolution.

- Create a script to get a list of changes/commits/prs from the last release to this release, sometimes releases are posted in a chat channel if you are practicing continuous delivery

+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ## [**[ep-3-feature-toggles.mp3]{.underline}**](https://1drv.ms/u/s!AOnf7tByrSaDkzI) {#ep-3-feature-toggles.mp3 .unnumbered} |
| |
| ## **Key Points on Feature Toggles:** {#key-points-on-feature-toggles .unnumbered} |
| |
| **Benefits:** |
| |
| - **Separation of deployment and release:** Enables deploying code without releasing the feature, allowing for controlled rollouts, A/B testing, and experimentation. |
| |
| - **Reduced risk:** Allows for safer deployments by hiding incomplete features and enabling quick rollbacks if issues arise. |
| |
| - **Increased development velocity:** Developers can integrate code more frequently without waiting for a feature to be fully complete. |
| |
| - **Improved product quality:** Facilitates data-driven development by enabling experiments and collecting user feedback on new features. |
| |
| - **Empowers product teams:** Gives product owners more control over feature releases and the ability to target specific user segments. |
| |
| **Getting Started:** |
| |
| - **Start small:** Choose a non-critical feature for your first experiment with feature toggles. |
| |
| - **Focus on code structure:** Minimize the amount of code impacted by a toggle and aim for easy removal once the feature is fully released. |
| |
| - **Collaborate with product:** Educate product owners on the benefits of feature toggles and work together to establish a comfortable workflow. |
| |
| - **Collect baseline data:** Before introducing a new feature, gather data on existing user behavior to measure the impact of the change. |
| |
| - **Don\'t overthink the framework:** Avoid building a complex framework upfront. Start simple and iterate as needed. |
| |
| **Key Considerations:** |
| |
| - **Data is crucial:** Use feature toggles to gather data and analyze user behavior to validate hypotheses and make informed product decisions. |
| |
| - **Technical and business perspectives:** Understand the benefits of feature toggles from both a technical (risk reduction, code quality) and business (experimentation, product evolution) perspective. |
| |
| - **Tooling can help:** Explore existing tools that can simplify feature toggle management, data collection, and experiment analysis. |
| |
| **Overall, feature toggles are a powerful tool for continuous delivery, enabling faster and safer releases, data-driven development, and enhanced collaboration between development and product teams.** |
+===============================================================================================================================================================================================================+
+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ## [**[31c3-6240-en-Reproducible_Builds_mp3.mp3]{.underline}**](https://1drv.ms/u/s!AOnf7tByrSaDlRE) {#c3-6240-en-reproducible_builds_mp3.mp3 .unnumbered} |
| |
| ## **Reproducible Builds: Closing the Trust Gap in Software Security** {#reproducible-builds-closing-the-trust-gap-in-software-security .unnumbered} |
| |
| This talk, featuring Mike from the Tor Project and Seth from EFF, delves into the crucial security concept of reproducible builds and its increasing relevance in today\'s software landscape. |
| |
| **Key Points:** |
| |
| - **The Trust Gap:** Free software promises transparency, but verifying that a binary matches the source code relies on trust in developers and infrastructure. This trust gap exposes users to potential vulnerabilities and malicious code. |
| |
| - **Why Developers Are Targets:** Developers\' computers and build servers, while often assumed secure, are attractive targets for attackers seeking to compromise widely used software and gain access to millions of machines. |
| |
| - **Reproducible Builds as a Solution:** Reproducible builds ensure that anyone can generate an identical binary from the source code, eliminating the single point of failure of the developer\'s machine and making it significantly harder to inject malicious code undetected. |
| |
| - **Examples & Implementations:** The talk highlights successful implementations of reproducible builds, including: |
| |
| - **Tor Browser:** Leveraging the Gideon system for reproducible builds across different platforms. |
| |
| - **Debian:** Achieving reproducible builds for a significant portion of its package repository. |
| |
| - **F-Droid:** Developing a verification server to enhance trust in Android packages. |
| |
| - |
| |
| - **Addressing the Trusting Trust Attack:** Reproducible builds, combined with techniques like diverse double compilation, offer a way to mitigate the \"trusting trust\" attack where backdoors can be hidden in compilers and propagate through software generations. |
| |
| - **Challenges & Future Directions:** |
| |
| - Reproducibility efforts require addressing challenges like build environment variations, timestamps, and file system inconsistencies. |
| |
| - Ensuring software update distribution integrity is crucial and can be enhanced using technologies like blockchain and certificate transparency. |
| |
| - Continuous improvement and adoption of reproducible builds across the software development community are vital for a more secure and trustworthy software ecosystem. |
| |
| - |
| |
| This talk effectively emphasizes the importance of reproducible builds for enhancing software security and encourages developers and users to champion this practice for a more trustworthy digital future. |
+========================================================================================================================================================================================================================================================================================+
+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

+------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ## [**[1w7qpw29ni6lnbex9gksl5y6d961.mp3]{.underline}**](https://1drv.ms/u/s!AOnf7tByrSaDkzU) {#w7qpw29ni6lnbex9gksl5y6d961.mp3 .unnumbered} |
| |
| ## **Key Points from the Continuous Delivery Podcast: Complexity** {#key-points-from-the-continuous-delivery-podcast-complexity .unnumbered} |
| |
| This episode explores complexity in software development from various angles. |
| |
| **What is complexity?** |
| |
| - **Difficulty in completion:** Many dependencies, unreachable stakeholders, and external factors contribute to complexity. |
| |
| - **Unpredictability:** Inability to foresee how changes will impact the system. |
| |
| - **Effort disproportionate to change:** Simple changes requiring extensive coordination and effort. |
| |
| - **Codebase intricacy:** Difficulty understanding code structure, duplication, and fear of unintended consequences. |
| |
| **Causes of complexity:** |
| |
| - **Technical debt and legacy code:** Messy, poorly architected codebases. |
| |
| - **Overly complex frameworks:** Using \"one size fits all\" solutions that introduce unnecessary dependencies. |
| |
| - **Designing for unknown future:** Building features for anticipated needs instead of focusing on current requirements. |
| |
| - **Organizational structure:** Conway\'s Law - system complexity mirrors organizational complexity. Poorly architected systems reflecting organizational changes. |
| |
| **Combating complexity:** |
| |
| - **Merciless refactoring:** Continuously simplify code, keeping methods and classes small. |
| |
| - **True DevOps adoption:** Empowering developers to build automation and simplify workflows and environments. |
| |
| - **Tight feedback loops:** Short planning cycles with frequent feedback from product and end-users. |
| |
| **Identifying and tracking complexity:** |
| |
| - **Cyclomatic complexity, maintainability index, and other static code analysis tools.** |
| |
| - **Time to implement changes: Increasing time indicates growing complexity.** |
| |
| - **Throughput measurement: Low throughput can be a symptom of a complex system.** |
| |
| - **Number of code changes to fix a bug: Multiple changes for a single bug suggest a complex system.** |
| |
| **Other important points:** |
| |
| - **Cynefin framework:** A model for understanding and addressing complexity based on the nature of the problem. |
| |
| - **Stacy complexity matrix:** Applying the Cynefin framework to system design. |
| |
| - **Complexity impacts the entire organization:** From development teams to organizational structure. |
| |
| **Call to action:** |
| |
| - Join the Continuous Delivery Podcast LinkedIn group. |
| |
| - Follow the podcast on Twitter: \@continuouspod. |
+========================================================================================================================================================================+
+------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ## [**[9514875-ep-62-overcoming-blockers-to-continuous-delivery.mp3]{.underline}**](https://1drv.ms/u/s!AOnf7tByrSaDkz8) {#ep-62-overcoming-blockers-to-continuous-delivery.mp3 .unnumbered} |
| |
| ## **Key Points from Continuous Delivery Podcast: Overcoming Blockers** {#key-points-from-continuous-delivery-podcast-overcoming-blockers .unnumbered} |
| |
| This episode discusses common obstacles to achieving Continuous Delivery and offers solutions: |
| |
| **Problems:** |
| |
| - **Penetration Testing as a Bottleneck:** Expensive external pen-testing done in large batches slows down frequent deployments. |
| |
| - **Bureaucracy in Tool Acquisition:** Lengthy procurement processes for essential tools delay Continuous Delivery initiatives by months. |
| |
| - **Fear and Perceived Lack of Freedom:** Blame culture and the perception that individuals can\'t effect change stifle innovation and experimentation. |
| |
| - **Outdated Policies:** Rigid policies, like code freezes or mandatory handoffs, create waste and hinder agility. |
| |
| - **Lack of Slack:** Overbooked schedules and a lack of breathing room prevent teams from experimenting and improving processes. |
| |
| **Solutions:** |
| |
| - **Challenge Assumptions and Policies:** Question the necessity of policies like blanket pen-testing for every change. |
| |
| - **Focus on Education and Collaboration:** Empower developers with security knowledge and work with operations teams to automate deployments. |
| |
| - **Start Small with Experiments:** Find a low-risk area to pilot new practices and build trust with stakeholders. |
| |
| - **Iterative Improvement and Automation:** Gradually automate processes and policies to reduce manual work and increase efficiency. |
| |
| - **Leadership Buy-In and Evangelization:** Secure leadership support to champion Continuous Delivery and overcome organizational resistance. |
| |
| - **Build Trust Through Collaboration:** Involve operations teams early in the development process and work together to create robust deployment practices. |
| |
| - **Emphasize the Importance of Slack:** Advocate for dedicated time to experiment, learn, and improve processes, ultimately paving the way for Continuous Delivery. |
| |
| **Overall Conclusion:** |
| |
| While technical challenges exist, the most significant roadblocks to Continuous Delivery are often rooted in organizational culture, outdated policies, and a lack of slack. Overcoming these obstacles requires a shift in mindset, open communication, and a commitment to continuous improvement. |
+======================================================================================================================================================================================================================================================================================================+
+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

+------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ## [**[default_tc.mp3]{.underline}**](https://1drv.ms/u/s!AOnf7tByrSaDlAE) {#default*tc.mp3 .unnumbered} |
| |
| ## **Key Points from Agile Embedded Podcast with Jonathan Hall:** {#key-points-from-agile-embedded-podcast-with-jonathan-hall .unnumbered} |
| |
| **Topic:** Implementing Continuous Delivery in Reverse (Skipping Automated Tests Initially) |
| |
| **What is Continuous Delivery (CD)?** |
| |
| - CD is the practice of delivering software changes on a continual basis, making a deployable artifact ready automatically upon each change. |
| |
| - It does **not** necessarily mean automatic deployment to production, but having the option to. |
| |
| - Requires Continuous Integration (CI) as a prerequisite, which itself relies on Trunk-Based Development. |
| |
| **Continuous Delivery in Reverse:** |
| |
| - **Start with the desired outcome:** Automate the deployment process first (even if just to a test environment), then work backwards. |
| |
| - **Shift testing left of the merge:** All testing, even manual, should be completed \_before* merging code to the main branch. |
| |
| - **Don\'t rely on batched releases:** Testing becomes more focused and effective when done on individual features, not a collection of changes. |
| |
| **Benefits:** |
| |
| - **Forces identification of bottlenecks:** Highlights inefficiencies in the existing testing process. |
| |
| - **Encourages streamlined testing:** Promotes the adoption of smaller, more focused test suites tailored to specific changes. |
| |
| - **Empowers developers:** Leads to developers becoming more involved in testing, improving code quality and ownership. |
| |
| - **Enables faster feedback loops:** Allows for quicker responses to customer feedback and faster iteration cycles. |
| |
| **Addressing Concerns:** |
| |
| - **Trusting automated testing:** Start by replicating the existing manual process with automation, even if it doesn't fully replace it. |
| |
| - **Regulated industries (e.g., medical devices):** Continuous delivery can streamline regulatory compliance by providing auditable, automated test reports. |
| |
| - **Legacy code:** Prioritize adding tests when making changes to existing code, focusing on areas where confidence is low. |
| |
| **Overall Message:** |
| |
| - Continuous delivery is achievable in various contexts, including embedded systems. |
| |
| - Shifting testing left of the merge, even manual testing, is crucial. |
| |
| - Focus on building trust in the system and iteratively improving the process. |
+==================================================================================================================================================================+
+------------------------------------------------------------------------------------------------------------------------------------------------------------------+

+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| [[pipelines.mp3]{.underline}](https://1drv.ms/u/s!AOnf7tByrSaDlAI) |
| |
| The podcast episode provides a comprehensive guide on adopting CI/CD for your organization. Here\'s a breakdown of the steps involved: |
| |
| **Prerequisites:** |
| |
| 1. **Version Control:** Ensure your codebase is under version control (like Git). This is crucial for tracking changes and enabling collaboration. |
| |
| 2. **Command-Line Builds:** Make sure you can build your project from the command line without manual IDE interaction. This forms the basis for automated builds. |
| |
| **Initial Setup:** |
| |
| 1. **Basic Build Pipeline:** Start by setting up a simple pipeline that: |
| |
| - Builds your project for all targets and release types (debug, release, etc.). |
| |
| - Sends email notifications if a build fails. |
| |
| 2. |
| |
| 3. **Discipline:** Cultivate a culture of addressing build failures immediately. A broken pipeline loses its value if ignored. |
| |
| **Enhancing the Pipeline:** |
| |
| 1. **Static Analysis:** Integrate static analysis tools (like Cppcheck) to enforce coding standards and catch potential issues early on. Choose an existing standard with readily available rule sets to avoid reinventing the wheel. |
| |
| 2. **Unit Testing:** Gradually introduce unit tests, prioritizing new code and high-risk areas. Aim for incremental improvements in code coverage. |
| |
| 3. **Code Formatting:** Enforce consistent code formatting using automated tools. This minimizes stylistic debates and keeps the codebase clean. |
| |
| **Advanced Techniques:** |
| |
| 1. **Metrics and Dashboards:** Track code metrics (build time, binary size, code coverage, etc.) over time to gain insights into your project\'s health. Visual dashboards can make these trends easily digestible. |
| |
| 2. **On-Target Testing:** Set up automated testing on your target hardware. This might require dedicated devices or scheduled overnight runs. Script the flashing, testing, and result parsing to gain confidence in your deployment process. |
| |
| **General Principles:** |
| |
| - **Start Small, Iterate:** Begin with a minimal setup and gradually add features. |
| |
| - **Treat Scripts as Code:** Write clean, well-documented build scripts that are easy for humans to understand. |
| |
| - **Containerization (Docker):** Consider using containers to simplify environment setup and ensure consistency across development machines and build servers. |
| |
| - **Single Source of Truth:** Avoid duplicating logic between build scripts and the pipeline itself. Keep all essential information within version control. |
| |
| - **Embrace Feedback:** Pay attention to pipeline failures and address them promptly. The system is there to help you catch issues early. |
| |
| **Key Takeaways:** |
| |
| The benefits of CI/CD extend beyond just faster builds. By implementing these practices, you build trust in your process, improve code quality, and gain valuable documentation along the way. Remember, the journey to a robust CI/CD system is iterative. Start small, build incrementally, and always strive to learn and adapt. |
+=====================================================================================================================================================================================================================================================================================================================================+
+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

Makefile Example

Here's a simple makefile that demonstrates dependencies and compilation for a C program:

```

main.o: main.c mathFunctions.h utilFunctions.h

gcc -c main.c

utilFunctions.o: utilFunctions.c utilFunctions.h

gcc -c utilFunctions.c

mathFunctions.o: mathFunctions.c mathFunctions.h

gcc -c mathFunctions.c

```

This format allows developers to easily manage and scale complex projects with numerous dependencies.

**Aside start**

IDE-Specific Build Processes

Different IDEs manage build processes uniquely, often abstracting complex commands into user-friendly interfaces with detailed logs available for troubleshooting. For instance, Visual Studio provides build command details through its verbosity settings, while IntelliJ IDEA and Eclipse offer insights via built-in terminals and verbose output settings. Xcode allows developers to track build commands and order through the \"Report Navigator.\"

Different Integrated Development Environments (IDEs) have varied ways of presenting build commands and the order in which they\'re run. Here are instructions for a couple of popular IDEs:

[[Debugging in Visual Studio Code]{.underline}](https://code.visualstudio.com/docs/editor/debugging) (i.e., launch.json file)

1\. **Visual Studio (for C++/C#)**:

- **Build Commands**: Visual Studio uses `msbuild` for building its projects. To see the exact build commands:

1\. Go to the \"Tools\" menu.

2\. Select \"Options.\"

3\. Navigate to \"Projects and Solutions\" -\> \"Build and Run\".

4\. In the \"MSBuild project build output verbosity\" dropdown, select \"Detailed\" or \"Diagnostic\" to increase the verbosity of the build output.

- **Build Order**: The build order can also be observed in the output window when you build the solution, especially if you\'ve set the verbosity to \"Detailed\" or \"Normal.\"

![](./images/image45.png)

The build log might have many things. This is normally useful for troubleshooting, it's less likely that you'll need to provide manual commands. If you have a legacy project, or it's complex, then you might need to provide custom commands.

2\. **IntelliJ IDEA (for Java)**:

- **Build Commands**: IntelliJ IDEA uses its own builder, but you can see the build commands if you\'re using Maven or Gradle by looking at the output when you run the respective build lifecycle or task.

1\. Open the \"Terminal\" tab (usually at the bottom).

2\. Run your build tool command, e.g., `mvn compile` for Maven.

3\. The executed commands will be printed in the terminal.

- **Build Order**: If you\'re using a build tool like Maven, the build lifecycle phases determine the order. For a default Java project in IntelliJ, the IDE handles this, and you can infer the order by observing the messages in the \"Build\" tool window.

3\. **Eclipse (for Java)**:

- **Build Commands**: Eclipse uses its own builder for Java. To see detailed build info:

1\. Go to \"Window\" -\> \"Preferences.\"

2\. Navigate to \"General\" -\> \"Workspace\".

3\. Check \"Enable verbose output for the build.\"

- **Build Order**: Eclipse handles the order internally for Java builds. For more detailed projects, you\'d likely be using a tool like Maven, in which case the build lifecycle phases determine the order.

4\. **Xcode (for C++/Swift/Objective-C)**:

- **Build Commands**:

1\. Go to \"Xcode\" in the top menu.

2\. Select \"Preferences.\"

3\. Navigate to \"Locations\" tab.

4\. Set the \"Derived Data\" location to \"Relative\".

5\. After building, in the \"Report Navigator\" (rightmost tab in the left pane), you can see the build logs. Click on the latest build under the \"Build\" section.

- **Build Order**: This is determined by the dependencies set up in your project. You can observe this order in the build logs in the \"Report Navigator\" after a build.

For all these IDEs, reading the output or log pane during a build will give you a good sense of the commands executed and their sequence.

**Aside end**

### Selecting build tools {#selecting-build-tools .unnumbered}

Tips on selecting build tools:

- "Favor specific, portable tools over hacking"

  - ChatGPT summary of paper explanation: "A CI bad smell arises from a sub-optimal selection of tools in the CI pipeline, which can lead to delays and force developers to adopt hacking solutions like custom shell scripts. These scripts may initially solve the problem but can later cause maintainability and portability issues. To avoid this, developers should use suitable plugins instead of shell scripts and be cautious of different versions of tools conflicting with each other on the same server."

- "Do not use out-of-the-box tools, nor listen customers only"

  - ChatGPT summary of paper explanation: "Proper configuration of tools is essential in software development, and using external tools with default configurations is a bad practice. Involving developers in defining quality gates is crucial, as relying solely on customer requirements may lead to irrelevant warnings and slow down the CI process. Quality gates should be established with input from both developers and customers to ensure an efficient and effective CI process."

- Build scripts are highly dependent upon the IDE (BM2)

  - " The two most positively assessed bad smells were related to the usage of absolute paths in the build (BM1), and the coupling between the build and the IDE (BM2). The high perceived relevance of such smells is justified considering that their presence 26 Fiorella Zampetti et al. will unavoidably limit the portability of the build resulting in statements such as "but it works on my machine"."

  - Certain IDEs install their build and compilation software in hard-coded locations that may or may not be used by the configuration files in the program. This means that other people who use different IDEs may not have those exact same paths, which makes the application IDE dependent. This can cause issues with portability, as the CI server must also be set up exactly the same, which isn't guaranteed (as the workspace folder is usually dynamic.) This can cause configuration errors.

  - Might be hard to collaborate and share configuration with others, as configuration is mixed in with personal preferences and build settings that are required for the application to run. This can also make it difficult for other people to use their IDEs.

  - If the builds are too dependent on the IDE, then it might be difficult to run them or reproduce the environment on CI. This is because the IDE may have custom settings, or special versions of software, that are specific to a single developer. Or, they may be using environment variables injected at build time that the CI does not use. This can change application behavior and make it difficult to build.

Normally, the type of project you are trying to build can be determined via a few heuristics. First, you can try using github-linguist to determine what programming languages are used in the project the most frequently. Programming languages that are commonly used help indicate which type of project it is.

- Java is code -\> byte code -\> run it on JVM

- Python is code -\> interpreted by interpreter

- C# write code -\> compile -\> dll (or exe), if dll then it is included (optionally) as part of another program

- There are many ways in which your IDE can be configured. These are the most common build tools for most projects. Consult the documentation for your IDE for more specific instructions, such as if you use special build steps or plugins

+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Use github-linguist to determine what type of project you're running. A project might contain many different languages; this gives you a high level overview of where to start in terms of build script. |
| |
| In this case, this is clearly a TypeScript project. It also has a packages.json file, indicating that it is an npm project. |
| |
| alex@DESKTOP-7M8V9ET:/dev/shm\$ github-linguist angular-cli/ |
| |
| 94.69% 3661931 TypeScript |
| |
| 2.60% 100620 Starlark |
| |
| 1.36% 52459 JavaScript |
| |
| 0.77% 29939 HTML |
| |
| 0.33% 12624 EJS |
| |
| 0.21% 8143 Shell |
| |
| 0.03% 1281 jq |
| |
| 0.00% 160 CSS |
| |
| 0.00% 36 SCSS |
+==========================================================================================================================================================================================================+
+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

- Projects may have dependency manifests, which are specific to a certain programming language or project type. Check to see which file(s) exist in the root directory of your project.

- The most important part of making sure that your application is fit for release is to make sure that it compiles. If code does not compile, then other developers cannot integrate on top of your work, because they can't compile their own code. Compiling the code makes sure that the build artifacts can be generated. Without compiling, errors can be slowly introduced into the codebase, which makes other developers unable to test their work.

---

**Source** **Programming Language** **Files that indicate what project type it is** **How to build** **How to test**

---

[[https://github.com/heroku/heroku-buildpack-ruby/blob/main/bin/detect]{.underline}](https://github.com/heroku/heroku-buildpack-ruby/blob/main/bin/detect) Ruby Gemfile,Rakefile You don't really build it, it is not compiled rake test

[[https://github.com/heroku/heroku-buildpack-nodejs/blob/main/bin/detect]{.underline}](https://github.com/heroku/heroku-buildpack-nodejs/blob/main/bin/detect) JavaScript/TypeScript package.json npm ci or npm install, or yarn install or yarn ci, depending on if there is a package-lock.json or yarn.lock present. If there is both then you have issues. This might also require .npmrc files that might exist in your home directory if you are building private packages. Then you have to run one of the scripts in your package.json file, it depends a lot on your application. npm test

[[https://github.com/heroku/heroku-buildpack-clojure/blob/main/bin/detect]{.underline}](https://github.com/heroku/heroku-buildpack-clojure/blob/main/bin/detect) Clojure project.clj /bin/build or lien compile? lien test

[[https://github.com/heroku/heroku-buildpack-python/blob/main/bin/detect]{.underline}](https://github.com/heroku/heroku-buildpack-python/blob/main/bin/detect) Python requirements.txt,setup.py,Pipfile Use pip to install python -m unittest (this will depend)

[[https://github.com/heroku/heroku-buildpack-java/blob/main/bin/detect]{.underline}](https://github.com/heroku/heroku-buildpack-java/blob/main/bin/detect) Java pom.xml,pom.atom,pom.clj,pom.groovy,pom.rb,pom.scala,pom.yaml,pom.yml mvn compile mvn test

[[https://github.com/heroku/heroku-buildpack-gradle/blob/main/bin/detect]{.underline}](https://github.com/heroku/heroku-buildpack-gradle/blob/main/bin/detect) Java build.gradle,gradlew,build.gradle.kts,settings.gradle,settings.gradle.kts gradlew {check, test, build, etc.} could be a lot of things gradlew test

[[https://github.com/heroku/heroku-buildpack-php/blob/main/bin/detect]{.underline}](https://github.com/heroku/heroku-buildpack-php/blob/main/bin/detect) PHP index.php,composer.json composer install Could be many options

[[https://github.com/heroku/heroku-buildpack-go/blob/main/bin/detect]{.underline}](https://github.com/heroku/heroku-buildpack-go/blob/main/bin/detect) Go go.mod,Gopkg.lock,Godeps/Godeps.json,vendor/vendor.json,glide.yaml go build go test

                                                                                                                                                                     C#                         .sln,.csproj,.fsproj,.vbproj files                                                                                                                                                                                                                                 Depends, usually dotnet build                                                                                                                                                                                                                                                                                                                                                              Depends, usually dotnet test

                                                                                                                                                                     C/C++                      C/C++ Look for Makefile, CMakeLists.txt (CMake), or .pro files (qmake). The issue is that Makefiles could be used for multiple types of projects. You may have to check the execs inside of the Makefiles. You might see gcc, g++, as, ld, ar, ranlib, and more.   Depends                                                                                                                                                                                                                                                                                                                                                                                    Depends

---

### {#section-3 .unnumbered}

**How do I install these build tools on the build server?**

#### Linting {#linting .unnumbered}

- Why do I care about linting?

  - [[2110.15246.pdf (arxiv.org)]{.underline}](https://arxiv.org/pdf/2110.15246.pdf) page 5 implies that code linting/formatting is helpful to reduce cognitive load

  - Helps keep code style consistent, and in some cases can prevent bugs. It can also help make code reviews faster because there are fewer concerns with formatting issues.

+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Linting tools help developers identify issues like syntax errors, potential bugs, or non-adherence to coding standards. Here\'s a list of popular linting tools by programming language: |
| |
| ### JavaScript |
| |
| 1\. **ESLint**: Extensible linting utility for JavaScript and JSX. |
| |
| 2\. **JSHint**: A tool to detect errors and potential problems in JavaScript code. |
| |
| 3\. **TSLint**: Linting tool for TypeScript, now deprecated in favor of ESLint with TypeScript plugins. |
| |
| 4\. **StandardJS**: An opinionated linter that enforces a particular style guide. |
| |
| ### Python |
| |
| 1\. **PyLint**: Highly customizable and provides out-of-the-box support for coding standards. |
| |
| 2\. **Flake8**: A tool that wraps around PyFlakes, pycodestyle, and Ned Batchelder's McCabe for complexity checking. |
| |
| 3\. **Black**: The \"Uncompromising Code Formatter,\" which also performs some linting. |
| |
| 4\. **mypy**: For type checking Python code. |
| |
| ### Java |
| |
| 1\. **Checkstyle**: A tool for checking Java coding standards. |
| |
| 2\. **PMD**: A tool that scans Java source code and identifies potential issues. |
| |
| 3\. **FindBugs**: Static code analysis tool for Java. |
| |
| ### C/C++ |
| |
| 1\. **cppcheck**: A static analysis tool for C/C++ code. |
| |
| 2\. **Clang-Tidy**: An extensible framework for diagnosing typical programming errors. |
| |
| 3\. **CPPLint**: A tool for checking C++ code against Google\'s style guide. |
| |
| ### Ruby |
| |
| 1\. **RuboCop**: A Ruby static code analyzer based on the community Ruby style guide. |
| |
| 2\. **Reek**: Tool that examines Ruby classes, modules, and methods and reports code smells. |
| |
| ### Go |
| |
| 1\. **Golint**: A linter for Go source code that follows Google\'s Go style guide. |
| |
| 2\. **Go Vet**: A tool that comes with the Go compiler and checks for correctness. |
| |
| ### PHP |
| |
| 1\. **PHP_CodeSniffer**: Detects violations of a defined set of coding standards. |
| |
| 2\. **PHPStan**: Focuses on finding errors in your code without running it. |
| |
| 3\. **Psalm**: A static analysis tool for finding errors in PHP applications. |
| |
| ### Swift |
| |
| 1\. **SwiftLint**: A tool to enforce Swift style and conventions. |
| |
| 2\. **Tailor**: A static analysis and linting tool for Swift code. |
| |
| ### Rust |
| |
| 1\. **Clippy**: A collection of lints to catch common mistakes and improve Rust code. |
| |
| ### Shell |
| |
| 1\. **ShellCheck**: A shell script static analysis tool for sh/bash scripts. |
| |
| ### HTML/CSS |
| |
| 1\. **HTMLHint**: A static code analysis tool for HTML. |
| |
| 2\. **stylelint**: A linter that helps enforce consistent conventions and avoid bugs in your stylesheets. |
| |
| ### YAML/JSON/XML |
| |
| **1. **yamllint**: A linter for YAML files.** |
| |
| 2\. **jsonlint**: A JSON file linter. |
| |
| 3\. **xmllint**: A linter for XML files. |
| |
| C# |
| |
| Roslyn Analyzers: These are a set of code analyzers based on the .NET Compiler Platform (\"Roslyn\"). They provide real-time feedback on your code in Visual Studio and can be configured using rule sets. |
+============================================================================================================================================================================================================+
+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
