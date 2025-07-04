const { FusesPlugin } = require("@electron-forge/plugin-fuses");
const { FuseV1Options, FuseVersion } = require("@electron/fuses");
const path = require("path");

module.exports = {
  packagerConfig: {
    name: "Mineral",
    asar: true,
    icon: "./assets/icon.icns",
    extraResource: [path.resolve(__dirname, "../../node_modules/electron-serve")],
    ignore: [
      /node_modules\/(?!electron-serve|electron-settings)/,
    ],
    nodeIntegration: true,
    contextIsolation: false,
  },
  rebuildConfig: {
    onlyModules: ["electron-serve", "electron-settings"],
  },
  makers: [
    {
      name: "@electron-forge/maker-dmg",
      platforms: ["darwin"],
      config: {
        name: "Mineral",
        icon: "./assets/icon.icns",
        format: "ULFO",
        background: "./assets/background.png",
      },
      additionalDMGOptions: {
        "hide-extension": true,
        filesystem: "HFS+",
        "window-position": { x: 100, y: 100 },
      },
    },
  ],
  plugins: [
    {
      name: "@electron-forge/plugin-auto-unpack-natives",
      config: {},
    },
    // Fuses are used to enable/disable various Electron functionality
    // at package time, before code signing the application
    new FusesPlugin({
      version: FuseVersion.V1,
      [FuseV1Options.RunAsNode]: false,
      [FuseV1Options.EnableCookieEncryption]: true,
      [FuseV1Options.EnableNodeOptionsEnvironmentVariable]: false,
      [FuseV1Options.EnableNodeCliInspectArguments]: false,
      [FuseV1Options.EnableEmbeddedAsarIntegrityValidation]: true,
      [FuseV1Options.OnlyLoadAppFromAsar]: true,
    }),
  ],
  publishers: [
    {
      name: "@electron-forge/publisher-s3",
      platforms: ["darwin"],
      config: {
        bucket: "mineral-downloads",
        region: "us-east-1",
        public: true,
      },
    },
  ],
};
