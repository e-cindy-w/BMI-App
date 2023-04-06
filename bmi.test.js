const { calculateBMI } = require('./index');
test('calculateBMI calculates BMI correctly', () => {
  const height = 1.7;
  const weight = 50;
  const expectedBMI = "17.301";

  const request = { body: { height, weight } };
  const response = { render: jest.fn() };

  calculateBMI(request, response);

  expect(response.render).toHaveBeenCalledWith('bmiResults', {
    bmiObject: { Height: height, Weight: weight, BMI: expectedBMI, Status: 'Underweight' }
  });
});
