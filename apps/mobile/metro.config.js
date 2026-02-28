const { getDefaultConfig } = require('expo/metro-config');
const { withNxMetro } = require('@nx/expo');
const path = require('path');

const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot, '../..');

const config = getDefaultConfig(projectRoot);

config.watchFolders = [workspaceRoot];
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, 'node_modules'),
  path.resolve(workspaceRoot, 'node_modules'),
];

const nxConfig = withNxMetro(config, { debug: false, extensions: [] });

// withNxMetro overrides projectRoot to workspaceRoot which breaks
// Expo Router's route discovery (it looks for app/ relative to projectRoot).
// Restore projectRoot so Expo Router finds apps/mobile/app/.
nxConfig.projectRoot = projectRoot;

module.exports = nxConfig;
