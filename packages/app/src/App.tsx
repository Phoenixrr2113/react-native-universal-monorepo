import React from "react";
import { GluestackUIProvider } from "@gluestack-ui/themed";
import { config } from "../gluestack-ui.config";
import { TodoApp } from "./todos";

export function App(): JSX.Element {
  return (
    <GluestackUIProvider config={config}>
      <TodoApp />
    </GluestackUIProvider>
  );
}
