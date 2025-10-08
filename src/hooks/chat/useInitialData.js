import { useEffect, useRef, useState } from "react";
import { checkAvailability, getTopics } from "../../services/api/chatApi";

export const useInitialData = () => {
    const [statusApi, setStatusApi] = useState("loading")
    const [topics, setTopics] = useState({})

    useEffect(() => {
        // ver se esta diponivel o site
        const fetchDataStatus = async () => {
            try {
                await checkAvailability()
                setStatusApi("loading_topics")
                const data = await getTopics()
                setTopics(data.topics)
                setStatusApi("ok")
            } catch(error) {
                setStatusApi(prev => prev == "loading_topics" ? "error_db_topics" : "error")
                console.log(error)
            }
        }
        fetchDataStatus()
    }, [])

    return {statusApi, setTopics, topics}
}