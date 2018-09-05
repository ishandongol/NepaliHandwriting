import * as React from 'react'
import { SketchField, Tools } from "react-sketch";

import axios from "axios";
// import {Canvas,Circle, Path, Text} from 'react-fabricjs';


// // import { Navbar } from "./components";
import { BASE_URL } from "../constants";


class App extends React.Component<any, any> {

  sketch: any;
  image: any;
  canvas: any

  flag = false
  dotFlag = false
  ctx: any;

  constructor(props: any) {
    super(props);
    this.state = {
      currX: 0,
      currY: 0,
      prevX: 0,
      prevY: 0,
      probability: 0,
      showPrediction: false,
    };
  }




  handleSubmit = (e: any) => {
    e.preventDefault();
    let blob = '';
    // console.log(this.sketch)
    // // const ctx = this.sketch._canvas.nextElementSibling.getContext("2d")
    // console.log(this.sketch.toJSON())
    const xhr = new XMLHttpRequest();

    xhr.open("GET", this.sketch.toDataURL("image/jpg;base64;", 0.5));
    xhr.responseType = "blob";// force the HTTP response, response-type header to be blob
    xhr.onload = () => {

      blob = xhr.response;// xhr.response is now a blob object
      console.log(blob)
      const formData = new FormData();
      formData.append("image", blob);
      axios.post(BASE_URL + "upload", formData).then(response => {
        if (response) {
          axios.get(BASE_URL + "predict").then(resp =>
            this.setState({
              prediction: resp.data.prediction,
              probability: resp.data.probability,
              showPrediction: true,
            })
          );

        }
      });
    }
    xhr.send();



  };


  handleOnClickClear = () => {

    this.sketch.clear()
    this.setState({
      showPrediction: false,

    });
  }


  render() {
    return (
      <div className="container-fluid custom-container gradient">
        <div className="container">
          <div className=" col-md-6 offset-md-3">

   <div className="prediction-container">
              {this.state.showPrediction ? (
                <p className={"custom-p"}>
                  I am{" "}
                  <strong>{Math.round(this.state.probability * 100)}%</strong>{" "}
                  sure that, it's <strong> {this.state.prediction}</strong>
                </p>
              ) :  <p className={"custom-p"}>
              Nepali Handwriting Recognition
            </p>}
            </div>
            <div className="custom-form">
              <SketchField width='400px'
                name={"canvas"}
                className={"drawing-canvas"}
                height='400px'
                tool={Tools.Pencil}

                lineColor='white'
                ref={(ref: any) => this.sketch = ref}
                lineWidth={15} /></div>
         
            <button className={"btn btn-custom btn-success"} onClick={this.handleSubmit}>Predict!</button>

            <button className={"btn btn-custom btn-light"} onClick={this.handleOnClickClear}>Clear all</button>
          </div>
        </div>
      </div>
    );
  }

};

export default App;
