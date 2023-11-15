import { prisma } from '.';
import boardModel from './board.model';

const initialBoard = {
  title: 'Initial Board',
};

type TUserInput = {
  email: string;
  passwordHash: string;
  firstName: string;
  lastName: string;
};

const userModel = {
  create: async (userInfo: TUserInput) => {
    try {
      const newUser = await prisma.user.create({
        data: {
          email: userInfo.email,
          passwordHash: userInfo.passwordHash,
          firstName: userInfo.firstName,
          lastName: userInfo.lastName,
        },
      });
      if (newUser) {
        boardModel.create({ ...initialBoard, userId: newUser.id });
      }
      return newUser;
    } catch (err) {
      console.log('err createEntry:>> ', err);
    }
  },
};

export default userModel;
