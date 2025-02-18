import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  mb: number;
}

export const SectionHeader = ({ children, mb }: Props) => (
  <h2 className={`text-2xl font-semibold mb-${mb}`}>{children}</h2>
);
