declare global {
  interface Array<T> {
    firstObject: T;
    lastObject: T;
    mapBy(prop: keyof T): T[];
    filterBy<K extends keyof T>(
      prop: K,
      value: T[K],
      isIncludes?: boolean
    ): T[];
    rejectBy<K extends keyof T>(
      prop: K,
      value: T[K],
      isIncludes?: boolean
    ): T[];
    findBy<K extends keyof T>(prop: K, value: T[K]): T;
    sortBy(prop: keyof T | `${keyof T & string}:${'asc' | 'desc'}`): T[];
    groupByFn<K extends T[keyof T] & PropertyKey>(
      gfn: (a: T) => K
    ): Partial<Record<K, T[]>>;
    groupBy(prop: keyof T): Partial<Record<keyof T & PropertyKey, T[]>>;
  }
}

Array.prototype.mapBy = function (prop) {
  return this.map((a) => a[prop]);
};

Array.prototype.filterBy = function (prop, value, isIncludes = false) {
  return this.filter((a) =>
    isIncludes ? a[prop]?.includes(value) : a[prop] === value
  );
};

Array.prototype.rejectBy = function (prop, value, isIncludes = false) {
  return this.filter((a) =>
    isIncludes ? !a[prop]?.includes(value) : a[prop] !== value
  );
};

Array.prototype.findBy = function (prop, value) {
  return this.find((a) => a[prop] === value)[prop];
};

Array.prototype.sortBy = function (prop) {
  // name | name:desc | name:asc
  const [key, direction = 'asc'] =
    typeof prop === 'string' && prop.includes(':')
      ? prop.split(':')
      : [prop, 'asc'];
  const dir = direction.toLowerCase() === 'desc' ? -1 : 1;
  // console.log('🚀  dir:', dir, prop);
  return this.sort((a, b) =>
    key !== undefined && a[key] > b[key] ? dir : -dir
  ).map((u) => u.name);
};

Array.prototype.groupByFn = function <T, K extends T[keyof T] & PropertyKey>(
  gfn: (a: T) => K
) {
  const ret: Partial<Record<K, T[]>> = {};
  for (const a of this) {
    const k = gfn(a);
    ret[k] ||= [];
    ret[k].push(a);
  }

  return ret;
};

Array.prototype.groupBy = function <T, K extends T[keyof T] & PropertyKey>(
  gfn: (a: T) => K
) {
  const ret: Partial<Record<K, T[]>> = {};
  for (const a of this) {
    const k = gfn(a);
    ret[k] ||= [];
    ret[k].push(a);
  }

  return ret;
};

Object.defineProperties(Array.prototype, {
  firstObject: {
    get() {
      return this[0];
    },
    set(value) {
      this[0] = value;
      // this.with(0, value); // pure fn
    },
  },
  lastObject: {
    get() {
      return this.at([-1]);
    },
    set(value) {
      this[this.length - 1] = value;
      // this.with(-1, value);
    },
  },
});

const hongx = { id: 1, name: 'Hong' };
const kimx = { id: 2, name: 'Kim' };
const leex = { id: 3, name: 'Lee' };
const users = [hongx, leex, kimx];

console.log(users.mapBy('id')); // [1, 3, 2];
console.log(users.mapBy('name')); // ['Hong', 'Lee', 'Kim']);
console.log(users.filterBy('id', 2)); // [kim]);
console.log(users.filterBy('name', 'i', true)); // [kim]
console.log(users.rejectBy('id', 2)); // [hong, lee]
console.log(users.rejectBy('name', 'i', true)); // [hong, lee]
console.log(users.findBy('name', 'Kim')); //  kim;
console.log(users.sortBy('name:desc')); //  [lee, kim, hong];
console.log(users.sortBy('name')); // [hong, kim, lee]
console.log(users.groupByFn(({ dept }) => dept)); //
/*
Server: [
  { id: 1, name: 'Hong', dept: 'Server' },
  { id: 2, name: 'Kim', dept: 'Server' },
],
Client: [
  { id: 3, name: 'Lee', dept: 'Client' }
],
*/

console.log('first/last=', users.firstObject.name, users.lastObject.name); // hong/lee
users.firstObject = kimx;
users.lastObject = hongx;
console.log('first/last=', users.firstObject.name, users.lastObject.name); // kim/hong
