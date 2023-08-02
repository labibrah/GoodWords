const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");
const { PrismaClient } = require("@prisma/client");
// const dotenv = require('dotenv');
const cors = require("cors");
const prisma = new PrismaClient();

const schema = buildSchema(`
type Query {
  getPosts: [Post!]!
  loginUser(email: String!, password: String!): User
}
type Mutation {
  signUpUser(firstName: String!, lastName: String!, email: String!,password: String!, gender: String!, dateOfBirth: String!): User
}

type User {
  id: Int!
  firstName: String!
  lastName: String!
  email: String!
  password: String!
  gender: String
  dateOfBirth: String
}
type Post {
  id: Int!
  title: String!
  content: String!
  createdAt: String!
  updatedAt: String!
  createdBy: User
  category: String
  likeCount: Int!
  viewCount: Int!
}

type Comment {
  id: Int!
  content: String!
  createdAt: String!
  updatedAt: String!
  post: Post
}



`);

const root = {
  loginUser: async (args) => {
    const user = await prisma.user.findUnique({ where: { email: args.email } });
    console.log(args);
    if (!user) {
      throw new Error("User not found");
    }

    if (user.password !== args.password) {
      throw new Error("Invalid password");
    }

    return user;
  },
  getPosts: async () => {
    console.log("Helloo");
    const posts = await prisma.post.findMany();
    // console.log(posts);

    return posts;
  },
  signUpUser: async (args) => {
    console.log("jello", args);
    const newUser = await prisma.user.create({
      data: {
        firstName: args.firstName,
        lastName: args.lastName,
        email: args.email,
        password: args.password,
        dateOfBirth: args.dateOfBirth,
        gender: args.gender,
      },
    });
    return newUser;
  },
};

const app = express();
app.use(cors());

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);

const port = process.env.PORT || 4000;

app.listen(port, () => console.log(`Server is running on port ${port}`));

async function main() {
  // Assuming you already have Prisma Client initialized as `prisma`
  // const createDummyPosts = async () => {
  //   const dummyPosts = [
  //     {
  //       title: "First Post",
  //       content:
  //         "Quidam alii sunt, et non est in nostra potestate. Quae omnia in nostra sententia, pursuit, cupiditatem, aversatio, ex quibus in Verbo, quicquid non suis actibus nostris. Non sunt in nostra potestate corpore bona fama",
  //       category: "Food,Lifestyle",
  //     },
  //     {
  //       title: "Second Post",
  //       content:
  //         "Quidam alii sunt, et non est in nostra potestate. Quae omnia in nostra sententia, pursuit, cupiditatem, aversatio, ex quibus in Verbo, quicquid non suis actibus nostris. Non sunt in nostra potestate corpore bona fama",
  //       category: "Technology",
  //     },
  //     {
  //       title: "Third Post",
  //       content:
  //         "Quidam alii sunt, et non est in nostra potestate. Quae omnia in nostra sententia, pursuit, cupiditatem, aversatio, ex quibus in Verbo, quicquid non suis actibus nostris. Non sunt in nostra potestate corpore bona fama",
  //       category: "Technology",
  //     },
  //     // Add more dummy posts here...
  //   ];
  //   for (const post of dummyPosts) {
  //     await prisma.post.create({ data: post });
  //   }
  //   console.log("Dummy posts inserted successfully.");
  // };
  // createDummyPosts()
  // .then(() => {
  //   console.log('Dummy posts insertion completed.');
  // })
  // .catch((error) => {
  //   console.error('Error inserting dummy posts:', error);
  // });
}

main()
  .catch((e) => {
    console.error(e.message);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
