import { CustomerErrorResponse } from "../../../../../utils/custom-error-response";

export class CreateUserService {
  execute(user: any) {
    throw new Error("Erro de teste");
  }
}
