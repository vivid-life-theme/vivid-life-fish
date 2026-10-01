// Maps Vivid Life foundation tokens to a fish `.theme` file.
// One pure function: (flavor, variant, tokens) -> file content string.
//
// Fish's own color surface is narrow — fish_color_* / fish_pager_color_*
// variables for shell syntax highlighting and the completion pager. There is
// no ANSI terminal palette to set here; that belongs to the terminal
// emulator, out of scope for this port. See the `fish_config theme dump`
// output (`man fish_config`, THEME FILES section) for the file format this
// mirrors.

import { resolveColor } from "@vivid-life-theme/design-system/tools/build-tokens";

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

// Fish variables with no shell/prompt role in the design system. Left empty so
// fish falls back to the primary pager colors.
const unmappedVars = [
  "fish_pager_color_background",
  "fish_pager_color_secondary_background",
  "fish_pager_color_secondary_completion",
  "fish_pager_color_secondary_description",
  "fish_pager_color_secondary_prefix",
];

function hex(value) {
  return value.startsWith("#") ? value.slice(1) : value;
}

// One role -> the argument string of a fish color variable, e.g.
// "ff0000 --bold --background=112233".
function roleValue(tokens, flavor, variant, role) {
  const resolve = (target) =>
    hex(
      resolveColor(tokens, flavor, variant, target, { surface: "bg_terminal" }),
    );
  const parts = [];
  if (role.color) parts.push(resolve(role.color));
  for (const style of role.style ?? []) parts.push(`--${style}`);
  if (role.background) parts.push(`--background=${resolve(role.background)}`);
  return parts.join(" ");
}

export function buildTheme(flavor, variant, tokens) {
  const name = `Vivid Life · ${label[flavor]} · ${variantLabel[variant]}`;
  const bgTerminal = tokens.flavors[flavor].surface.bg_terminal;

  // shell_roles / prompt_roles list the fish variables each role feeds.
  const vars = [];
  for (const group of [tokens.shell_roles, tokens.prompt_roles]) {
    for (const role of Object.values(group.roles)) {
      const value = roleValue(tokens, flavor, variant, role);
      for (const key of role.fish) vars.push([key, value]);
    }
  }
  for (const key of unmappedVars) vars.push([key, ""]);

  const lines = [
    `# name: '${name}'`,
    `# preferred_background: ${hex(bgTerminal)}`,
    "",
    ...vars.map(([key, value]) => (value ? `${key} ${value}` : key)),
  ];

  return lines.join("\n") + "\n";
}
