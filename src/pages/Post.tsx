import type { FC } from 'react'
import { useRouter } from '@tanstack/react-router'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAllPosts, deletePost } from '../api/posts'

const Posts: FC = () => {
    const router = useRouter()
    const queryClient = useQueryClient()

    // Запит для отримання постів
    const { data: posts = [], isLoading } = useQuery({
        queryKey: ['posts'],
        queryFn: getAllPosts,
    })

    // Мутація для видалення поста
    const deleteMutation = useMutation({
        mutationFn: deletePost,
        onSuccess: () => {
            // Оновлення кешу після видалення поста
            queryClient.invalidateQueries(['posts']) // Оновлює запит для отримання постів
        },
        onError: (error) => {
            console.error('Помилка при видаленні поста:', error)
            alert('Не вдалося видалити пост')
        },
    })

    const handleDelete = async (id: number) => {
        const confirmed = window.confirm('Ви впевнені, що хочете видалити цей пост?')
        if (!confirmed) return
        deleteMutation.mutate(id)
    }

    if (isLoading) return <div className="p-6">Завантаження...</div>

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Пости</h1>
                <button
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                    onClick={() => router.navigate({ to: '/create' })}
                >
                    Створити
                </button>
            </div>

            <div className="space-y-4">
                {posts.map((post) => (
                    <div
                        key={post.id}
                        className="border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition"
                    >
                        <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                        <div className="flex gap-2">
                            <button
                                className="bg-gray-100 text-gray-800 px-3 py-1 rounded hover:bg-gray-200 transition"
                                onClick={() => router.navigate({ to: `/${post.id}` })}
                            >
                                Переглянути
                            </button>
                            <button
                                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                                onClick={() => handleDelete(post.id)}
                                disabled={deleteMutation.isLoading}
                            >
                                Видалити
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Posts
