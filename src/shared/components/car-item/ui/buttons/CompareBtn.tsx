import React from "react";
import s from "../buttons/style/CompareBtn.module.scss";
import cmprIcon from "../../../../../../public/icons/compare-icon.svg"

interface CompareBtnProps {
  label: string; 
  onClick?: () => void; 
}

export const CompareBtn: React.FC<CompareBtnProps> = ({ label, onClick }) => {
  return <button className={s.btn} onClick={onClick}><img src={cmprIcon} alt="" /> {label}</button>;
};
