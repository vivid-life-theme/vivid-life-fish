# Vivid Life Theme — Fish

A multi-flavor color theme for the [fish shell](https://fishshell.com/). **4 flavors × 6 variants = 24 themes**, all WCAG AA verified, so your eyes never have to file a bug report. Generated from the [Vivid Life design-system foundation](https://github.com/vivid-life-theme/vivid-life-design-system): colors and contrast ratios come from a single source of truth, not from someone squinting at a color picker at 2 a.m.

## Flavors

In time-of-day order. Fish doesn't paint the terminal background (your terminal emulator does), so every color here is checked against the flavor's **terminal background**:

| Flavor       | Type  | Terminal background |
| ------------ | ----- | ------------------- |
| **Midnight** | dark  | `#0a0a0a`           |
| **Twilight** | dark  | `#333333`           |
| **Dawn**     | light | `#d4d4d4`           |
| **Noon**     | light | `#ffffff`           |

For the contrast numbers to hold, pair it with a matching terminal port such as [Windows Terminal](https://github.com/vivid-life-theme/vivid-life-windows-terminal) or [Xfce Terminal](https://github.com/vivid-life-theme/vivid-life-xfce4-terminal), or set your terminal's background to the value above.

## Variants

Each flavor comes in six accent variants: **Red · Orange · Yellow · Green · Blue · Purple**. The variant re-tints the accent (fish's command, cwd and prefix color); everything else stays put across variants.

## Install

### fisher

```fish
fisher install vivid-life-theme/vivid-life-fish
```

[Fisher](https://github.com/jorgebucaran/fisher) copies this repo's `themes/` directory straight into `~/.config/fish/themes/`, so all 24 themes show up in `fish_config theme` right away.

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

`fish_config theme choose` only lasts for the current session. Goldfish memory, fittingly. This line in `config.fish` is what makes your pick survive a restart (same approach as [Catppuccin for Fish](https://github.com/catppuccin/fish#usage)).

To shop around first, run `fish_config theme show` to preview every installed theme in the terminal, or plain `fish_config` to open the browser-based config, where the Colors tab lets you click through themes before committing to one.

Default: **Midnight · Purple** (`vivid-life-midnight-purple`), matching the design system's overall default.

## Scope

Fish's own color surface is `fish_color_*` / `fish_pager_color_*`: shell syntax highlighting and the completion pager. There's no terminal ANSI palette to set here. That's the terminal emulator's job, and this port stays in its lane.

## Recommended companion

**Font:** [Atkinson Hyperlegible Mono](https://www.brailleinstitute.org/freefont) for the terminal, or its [Nerd Font variant](https://www.nerdfonts.com/font-downloads) if your prompt (say, [Starship](https://github.com/vivid-life-theme/vivid-life-starship)) uses icon glyphs.

The rest of the family (terminals, editors, prompts, desktop) lives at [github.com/vivid-life-theme](https://github.com/vivid-life-theme).

## Contributing

```bash
npm install
npm run build   # regenerate themes/*.theme from the design-system tokens
npm test        # verify the mapping
npm run format  # prettier
```

Edit `src/theme-template.mjs` to change how foundation tokens map to `fish_color_*` variables. Never hand-edit files under `themes/`: they're generated, and the next build will flatten your changes faster than you can type `git blame`.

If you need a color or token that isn't in the foundation, that's a foundation gap. Open an issue against [vivid-life-design-system](https://github.com/vivid-life-theme/vivid-life-design-system) rather than papering over it here.

## License

MIT. See [LICENSE](LICENSE).
