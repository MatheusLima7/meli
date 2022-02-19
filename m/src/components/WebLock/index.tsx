const nav: any = navigator;
const lockManager = nav.locks;
let lockResolver;
let lockReject;
const WebLock: any = () => {
  if (lockManager && lockManager.request) {
    const promise = new Promise((res, reject) => {
      lockResolver = res;
      lockReject = reject;
      // eslint-disable-next-line no-console
      console.log('Lock promise:', { lockResolver, lockReject });
    });
    lockManager.request('otc-run', { mode: 'shared' }, () => promise);
  }
  return null;
};

export default WebLock;
