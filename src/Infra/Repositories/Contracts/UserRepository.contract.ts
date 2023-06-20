import { UserEntity } from "../../../Application/Entities/UserEntity";

export interface UserRepositoryContract {
  create(userEntity: UserEntity): Promise<UserEntity>;
}
