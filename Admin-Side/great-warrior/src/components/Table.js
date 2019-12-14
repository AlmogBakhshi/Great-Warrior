import React, { useState, useEffect } from 'react';
import '../styles/TableStyle.css';
import { Paper } from '@material-ui/core';
import { RingLoader } from 'react-spinners'
import { FaPencilAlt, FaTrashAlt } from 'react-icons/fa';

const Table = (props) => {
    const arrayOfItemsEachPage = [10, 25, 50, 100];
    const [countOfPages, setCountOfPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemEachPage, setItemEachPage] = useState(arrayOfItemsEachPage[0]);

    useEffect(() => {
        if (props.data) {
            const pages = Math.ceil(props.data.length / itemEachPage);
            setCountOfPages(pages);
            pages < currentPage && setCurrentPage(pages < 1 ? 1 : pages);
        }
    }, [props.data, itemEachPage])

    const HandlePreventPage = () => {
        const setPage = currentPage > 1 ? currentPage - 1 : currentPage;
        setCurrentPage(setPage);
    }

    const HandleNextPage = () => {
        const setPage = currentPage < countOfPages ? currentPage + 1 : currentPage;
        setCurrentPage(setPage);
    }

    const ShowPages = () => { // show the pages and the current page with underline and bolder
        let prevPages = [];
        let nextPages = [];
        for (let index = currentPage - 1; index >= 1 && index >= (currentPage - 3); index--) {
            prevPages.push(<span key={(index * -1)} style={{ cursor: 'pointer', marginRight: '5px' }}
                onClick={() => setCurrentPage(index)}>{index}</span>);
        }
        for (let index = currentPage; index <= countOfPages && index <= (currentPage + 3); index++) {
            nextPages.push(<span key={index} style={{
                cursor: 'pointer', marginLeft: index !== currentPage && '5px',
                fontWeight: index === currentPage && 'bold', textDecoration: index === currentPage && 'underline'
            }}
                onClick={() => setCurrentPage(index)}>{index}</span>);
        }
        const pages = [...prevPages.reverse(), ...nextPages]
        return pages;
    }

    return (
        <Paper className='table' style={{ backgroundColor: 'rgba(0,0,0,0)' }}>
            <table>
                <thead>
                    <tr> {/* set all titles of table */}
                        {props.titles.map((title, index) => <th key={index}>{title}</th>)}
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody> {/* set each data of titles in table */}
                    {!props.data && <tr><td colSpan={props.titles.length}><RingLoader size={60} color={'rgb(0, 201, 255)'} /></td></tr>}
                    {props.data && props.data.slice((currentPage - 1) * itemEachPage, (props.data.length / itemEachPage > 1 &&
                        currentPage * itemEachPage / props.data.length < 1) ? currentPage * itemEachPage % props.data.length :
                        props.data.length)
                        .map((data, index) => <tr key={index}>
                            {props.titles.map((title, index) => <td key={index}>
                                {title !== 'Password' ? data[`${props.title}_${title}`] : '********'}
                            </td>)}
                            <td>
                                <div className='tableAction'>
                                    <FaPencilAlt size='1em' onClick={() => props.editItem(data)} />
                                    <FaTrashAlt size='1em' onClick={() => props.deleteItem(data)} />
                                </div>
                            </td>
                        </tr>)}
                </tbody>
            </table >
            {/* set table pages0 */}
            {(props.data && props.data.length > itemEachPage &&
                <div className='tablePages noSelect'>
                    <select style={{ outline: 'none' }} value={itemEachPage} onChange={e => setItemEachPage(e.target.value)}>
                        {arrayOfItemsEachPage.map(items => <option key={items} value={items}>{items}</option>)}
                    </select>
                    <div className='tablePagesPrevNext' onClick={HandlePreventPage}>{`<- previous`}</div>
                    <div style={{ display: 'flex' }}>{ShowPages()}</div>
                    <div className='tablePagesPrevNext' onClick={HandleNextPage}>{`next ->`}</div>
                </div>) ||
                (props.data && props.data.length > arrayOfItemsEachPage[0] && <select
                    className='tablePagesItemsEachPage noSelect' value={itemEachPage} onChange={e => setItemEachPage(e.target.value)}>
                    {arrayOfItemsEachPage.map(items => <option key={items} value={items}>{items}</option>)}
                </select>)}
        </Paper>
    );
}

export default Table;