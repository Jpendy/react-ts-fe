import { Alert, Snackbar } from '@mui/material'
import { useState } from 'react'

export type Severity = 'success' | 'info' | 'warning' | 'error';

export interface SnackbarOrigin {
    vertical: 'top' | 'bottom';
    horizontal: 'left' | 'center' | 'right';
}

export default function useSnackBar() {

    const [isOpen, setIsOpen] = useState(false)
    const [messageContent, setMessageContent] = useState('')
    const [severity, setSeverity] = useState<Severity>('info')
    const [anchorOrigin, setAnchorOrigin] = useState<SnackbarOrigin>({ vertical: 'bottom', horizontal: 'right' })

    const handleClose = () => setIsOpen(false)

    const triggerSnackBar = (severity: Severity, content: string, origin?: SnackbarOrigin) => {
        setSeverity(severity)
        setMessageContent(content)
        if (origin) setAnchorOrigin(origin)
        setIsOpen(true)
    }

    const SnackBar = () => (
        <Snackbar
            open={isOpen}
            autoHideDuration={6000}
            onClose={handleClose}
            anchorOrigin={anchorOrigin}
        // message="Note archived"
        // action={action}
        >
            <Alert
                onClose={handleClose}
                severity={severity}
                variant='filled'
                sx={{ width: '100%' }}
            >
                {messageContent}
            </Alert>
        </Snackbar>
    )

    return {
        SnackBar,
        triggerSnackBar,
    }
}
