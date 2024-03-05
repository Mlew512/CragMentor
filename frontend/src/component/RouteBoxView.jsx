import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { Table } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import FavButton from "./FavButton";
import "./RouteBoxView.css";
const RouteBoxView = ({ data }) => {
  const navigate = useNavigate();
  function handleClick(path) {
    navigate(path);
  }

  return (
    <>
      <>
        <a
          href={
            data.name != null
              ? `/route/${data["uuid"]}`
              : `/area/${data["uuid"]}`
          }
          onClick={(e) => {
            e.preventDefault(); // Prevents the default behavior of link click
            data.name != null
              ? handleClick(`/route/${data["uuid"]}`)
              : handleClick(`/area/${data["uuid"]}`);
          }}
        >
          {data.name != null ? (
            <>
              {data["name"]} (
              {data.grades.vscale == null
                ? data["grades"]["yds"]
                : data["grades"]["vscale"]}
              )
            </>
          ) : (
            <>
              {data["areaName"]}({data["totalClimbs"]})
            </>
          )}
        </a>
      </>
    </>
  );
};
export default RouteBoxView;
