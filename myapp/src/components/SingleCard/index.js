import "./index.css";

const SingleCard = (props) => {
  const { children } = props;
  const { code, description, rate, rateFloat, symbol } = children;
 
  // Symbols are not working in my laptop so I used this following step to represent the symbols
  const renderSign = () => {
    if (symbol === "&#36;") {
      return <h1>&#36;</h1>;
    } else if (symbol === "&pound;") {
      return <h1>&pound;</h1>;
    } else {
      return <h1>&euro;</h1>;
    }
  };

  return (
    <div className="single-card">
      <div className="code-container">
        <h1 className="code">{code}</h1>
        {renderSign()}
      </div>
      <p className="desc">{description.toUpperCase()}</p>
      <div className="rate-container">
        <p className="rate">Rate <br/> <span className="rate-count">{rate}</span></p>
        <p className="rate-float">Floating Rate <br/> <span className="rate-float-count">{rateFloat}</span></p>
      </div>
    </div>
  );
};

export default SingleCard;
