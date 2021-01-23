import { Service, Inject } from 'typedi';
import jwt from 'jsonwebtoken';
import config from '../config';
import { IUser, IUserInputDTO } from '../interfaces/IUser';

@Service()
export default class AuthService {
  constructor(
    @Inject('userModel') private userModel: Models.UserModel,
    @Inject('logger') private logger,
  ) {
  }

  public async SignUp(userInputDTO: IUserInputDTO): Promise<{ user: IUser; token: string }> {
    try {
      const userRecord = await this.userModel.create({
        ...userInputDTO,
      });
      this.logger.silly('Generating JWT');
      const token = this.generateToken(userRecord);

      if (!userRecord) {
        throw new Error('User cannot be created');
      }

      const user = userRecord.toObject();
      return { user, token };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async SignIn(phone: string): Promise<{ user: IUser; token: string }> {
    const userRecord = await this.userModel.findOne({ phone });
    if (!userRecord) {
      throw new Error('User not registered');
    }
      const token = this.generateToken(userRecord);
      const user = userRecord.toObject();
      return { user, token };
  }

  private generateToken(user) {
    const today = new Date();
    const exp = new Date(today);
    exp.setDate(today.getDate() + 60);

    this.logger.silly(`Sign JWT for userId: ${user._id}`);
    return jwt.sign(
      {
        _id: user._id,
        role: user.role,
        name: user.name,
        exp: exp.getTime() / 1000,
      },
      config.jwtSecret
    );
  }
}