import { test } from "node:test";
import assert from "node:assert/strict";
import tokens from "@vivid-life-theme/design-system";
import { buildTheme } from "./theme-template.mjs";

const FLAVORS = ["midnight", "twilight", "dawn", "noon"];
const VARIANTS = ["red", "orange", "yellow", "green", "blue", "purple"];

// Every fish_(pager_)?color_* line, keeping empty-value lines as `key ""`.
function parseVars(content) {
  const vars = {};
  for (const line of content.split("\n")) {
    if (!line || line.startsWith("#")) continue;
    const [key, ...rest] = line.split(" ");
    vars[key] = rest.join(" ");
  }
  return vars;
}

test("buildTheme produces output for all 24 flavor×variant combinations", () => {
  for (const flavor of FLAVORS) {
    for (const variant of VARIANTS) {
      const content = buildTheme(flavor, variant, tokens);
      assert.match(content, /^# name: 'Vivid Life/);
      const vars = parseVars(content);
      assert.ok(
        vars.fish_color_normal,
        `${flavor}+${variant}: missing fish_color_normal`,
      );
      assert.ok(
        vars.fish_color_command,
        `${flavor}+${variant}: missing fish_color_command`,
      );
    }
  }
});

test("no value contains a leading '#' (fish .theme hex has no #)", () => {
  const content = buildTheme("midnight", "purple", tokens);
  for (const line of content.split("\n")) {
    assert.ok(
      !line.includes("#") || line.startsWith("#"),
      `stray '#' in: ${line}`,
    );
  }
});

test("fish_color_command uses the accent resolved from accent_shade", () => {
  const content = buildTheme("midnight", "purple", tokens);
  const vars = parseVars(content);
  const shade = tokens.accent_shade.midnight.purple;
  const expected = tokens.palette.purple[shade].slice(1);
  assert.equal(vars.fish_color_command, expected);
  assert.equal(vars.fish_color_cwd, expected);
});

test("error/status/cwd_root map to semantic.danger", () => {
  const content = buildTheme("dawn", "blue", tokens);
  const vars = parseVars(content);
  const danger = tokens.flavors.dawn.semantic.danger.slice(1);
  assert.equal(vars.fish_color_error, danger);
  assert.equal(vars.fish_color_status, danger);
  assert.equal(vars.fish_color_cwd_root, danger);
  assert.equal(vars.fish_color_cancel, `${danger} --reverse`);
});

test("background-only vars use --background= with no bare color", () => {
  const content = buildTheme("noon", "green", tokens);
  const vars = parseVars(content);
  const selection = tokens.flavors.noon.state.selection.slice(1);
  assert.equal(vars.fish_color_selection, `--background=${selection}`);
  assert.equal(vars.fish_color_search_match, `--background=${selection}`);
  assert.equal(
    vars.fish_pager_color_selected_background,
    `--background=${selection}`,
  );
});

test("flag-only vars carry no color", () => {
  const content = buildTheme("twilight", "yellow", tokens);
  const vars = parseVars(content);
  assert.equal(vars.fish_color_history_current, "--bold");
  assert.equal(vars.fish_color_valid_path, "--underline");
});

test("secondary pager vars are left empty (fish falls back to primary)", () => {
  const content = buildTheme("midnight", "red", tokens);
  const vars = parseVars(content);
  assert.equal(vars.fish_pager_color_secondary_background, "");
  assert.equal(vars.fish_pager_color_secondary_completion, "");
  assert.equal(vars.fish_pager_color_secondary_description, "");
  assert.equal(vars.fish_pager_color_secondary_prefix, "");
});
