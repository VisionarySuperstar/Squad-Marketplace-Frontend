import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      chocolateMain: string;
      connectedGreen: string;
    };
    sizes: {
      mobileNavbarHeight: string;
    };
    fonts: {
      maxevilleMono: string;
    };
  }
}
