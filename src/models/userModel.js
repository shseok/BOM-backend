//참고 https://velog.io/@jinybear/TIL-6.-%EB%AA%A8%EB%93%88%ED%99%94%EC%99%80-MVC-%ED%8C%A8%ED%84%B4-2

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const createUser = async (user) => {
    try{
        const data = await prisma.user.create({
        data: user
        });
    return data;
    
    } catch(error){
        console.log(error);
    }
}

module.exports = {
  createUser,//회원가입
}