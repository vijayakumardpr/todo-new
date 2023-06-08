import React, { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import Footer from './Footer';
import { AiFillDelete, AiFillEdit, AiOutlinePlus } from 'react-icons/ai';

const Header = () => {
    const [items, setItems] = useState("")
    const [todos, setTodos] = useState([])
    const [allTodo, setAllTodos] = useState([])
    const [selectId, setSelectId] = useState(null)
    const [searchTxt, setSearchTxt] = useState("")
    const [sorting, setSorting] = useState(false)


    useEffect(() => {
        if (JSON.parse(localStorage.getItem("todo"))) {
            const data = JSON.parse(localStorage.getItem("todo"))
            setTodos(data)
            setAllTodos(data)
        }

    }, [sorting])


    function getItem() {
        if (items !== "" && selectId === null) {
            const newTask = {
                id: uuidv4(),
                item: items,
                isComplete: false
            }
            setTodos(prevTodos => [...prevTodos, newTask])
            localStorage.setItem("todo", JSON.stringify([...todos, newTask]))
            setItems("")
        } else if (selectId !== null) {
            const data = todos.map(item => {
                return item.id === selectId ? { ...item, item: items } : item
            })
            setTodos(data)
            localStorage.setItem("todo", JSON.stringify(data))
            setItems("")
            setSelectId(null)
        }
    }

    function handleCheck(ids, isChecked) {
        const data = todos.map(item => {
            return item.id === ids ? { ...item, isComplete: isChecked } : item
        })
        setTodos(data)
        localStorage.setItem("todo", JSON.stringify(data))

    }

    function deleteItem(ids) {
        console.log("delete");
        const data = todos.filter(item => item.id !== ids)
        setTodos(data)
        localStorage.setItem("todo", JSON.stringify(data))

    }

    function filter(txt) {
        const data = allTodo.filter(x => x.item.toLowerCase().includes(txt.toLowerCase()))
        setTodos(data)
    }

    function compareName(a, b) {

        const name1 = a.item.toUpperCase();
        const name2 = b.item.toUpperCase();

        let comparison = 0;

        if (name1 > name2) {
            comparison = 1;
        } else if (name1 < name2) {
            comparison = -1;
        }
        return comparison;
    }

    function getSort() {
        let data = todos.sort(compareName)
        setTodos(data)
        localStorage.setItem("todo", JSON.stringify(data))
        setSorting(!sorting)
    }

    function clear() {
        setTodos([])
        localStorage.removeItem("todo");
    }

    console.log(todos);
    return (
        <div>
            <input className="input" placeholder='Add Items Here...' value={items} onChange={(e) => setItems(e.target.value)} />
            <button className="primaryBtn" onClick={getItem}>
                <AiOutlinePlus />
            </button>
            <div style={{ display: "flex", justifyContent: "space-between", padding: "5px 0" }}>
                <button className="search sortBtn" onClick={getSort}>Sort A-Z</button>
                <input className="search" placeholder='search' value={searchTxt} onChange={e => {
                    setSearchTxt(e.target.value)
                    filter(e.target.value)
                }
                } />
            </div>
            <div className="container">
                {
                    todos.map((item, i) => {
                        return (
                            <div key={i} className='item-container'>
                                <div className='horizontal'>
                                    <input style={{ cursor: "pointer" }} type='checkbox' checked={item.isComplete} onChange={(e) => {
                                        //setChecked(e.target.checked)
                                        handleCheck(item.id, e.target.checked)
                                    }
                                    } />
                                    <div style={{ textDecoration: item.isComplete ? "line-through" : "none" }}>{item.item}</div>
                                </div>
                                <div className='btn-horizontal' >
                                    <div
                                        style={{ display: item.isComplete ? "none" : "block", color: "green", fontSize: "20px", cursor: "pointer" }}
                                        onClick={() => {
                                            setSelectId(item.id)
                                            setItems(item.item)
                                        }}>
                                        <AiFillEdit />
                                    </div>
                                    <div
                                        style={{ display: item.isComplete ? "none" : "block", color: "red", fontSize: "20px", cursor: "pointer" }}
                                        onClick={() => {
                                            deleteItem(item.id)
                                        }}
                                    >
                                        <AiFillDelete />
                                    </div>
                                </div>
                            </div>)
                    })
                }

            </div>

            <button className='clearAll' onClick={clear}>Clear All</button>

            <Footer todos={todos} />
        </div>
    )
}

export default Header


