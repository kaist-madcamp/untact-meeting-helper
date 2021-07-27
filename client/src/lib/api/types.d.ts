export interface CoreOutput {
  ok: boolean;
  error?: string;
}

interface CreateUserInput {
  email: string;
  username: string;
  password: string;
}

interface LoginUserInput {
  email: string;
  password: string;
}
interface LoginUserOutput extends CoreOutput {
  token?: string;
}

interface MeetingLog {
  title: string;
  image: string;
}

interface FetchAllMeetingLogOutput extends CoreOutput {
  meetingLogs: MeetingLog[]
}