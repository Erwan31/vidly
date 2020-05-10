import React, {Component} from "react";
import _ from 'lodash';

class Pagination extends Component {

    render() {

        const { itemsCount, pageSize, currentPage, onPageChange} = this.props;
        const pagesCount = Math.ceil(itemsCount/pageSize);

        //console.log(currentPage);

        if(pagesCount===1) return null;
        const pages = _.range(1, pagesCount + 1 );

        let classPages = "page-item";

        return (
            <ul className="pagination">
            { pages.map(page => 
                <li 
                key={page} 
                onClick={() => this.props.onPageChange(page)} 
                className={page === currentPage ? "page-item active" : "page-item"}>
                <a className="page-link">{page}</a>
                </li>
            )}
            </ul>
            )
    }
}

export default Pagination;