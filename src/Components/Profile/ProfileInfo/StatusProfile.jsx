import React from 'react';
import Preloader from '../../common/Preloader/preloader';


class StatusProfile extends React.Component {
    state = {
        editMode: false,
        status: this.props.status,
    }
    activateEditMode = () => {
        this.setState({ editMode: true })
    }
    deActivateEditMode() {
        this.setState({ editMode: false });
        this.props.getUpdateStatus(this.state.status)
    }
    onStatusChange = (e) => {
        this.setState({
            status:e.target.value
        })
    }
componentDidUpdate(prevProps, prevState){
if(this.props.status !== prevProps.status){
    this.setState({status: this.props.status})
}
}

    render() {
        return <>
            {!this.state.editMode &&
                    <span onDoubleClick={this.activateEditMode}>
                         {this.props.status || 'no status'}
                    </span>
            }{this.state.editMode &&
                    <input onChange={this.onStatusChange} autoFocus={true}  type="text" value={this.state.status} onBlur={this.deActivateEditMode.bind(this)}/>
            } </>
    }
}
export default StatusProfile