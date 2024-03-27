import { Component } from "react";
import Loader from "../Loader";
import SingleCard from "../SingleCard";
import "./index.css";

// This constants represents the status of an API
const apiStatusConstants = {
  initial: "INITIAL",
  success: "SUCCESS",
  failure: "FAILURE",
  inProgress: "IN_PROGRESS",
};

class Cards extends Component {
  state = { criptoData: {}, apiStatus: apiStatusConstants.initial };

  componentDidMount() {
    this.getData();
  }

  formatEachCripto = (obj) => ({
    code: obj.code,
    description: obj.description,
    rate: obj.rate,
    rateFloat: obj.rate_float,
    symbol: obj.symbol,
  });

  formatItem = (obj) => ({
    usd: this.formatEachCripto(obj.USD),
    gbp: this.formatEachCripto(obj.GBP),
    eur: this.formatEachCripto(obj.EUR),
  });


  //Fetching the data asynchronously using React's lifecycle methods

  getData = async () => {
    this.setState({ apiStatus: apiStatusConstants.inProgress });
    const apiUrl = "https://api.coindesk.com/v1/bpi/currentprice.json";
    const response = await fetch(apiUrl);
    if (response.ok) {
      const data = await response.json();

      // Formatting the data into camel case for using it in javascript
      const updatedData = {
        chartName: data.chartName,
        disclaimer: data.disclaimer,
        time: data.time,
        bpi: this.formatItem(data.bpi),
      };
      this.setState({
        criptoData: updatedData,
        apiStatus: apiStatusConstants.success,
      });
    } else {
      this.setState({ apiStatus: apiStatusConstants.failure });
    }
  };
  
  // Handling API loading view
  renderLoaderView = () => <Loader />;

  onRetry = () => this.getData();
  
  // Handling API failure view
  renderFailureView = () => (
    <>
      <p className="error-msg">404 Error :(</p>
      <button className="retry-button" onClick={this.onRetry}>
        Retry
      </button>
    </>
  );

  renderAboutBitCoin = () => (
    <div className="cards-container">
      <div className="bitcoin-container">
        <div className="bitcoin-img-container">
          <img
            className="bitcoin-img"
            src="https://images.unsplash.com/photo-1639133893916-a711d8af8c0a?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb"
            alt="bit-coin"
          />
        </div>
        <p className="about-bitcoin">
          Bitcoin was launched in 2009, bitcoin is the world's largest
          cryptocurrency by market capitalization. Unlike fiat currency, bitcoin
          is created, distributed, traded, and stored using a decentralized
          ledger system known as a blockchain
        </p>
      </div>
    </div>
  );


  renderBitCoinData = () => {
    const { criptoData } = this.state;
    const { chartName, disclaimer, time, bpi } = criptoData;
    const { updated } = time;
    const { usd, gbp, eur } = bpi;
    return (
      <div className="bottom-container">
        <h1>{chartName}</h1>
        {this.renderAboutBitCoin()}
        <marquee className="slide-text">{disclaimer}</marquee>
        <p className="time-text">
          Recently Updated On <span className="time">{updated}</span>
        </p>
          {/* Rendering Bitcoin Cards */}
        <div className="bitcoins-card-container">
          <SingleCard>{usd}</SingleCard>
          <SingleCard>{gbp}</SingleCard>
          <SingleCard>{eur}</SingleCard>
        </div>
      </div>
    );
  };

  // Handling API success view
  renderSuccessView = () => (
    <>
      {this.renderBitCoinData()}
    </>
  );

  renderCards = () => {
    const { apiStatus } = this.state;
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoaderView();
      case apiStatusConstants.failure:
        return this.renderFailureView();
      case apiStatusConstants.success:
        return this.renderSuccessView();
      default:
        return null;
    }
  };

  render() {
    return <div className="cards-section">{this.renderCards()}</div>;
  }
}

export default Cards;
