import React from 'react';
import TableHeader from './tableHeader'
import TableBody from './tableBody'

const Table = ( { columns, sortColumn, onSort, data} ) => {

    return (  
        <React.Fragment>
            <TableHeader 
            columns={columns} 
            sortColumn={sortColumn}
            onSort={onSort}></TableHeader>
            <TableBody data={data} columns={columns}></TableBody>
        </React.Fragment>
    );
}
 
export default Table;