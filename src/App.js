import React, { Component } from "react";
import "./App.css";
import RestaurantDetails from "./components/RestaurantDetails";
import data from "./components/data.json";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      allData: data,
      filterData: data,
    };
  }

  filterRating = (event) => {
    let { allData } = this.state;
    
    // eslint-disable-next-line
    let temp = allData.filter((ele) => {
      if (Number(ele.reviews) >= Number(event.target.name)) return ele;
    });
    this.setState({
      filterData: temp,
    });
  };

  filterPayment = (event) => {
    let { allData } = this.state;
    // this.state.filterData = []
    if (event.target.name === "all") {
      this.setState({
        filterData: data,
      });
    } else {
      // eslint-disable-next-line
      let temp = allData.filter((ele) => {
        if (ele.paymentMethods[event.target.name]) return ele;
      });

      this.setState({
        filterData: temp,
      });
    }
  };

  filterPrice = (e) => {
    let {allData} = this.state;
    let temp;

    // let temp = allData.map(ele=>{
      if(e.target.name === 'ascending'){
        temp = allData.sort((x,y)=>x['cost_for_two']-y['cost_for_two'])
      }
      else{
        temp = allData.sort((x,y)=>-x['cost_for_two']+y['cost_for_two'])
      }
    // })

    this.setState({
      filterData: temp
    })

  }

  render() {
    console.log(this.state.data);
    return (
      <div>
        <div class="navBar">
          <h1>Restaurant Details For You</h1>
          <div class="flexbox">
            <div>
              <div>Filter By Reviews</div>
              <div>
                <button onClick={this.filterRating} name="0">
                  All
                </button>
                <button onClick={this.filterRating} name="1">
                  &gt;1
                </button>
                <button onClick={this.filterRating} name="2">
                  &gt;2
                </button>
                <button onClick={this.filterRating} name="3">
                  &gt;3
                </button>
                <button onClick={this.filterRating} name="4">
                  &gt;4
                </button>
              </div>
            </div>

            <div>
              <div>Filter By Payment Methods</div>
              <div>
                <button onClick={this.filterPayment} name="all">
                  All
                </button>
                <button onClick={this.filterPayment} name="card">
                  Card
                </button>
                <button onClick={this.filterPayment} name="cash">
                  Cash
                </button>
                <button onClick={this.filterPayment} name="upi">
                  UPI
                </button>
              </div>
            </div>
            
            <div>
              <div>Sort By Price for two</div>
              <div>
                <button onClick={this.filterPrice} name="ascending">
                  Ascending
                </button>
                <button onClick={this.filterPrice} name="descending">
                  Descending
                </button>
              </div>
            </div>


          </div>
        </div>
        <RestaurantDetails data={this.state.filterData} />
      </div>
    );
  }
}
