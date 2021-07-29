import { useState } from 'react';
import { TOKEN } from '../lib/constant';
export default function useAuth() {
    var _a = useState(Boolean(localStorage.getItem(TOKEN))), isLoggedIn = _a[0], setIsLoggedIn = _a[1];
    var toggleLogInOut = function (token) {
        if (isLoggedIn) {
            localStorage.removeItem(TOKEN);
            setIsLoggedIn(false);
        }
        else {
            if (!token)
                return;
            localStorage.setItem(TOKEN, token);
            setIsLoggedIn(true);
        }
    };
    return [isLoggedIn, toggleLogInOut];
}
