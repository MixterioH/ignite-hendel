import S from "./feedback.module.css"
import { Avatar } from "../avatar/avatar"

type CommentInfo = {
	id: number
	commentAvatarUrl: string
	commentName: string
	commentPublishedAt: Date
	commentContent: string
	likes: number
}

type CommentType = {
	info: CommentInfo
}

type FeedbackProps = {
	commentAvatarUrl: string
	commentName: string
	commentPublishedAt: string
	commentContent: string
	likes: number
	postId: number
	commentId: number
	setCommentsByPostId: React.Dispatch<
		React.SetStateAction<{
			[postId: number]: CommentType[]
		}>
	>
}

export function Feedback({
	commentAvatarUrl,
	commentName,
	commentPublishedAt,
	commentContent,
	likes,
	postId,
	commentId,
	setCommentsByPostId,
}: FeedbackProps) {
	function handleLike() {
		setCommentsByPostId((prev) => {
			const updatedComments = prev[postId].map((item) => {
				if (item.info.id === commentId) {
					return {
						...item,
						info: {
							...item.info,
							likes: item.info.likes + 1,
						},
					}
				}
				return item
			})

			return {
				...prev,
				[postId]: updatedComments,
			}
		})
	}

	function handleDelete() {
		setCommentsByPostId((prev) => {
			const updatedComments = prev[postId].filter(
				(item) => item.info.id !== commentId
			)

			return {
				...prev,
				[postId]: updatedComments,
			}
		})
	}

	return (
		<div className={S.container}>
			<Avatar Owner picture={commentAvatarUrl} />
			<div className={S.feedback_box}>
				<div className={S.feedback_section1}>
					<div className={S.info}>
						<div>
							<div className={S.info_name}>
								<p>
									{commentName} <span>(você)</span>
								</p>
							</div>
							<div className={S.hour}>{commentPublishedAt}</div>
						</div>

						<span onClick={handleDelete} className={S.trash}>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								width='24'
								height='24'
								fill='##8D8D99'
								viewBox='0 0 256 256'
							>
								<path d='M216,48H176V40a24,24,0,0,0-24-24H104A24,24,0,0,0,80,40v8H40a8,8,0,0,0,0,16h8V208a16,16,0,0,0,16,16H192a16,16,0,0,0,16-16V64h8a8,8,0,0,0,0-16ZM96,40a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8v8H96Zm96,168H64V64H192ZM112,104v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Zm48,0v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Z'></path>
							</svg>
						</span>
					</div>
					<pre>{commentContent}</pre>
				</div>

				<span onClick={handleLike} className={S.like}>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						width='20'
						height='20'
						fill='#8d8d99'
						viewBox='0 0 256 256'
					>
						<path d='M237,77.47A28,28,0,0,0,216,68H164V56a44.05,44.05,0,0,0-44-44,12,12,0,0,0-10.73,6.63L72.58,92H32a20,20,0,0,0-20,20v88a20,20,0,0,0,20,20H204a28,28,0,0,0,27.78-24.53l12-96A28,28,0,0,0,237,77.47ZM36,116H68v80H36ZM220,96.5l-12,96a4,4,0,0,1-4,3.5H92V106.83L126.82,37.2A20,20,0,0,1,140,56V80a12,12,0,0,0,12,12h64a4,4,0,0,1,4,4.5Z'></path>
					</svg>
					Aplaudir · {likes}
				</span>
			</div>
		</div>
	)
}
