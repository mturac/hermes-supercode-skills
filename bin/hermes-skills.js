#!/usr/bin/env node
import { SKILLS, SKILL_NAMES } from '../lib/registry.js';
import { installAll, installSkill, removeSkill, resolveTargetDir } from '../lib/installer.js';
import { getInstalled } from '../lib/config.js';
import { updateAll, updateSkill } from '../lib/updater.js';

// ANSI helpers
const B = (s) => `\x1b[1m${s}\x1b[0m`;
const G = (s) => `\x1b[32m${s}\x1b[0m`;
const R = (s) => `\x1b[31m${s}\x1b[0m`;
const Y = (s) => `\x1b[33m${s}\x1b[0m`;
const C = (s) => `\x1b[36m${s}\x1b[0m`;
const DIM = (s) => `\x1b[2m${s}\x1b[0m`;

function showHelp() {
  console.log(`
${B('hermes-skills')} — 13 production-grade Claude Code skills

${B('USAGE')}
  npx hermes-skills <command> [options]

${B('COMMANDS')}
  ${C('install')}              Install all 13 skills to ~/.claude/skills/
  ${C('install --local')}      Install all to ./.claude/skills/
  ${C('add <skill>')}          Install a single skill globally
  ${C('add <skill> --local')}  Install a single skill locally
  ${C('remove <skill>')}       Remove an installed skill
  ${C('update')}               Update all installed skills from GitHub
  ${C('list')}                 Show all skills with install status
  ${C('info <skill>')}         Show skill description and triggers
  ${C('--help')}               Show this help

${B('SKILLS')}
  ${SKILL_NAMES.map(n => `  ${C(n)}`).join('\n')}

${B('EXAMPLES')}
  npx hermes-skills install
  npx hermes-skills add db-whisperer
  npx hermes-skills info security-sentinel
`);
}

function showList() {
  const installed = getInstalled();
  const colW = 22;
  console.log(`\n${B('SKILL')}${' '.repeat(colW - 5)}${B('STATUS')}   ${B('TARGET')}`);
  console.log('─'.repeat(80));
  for (const name of SKILL_NAMES) {
    const entry = installed[name];
    const padded = (name + ' '.repeat(colW)).slice(0, colW);
    if (entry) {
      console.log(`${G('✅')} ${B(padded)} ${G('installed')}  ${DIM(entry.target)}`);
    } else {
      console.log(`${DIM('  ' + padded)} ${Y('not installed')}`);
    }
  }
  const count = Object.keys(installed).length;
  console.log(`\n${count}/${SKILL_NAMES.length} installed\n`);
}

function showInfo(name) {
  const skill = SKILLS[name];
  if (!skill) {
    console.error(R(`❌ Unknown skill: ${name}`));
    console.log(`Run ${C('hermes-skills list')} to see available skills.`);
    process.exit(1);
  }
  const installed = getInstalled();
  const entry = installed[name];
  console.log(`
${B(skill.name)}
${skill.description}

${B('Status:')} ${entry ? G('✅ installed → ' + entry.target) : Y('not installed')}

${B('Example triggers:')}
${skill.triggers.map(t => `  • ${t}`).join('\n')}
`);
}

async function cmdInstall(options) {
  const targetDir = resolveTargetDir(options);
  console.log(`\n🔄 Installing all skills to ${C(targetDir)}...\n`);
  const results = await installAll(options);
  for (const r of results) {
    if (r.success) {
      console.log(`  ${G('✅')} ${B(r.name)}`);
    } else {
      console.log(`  ${R('❌')} ${B(r.name)} — ${r.error}`);
    }
  }
  const ok = results.filter(r => r.success).length;
  console.log(`\n${G(`✅ ${ok}/${results.length} skills installed`)}\n`);
}

async function cmdAdd(name, options) {
  if (!SKILLS[name]) {
    console.error(R(`❌ Unknown skill: ${name}`));
    process.exit(1);
  }
  console.log(`\n🔄 Installing ${B(name)}...`);
  try {
    const dest = await installSkill(name, options);
    console.log(`${G('✅')} ${B(name)} → ${DIM(dest)}\n`);
  } catch (err) {
    console.error(R(`❌ ${err.message}`));
    process.exit(1);
  }
}

async function cmdRemove(name) {
  console.log(`\n🔄 Removing ${B(name)}...`);
  try {
    await removeSkill(name);
    console.log(`${G('✅')} ${B(name)} removed\n`);
  } catch (err) {
    console.error(R(`❌ ${err.message}`));
    process.exit(1);
  }
}

async function cmdUpdate() {
  const installed = getInstalled();
  const count = Object.keys(installed).length;
  if (count === 0) {
    console.log(Y('\nNo skills installed. Run hermes-skills install first.\n'));
    return;
  }
  console.log(`\n🔄 Updating ${count} installed skills from GitHub...\n`);
  try {
    const results = await updateAll();
    for (const r of results) {
      if (r.success) {
        console.log(`  ${G('✅')} ${B(r.name)} ${DIM('→ ' + (r.sha || '').slice(0, 7))}`);
      } else {
        console.log(`  ${R('❌')} ${B(r.name)} — ${r.error}`);
      }
    }
    console.log('');
  } catch (err) {
    console.error(R(`❌ Update failed: ${err.message}`));
    process.exit(1);
  }
}

// --- Main ---
const args = process.argv.slice(2);
const flags = args.filter(a => a.startsWith('--'));
const positional = args.filter(a => !a.startsWith('--'));
const options = { local: flags.includes('--local') };
const cmd = positional[0];

if (!cmd || flags.includes('--help') || cmd === 'help') {
  showHelp();
} else if (cmd === 'install') {
  await cmdInstall(options);
} else if (cmd === 'add') {
  const name = positional[1];
  if (!name) { console.error(R('❌ Usage: hermes-skills add <skill-name>')); process.exit(1); }
  await cmdAdd(name, options);
} else if (cmd === 'remove') {
  const name = positional[1];
  if (!name) { console.error(R('❌ Usage: hermes-skills remove <skill-name>')); process.exit(1); }
  await cmdRemove(name);
} else if (cmd === 'update') {
  await cmdUpdate();
} else if (cmd === 'list') {
  showList();
} else if (cmd === 'info') {
  const name = positional[1];
  if (!name) { console.error(R('❌ Usage: hermes-skills info <skill-name>')); process.exit(1); }
  showInfo(name);
} else {
  console.error(R(`❌ Unknown command: ${cmd}`));
  showHelp();
  process.exit(1);
}
