import { connect } from "react-redux";
import { loginSuccess } from "../actions";

const mapDispatchToProps = dispatch => ({
    loginSuccess: data => {
        dispatch(loginSuccess(data));
    }
});

const mapStateToProps = state => ({
    token: state.user.token,
    userDetails: state.user.userDetails
});

export default connect(mapStateToProps, mapDispatchToProps);
