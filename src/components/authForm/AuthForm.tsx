import { useState } from 'react'
import { useAuthError, useLogin, useSignup } from '../../providers/AuthProvider'
import { Button, Grid, Paper, TextField, Typography } from '@mui/material'
import { Box, styled } from '@mui/system'

const StyledBox = styled(Box, {})({
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
})

const FormBox = styled(Box, {})({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    width: '100%',
    height: 250,
})

const AuthFormHeader = styled(Box, {})({
    backgroundColor: '#1976d2',
    height: '64px',
    color: '#FFF',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '5px 5px 0 0'
})

const StyledTypography = styled(Typography, {})({
    color: 'red'
})

export default function AuthForm({ type }: { type: 'login' | 'signup' }) {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const authFnMap: { [key: string]: any } = {
        signup: useSignup,
        login: useLogin,
    }

    const handleSubmit = authFnMap[type]()
    const authError = useAuthError()

    return (
        <StyledBox>
            <Grid container justifyContent='center' >
                <Grid item lg={3.5} md={4} sm={6} xs={11} >
                    <Paper elevation={5}>
                        <AuthFormHeader>
                            <Typography variant='subtitle1' sx={{ textTransform: 'uppercase' }} >
                                {type}
                            </Typography>
                        </AuthFormHeader>
                        <FormBox >
                            <Grid
                                container
                                direction='column'
                                alignItems='center'
                                justifyContent='center'
                                rowSpacing='20px'
                            >
                                <Grid item >
                                    <TextField
                                        size='small'
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                        label='email'
                                        variant='outlined'
                                    />
                                </Grid>
                                <Grid item >
                                    <TextField
                                        size='small'
                                        label='password'
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                    />
                                </Grid>
                                <Grid item >
                                    <Button
                                        type='submit'
                                        onClick={() => handleSubmit({ email, password })}
                                        //height and width here are exact same as TextField size small
                                        sx={{ width: '222.67px', height: '40px' }}
                                    >
                                        submit
                                    </Button>
                                </Grid>
                                <StyledTypography>{authError}</StyledTypography>
                            </Grid>
                        </FormBox>
                    </Paper>
                </Grid>
            </Grid>
        </StyledBox>
    )
}
