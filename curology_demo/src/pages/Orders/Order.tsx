import React from 'react';
import { connect } from 'react-redux';
import Form from './Form';
import { addOrder, orderCompleted} from '../../redux/actions/order/add';

export const Order = (props: any) => {
  const handleSubmit = (values: any) => {
    props.dispatch(addOrder(values));
    const requestData = {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      phone: values.phone,
      address: {
        street1: values.street1,
        street2: values.street2,
        city: values.city,
        state: values.state,
        zip: values.zip
      },
      payment: {
        ccNum: values.ccNum,
        exp: values.exp
      },
      quantity: values.quantity,
      total: Number(values.quantity) * 50
    }

    fetch('http://127.0.0.1:8000/api/magic',{
        method: "POST",
        body: JSON.stringify(requestData),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      }).then(async (response) => {
        if (response.ok) {
          values['orderSuccess'] = true;
          props.dispatch(orderCompleted(values));
          return;
        }

        const responseData = await response.json();
        values['orderSuccess'] = false;
        values['errorActionable'] = false;
        if (responseData.error_type && responseData.error_type === 'OVER_LIMIT') {
          values['errorActionable'] = true;
          values['existingProductCount'] = responseData.existing_product_count;
        }

        props.dispatch(orderCompleted(values));
      });

  }
  return (
    <Form onSubmit={handleSubmit} {...props} />
  );
}

export default connect(null)(Order);
