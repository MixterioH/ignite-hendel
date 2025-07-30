import IgniteLogo from '../../assets/ignite-logo.svg';
import S from './header.module.css'

export function Header() {
	return (
		<header className={S.header}>
			<img className={S.header__logo} src={IgniteLogo} alt="Logo do projeto ignite" />
			<h1 className={S.header__title}>Ignite Feed</h1>
		</header>
	)
}
