import * as yup from 'yup';

export const validationSchema = [
    yup.object({
        fullName: yup.string().required('Full Name is required'),
        address1: yup.string().required('Address line 1 is required'),
        address2: yup.string().required('Address line 2 is required'),
        city: yup.string().required('City is required'),
        state: yup.string().required('State is required'),
        zip: yup.string().required('Zipcode is required'),
        country: yup.string().required('Country is required')
    }),
    yup.object(),
    yup.object({
        nameOnCard: yup.string().required('Name on your card is required'),
        numberOnCard: yup.string().required('Number on your card is required'),
        dateOnCard: yup.string().required('Expiry Date on your card is required'),
        cvvOnCard: yup.string().required('CVV Number on your card is required'),
    })
];