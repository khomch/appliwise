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
  register: async (userInfo: TUserInput) => {
    const { email, passwordHash, firstName, lastName } = userInfo;
    try {
      const newUser = await prisma.user.create({
        data: {
          email,
          passwordHash,
          firstName,
          lastName,
        },
      });
      if (newUser) {
        boardModel.create({ ...initialBoard, userId: newUser.id });
      }
      return newUser;
    } catch (err) {
      console.log('err createUser:>> ', err);
    }
  },
};

export default userModel;
