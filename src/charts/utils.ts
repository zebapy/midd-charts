export const merge = (target, ...objects) => {
  for (const object of objects) {
    for (const key in object) {
      if (object.hasOwnProperty(key)) {
        // since we're dealing relatively simple objects this should work fine
        if (object[key] && typeof object[key] === 'object') {
          if (!target[key]) {
            target[key] = {};
          }
          // recursively merge into the target
          // configs only run 3 or 4 levels deep, so no stack explosions
          target[key] = merge(target[key], object[key]);
        } else {
          target[key] = object[key];
        }
      }
    }
  }
  return target;
};

export const findNode = (str: string | Element): Element =>
  typeof str === 'string' ? document.querySelector(str) : str;
