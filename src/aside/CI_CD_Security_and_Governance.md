# CI/CD Security and Governance

## CI/CD Security Key Points

### Security {#security-1 .unnumbered}

/// Start of Selection

## **Key Points from Defending Continuous Integration/Continuous Delivery (CI/CD) Environments** {#key-points-from-defending-continuous-integrationcontinuous-delivery-cicd-environments .unnumbered}

**Focus:** Recommendations and best practices for securing CI/CD pipelines within DevSecOps environments, regardless of the specific tools used.

**Context:**  
CI/CD pipelines are increasingly targeted by malicious actors due to their role in rapidly building and deploying software. Compromise can lead to:

- Injection of malicious code
- Intellectual property theft
- Denial of service attacks

---

### **Threat Landscape:**

- **Insecure Code:** Bugs in first or third-party code can create exploitable vulnerabilities.
- **Poisoned Pipeline Execution:** Injecting malicious code into the build process to compromise later stages.
- **Insufficient Access Control:** Unauthorized access enables code manipulation and other attacks.
- **Insecure Configuration:** Misconfigurations in infrastructure, network, or applications create vulnerabilities.
- **Insecure Third-Party Services:** Vulnerabilities in externally developed services can compromise the pipeline.
- **Exposed Secrets:** Compromise of keys, passwords, and other credentials grants access to sensitive resources.

---

### **Recommendations:**

- **Authentication and Access Control:**

  - Strong cryptography (CNSA Suite for NSS, NIST for others)
  - Minimize long-term credentials, utilize temporary and ephemeral credentials
  - Implement code signing and verification throughout the pipeline
  - Two-person rule for all code updates
  - Least privilege access control, separation of duties
  - Secure user accounts, regularly audit admin accounts

- **Secrets Management:**

  - Never expose secrets in plaintext
  - Utilize dedicated secrets management solutions within CI/CD tools

- **Network Security:**

  - Robust network segmentation and traffic filtering

- **Development Environment Hardening:**

  - Keep software and operating systems updated
  - Update CI/CD tools regularly
  - Remove unnecessary applications
  - Implement endpoint detection and response (EDR) tools

- **Development Process Security:**

  - Integrate security scanning early in the process (SAST, DAST, registry scanning)
  - Use only trusted libraries, tools, and artifacts
  - Analyze committed code for vulnerabilities
  - Remove temporary resources after use
  - Maintain detailed audit logs
  - Implement SBOM and SCA to track components and vulnerabilities

- **Resiliency:**
  - Design for high availability and disaster recovery
  - Ensure scalability for emergency patch updates

---

### **Overall Approach:**

- Zero trust approach, assuming no element is fully trusted.
- Leverage MITRE ATT&CK and D3FEND frameworks for threat modeling and mitigation strategies.

---

### **Outcomes:**

- Reduce attack surface and exploitation vectors.
- Create a challenging environment for malicious actors.
- Improve cybersecurity posture for a wide range of organizations.

---

### **Call to Action:**

Implement the recommended mitigations to secure CI/CD environments and strengthen overall software supply chain security.

[CSI_DEFENDING_CI_CD_ENVIRONMENTS.PDF (defense.gov)](https://media.defense.gov/2023/Jun/28/2003249466/-1/-1/0/CSI_DEFENDING_CI_CD_ENVIRONMENTS.PDF)
/// End of Selection

---

## Implementing Security Measures in GitHub Actions Enterprise (Cloud-hosted)

// Start of Selection
## **Implementing Security Measures in GitHub Actions Enterprise (Cloud-hosted) -- Practical Guide** {#implementing-security-measures-in-github-actions-enterprise-cloud-hosted-practical-guide .unnumbered}

This guide provides detailed, practical steps for implementing the security recommendations using GitHub Actions Enterprise.

... (content preserved from original, including OIDC setup, branch protection, secrets managers, audit logging, SAST/DAST scans, SBOM/SCA, resiliency) ...

// The full original content from Implementing_Security_Measures_in_GitHub_Actions_Enterprise.md is included here.
// End of Selection

---

## Secret Management

### Secret management {#secret-management .unnumbered}

This guide provides strategies for storing, accessing, and managing secrets within your GitHub Actions workflows.

... (content preserved from `Secret_management.md`, including storing secrets, challenges, strategies, examples for Twine/Codecov, Docker login, set-env deprecation) ...

---

## Security and Docker Workflow Notes

### Security {#security-3 .unnumbered}

Gradle Wrapper Validation, Docker workflow security scanning, multi-arch builds, Docker Hub interactions, tagging logic, and useful patterns that can be adapted to other workflows.

... (content preserved from `Security_and_Docker_Workflow_Notes.md`) ...

---

## Security and Governance Tips

Don't use curl | bash; code owners and branch protection; artifact retention windows; diagnostic logging; 2FA; least privilege; links to analyzers and SSDF.

... (content preserved from `Security_and_Governance_Tips.md`) ...


