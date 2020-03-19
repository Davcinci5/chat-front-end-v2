 import React,{useState} from 'react';
 import { Paper, Button, Icon, Grid, Box, TextField, makeStyles} from '@material-ui/core';
 import translate from '../../i18n/translate';
 import MenuIcon from '@material-ui/icons/Menu';
 
 const useStyles = makeStyles(theme => ({
    root:{
        flexGrow:1
    },
    paper: {
        paddingBottom: 20,
    },
    message:{
        border:'1px solid #ccc',
        borderRadius: 8,
        padding: '0 20px'
    },
    box:{
        height:'100%',
        paddingLeft:20
    }
}))

const NewMessage = (props) =>{
    const classes = useStyles();
    return(
        <Paper square className={classes.paper}>
            <form>
                <Grid container spacing={0} direction="row" className={classes.message}>
                    <Grid item xs={9}>
                        <TextField
                            name="message"
                            required
                            fullWidth
                            id="message"
                            label={translate("message")}
                            autoFocus
                            value={props.value}
                            onChange={props.handleMessage}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <Box display="flex" alignItems="center" className={classes.box}>
                            <Button
                                variant="contained"
                                color="primary"
                                endIcon={<MenuIcon></MenuIcon>}
                                fullWidth
                                disabled={!props.value.length}
                                onClick={props.handleSend}
                            >
                            {translate("send")}
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </form>
        </Paper>
    )

}

export default NewMessage;