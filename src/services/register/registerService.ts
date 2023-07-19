import { BaseService } from '../base/baseService';
import { AuthService } from '../auth/authService';
import { RegisterEntity } from 'src/entity';
import { User, UserCorrect } from 'src/interface';
import { LoginService } from '../login/loginService';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RegisterService extends BaseService {
  constructor(
    private login: LoginService,
    private auth: AuthService,
    private repository: RegisterEntity,
  ) {
    super();
  }

  private getCheckPassword(password: string, confirmPassword: string) {
    return super.checkPassword(password, confirmPassword);
  }
  private getEmailValidate(email: string) {
    return super.emailValidate(email);
  }
  async postService(user: User) {
    try {
      const passwordMatch = this.getCheckPassword(
        user.password,
        user.confirmpassword,
      );
      const emailValidade = this.getEmailValidate(user.email);

      if (!passwordMatch) {
        throw new Error('password not is valid');
      }
      if (!emailValidade) {
        throw new Error('e-mail not valid');
      }

      const passwordEncrypted = super.encrypt(user.password);

      const newUser = {
        name: user.name,
        password: passwordEncrypted,
        email: user.email,
        token: super.tokenGenerator(),
      };
      await this.repository.registerUser(newUser);
      return await this.auth.postToken(newUser);
    } catch (e: any) {
      throw new Error(e);
    }
  }
  async changePassword(user: UserCorrect) {
    const userDB = await this.login.getUser(user.email);
    const newUser = {
      name: userDB.name,
      email: user.email,
      password: super.encrypt(user.password),
    };
    await this.repository.changePassword(userDB, newUser);
    return { res: 'Senha trocado com sucesso', status: 200 };
  }

  async changeEmail(user: UserCorrect) {
    const userDB = await this.login.getUser(user.email);
    await this.repository.changeEmail(userDB, user.newEmail);
    return { res: 'E-mail trocado com sucesso', status: 200 };
  }

  async deleteAccount(user: UserCorrect) {
    const userDB = await this.login.getUser(user.email);
    await this.repository.deleteAccount(userDB);
    return { res: 'Usuario deletado', status: 200 };
  }
}