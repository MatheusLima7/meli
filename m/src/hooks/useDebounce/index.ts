class UseDebounce {
  private asyncSignature: any;
  isWaiting = false;

  async dispatch(func: () => any, timeOut = 500) {
    if (this.asyncSignature && this.isWaiting) {
      clearTimeout(this.asyncSignature);
    }

    this.isWaiting = true;

    this.asyncSignature = setTimeout(async () => {
      await func();
      this.isWaiting = false;
    }, timeOut);
  }
}

export default new UseDebounce();
