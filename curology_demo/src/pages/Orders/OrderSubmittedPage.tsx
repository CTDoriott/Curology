import React from 'react';
import { connect, useSelector  } from 'react-redux';
import { Col, Card, CardBody, Button, FormGroup } from 'reactstrap';
import orderReducer from '../../redux/reducers';


interface Props {
  previousPage: any;
}
export const OrderResultDisplay: React.FC<Props> = (props: any) => {
  const order = useSelector((state: any) => { console.log(state); return state.order;});
  const currentOrder = order.data[0];
  return (
      <Col sm="12">
        <Card className="card-border">
          <CardBody>
            <FormGroup row={true}>
              <Col xs="12" lg="12">
                <div className="text-center">
                  {currentOrder.orderSuccess &&
                    <h2>Your order was successfully placed! Sit back, relax, and wait for your magic potion</h2>
                  }

                  {!currentOrder.orderSuccess &&
                    <h2>Oops! We could not process your order.</h2>

                  }

                  {!currentOrder.orderSuccess && currentOrder.existingProductCount < 3 &&
                    <h2>You have {3-currentOrder.existingProductCount} products available to purchase this month.</h2>
                  }

                  {!currentOrder.orderSuccess && currentOrder.existingProductCount >= 3 &&
                    <h2>You can no longer purchase anymore products this month. Please return next month!</h2>
                  }
                </div>
              </Col>
            </FormGroup>
          </CardBody>
          {!currentOrder.orderSuccess  && <div style={{ paddingBottom: 30 }}>
            <Button
              color="success"
              onClick={props.previousPage}
              style={{ marginLeft: '20px', float: "left" }}
            >
              &nbsp; Previous
            </Button>
          </div>}
        </Card>
      </Col>
  );
};
