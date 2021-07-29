interface User {
    id: string;
    name: string;
    roomId: string;
}
export declare const addUser: ({ id, name, roomId }: {
    id: any;
    name: any;
    roomId: any;
}) => {
    error: string;
    user?: undefined;
} | {
    user: {
        id: any;
        name: any;
        roomId: any;
    };
    error?: undefined;
};
export declare const removeUser: (id: string) => User;
export declare const getUser: (id: string) => User;
export declare const getUsersInRoom: (room: string) => User[];
export {};
