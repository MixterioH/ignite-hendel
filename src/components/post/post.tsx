import { useState } from "react"
import type { FormEvent } from "react"
import { Avatar } from "../avatar/avatar"
import { Feedback } from "../feedback/feedback"
import S from "./post.module.css"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"

type Content = {
	type: "paragraph" | "link"
	content: string
}

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

type PostProps = {
	content: Content[]
	time: Date
	job: string
	name: string
	Owner?: boolean
	picture: string
	comment: CommentType[]
	handleCreateNewComment: (newComment: CommentType) => void
	setCommentsByPostId: React.Dispatch<
		React.SetStateAction<{ [postId: number]: CommentType[] }>
	>
	postId: number
	userData: {
		user: {
			userAvatarUrl: string
			userName: string
		}
	}
}

export function Post({
	content,
	time,
	job,
	name,
	Owner,
	picture,
	comment,
	handleCreateNewComment,
	setCommentsByPostId,
	postId,
	userData,
}: PostProps) {
	const publishedDateFormated = format(time, "d 'de' LLLL 'às' HH:mm'h'", {
		locale: ptBR,
	})

	const [newCommentText, setNewCommentText] = useState("")

	function onSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault()

		const newComment: CommentType = {
			info: {
				id: Date.now() + Math.random(),
				commentAvatarUrl: userData.user.userAvatarUrl,
				commentName: userData.user.userName,
				commentPublishedAt: new Date(),
				commentContent: newCommentText,
				likes: 0,
			},
		}

		handleCreateNewComment(newComment)
		setNewCommentText("")
	}

	return (
		<div className={S.post}>
			<div className={S.post_info}>
				<div className={S.post_info_left}>
					<Avatar Owner={Owner} picture={picture} />
					<div className={S.userDetails}>
						<p className={S.name}>{name}</p>
						<p className={S.job}>{job}</p>
					</div>
				</div>
				<time className={S.hour}>{publishedDateFormated}</time>
			</div>

			<div className={S.post_post}>
				<pre>
					{content.map((line, index) => {
						if (line.type === "paragraph") {
							return <p key={index}>{line.content}</p>
						} else if (line.type === "link") {
							return (
								<a
									key={index}
									href={`https://${line.content}`}
									target='_blank'
									rel='noreferrer'
								>
									{line.content}
								</a>
							)
						}
						return null
					})}
				</pre>
			</div>

			<div className={S.post_comment}>
				<p className={S.post_comment_feedback}>Deixe seu feedback</p>
				<form onSubmit={onSubmit}>
					<textarea
						value={newCommentText}
						onChange={(e) => setNewCommentText(e.target.value)}
						className={S.post_comment_boxText}
						placeholder='Escreva um comentário...'
					/>
					<button className={S.post_comment_button}>Publicar</button>
				</form>

				{comment.length > 0 &&
					comment.map((item) => {
						const publishedCommentDateFormated = format(
							item.info.commentPublishedAt,
							"d 'de' LLLL 'às' HH:mm'h'",
							{ locale: ptBR }
						)

						return (
							<Feedback
								key={item.info.id}
								commentAvatarUrl={item.info.commentAvatarUrl}
								commentName={item.info.commentName}
								commentPublishedAt={publishedCommentDateFormated}
								commentContent={item.info.commentContent}
								likes={item.info.likes}
								postId={postId}
								commentId={item.info.id}
								setCommentsByPostId={setCommentsByPostId}
							/>
						)
					})}
			</div>
		</div>
	)
}
