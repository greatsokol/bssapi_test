import React, {Component} from "react";
import classes from './Auth.css'
import {connect} from "react-redux";
import {login, authGetP} from "../../store/actions/auth";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import Loader from "../../components/Loader/Loader";
import {withRouter} from "react-router-dom";


class Auth extends Component{
    state = {
        isFormValid : false,
        formControls : {
            login: {
                value: '',
                type: 'login',
                label: 'Логин',
                errorMessage: 'Введите корректный логин',
                valid: false,
                touched: false,
                maxLength: 10,
                validation: {
                    required: true,
                    minLength: 8,
                }
            },
            password: {
                value: '',
                type: 'password',
                label: 'Пароль',
                errorMessage: 'Введите корректный пароль',
                valid: false,
                touched: false,
                maxLength: 10,
                validation: {
                    required: true,
                    minLength: 8,
                }
            }
        }
    };

    submitHandler = event => {
    };

    loginHandler = () => {
        this.props.login(this.props.pid, this.state.formControls.login.value, this.state.formControls.password.value);
    };

    validateControl(value, validation) {
        if (!validation) {
            return true;
        }
        let isValid = true;
        if (validation.required){
            isValid = value.trim() !== '' && isValid;
        }
        if (validation.minLength){
            isValid = value.length >= validation.minLength && isValid;
        }
        return isValid;
    }

    onChangeHandler = (event, controlName) => {
        const formControls = { ...this.state.formControls };
        const control = { ...formControls[controlName] };
        control.value = event.target.value;
        control.touched = true;
        control.valid = this.validateControl(control.value, control.validation);
        formControls[controlName] = control;

        let isFormValid = true;
        Object.keys(formControls).forEach(name => {
            isFormValid = formControls[name].valid && isFormValid;
        });

        this.setState({
            formControls,
            isFormValid
        });


    };

    componentDidMount(){
        this.props.authGetP();
    }

    renderInputs(){
        return Object.keys(this.state.formControls).map((controlName, index) => {
            const control = this.state.formControls[controlName];
            return (
                <Input
                    key={controlName + index}
                    type={control.type}
                    value={control.value}
                    valid={control.valid}
                    touched={control.touched}
                    label={control.label}
                    shouldValidate={!!control.validation}
                    errorMessage={control.errorMessage}
                    maxLength={control.maxLength}
                    disabled={this.props.loading || this.props.sid}
                    onChange={event => this.onChangeHandler(event, controlName)}
                />);
        });
    }

    render() {

        return (
            <div className={classes.Auth}>
                    <form onSubmit={this.submitHandler} className={classes.AuthForm}>
                        {this.renderInputs()}
                        {this.props.loading
                            ? <Loader/>
                            : this.props.fault
                                ? <h1>Ошибка</h1>
                                : !this.props.sid
                                    ? <Button
                                        type="success"
                                        onClick={this.loginHandler}
                                        disabled={!this.state.isFormValid}>Войти
                                    </Button>
                                    : null
                        }
                    </form>
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        loading : state.auth.loading,
        pid : state.auth.pid,
        sid : state.auth.sid,
        fault : state.auth.fault
    }
}

function mapDispatchToProps(dispatch) {
    return{
        authGetP: () => dispatch(authGetP()),
        login: (loginname, password, pid) => dispatch(login(loginname, password, pid))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Auth))

