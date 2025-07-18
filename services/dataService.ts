type Post = {
  id: number;
  title: string;
  body: string;
}

export const getData = async (mode: 'local' | 'api'): Promise<Post[]> => {
  if (mode === 'local') {
    const response = await fetch('/Posts.json');
    return await response.json();
  } else {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    return await response.json();
  }
};

export const getPost = async (mode: 'local' | 'api', id: string): Promise<Post | undefined> => {
  if (mode === 'local') {
    const response = await fetch('/Posts.json');
    const data: Post[] = await response.json();
    return data.find((item: Post) => String(item.id) === id);
  } else {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
    return await response.json();
  }
};
