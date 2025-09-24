Don't use curl | bash because there is no trusted maintainer, the URL could redirect (or someone else can take over the domain), network connection is closed, or, it might hide its content via the user-agent check. Invoke-WebRequest for PS not good because it can execute javascript.

[[[About code owners - GitHub Docs]{.underline}]{.mark}](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-code-owners#codeowners-and-branch-protection)

Keep release pipeline artifacts for 30-90 days, and PR/dev pipelines for 3-7 days.

Consider turning on diagnostic logging for storage accounts and other items.

Use 2FA for everything.

Principle of least privilege. [[Best practices for Azure RBAC | Microsoft Learn]{.underline}](https://learn.microsoft.com/en-us/azure/role-based-access-control/best-practices#only-grant-the-access-users-need)

[[GitHub - dotnet/reproducible-builds: Contains the DotNet.ReproducibleBuilds package]{.underline}](https://github.com/dotnet/reproducible-builds)

Anti-malware scanning for build artifacts

From Microsoft build tools start

https://support.microsoft.com/en-us/windows/antivirus-and-antimalware-software-faq-31f2a46e-fad6-b713-45cf-b9db579973e6#disable_def

https://securitytools.visualstudio.com/Phalanx/_wiki/wikis/Phalanx/74/Armory

https://github.com/PyCQA/bandit

https://github.com/Microsoft/binskim

https://docs.github.com/en/code-security/code-scanning/creating-an-advanced-setup-for-code-scanning/codeql-code-scanning-for-compiled-languages

https://eng.ms/docs/products/credential-risk-exposure-defense

https://securitytools.visualstudio.com/Phalanx/_wiki/wikis/Phalanx/756/CSRF

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


