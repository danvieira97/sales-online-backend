import { ReturnUserDTO } from 'src/user/dtos/return-user.dto';

export interface ReturnLoginDTO {
  user: ReturnUserDTO;
  accessToken: string;
}
