import * as React from 'react'
import { Link } from 'react-router-dom';

const Home: React.SFC<{}> = () => (
  <div className="container-fluid custom-container gradient">
    <div className="contaner custom-form home-container">
    <h2>What do you want to do?</h2>
      <Link to={"/write"} className="btn btn-custom buttom-margin">
      Write
        </Link>
        <Link to={"/image"} className="btn btn-custom">
        Upload Image
        </Link>
        </div>
  </div>
)
export default Home