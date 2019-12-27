import React, {Component} from "react";
import classes from './DocView.css'
import {connect} from "react-redux";
import {getDoc} from "../../store/actions/docview";
import Loader from "../../components/Loader/Loader";
import Button from "../../components/Button/Button";

class DocView extends Component {
    componentDidMount() {
        this.props.getDoc(this.props.match.params.docid);
    }

    onCloseDocumentHandler = () => {
        this.props.history.goBack();
    };

    renderDoc = () => {
        const fields = this.props.rec.fields;
        return (
            <div className={classes.DocForm}>
                <h1>Документ {this.props.rec.schemeName} №{fields.documentnumber} за {fields.documentdate}</h1>
                <span>На сумму: <strong>{fields.amount}</strong> (в валюте {fields.currcode})</span>
                <hr/>
                <span>Плательщик: <strong>{fields.payer}</strong></span>
                <span>Счет плательщика: <strong>{fields.payeraccount}</strong></span>
                <span>в банке <strong>{fields.payerbankname}</strong>, БИК <strong>{fields.payerbic}</strong></span>
                <hr/>
                <span>Получатель: <strong>{fields.receiver}</strong></span>
                <span>Счет получателя: <strong>{fields.receiveraccount}</strong></span>
                <span>в банке <strong>{fields.receiverbankname}</strong>, БИК <strong>{fields.receiverbic}</strong></span>
                <hr/>
                <span>Назначение платежа: <strong>{fields.ground}</strong></span>
                <Button type="success" onClick={this.onCloseDocumentHandler}>Закрыть</Button>
            </div>
        );
    };

    render() {
        return (
            <div className={classes.DocView}>
                {
                    this.props.loading
                    ? <Loader/>
                    : this.renderDoc()
                }
            </div>
        )
    }
}


function mapStateToProps(state) {
    return {
        loading: state.docview.loading,
        rec: state.docview.rec
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getDoc : (recordId) => dispatch(getDoc(recordId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DocView)