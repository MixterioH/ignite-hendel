import S from "./sidebar.module.css"
import { Avatar } from "../avatar/avatar"
import { useState } from "react"
import { EditUser } from "../editUser/editUser"

type UserData = {
	user: {
		userBanner: string
		userName: string
		userAvatarUrl: string
		userRole: string
	}
}

type SidebarProps = {
	userData: UserData
	setUserData: React.Dispatch<React.SetStateAction<UserData>>
	setNoScroll: React.Dispatch<React.SetStateAction<boolean>>
}

export function Sidebar({ setNoScroll, userData, setUserData }: SidebarProps) {
	const [showEdit, setShowEdit] = useState(false)

	function setShowEditFalse() {
		setShowEdit(false)
	}

	return (
		<aside className={S.sidebar}>
			<div className={S.banner}>
				<img className={S.banner_image} src={userData.user.userBanner} alt='' />
			</div>

			<div className={S.info}>
				<div className={S.info_picture}>
					<Avatar Owner={true} picture={userData.user.userAvatarUrl} />
				</div>

				<p className={S.name}>{userData.user.userName}</p>
				<p className={S.job}>{userData.user.userRole}</p>
			</div>

			<div
				onClick={() => {
					if (showEdit) {
						setShowEdit(false)
					} else {
						setShowEdit(true)
						setNoScroll(true)
					}
				}}
				className={S.edit}
			>
				<button>
					<img src='' alt='' />
					<span>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							width='20'
							height='20'
							fill='#00b37e'
							viewBox='0 0 256 256'
						>
							<path d='M227.32,73.37,182.63,28.69a16,16,0,0,0-22.63,0L36.69,152A15.86,15.86,0,0,0,32,163.31V208a16,16,0,0,0,16,16H216a8,8,0,0,0,0-16H115.32l112-112A16,16,0,0,0,227.32,73.37ZM92.69,208H48V163.31l88-88L180.69,120ZM192,108.69,147.32,64l24-24L216,84.69Z'></path>
						</svg>
						Editar seu perfil
					</span>
				</button>
			</div>

			{showEdit && (
				<EditUser
					setNoScroll={setNoScroll}
					setUserData={setUserData}
					setShowEditFalse={setShowEditFalse}
					userData={userData}
				/>
			)}
		</aside>
	)
}
