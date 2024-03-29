import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { endpoints, postAPI } from "../utilities/api";
import { Container, Row, Col, Table, Card } from "react-bootstrap";
import MapView from "../component/MapView";
import DisplayMessage from "../component/DisplayMessage";
import LoadingSpinner from "../component/LoadingSpinner";
import FavButton from "../component/FavButton";
import RouteBoxView from "../component/RouteBoxView";

function AreaPage() {
  const [dataID, setDataID] = useState(null);
  const [data, setData] = useState(null);
  const [loadMoreAreasNum, setLoadMoreAreasNum] = useState(1);
  const [loadMoreClimbsNum, setLoadMoreClimbsNum] = useState(1);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const params = useParams();
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? data.media.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === data.media.length - 1 ? 0 : prevIndex + 1
    );
  };

  useEffect(() => {
    let id = null;
    if (params.id) id = params.id;
    if (dataID != id) {
      setDataID(id);
    }
  }, [params]);

  useEffect(() => {
    setIsLoading(true);
    if (dataID) {
      getData();
    }
  }, [dataID]);

  const getData = async () => {
    const response = await postAPI(endpoints.area, null, { uuid: dataID });
    // console.log(response)
    if (response.status) {
      setData(response.data.area);
      setIsLoading(false);
      setMessage("");
    } else {
      setMessage("Something went wrong!");
      setData(null);
      setIsLoading(false);
    }
  };
  const loadMoreAreas = async () => {
    setLoadMoreAreasNum(loadMoreAreasNum + 1);
  };
  const loadMoreClimbs = async () => {
    setLoadMoreClimbsNum(loadMoreClimbsNum + 1);
  };
  const temp = async () => {};
  console.log(data);
  return (
    <>
      {isLoading == false && <DisplayMessage message={message} />}
      {isLoading == false && data != null ? (
        <>
          <Container>
            <Row>
              <a href={"/area/" + data.ancestors[data.ancestors.length - 2]}>
                Go to parent
              </a>

              <div style={{ position: "relative" }}>
                {data.media && data.media.length > 0 && (
                  <div style={{ position: "relative", width: "50vw" }}>
                    <img
                      style={{ width: "100%" }}
                      src={
                        "https://media.openbeta.io/" +
                        data.media[currentIndex]["mediaUrl"]
                      }
                      alt={`Media ${currentIndex + 1}`}
                    />
                    <div
                      style={{
                        position: "absolute",
                        top: "50%",
                        transform: "translateY(-50%)",
                        left: 0,
                        cursor: "pointer",
                      }}
                      onClick={handlePrev}
                    >
                      &lt;
                    </div>
                    <div
                      style={{
                        position: "absolute",
                        top: "50%",
                        transform: "translateY(-50%)",
                        right: 0,
                        cursor: "pointer",
                      }}
                      onClick={handleNext}
                    >
                      &gt;
                    </div>
                  </div>
                )}
              </div>
              <div>
                <h1>{data.areaName}</h1>
                <FavButton data={data} />
              </div>
              <p>{data.content?.description}</p>

              {data.children && data.children.length > 0 && (
                <Container className="d-flex flex-column">
                  <Row className="text-center">
                    <h3>Areas({data.children.length})</h3>
                  </Row>
                  <Row>
                    {data.children.map((area, index) => {
                      if (index < loadMoreAreasNum * 20) {
                        return (
                          <Col sm={4} lg={3} key={index}>
                            <RouteBoxView data={area} />
                          </Col>
                        );
                      }
                    })}
                    {loadMoreAreasNum * 20 < data.children.length && (
                      <button onClick={loadMoreAreas}>Load More</button>
                    )}
                  </Row>
                </Container>
              )}
              {data.climbs && data.climbs.length > 0 && (
                <Container className="d-flex flex-column">
                  <Row className="text-center">
                    <h4>Routes({data.totalClimbs}) </h4>
                    <>
                      {data.climbs
                        .sort(
                          (a, b) =>
                            a.metadata.leftRightIndex -
                            b.metadata.leftRightIndex
                        )
                        .map((climb, index) => {
                          if (index < loadMoreClimbsNum * 20) {
                            return (
                              <Col sm={4} lg={3} key={index}>
                                <RouteBoxView data={climb} />
                              </Col>
                            );
                          }
                        })}
                    </>

                    {loadMoreClimbsNum * 20 < data.climbs.length && (
                      <button onClick={loadMoreClimbs}>Load More</button>
                    )}
                  </Row>
                </Container>
              )}
              <MapView
                data={[...data.climbs, ...data.children]}
                centerOnAll={true}
                showSearch={false}
                boundsChangedCallback={temp}
              />
            </Row>
          </Container>
        </>
      ) : (
        <LoadingSpinner isLoading={isLoading} />
      )}
    </>
  );
}

export default AreaPage;
