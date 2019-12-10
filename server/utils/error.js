export const serverError = (res, error, message) => {
  console.log(error);
  res.status(500).json({ message });
};

export const resourceError = (res, message) => {
  res.status(400).json({ message });
};
