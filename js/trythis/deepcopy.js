const assert = require('assert');

const kim = {
  nid: 3,
  nm: 'Kim',
  addr: { city: 'Busan', road: 'Haeundaero', zip: null, x: undefined },
};
const newKim1 = shallowCopy(kim); // cf. {...kim}
newKim1.nid = 5;
assert.notEqual(kim.nid, newKim1.nid);
assert.strictEqual(kim.nm, newKim1.nm);
newKim1.addr.city = 'Seoul';
assert.strictEqual(kim.addr.city, newKim1.addr.city);
console.log(kim);
console.log(newKim1);

function shallowCopy(obj) {
  // return {...obj};
  //return Object.assign({}, obj);

  const ret = {};
  for (const [k, v] of Object.entries(obj)) {
    ret[k] = v;
  }

  return ret;
}

// 2) 이하 deep copy
const newKim2 = deepCopy(kim);
newKim2.addr.city = 'Daegu';
console.log('🚀 ~ newKim2:', JSON.stringify(newKim2, null, '    '));
assert.notEqual(kim.addr.city, newKim2.addr.city);

function deepCopy(obj) {
  if (obj === null || typeof obj !== 'object') return obj;

  const ret = {};
  for (const [k, v] of Object.entries(obj)) {
    ret[k] = deepCopy(v);
  }

  return ret;
}
