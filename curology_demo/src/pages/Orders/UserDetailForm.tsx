import React from 'react';
import { connect } from 'react-redux';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import ReduxFormInput from '../../components/ReduxFormInput';
import ReduxFormSelect from '../../components/ReduxFormSelect';
import { stateArray } from '../../assets/data/states'
import { Col, Card, CardBody, Button, FormGroup } from 'reactstrap';
import validate from './validate';
import { name, phoneNumber, creditCardNumber, expirationDate } from '../../lib/normalize';

interface Props {
  previousPage: any;
}
export const UserDetailForm: React.FC<Props & InjectedFormProps<{}, Props>> = (props: any) => {
  const { handleSubmit, previousPage } = props;
  return (
    <form onSubmit={handleSubmit} noValidate={true}>
      <Col sm="12">
        <Card className="card-border">
          <CardBody>
            <FormGroup row={true}>
              <Col xs="12" lg="6">
                <Field
                  name="firstName"
                  type="text"
                  component={ReduxFormInput}
                  label="First Name *"
                  placeHolder="John"
                  normalize={name}
                />
              </Col>
              <Col xs="12" lg="6">
                <Field
                  name="lastName"
                  type="text"
                  component={ReduxFormInput}
                  label="Last Name *"
                  placeHolder="Doe"
                  normalize={name}
                />
              </Col>
            </FormGroup>
            <FormGroup row={true}>
              <Col xs="12" lg="12">
                <Field
                  name="email"
                  type="text"
                  component={ReduxFormInput}
                  label="Email Address"
                  placeHolder="customer@example.com"
                />
              </Col>
            </FormGroup>
            <FormGroup row={true}>
              <Col xs="12" lg="12">
                <Field
                  name="street1"
                  type="text"
                  component={ReduxFormInput}
                  label="Address Line 1 *"
                  placeHolder="1000 Beverly Dr"
                />
              </Col>
            </FormGroup>
            <FormGroup row={true}>
              <Col xs="12" lg="12">
                <Field
                  name="street2"
                  type="text"
                  component={ReduxFormInput}
                  label="Address Line 2"
                  placeHolder="#1010"
                />
              </Col>
            </FormGroup>
            <FormGroup row={true}>
              <Col xs="12" lg="4">
                <Field
                  name="city"
                  type="text"
                  component={ReduxFormInput}
                  label="City *"
                  placeHolder="Beverly Hills"
                />
              </Col>
              <Col xs="12" lg="4">
                <Field
                  name="state"
                  type="text"
                  component={ReduxFormSelect}
                  label="State *"
                  datas={stateArray}
                />
              </Col>
              <Col xs="12" lg="4">
                <Field
                  name="zip"
                  type="text"
                  component={ReduxFormInput}
                  label="Zip Code *"
                  placeHolder="90210"
                />
              </Col>
            </FormGroup>
            <FormGroup row={true}>
              <Col xs="12" lg="4">
                <Field
                  name="phone"
                  type="text"
                  component={ReduxFormInput}
                  label="Phone Number *"
                  placeHolder="(310) 867-5309"
                  normalize={phoneNumber}
                />
              </Col>
              <Col xs="12" lg="4">
                <Field
                  name="ccNum"
                  type="text"
                  component={ReduxFormInput}
                  label="Credit Card *"
                  placeHolder="2222-4444-6666-8888"
                  normalize={creditCardNumber}
                />
              </Col>
              <Col xs="12" lg="4">
                <Field
                  name="exp"
                  type="text"
                  component={ReduxFormInput}
                  label="Expiration Date *"
                  placeHolder="01/2023"
                  normalize={expirationDate}
                />
              </Col>
            </FormGroup>
          </CardBody>
          <div style={{ paddingBottom: 30 }}>
            <Button
              color="success"
              onClick={previousPage}
              style={{ marginLeft: '20px', float: "left" }}
            >
              &nbsp; Previous
            </Button>
            <Button
              color="success"
              type="submit"
              style={{ marginRight: '20px', float: "right" }}
            >

              {<span>Save</span>}
            </Button>
          </div>
        </Card>
      </Col>
    </form>
  );
};

const form = reduxForm<{}, Props>({
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  form: 'order',
  touchOnChange: true,
  validate,
})(UserDetailForm);

export default connect(null)(form);
