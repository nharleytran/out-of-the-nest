const PostDAO = require('../src/data/PostDAO');
const Post = require('../src/model/Post');
const Category = require('../src/model/Category');
const User = require('../src/model/User');

jest.mock('../src/model/Post');
jest.mock('../src/model/Category');
jest.mock('../src/model/User');

describe('PostDAO', () => {
  let dao;
  beforeEach(() => {
    dao = new PostDAO();
  });

  describe('createPost', () => {
    it('creates a post', async () => {
      const data = {
        title: 'Test post',
        objective: 'Testing',
        outcome: 'Success',
        content: 'Test content',
        author: 'Tester',
        user_id: 'user1',
        category_id: 'category1',
        gpa: 4.0,
        testscore: 1600,
        resume: 'Test resume',
        extracurriculars: 'Test extracurriculars',
        international: true,
        anonymous: false
      };
      const post = new Post(data);
      Post.create.mockResolvedValueOnce(post);

      const category = { _id: data.category_id, posts: [] };
      Category.updateOne.mockResolvedValueOnce({ category });

      const result = await dao.createPost(data);

      expect(Post.create).toHaveBeenCalledWith(data);
      expect(Category.updateOne).toHaveBeenCalledWith(
        { _id: data.category_id },
        { $push: { posts: post._id } }
      );
      expect(result).toBe(post);
    });
  });

  describe('getPost', () => {
    it('gets a post by ID', async () => {
      const post = new Post();
      Post.findById.mockResolvedValueOnce(post);

      const result = await dao.getPost('id1');

      expect(Post.findById).toHaveBeenCalledWith('id1');
      expect(result).toBe(post);
    });

    it('throws an error if post is not found', async () => {
      Post.findById.mockResolvedValueOnce(null);

      await expect(dao.getPost('id1')).rejects.toThrow('Post not found');
    });
  });

  describe('getPostsByCategory', () => {
    it('gets posts by category ID', async () => {
      const posts = [new Post(), new Post()];
      Post.find.mockResolvedValueOnce(posts);

      const result = await dao.getPostsByCategory('cat1');

      expect(Post.find).toHaveBeenCalledWith({ category_id: 'cat1' });
      expect(result).toBe(posts);
    });

    it('throws an error if no posts found', async () => {
      Post.find.mockResolvedValueOnce(null);

      await expect(dao.getPostsByCategory('cat1')).rejects.toThrow('Post not found');
    });
  })
});