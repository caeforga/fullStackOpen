const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const helper = require('./test_helper')

const Blog = require('../models/blog')

beforeEach(async () => {
    await Blog.deleteMany({})

    for (let blog of helper.initialBlogs) {
        let blogObject = new Blog(blog)
        await blogObject.save()
    }
})

test('all blogs are returned 🧐', async () => {
    const response = await api.get('/api/blogs')

    assert.strictEqual(response.body.length, helper.initialBlogs.length)
})

test('unique identifier property of blog posts is named id 🧐', async () => {
    const response = await api.get('/api/blogs')

    const blog = response.body[0]
    assert(blog.id)
    assert(!blog._id)
})

test('a valid blog can be added 🧐', async () => {
    const newBlog = {
        title: 'new blog',
        author: 'Carlos E. Ortiz',
        url: 'http://google.com',
        likes: 68,
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)
})

test('a specific blog is within the returned blogs 🧐', async () => {
    const response = await api.get('/api/blogs')

    const contents = response.body.map(r => r.title)

    assert(contents.includes('Canonical string reduction'))
})

test('should default likes to 0 if missing from request 🧐', async () => {
    const newBlog = {
        title: 'new blog without likes',
        author: 'Carlos E. Ortiz',
        url: 'http://google.com',
    }

    const response = await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    assert.strictEqual(response.body.likes, 0, 'Property likes is not 0 by default')
})

test('should return 400 if url are missing 🧐', async () => {
    const newBlog = {
        title: 'new blog without url',
        author: 'Carlos E. Ortiz',
        likes: 68,
    }

    const response = await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)
        .expect('Content-Type', /application\/json/)

    assert.strictEqual(response.body.error.includes('`url` is required'), true)
})

test('should return 400 if title are missing 🧐', async () => {
    const newBlog = {
        author: 'Carlos E. Ortiz',
        url: 'http://google.com',
        likes: 68,
    }

    const response = await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)
        .expect('Content-Type', /application\/json/)

    assert.strictEqual(response.body.error.includes('`title` is required'), true)
})

describe('deletion of a blog post', () => {

    test('deleting a blog post 🧐', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToDelete = blogsAtStart[0]

        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .expect(204)

        const blogsAtEnd = await helper.blogsInDb()

        assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1)

        const contents = blogsAtEnd.map(r => r.title)

        assert(!contents.includes(blogToDelete.title))
    })

    test('deleting a blog post with invalid id 🧐', async () => {

        const invalidId = '5a3d5da59070081a82a3445'

        await api
            .delete(`/api/blogs/${invalidId}`)
            .expect(400)
    })
})

describe('updating a specific blog post', () => {

    test('succeeds with valid id and data, and verifies the update 🧐', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToUpdate = blogsAtStart[0]

        const newBlog = {
            title: 'Updated title',
            author: 'Updated author',
            url: 'http://google.com',
            likes: 68,
        }

        await api
            .put(`/api/blogs/${blogToUpdate.id}`)
            .send(newBlog)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const blogsAtEnd = await helper.blogsInDb()
        const updatedBlog = blogsAtEnd.find(b => b.id === blogToUpdate.id)

        assert.strictEqual(updatedBlog.title, newBlog.title)
        assert.strictEqual(updatedBlog.author, newBlog.author)
        assert.strictEqual(updatedBlog.url, newBlog.url)
        assert.strictEqual(updatedBlog.likes, newBlog.likes)
    })

    test('fails with status code 400 for invalid id 🧐', async () => {
        const invalidId = '5a3d5da59070081a82a3445'

        const newBlog = {
            title: 'Updated title',
            author: 'Updated author',
            url: 'http://google.com',
            likes: 68,
        }

        await api
            .put(`/api/blogs/${invalidId}`)
            .send(newBlog)
            .expect(400)
    })

})

after(async () => {
    await mongoose.connection.close()
})