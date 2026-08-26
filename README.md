# Vivid Life Theme — Fish

A multi-flavor color theme for the [fish shell](https://fishshell.com/). **4 flavors × 6 variants
= 24 themes**, all WCAG AA verified. Generated from the
[Vivid Life design-system foundation](https://github.com/vivid-life-theme/vivid-life-design-system)
— colors and contrast ratios come from a single source of truth.

## Flavors

In time-of-day order:

| Flavor       | Type  | Canvas    |
| ------------ | ----- | --------- |
| **Midnight** | dark  | `#171717` |
| **Twilight** | dark  | `#404040` |
| **Dawn**     | light | `#d4d4d4` |
| **Noon**     | light | `#f5f5f5` |

## Variants

Each flavor is available in six accent variants: **Red · Orange · Yellow · Green · Blue ·
Purple**. The variant re-tints the accent (fish's command/cwd/prefix color); the rest of the
theme stays stable across variants.

## Install

### fisher

```fish
fisher install vivid-life-theme/vivid-life-fish
```

[Fisher](https://github.com/jorgebucaran/fisher) copies this repo's `themes/` directory
straight into `~/.config/fish/themes/`, so the 24 themes are immediately available to
`fish_config theme`.

### Manual

```fish
mkdir -p ~/.config/fish/themes
cp themes/*.theme ~/.config/fish/themes/
```

### Choose a theme

Add one line to `~/.config/fish/config.fish`:

```fish
fish_config theme choose vivid-life-midnight-purple
```

`fish_config theme choose` only applies for the current session — it doesn't persist on its
own, so this line is what makes your pick stick across restarts (same approach as
[Catppuccin for Fish](https://github.com/catppuccin/fish#usage)).

Run `fish_config theme choose` with no arguments for the interactive picker to try variants
before committing one to `config.fish`, or `fish_config theme show` to preview all installed
themes in the terminal.

Default: **Midnight · Purple** (`vivid-life-midnight-purple`), matching the design system's
overall default.

## Scope

Fish's own color surface is `fish_color_*` / `fish_pager_color_*` — shell syntax highlighting
and the completion pager. There is no terminal ANSI palette to set here; that's the terminal
emulator's job and out of scope for this port.

## Recommended companion

**Font** — [Atkinson Hyperlegible Mono](https://www.brailleinstitute.org/freefont) for the
terminal, or its [Nerd Font variant](https://www.nerdfonts.com/font-downloads) if your prompt
(e.g. [Starship](https://starship.rs)) uses icon glyphs.

## Contributing

```bash
npm install
npm run build   # regenerate themes/*.theme from the design-system tokens
npm test        # verify the mapping
npm run format  # prettier
```

Edit `src/theme-template.mjs` to change how foundation tokens map to `fish_color_*`
variables — never hand-edit files under `themes/`, they're generated.

If you need a color or token not in the foundation, that's a foundation gap — open an issue
against [vivid-life-design-system](https://github.com/vivid-life-theme/vivid-life-design-system)
rather than papering over it here.
