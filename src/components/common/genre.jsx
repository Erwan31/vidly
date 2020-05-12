import React, {Component} from "react";
import _ from 'lodash';
import PropTypes from 'prop-types'


class ListGroupe extends Component {

    render () {

        const onSelectItem = this.props.onSelectItem;
        const genres = this.props.genres;
        const selectedItem = this.props.selectedItem;
        const { items, textProperty, valueProperty } = this.props;
        

        return(
            <ul className="list-group">
                    <li key={"All Genres"} 
                    className={selectedItem === "All Genres" ?  "list-group-item active" : "list-group-item"}
                     onClick={() => this.props.onSelectItem("All Genres")}>
                         All Genres
                    </li>
                    {items.map( item => 
                         <li key={item[valueProperty]} className={selectedItem === item ?  "list-group-item active" : "list-group-item"}
                         onClick={ () => this.props.onSelectItem(item)}>
                             {item[textProperty]} 
                         </li>)
                    }
                </ul>
        );



    }
}

ListGroupe.defaultProps = {
    textProperty: 'name',
    valueProperty: '_id',
};

export default ListGroupe;