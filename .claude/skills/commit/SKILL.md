---
name: commit
description: Stage and commit work with a meaningful conventional-commit message, after reviewing the diff and splitting unrelated changes into separate commits. Use when the user asks to commit, save, or check in changes, or says "commit this" / "write a commit message".
allowed-tools: Bash, Read, Grep, Glob
---

# Commit changes

Produce commits a reader can understand a year from now — one logical change per commit,
with a message that says what changed and why.

## Repo conventions

- Monorepo with `packages/devfolio-next-app` and `packages/ui-components`; use the package
  area as the commit scope.
- No test suite and no git hooks. Lint is `npm run lint --workspace=devfolio-next-app`.
- Never commit directly to `main` or `staging`. `develop` is acceptable for small work, but
  prefer a feature branch — see [Branch check](#1-branch-check).

## Steps

### 1. Branch check

```bash
git branch --show-current
```

- On `main` or `staging`: stop. Create a feature branch first (`feat/…`, `fix/…`, `docs/…`,
  `chore/…`) and commit there.
- On `develop` with more than a trivial change: offer to branch before committing.

### 2. Review what you are about to commit

Run together and read the output — never write a message from the file list alone:

```bash
git status
git diff              # unstaged
git diff --staged     # already staged
git log --oneline -10 # match the surrounding message style
```

If something is already staged, respect it: the user may have staged deliberately. Confirm
before adding to their selection.

### 3. Choose what goes in

- Stage **only** files that belong to the change being described. Name paths explicitly;
  avoid `git add -A` and `git add .` unless the whole tree is genuinely one change.
- **Never commit**: `.env` files, credentials, API keys, `.DS_Store`, `node_modules`, build
  output (`.next`, `out`, `dist`), or large binaries. If one appears in `git status`, tell the
  user rather than silently staging it.
- Scan the diff for secrets (tokens, keys, connection strings) before staging. Stop and say so
  if you find any.
- Leave debug leftovers out — stray `console.log`, commented-out blocks, temporary colors.
  Point them out instead of committing them.

### 4. Split unrelated work

If the diff covers several unrelated concerns (a feature *and* a refactor *and* a dependency
bump), make separate commits — stage per file or per hunk:

```bash
git add packages/devfolio-next-app/src/app/components/hero
git commit -m "…"
git add packages/devfolio-next-app/src/app/globals.css
git commit -m "…"
```

A commit that needs "and" three times in its subject is really three commits.

### 5. Write the message

```
<type>(<scope>): <subject>

<body — why, and anything non-obvious about how>

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>
```

**Subject**: lowercase, imperative mood ("add", not "added"/"adds"), no trailing period, ≤ 72 chars.

- `type`: `feat` | `fix` | `docs` | `refactor` | `perf` | `style` | `test` | `chore` | `build` | `ci`
- `scope`: the area touched — `header`, `hero`, `background`, `layout`, `ui-components`, `deps`.
  Omit when the change spans the app.

**Body**: wrap at ~72 chars. Include it whenever the change is not self-evident from the subject.
Explain the *reason* — the bug's symptom, the constraint, the trade-off. Skip it for genuinely
trivial commits (a typo fix, a version bump).

| Bad | Good |
| --- | --- |
| `updates` | `feat(hero): add parallax background layer` |
| `fixed bug` | `fix(header): stop glass state flapping at the scroll threshold` |
| `All components` | `feat(hero): extract hero section into its own component tree` |
| `refactored stuff and fixed nav` | two commits: `refactor(header): …` and `fix(header): …` |

Rules:

- Describe the change, not the session. No "as requested", "per feedback", "final version".
- Do not claim verification you did not perform.
- Reference an issue in the body (`Refs #5`) rather than crowding the subject.

### 6. Commit

Use a heredoc so the body and trailer keep their line breaks:

```bash
git commit -m "$(cat <<'EOF'
feat(hero): add parallax background layer

The hero sat flat against the page background, so the section read as
static on scroll. Adds a transform-driven layer behind the copy, disabled
under prefers-reduced-motion.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>
EOF
)"
```

Never pass `--no-verify`, never amend or rebase commits that are already pushed, and do not
push unless the user asks.

### 7. Report back

```bash
git status
```

Confirm the commit landed, name the branch, and list anything left uncommitted on purpose.

## Checks before you call it done

- [ ] Not committing to `main` or `staging`
- [ ] Every staged file belongs to the change described
- [ ] No secrets, env files, build output, or `.DS_Store` staged
- [ ] Subject is conventional-commit form, imperative, ≤ 72 chars
- [ ] Body explains *why* whenever that is not obvious
- [ ] Unrelated changes were split into separate commits
- [ ] `Co-Authored-By` trailer present
