import React, { useEffect, useState } from 'react'

const Footer = ({ todos }) => {
  const [total, setTotal] = useState([])


  useEffect(() => {
    if (JSON.parse(localStorage.getItem("todo"))) {
      const data = JSON.parse(localStorage.getItem("todo"))
      setTotal(data)
    }
  }, [todos])

  if (total.length === 0) return
  return (
    <div className="footer">
      <div>Total:{total.length}</div>
      <div>Completed:{
        total.filter(item => item.isComplete === true).length
      }</div>
      <div>Incompleted:{
        total.filter(item => item.isComplete === false).length
      }</div>
    </div>
  )
}

export default Footer