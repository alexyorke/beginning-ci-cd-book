# Reproducible Builds and SBOMs

## The Trust Gap in Software Builds

Free and open-source software promises transparency, but there is a gap between the source code and the binary that ships to users. Users must trust that the developer's build environment was uncompromised and that the resulting binary actually corresponds to the published source. Reproducible builds close this gap by making it possible for anyone to compile the same source and get a bit-for-bit identical output.

This talk ([31c3: Reproducible Builds — Closing the Trust Gap](https://1drv.ms/u/s!AOnf7tByrSaDlRE)) from Mike (Tor Project) and Seth (EFF) covers the core concepts:

- **Why developers are targets:** Build servers and developer machines are high-value attack surfaces. A compromised build server can inject malicious code into software used by millions, with no visible change to the source repository.
- **Reproducible builds as a mitigation:** If the same source always produces the same binary, independent parties can verify the build and detect tampering.
- **Real implementations:** Tor Browser uses the Gideon system; Debian achieves reproducibility across a significant portion of its package archive; F-Droid runs a verification server for Android packages.
- **The trusting trust problem:** Reproducible builds, combined with diverse double-compilation, help address the classic attack where a backdoor is injected into a compiler and propagates through all software it compiles.
- **Remaining challenges:** Build environment variations (timestamps, filesystem ordering, locale), ensuring update distribution integrity.

## Further Resources

- [The Unreproducible Package](https://github.com/bmwiedemann/theunreproduciblepackage/tree/master) — a curated collection of ways builds can fail to be reproducible, useful for testing your own toolchain.
- [GUAC](https://docs.guac.sh/) — Graph for Understanding Artifact Composition; enables automated analysis of software supply chain graphs.
- [FOSDEM 2024: Reproducible Builds — The First Ten Years](https://ftp2.osuosl.org/pub/fosdem/2024/k1105/fosdem-2024-3353-reproducible-builds-the-first-ten-years.mp4) — retrospective on progress across the ecosystem.
- [FOSDEM 2024: Sharing and Reusing SBOMs with the OSSelot Curation Database](https://ftp2.osuosl.org/pub/fosdem/2024/k4401/fosdem-2024-3074-sharing-and-reusing-sboms-with-the-osselot-curation-database.mp4)
- [FOSDEM 2024: Getting Lulled into a False Sense of Security by SBOM and VEX](https://ftp2.osuosl.org/pub/fosdem/2024/k4401/fosdem-2024-3230-getting-lulled-into-a-false-sense-of-security-by-sbom-and-vex.mp4) — important nuance on SBOM limitations.
- [FOSDEM 2024: Phantom Dependencies in Python](https://ftp2.osuosl.org/pub/fosdem/2024/k4401/fosdem-2024-3146-phantom-dependencies-in-python-and-what-to-do-about-them-.mp4)

## Generating an SBOM in GitHub Actions

A Software Bill of Materials (SBOM) is a machine-readable inventory of all components in your software. GitHub can generate one automatically for your repository, or you can produce one as part of your CI pipeline.

### Option 1: GitHub's built-in dependency graph export

GitHub automatically generates a dependency graph for supported ecosystems (npm, pip, Maven, Cargo, etc.). You can export it as an SBOM in SPDX format via the API:

```bash
gh api /repos/{owner}/{repo}/dependency-graph/sbom > sbom.json
```

Or attach it as a release asset from a workflow:

```yaml
- name: Export GitHub SBOM
  run: |
    gh api /repos/${{ github.repository }}/dependency-graph/sbom > sbom.spdx.json
  env:
    GH_TOKEN: ${{ secrets.GITHUB_TOKEN }}

- name: Upload SBOM as artifact
  uses: actions/upload-artifact@v4
  with:
    name: sbom
    path: sbom.spdx.json
```

### Option 2: Syft (for deeper analysis)

[Syft](https://github.com/anchore/syft) generates SBOMs from container images, directories, or lock files and supports CycloneDX, SPDX, and other formats:

```yaml
- name: Install Syft
  uses: anchore/sbom-action/download-syft@v0

- name: Generate SBOM with Syft
  uses: anchore/sbom-action@v0
  with:
    path: .
    format: spdx-json
    output-file: sbom.spdx.json

- name: Upload SBOM
  uses: actions/upload-artifact@v4
  with:
    name: sbom
    path: sbom.spdx.json
```

### What to do with the SBOM

- Attach it to GitHub Releases so downstream users can audit what went into a release.
- Feed it into a vulnerability scanner (e.g., Grype, OSV Scanner) to find known CVEs in your dependency tree.
- Store it as a compliance artifact alongside your release artifacts.

> For the security implications of SBOMs and supply chain security more broadly, see the Security and Reproducibility chapter.
