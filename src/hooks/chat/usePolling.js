import { useEffect } from "react"
import { getTopics, getComents  } from "../../services/api/chatApi"

export const usePolling = ({topics, setTopics, topicID, coments, setComents, loadingComents, findTopic}) => {
    useEffect(() => {
        // sempre sera chamada pra atualizar a pagina
        const updateData = async () => {
        // atualizar topicos
            const topicData = await getTopics()
            if (topicData.topics.length != Object.keys(topics).length) {
                if (!findTopic) {
                    setTopics(topicData.topics)
                }
                else
                    findTopic(false, topicData.topics)
            }

        if (loadingComents == "ok") {
            const dataComent = await getComents(topicID)
                if (dataComent.coments.length != Object.keys(coments)) {
                let result = {};
                result = dataComent.coments;
                setComents(result)
                }
        }
        }
        const idInterval = setInterval(updateData, 3000); // atualizar a cada 3 segundos
        return () => { clearInterval(idInterval) };
    }, [loadingComents, topics, setTopics, coments, setComents, findTopic, topicID])
}