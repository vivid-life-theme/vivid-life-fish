// Maps Vivid Life foundation tokens to a fish `.theme` file.
// One pure function: (flavor, variant, tokens) -> file content string.
//
// Fish's own color surface is narrow — fish_color_* / fish_pager_color_*
// variables for shell syntax highlighting and the completion pager. There is
// no ANSI terminal palette to set here; that belongs to the terminal
// emulator, out of scope for this port. See the `fish_config theme dump`
// output (`man fish_config`, THEME FILES section) for the file format this
// mirrors.

const label = {
  midnight: "Midnight",
  twilight: "Twilight",
  dawn: "Dawn",
  noon: "Noon",
};
const variantLabel = {
  red: "Red",
  orange: "Orange",
  yellow: "Yellow",
  green: "Green",
  blue: "Blue",
  purple: "Purple",
};

function hex(value) {
  return value.startsWith("#") ? value.slice(1) : value;
}

function resolveAccent(tokens, flavor, variant) {
  const shade = tokens.accent_shade[flavor][variant];
  return tokens.palette[variant][shade];
}

export function buildTheme(flavor, variant, tokens) {
  const f = tokens.flavors[flavor];
  const { surface, text, state, semantic, syntax } = f;
  const accent = resolveAccent(tokens, flavor, variant);
  const name = `Vivid Life · ${label[flavor]} · ${variantLabel[variant]}`;

  const vars = [
    // shell syntax
    ["fish_color_normal", hex(text.fg)],
    ["fish_color_command", hex(accent)],
    ["fish_color_keyword", hex(syntax.keyword)],
    ["fish_color_quote", hex(syntax.string)],
    ["fish_color_redirection", hex(syntax.punct)],
    ["fish_color_end", hex(syntax.punct)],
    ["fish_color_error", hex(semantic.danger)],
    ["fish_color_param", hex(syntax.parameter)],
    ["fish_color_option", hex(syntax.attr)],
    ["fish_color_comment", hex(syntax.comment)],
    ["fish_color_operator", hex(syntax.keyword)],
    ["fish_color_escape", hex(syntax.constant)],
    ["fish_color_autosuggestion", hex(text.fg_subtle)],
    ["fish_color_cwd", hex(accent)],
    ["fish_color_cwd_root", hex(semantic.danger)],
    ["fish_color_user", hex(syntax.function)],
    ["fish_color_host", hex(text.fg_muted)],
    ["fish_color_host_remote", hex(semantic.warning)],
    ["fish_color_status", hex(semantic.danger)],
    ["fish_color_cancel", `${hex(semantic.danger)} --reverse`],
    ["fish_color_search_match", `--background=${hex(state.selection)}`],
    ["fish_color_selection", `--background=${hex(state.selection)}`],
    ["fish_color_match", `--background=${hex(semantic.info)}`],
    ["fish_color_history_current", "--bold"],
    ["fish_color_valid_path", "--underline"],
    // pager
    ["fish_pager_color_prefix", hex(accent)],
    ["fish_pager_color_completion", hex(text.fg)],
    ["fish_pager_color_description", hex(text.fg_subtle)],
    ["fish_pager_color_progress", hex(text.fg_subtle)],
    ["fish_pager_color_background", ""],
    [
      "fish_pager_color_selected_background",
      `--background=${hex(state.selection)}`,
    ],
    ["fish_pager_color_selected_completion", hex(text.fg)],
    ["fish_pager_color_selected_description", hex(text.fg_subtle)],
    ["fish_pager_color_selected_prefix", hex(accent)],
    ["fish_pager_color_secondary_background", ""],
    ["fish_pager_color_secondary_completion", ""],
    ["fish_pager_color_secondary_description", ""],
    ["fish_pager_color_secondary_prefix", ""],
  ];

  const lines = [
    `# name: '${name}'`,
    `# preferred_background: ${hex(surface.bg)}`,
    "",
    ...vars.map(([key, value]) => (value ? `${key} ${value}` : key)),
  ];

  return lines.join("\n") + "\n";
}
