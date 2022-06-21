import React from 'react';
import './App.css';
import {AppBar, Button, Container, IconButton, LinearProgress, Toolbar, Typography} from "@mui/material";
import {Menu} from '@mui/icons-material';
import {TodoListsList} from "../features/TodoListsList/TodoListsList";
import {ErrorSnackbar} from "../components/ErrorSnackbar/ErrorSnackbar";
import {useSelector} from "react-redux";
import {AppStateType} from "../state/store";
import {RequestStatusType} from "../state/app-reducer";


function App() {
    const status = useSelector<AppStateType, RequestStatusType>((state) => state.appReducer.status);

    return (
        <div className="App">
            {/*Header App bar with burger menu*/}
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{mr: 2}}
                    >
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        Planning learning
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>

                {status === 'loading' && <LinearProgress />}
            </AppBar>

            <Container maxWidth="xl">
                <TodoListsList/>
            </Container>

            <ErrorSnackbar/>
        </div>
    );
}

export default App;






