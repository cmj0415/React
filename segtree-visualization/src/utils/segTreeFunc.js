export function buildSeg(arr, seg, index = 1, l = 0, r = 3) {
    if (l == r) {
      seg[index] = arr[l];
      return;
    }
    var mid = Math.floor((l + r) / 2);
    buildSeg(arr, seg, 2 * index, l, mid);
    buildSeg(arr, seg, 2 * index + 1, mid + 1, r);
    seg[index] = seg[2 * index] + seg[2 * index + 1];
}
export function query(seg, index = 1, begin, end, l = 0, r = 3) {
    if (l > end || r < begin) return 0;
    if (l == r) return seg[index];
    var mid = Math.floor((l + r) / 2);
    var left = query(seg, 2 * index, begin, end, l, mid);
    var right = query(seg, 2 * index + 1, begin, end, mid + 1, r);
    return left + right;
}

export function update(seg, val, index = 1, x, l = 0, r = 3) {
    if (r < x || l > x) return;
    if (l === r) {
        seg[index] = val;
        return;
    }
    var mid = Math.floor((l + r) / 2);
    update(seg, val, 2 * index, x, l, mid);
    update(seg, val, 2 * index + 1, x, mid + 1, r);
    seg[index] = seg[2 * index] + seg[2 * index + 1];
}
export function arrayToTree(arr, index = 1) {
    if (index >= arr.length || arr[index] == null) return null;
  
    const node = {
      name: String(arr[index]),
    };
  
    const left = arrayToTree(arr, 2 * index);
    const right = arrayToTree(arr, 2 * index + 1);
  
    const children = [left, right].filter(child => child != null);
    if (children.length > 0) {
      node.children = children;
    }
    return node;
}