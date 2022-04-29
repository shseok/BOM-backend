import { PrismaClient } from "@prisma/client";
import { OPCODE } from "../tools";
import { NextFunction, Request, Response } from 'express';
import { ServerStreamFileResponseOptionsWithError } from "http2";
import { NetConnectOpts } from "net";

const prisma = new PrismaClient();


export const createPost = async (req: Request, res: Response, next: NextFunction): Promise<unknown> => {
	let post = {
        title: req.body.title,
        postKind: req.body.postKind,
        content: req.body.content,
        userId: req.body.userId,
        categoryId: req.body.categoryId
    }

    try {
        const result = await prisma.post.create({
            data: post
        })
        return res.json({ opcode: OPCODE.SUCCESS, result });


    } catch(error) {
        console.log(error);
        next(error);
    }
}

export const soltingPostByCategory = async (req: Request, res: Response, next: NextFunction): Promise<unknown> => {
    const categoryId = parseInt(String(req.query.categoryId));

    try {
        const resultPosts = await prisma.post.findMany({
            where: { categoryId },
            orderBy: { createdAt: 'desc' }
        })

        return res.json({ opcode: OPCODE.SUCCESS, resultPosts });
	} catch(error){
		console.log(error);
		next(error);
	}
}

export const deletePost = async (req: Request, res: Response, next: NextFunction): Promise<unknown> => {
	const postId = parseInt(String(req.query.postId));
    console.log("postId: ", postId);
	try {
        return res.json({ opcode: OPCODE.SUCCESS });

    } catch(error) {
        console.log(error);
        next(error);
    }
}


export const getPostbyPostId = async (req: Request, res: Response, next: NextFunction): Promise<unknown> => {
    const postId = parseInt(req.params.postId);

    try {
        const resultPost = await prisma.post.findUnique({
            where: { postId }
        })

        return res.json({ opcode: OPCODE.SUCCESS, resultPost });
        
    } catch(error) {
        console.log(error);
        next(error);
    }
}

export const updatePost = async (req: Request, res: Response, next: NextFunction): Promise<unknown> => {
	let post = {
		title: req.body.title,
		content: req.body.content,
		postKind: req.body.postKind,
		anonymous: req.body.anonymous
	}
	let postId = parseInt(req.params.postId);

	try {
		const postData = await prisma.post.update({
			where: {
				postId
			},
			data: post
		});
		
		console.log("post", postData);
		return res.json({ opcode: OPCODE.SUCCESS, postData });
	} catch(error) {
		console.log(error);
		next(error);
	}
}

export const getPostByTitle = async (req: Request, res: Response, next: NextFunction): Promise<unknown> => {
	const search = req.body.search;
	console.log(search);

	try {
		const posts = await prisma.post.findMany({
			where: {
				title: {
					contains: `${search}`
				}
			}
		});

		return res.json({ opcode: OPCODE.SUCCESS, posts });

	} catch(error) {
		console.log(error);
		next(error);
	}
}