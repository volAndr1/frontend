import { useState, useEffect } from 'react';
import { useParams, useRouter } from '@tanstack/react-router';
import { getPostById, updatePost } from '../api/posts';

const EditPost = () => {
    const { postId } = useParams();
    const [post, setPost] = useState<{ id: number; title: string; content: string } | null>(null);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const data = await getPostById(Number(postId));
                setPost(data);
                setTitle(data.title);
                setContent(data.content);
            } catch (err) {
                setError('Не вдалося завантажити пост');
            }
        };
        fetchPost();
    }, [postId]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!title.trim() || !content.trim()) {
            setError('Усі поля мають бути заповнені');
            return;
        }

        try {
            await updatePost(Number(postId), { title, content });
            router.navigate({ to: `/posts/${postId}` }); // Перенаправлення на сторінку перегляду поста
        } catch (err) {
            setError('Помилка при оновленні поста');
        }
    };

    if (!post) return <div>Завантаження...</div>;
    return (
        <div className="max-w-2xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">Редагувати пост</h1>
            {error && <div className="text-red-500">{error}</div>}
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
                    Оновити
                </button>
            </form>
        </div>
    );
};

export default EditPost;
