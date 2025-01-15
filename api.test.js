const instance = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com',
    timeout: 5000,
});

instance.interceptors.request.use((config) => {
    console.log(`Request: ${config.method.toUpperCase()} ${config.url}`);
    return config;
});

instance.interceptors.response.use(
    (response) => {
        console.log(`Response: ${response.status} ${response.statusText}`);
        return response;
    },
    (error) => {
        console.error(`Error: ${error.message}`);
        return Promise.reject(error);
    }
);

describe('JSONPlaceholder API tests', () => {
    test('GET /posts should return a list of posts', async () => {
        const response = await instance.get('/posts');
        expect(response.status).toBe(200);
        expect(Array.isArray(response.data)).toBe(true);
        expect(response.data.length).toBeGreaterThan(0);
    });

    test('GET /posts/1 should return a single post', async () => {
        const response = await instance.get('/posts/1');
        expect(response.status).toBe(200);
        expect(response.data.id).toBe(1);
        expect(response.data).toHaveProperty('title');
    });

    test('POST /posts should create a new post', async () => {
        const newPost = {
            title: 'foo',
            body: 'bar',
            userId: 1,
        };
        const response = await instance.post('/posts', newPost);
        expect(response.status).toBe(201);
        expect(response.data).toMatchObject(newPost);
        expect(response.data).toHaveProperty('id');
    });

    test('GET /comments should return a list of comments', async () => {
        const response = await instance.get('/comments');
        expect(response.status).toBe(200);
        expect(Array.isArray(response.data)).toBe(true);
    });

    test('GET /users should return a list of users', async () => {
        const response = await instance.get('/users');
        expect(response.status).toBe(200);
        expect(Array.isArray(response.data)).toBe(true);
        expect(response.data.length).toBeGreaterThan(0);
    });
});
