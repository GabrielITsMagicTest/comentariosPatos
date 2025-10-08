import { useEffect } from "react";

export const useTopicsScrollToLI = (refTopic, topics) => {
    useEffect( () => {
        const ultimoItem = refTopic.current.lastElementChild;
        if (ultimoItem) {
            ultimoItem.scrollIntoView({
            behavior: 'smooth',
            block: 'end'
            });
        }
    }, [topics])
}