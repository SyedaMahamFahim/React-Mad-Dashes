import React from 'react'
import { Link } from 'react-router-dom'

const CardBox = ({classTitle,title,url,iconName}) => {
  return (
    <div className="col-xl-3 col-md-6 mb-4">
    <div className={`card border-left-${classTitle} shadow h-100 py-2`}>
        <div className="card-body px-4 py-3">
            <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                    
                    <div className="h5 mb-0 font-weight-bold text-gray-800">
                    {title}
                    </div>
                    <div className={`text-xs font-weight-bold text-${classTitle} text-uppercase mb-1 mt-2`}>
                        
                        <Link to={url}>View</Link>
                        </div>
                </div>
                <div className="col-auto">
                    <i className={`fas ${iconName} fa-2x text-gray-300`}></i>
                </div>
            </div>
        </div>
    </div>
</div>
  )
}

export default CardBox