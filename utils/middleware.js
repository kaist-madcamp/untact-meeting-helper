"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verify = exports.upload = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const client_1 = __importDefault(require("../client"));
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
exports.upload = multer_1.default({
    storage: multer_1.default.diskStorage({
        destination(req, file, cb) {
            cb(null, 'uploads/');
        },
        filename(req, file, cb) {
            cb(null, new Date().valueOf() + path_1.default.extname(file.originalname));
        },
    }),
    limits: {
        fileSize: 1024 * 1024 * 10,
    },
}).single('file');
const verify = async (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        res.status(401).json({
            ok: false,
            error: 'Please login.',
        });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.PRIVATE_KEY);
        if (typeof decoded === 'object' && 'id' in decoded) {
            const user = await client_1.default.user.findUnique({
                where: {
                    id: decoded['id'],
                },
                select: {
                    id: true,
                },
            });
            if (!user) {
                return res.status(401).json({
                    ok: false,
                    error: 'Unauthorized user.',
                });
            }
            res.locals.userId = user.id;
        }
        next();
    }
    catch (error) {
        res.status(500).json({
            ok: false,
            error,
        });
    }
};
exports.verify = verify;
//# sourceMappingURL=middleware.js.map