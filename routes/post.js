"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const client_1 = __importDefault(require("../client"));
const middleware_1 = require("../utils/middleware");
const router = express_1.default.Router();
router.post('/uploadImage', (req, res) => {
    middleware_1.upload(req, res, (err) => {
        if (err) {
            return res.json({ ok: false, err });
        }
        return res.json({
            ok: true,
            image: res.req.file.path,
            fileName: res.req.file.filename,
        });
    });
});
router.post('/uploadPost', middleware_1.verify, async (req, res) => {
    const { title, contents, images } = req.body;
    console.log(title, contents, images);
    try {
        await client_1.default.meetingLog.create({
            data: Object.assign(Object.assign({}, req.body), { userId: res.locals.userId }),
        });
        res.status(200).json({
            ok: true,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            error,
        });
    }
});
router.get('/getPosts', middleware_1.verify, async (req, res) => {
    try {
        const user = await client_1.default.user.findUnique({
            where: {
                id: res.locals.userId,
            },
            include: {
                meetingLogs: true,
            },
        });
        return res.status(200).json({
            ok: true,
            meetingLogs: user.meetingLogs,
        });
    }
    catch (error) {
        res.status(500).json({
            ok: false,
            error,
        });
    }
});
router.get('/:postId', async (req, res) => {
    const { postId } = req.params;
    try {
        const post = await client_1.default.meetingLog.findUnique({
            where: {
                id: +postId,
            },
            include: {
                user: true,
            },
        });
        res.status(200).json({
            ok: true,
            post: Object.assign(Object.assign({}, post), { username: post.user.username }),
        });
    }
    catch (error) {
        res.status(500).json({
            ok: false,
            error,
        });
    }
});
router.get('/getAll', middleware_1.verify, async (req, res) => {
    const { id } = res.locals.user;
    try {
        const posts = await client_1.default.user
            .findUnique({
            where: {
                id,
            },
        })
            .meetingLogs();
        console.log('posts : ', posts);
        res.status(200).json({
            ok: true,
            posts,
        });
    }
    catch (error) {
        res.status(500).json({
            ok: false,
            error,
        });
    }
});
router.delete('/:postId', async (req, res) => {
    const { postId } = req.params;
    try {
        const exist = await client_1.default.meetingLog.findUnique({
            where: {
                id: +postId,
            },
        });
        if (!exist)
            res.status(400).json({
                ok: false,
                error: 'Meeting log not exists.',
            });
        await client_1.default.meetingLog.delete({
            where: {
                id: +postId,
            },
        });
    }
    catch (error) {
        res.status(500).json({
            ok: false,
            error,
        });
    }
});
router.put('/:postId', async (req, res) => {
    const { postId } = req.params;
    try {
        const exist = await client_1.default.meetingLog.findUnique({
            where: {
                id: +postId,
            },
        });
        if (!exist)
            res.status(400).json({
                ok: false,
                error: 'Meeting log not exists.',
            });
        await client_1.default.meetingLog.update({
            where: {
                id: +postId,
            },
            data: Object.assign({}, req.body),
        });
    }
    catch (error) {
        res.status(500).json({
            ok: false,
            error,
        });
    }
});
exports.default = router;
//# sourceMappingURL=post.js.map