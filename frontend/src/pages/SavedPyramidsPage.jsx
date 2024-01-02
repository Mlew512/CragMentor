import React, { useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { useNavigate, useOutletContext } from "react-router-dom";
import { api } from "../utilities";

const SavedPyramidsPage = () => {
    const { user, setSavedPyramids } = useOutletContext();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSavedPyramids = async () => {
            try {
                const response = await api.get("pyramid/");

                if (response.status === 200) {
                    setSavedPyramids(response.data.savedPyramids);
                }
            } catch (error) {
                console.error("Error fetching saved pyramids:", error);
            }
        };

        fetchSavedPyramids();
    }, [setSavedPyramids]);

    return (
        <>
            <Container>
                <Row>
                    <Col>
                        <h3>Saved Pyramids</h3>
                        {user && user.savedPyramids && user.savedPyramids.length > 0 ? (
                            user.savedPyramids.map((pyramid) => (
                                <Card key={pyramid.id}>
                                    {/* info about each saved pyramid */}
                                </Card>
                            ))
                        ) : (
                            <p>No saved pyramids.</p>
                        )}
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default SavedPyramidsPage;