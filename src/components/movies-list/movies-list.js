import React, {Component} from 'react';
import './movies-list.css';
import MovieService from '../../services/movie-service';

import { Row, Col, Card} from 'antd';

const { Meta } = Card;


const moviesServ = new MovieService();
export default class MoviesList extends Component {

  state = {
    imgUrl:'',
    path:''
  }

  componentDidMount(){

    moviesServ.getMoviesByKeyword('return').then(movies => {
      
      // const arrOfPromisses = movies.map(movie => {
      //   return moviesServ.getMovieById(movie.id);
      // });

      // Promise.all(arrOfPromisses).then(arr => {
      //   this.setState({moviesInfo:arr});
      // });

    })





    moviesServ.getMovieById(550).then(movie => {
      this.setState({
        path:movie.poster_path
      });
    })
    moviesServ.getMovieImage(3).then(imgUrl => {
      this.setState({ imgUrl });
    })
  }

  render(){
    const {imgUrl} = this.state;
    return(
      <Row>
        <Col span={12}>
          <Card
            hoverable
            style={{ width: 240 }}
            cover={<img alt="example" src={imgUrl} />}
          >
            <Meta title="Europe Street beat" description="www.instagram.com" />
            <Meta title="Europe Street beat" description="www.instagram.com" />
          </Card>
          </Col>
        <Col span={12}>
        <Card
            hoverable
            style={{ width: 240 }}
            cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
          >
            <Meta title="Europe Street beat" description="www.instagram.com" />
          </Card>
        </Col>
      </Row>
    )
  }
}