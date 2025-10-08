import { useEffect } from "react";

export const useComentsScrollToLI = (refComents, loadingComents, comentInput) => {
    
    useEffect(() => {
        // Verifica se a referência e o elemento existem
        if (refComents.current) {
          // Rola para o final do contêiner
          refComents.current.scrollTop = refComents.current.scrollHeight;
        }
    }, [loadingComents])
    
    useEffect(() => {
        if (refComents.current) {
          // Rola para o último filho do contêiner da lista
          const ultimoItem = refComents.current.lastElementChild;
          if (ultimoItem) {
            ultimoItem.scrollIntoView({
              behavior: 'smooth',
              block: 'end'
            });
          }
        }
      }, [comentInput]);
    
}