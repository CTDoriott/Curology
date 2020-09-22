import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import { Button, Card, CardBody, Col, FormGroup } from 'reactstrap';
import ReduxFormInput from '../../components/ReduxFormInput';
import validate from './validate';
import bottle from '../../assets/images/bottle.jpeg';

interface Props { };

export const ProductDetailForm: React.FC<Props & InjectedFormProps<{}, Props>> = (props: any) => {
  const { handleSubmit } = props;
  const productPrice = 50;
  const [quantity, setQuantity] = useState(0);

  const handleChange = function (event: any) {
    setQuantity(event.target.value);
  }
  return (
    <form onSubmit={handleSubmit} noValidate={true}>
      <Col sm="12">
        <Card className="card-border">
          <CardBody>
            <FormGroup row={true}>
              <Col xs="12" lg="6">
                <div>
                  <h1>Curology Magic Potion!</h1>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum fermentum eleifend leo id euismod. Vivamus accumsan dolor vel dui accumsan blandit venenatis eu libero. Nullam sagittis, nisi ac ultricies sollicitudin, nibh ante elementum eros, ac blandit arcu turpis ac ex. Vivamus ultricies, neque at consectetur tempus, lacus augue placerat purus, hendrerit convallis neque dui eget augue. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Vivamus sagittis id ligula nec dapibus. Sed efficitur semper ante a porta.
                  </p>
                  <p>
                    Vestibulum sit amet augue accumsan, rhoncus elit et, elementum nisi. Sed at odio sed nisi convallis lobortis in sit amet tellus. In ultrices tellus in interdum placerat. Pellentesque dictum nunc rhoncus nulla feugiat tincidunt. Nullam et elit eget nunc dignissim fringilla eu nec ex. Suspendisse quam velit, ornare sit amet dictum vel, viverra non nibh. Mauris condimentum urna magna, eget sagittis massa tincidunt a. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Integer iaculis pellentesque quam vel aliquam. Aliquam erat volutpat.
                  </p>
                </div>

                <Field
                  name="quantity"
                  type="number"
                  component={ReduxFormInput}
                  label="Quantity *"
                  placeHolder="Quantity"
                  minValue={1}
                  maxValue={3}
                  onChange={handleChange}
                />

                <Field
                  name="total"
                  type="text"
                  component={ReduxFormInput}
                  label="Total Price"
                  disabled="true"
                  placeHolder={'$'+(quantity * productPrice).toFixed(2)}
                />
              </Col>
              <Col xs="12" lg="6">
              <div className="">
                <img
                  src={bottle}
                  alt="Magic Potion Bottle"
                  className="img-responsive mx-auto d-block"
                />
              </div>
              </Col>
            </FormGroup>
          </CardBody>
          <div style={{ paddingBottom: 30, paddingRight: 20}}>
            <Button
              className="float-md-right mx-auto d-block"
              color="success"
              type="submit"
            >
              Next &nbsp;
            </Button>
          </div>
        </Card>
      </Col>
    </form>
  );
}

const form = reduxForm<{}, Props>({
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: false,
  form: 'order',
  validate,
})(ProductDetailForm);

export default connect(null)(form);
