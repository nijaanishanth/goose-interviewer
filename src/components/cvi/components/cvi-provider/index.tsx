import React, { useMemo } from "react";
import { DailyProvider } from "@daily-co/daily-react";
import DailyIframe from "@daily-co/daily-js";

export const CVIProvider = ({ children }: { children: React.ReactNode }) => {
  const callObject = useMemo(() => DailyIframe.createCallObject(), []);

  return (
    <DailyProvider callObject={callObject}>
      {children}
    </DailyProvider>
  );
};
