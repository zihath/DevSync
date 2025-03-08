import React from "react";

interface ContainerComponentProps {
  children: React.ReactNode;
}

const ContainerComponent = ({ children }: ContainerComponentProps) => {
  return <div className="container mx-auto px-4 py-2 w-full">{children}</div>;
};

export default ContainerComponent;
