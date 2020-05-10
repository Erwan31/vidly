import React, {Component} from "react";


class Like extends Component {

    render(props) {

        let liked = this.props.liked;
        let classes = "fa fa-heart";

        if(!liked) classes += "-o";

        return (
            <i onClick={this.props.onLikeToggle} className={classes} aria-hidden="true"></i>
        )
    }
}


export default Like;