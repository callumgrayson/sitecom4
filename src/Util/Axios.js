import axios from 'axios';

const apiEndpoint = 'https://4veilmjznk.execute-api.ap-southeast-1.amazonaws.com/dev/compare-yourself';

const ApiCY = {
  
  getSingle(id) {
    return axios.get(`${apiEndpoint}/single`, 
                    { params: { userId: id }},
                    )
                    .catch(err => console.log(err));
  },

  getAll() {
    return axios.get(`${apiEndpoint}/all`, 
                    { headers: { 'Content-Type': 'application/json' }},
                    )
                    .catch(err => console.log(err));
  },

  postSingle({ userId, mobile, height, shoe, timestamp }) {
    return axios.post(`${apiEndpoint}`,
                      { userId, mobile, height, shoe, timestamp },
                      { headers: { 'Content-Type': 'application/json' }},
                      )
                      .catch(err => console.log(err));
  },
}

export default ApiCY;