export const getData = async (mode: 'local' | 'api') => {
    if (mode === 'local') {
      const response = await fetch('../Posts.json');
      return await response.json();
    } else {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts');
      return await response.json();
    }
  };

  export const getPost = async (mode: 'local' | 'api', id: string) => {
    if (mode === 'local') {
      const response = await fetch('../Posts.json');
      const data = await response.json();
      return data.find((item: any) => String(item.id) === id);
    } else {
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
      return await response.json();
    }
  };
