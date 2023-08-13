import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { GlobalStyles as MuiGlobalStyles, useTheme } from "@mui/material";
import React, { FC, useMemo } from "react";

export const GlobalStyles: FC = () => {
  const theme = useTheme();
  const cache = useMemo(
    () =>
      createCache({
        key: "css",
        prepend: true,
      }),
    [],
  );

  const styles = {
    "html, body, #root": {
      height: "100%",
    },
  };

  return (
    <CacheProvider value={cache}>
      <MuiGlobalStyles styles={styles} />
    </CacheProvider>
  );
};
