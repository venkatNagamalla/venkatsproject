import { Component } from "react";
import BarGraph from "../BarGraph";
import { FaExternalLinkAlt } from "react-icons/fa";
import Loader from "../Loader";
import "./index.css";

const apiStatusConstants = {
  initial: "INITIAL",
  success: "SUCCESS",
  failure: "FAILURE",
  inProgress: "IN_PROGRESS",
};

class Graph extends Component {
  state = {
    populationData: [],
    sourceData: {},
    apiStatus: apiStatusConstants.initial,
  };

  componentDidMount() {
    this.getData();
  }

  formatData = (obj) => ({
    nationId: obj["ID Nation"],
    yearId: obj["ID Year"],
    nation: obj.Nation,
    population: obj.Population,
    slugNation: obj["Slug Nation"],
    year: obj.Year,
  });

  formatAnnotations = (obj) => ({
    dataSetLink: obj.dataset_link,
    dataSetName: obj.dataset_name,
    sourceDescription: obj.source_description,
    sourceName: obj.source_name,
    subTopic: obj.subtopic,
    tableId: obj.table_id,
    topic: obj.topic,
  });

  formatSourceAnnotations = (obj) => ({
    measures: obj.measures,
    annotations: this.formatAnnotations(obj.annotations),
    name: obj.name,
  });

  //Fetching the data asynchronously using React's lifecycle methods 
  getData = async () => {
    this.setState({ apiStatus: apiStatusConstants.inProgress });
    const apiUrl =
      "https://datausa.io/api/data?drilldowns=Nation&measures=Population";
    const response = await fetch(apiUrl);
    if (response.ok) {
      const obtainedData = await response.json();
      const updatedData = obtainedData.data.map((eachYearData) =>
        this.formatData(eachYearData)
      );
      const updatedSourceData = this.formatSourceAnnotations(
        obtainedData.source[0]
      );
      this.setState({
        populationData: updatedData,
        sourceData: updatedSourceData,
        apiStatus: apiStatusConstants.success,
      });
    } else {
      this.setState({ apiStatus: apiStatusConstants.failure });
    }
  };

  renderSuccessView = () => {
    const { populationData, sourceData } = this.state;
    const { annotations ,measures} = sourceData;
    const {
      dataSetLink,
      dataSetName,
      sourceDescription,
      sourceName,
      // subTopic,
      topic,
    } = annotations;
    return (
      <div className="bar-container">
        <p className="bar-heading">US Population Analysis Report</p>

         {/* Representing the population details in Bar Graph format */}

        <BarGraph populationData={populationData} />
         
         {/* Source for the population Details */}

        <div className='source-container'>
        <p className="topic-text">Topic <br/><span className="topic">{topic}</span></p>
        <p className="source-text">Source by <br/> <span className="source">{sourceName}</span></p>
        <p className="measures-text">Measures <br/> <span className="measures">{measures[0]}</span></p>
        </div>
        <p className="description">{sourceDescription} </p>
        <p className="data-set-name">{dataSetName} <a className="data-set-link" rel="noreferrer" target='_blank' href={dataSetLink}>visit <FaExternalLinkAlt/></a></p>
      </div>
    );
  };

  onRetry = () => this.getData();

  renderFailureView = () => {
    return (
      <>
        <p className="error-msg">404 Error :(</p>
        <button className="retry-button" type="button" onClick={this.onRetry}>
          Retry
        </button>
      </>
    );
  };

  renderGraphs = () => {
    const { apiStatus } = this.state;
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return <Loader />;
      case apiStatusConstants.failure:
        return this.renderFailureView();
      case apiStatusConstants.success:
        return this.renderSuccessView();
      default:
        return null;
    }
  };

  render() {
    return <div className="graphs-route-container">{this.renderGraphs()}</div>;
  }
}

export default Graph;
