Simple TODO expo app.

Work with expo-dev-client:
1) npx expo install expo-dev-client
2) npm install -g eas-cli
3) eas login (eas whoami)
4) eas build:configure
Android
5) eas build --profile development --platform android
6) Scan qr code or send link to device and install the app
7) npx expo start --dev-client
iOS simulator
8) Add ios.simulator=true to eas.json
{
  "cli": {
    "version": ">= 3.16.0"
  },
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal"
    },
    "development-simulator": {
      "extends": "development",
      "ios": {
        "simulator": true   <----- Add this
      }
    },
    "preview": {
      "distribution": "internal"
    },
    "production": {}
  },
  "submit": {
    "production": {
      "android": {
        "serviceAccountKeyPath": "../path/to/api-xxx-yyy-zzz.json",
        "track": "internal"
      },
      "ios": {
        "appleId": "john@turtle.com",
        "ascAppId": "1234567890",
        "appleTeamId": "AB12XYZ34S"
      }
    }
  }
}
9) eas build --profile development-simulator --platform ios
10) Optionally if you pressed contol+c on previous step - 'eas build:run'. It must install the app on simulator. eas build:list - to show current builds status.
11) npx expo start --dev-client
iOS device
12) Register device: 'eas device:create'. Choose to register using WebSite and scan qr code.
13) eas build --profile development --platform ios
14) Scan qr code.
15) Login to expo account in the app.
16) npx expo start --dev-client
17) Run 'eas build:resign' to add mo devices.
18) import 'expo-dev-client'; in the root component.
19) Submit to AppStore - https://docs.expo.dev/submit/ios/
20) eas build --profile production --platform ios
21) eas submit -p ios
