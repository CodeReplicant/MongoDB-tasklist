const express = require('express');
const cors = require('cors');
const auth = express.Router();
const jwt = require('jsonwebtoken');
auth.use(cors());
auth.use(express.json());
require('dotenv').config();



const users = [
    { email: "admin@example.com", name: "admin", rol: "admin" },
    { email: "user@example.com", name: "user", rol: "user" },
  ];

auth.post("/login", (req, res) => {
    const datauser = req.body;
    const user = users.find((user) => user.email === datauser.email);
  
    if (!user) {
      res.status(401).json({ error: "Invalid user name or password" });
    } else {
      const token = jwt.sign(user, process.env.SECRET_KEY, { algorithm: "HS256" });
      res.json({ token });
    }
  });
  
  
  // Middleware para Validación JWT
  function JWTValidation(req, res, next) {
    // Extract the token from the Authorization header
    const token = req.headers.authorization;
  
    if (!token) {
      res.status(401).json({ error: "Unauthorized" });
    } else {
      try {
        // Verify the token using the secret key
        const ver = jwt.verify(token, process.env.SECRET_KEY);
        req.rol = ver.rol;
        next(); // Continue processing the request
      } catch (error) {
        res.status(403).json({ error: "Access not allowed" });
      }
    }
  }
  
  auth.get("/premium-clients", JWTValidation, (req, res) => {
    if (req.rol === "admin") {
      res.json({ message: "premium-clients list" });
    } else {
      res.status(403).json({ error: "Access not allowed" });
    }
  });
  
  auth.get("/medium-clients", JWTValidation, (req, res) => {
    if (req.rol === "admin" || req.rol === "user") {
      res.json({ message: "medium-clients list" });
    } else {
      res.status(403).json({ error: "Access not allowed" });
    }
  });
  
  module.exports = auth;