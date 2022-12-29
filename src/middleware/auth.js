const JWT = require("jsonwebtoken");
// const userModel = require("../models/userModel");
//If no token is present in the request header return error. This means the user is not logged in.

const authenticate = async function (req, res, next) {

    try {
        let token = req.headers["x-auth-token"];
        if (!token) return res.status(401).send("Can't find Token. It must be present");
        let decodedToken = JWT.verify(token, "functionup-californium-very-very-secret-key");
        if (!decodedToken)
            return res.status(500).send({ status: false, msg: "token is invalid" });
        req.token = decodedToken
        next();

    } catch (error) {
        res.status(500).send({ error: error.message })
    }
};

const authorise = async function (req, res, next) {
    try {
        let userId = req.params.userId;
        let decordDetails = req.token.userId
        if (userId != decordDetails) {
            return res.status(403).send("Can't login with this user. You have to modify the request user details.")
        }
        next()

    } catch (error) {
        res.status(500).send({ error: error.message })
    }
};






module.exports = { authenticate, authorise }