import * as Styles from "./Logo.styles";

export const Logo = ({ ...other }) => (
  <Styles.Logo
    alt="AcadRecSys logo"
    src="/static//unisinos-logo.svg"
    {...other}
  />
);
