import s from "../style/List_item.module.scss"
import expamleImgForCard from "../../../../../public/image/askar-img.svg";
import { SeeMoreBtn } from "./buttons/SeeMoreBtn";
import { CompareBtn } from "./buttons/CompareBtn";

const CardDatas = {
  model: 'Kia K5',
  range: '38 000',
  year: '2024',
  price: '24 410'
}

export const List_item = () => {
  return (
    <>
    <div className={s.card}>
      <div className={s.card_img}>
      <img src={expamleImgForCard} alt="" />
      </div>

      <div className={s.left_cont}>
      <div className={s.card_content}>
        <div className={s.card_title}>
        <h1>{CardDatas.model}</h1>
        <div className={s.car_specs}>
          <p>{CardDatas.range}km</p>
          <p>.</p>
          <p>{CardDatas.year}</p>
        </div>
        </div>
        <h3>${CardDatas.price}</h3>
      </div>

      <div className={s.buttons}>
          <CompareBtn label="Сравнить"/>
          <SeeMoreBtn label="Подробнее"/>
        </div>
      </div>
    </div>
    </>
  )
}
