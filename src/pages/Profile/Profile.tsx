import { Container, Tab, Tabs } from "@mui/material";
import { useState, type SyntheticEvent } from "react";
import * as Styles from "./Profile.styles";
import { ProfileGeneral } from "./ProfileGeneral/ProfileGeneral";

const tabs = [{ label: "Geral", value: "general" }];

export const Profile = () => {
  const [currentTab, setCurrentTab] = useState("general");

  const handleTabsChange = (_: SyntheticEvent, value: string) => {
    setCurrentTab(value);
  };

  return (
    <Container maxWidth="xl">
      <Tabs
        indicatorColor="primary"
        onChange={handleTabsChange}
        scrollButtons="auto"
        textColor="primary"
        value={currentTab}
        variant="scrollable"
      >
        {tabs.map((tab) => (
          <Tab key={tab.value} label={tab.label} value={tab.value} />
        ))}
      </Tabs>
      <Styles.Divider />
      {currentTab === "general" && <ProfileGeneral />}
    </Container>
  );
};
