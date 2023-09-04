const errorMap: Record<string, number> = {
  'any.required': 400,
  'string.email': 400,
  'string.empty': 400,
  'string.min': 400,
};

const mapError = (type: string) => errorMap[type] || 500;

export default mapError;
