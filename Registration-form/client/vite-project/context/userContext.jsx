import axiosInstance from '../src/axiosInstance';
import { createContext, useEffect, useState } from 'react';

export const UserContext = createContext({})

export function UserContextProvider({children}) {
    const [user , setUser] = useState(null);
    useEffect(() => {
        if(!user) {
            axiosInstance.get('/profile').then(({data}) => {
                setUser(data)
            })
        }
    }, [])

    const contextValue = { user, setUser };
    return(
        <UserContext.Provider value={contextValue}>
          {children}
        </UserContext.Provider>
    )
}