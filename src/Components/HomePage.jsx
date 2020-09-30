import React from 'react';
import { useTranslation } from 'react-i18next';

const firstpicLink = 'https://i.ibb.co/fQQxNMW/first-pic.jpg';
const secontpicLink = 'https://i.ibb.co/K91hB4C/second-pick.jpg';
const thirdpicLink = 'https://i.ibb.co/r6H4t82/third-pic.jpg';

const HomePage = () => {
  const { t } = useTranslation();
  return (
    <div className="d-flex flex-column align-items-center">
      <h1 className="mt-5">{t('homepage.title')}</h1>
      <div className="mt-3">
        <p className="text-center"><i>{t('homepage.firstDirection')}</i></p>
        <img src={firstpicLink} className="border rounded-lg" alt="first pic" />
      </div>
      <div className="mt-4">
        <p className="text-center"><i>{t('homepage.secondDirection')}</i></p>
        <img src={secontpicLink} className="border rounded-lg" alt="secont pic" />
      </div>
      <div className="d-flex flex-column my-4">
        <p className="text-center">
          <i>{t('homepage.thirdDirectionP1')}</i>
          <br />
          <i>{t('homepage.thirdDirectionP2')}</i>
        </p>
        <img src={thirdpicLink} className="border rounded-lg" alt="secont pic" />
      </div>
    </div>
  );
};

export default HomePage;
