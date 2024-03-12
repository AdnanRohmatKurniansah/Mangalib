import { createContext, Dispatch, SetStateAction } from "react";

export interface DescContextProps {
  desc: string | null;
  setDesc: Dispatch<SetStateAction<string | null>>;
}

export const DescContext = createContext<DescContextProps>({
  desc: null,
  setDesc: () => {},
});