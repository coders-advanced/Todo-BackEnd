import { v4 as uuid_v4 } from "uuid";
import { hashSync } from "bcrypt";

interface UserEntityProps {
  name: string;
  email: string;
  password: string;
}

export class UserEntity {
  id: string;
  name: string;
  email: string;
  password: string;

  constructor({ name, email, password }: UserEntityProps) {
    this.id = uuid_v4();
    this.name = name;
    this.email = email;
    this.password = hashSync(password, 12);
  }
}
