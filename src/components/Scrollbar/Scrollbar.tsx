import type { ReactNode } from "react";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";

export const Scrollbar = ({ children }: { children: ReactNode }) => (
  <SimpleBar style={{ maxHeight: 700 }}>{children}</SimpleBar>
);
