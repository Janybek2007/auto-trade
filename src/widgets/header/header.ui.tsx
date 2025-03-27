import React from 'react';
import s from "./style/Header.ui.module.scss";
import AskarLogo from "../../../public/icons/Askar-logo.svg";
import USALogo from "../../../public/icons/usa-logo.svg";
import OAELogo from "../../../public/icons/oae-logo.svg";
import KORLogo from "../../../public/icons/kor-logo.svg";
import TopJylas from "../../../public/icons/jylas-top-logo.svg"
import BottomJylas from "../../../public/icons/jylas-bottom-logo.svg"


export const Header: React.FC = () => {
	
	return (
		<header className={s.Header}>
			<div className={s.container}>
				<div className={s.content}>
					<div className={s.logo}>
						<img src={AskarLogo} alt="Askar traid logo" />
					</div>

					<div className={s.right_place}>
					<div className={s.nav}>
						<img src={USALogo} alt="USA" />
						<img src={OAELogo} alt="OAE" />
						<img src={KORLogo} alt="KOR" />
					</div>

					<div className={s.right}>
						<p>О нас</p>
						<select>
							<option>KG</option>
							<option>RU</option>
							<option>EN</option>
						</select>

						<div className={s.jylas_logo}>
							<img className={s.top} src={TopJylas} alt="" />
							<img className={s.bottom} src={BottomJylas} alt="" />
						</div>
					</div>
					</div>
				</div>
			</div>
		</header>
	);
};
