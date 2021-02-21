// import React, { useState, useContext } from 'react'
// import RobotDB from '../utility/Axios'

// const RoboJunkYardContext = React.createContext()
// const RoboJunkYardUpdateContext = React.createContext()

// export function useRoboJunkYard() {
//   return useContext(RoboJunkYardContext)
// }
// export function useRoboJunkYardUpdate() {
//   return useContext(RoboJunkYardUpdateContext)
// }

// export function RoboJunkYardProvider({ children }){
//   const JSON_MOCK = [
//     {
//       _id: '6031c75921372639f61d7995',
//       name: 'First Robot',
//       color: 'NEAT',
//       attack: 2002,
//       defense: 9,
//       date: '2021-02-21T02:37:13.776Z',
//       __v: 0
//     },
//     {
//       _id: '6031d80b0fb6d340b627f08d',
//       name: 'Robot 1',
//       color: 'PURPLE',
//       attack: 100,
//       defense: 50,
//       date: '2021-02-21T03:48:27.897Z',
//       __v: 0
//     }
//   ]

//   const [allRobots, setAllRobots] = useState(JSON_MOCK)

//   // async function updateAllRobots() {
//   //   const res = await RobotDB.get('/robots')
//   //   console.log(res.data)
//   //   setAllRobots(res.data)
//   // }

//   const updateAllRobots = async (event) => {
//     try {
//       const res = await RobotDB.get('/robots')
     
//       if(res.status ===200){
//         console.log("Success!")
//         console.log(res.data)
//       }
//     } catch (error) {
//       console.error("error")
//       console.error(error.message)
//     }
//   }

//   return (
//     <RoboJunkYardContext.Provider value={allRobots}>
//       <RoboJunkYardUpdateContext value={updateAllRobots}>
//         {children}
//       </RoboJunkYardUpdateContext>
//     </RoboJunkYardContext.Provider>
//   )
// }
