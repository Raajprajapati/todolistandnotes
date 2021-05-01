import React from "react"

function List(props){
    return(
        <>
            <div className="item"  >
                <div><i className="fas fa-minus-circle" onClick={()=>{
                    props.onSelect(props.id)
                }}></i>
                &nbsp; {props.item}</div>
            </div>
        </>
    )
}
export default List;