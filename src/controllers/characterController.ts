import { PrismaClient } from "@prisma/client";
import { OPCODE } from "../tools";
import { NextFunction, Request, Response } from 'express';

const prisma = new PrismaClient();

export const getCharacterInfomation = async (req: Request, res: Response, next: NextFunction): Promise<unknown> => {
	const characterId = Number(req.query.characterId);

	try {
		const character = await prisma.character.findUnique({
			where: {
				characterId
			}
		});
		return res.status(201).json({ opcode: OPCODE.SUCCESS, character });

	} catch(error) {
		console.log(error);
		next(error);
	}
};


export const getCharacterImageUrl = async (req: Request, res: Response, next: NextFunction): Promise<unknown> => {
	const characterId = Number(req.query.characterId);

	try {
		const character = await prisma.character.findUnique({
			where: {
				characterId
			},
            select:{
                imageUrl:true
            }
		});

		return res.status(201).json({ opcode: OPCODE.SUCCESS, character});

	} catch(error) {
		console.log(error);
		next(error);
	}
};

export const getAllCharacters = async (req: Request, res: Response, next: NextFunction): Promise<unknown> => {
	const userId = Number(req.query.userId);

	try {
		const characters = await prisma.collection.findMany({
			where: {
				userId: userId
			},
            select:{
                characterId : true
            }
		});
		return res.status(201).json({ opcode: OPCODE.SUCCESS, characters});

	} catch(error) {
		console.log(error);
		next(error);
	}
};

export const createCollection = async (req: Request, res: Response, next: NextFunction): Promise<unknown> => {
    
    let collectionData ={
        userId : Number(req.query.userId),
        characterId : Number(req.query.characterId)
    } 

    try {
        const resultCollection = await prisma.collection.create({
            data: collectionData
        })

        return res.json({ opcode: OPCODE.SUCCESS, resultCollection })

    } catch(error) {
        console.log(error);
        next(error);
    }
}

export const deleteCollection = async (req: Request, res: Response, next: NextFunction): Promise<unknown> => {
    
    const userId = Number(req.query.userId);
    const characterId = Number(req.query.characterId);


    try {
        await prisma.collection.deleteMany({
            where:{
                AND: [
                    {userId : userId},
                    {characterId : characterId}
                ]
            }
        })

        return res.json({ opcode: OPCODE.SUCCESS })

    } catch(error) {
        console.log(error);
        next(error);
    }
}

export const searchCharacter = async (req: Request, res: Response, next: NextFunction): Promise<unknown> => {
    
    const userId = Number(req.query.userId);
    const search = String(req.query.search);
    let resultCharacter = [];

    try {
        const resultCollection = await prisma.collection.findMany({
            where: {
                userId: userId
            }
        })

        for(let i = 0; i< resultCollection.length; i++){

            console.log(resultCollection[i].characterId);
            
           
            resultCharacter.push(
                await prisma.character.findMany({
                    where: {
                        AND: [
                            {
                                characterId : resultCollection[i].characterId
                            },
                            {
                                characterName : {
                                    contains : search
                                }
                            }
                        ]
                        
                    }
                })
            )  
        }
        


        return res.json({ opcode: OPCODE.SUCCESS, resultCharacter })

    } catch(error) {
        console.log(error);
        next(error);
    }
}

