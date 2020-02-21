# Twork Electron

For create Mac os Build :
npm run mac

For create Windows Build :
npm run win

For Create Mac, Win, Linux build:
npm run build

For publish new version hit below command :
GH_TOKEN=\${`Github_token`} npm run publish

Create Developer application id certificate

codesign -f -s "Developer ID Application: Name (Id)" --entitlements path/to/entitlements.mac.plist --options runtime app.app

codesign -s "Developer ID Application: Name (Id)" app.dmg --options runtime

xcrun altool --notarize-app -f app.dmg --primary-bundle-id com.electron.twork -u {{userId}} -p "password"

xcrun altool --notarization-info {{token}} -u {{userId}} -p "password"

xcrun stapler staple app.dmg

xcrun stapler validate app.dmg

xattr -w com.electron.twork app.app

https://stackoverflow.com/questions/53112078/how-to-upload-dmg-file-for-notarization-in-xcode
