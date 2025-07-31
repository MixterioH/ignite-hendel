import { useState } from "react"
import S from "./editUser.module.css"

type UserData = {
	user: {
		userName: string
		userRole: string
		userBanner: string
		userAvatarUrl: string
	}
}

type EditUserProps = {
	setNoScroll: React.Dispatch<React.SetStateAction<boolean>>
	setUserData: React.Dispatch<React.SetStateAction<UserData>>
	setShowEditFalse: () => void
	userData: UserData
}

export function EditUser({
	setNoScroll,
	setUserData,
	setShowEditFalse,
	userData,
}: EditUserProps) {
	const [name, setName] = useState<string>("")
	const [role, setRole] = useState<string>("")
	const [banner, setBanner] = useState<string>("")
	const [avatar, setAvatar] = useState<string>("")

	function handleSetUserData(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault()

		const userFormData: UserData = {
			user: {
				userName: name || userData.user.userName,
				userRole: role || userData.user.userRole,
				userBanner: banner || userData.user.userBanner,
				userAvatarUrl: avatar || userData.user.userAvatarUrl,
			},
		}

		setUserData(userFormData)
		setShowEditFalse()
		setNoScroll(false)
	}

	return (
		<>
			<div
				onClick={() => {
					setShowEditFalse()
					setNoScroll(false)
				}}
				className={S.background}
			></div>
			<div className={S.form}>
				<form onSubmit={handleSetUserData}>
					<p>Personalize seu usuário</p>

					<p>Nome de usuário:</p>
					<input
						maxLength={25}
						minLength={3}
						placeholder={userData.user.userName}
						onChange={(e) => setName(e.target.value)}
						type='text'
					/>

					<p>Seu cargo:</p>
					<input
						maxLength={35}
						minLength={3}
						placeholder={userData.user.userRole}
						onChange={(e) => setRole(e.target.value)}
						type='text'
					/>

					<p>Link da imagem do banner:</p>
					<input
						minLength={1}
						placeholder={userData.user.userBanner}
						onChange={(e) => setBanner(e.target.value)}
						type='text'
					/>

					<p>Link da foto de perfil:</p>
					<input
						minLength={1}
						placeholder={userData.user.userAvatarUrl}
						onChange={(e) => setAvatar(e.target.value)}
						type='text'
					/>

					<button>Enviar</button>
				</form>
			</div>
		</>
	)
}
