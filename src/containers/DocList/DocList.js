import React, {Component} from "react";
import classes from './DocList.css';
import {connect} from "react-redux";
import {getList} from "../../store/actions/doclist";
import Loader from "../../components/Loader/Loader";

class DocList extends Component {

    componentDidMount() {
        this.props.getList();
    }

    render() {
        return (
            <div className={classes.DocList}>
                <h1>Список документов</h1>
                {
                    this.props.loading
                        ? <Loader/>
                        : <h1>this.props.recs</h1>
                }
            </div>
        )
    }
}


function mapStateToProps(state) {
    return {
        loading: state.doclist.loading,
        recs: state.doclist.recs
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getList : () => dispatch(getList())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DocList)