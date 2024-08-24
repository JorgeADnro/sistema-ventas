"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
class AuthRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.post('/', (req, res) => {
            res.send("Login");
        });
    }
}
const authRoutes = new AuthRoutes();
exports.default = authRoutes.router;
