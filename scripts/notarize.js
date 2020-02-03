const fs = require("fs");
const path = require("path");
var electron_notarize = require("electron-notarize");

const envConfig = require("dotenv").config();
Object.entries(envConfig.parsed || {}).forEach(([key, value]) => {
  process.env[key] = value;
});

module.exports = async function(params) {
  // Only notarize the app on Mac OS only.
  if (process.platform !== "darwin") {
    return;
  }
  // Same appId in electron-builder.
  let appId = "com.electron.twork";
  let appPath = path.join(
    params.appOutDir,
    `${params.packager.appInfo.productFilename}.app`
  );
  if (!fs.existsSync(appPath)) {
    throw new Error(`Cannot find application at: ${appPath}`);
  }

  //console.log(`Notarizing ${appId} found at ${appPath}`);
  //console.log(process.env.APPLE_ID, "env ID");
  //console.log(process.env.APPLE_ID_PASS, "env password");
  try {
    await electron_notarize.notarize({
      appBundleId: appId,
      appPath: appPath,
      appleId: process.env.APPLE_ID,
      appleIdPassword: process.env.APPLE_ID_PASS
    });
  } catch (error) {
    console.error(error);
  }

  console.log(`Done notarizing ${appId}`);
};
