import { getComents } from "../../services/api/chatApi"
import { useRef, useState } from "react";

export const UseComents = () => {
    const [coments, setComents] = useState({});   
    const [topicID, setTopicID] = useState();
    const [loadingComents, setLoadingComents] = useState("none");
    const refComents = useRef(null)

    const fetchComents = async (id) => {
        id = id.topic
        if (topicID == id) return // nao executar se ja tiver selecionado

        setTopicID(id)
        setLoadingComents("loading")
        setComents({})

        // adicionar na api
        try {
            const data = await getComents(id)
            setLoadingComents("ok")
            setComents(data.coments)
            console.log(refComents)

        }catch(error) {
            console.log(error)
        }
    }

    return { coments, topicID, loadingComents, fetchComents, setComents, refComents };
}