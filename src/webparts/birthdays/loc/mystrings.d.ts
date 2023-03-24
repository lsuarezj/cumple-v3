declare interface IBirthdaysWebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;
  AppLocalEnvironmentSharePoint: string;
  AppLocalEnvironmentTeams: string;
  AppLocalEnvironmentOffice: string;
  AppLocalEnvironmentOutlook: string;
  AppSharePointEnvironment: string;
  AppTeamsTabEnvironment: string;
  AppOfficeEnvironment: string;
  AppOutlookEnvironment: string;
  titleLabel: string;
  webpartTypeLabel: string;
  webpartTypeBirthday: string;
  webpartTypeAnniversary: string;
  numberUpcomingDaysLabel: string;
  numberUpcomingDaysDescription: string;
}

declare module "BirthdaysWebPartStrings" {
  const strings: IBirthdaysWebPartStrings;
  export = strings;
}
