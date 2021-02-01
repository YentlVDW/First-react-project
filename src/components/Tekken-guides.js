import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import {useForm}  from "react-hook-form";
import armorking from '../assets/armorking.jpg';
import kazuya from '../assets/kazuya.jpg';
import bryan from '../assets/bryan.png';
import lee from '../assets/lee.png';
import deleteIcon from '../assets/delete.png';
import editIcon from '../assets/editIcon.png';
import 'aos/dist/aos.css';
import './TekkenGuide.css';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

function TekkenGuide({characters, setUpdatedCharacter,userAuthenticated, updateCharacter, setKeymove,setCurrentCharacter, currentCharacter, match}) {
  const characterImages = [armorking, kazuya, bryan, lee];
  let teller = 0;
  function optelling(){
    characters.forEach(character => {
      teller = teller + 300;
    });
  }
  useEffect(() =>{
    console.log(match);
  })
  useEffect(() => {
    setCurrentCharacter(characters[0]);
  }, [characters, setCurrentCharacter],);
  return (
    <div>
      <div className="title-container1"><h1>Tekken Guides</h1></div>    
      <Grid container spacing={4} direction="row" justifyItems="space-evenly" alignItems="center" className="grid-container" style={{width: "100%", padding: "80px 80px 0"}}>
      {characters.map((character, index) => (
        <Grid item lg={3}>       
        <Card className="cardRoot" data-aos="flip-left">
        <CardMedia
          className="cardMedia"
          image={characterImages[index++]}
          title="Character image"
        />
        <CardContent>
          <Typography gutterBottom variant="h4" component="h2">
            {character.name}
          </Typography>
          <Typography variant="subtitle1" component="p">
          Aliquam erat volutpat. Donec risus tortor, sollicitudin eu quam ac, vestibulum maximus urna. Aliquam finibus, quam porttitor ornare ultrices, mauris ante facilisis arcu, sit 
          Proin blandit arcu in metus maximus mollis. Donec ac elit ut metus imperdiet congue 
          vel id arcu. Curabitur molestie sem mi, a congue arcu viverra sit amet. Duis luctus, risus at sollicitudin rhoncus, ipsum eros viverra massa, eget cursus nibh ligula et dolor.
          </Typography>
        </CardContent>
      <CardActions style={{padding: 0}}>
      <Link to={`${character._id}`}>  
        <Button color="primary" endIcon={<ArrowRightAltIcon/>}>
          Learn More
        </Button>
      </Link>
      </CardActions>
    </Card>        
        </Grid>
        ))}
    </Grid>
    </div>
  );
}
export default TekkenGuide;