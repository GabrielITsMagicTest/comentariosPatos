// const url = "https://comentariospatoapi.onrender.com"
const url = "http://localhost:6060"

async function request(endpoint, options = {}) {
  const res = await fetch(`${url}${endpoint}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  if (!res.ok) {
    throw new Error(`Erro na API: ${res.status}`);
  }

  return res.json();
}

const api = {
  checkAvaliable: () => request('/'),

  getTopics: () => request('/topics'),
  addTopic: (topic, user) => request('/topics', {
    method: "POST",
    body: JSON.stringify({ topic, user })
  }),
  deleteTopic: (topic, user) => request('/topics', {
    method: "DELETE",
    body: JSON.stringify({ topic, user })
  }),

  getComent: (topic) => request(`/topics/coments?topic=${topic}`),
  addComent: (topic, coment, user) => request('/topics/coment', {
    method: "POST",
    body: JSON.stringify({ topic, coment, user })
  }),
  deleteComent: (topic, coment, user) => request('/topics/coment', {
    method: "DELETE",
    body: JSON.stringify({ topic, coment, user })
  }),

  getUser: (user, pass) => request(`/user?user=${user}&pass=${pass}`),
  addUser: (user, pass) => request(`/user`, {
    method: "POST",
    body: JSON.stringify({ user, pass })
  })
}

export default api