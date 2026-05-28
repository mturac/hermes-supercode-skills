import fs from 'fs';
import os from 'os';
import path from 'path';

const CONFIG_PATH = path.join(os.homedir(), '.hermesrc');
const DEFAULT_CONFIG = { version: '1.0.0', installed: {} };

export function getConfig() {
  try {
    const raw = fs.readFileSync(CONFIG_PATH, 'utf8');
    return { ...DEFAULT_CONFIG, ...JSON.parse(raw) };
  } catch {
    return { ...DEFAULT_CONFIG };
  }
}

export function saveConfig(config) {
  fs.writeFileSync(CONFIG_PATH, JSON.stringify(config, null, 2), 'utf8');
}

export function addInstalled(name, target, sha = null) {
  const config = getConfig();
  config.installed[name] = { target, sha, installedAt: new Date().toISOString() };
  saveConfig(config);
}

export function removeInstalled(name) {
  const config = getConfig();
  delete config.installed[name];
  saveConfig(config);
}

export function getInstalled() {
  return getConfig().installed;
}
