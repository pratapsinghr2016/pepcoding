// Climbing Stairs - Dynamic Programming using Tabulation | Recursive Staircase Problem

// Method-1 memoization

function climbStairs(number) {
  function helper(num, arr = []) {
    if (num == 0) {
      return 1;
    } else if (num < 0) {
      return 0;
    }

    if (arr[num]) {
      return arr[num];
    }

    const res1 = helper(num - 1, arr);
    const res2 = helper(num - 2, arr);
    const res3 = helper(num - 3, arr);

    const sum = res1 + res2 + res3;
    arr[num] = sum;

    return sum;
  }
  const res = helper(number);
  return res;
}

// METHOD-2 Tabulation

function climbStairs1(number) {
  let dp = Array(number + 1);
  dp[0] = 1;

  for (let index = 1; index <= number; index++) {
    if (index == 1) {
      dp[index] = dp[index - 1];
    } else if (index == 2) {
      dp[index] = dp[index - 1] + dp[index - 2];
    } else {
      dp[index] = dp[index - 1] + dp[index - 2] + dp[index - 3];
    }
  }
  return dp[number];
}

console.log(climbStairs(10)); // 274
