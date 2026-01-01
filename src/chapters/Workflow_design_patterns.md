## Workflow Design Patterns

### 1. Readable Shell Scripts

* Avoid **long, unreadable command lines** with heavy escaping. Instead:

 * Use **here-docs** for multi-line literals:

 ```bash
```bash
 cat << EOF
```
 Line 1
 Line 2
 Line 3
 EOF
 ```
 * Break long commands with `\` so each step is clear:

 ```bash
```bash
 find . -type f -name "*.txt" -exec wc -l {} + \
```
 | awk '$1 >= 100' \
 | sort -nr \
 | head -n 5 \
 | awk '{print "File: " $2 " - Line Count: " $1}'
 ```
* Multi-line formatting improves **readability** for pipelines.
* Use **functions** in bash scripts for organization.
* Add **error checking** so you know which command failed.
* Use semicolons (`;`) when chaining commands on one line.

---

### 2. Matrix Builds in CI/CD

* **Matrix builds** let you run the same job across multiple environments (OS, language versions).
* **`if` conditions** restrict steps/jobs to certain environments.

#### Issues with combining matrix + `if`

1. **Redundancy**: You may spin up jobs that immediately skip steps, wasting CI resources.
2. **Complexity**: Too many conditionals make workflows hard to follow.

#### When it’s acceptable

* Most steps are common, with only a few OS-specific conditions.
* Conditional logic is **minimal** and doesn’t bloat the workflow.

#### Best practices

* Use **separate jobs or workflows** if environments differ significantly.
* Keep matrix builds for **similar jobs** across environments.
* Optimize for **clarity and maintainability**—complex workflows become fragile.

#### Conclusion

Combining matrix builds with `if` statements isn’t inherently wrong, but it often introduces unnecessary complexity and inefficiency. Default to **simple, targeted workflows** unless the overlap is strong enough to justify a combined approach.
