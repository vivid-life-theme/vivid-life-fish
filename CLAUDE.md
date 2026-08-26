# Vivid Life Theme — Fish

Fish shell port of the Vivid Life Theme design system (4 flavors × 6 variants = 24 themes, WCAG AA verified). Companion project to [vivid-life-vs-code](https://github.com/vivid-life-theme/vivid-life-vs-code).

## Key Config Files

| File                                       | Purpose                                                                     |
| ------------------------------------------ | --------------------------------------------------------------------------- |
| `build.mjs`                                | Generates `themes/*.theme` from `@vivid-life-theme/design-system`           |
| `.claude/learnings.md`                     | Auto-collected corrections/observations from config skill runs              |
| `CLAUDE.md`                                | Project instructions, loaded every message                                  |
| `.claude/settings.json`                    | Permissions, hooks, environment variables                                   |
| `.claude/skills/vivid-life-theme/SKILL.md` | Fetches the design-system tokens/foundation for building themed artifacts   |
| `.githooks/pre-commit`                     | Runs `scripts/sync-config-table.sh` before each commit                      |
| `.github/workflows/claude-code-review.yml` | Auto-review on PR open/update                                               |
| `.github/workflows/claude.yml`             | `@claude` mention trigger in issues/PRs                                     |
| `.gitignore`                               | Git ignore patterns                                                         |
| `package.json`                             | npm scripts (`build`, `test`, `format`) and the design-system devDependency |
| `scripts/sync-config-table.sh`             | Keeps this Key Config Files table in sync with the filesystem               |

<!-- cc-config: last-optimize-run: 2026-08-26 1f48f1e7d053455e30a0a1fabb5c168652d5df73 -->

## Commands

- `npm run build` — regenerate `themes/*.theme` from `@vivid-life-theme/design-system`
- `npm test` — run `src/theme-template.test.mjs` (node:test)
- `npm run format` / `npm run format:check` — prettier
- `fish -n <file>.fish` — fish syntax check (for any non-generated `.fish` helper scripts)

## Structure

- `themes/*.theme` — generated output, one file per flavor×variant (`vivid-life-<flavor>-<variant>.theme`). **Never hand-edit** — edit `src/theme-template.mjs` and rebuild.
- `src/theme-template.mjs` — pure `buildTheme(flavor, variant, tokens)` mapping foundation tokens to fish `fish_color_*` / `fish_pager_color_*` variables.
- `build.mjs` — iterates all 24 combinations and writes `themes/`.
- `.theme` file format follows fish's native theme system (`man fish_config`, THEME FILES section) — installable via `fish_config theme choose` or, via fisher, auto-copied to `~/.config/fish/themes/`.

## References

Use the `vivid-life-theme` skill to fetch the design-system tokens (`tokens.json`) and system overview before editing `src/theme-template.mjs` — do not hardcode colors from memory.

## Conventions

- 24 themes = 4 flavors × 6 variants. Keep flavor/variant naming consistent with the upstream design-system and the VS Code port.
- Fish's color surface is narrow (shell syntax + pager only, no ANSI terminal palette) — don't try to smuggle terminal-emulator concerns into this port; that's a different port's scope.

## Don't

- Don't commit secrets or credentials to git
- Don't use --force flags — fix the underlying issue instead
- Don't hardcode color values without pulling them from the design-system tokens via the `vivid-life-theme` skill

## Learnings

When the user corrects a mistake or points out a recurring issue, append a one-line
summary to .claude/learnings.md. Don't modify CLAUDE.md directly.

## Compact Instructions

When compacting, preserve: list of modified files, current test status, open TODOs, and key decisions made.
