import { Col, Row } from "react-bootstrap"
import AssociationCard from "../AssociationCard/AssociationCard"

const AssociationList = ({ associations }) => {
    return (
        <Row>
            {associations.map(elm => {
                return (
                    <Col sm={{ span: 4 }} key={elm._id} >
                        <AssociationCard {...elm} />
                    </Col>
                )
            })}
        </Row>
    )

}
export default AssociationList

