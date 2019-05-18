import React from 'react';
import { connect } from "react-redux";
import { fetchHotels } from "./modules/fetchHotelsAction";
import { Button } from 'office-ui-fabric-react/lib/Button';

const AppStyle = {
  hotelConatiner: {
    borderBottom: '1px solid #e6e3e3'
  },
   hotelDetailsContainer : {
      display: 'inline-block',
      margin: '20px'
   }
}


export class App extends React.Component  {
  constructor() {
    super();
    this.state= {
      sortedhotels: []
    }
  }
  componentDidMount() {
    this.props.dispatch(fetchHotels());
  }
  gethotelContainer(hotel, index) {
    return (
          <div key= {index} style={AppStyle.hotelConatiner}> 
              <img src={hotel.image} alt={hotel.name}></img>
              <div style={AppStyle.hotelDetailsContainer}>
                <h2>{hotel.name}</h2>
                <div>Price: {hotel.price} </div>
                <div>
                {hotel.roomsAvailable} Rooms Available
                </div>
                <div>
                {hotel.starRating} Stars
                </div>
              </div>
            </div>
    )
  }
  getSortedHotelsByRating = () => {
    let hotelsData = [...this.props.hotels];
    hotelsData.sort(function(a,b){
      return b.starRating - a.starRating;
    })
    this.setState({sortedhotels: hotelsData})
  }
  getSortedHotelsByPrice = () => {
    let hotelsData = [...this.props.hotels];
    hotelsData.sort(function(a,b){
      return b.price - a.price;
    })
    this.setState({sortedhotels: hotelsData})
  }
  getSortedHotelsByRooms = () => {
    let hotelsData = [...this.props.hotels];
    hotelsData.sort(function(a,b){
      return  b.roomsAvailable - a.roomsAvailable;
    })
    this.setState({sortedhotels: hotelsData})
  }
  render() {
    const { error, loading, hotels } = this.props;
    if (error) {
      return <div>Error! {error.message}</div>;
    }

    if (loading) {
      return <div>Hotel Loading...</div>;
    }
    return (
        <div className='mainContainer'>
         <Button onClick={this.getSortedHotelsByRating}>rating</Button>
         <Button onClick={this.getSortedHotelsByPrice}>price</Button>
         <Button onClick={this.getSortedHotelsByRooms} >rooms</Button>
          { this.state.sortedhotels.length === 0 && hotels.map((hotel, index) => {
            return this.gethotelContainer(hotel, index)
          })}
          { this.state.sortedhotels.length > 0 && this.state.sortedhotels.map((hotel, index) => {
            return this.gethotelContainer(hotel, index)
          })}
         </div> 
    );
  }
}
const mapStateToProps = state => ({
  hotels: state.hotels,
  loading: state.loading,
  error: state.error
});

export default connect(mapStateToProps)(App);

