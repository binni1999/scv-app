import { useEffect } from "react"

export const useTitle = (title = 'SCV') => {
    useEffect(() => {
        document.title = `${title} - SCV`
    }, [title])
    return null;
}