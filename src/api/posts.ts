import api from './axios'

export type Post = {
    id: number
    title: string
    content: string
};


export const getAllPosts = async (): Promise<Post[]> => {
    const response = await api.get<{ message: string; data: Post[] }>('/posts')
    return response.data.data
};


export const getPostById = async (id: number): Promise<Post> => {
    const response = await api.get<{ message: string; data: Post }>(`/posts/${id}`)
    return response.data.data
};


export const createPost = async (data: Omit<Post, 'id'>): Promise<Post> => {
    const response = await api.post<{ message: string; data: Post }>('/posts', data)
    return response.data.data
};


export const updatePost = async (id: number, data: Omit<Post, 'id'>): Promise<Post> => {
    const response = await api.patch<{ message: string; data: Post }>(`/posts/${id}`, data);
    return response.data.data;
};


export const deletePost = async (id: number): Promise<void> => {
    await api.delete(`/posts/${id}`)
};

export const login = async (credentials: { email: string; password: string }): Promise<string> => {
    const response = await api.post<{ token: string }>('/auth/login', credentials);
    return response.data.token;
};
