import React, { useState, useEffect } from 'react'
import {
  // Card,
  Text,
  Button,
} from '@mantine/core'
import '../App.css'
import { Link } from 'react-router-dom'
import * as postApi from '../api'
// import { useLocation } from 'react-router-dom'
// import { useNavigate } from 'react-router-dom'

function Path() {
  const [paths, setPaths] = useState([])
  useEffect(() => {
    postApi.getAllCategories().then((paths) => {
      setPaths(paths)
    })
  }, [])

  if (!paths) {
    return null
  }

  return (
    <div className="flipInX animated paths-container">
      {paths.map((path, index) => (
        // console.log(path)
        <Link
          to={`/feed`}
          style={{ textDecoration: 'none' }}
          state={{ category_id: path._id }}
          key={path._id}>
          <Button
            className="path-box"
            shadow="sm"
            style={{
              background:
                'url(' +
                require('../images/' + index + '.jpg') +
                ') center center no-repeat',
            }}>
            <div className="mask"></div>
            <div className="path-content" display="flex" flex-wrap="wrap">
              <Text
      
                className="path-title">
                {path.name}
              </Text>
            </div>
          </Button>
        </Link>
      ))}

      {/* <Button onClick={() => navigate("/create", {state:{cat_id:"123"}})}>Create post</Button> */}
    </div>
  )
}

export default Path
