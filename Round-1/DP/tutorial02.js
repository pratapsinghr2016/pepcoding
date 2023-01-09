// Minimum Falling Path Sum | Leetcode 931 | Hindi

// DO NOT WORK

function minFallingPathSum(matrix) {
  function helper(arr) {
    let rows = arr.length;
    let columns = arr[0].length;
    let ans = Infinity;
    let hashMap = new Map();

    for (let currColumn = 0; currColumn < columns; currColumn++) {
      ans = Math.min(ans, fallDownPathsMin(0, currColumn, arr, hashMap));
    }
    return ans;
  }

  function fallDownPathsMin(currRow, currColumn, arr, hashMap) {
    let rows = arr.length;
    let columns = arr[0].length;

    if (currRow == rows) {
      return 0;
    }

    if (currColumn < 0 || currColumn > columns) {
      return Infinity;
    }

    const key = currRow + "_" + currColumn;
    if (hashMap.has(key)) {
      return hashMap.get(key);
    }

    let path1Res = fallDownPathsMin(currRow + 1, currColumn + 1, arr, hashMap);
    let path2Res = fallDownPathsMin(currRow + 1, currColumn, arr, hashMap);
    let path3Res = fallDownPathsMin(currRow + 1, currColumn - 1, arr, hashMap);

    const value = Math.min(path1Res, path2Res, path3Res);
    hashMap.set(key, value);
    return arr[currRow][currColumn] + value;
  }

  helper(matrix);
}
