import React, {Component} from "react";
import classes from './DocList.css';
import {connect} from "react-redux";
import {getList} from "../../store/actions/doclist";
import Loader from "../../components/Loader/Loader";
import DocLine from "../../components/DocLine/DocLine";

class DocList extends Component {

    state = {
        selectedRecordId : null
    };

    componentDidMount() {
        this.props.getList();
    }

    onClickHandler = (event) => {
        event.preventDefault();
        this.setState({
            selectedRecordId : event.target.parentNode.getAttribute('recordid')
        });
    };

    onDoubleClickHandler = (event) => {
        event.preventDefault();
        this.props.history.push(`/doc/${this.state.selectedRecordId}`);
    };

    renderOneRecord = (oneRec) => {
        const recordId = oneRec.idr;
        const selected = this.state.selectedRecordId === recordId;
        return (
            <DocLine key={recordId}
                     selected={selected}
                     onClick={this.onClickHandler}
                     onDoubleClick={this.onDoubleClickHandler} oneRec={oneRec}/>
        )
    };

    renderRecords = () => {
        return (
            <div className={classes.DocListForm}>
                <h1>Список документов</h1>
                <hr/>
                <table>
                    <tbody>
                        {
                            this.props.recs.rec.map((oneRec) => {
                                return this.renderOneRecord(oneRec)
                            })
                        }
                    </tbody>
                </table>
            </div>
        )
    };

    render() {
        return (
            <div className={classes.DocList}>

                {
                    this.props.loading
                        ? <Loader/>
                        : this.renderRecords()
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