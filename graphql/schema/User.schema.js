const types = `
    type User {
        _id: ID!
        name: String!
        address: String!
        email: String!
        password: String!
    }
    input UserInputData{
        name: String!
        address: String!
        email: String!
        password: String!
    }
`;

const queries = `
    allUsers: [User!]!
`;

const mutations = `
    createUser(userInput: UserInputData) : User!
    updateUser(id: ID!, userInput: UserInputData) : User!
    deleteUser(id: ID!) : User!
`;
module.exports = {types, queries, mutations};