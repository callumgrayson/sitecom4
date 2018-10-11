const apiEndpoint = 'https://4veilmjznk.execute-api.ap-southeast-1.amazonaws.com/dev/compare-yourself';

const ApiCY = {
  getSingle() {

  },

  getAll() {

  },

  postSingle({ userId, mobile, height, shoe, timestamp }) {
    return axios.post(`${apiEndpoint}`,
    { userId, mobile, height, shoe, timestamp },
    { headers: { 'Content-Type': 'application/json' },
    })
  },
}

export default ApiCY;