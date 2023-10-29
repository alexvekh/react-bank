import React, { ReactNode } from "react";
import "./index.css";

type PageProps = {
  children: ReactNode;
};

const Page: React.FC<PageProps> = ({ children }) => {
  return <div className="page">{children}</div>;
};

export default Page;
