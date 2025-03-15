import React from "react";
import s from "../buttons/style/SeeMoreBtn.module.scss"

interface SeeMoreBtnProps {
  label: string;
  onClick?: () => void;
}

export const SeeMoreBtn: React.FC<SeeMoreBtnProps> = ({ label, onClick }) => {
  return <button className={s.btn} onClick={onClick}>{label}</button>;
};
