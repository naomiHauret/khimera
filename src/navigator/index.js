import React from "react"
import { createAppContainer, createStackNavigator, createSwitchNavigator } from "react-navigation"
import { FluidNavigator } from "react-navigation-fluid-transitions"
import ScreenAskPermissions from "screens/AskPermissions"
import ScreenOnboarding from "screens/Onboarding"
import ScreenPairing from "screens/Pairing"
import ScreenSuccessPermissions from "screens/SuccessPermissions"
import ScreenFormProfileAnimal from "screens/FormProfileAnimal"
import ScreenFormProfileHuman from "screens/FormProfileHuman"
import ScreenProfiles from "screens/Profiles"
import ScreenProfilesSaved from "screens/ProfilesSaved"
import ScreenKhimeraCam from "screens/KhimeraCam"
import ScreenAbout from "screens/About"

const OnboardingNavigator = FluidNavigator({
  ScreenPairing: {
    screen: ScreenPairing,
  },
  ScreenOnboarding: {
    screen: ScreenOnboarding,
  },
})

const PermissionsNavigator = FluidNavigator({
  ScreenAskPermissions: {
    screen: ScreenAskPermissions,
  },
  ScreenSuccessPermissions: {
    screen: ScreenSuccessPermissions,
  },
})

const ProfilesNavigator = FluidNavigator({
  ScreenProfiles: {
    screen: ScreenProfiles,
  },
  ScreenFormProfileAnimal: {
    screen: ScreenFormProfileAnimal,
  },
  ScreenFormProfileHuman: {
    screen: ScreenFormProfileHuman,
  },
  ScreenProfilesSaved: {
    screen: ScreenProfilesSaved,
  },
})

const MainNavigator = FluidNavigator({
  ScreenKhimeraCam: {
    screen: ScreenKhimeraCam,
  },
  ScreenAbout: {
    screen: ScreenAbout,
  },
})

const InitializationNavigator = createSwitchNavigator({
  Onboarding: {
    screen: OnboardingNavigator,
  },
  Permissions: {
    screen: PermissionsNavigator,
  },
})

const AppNavigator = createSwitchNavigator({
  Initialization: InitializationNavigator,
  Permissions: PermissionsNavigator,
  Profiles: ProfilesNavigator,
  Main: MainNavigator,
})

export default Navigator = createAppContainer(AppNavigator)
