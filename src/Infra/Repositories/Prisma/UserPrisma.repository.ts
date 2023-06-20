import { PrismaClient } from "@prisma/client";
import { UserRepositoryContract } from "../Contracts/UserRepository.contract";
import { UserEntity } from "../../../Application/Entities/UserEntity";

export class UserPrismaRepository implements UserRepositoryContract {
  private prismaClient: PrismaClient;

  constructor() {
    this.prismaClient = new PrismaClient();
  }

  async create(userEntity: UserEntity): Promise<UserEntity> {
    return await this.prismaClient.user.create({
      data: userEntity,
    });
  }
}
