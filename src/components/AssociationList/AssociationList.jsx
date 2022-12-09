import { Col, Row } from "react-bootstrap"
import AssociationCard from "../AssociationCard/AssociationCard"

const AssociationList = ({ associations, refreshAssociations }) => {

    return (
        <Row>
            {associations.map(elm => {
                return (
                    <Col sm={{ span: 4 }} key={elm._id} >
                        <AssociationCard {...elm} refreshAssociations={refreshAssociations} />
                    </Col>
                )
            })}
        </Row>
    )

}
export default AssociationList

