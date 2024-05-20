import React from 'react'
import { Helmet } from 'react-helmet'


const MetaData = ({ title }) => {
  return (
    <Helmet>
        <tiltle>
            {`${title} - ShopG2`}
        </tiltle>
    </Helmet>
  )
}

export default MetaData