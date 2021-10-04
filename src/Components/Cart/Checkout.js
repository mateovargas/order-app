import {useRef, useState} from 'react';
import classes from './Checkout.module.css';

const isEmpty = value => value.trim === '';
const isNotFiveChars = value => value.trim().length !== 5;

const Checkout = (props) => {
    const [formInputsValidity, setFormInputsValidity] = useState({
        name: true,
        street: true,
        city: true,
        postalCode: true
    });

    const nameInputRef = useRef();
    const streetInputRef = useRef();
    const postalCodeInputRef = useRef();
    const cityInputRef = useRef();

    const confirmHandler = (event) => {
        event.preventDefault();
        const enteredName = nameInputRef.current.value;
        const enteredStreet = streetInputRef.current.value;
        const enteredPostalCode = postalCodeInputRef.current.value;
        const enteredCity = cityInputRef.current.value;

        const enteredNameIsValid = !isEmpty(enteredName);
        const enteredStreetIsValid = !isEmpty(enteredStreet);
        const enteredPostalCodeIsValid = !isNotFiveChars(enteredPostalCode);
        const enteredCityIsValid = !isEmpty(enteredCity);
        const formIsValid = enteredNameIsValid && enteredStreetIsValid && enteredPostalCodeIsValid && enteredCityIsValid;
        
        setFormInputsValidity({
            name: enteredNameIsValid,
            street: enteredStreetIsValid,
            city: enteredCityIsValid,
            postalCode: enteredPostalCodeIsValid
        });

        if(formIsValid){
            return;
        }
    }



    return(
        <form onSubmit={confirmHandler}>
            <div className={`${classes.control} ${formInputsValidity.name ? '': classes.invalid}`}>
                <label htmlFor="name">
                    Your Name
                </label>
                <input
                    type="text"
                    id="name"
                />
                {!formInputsValidity.name && <p>Please enter a valid name</p>}
            </div>
            <div className={`${classes.control} ${formInputsValidity.street ? '' : classes.invalid}`}>
                <label htmlFor="street">
                    Street
                </label>
                <input
                    type="text"
                    id="street"
                />
                {!formInputsValidity.street && <p>Please enter a valid street</p>}
            </div>
            <div className={`${classes.control} ${formInputsValidity.city ? '' : classes.invalid}`}>
                <label htmlFor="city">
                    City
                </label>
                <input
                    type="text"
                    id="City"
                />
                {!formInputsValidity.city && <p>Please enter a valid city</p>}
            </div>
            <div className={`${classes.control} ${formInputsValidity.postalCode ? '' : classes.invalid}`}>
                <label htmlFor="postal">
                    Postal Code
                </label>
                <input
                    type="text"
                    id="postal"
                />
                {!formInputsValidity.postalCode && <p>Please entere a valid postal code</p>}
            </div>
            <button type="button" onClick={props.onCancel}>Cancel</button>
            <button>Confirm</button>
        </form>
    );
};

export default Checkout;
