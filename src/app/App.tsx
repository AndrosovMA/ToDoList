import React from 'react';
import './App.css';
import {AppBar, Button, Container, IconButton, Toolbar, Typography} from "@mui/material";
import {Menu} from '@mui/icons-material';
import {TodoListsList} from "../features/TodoListsList/TodoListsList";


function App() {

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
            </AppBar>

            <Container maxWidth="xl">
                <TodoListsList/>
            </Container>
        </div>
    );
}

export default App;






