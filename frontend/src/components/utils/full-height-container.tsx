import { ReactNode } from "react";

type FullHeightContainerProps = {
  children: ReactNode;
  className?: string;
};

export function FullHeightContainer({
  children,
  className,
}: FullHeightContainerProps) {
  return <div className={"pt-16 min-h-screen " + className}>{children}</div>;
}
