export const getData = async (mode: 'local' | 'api') => {
    if (mode === 'local') {
      const response = await fetch('Posts.json');
      return await response.json();
    } else {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts');
      return await response.json();
    }
  };