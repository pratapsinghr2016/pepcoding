// Climbing Stairs with Minimum Moves | Dynamic Programming Problem Explained

function climbingStairsWithMinMoves(arr) {
  const n = arr.length;
  const dp = new Array(n + 1);
  dp.fill(null);
  dp[n] = 0;

  for (let i = n - 1; i >= 0; i--) {
    if (arr[i] > 0) {
      let min = Infinity;
      for (let j = 1; j <= arr[i] && i + j < dp.length; j++) {
        if (dp[i + j] !== null) {
          min = Math.min(min, dp[i + j]);
        }
        if (min !== Infinity) {
          dp[i] = min + 1;
        }
      }
    }
  }

  console.log("response:", dp[0]); // 4
}

climbingStairsWithMinMoves([3, 2, 4, 2, 0, 2, 3, 1, 2, 2]);
