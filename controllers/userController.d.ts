import { Request, Response } from 'express';
declare class UserController {
    static join(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static login(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
export default UserController;
