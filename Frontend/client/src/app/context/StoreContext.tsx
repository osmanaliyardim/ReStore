import { createContext, PropsWithChildren, useContext, useState } from "react";
import { Basket } from "../models/basket";

interface StoreContextValue {
    basket: Basket | null;
    setBasket: (basket: Basket) => void;
    removeItem: (productId: number, quantity: number) => void;
}

export const StoreContex = createContext<StoreContextValue | undefined>(undefined);

// eslint-disable-next-line react-refresh/only-export-components
export const useStoreContext = () => {
    const context = useContext(StoreContex);

    if (context === undefined)
        throw Error("Oops - we do not seems to be inside the provider");

    return context;
}

export const StoreProvider = ({children}: PropsWithChildren<unknown>) => {
    const [basket, setBasket] = useState<Basket | null>(null);

    const removeItem = (productId: number, quantity: number) => {
        if (!basket) return;

        const items = [...basket.items];

        const itemIndex = items.findIndex(i => i.productId === productId);
        if (itemIndex >= 0) { 
            items[itemIndex].quantity -= quantity;
            
            if (items[itemIndex].quantity === 0) items.splice(itemIndex, 1);
            
            setBasket(prevState => {
                return {...prevState!, items}
            })
        }
    }

    return (
        <StoreContex.Provider value={{basket, setBasket, removeItem}}>
            {children}
        </StoreContex.Provider>
    )
}