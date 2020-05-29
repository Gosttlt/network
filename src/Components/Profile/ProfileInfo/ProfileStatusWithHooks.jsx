import React, { useState, useEffect } from 'react';

const StatusProfileWithHooks = (props) => {

        let [editMode, setEditMode] = useState(false);
        let [status, setStatus] = useState(props.status);
        let activateEditMode = () => {
                setEditMode(true)
        }
        let deActivateEditMode = () => {
                setEditMode(false);
                props.getUpdateStatus(status)
        }

        let onStatusChange = (e) => {
                setStatus(e.currentTarget.value)
        }
        useEffect(() => {
                setStatus(props.status)
        }, [props.status])

        return (<>
                {!editMode &&
                        <span onDoubleClick={activateEditMode}>
                                { props.status||'no status'}
                    </span>
                }{editMode &&
                        <input onBlur={deActivateEditMode} onChange={onStatusChange} autoFocus={true} type="text" value={status}/>
                } </>)
}
export default StatusProfileWithHooks;