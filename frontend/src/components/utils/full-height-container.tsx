import { ReactNode } from "react";

type FullHeightContainerProps = {
  children: ReactNode;
  className?: string;
};

export function FullHeightContainer({
  children,
  className,
}: FullHeightContainerProps) {
  const containerStyle = {
    minHeight: "calc(100vh - 64px - 52px)",
  };

  return (
    <div style={containerStyle} className={className}>
      {children}
    </div>
  );
}
