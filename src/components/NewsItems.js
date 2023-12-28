import React from 'react'


const NewsItems =(props)=> {
  
 
    let {title,description,imageUrl,url,author,date,source} = props;
    return (
      <>
      <div>
        
        <div className="card " >
         <span class=" badge rounded-pill bg-danger" style={{display:'flex' ,justifyContent:'flex-end', position:'absolute',right:'0'}}>
             {source}
           <span class="visually-hidden">unread messages</span>
         </span>
          
         <img src={imageUrl?imageUrl:'https://cdnp0.stackassets.com/97d54e51325b6091948dd65fce164d72d3ffcea9/store/8d13abf3aca2c6ce60f4c9a75015e9d81ef8318f91e0ee4401dbf6c0d083/sale_16809_primary_image.jpg'} className="card-img-top" alt="..." style={{height:'200px'}}/>
         <div className="card-body">
         <h5 className="card-title">{title}... 
         </h5>
         <p className="card-text"><small className="text-body-secondary">{author?author:"By Unkown"} <br /> on {new Date(date).toGMTString()}</small></p>
         <p className="card-text">{description}...</p>
         <a  rel="noreferrer" href={url} target="_blank"className="btn btn-sm btn-dark">Read More..</a>
         </div>
         
        </div>


      </div>

       
        </>
    )
  }


export default NewsItems
