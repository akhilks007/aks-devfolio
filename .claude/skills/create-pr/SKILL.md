---
name: create-pr
description: Create a pull request for the current branch with a meaningful conventional-commit title and a full description (Summary, What changed, Test plan). Use when the user asks to open/raise/create a PR, "push this up for review", or wants an existing PR's title/body rewritten.
allowed-tools: Bash, Read, Grep, Glob
---

# Create a pull request

Open a PR whose title and body a reviewer can act on without reading the diff first.

## Repo conventions

- **Base branch is `develop`**, not `main`. Only target `main` when the user explicitly asks
  for a release/hotfix into main (`develop` → `staging` → `main` is the promotion path).
- Remote is `origin` (`akhilks007/aks-devfolio`), GitHub, `gh` CLI available.
- Monorepo: work usually lands under `packages/devfolio-next-app/`. Scope the title accordingly.

## Steps

### 1. Gather context — never write the PR from memory

Run these together and read the output before drafting anything:

```bash
git status
git branch --show-current
git log --oneline origin/develop..HEAD
git diff origin/develop...HEAD --stat
git diff origin/develop...HEAD
```

If the diff is large, still read the full diff for the files that carry the behaviour change;
`--stat` alone is not enough to describe *what* changed.

### 2. Handle uncommitted work

- Uncommitted changes that belong to this PR: ask the user whether to commit them, then commit
  with a conventional-commit message. Do not commit unrelated stray files.
- If the current branch is `develop`, `staging`, or `main`: stop and create a feature branch
  first (`feat/…`, `fix/…`, `docs/…`, `chore/…`, or `#<issue>-<slug>`), then move the work there.

### 3. Push

```bash
git push -u origin <branch>
```

If the branch already has an open PR, update that PR (`gh pr edit`) instead of creating a second one.

### 4. Write a meaningful title

Format: `<type>(<scope>): <what changed>` — lowercase, imperative, no trailing period, ≤ 72 chars.

- `type`: `feat` | `fix` | `docs` | `refactor` | `perf` | `style` | `test` | `chore` | `build` | `ci`
- `scope`: the area touched — `header`, `hero`, `background`, `layout`, `deps`, … Omit if it spans the app.

The title must name the actual change, not the activity:

| Bad | Good |
| --- | --- |
| `Updates` / `Changes from today` | `feat(hero): add parallax background layer` |
| `Fix bug` | `fix(header): keep glass state stable when scrolling past the threshold` |
| `Header stuff` | `refactor(header): extract nav variants into shared module` |

If the branch closes an issue, keep the repo's `[#<n>]` habit only when the user asks; otherwise
reference the issue in the body with `Closes #<n>`.

### 5. Write the description

Always include these sections. Omit a section only when it genuinely has nothing in it.

```markdown
## Summary

1–3 sentences: what this changes and *why*. Lead with the problem or the gap, then the fix.
Written for a reviewer who has not seen the branch.

## What changed

Grouped bullets under bold sub-headings when the PR touches several areas
(e.g. **Navigation & layout**, **Interaction & motion**, **Accessibility**, **Styling cleanup**).
Each bullet states the change and, where the choice is non-obvious, the reason for it.
Name files and symbols with backticks so they are searchable.

## Notes for review

Anything the reviewer should know: placeholders left in, follow-ups deliberately deferred,
trade-offs taken, or parts that only degrade gracefully until a later PR lands.
Skip this section if there is genuinely nothing.

## Test plan

Checklist of what was verified, or what the reviewer should verify.
Tick `[x]` only for what you actually ran; leave `[ ]` for manual checks still outstanding.
```

Rules for the body:

- Describe the change, never the process ("I then noticed…", "as requested" — cut it).
- No invented verification. If tests, lint, or a build were not run, do not claim they were.
- Call out anything user-visible: routes, layout shifts, breaking props, new env vars, deps added.
- Flag accessibility and reduced-motion behaviour for UI work — this repo cares about both.

### 6. Create it

Use a heredoc so the body keeps its newlines:

```bash
gh pr create --base develop --head "$(git branch --show-current)" \
  --title "feat(scope): …" \
  --body "$(cat <<'EOF'
## Summary
…

## What changed
…

## Test plan
- [ ] …

🤖 Generated with [Claude Code](https://claude.com/claude-code)
EOF
)"
```

Add `--draft` when the work is incomplete or the user says so.

### 7. Report back

Return the PR URL, plus one line naming the base branch and anything left unverified in the
test plan.

## Checks before you call it done

- [ ] Base branch is correct (`develop` unless told otherwise)
- [ ] Title is conventional-commit form and names the actual change
- [ ] Summary explains *why*, not just *what*
- [ ] Every "What changed" bullet is backed by something in the diff
- [ ] Test plan claims nothing that was not run
- [ ] Attribution footer present
