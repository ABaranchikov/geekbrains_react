import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { selectMemes, selectMemesError, selectMemesLoading } from "../../store/memes/selectors";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Carousel, Col, Pagination, Button, Spinner } from 'react-bootstrap'
import './memes.css';
import { getMemes } from "../../store/memes/actions";
import { PAGINATION_SIZE } from "../../utils/constants";

export const Memes = () => {
    const [index, setIndex] = useState(0);
    const [activePage, setActivePage] = useState(1);

    const error = useSelector(selectMemesError);
    const loading = useSelector(selectMemesLoading);
    const memes = useSelector(selectMemes);

    const dispatch = useDispatch();

    const handleChangePage = (id) => {
        setActivePage(id);
        reload(id - 1);
    }

    const reload = (page) => {
        dispatch(getMemes(page))
    }

    useEffect(() => {
        reload(0);
    }, [])


    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };

    const items = [];
    for (let number = 1; number <= PAGINATION_SIZE; number++) {
        items.push(
            <Pagination.Item key={number} active={number === activePage} onClick={() => handleChangePage(number)}>
                {number}
            </Pagination.Item>,
        );
    }

    return (
        <Container>
            {loading &&
                <Row className="justify-content-center  p-2">
                    <Spinner animation="border" variant="warning" />
                </Row>
            }
            {error ? (
                <>
                    <h3>Error: {error}</h3>
                    <Button onClick={reload}>Refresh</Button>
                </>
            ) : (
                <>
                    <Row className="justify-content-center align-items-center">
                        <Col>
                            <Carousel  className="Frame justify-content-center" activeIndex={index} onSelect={handleSelect}>
                                {!!memes && memes.map((item, idx) => (
                                    <Carousel.Item key={item.submission_id} >
                                        <img
                                            className="ImageCenter"
                                            src={item.submission_url}
                                            alt={item.submission_title}
                                        />
                                    </Carousel.Item>
                                ))}
                            </Carousel>
                        </Col>
                    </Row>

                    <Row >
                        <Col   >
                            <Pagination className="justify-content-center p-2 m-0">
                                {items}
                            </Pagination>
                        </Col>
                    </Row>

                </>
            )}

        </Container>
    )


}