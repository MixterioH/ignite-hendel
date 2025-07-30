import S from "./avatar.module.css"

interface AvatarProps {
	Owner?: boolean
	picture: string
}

export function Avatar({ Owner, picture }: AvatarProps) {
	return (
		<>
			<div className={Owner ? S.greenCircleOn : S.greenCircleOff}>
				<img src={picture} alt='Foto de perfil' className={S.picture} />
			</div>
		</>
	)
}
