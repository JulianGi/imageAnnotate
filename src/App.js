import React from "react";
import ReactImageAnnotate from "react-image-annotate";


class Annotate extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
       images: null 
      };
  }

  //https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array
  shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}

  componentDidMount(){
    fetch('/files.txt')//Grab a list of files that should be presented for annotation - previously generated 
    .then((r) => r.text())
    .then(text  => {
      text = this.shuffle(text.split("\n"))
      let images = text.map((file, index) => {
          return {
            src: "/images/" +  file,
            name: "Image " + index,
            regions: []
          }
      })
      this.setState({
        images: images
      })
      
    })  
  } 



  render() {
    if(!this.state.images){
      return <div>Loading</div>
    }
    return <ReactImageAnnotate
    labelImages
    regionClsList={["Alpha", "Beta", "Charlie", "Delta"]}
    regionTagList={["tag1", "tag2", "tag3"]}
    images={this.state.images}
  />
  }
}
export default Annotate;
