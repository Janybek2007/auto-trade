import React from "react";
import scss from "./styles.module.scss";
import { Icon } from "@iconify/react";

// Instagram аккаунттары үчүн массив
const instagramAccounts = [
  "@askar_auto_dubai",
  "@askar_auto_america",
  "@askar_korea",
  "@jylas_tuning",
];

// Өлкөлөрдүн маалыматы үчүн массив
const countries = [
  {
    name: "Америка",
    logo: "/icons/usa-logo.svg",
    alt: "USA Logo",
  },
  {
    name: "Дубай",
    logo: "/icons/oae-logo.svg",
    alt: "OAE Flag",
  },
  {
    name: "Корея",
    logo: "/icons/kor-logo.svg",
    alt: "South Korea Flag",
  },
];

const Footer = () => {
  return (
    <footer className={scss.footer}>
      <div className="container">
        <div className={scss.content}>
          {/* Биринчи бөлүк: Логотип жана өлкөлөр */}
          <div className={scss.first}>
            <img
              src="/image/jylas-tuning.svg"
              alt="Jylas Tuning Logo"
              className={scss.logo}
            />
            <div className={scss.head}>
              {countries.map((country, index) => (
                <React.Fragment key={country.name}>
                  <div className={scss.blog}>
                    <img
                      src={country.logo}
                      alt={country.alt}
                      className={scss.flag}
                    />
                    <p>{country.name}</p>
                  </div>
                  {index < countries.length - 1 && <hr />}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Экинчи бөлүк: Дарек, телефон жана Instagram */}
          <div className={scss.second}>
            <img
              src="/icons/Askar-auto.svg"
              alt="Askar Auto Logo"
              className={scss.logoAskar}
            />
            <div className={scss.block}>
              <div className={scss.box}>
                <h4>
                  <Icon icon="mdi:map-marker" className={scss.icons} /> Адрес
                </h4>
                <p>г. Бишкек, EURASIA Киевская улица, офис; 4 этаж</p>
                <p>г. Ош, EURASIA Киевская улица, офис; 4 этаж</p>
              </div>
              <ul>
                <li>
                  <Icon icon="mdi:phone" className={scss.icons} /> Телефон
                </li>
                <li>+996 995-20-08-92</li>
                <li>+996 700-90-00-82</li>
                <li>+996 508-00-00-01</li>
              </ul>
              <ul>
                <li>
                  <Icon icon="mdi:instagram" className={scss.icons} /> Instagram
                </li>
                {instagramAccounts.map((account) => (
                  <li key={account}>{account}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Акыркы бөлүк: Логотип */}
          <div className={scss.end}>
            <img
              src="/icons/iant-logo.png"
              alt="IANT Logo"
              className={scss.logoEnd}
            />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
