---
name: qa-hardening
description: "Nothing to install. Finds what the happy-path tests miss, on any stack: edge-case and boundary inputs, a security review (injection, XSS, auth, secrets, unsafe dependencies), accessibility (WCAG), performance hot spots, and a test-first fix loop. Use when testing or reviewing a finished task, writing a bug report, or checking a change before it ships."
license: MIT
metadata:
  source: https://github.com/iging/sauron (core/skills/qa, core/skills/security/security-audit.md, skills/frontend/accessibility-auditor, skills/devops/performance-principles)
---

# QA hardening

Pick the rows that match what the change touches, read **only those references**, and turn every
miss into a concrete bug report or a test.

| The change… | Read |
|---|---|
| Takes input, parses data, does maths or handles dates, money or lists | `references/edge-fuzzer.md` |
| Touches auth, user input, HTML output, files, SQL, secrets or dependencies | `references/security-audit.md` |
| Changes any screen a person uses | `references/accessibility-auditor.md` |
| Runs in a loop, queries a database, renders a long list or loads assets | `references/performance-principles.md` |
| Needs a failing test before the fix | `references/tdd-runner.md` |

## Rules for using it

- **Test, don't fix.** A tester reports what fails, with the input that breaks it and what was
  expected; the developer fixes it.
- Use the project's own test runner and the commands you are allowed. A reference may name tools
  the project doesn't have (fuzzers, scanners, load testers): apply the idea with the project's
  existing tests instead of installing anything.
- References name owner agents (Pippin, Boromir…) and files from their source repository. Those
  aren't here. Skip them, and read the role as yours.
