import React from "react";
import { Container } from "@mui/material";
import { ContentContainer } from "../components/Content/ContentContainer";

const Home = () => {
  return (
    <Container
      className="h-[calc(100vh-64px)] mt-16 py-4 overflow-auto"
      id="main-container"
    >
      <ContentContainer />
    </Container>
  );
};

export { Home };
