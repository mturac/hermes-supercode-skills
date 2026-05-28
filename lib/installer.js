import fs from 'fs';
import path from 'path';
import os from 'os';
import { SKILL_NAMES } from './registry.js';
import { addInstalled, removeInstalled, getInstalled } from './config.js';

const PKG_ROOT = path.resolve(new URL('.', import.meta.url).pathname, '..');

export function resolveTargetDir(options = {}) {
  if (options.local) {
    return path.resolve(process.cwd(), '.claude', 'skills');
  }
  return path.join(os.homedir(), '.claude', 'skills');
}

export async function copySkillFiles(name, targetDir) {
  const srcDir = path.join(PKG_ROOT, 'skills', name);
  const destDir = path.join(targetDir, name);

  if (!fs.existsSync(srcDir)) {
    throw new Error(`Skill source not found: ${srcDir}`);
  }

  await fs.promises.mkdir(destDir, { recursive: true });

  const skillMd = path.join(srcDir, 'SKILL.md');
  if (fs.existsSync(skillMd)) {
    await fs.promises.copyFile(skillMd, path.join(destDir, 'SKILL.md'));
  }

  const refsDir = path.join(srcDir, 'references');
  if (fs.existsSync(refsDir)) {
    await copyDir(refsDir, path.join(destDir, 'references'));
  }
}

async function copyDir(src, dest) {
  await fs.promises.mkdir(dest, { recursive: true });
  const entries = await fs.promises.readdir(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      await copyDir(srcPath, destPath);
    } else {
      await fs.promises.copyFile(srcPath, destPath);
    }
  }
}

export async function installSkill(name, options = {}) {
  const targetDir = resolveTargetDir(options);
  await copySkillFiles(name, targetDir);
  addInstalled(name, path.join(targetDir, name));
  return path.join(targetDir, name);
}

export async function installAll(options = {}) {
  const results = [];
  for (const name of SKILL_NAMES) {
    try {
      const dest = await installSkill(name, options);
      results.push({ name, success: true, dest });
    } catch (err) {
      results.push({ name, success: false, error: err.message });
    }
  }
  return results;
}

export async function removeSkill(name) {
  const installed = getInstalled();
  const entry = installed[name];
  if (!entry) throw new Error(`Skill '${name}' is not installed.`);

  if (fs.existsSync(entry.target)) {
    await fs.promises.rm(entry.target, { recursive: true, force: true });
  }
  removeInstalled(name);
}
