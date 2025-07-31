import "./global.css"
import S from "./App.module.css"
import { Header } from "./components/header/header"
import { Post } from "./components/post/post"
import { Sidebar } from "./components/sidebar/sidebar"
import { useEffect, useState } from "react"

type Author = {
	name: string
	role: string
	avatarUrl: string
	backgroundUrl: string
}

type Content = {
	type: "paragraph" | "link"
	content: string
}

type PostType = {
	id: number
	author: Author
	content: Content[]
	publishedAt: Date
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

type CommentsByPostId = {
	[postId: number]: CommentType[]
}

type UserData = {
	user: {
		userAvatarUrl: string
		userName: string
		userBanner: string
		userRole: string
	}
}

// ----------------------------

const posts: PostType[] = [
	{
		id: 1,
		author: {
			name: "Pedrinho",
			role: "Programador Front End",
			avatarUrl: "https://avatars.githubusercontent.com/u/37636267?v=4",
			backgroundUrl:
				"https://images.unsplash.com/photo-1752503650851-cbc3f8b00679?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		},
		content: [
			{ type: "paragraph", content: "Fala galera 🖐️" },
			{
				type: "paragraph",
				content:
					"Acabei de subir mais um projeto no meu portifa. É um projeto muito legal sabe",
			},
			{ type: "link", content: "github.com/MixterioH" },
		],
		publishedAt: new Date("2025-07-03 15:21:00"),
	},
]

// ----------------------------

export function App() {
	const [noScroll, setNoScroll] = useState<boolean>(false)
	const [userData, setUserData] = useState<UserData>({
		user: {
			userAvatarUrl: "https://avatars.githubusercontent.com/u/37636267?v=4",
			userName: "Hendel",
			userBanner:
				"https://images.unsplash.com/photo-1752517656908-b7285e491bc3?q=80&w=1418&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
			userRole: "Programador Front End",
		},
	})
	const [commentsByPostId, setCommentsByPostId] = useState<CommentsByPostId>({})

	// Controla scroll e barra
	useEffect(() => {
		if (noScroll) {
			document.body.classList.add("no-scroll", "no-scrollbar")
		} else {
			document.body.classList.remove("no-scroll", "no-scrollbar")
		}
	}, [noScroll])

	function handleCreateNewComment(postId: number, newComment: CommentType) {
		setCommentsByPostId((prev) => ({
			...prev,
			[postId]: [...(prev[postId] || []), newComment],
		}))
	}

	return (
		<>
			<Header />

			<div className={S.wrapper}>
				<Sidebar
					setNoScroll={setNoScroll}
					userData={userData}
					setUserData={setUserData}
				/>
				<main className={S.main}>
					{posts.map((item) => (
						<Post
							key={item.id}
							content={item.content}
							time={item.publishedAt}
							job={item.author.role}
							name={item.author.name}
							postId={item.id}
							picture={item.author.avatarUrl}
							comment={commentsByPostId[item.id] || []}
							handleCreateNewComment={(newComment: CommentType) =>
								handleCreateNewComment(item.id, newComment)
							}
							setCommentsByPostId={setCommentsByPostId}
							userData={userData}
						/>
					))}
				</main>
			</div>
		</>
	)
}
