import Joi from 'joi';

const statusSchema = Joi.object({
  status: Joi.string().valid('Pendente', 'Preparando', 'Em Trânsito', 'Entregue').required(),
});

export default statusSchema;
