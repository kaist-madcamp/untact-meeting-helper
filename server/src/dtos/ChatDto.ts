import { IsString } from 'class-validator';

export class JoinChatInput {
  @IsString()
  id: string;

  @IsString()
  name: string;

  @IsString()
  roomId: string;
}

export class JoinMeetingInput {
  @IsString()
  username: string;

  @IsString()
  roomId: string;
}
