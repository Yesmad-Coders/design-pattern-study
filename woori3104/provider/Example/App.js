// ReactからcreateContextとuseStateをimport
import React, {createContext, useState} from 'react'
import './App.css';
import Context from './components/ContextSample/ContextA'

//createContextを使ってUserContextとHobbyContextを作成
export const UserContext = createContext()
export const HobbyContext = createContext()

function App() {
//useStateを使ってuserを作成
  const [user, setUser] = useState({
    name: 'セイラ',
    age: '17'
  })
//useStateを使ってhobbyを作成
  const [hobby, setHobby] = useState('キャンプ')
  return (
    <div className='App'>
//userContext。Providerを作成、valueにはuserをセット
      <UserContext.Provider value={user}>
//HobbyContext.Providerを作成、valueにはhobbyをセット
        <HobbyContext.Provider value={hobby}>
          <Context/>
        </HobbyContext.Provider>
      </UserContext.Provider>
    </div>
  )
}

export default App