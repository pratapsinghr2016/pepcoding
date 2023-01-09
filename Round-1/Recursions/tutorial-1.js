function printIncDec(number) {
  if (number == 0) {
    return;
  }
  console.log(number);
  printIncDec(number - 1);
  console.log(number);
}
// printIncDec(5);

function printFactorial_(number) {
  let mul = 1;
  function helper(num) {
    if (num == 0) {
      return 1;
    }

    helper(num - 1);
    mul *= num;
  }
  helper(number);
  console.log("Factorial: ", mul);
}
// printFactorial_(5);

function printFactorial(number) {
  if (number == 0) {
    return 1;
  }

  const ans = printFactorial(number - 1);
  return ans * number;
}

// console.log("Factorial: ", printFactorial(5));

function mathPow_(base, power) {
  if (base == Infinity) {
    return Infinity;
  }

  if (base == 0) {
    return 0;
  }

  if (power == 0) {
    return 1;
  }

  const mul = mathPow_(base, power - 1);
  return mul * base;
}

function mathPow(base, power) {
  if (power == 1) {
    return base;
  }

  const byTwoPow = mathPow(base, parseInt(power / 2));
  const product =
    power % 2 == 0 ? byTwoPow * byTwoPow : byTwoPow * byTwoPow * byTwoPow;
  return product;
}
