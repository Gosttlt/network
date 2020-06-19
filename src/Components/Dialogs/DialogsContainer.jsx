import Dialogs from './Dialogs';
import { addMessage } from '../../Redux/dialigs-reducer';
import { connect } from 'react-redux';
import { withAuthRedirect } from '../hoc/WithAuthRedirect';
import { compose } from 'redux';


let mapStateToProps = (state) => {
    return {
        dialogsData: state.messagePage.dialogsData,
        messagesData: state.messagePage.messagesData,
    }
}

export default compose(
    connect(mapStateToProps, {addMessage }),
    withAuthRedirect
)(Dialogs)


