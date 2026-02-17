import React from 'react'
import News from './components/News'
import Blogs from './components/Blogs'

const App = () => {
  return (
    <div className='container'>
      <div className="news-blogs-app">
        {/* <News /> */}
        <Blogs />
      </div>
    </div>
  )
}

export default App