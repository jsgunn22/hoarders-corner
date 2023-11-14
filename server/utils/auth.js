const jwt = require("jsonwebtoken");
const { GraphQLError } = require("graphql");

const secret = "keepinonthedl";
const expiration = "2h";

module.exports = {
  AuthenticationError: new GraphQLError("Could not authenticate user.", {
    extensions: {
      code: "UNAUTHENTICATED",
    },
  }),
  authMiddleware: function ({ req }) {
    //configures token based on how it was delivered from the request
    let token = req.body.token || req.query.token || req.headers.authorization;

    // if the token came in from the headers we need to remove 'Bearer'
    if (req.headers.authorization) {
      token = token.split(" ").pop().trim();
    }

    // if no token is recieve return the request
    if (!token) {
      return req;
    }

    // if a token is present verify the token
    try {
      const { authenticatedPerson } = jwt.verify(token, secret, {
        maxAge: expiration,
      });
      req.user = authenticatedPerson;
    } catch (error) {
      console.log("Wrong Token");
    }
    // if everything is good return the updated request
    return req;
  },
  // assuming we will be using email, username, and mongodb default id
  signToken: function ({ email, username, _id }) {
    const payload = { email, username, _id };
    return jwt.sign({ authenticatedPerson: payload }, secret, {
      expiresIn: expiration,
    });
  },
};
