import React, { useState } from 'react';
import { InjectedFormProps } from 'redux-form';
import Stepper from 'react-stepper-horizontal';
import { Card } from 'reactstrap';

import ProductDetailForm from './ProductDetailForm';
import UserDetailForm from './UserDetailForm';
import { OrderResultDisplay } from './OrderSubmittedPage';

export const Form: React.FC<InjectedFormProps> = (props: any) => {
    const [page, setPage] = useState(0);
    const steps = [{ title: 'Product Details' }, { title: 'Account Detail' }, {title: 'Confirmaton'}];

    const { onSubmit } = props;

    const nextPage = () => {
        setPage(page + 1);
    };

    const previousPage = () => {
        setPage(page - 1);
    };

    return (
        <Card>
            <Stepper steps={steps} activeStep={page} />
            {page === 0 && <ProductDetailForm onSubmit={nextPage} />}
            {page === 1 && (
                <UserDetailForm previousPage={previousPage}  onSubmit={(values) => {
                  onSubmit(values);
                  nextPage();
                }} />
            )}
            {page === 2 && (
                <OrderResultDisplay previousPage={previousPage}  />
            )}
        </Card>
    );
}

export default Form;
