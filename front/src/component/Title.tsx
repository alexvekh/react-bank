import React, { ReactNode } from "react";

type TitleProps = {
  title: String;
  description: String;
};

const Page: React.FC<TitleProps> = ({ title, description }) => {
  return (
    <div className="page__info">
      <h1 className="page__title">{title}</h1>
      <p className="page__text">{description}</p>
    </div>
  );
};

export default Page;
