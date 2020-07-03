import React, { useState, useEffect, ChangeEvent } from 'react';

type PropsType = {
        status: string|null
        getUpdateStatus: (status:string|null) => void
}

const StatusProfile: React.FC<PropsType> = (props) => {
        let [editMode, setEditMode] = useState<boolean>(false);
        let [status, setStatus] = useState<any>(props.status);
        let activateEditMode = () => {
                setEditMode(true)
        }
        let deActivateEditMode = () => {
                setEditMode(false);
                props.getUpdateStatus(status)
        }

        let onStatusChange = (e:ChangeEvent<HTMLInputElement>) => {
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
export default StatusProfile;