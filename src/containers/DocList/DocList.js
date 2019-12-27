import React, {Component} from "react";
import classes from './DocList.css';
import {connect} from "react-redux";
import {getList, selectIdr} from "../../store/actions/doclist";
import Loader from "../../components/Loader/Loader";
import DocLine from "../../components/DocLine/DocLine";

class DocList extends Component {
    fieldNames = {
        documentnumber : null,
        documentdate : null,
        payer : null,
        payeraccount : null,
        receiver : null,
        receiveraccount : null,
        amount : null};

    componentDidMount() {
        this.props.getList();
    }

    onClickHandler = (event) => {
        event.preventDefault();
        const selectedIdr = event.target.parentNode.getAttribute('recordid');
        this.props.selectIdr(selectedIdr);
    };

    onDoubleClickHandler = (event) => {
        event.preventDefault();
        this.props.history.push(`/doc/${this.props.selectedIdr}`);
    };

    renderOneRecord = (oneRec) => {
        const recordId = oneRec.idr;
        const selected = this.props.selectedIdr === recordId;
        return (
            <DocLine key={recordId}
                     selected={selected}
                     onClick={this.onClickHandler}
                     onDoubleClick={this.onDoubleClickHandler}
                     oneRec={oneRec}
                     fieldNames={this.fieldNames}
            />
        )
    };

    renderHead = () => {
        return (
            <thead>
                <tr>
                    {Object.keys(this.fieldNames).map((fieldName, index) => {
                        return <td key={index}>{fieldName}</td>
                    })}
                </tr>
            </thead>
        )
    };

    renderRecords = () => {
        return (
            <div className={classes.DocListForm}>
                <h1>Список документов</h1>
                <hr/>
                <table>
                    {this.renderHead()}
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
        recs: state.doclist.recs,
        selectedIdr: state.doclist.selectedIdr
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getList : () => dispatch(getList()),
        selectIdr: (selectedidr) => dispatch(selectIdr(selectedidr))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DocList)