import React, { ReactNode } from "react";

type PageProps = {
  children: ReactNode;
};

const Page: React.FC<PageProps> = ({ children }) => {
  return <div className="page">{children}</div>;
};

export default Page;
