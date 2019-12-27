import React from "react";
import classes from './DocLine.css'

const DocLine = props => {
    const {idr} = props.oneRec;
    const {documentnumber, documentdate, payer, payeraccount, receiver, receiveraccount, amount} = props.oneRec;
    const oneRecord = {documentnumber, documentdate, payer, payeraccount, receiver, receiveraccount, amount};

    const cls = [classes.DocLine];
    if (props.selected) {
        cls.push(classes.DocLineSelected);
    }

    return (
        <tr className={cls.join(' ')} onClick={props.onClick} onDoubleClick={props.onDoubleClick} recordid={idr} >
            {
                Object.keys(oneRecord).map((fieldName, index) => {
                    return <td key={index}>{oneRecord[fieldName]}</td>
                })
            }
        </tr>
    )
};

export default DocLine;