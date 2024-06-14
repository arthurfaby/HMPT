import { ReactNode } from "react";

type FullHeightContainerProps = {
  children: ReactNode;
  className?: string;
  dontScroll?: boolean;
};

export function FullHeightContainer({
  children,
  className,
  dontScroll,
}: FullHeightContainerProps) {
  const containerStyle = {
    minHeight: "calc(100vh - 64px - 52px)",
    height: dontScroll ? "calc(100vh - 64px - 52px)" : undefined,
  };

  return (
    <div style={containerStyle} className={className}>
      {children}
    </div>
  );
}
