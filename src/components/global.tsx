import { ParsedUrlQuery } from "querystring";
import { createContext, JSX } from "react";

type Global = {
  pageTitle: string | null;
  query?: ParsedUrlQuery;
};

const GlobalContext = createContext<Global>({
  pageTitle: null,
});

export function Global(props: { globalData: Global; children: JSX.Element }) {
  return (
    <GlobalContext.Provider value={props.globalData}>
      {props.children}
    </GlobalContext.Provider>
  );
}
