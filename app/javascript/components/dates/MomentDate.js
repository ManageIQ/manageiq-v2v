import moment from 'moment';

export const formatDateTime = date => moment(date).format('MMMM Do YYYY, h:mm a');
