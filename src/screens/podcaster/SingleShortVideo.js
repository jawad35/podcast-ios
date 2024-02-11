import React from 'react'
import SingleReel from '../../components/podcast/SingleReel'
import { MakeCompleteUrl } from '../../components/Helper/MakeCompleteUrl'

function SingleShortVideo({route}) {
    const item = {
        video:route.params.video
    }
  return (
    <SingleReel item={item} setCurrentIndex={()=>{}}/>
  )
}

export default SingleShortVideo