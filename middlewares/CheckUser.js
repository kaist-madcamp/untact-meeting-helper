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
exports.checkUser = void 0;
const client_1 = require(".prisma/client");
const jwt = __importStar(require("jsonwebtoken"));
const client_2 = __importDefault(require("src/client"));
const { user } = new client_1.PrismaClient();
const checkUser = async (req, res, next) => {
    if ('authorization' in req.headers) {
        const decoded = jwt.verify(req.headers['authorization'], process.env.PRIVATE_KEY);
        if (typeof decoded === 'object' && 'id' in decoded) {
            const exists = await client_2.default.user.findUnique({
                where: {
                    id: decoded.in,
                },
            });
            if (!exists) {
                res.json({
                    ok: false,
                    error: "User doesn't exists.",
                });
            }
            else {
                req.headers['user'] = exists;
            }
        }
    }
    next();
};
exports.checkUser = checkUser;
//# sourceMappingURL=CheckUser.js.map