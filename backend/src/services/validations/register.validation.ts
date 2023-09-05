import HttpException from '../../utils/httpException.util';

const validateRegisterEmail = (created: boolean): void => {
  const isEmailAlreadyRegistered = !created;
  if (isEmailAlreadyRegistered) {
    throw new HttpException(409, 'Email already in use');
  }
};

export default validateRegisterEmail;
