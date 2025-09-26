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
  checkAvaliable: () => request(''),
  getTopics: () => request('/topics'),
  addTopic: (nameTopic) => request('/topics', {
    method: "POST",
    body: JSON.stringify({ topic: nameTopic })
  }),
  getComent: (nameTopic) => request(`/topics/coments?topic=${nameTopic}`),
  addComent: (nameTopic, coment) => request('/topics/coment', {
    method: "POST",
    body: JSON.stringify({ topic: nameTopic, coment: coment })
  })
}

export default api