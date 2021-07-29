import express from 'express';
import client from '../client';
import { upload, verify } from '../utils/middleware';

const router = express.Router();

router.post('/uploadImage', (req, res) => {
  upload(req, res, (err) => {
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

// console.log('/post/uploadPost');
router.post('/uploadPost', verify, async (req, res) => {
  const { title, contents, images } = req.body;
  console.log(title, contents, images);
  try {
    await client.meetingLog.create({
      data: {
        ...req.body,
        userId: res.locals.userId,
      },
    });
    res.status(200).json({
      ok: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      error,
    });
  }
});

router.get('/getPosts', verify, async (req, res) => {
  try {
    const user = await client.user.findUnique({
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
  } catch (error) {
    res.status(500).json({
      ok: false,
      error,
    });
  }
});

router.get('/:postId', async (req, res) => {
  // /post/:id
  const { postId } = req.params;
  try {
    const post = await client.meetingLog.findUnique({
      where: {
        id: +postId,
      },
      include: {
        user: true,
      },
    });
    res.status(200).json({
      ok: true,
      post: {
        ...post,
        username: post.user.username,
      },
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      error,
    });
  }
});

// /post/getAll
router.get('/getAll', verify, async (req, res) => {
  const { id } = res.locals.user;
  try {
    const posts = await client.user
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
  } catch (error) {
    res.status(500).json({
      ok: false,
      error,
    });
  }
});

// DELETE /posts/:id
router.delete('/:postId', async (req, res) => {
  const { postId } = req.params;

  try {
    const exist = await client.meetingLog.findUnique({
      where: {
        id: +postId,
      },
    });
    if (!exist)
      res.status(400).json({
        ok: false,
        error: 'Meeting log not exists.',
      });

    await client.meetingLog.delete({
      where: {
        id: +postId,
      },
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      error,
    });
  }
});

// PUT /post/:id
router.put('/:postId', async (req, res) => {
  const { postId } = req.params;

  try {
    const exist = await client.meetingLog.findUnique({
      where: {
        id: +postId,
      },
    });
    if (!exist)
      res.status(400).json({
        ok: false,
        error: 'Meeting log not exists.',
      });

    await client.meetingLog.update({
      where: {
        id: +postId,
      },
      data: {
        ...req.body,
      },
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      error,
    });
  }
});

export default router;
