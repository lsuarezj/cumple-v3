import * as React from "react";
import * as ReactDom from "react-dom";
import { Version } from "@microsoft/sp-core-library";
import {
  IPropertyPaneConfiguration,
  PropertyPaneDropdown,
  PropertyPaneTextField,
} from "@microsoft/sp-property-pane";
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";
import { IReadonlyTheme } from "@microsoft/sp-component-base";
import { PropertyFieldNumber } from "@pnp/spfx-property-controls/lib/PropertyFieldNumber";
import * as strings from "BirthdaysWebPartStrings";
import Birthdays from "./components/Birthdays";
import { IBirthdaysProps } from "./components/IBirthdaysProps";

export interface IBirthdaysWebPartProps {
  description: string;
  webpartType: string;
  numberUpcomingDays: number;
}

export default class BirthdaysWebPart extends BaseClientSideWebPart<IBirthdaysWebPartProps> {
  private _isDarkTheme: boolean = false;
  private _environmentMessage: string = "";

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
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onThemeChanged(currentTheme: IReadonlyTheme | undefined): void {
    if (!currentTheme) {
      return;
    }

    this._isDarkTheme = !!currentTheme.isInverted;
    const { semanticColors } = currentTheme;

    if (semanticColors) {
      this.domElement.style.setProperty(
        "--bodyText",
        semanticColors.bodyText || null
      );
      this.domElement.style.setProperty("--link", semanticColors.link || null);
      this.domElement.style.setProperty(
        "--linkHovered",
        semanticColors.linkHovered || null
      );
    }
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse("1.0");
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
                PropertyPaneTextField("description", {
                  label: strings.titleLabel,
                }),
                PropertyPaneDropdown("webpartType", {
                  label: strings.webpartTypeLabel,
                  options: [
                    {
                      key: strings.webpartTypeBirthday,
                      text: strings.webpartTypeBirthday,
                    },
                    {
                      key: strings.webpartTypeAnniversary,
                      text: strings.webpartTypeAnniversary,
                    },
                  ],
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
              ],
            },
          ],
        },
      ],
    };
  }
}
