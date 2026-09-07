# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.1.1] - 2026-09-07

### Changed

- Bumped `@vivid-life-theme/design-system` dependency to 0.9.0.
- `fish_pager_color_selected_background` now uses the dedicated selected-item wash (`accent_mix.selected`, 18% accent over background) instead of reusing the text-selection color (`state.selection`, 25% accent over background), since the pager's highlighted completion row is a selected list item, not a text selection.

## [0.1.0] - 2026-09-01

### Added

- Fish shell port of the Vivid Life Theme design system: 24 generated `.theme` files (4 flavors × 6 variants), built from `@vivid-life-theme/design-system` tokens and installable via Fisher or `fish_config theme choose`.
- Node build script (`build.mjs`, `src/theme-template.mjs`) mapping design-system tokens to fish `fish_color_*`/`fish_pager_color_*` variables.
- Test suite (`src/theme-template.test.mjs`) verifying theme output across all flavor×variant combinations.
- Claude Code project config: CLAUDE.md, settings, `vivid-life-theme` skill, and a `release` skill for tagging and publishing GitHub Releases.
- GitHub Actions workflows for Claude Code PR review and `@claude` mention triggers.

### Changed

- Bumped `@vivid-life-theme/design-system` dependency to 0.7.0 (no theme output change).
