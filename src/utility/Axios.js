import axios from 'axios'

const RobotBox = axios.create({
  baseURL: 'http://localhost:3001'
})

export default RobotBox
