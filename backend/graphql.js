const { gql } = require("apollo-server-express");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// const typeDefs = gql`
//   type User {
//     id: Int!
//     username: String!
//     email: String!
//     password: String!
//     gender: String
//     dateOfBirth: String
//   }

//   type Post {
//     id: Int!
//     title: String!
//     content: String!
//     createdAt: String!
//     updatedAt: String!
//     createdBy: User
//     category: String
//     likeCount: Int!
//     viewCount: Int!
//   }

//   type Comment {
//     id: Int!
//     content: String!
//     createdAt: String!
//     updatedAt: String!
//     post: Post
//   }

//   type Query {
//     posts: [Post!]!
//     users: [User!]!
//     comments: [Comment!]!
//   }

//   type Mutation {
//     createPost(
//       title: String!
//       content: String!
//       createdBy: Int!
//       category: String
//     ): Post!
//     createUser(
//       username: String!
//       email: String!
//       password: String!
//       gender: String
//       dateOfBirth: String
//     ): User!
//     createComment(content: String!, postId: Int!): Comment!
//   }
// `;

const resolvers = {
  Query: {
    posts: async () => {
      return prisma.post.findMany();
    },
    users: async () => {
      return prisma.user.findMany();
    },
    comments: async () => {
      return prisma.comment.findMany();
    },
  },
  Mutation: {
    signIn: async (parent, { email, password }) => {
      const user = await prisma.user.findUnique({ where: { email } });

      if (!user) {
        throw new Error('User not found');
      }

      if (user.password !== password) {
        throw new Error('Invalid password');
      }

      const token = jwt.sign({ userId: user.id }, 'your_secret_key'); // Replace with your secret key

      return {
        token,
        user,
      };
    },
    createPost: async (parent, { title, content, createdBy, category }) => {
      return prisma.post.create({
        data: {
          title,
          content,
          createdBy: { connect: { id: createdBy } }, // Connect the post to the user who created it
          category,
        },
      });
    },
    createUser: async (
      parent,
      { username, email, password, gender, dateOfBirth }
    ) => {
      return prisma.user.create({
        data: {
          username,
          email,
          password,
          gender,
          dateOfBirth,
        },
      });
    },
    createComment: async (parent, { content, postId }) => {
      return prisma.comment.create({
        data: {
          content,
          post: { connect: { id: postId } }, // Connect the comment to the post it belongs to
        },
      });
    },
  },
};

module.exports = { typeDefs, resolvers };
