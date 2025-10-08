import api from '.'


export const checkAvailability = () => {
  return api.checkAvaliable();
};

export const getTopics = () => {
  return api.getTopics();
};

export const addTopic = (topic, username) => {
  return api.addTopic(topic, username);
};

export const deleteTopic = (topic, username) => {
  return api.deleteTopic(topic, username);
};

export const getComents = (topicID) => {
  return api.getComent(topicID);
};

export const addComent = (topicID, coment, username) => {
  return api.addComent(topicID, coment, username);
};

export const deleteComent = (topicID, coment, username) => {
  return api.deleteComent(topicID, coment, username);
};