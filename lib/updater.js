import fs from 'fs';
import path from 'path';
import { getInstalled, addInstalled } from './config.js';

const GITHUB_API = 'https://api.github.com/repos/mturac/hermes-supercode-skills/git/refs/heads/main';
const RAW_BASE = 'https://raw.githubusercontent.com/mturac/hermes-supercode-skills/main/skills';

async function fetchJSON(url) {
  const res = await fetch(url, {
    headers: { 'User-Agent': 'hermes-skills-cli/1.0.0' }
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${url}`);
  return res.json();
}

async function fetchText(url) {
  const res = await fetch(url, {
    headers: { 'User-Agent': 'hermes-skills-cli/1.0.0' }
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${url}`);
  return res.text();
}

export async function checkUpdates() {
  const data = await fetchJSON(GITHUB_API);
  return Array.isArray(data) ? data[0]?.object?.sha : data?.object?.sha;
}

export async function downloadSkillFromGitHub(name, targetDir) {
  const url = `${RAW_BASE}/${name}/SKILL.md`;
  const content = await fetchText(url);
  await fs.promises.mkdir(targetDir, { recursive: true });
  await fs.promises.writeFile(path.join(targetDir, 'SKILL.md'), content, 'utf8');
}

export async function updateSkill(name) {
  const installed = getInstalled();
  const entry = installed[name];
  if (!entry) throw new Error(`Skill '${name}' is not installed.`);

  const latestSha = await checkUpdates();
  await downloadSkillFromGitHub(name, entry.target);
  addInstalled(name, entry.target, latestSha);
  return { name, sha: latestSha };
}

export async function updateAll() {
  const installed = getInstalled();
  const names = Object.keys(installed);
  if (names.length === 0) return [];

  const latestSha = await checkUpdates();
  const results = [];

  for (const name of names) {
    try {
      const entry = installed[name];
      await downloadSkillFromGitHub(name, entry.target);
      addInstalled(name, entry.target, latestSha);
      results.push({ name, success: true, sha: latestSha });
    } catch (err) {
      results.push({ name, success: false, error: err.message });
    }
  }
  return results;
}
