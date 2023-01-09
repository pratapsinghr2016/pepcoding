var fib = function (n) {
  function memoizedFib(num, questionBank = {}) {
    if (num == 0 || num == 1) {
      return num;
    }

    if (questionBank[num]) {
      return questionBank[num];
    }

    const num1 = memoizedFib(num - 1, questionBank);

    const num2 = memoizedFib(num - 2, questionBank);
    const sum = num1 + num2;
    questionBank[num] = sum;
    return sum;
  }
  const result = memoizedFib(n);
  return result;
};
