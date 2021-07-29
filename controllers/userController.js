"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const client_1 = __importDefault(require("../client"));
const jwt = __importStar(require("jsonwebtoken"));
class UserController {
    static async join(req, res) {
        const { email, username, password } = req.body;
        if (!email || !username || !password)
            res.status(400).json({ ok: false, error: 'Invalid parameters' });
        const exists = await client_1.default.user.findUnique({
            where: {
                email,
            },
            select: {
                id: true,
            },
        });
        if (exists) {
            return res.json({
                ok: false,
                error: 'User already exists.',
            });
        }
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        try {
            await client_1.default.user.create({
                data: {
                    email,
                    username,
                    password: hashedPassword,
                },
            });
            res.json({
                ok: true,
            });
        }
        catch (error) {
            console.log(error);
            res.json({
                ok: false,
                error: 'Internal server error',
            });
        }
    }
    static async login(req, res) {
        const { email, password } = req.body;
        if (!(email && password)) {
            return res.status(400).json({
                ok: false,
                error: 'email or password is null',
            });
        }
        try {
            const userExist = await client_1.default.user.findUnique({
                where: {
                    email,
                },
            });
            if (!userExist) {
                return res.json({
                    ok: false,
                    error: '존재하지 않는 계정입니다.',
                });
            }
            console.log(password, userExist.password);
            const passwordOk = await bcrypt_1.default.compare(password, userExist.password);
            console.log(passwordOk);
            if (!passwordOk) {
                return res.json({
                    ok: false,
                    error: '비밀번호 불일치',
                });
            }
            const token = jwt.sign({ id: userExist.id }, process.env.PRIVATE_KEY);
            return res.json({
                ok: true,
                token: token,
            });
        }
        catch (error) {
            console.log(error);
        }
    }
}
exports.default = UserController;
//# sourceMappingURL=userController.js.map