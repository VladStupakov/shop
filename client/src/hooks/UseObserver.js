import { useEffect, useRef } from "react"

export const useObserver = (canLoad, lastElement, isLoading, callback) => {
    const observer = useRef()
    useEffect(() => {
        if (isLoading)
            return
        if (observer.current)
            observer.current.disconnect()
        const cb = (entries, observer) => {
            if (entries[0].isIntersecting && canLoad) {
                callback()
            }
        }
        observer.current = new IntersectionObserver(cb)
        observer.current.observe(lastElement.current)

    }, [isLoading])
}