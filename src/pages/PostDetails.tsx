import { useParams, useRouter } from '@tanstack/react-router'
import { useEffect, useState, type FC } from 'react'
import { getPostById, updatePost } from '../api/posts'

const PostDetails: FC = () => {
    const { postId } = useParams({ strict: false })
    const router = useRouter()
    const [post, setPost] = useState<{ id: number; title: string; content: string } | null>(null)
    const [loading, setLoading] = useState(true)
    const [isEditing, setIsEditing] = useState(false)
    const [newTitle, setNewTitle] = useState('')
    const [newContent, setNewContent] = useState('')

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const data = await getPostById(Number(postId))
                setPost(data || null)
                if (data) {
                    setNewTitle(data.title)
                    setNewContent(data.content)
                }
            } finally {
                setLoading(false)
            }
        }
        fetchPost()
    }, [postId])

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault()

        const updatedPost = { title: newTitle, content: newContent }

        try {
            await updatePost(Number(postId), updatedPost)
            setIsEditing(false)
            router.navigate({ to: '/posts' }) // Перенаправление на страницу с постами
        } catch (error) {
            console.error('Ошибка при обновлении поста:', error)
            alert('Не удалось обновить пост')
        }
    }

    if (loading) return <div className="p-6">Завантаження...</div>
    if (!post) return <div className="p-6">Пост не знайдено</div>

    return (
        <div className="max-w-3xl mx-auto p-6 space-y-4">
            <h1 className="text-3xl font-bold">{isEditing ? 'Редагувати пост' : post.title}</h1>

            {isEditing ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                            Назва
                        </label>
                        <input
                            id="title"
                            type="text"
                            value={newTitle}
                            onChange={(e) => setNewTitle(e.target.value)}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="content" className="block text-sm font-medium text-gray-700">
                            Контент
                        </label>
                        <textarea
                            id="content"
                            value={newContent}
                            onChange={(e) => setNewContent(e.target.value)}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
                            rows={4}
                            required
                        />
                    </div>

                    <div className="flex gap-4">
                        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
                            Оновити
                        </button>
                        <button
                            type="button"
                            onClick={() => setIsEditing(false)}
                            className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition"
                        >
                            Скасувати
                        </button>
                    </div>
                </form>
            ) : (
                <p className="text-lg">{post.content}</p>
            )}

            <div className="mt-4">
                {!isEditing && (
                    <button
                        onClick={() => setIsEditing(true)}
                        className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 transition"
                    >
                        Редагувати
                    </button>
                )}
            </div>
        </div>
    )
}

export default PostDetails