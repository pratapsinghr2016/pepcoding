// Climbing Stairs with Jumps using Dynamic Programming | Recursive Staircase Problem

function climbingStairs(arr) {
  const n = arr.length;
  const dp = new Array(n + 1);
  dp.fill(0);
  dp[n] = 1;

  for (let i = n - 1; i >= 0; i--) {
    for (let j = 1; j <= arr[i] && i + j < dp.length; j++) {
      dp[i] += dp[i + j];
    }
  }

  console.log("response:", dp[0]);
}

climbingStairs([3, 3, 0, 2, 2, 3]);
