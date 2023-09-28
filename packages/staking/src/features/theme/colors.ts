import { darkColorScheme, laceGradient, lightColorScheme } from '@lace/ui';

export const colorsContract = {
  $bannerBellIconColor: '',
  $bannerInfoIconColor: '',
  $delegationCardInfoLabelColor: '',
  $delegationCardInfoValueColor: '',
  $getStartedStepBorderColor: '',
  $getStartedStepDescriptionColor: '',
  $getStartedStepFillColor: '',
  $getStartedStepNumberColor: '',
  $multidelegationBetaModalPillBackground: '',
  $multidelegationBetaModalPillText: '',
  $preferencesPoolCardBorderColor: '',
  $qrCodeBackground: '',
  $qrCodeForeground: '',
  $sliderFillPrimary: '',
  $sliderFillSecondary: '',
  $sliderKnobFill: '',
  $sliderRailFill: '',
};

export const lightThemeColors: typeof colorsContract = {
  $bannerBellIconColor: lightColorScheme.$primary_accent_purple,
  $bannerInfoIconColor: lightColorScheme.$primary_accent_purple,
  $delegationCardInfoLabelColor: lightColorScheme.$primary_dark_grey,
  $delegationCardInfoValueColor: lightColorScheme.$primary_black,
  $getStartedStepBorderColor: lightColorScheme.$primary_light_grey_plus,
  $getStartedStepDescriptionColor: lightColorScheme.$primary_dark_grey,
  $getStartedStepFillColor: 'transparent',
  $getStartedStepNumberColor: laceGradient,
  $multidelegationBetaModalPillBackground: laceGradient,
  $multidelegationBetaModalPillText: lightColorScheme.$primary_white,
  $preferencesPoolCardBorderColor: lightColorScheme.$primary_light_grey_plus,
  $qrCodeBackground: lightColorScheme.$primary_white,
  $qrCodeForeground: lightColorScheme.$primary_black,
  $sliderFillPrimary: lightColorScheme.$primary_accent_purple,
  $sliderFillSecondary: lightColorScheme.$primary_dark_grey,
  $sliderKnobFill: lightColorScheme.$primary_white,
  $sliderRailFill: lightColorScheme.$primary_light_grey_plus,
};

export const darkThemeColors: typeof colorsContract = {
  // TODO: use darkColorScheme instead
  $bannerBellIconColor: lightColorScheme.$primary_accent_purple,
  // TODO: use darkColorScheme instead
  $bannerInfoIconColor: lightColorScheme.$primary_accent_purple,
  $delegationCardInfoLabelColor: darkColorScheme.$primary_light_grey,
  $delegationCardInfoValueColor: darkColorScheme.$primary_white,
  $getStartedStepBorderColor: darkColorScheme.$primary_mid_black,
  $getStartedStepDescriptionColor: darkColorScheme.$primary_light_grey,
  $getStartedStepFillColor: darkColorScheme.$primary_mid_black,
  $getStartedStepNumberColor: laceGradient,
  $multidelegationBetaModalPillBackground: laceGradient,
  // TODO: use darkColorScheme instead
  $multidelegationBetaModalPillText: lightColorScheme.$primary_white,
  $preferencesPoolCardBorderColor: darkColorScheme.$primary_mid_black,
  // TODO: use darkColorScheme instead
  $qrCodeBackground: lightColorScheme.$primary_black,
  // TODO: use darkColorScheme instead
  $qrCodeForeground: lightColorScheme.$primary_white,
  $sliderFillPrimary: darkColorScheme.$primary_accent_purple,
  $sliderFillSecondary: darkColorScheme.$primary_light_grey,
  $sliderKnobFill: lightColorScheme.$primary_black,
  $sliderRailFill: darkColorScheme.$primary_dark_grey_plus,
};
