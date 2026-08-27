# Learnings

Corrections and observations collected during configuration sessions. Entries are tagged by skill and dated.

---

[vivid-life-theme] Fish 3.4+/4.x has a native theme system: `fish_config theme choose/list/show/dump`, reading `.theme` files from `~/.config/fish/themes/`. Format is flat `variable value [--flags]` lines (see `man fish_config`, THEME FILES section; confirmed against installed fish 4.8.1 via `fish_config theme dump`). The theme's picker identifier is the file's basename (without `.theme`), not any `# name:` comment inside it — 2026-08-26
[vivid-life-theme] Fisher (fish plugin manager) copies a plugin repo's arbitrary top-level directories into `$__fish_config_dir` as-is, so shipping themes at `themes/*.theme` makes `fisher install vivid-life-theme/vivid-life-fish` land them directly in `~/.config/fish/themes/` with no extra install script needed — 2026-08-26
[vivid-life-theme] Fish's own color surface (fish_color__/fish_pager_color__) covers only shell syntax highlighting + completion pager — no ANSI terminal palette. Confirmed with the user this port intentionally excludes ANSI/terminal-emulator colors as out of scope — 2026-08-26
