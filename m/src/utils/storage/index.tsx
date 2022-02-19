export interface Storage {
  set(key: string, value: any): void;
  get(key: string): any;
  remove(key: string): void;
  clear(): void;
}

export default (type: 'localStorage' | 'sessionStorage'): Storage => {
  const checkSupport = Boolean(type in window && window[type] !== null);

  return {
    set: (key, value) => {
      if (checkSupport) window[type].setItem(key, value);
    },

    get: (key) => {
      let data;
      if (checkSupport) {
        data = window[type].getItem(key);
        if (data && typeof data === 'object') data = JSON.parse(data);
      }
      return data;
    },

    remove: (key) => {
      if (checkSupport) {
        window[type].removeItem(key);
      }
    },

    clear: () => {
      if (checkSupport) window[type].clear();
    },
  };
};
