import * as React from "react";
import * as ReactDom from "react-dom";
import { Version } from "@microsoft/sp-core-library";
import {
  IPropertyPaneConfiguration,
  PropertyPaneToggle,
} from "@microsoft/sp-property-pane";
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";
import { IReadonlyTheme } from "@microsoft/sp-component-base";
import { PropertyFieldNumber } from "@pnp/spfx-property-controls/lib/PropertyFieldNumber";
import * as strings from "BirthdaysWebPartStrings";
import Birthdays from "./components/Birthdays";
import { IBirthdaysProps } from "./components/IBirthdaysProps";

export interface IBirthdaysWebPartProps {
  description: string;
  webpartType: boolean;
  numberUpcomingDays: number;
  useTestData: boolean;
  wrapName: boolean;
}

export default class BirthdaysWebPart extends BaseClientSideWebPart<IBirthdaysWebPartProps> {
  private _isDarkTheme: boolean = false;
  private _environmentMessage: string = "";
  private _theme: IReadonlyTheme | undefined;

  public render(): void {
    const element: React.ReactElement<IBirthdaysProps> = React.createElement(
      Birthdays,
      {
        description: this.properties.description,
        webpartType: this.properties.webpartType,
        numberUpcomingDays: this.properties.numberUpcomingDays,
        context: this.context,
        isDarkTheme: this._isDarkTheme,
        environmentMessage: this._environmentMessage,
        hasTeamsContext: !!this.context.sdks.microsoftTeams,
        userDisplayName: this.context.pageContext.user.displayName,
        useTestData: this.properties.useTestData,
        wrapName: this.properties.wrapName,
        themePrimary: this._theme ? this._theme.palette.themePrimary : "",
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onThemeChanged(currentTheme: IReadonlyTheme | undefined): void {
    if (!currentTheme) {
      return;
    }

    this._theme = currentTheme;
    this._isDarkTheme = !!currentTheme.isInverted;
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse("1.0");
  }

  protected get disableReactivePropertyChanges(): boolean {
    return false;
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription,
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneToggle("webpartType", {
                  label: strings.webpartTypeLabel,
                  onText: strings.webpartTypeBirthday,
                  offText: strings.webpartTypeAnniversary,
                }),
                PropertyFieldNumber("numberUpcomingDays", {
                  key: "numberUpcomingDays",
                  label: strings.numberUpcomingDaysLabel,
                  description: strings.numberUpcomingDaysDescription,
                  value: 5,
                  maxValue: 10,
                  minValue: 1,
                  disabled: false,
                }),
                PropertyPaneToggle("useTestData", {
                  key: "useTestData",
                  label: "Use test data",
                  onText: "Yes",
                  offText: "No",
                }),
                PropertyPaneToggle("wrapName", {
                  key: "wrapName",
                  label: "Nombre completo en varias líneas",
                  onText: "Yes",
                  offText: "No",
                }),
              ],
            },
          ],
        },
      ],
    };
  }
}
