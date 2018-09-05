import * as React from 'react'
import { SketchField, Tools } from "react-sketch";

// import axios from "axios";

// // import { Navbar } from "./components";
// import { BASE_URL } from "../constants";


class App extends React.Component<any, any> {

  sketch: any;
  image:any;
  
  constructor(props: any) {
    super(props);
    this.state = {
      probability: 0,
      showPrediction: false,
    };
  }
  componentDidMount(){
    console.log(this.sketch)
  }

  handleSubmit = (e: any) => {
    e.preventDefault();
    this.image.src = this.sketch.toDataURL()
    
      // const formData = new FormData();
      // formData.append("image", image);
      // axios.post(BASE_URL + "upload", formData).then(response => {
      //   if (response) {
      //     axios.get(BASE_URL + "predict").then(resp =>
      //       this.setState({
      //         prediction: resp.data.prediction,
      //         probability: resp.data.probability,
      //         showPrediction: true,
      //       })
      //     );

      //   }
      // });
    
    
  };


  handleOnClickClear = () => {
    console.log(this.sketch.toDataURL("image/jpeg"))
    this.sketch.clear()
    this.setState({
      showPrediction: false,

    });
  }


  render() {
    return (
      <div className="container-fluid custom-container gradient">
        <div className="container">
          <div className=" col-md-6 offset-md-3 custom-form">
            {this.state.showPrediction ? (
              <p className={"margin-top"}>
                I am{" "}
                <strong>{Math.round(this.state.probability * 100)}%</strong>{" "}
                sure that, it's <strong> {this.state.prediction}</strong>
              </p>
            ) : null}

            <SketchField width='400px'
              className={"drawing-canvas"}
              height='400px'
              tool={Tools.Pencil}
              imageFormat={'jpeg'}
              lineColor='red'
              backgroundColor='black'
              ref={(ref:any) => this.sketch = ref}
              lineWidth={15} />

            <img src="" className="img-thumbnail"  ref={(ref:any) => this.image = ref}/>

            <button className={"btn btn-custom"} onClick={this.handleSubmit}>Predict!</button>

            <button className={"btn btn-custom"} onClick={this.handleOnClickClear}>Clear all</button>
          </div>
        </div>
      </div>
    );
  }

};

export default App;
