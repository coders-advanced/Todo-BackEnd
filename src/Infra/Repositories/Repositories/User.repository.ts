import { PrismaClient } from "@prisma/client";
import { UserRepositoryContract } from "../Contracts/UserRepository.contract";
import { UserEntity } from "../../../Application/Entities/UserEntity";

export class UserPrismaRepository implements UserRepositoryContract {
  private prismaClient: PrismaClient;

  constructor() {
    this.prismaClient = new PrismaClient();
  }

  async create(userEntity: UserEntity): Promise<UserEntity> {
    return this.prismaClient.user.create({
      data: userEntity,
    });
  }

  async findAll(): Promise<UserEntity[]> {
    return this.prismaClient.user.findMany();
  }

  async findById(id: string): Promise<UserEntity | null> {
    return this.prismaClient.user.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: string, userEntity: UserEntity): Promise<UserEntity> {
    return this.prismaClient.user.update({
      where: {
        id,
      },
      data: userEntity,
    });
  }

  async delete(id: string): Promise<UserEntity> {
    return this.prismaClient.user.delete({
      where: {
        id,
      },
    });
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    return this.prismaClient.user.findUnique({
      where: {
        email,
      },
    });
  }




}
