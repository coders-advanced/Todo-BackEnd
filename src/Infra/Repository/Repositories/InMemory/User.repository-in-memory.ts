import { UserEntity } from "../../../../Application/Entities/UserEntity";
import { UserRepositoryContract } from "../../Contracts/UserRepository.contract";

export class UserRepositoryInMemory implements UserRepositoryContract {
  private users: UserEntity[];

  constructor() {
    this.users = [];
  }

  async create(userEntity: UserEntity): Promise<UserEntity> {
    this.users.push(userEntity);

    return userEntity;
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    const user = this.users.find((_user) => _user.email === email);

    return user ?? null;
  }

  clearRepository() {
    this.users = [];
  }
}
