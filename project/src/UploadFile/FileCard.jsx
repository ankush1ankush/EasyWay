import React from 'react'

function FileCard({data}) {
  return (
    <div className='fileCard'>
        <h3 className='fileCard__heading'>{data?.file_name}</h3>
        <button className='fileCard__button'> <a download href={data?.download_link}>Download</a></button>
    </div>
  )
}

export default FileCard