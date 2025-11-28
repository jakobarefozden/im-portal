import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div>
      <h2>Hjem</h2>
      <p>Velkommen til IM fagportalen.</p>
      <p>Velg programområde under:</p>

      <ul>
        <li>
          <Link to="/class/im-vg1">IM Vg1 – Felles programfag</Link>
        </li>
        <li>
          <Link to="/class/it-vg2">IT Vg2 – Informasjonsteknologi</Link>
        </li>
        <li>
          <Link to="/class/mp-vg2">MP Vg2 – Medieproduksjon</Link>
        </li>
      </ul>
    </div>
  );
}

export default HomePage;
