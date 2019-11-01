import React from 'react';

import './Form.css';

function Form(props) {
    const { onSubmit } = props;
    return (
        <form className="form" onSubmit={onSubmit}>
            {props.children}
        </form>
    );
}

export default Form;
