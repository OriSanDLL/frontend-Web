import React, { Fragment } from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Fragment>
      <footer className="py-1">
        <p className="text-center mt-1">
          ShopG3 - 2023-{currentYear}, All Rights Reserved
        </p>
      </footer>
    </Fragment>
  );
};

export default Footer;