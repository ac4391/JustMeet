# JustMeet
Here we present summaries of the core React Native modules that make up the application

## Code Structure
Below is a summary of the directory structure of this repository. The entirety of the React Native code is found within the 'JustMeet/' directory. There you will find a more detailed description of the code therein. 

```bash
├── JustMeet
│   ├── App.js
│   ├── __tests__/
│   ├── amplify/
│   ├── app.json
│   ├── assets/
│   ├── aws-exports.js
│   ├── babel.config.js
│   ├── components/
│   ├── constants/
│   ├── navigation/
│   │   ├── AppNavigator.js
│   │   └── MainTabNavigator.js
│   ├── node_modules/
│   ├── package-lock.json
│   ├── package.json
│   ├── rn-cli.config.js
│   ├── screens/
│   │   ├── ApplicantsScreen.js
│   │   ├── HeatMapScreen.js
│   │   ├── HomeScreen.js
│   │   ├── MapScreen.js
│   │   ├── ProfileScreen.js
│   │   └── UpdateProfileScreen.js
│   └── src/
```

## Screens/
#### Applicant Screen
A List view of nearby candidates ranked by proximity.

#### Heat Map Screen
A map view with color overlay indicating the geographic span of nearby users

#### Home Screen
Home screen with banner and logo

#### Map Screen
Map displayed by Google Maps API displaying nearby users

#### Profile Screen
Screen showing relevant candidate information including name, email, LinkedIn, and professional field.

#### Update Profile Screen
Screen for users to update personal information.

## Navigation/
### App Navigator
Initializes main app navigation

### Main Tab Navigator
Creates the bottom bar navigation menu with pressable options for each display screen. 
