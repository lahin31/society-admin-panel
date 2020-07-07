import React from 'react';
import { Dialog } from "element-react";

const DialogComponent = props => {
	return (
		<Dialog
			title={props.title}
			size="small"
			visible={ props.dialogVisible }
			onCancel={ () => props.setDialogVisible(false) }
			lockScroll={ false }
		>
			{props.children}
    </Dialog>
	)
}

export default DialogComponent;