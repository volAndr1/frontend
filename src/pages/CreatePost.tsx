import { useState, type FC, type FormEvent } from 'react'
import { useRouter } from '@tanstack/react-router'
import { createPost } from '../api/posts'

const CreatePost: FC = () => {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const router = useRouter()

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault()
        if (!title.trim() || !content.trim()) {
            alert('Усі поля мають бути заповнені')
            return
        }

        try {
            await createPost({ title, content })
            setTitle('')
            setContent('')
            router.navigate({ to: '/posts' }) // Повернення до списку постів
        } catch (error) {
            alert('Помилка при створенні поста')
            console.error(error)
        }
    }

    return (
        <div className="max-w-2xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">Створення поста</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                        Назва поста
                    </label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Введіть назву поста"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
                        Вміст поста
                    </label>
                    <textarea
                        id="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Введіть вміст поста"
                        rows={5}
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
                >
                    Зберегти
                </button>
            </form>
        </div>
    )
}

export default CreatePost
