import React, { useState } from 'react'
import axios from 'axios';
import { saveAs } from 'file-saver';
import useStyles from './styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
function App() {
  const classes = useStyles();
  const [userState, setUserState] = useState({
    name: '',
    receiptno: 0,
    price1: 0,
    price2: 0
  })
  const handleChange = (e) => {
    const value = e.target.value;
    setUserState({
      ...userState,
      [e.target.name]: value
    });
  }
  const createAndDownloadPdf = () => {
    axios.post('https://dbm-server.herokuapp.com/create-pdf', userState)
      .then(() => axios.get('https://dbm-server.herokuapp.com/fetch-pdf', { responseType: 'blob' }))
      .then((res) => {
        const pdfBlob = new Blob([res.data], { type: 'application/pdf' });

        saveAs(pdfBlob, 'newPdf.pdf');
      })
  }
  return (
    <>
      <div className={classes.toolbar} />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography variant="h4" gutterBottom>
            fill Details
        </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="fullName"
                name="name"
                label="full name"
                fullWidth
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="receiptno"
                name="receiptno"
                label=" receipt ID"
                fullWidth
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="price1"
                name="price1"
                label="Price 1"
                fullWidth
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="price2"
                name="price2"
                label="Price 2"
                fullWidth
                onChange={handleChange}
              />
            </Grid>
          </Grid>
          <br />
          <Button variant="contained" color="primary" onClick={createAndDownloadPdf}>
            Download pdf
          </Button>
        </Paper>
      </main>
    </>

  );
}

export default App;
