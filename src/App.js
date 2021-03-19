
// import './App.css';
import './style.css';
import { Component } from 'react';
import DefaultImg from './default-img.jpg';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Box from '@material-ui/core/Box';



const API_URL = "http://localhost:4000";

class App extends Component   {
  constructor(props){
    super(props);
  this.state={
    multerImage:DefaultImg,
    message:"no text",
    name:"",
    fatherName:'',
    dob:'',
    panNumber:''
  }
}
setDefaultImage(uploadType) {
  if (uploadType === "multer") {
    this.setState({
      multerImage: DefaultImg
    });
  } 
}
splitLines(t) { return t.split(/\r\n|\r|\n/); }


uploadImage(e){
  
  let imageFormObj = new FormData();

      imageFormObj.append("uploadedImage", e.target.files[0]);

      // stores a readable instance of 
      // the image being uploaded using multer
      this.setState({
        multerImage: URL.createObjectURL(e.target.files[0])
      });

      axios.post(`${API_URL}/api/upload`, imageFormObj)
        .then((res) => {
          console.log(res);
          alert("sucess");
          let a = this.splitLines(res.data.message);
          this.setState({
            message:res.data.message,
            name:a[1],
            fatherName:a[2],
            dob:a[4],
            panNumber:a[6]

          });
          
        }, (err)=>{
          console.log(err);
          alert("error"+err);
        }
        //   if (res.status) {
        //     alert("Image has been successfully uploaded using multer");
        //     this.setDefaultImage("multer");
        //     console.log(res.data.message);
        //   }
        // })
        // .catch((err) => {
        //   alert("Error while uploading image using multer");
        //   this.setDefaultImage("multer");
        //   console.error(err);
        );
}
handleChange(event){
  event.preventDefault();
}

render(){ 
  return (
    <div className="App">
    
      <header className="App-header">
      <AppBar position="static">
        <Toolbar variant="dense">
         
          <Typography variant="h3" color="inherit" text-align="center ">
          OCR to extract PAN details 
          </Typography>
        </Toolbar>
      </AppBar>
      <p></p>
      <p></p>
      <p></p>
      <div class="container">
      <div class="center">
      <Grid container spacing={10}>
      <Grid>
      <section className="hero">
        <label className="fileUploaderContainer">
        <Button variant="contained" color="primary" component="span">
        
        <input type="file" id="upload" className="process__upload-btn" onChange={(e)=>this.uploadImage(e,"image")} /><br/>
        
      </Button>
      </label>
        </section>
      <p><img src={this.state.multerImage} alt="pancard" className="process__image" height='210' /></p>
        
        
        
       
        </Grid>
        <Grid><p></p></Grid>
        <Grid>
        <Box m={5} width="120%" height="120%" align="center"> 
         <Card m={-4}>
        
        <form>
          <label>
             Name: &ensp;
           <input type="text" name="name"  value={this.state.name} onChange={this.handleChange}/>
            </label>
            <br /><br />
            <label>
             Father's Name:&ensp;
           <input type="text" name="Father's Name"  value={this.state.fatherName} onChange={this.handleChange}/>
            </label>
            <br /><br />
            <label>
             Date of Birth:&ensp;
           <input type="text" name="Date of Birth"  value={this.state.dob} onChange={this.handleChange}/>
            </label>
            <br /><br />
            <label>
            PAN Number:&ensp;
           <input type="text" name="PAN Number"  value={this.state.panNumber} onChange={this.handleChange}/>
            </label>
            <br />
            <br />
      <input type="submit" value="Submit" />
    </form>
    </Card>
    </Box>
    </Grid>
    </Grid>
    </div>
    </div>
      </header>
    </div>
  );
}
}

export default App;
