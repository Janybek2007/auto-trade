import s from "../style/Card_item.module.scss";
import expamleImgForCard from "../../../../../public/image/askar-img.svg";
import { CompareBtn } from "./buttons/CompareBtn";
import { SeeMoreBtn } from "./buttons/SeeMoreBtn";

const CardDatas = {
  model: 'Kia K5',
  range: '38 000',
  year: '2024',
  price: '24 410'
}

export const Card_item = () => {
  return (
    <>
    <div className={s.card}>
      <img src={expamleImgForCard} alt="" />

      <div className={s.card_content}>
        <h1>{CardDatas.model}</h1>
        <div className={s.car_specs}>
          <p>{CardDatas.range}km</p>
          <div className={s.circle}></div>
          <p>{CardDatas.year}</p>
        </div>
        <h3>${CardDatas.price}</h3>
      </div>

      <div className={s.buttons}>
          <SeeMoreBtn label="Подробнее"/>
          <CompareBtn label="Сравнить"/>
        </div>
    </div>
    </>
  )
}
